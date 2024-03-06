#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_containers() {
    echo -e "${YELLOW}Verificando o status dos conteiners...${NC}"
    running=$(sudo docker compose -f ./Docker-compose.dev.yml ps | grep 'Up' | wc -l)
    if [ "$running" -eq 3 ]; then
        echo -e "${GREEN}Todos os conteiners já estão em execução.${NC}"
        return 1
    else
        echo -e "${YELLOW}Algum contêiner não está em execução.${NC}"
        return 0
    fi
}

start_containers() {
    echo -e "${YELLOW}Iniciando todos os conteiners...${NC}"
    sudo docker compose -f ./Docker-compose.dev.yml up --build -d
}
dir="./node_modules"

check_containers
status=$?

if [ "$status" -eq 0 ]; then
    start_containers
fi

if [ -d "$dir" ]; then
    echo ""
    echo -e "${GREEN}Node_modules já instalado...${NC}"
    echo ""
    echo -e "${YELLOW}Acessando o terminal do container Node da aplicação${NC}"
    docker exec -it diary_web-server bash
else
    echo ""
    echo -e "${GREEN}Instalando node_modules via container...${NC}"
    docker exec -it diary_web-server npm install

    echo ""
    echo -e "${YELLOW}Acessando terminal do container Node da aplicação${NC}"
    docker exec -it diary_web-server bash
fi
