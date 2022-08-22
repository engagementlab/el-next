#!/bin/bash

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;


nvm use;
yarn;
yarn build;
cd apps/tngvi;
yarn;
yarn dev;

pm2 restart 'transform-narratives'; 
