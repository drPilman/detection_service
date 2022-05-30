from operator import indexOf
import requests
import asyncio
import websockets
import json

#data_json = {'items': []}
#file = open('test_info.txt')
#for i in file:
#    item = json.loads(i)
#    if item['data']:
#        data_json["items"].append(item)
#data_json['items'].reverse()
#file.close()

#with open('test_json.json', 'w') as file:
#    json.dump(data_json, file)
 


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
    response = requests.post(url=url("/add_tracker_file"), files={'file': open('test_video.mp4', 'rb')})
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
    test_json = json.load(open('test_json.json'))
    cur_json = {'items': []}

    response = requests.post(url=url("/add_tracker_file"), files={'file': open('test_video.mp4', 'rb')})
    data = response.json() 
    tracker_id, status = data['tracker_id'], data['status']

    assert response.status_code == 200
    assert status == 'created'
    
    async with websockets.connect(f"ws://127.0.0.1:8000/ws/info/{tracker_id}") as websocket:
        msg = await websocket.recv()
        assert msg == "[]"

        cnt_frames = test_json['items'][len(test_json['items']) - 1]['frame'] + 1
        for i in range(cnt_frames):
            msg = await websocket.recv()
            item = json.loads(msg)[0]
            if item['data']:
                cur_json["items"].append(item)
        await websocket.close()
       
    assert test_json == cur_json

    requests.post(url("/remove_tracker"), json={"tracker_id": tracker_id})
    response = requests.get(url("/list_trackers"))

    assert response.status_code == 200
    assert response.json() == []
    
#asyncio.run(test_tracker_info())


