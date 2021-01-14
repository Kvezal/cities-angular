#!/usr/bin/env sh

sudo docker build -t kvezal/cities-angular -f docker/Dockerfile .
sudo docker push kvezal/cities-angular
