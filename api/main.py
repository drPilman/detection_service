from fastapi import FastAPI
from model import URL

app = FastAPI()

@app.post('/url')
def sendUrl(url: URL):
    return url
