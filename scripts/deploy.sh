#!/bin/bash

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

nvm use;
yarn;

cd apps/cms;
yarn;
yarn export;

# pm2 restart 'cms-tngvi'; 
# pm2 restart 'cms-sjm'; 

cd ../tngvi;
nvm use;
yarn;
yarn build;

cd ../sjm;
nvm use;
yarn;
yarn build;

pm2 restart 'app-tngvi'; 
pm2 restart 'app-sjm'; 