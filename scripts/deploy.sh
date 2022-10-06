#!/bin/bash

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

nvm use;
yarn;
yarn build;

cd apps/cms;
yarn;
yarn build;

pm2 restart 'el-cms-new'; 

cd ../tngvi;
nvm use;
yarn;

pm2 restart 'transform-narratives'; 