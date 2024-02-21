#!/bin/bash

docker compose -f ../Docker-compose.dev.yml up --build -d

 dir="../node_modules"

if [ -d "$dir" ]; then
    echo "Node_modules already installed..."
    docker exec -it diary_web-server npm run start
else
    echo "Install node_modules..."
    docker exec -it diary_web-server npm install
    docker exec -it diary_web-server nest start --watch
fi