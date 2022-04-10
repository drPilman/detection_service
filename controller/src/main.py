import docker

client = docker.from_env()


def add_tracker(url: str):
    # docker run --rm --net="host" --gpus=all drpilman/detector rtsp://127.0.0.1:8554/mystream
    container = client.containers.run("drpilman/detector",
                                      url,
                                      network_mode="host",
                                      detach=True,
                                      auto_remove=True,
                                      device_requests=[docker.types.DeviceRequest(count=-1, capabilities=[['gpu']])])
    # logs = container.logs(stream=True)
    # for s in logs:
    #    print(s)
    return container.id, container.status


def list_trackers():
    return client.containers.list(all=True, filters={"ancestor": "drpilman/detector"})


def tracker(str_id):
    return client.containers.get(str_id)


def remove_tracker(str_id):
    tracker(str_id).remove(force=True)


def pause_tracker(str_id):
    tracker(str_id).pause()


def unpause_tracker(str_id):
    tracker(str_id).unpause()
