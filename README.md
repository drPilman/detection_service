# Detection web service

## Requirements

- [docker](https://www.docker.com/)
- [docker compose](https://github.com/docker/compose)
- [nvidia-docker](https://github.com/NVIDIA/nvidia-docker) (if not for test)

## Build

```bash
docker compose -f build.yml build
```

## RUN

```bash
docker compose up
```

## Test

Build light detector

```bash
docker compose -f build.test.yml build
```

run full service (with light detector)

```bash
docker compose -f test.yml up --build
```

run single lightest (with light detector)

```bash
docker compose -f test.light.yml build
docker compose -f test.light.yml run test_light
```

run single fulltest (with detector)

```bash
docker compose -f test.light.yml build
docker compose -f test.light.yml run test_light
```

## NOTE

- If you use `sudo`, you should change `STORE_PATH=${PWD}/store` to abs path dir `store` of this project, because ${PWD} in sudo mode don't return this path.

- If you want access to web over you local network, you shoud set up var API_HOST to your local adress (e.g '192.168.1.5'). you can do it with:

```bash
export API_HOST=$(hostname -I | cut -d' ' -f1)
```

- Default test rtsp avalible on rtsp://localhost:8554/stream
