FROM python:3.10.4-alpine3.15

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip3 install -r requirements.txt --no-cache-dir

COPY . .

CMD ["pytest"]



