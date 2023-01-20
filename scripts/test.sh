#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games

# Have to re-assign vars from shell env
export AZURE_STORAGE_CONNECTION_STRING=$AZURE_STORAGE_CONNECTION_STRING

echo "------- Upload app build to Azure. -------"
# Upload app build to Azure
az storage blob upload-batch --overwrite true --account-name $STORAGE_ACCOUNT -d '$web' -s "./apps/${APP_NAME}/out"