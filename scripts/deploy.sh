#!/bin/bash

cd /srv/apps/el-next/;
git pull;
docker build -t el-next . --network=host --no-cache;
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

