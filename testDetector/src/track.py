# limit the number of cpus used by high performance libraries
import os
import base64

import argparse
import os
import platform
import shutil
import time
from pathlib import Path
from datetime import datetime
import redis as Redis
import json
import signal
import shutil


class Timer:

    def __init__(self):
        self.t = None

    def __call__(self):
        t = datetime.now()
        if self.t:
            delta = (t - self.t).microseconds
        else:
            delta = 0
        self.t = t
        return delta


redis = Redis.Redis(host='localhost', port=6379, db=0)
timer = Timer()


def detect(opt):
    os.makedirs('/mount/out/')
    shutil.move('test.mp4', '/mount/out/test.mp4')

    def handler(signum, frame):
        print('handler!!!!!!!!')
        fp = open('/mount/ok', 'x')
        fp.close()
        exit(signum)

    redis_id = opt.redis_id
    i = 0
    frame_idx = -1
    while frame_idx < 1000:
        if frame_idx == 0:
            signal.signal(signal.SIGTERM, handler)
        frame_idx += 1
        timer()
        i = (i + 1) % 2
        with open(f'{i}.jpg', 'rb') as f:
            img = f.read()
        time.sleep(0.1)
        result = []

        id = 1
        cls = 0
        names = ['obj_name']
        conf = 0.78
        bboxes = [1, 2, 3, 4]
        result.append(
            (int(id), names[int(cls)], float(conf), list(map(float, bboxes))))

        print(f'Done. ({timer():.3f}s)')
        jpg_as_text = base64.b64encode(img)

        redis.hset(redis_id, frame_idx,
                   json.dumps({
                       'frame': frame_idx,
                       'data': result
                   }))
        redis.hset('jpg', redis_id, jpg_as_text)
        redis.publish(redis_id, frame_idx)
    fp = open('/mount/ok', 'x')
    fp.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--yolo_model',
                        nargs='+',
                        type=str,
                        default='yolov5m.pt',
                        help='model.pt path(s)')
    parser.add_argument('--deep_sort_model',
                        type=str,
                        default='osnet_ibn_x1_0_MSMT17')
    parser.add_argument('--source', type=str, default='0',
                        help='source')  # file/folder, 0 for webcam
    parser.add_argument('--output',
                        type=str,
                        default='inference/output',
                        help='output folder')  # output folder
    parser.add_argument('--imgsz',
                        '--img',
                        '--img-size',
                        nargs='+',
                        type=int,
                        default=[640],
                        help='inference size h,w')
    parser.add_argument('--conf-thres',
                        type=float,
                        default=0.5,
                        help='object confidence threshold')
    parser.add_argument('--iou-thres',
                        type=float,
                        default=0.5,
                        help='IOU threshold for NMS')
    parser.add_argument('--fourcc',
                        type=str,
                        default='mp4v',
                        help='output video codec (verify ffmpeg support)')
    parser.add_argument('--device',
                        default='',
                        help='cuda device, i.e. 0 or 0,1,2,3 or cpu')
    parser.add_argument('--show-vid',
                        action='store_true',
                        help='display tracking video results')
    parser.add_argument('--save-vid',
                        action='store_true',
                        help='save video tracking results')
    parser.add_argument('--save-txt',
                        action='store_true',
                        help='save MOT compliant results to *.txt')
    # class 0 is person, 1 is bycicle, 2 is car... 79 is oven
    parser.add_argument('--classes',
                        nargs='+',
                        type=int,
                        help='filter by class: --class 0, or --class 16 17')
    parser.add_argument('--agnostic-nms',
                        action='store_true',
                        help='class-agnostic NMS')
    parser.add_argument('--augment',
                        action='store_true',
                        help='augmented inference')
    parser.add_argument('--update',
                        action='store_true',
                        help='update all models')
    parser.add_argument('--evaluate',
                        action='store_true',
                        help='augmented inference')
    parser.add_argument("--config_deepsort",
                        type=str,
                        default="deep_sort/configs/deep_sort.yaml")
    parser.add_argument("--half",
                        action="store_true",
                        help="use FP16 half-precision inference")
    parser.add_argument('--visualize',
                        action='store_true',
                        help='visualize features')
    parser.add_argument('--max-det',
                        type=int,
                        default=1000,
                        help='maximum detection per image')
    parser.add_argument('--save-crop',
                        action='store_true',
                        help='save cropped prediction boxes')
    parser.add_argument('--dnn',
                        action='store_true',
                        help='use OpenCV DNN for ONNX inference')
    parser.add_argument('--name',
                        default='exp',
                        help='save results to project/name')
    parser.add_argument('--exist-ok',
                        action='store_true',
                        help='existing project/name ok, do not increment')
    parser.add_argument('--project',
                        default='/mount/out',
                        help='save results to project/name')
    parser.add_argument('--redis-id',
                        default=0,
                        help='redis id to save result')
    opt = parser.parse_args()
    opt.imgsz *= 2 if len(opt.imgsz) == 1 else 1  # expand
    detect(opt)
