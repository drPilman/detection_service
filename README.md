# Requirements
- [docker](https://www.docker.com/)
- [docker compose](https://github.com/docker/compose)
- [nvidia-docker](https://github.com/NVIDIA/nvidia-docker) (if not for test)

# Install
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
```
docker compose -f test.yml up
```

run pytest 

```bash
docker compose -f test_api.yml run pytest
```