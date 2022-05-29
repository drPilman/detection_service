# Requirements
- [docker](https://www.docker.com/)
- [docker compose](https://github.com/docker/compose)
- [nvidia-docker](https://github.com/NVIDIA/nvidia-docker) (if not for test)

# Build
```bash
docker compose -f build.yml build
```

# RUN
```bash
docker compose up
```

# Test
```bash
docker compose -f build.test.yml build
```
run test service (light detector)
```bash
docker compose -f test.yml up --build
```

run single pytest 

```bash
docker compose -f test_api.yml run pytest
```
# NOTE
if you use `sudo`, you should change `STORE_PATH=${PWD}/store` to abs path dir `store` of this project, because ${PWD} in sudo mode don't return this path.