import docker
import logging
from fastapi import FastAPI, HTTPException
from .models import *
from .log import log_config

logging.config.dictConfig(log_config)

app = FastAPI(debug=True)
client = docker.from_env()
logger = logging.getLogger("main")


@app.get('/')
def health_check():
    return {"msg": "OK"}


@app.post('/add_tracker')
def add_tracker(source: RSTP_URL):
    # docker run --rm --net="host" --gpus=all drpilman/detector rtsp://127.0.0.1:8554/mystream
    container = client.containers.run("drpilman/detector",
                                      source.url,
                                      network_mode="host",
                                      detach=True,
                                      auto_remove=True,
                                      device_requests=[docker.types.DeviceRequest(count=-1, capabilities=[['gpu']])])
    # logs = container.logs(stream=True)
    # for s in logs:
    #    print(s)
    return [container.id, container.status]


@app.post('/list_trackers')
def list_trackers():
    containers = client.containers.list(all=True, filters={"ancestor": "drpilman/detector"})
    return {
        'trackers': [{'full_id': container.id, 'status': container.status} for container in containers],
        'count': len(containers)
    }


def get_tracker(str_id):
    try:
        return client.containers.get(str_id)
    except docker.errors.NotFound:
        raise HTTPException(status_code=404, detail="Item not found")


@app.post('/tracker_info')
def tracker_info(tracker: SHA_ID):
    return {'msg': 'not implemented yet'}


@app.post('/remove_tracker')
def remove_tracker(tracker: SHA_ID):
    get_tracker(tracker.full_id).remove(force=True)


@app.post('/pause_tracker')
def pause_tracker(tracker: SHA_ID):
    get_tracker(tracker.full_id).pause()


@app.post('/unpause_tracker')
def unpause_tracker(tracker: SHA_ID):
    get_tracker(tracker.full_id).unpause()


# ./rtsp-simple-server
# ffmpeg -re -stream_loop -1 -i test.m4v -c copy -f rtsp rtsp://localhost:8554/mystream

@app.post('/log_result')
def tracker_result(frame: ResultData):
    logger.info(frame)
