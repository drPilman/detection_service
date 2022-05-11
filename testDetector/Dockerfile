FROM python:3.10.4-alpine3.15

WORKDIR /usr/src/app

RUN pip3 install --no-cache-dir redis

COPY src/ .

ENTRYPOINT ["python3", "track.py", "--source"]

