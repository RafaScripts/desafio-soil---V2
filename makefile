net:
    docker network create --driver bridge --subnet 172.20.0.0/16 soil-net

up:
    docker compose up -d

uplog:
    docker compose up

down:
    docker compose down
