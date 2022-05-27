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
                             json={"url": "rtsp://192.168.1.100:554"})
    fullid = response.json()[0]

    assert response.status_code == 200
    assert response.json()[1] == 'created'

    response = requests.get(url("/list_trackers"))
    data = response.json()

    assert response.status_code == 200
    assert data[0]["full_id"] == fullid
    assert data[0]["status"] == "running"

    requests.post(url("/pause_tracker"),
                  json={"id": fullid})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json()[0]["full_id"] == fullid
    assert response.json()[0]["status"] == "paused"

    requests.post(url("/unpause_tracker"),
                  json={"id": fullid})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json()[0]["full_id"] == fullid
    assert response.json()[0]["status"] == "running"

    requests.post(url("/remove_tracker"),
                  json={"id": fullid})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json() == []


async def test_tracker_info():
    response = requests.post(url("/add_tracker"),
                             json={"url": "rtsp://192.168.1.100:554"})
    fullid = response.json()[0]

    assert response.status_code == 200
    assert response.json()[1] == 'created'

    async with websockets.connect(f"ws://127.0.0.1:8000/ws/info/{fullid}") as websocket:
        msg = await websocket.recv()
        assert msg == "[]"
        for i in range(20):
            msg = await websocket.recv()
            assert msg == f'[{{"frame": {i}, "data": [[1, "obj_name", 0.78, [1.0, 2.0, 3.0, 4.0]]]}}]'
        print(await websocket.close(code=1003))
        print(websocket.closed)

    requests.post(url("/remove_tracker"),
                  json={"id": fullid})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json() == []



