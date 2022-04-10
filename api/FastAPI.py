from fastapi import FastAPI
import requests

app = FastAPI()

@app.get('/{test}')
def home(test):
    return test

@app.post('/url/{url}')
def sendUrl(url: str):
    return url
