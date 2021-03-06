import asyncio
import docker
import logging
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect, Response, UploadFile, File, Body
from fastapi.responses import FileResponse
from websockets.exceptions import ConnectionClosedOK, ConnectionClosedError
from starlette.websockets import WebSocketState

from starlette.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from fastapi.responses import StreamingResponse
from fastapi.templating import Jinja2Templates

from typing import Union
from log import log_config
import base64
import redis as Redis
import os
from shutil import rmtree

logging.config.dictConfig(log_config)
logger = logging.getLogger("main")

storepath = os.environ["STORE_PATH"]
detector = os.environ["DETECTOR_IMAGE"]
device = [docker.types.DeviceRequest(count=-1, capabilities=[['gpu']])
          ] if os.environ["DEVICE"] == 'gpu' else []

redis = Redis.Redis(host=os.environ["REDIS_HOST"], port=6379, db=0)
redis.flushall()  # <====================== not deploy me!!!!!!!!!!!!!!!!
redis.set('tracker:uniq', 1000)

store = '/app/store/'
for f in os.listdir(store):
    ff = os.path.join(store, f)
    if os.path.isdir(ff):
        rmtree(ff)
    else:
        os.remove(ff)

templates = Jinja2Templates(directory="templates")


class Rdict(dict):

    def __init__(self):
        self.r = {}
        super().__init__()

    def __setitem__(self, __k, __v) -> None:
        self.r[__v] = __k
        return super().__setitem__(__k, __v)

    def __delitem__(self, __k):
        del self.r[self[__k]]
        super().__delitem__(__k)


trackers = Rdict()

client = docker.DockerClient(base_url='unix://var/run/docker.sock')

# origins = ["http://localhost:3000", "http://0.0.0.0:3000","http://127.0.0.1:3000"]
origins = [
    "http://localhost:3000", "localhost:3000", "http://drpilman.ga:3000/"
]

# app.add_middleware(
#    CORSMiddleware,
#    allow_origins=origins,
#    allow_credentials=True,
#    allow_methods=["*"],
#    allow_headers=["*"],
#    expose_headers=["Access-Control-Allow-Origin"]
# )
middleware = [
    Middleware(CORSMiddleware,
               allow_origins=['*'],
               allow_credentials=True,
               allow_methods=['*'],
               allow_headers=['*'],
               expose_headers=["Access-Control-Allow-Origin"])
]
app = FastAPI(middleware=middleware)


@app.get('/')
def health_check():
    return {"msg": "OK"}


@app.post('/add_tracker')
def add_tracker(rtsp_url: str = Body(..., embed=True)):
    tracker_id = redis.incr('tracker:uniq')
    os.makedirs(os.path.join(store, str(tracker_id)))
    # docker run --rm --net="host" --gpus=all drpilman/detector rtsp://127.0.0.1:8554/mystream
    container = client.containers.run(
        detector,
        f"{rtsp_url} --redis-id {tracker_id} --project /mount --name out --save-vid",
        network_mode="host",
        detach=True,
        auto_remove=True,
        mounts=[
            docker.types.Mount(f'/mount/',
                               os.path.join(storepath, str(tracker_id)),
                               type='bind'),
        ],
        device_requests=device)
    # logs = container.logs(stream=True)
    # for s in logs:
    #    print(s)
    trackers[tracker_id] = container.id
    return {'tracker_id': tracker_id, 'status': container.status}


@app.post('/add_tracker_file')
async def upload(file: UploadFile = File(...)):
    if not file.filename.endswith('.mp4'):
        raise HTTPException(status_code=403,
                            detail="You can upload only .mp4 files")

    tracker_id = redis.incr('tracker:uniq')
    path = os.path.join(store, str(tracker_id), file.filename)
    try:
        os.makedirs(os.path.join(store, str(tracker_id)))
        contents = await file.read()
        with open(path, 'wb') as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(
            status_code=405,
            detail=f"There was an error uploading the file: {e}")
    finally:
        await file.close()

    container = client.containers.run(
        detector,
        f"/mount/{file.filename} --redis-id {tracker_id} --project /mount --name out --save-vid",
        network_mode="host",
        detach=True,
        auto_remove=True,
        mounts=[
            docker.types.Mount(f'/mount/',
                               os.path.join(storepath, str(tracker_id)),
                               type='bind'),
        ],
        device_requests=device)

    trackers[tracker_id] = container.id
    return {'tracker_id': tracker_id, 'status': container.status}


