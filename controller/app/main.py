import asyncio
import docker
import logging
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from websockets.exceptions import ConnectionClosedOK

from starlette.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from fastapi.responses import StreamingResponse
from fastapi.templating import Jinja2Templates

from models import *
from log import log_config
import base64
import redis as Redis

redis = Redis.Redis(host='detection_service-redis-1', port=6379, db=0)
redis.set('tracker:uniq', 1000)
templates = Jinja2Templates(directory="templates")

logging.config.dictConfig(log_config)


class Rdict(dict):

    def __init__(self):
        self.r = {}
        return super().__init__()

    def __setitem__(self, __k, __v) -> None:
        self.r[__v] = __k
        return super().__setitem__(__k, __v)


trackers = Rdict()

client = docker.DockerClient(base_url='unix://var/run/docker.sock')
logger = logging.getLogger("main")

#origins = ["http://localhost:3000", "http://0.0.0.0:3000","http://127.0.0.1:3000"]
origins = [
    "http://localhost:3000", "localhost:3000", "http://drpilman.ga:3000/"
]

#app.add_middleware(
#    CORSMiddleware,
#    allow_origins=origins,
#    allow_credentials=True,
#    allow_methods=["*"],
#    allow_headers=["*"],
#    expose_headers=["Access-Control-Allow-Origin"]
#)
middleware = [
    Middleware(CORSMiddleware,
               allow_origins=['*'],
               allow_credentials=True,
               allow_methods=['*'],
               allow_headers=['*'])
]
app = FastAPI(middleware=middleware)


@app.get('/')
def health_check():
    return {"msg": "OK"}


@app.post('/add_tracker')
def add_tracker(source: RSTP_URL, request: Request):
    id = redis.incr('tracker:uniq')

    # docker run --rm --net="host" --gpus=all drpilman/detector rtsp://127.0.0.1:8554/mystream
    container = client.containers.run("drpilman/detector",
                                      f"{source.url} --redis-id {id}",
                                      network_mode="host",
                                      detach=True,
                                      auto_remove=True,
                                      device_requests=[
                                          docker.types.DeviceRequest(
                                              count=-1, capabilities=[['gpu']])
                                      ])
    # logs = container.logs(stream=True)
    # for s in logs:
    #    print(s)
    trackers[id] = container.id

    return [id, container.status]


@app.get('/list_trackers')
def list_trackers():
    containers = client.containers.list(
        all=True, filters={"ancestor": "drpilman/detector"})

    return {
        'trackers': [{
            'full_id': trackers.r[container.id],
            'status': container.status
        } for container in containers],
        'count':
        len(containers)
    }


def get_tracker(str_id):
    try:
        return client.containers.get(trackers[str_id])
    except docker.errors.NotFound:
        raise HTTPException(status_code=404, detail="Item not found")


@app.post('/tracker_info')
def tracker_info(tracker: SHA_ID):
    return {'msg': 'not implemented yet'}


@app.post('/remove_tracker')
def remove_tracker(tracker: SHA_ID):
    tracker = get_tracker(tracker.full_id)
    if tracker:
        tracker.remove(force=True)


@app.post('/pause_tracker')
def pause_tracker(tracker: SHA_ID):
    tracker = get_tracker(tracker.full_id)
    if tracker:
        tracker.pause()


@app.post('/unpause_tracker')
def unpause_tracker(tracker: SHA_ID):
    tracker = get_tracker(tracker.full_id)
    if tracker:
        tracker.unpause()


# ./rtsp-simple-server
# ffmpeg -re -stream_loop -1 -i test.m4v -c copy -f rtsp rtsp://localhost:8554/mystream


@app.websocket("/ws")
async def get_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            s = redis.hget(f'tracker1001', 'jpg')
            s = base64.b64decode(s)
            await websocket.send_bytes(s)
            await asyncio.sleep(0.1)
    except (WebSocketDisconnect, ConnectionClosedOK):
        logger.info("Client disconnected")


@app.get("/stream")
def video_feed(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
