import docker
from fastapi import FastAPI, HTTPException
from .models import *
import logging

app = FastAPI()
# client = docker.from_env()
logger = logging.getLogger(__name__)


@app.get('/')
def health_check():
    return {"msg": "OK"}


@app.post('/add_tracker')
def add_tracker(source: RSTP_URL):

    return ['container.id', 'container.status']


@app.post('/list_trackers')
def list_trackers():
    # containers = client.containers.list(all=True, filters={"ancestor": "drpilman/detector"})
    return {
        'trackers': [{'full_id': container, 'status': str(container) + '.status'} for container in range(10)],
        'count': 10
    }


# def get_tracker(str_id):
#     try:
#         return client.containers.get(str_id)
#     except docker.errors.NotFound:
#         raise HTTPException(status_code=404, detail="Item not found")


@app.post('/tracker_info')
def tracker_info(tracker: SHA_ID):
    return {'msg': 'not implemented yet'}


@app.post('/remove_tracker')
def remove_tracker(tracker: SHA_ID):
    return True
    # get_tracker(tracker.full_id).remove(force=True)


@app.post('/pause_tracker')
def pause_tracker(tracker: SHA_ID):
    # get_tracker(tracker.full_id).pause()
    return True

@app.post('/unpause_tracker')
def unpause_tracker(tracker: SHA_ID):
    return True
    # get_tracker(tracker.full_id).unpause()


# ./rtsp-simple-server
# ffmpeg -re -stream_loop -1 -i test.m4v -c copy -f rtsp rtsp://localhost:8554/mystream

# @app.post('/log_result')
# def tracker_result(frame: ResultData):
#     logger.info(frame)
