#!/bin/bash

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;


nvm use;
yarn;
yarn build;
cd apps/cms;
yarn;

pm2 restart 'el-cms-new'; 

cd ../apps/tngvi;
nvm use;
yarn;

pm2 restart 'transform-narratives'; 
