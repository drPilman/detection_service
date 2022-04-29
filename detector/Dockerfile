FROM drpilman/ml_cv:cuda-11.4.0-ubuntu20.04

WORKDIR /usr/src/app

COPY weights/Arial.ttf /root/.config/Ultralytics/
COPY weights/yolov5m.pt yolov5/
COPY weights/osnet_ibn_x1_0_MSMT17.pth  deep_sort/deep/checkpoint/
COPY requirements.txt /tmp/
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt

COPY src/ /usr/src/app/

ENTRYPOINT ["python3", "track.py", "--source"]

