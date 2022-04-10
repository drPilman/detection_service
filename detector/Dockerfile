FROM drpilman/ml_cv:cuda-11.4.0-ubuntu20.04

WORKDIR /usr/src/app

COPY weights/Arial.ttf /root/.config/Ultralytics/
COPY requirements.txt /tmp/
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt

COPY src/ /usr/src/app/

ENTRYPOINT ["python3", "track.py", "--source"]

