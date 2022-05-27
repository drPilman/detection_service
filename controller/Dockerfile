FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9-alpine3.14

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt --no-cache-dir
COPY ./app /app

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


