# main.py

import uvicorn
from fastapi import FastAPI
from secret import API
import subprocess
from fastapi import FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect, Response
from websockets.exceptions import ConnectionClosedOK

from starlette.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from fastapi.responses import StreamingResponse
from fastapi.templating import Jinja2Templates
import logging
from log import log_config

logging.config.dictConfig(log_config)
app = FastAPI()

logger = logging.getLogger("main")

templates = Jinja2Templates(directory="templates")
import sys

sys.path.insert(0, '..')


@app.websocket("/ws/{id}")
async def get_stream(id: str, websocket: WebSocket):
    if id != API:
        logger.info("NOOOOOOOOO")
        await websocket.close(403, "wrong password")
        return
    await websocket.accept()
    logger.info("OOOOOOOOOOOOOOOOOOOOOOKK")
    p = subprocess.Popen('ls',
                         shell=True,
                         stdout=subprocess.PIPE,
                         stderr=subprocess.STDOUT)
    for line in p.stdout.readlines():
        line = line.decode('utf-8')[:-1]
        logger.info(line)
        await websocket.send_text(line)
    retval = p.wait()
    return {"msg": "AAAAAAAAAA", "ret": retval}


@app.get("/deploy/{password}")
def video_feed(password: str, request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        "id": password
    })


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8090)