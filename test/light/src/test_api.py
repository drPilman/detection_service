import requests
import asyncio
import websockets

def url(s):
    return f"http://127.0.0.1:8000{s}"


def test_health_check():
    response = requests.get(url("/"))
    assert response.status_code == 200
    assert response.json() == {"msg": "OK"}


def test_empty_list():
    response = requests.get(url("/list_trackers"))
    assert response.json() == []


def test_add_tracker():
    response = requests.post(url("/add_tracker"),
                             json={"rtsp_url": "rtsp://192.168.1.100:554"})
    data = response.json()
    tracker_id, status = data['tracker_id'], data['status']

    assert response.status_code == 200
    assert status == 'created'

    response = requests.get(url("/list_trackers"))
    data = response.json()

    assert response.status_code == 200
    assert data[0]["tracker_id"] == tracker_id
    assert data[0]["status"] == "running"

    requests.post(url("/pause_tracker"),
                  json={"tracker_id": tracker_id})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json()[0]["tracker_id"] == tracker_id
    assert response.json()[0]["status"] == "paused"

    requests.post(url("/unpause_tracker"), json={"tracker_id": tracker_id})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json()[0]["tracker_id"] == tracker_id
    assert response.json()[0]["status"] == "running"

    requests.post(url("/remove_tracker"), json={"tracker_id": tracker_id})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json() == []


async def test_tracker_info():
    response = requests.post(url("/add_tracker"),
                             json={"rtsp_url": "rtsp://192.168.1.100:554"})
    data = response.json()
    tracker_id, status = data['tracker_id'], data['status']

    assert response.status_code == 200
    assert status == 'created'

    async with websockets.connect(f"ws://127.0.0.1:8000/ws/info/{tracker_id}") as websocket:
        msg = await websocket.recv()
        assert msg == "[]"
        for i in range(5):
            msg = await websocket.recv()
            assert msg == f'[{{"frame": {i}, "data": [[1, "obj_name", 0.78, [1.0, 2.0, 3.0, 4.0]]]}}]'
        await websocket.close()

    requests.post(url("/remove_tracker"),
                  json={"tracker_id": tracker_id})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json() == []

# how to upload file
#url = 'http://127.0.0.1:8000/upload'
#file = {'file': open('images/1.png', 'rb')}
#resp = requests.post(url=url, files=file)
#print(resp.json())



