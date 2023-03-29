#!/bin/bash

cd /srv/apps/el-next/
git pull

# Pull swarm down
docker compose down

# Remove exited containers
docker ps -a -q -f status=exited | xargs --no-run-if-empty docker rm -v

# Remove dangling images
docker images -f "dangling=true" -q | xargs --no-run-if-empty docker rmi

# Remove unused images
docker images | awk '/ago/  { print $3}' | xargs --no-run-if-empty docker rmi

# Remove dangling volumes
docker volume ls -qf dangling=true | xargs --no-run-if-empty docker volume rm

# Traefik will complain about permissions on this otherwise...
chmod 600 proxy/acme.json

# Compile API app
npx --package typescript tsc --project ./apps/api

# Build image and daemonize services
DOCKER_BUILDKIT=1 docker compose up -d