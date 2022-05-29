FROM nvidia/cuda:11.4.0-base-ubuntu20.04 as ml_cv

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set up timezone
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

RUN apt-get update -y && \
    apt-get install -y python3 python3-pip python3-opencv libgl1-mesa-glx&&\
    pip3 install --upgrade pip &&\
    rm -rf /var/lib/apt/lists/*

RUN pip3 install torch==1.11.0+cu113 torchvision==0.12.0+cu113 --extra-index-url https://download.pytorch.org/whl/cu113
RUN pip3 install opencv-python==4.5.5.64



FROM ml_cv as detector
WORKDIR /usr/src/app


ADD https://github.com/drPilman/Yolov5_DeepSort_Pytorch/releases/download/v5.2/siz2.pt .
COPY weights/Arial.ttf /root/.config/Ultralytics/
COPY weights/osnet_ibn_x1_0_MSMT17.pth  deep_sort/deep/checkpoint/

COPY requirements.txt /tmp/
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt

COPY src/ /usr/src/app/

ENTRYPOINT ["python3", "track.py", "--yolo_model", "siz2.pt", "--source"]