@app.get('/list_trackers')
def list_trackers():
    containers = client.containers.list(all=True,
                                        filters={"ancestor": detector})
    return [{
        'tracker_id': trackers.r[container.id],
        'status': container.status
    } for container in containers if container.id in trackers.r]


def get_tracker(tracker_id):
    try:
        return client.containers.get(trackers[tracker_id])
    except docker.errors.NotFound:
        raise HTTPException(status_code=404, detail="Item not found")


@app.post('/remove_all_tracker')
def remove_all_tracker():
    return {'msg': 'not implemented yet'}


@app.post('/tracker_info')
def tracker_info(tracker_id: int):
    return {'msg': 'not implemented yet'}


@app.post('/remove_tracker')
def remove_tracker(tracker_id: int = Body(..., embed=True)):
    tracker_container = get_tracker(tracker_id)
    if tracker_container:
        tracker_container.stop()
        del trackers[tracker_id]


@app.post('/pause_tracker')
def pause_tracker(tracker_id: int = Body(..., embed=True)):
    tracker = get_tracker(tracker_id)
    if tracker:
        tracker.pause()


@app.post('/unpause_tracker')
def unpause_tracker(tracker_id: int = Body(..., embed=True)):
    tracker = get_tracker(tracker_id)
    if tracker:
        tracker.unpause()


# ./rtsp-simple-server
# ffmpeg -re -stream_loop -1 -i test.m4v -c copy -f rtsp rtsp://localhost:8554/mystream


def sub_tracker(f):

    async def decorator(tracker_id: int, websocket: WebSocket):
        try:
            if tracker_id not in trackers:
                await websocket.close(405)
                return
            await websocket.accept()
            channel = redis.pubsub()
            channel.subscribe(tracker_id)
            while websocket.client_state == WebSocketState.CONNECTED and tracker_id in trackers:
                msg = channel.get_message()
                if msg is not None:
                    await f(msg, tracker_id, websocket)
                await asyncio.sleep(0.01)
        except (WebSocketDisconnect, ConnectionClosedError) as e:
            logger.info("Client disconnected" + str(e))
        except ConnectionClosedOK as e:
            logger.info("Client disconnected with OK" + str(e))

    return decorator


@app.websocket("/ws/stream/{tracker_id}")
@sub_tracker
async def get_stream(msg, tracker_id: int, websocket: WebSocket):
    if msg['type'] == 'message':
        s = redis.hget('jpg', tracker_id)
        if s:
            s = base64.b64decode(s)
            await websocket.send_bytes(s)


@app.websocket("/ws/info/{tracker_id}")
@sub_tracker
async def get_info(msg, tracker_id: int, websocket: WebSocket):
    if msg['type'] == 'subscribe':
        print('subscribe to channel')
        s = redis.hgetall(tracker_id)
        w = [x.decode('utf-8') for x in s.values()]
        await websocket.send_text(f"[{','.join(w)}]")
    elif msg['type'] == 'message':
        frame_id = int(msg['data'])
        result_json = f"[{redis.hget(tracker_id, frame_id).decode('utf-8')}]"
        print(result_json)
        await websocket.send_text(result_json)


@app.get("/stream/{tracker_id}")
def video_feed(tracker_id: int, request: Request):
    return templates.TemplateResponse("stream.html", {
        "request": request,
        "tracker_id": tracker_id
    })


@app.get("/info/{tracker_id}")
def info_feed(tracker_id: int, request: Request):
    return templates.TemplateResponse("info.html", {
        "request": request,
        "tracker_id": tracker_id
    })


@app.get("/list_downloads")
def list_downloads():
    max_tracker = int(redis.get('tracker:uniq')) + 1
    inrange = lambda x, m=max_tracker: 1000 < int(x) < m
    return [
        f for f in os.listdir(store)
        if os.path.isdir(os.path.join(store, f)) and f.isdecimal() and inrange(
            f) and os.path.exists(os.path.join(store, f, 'ok'))  # it's ready
    ]


@app.get("/download/{tracker_id}")
def download(tracker_id: str):
    path = os.path.join(store, tracker_id, 'out')
    name = os.listdir(path)[0]
    file_path = os.path.join(path, name)
    if os.path.isfile(file_path) and name.endswith('.mp4'):
        return FileResponse(path=file_path,
                            filename=name,
                            media_type='application/octet-stream')
    raise HTTPException(status_code=404, detail="Item not found")
