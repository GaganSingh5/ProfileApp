FROM ubuntu:18.04
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Kolkata
RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev
RUN apt-get install -y python3-opencv
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
COPY . /app
CMD [ "python3", "./main.py" ]
