FROM drpilman/ml_cv:cuda-11.4.0-ubuntu20.04

COPY requirements.txt /tmp/
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /usr/src/app
COPY src/ /usr/src/app/

RUN pip3 install --no-cache-dir -r Yolov5_DeepSort_Pytorch/requirements.txt




