#!/bin/bash

cd /srv/apps/el-next/;
git pull;

# Remove exited containers
docker ps -a -q -f status=exited | xargs --no-run-if-empty docker rm -v

# Remove dangling images
docker images -f "dangling=true" -q | xargs --no-run-if-empty docker rmi

# Remove unused images
docker images | awk '/ago/  { print $3}' | xargs --no-run-if-empty docker rmi

# Remove dangling volumes
docker volume ls -qf dangling=true | xargs --no-run-if-empty docker volume rm

docker build -t el-next . --network=host;
docker compose up -d;

# Source/load nvm
# [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

# nvm use;
# yarn;

# # cd apps/cms;
# # yarn;
# # yarn export;

# # cd ../tngvi;
# # nvm use;
# # yarn;
# # yarn build;

# # cd ../sjm;
# # nvm use;
# # yarn;
# # yarn build;

# pm2 restart 'app-tngvi'; 
# pm2 restart 'app-sjm'; 

