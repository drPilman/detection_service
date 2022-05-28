FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9-alpine3.14


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt --no-cache-dir
COPY ./app /app

EXPOSE 8000

HEALTHCHECK --interval=1s --timeout=3s --retries=5 \
    CMD curl --fail http://localhost:8000/ || exit 1  

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


