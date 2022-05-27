import requests


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
