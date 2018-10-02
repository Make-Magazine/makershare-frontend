#!/bin/bash

if [[ $BUILD_ENV -ne "DEV" ]]; then
   if [[ $EUID -ne 0 ]]; then
      echo "This script must be run as root" 
      exit 1
   fi
fi

npm install --unsafe-perm=true --allow-root
npm audit fix --unsafe-perm=true --allow-root
npm run build
if [[ $BUILD_ENV -ne "DEV" ]]; then
#  pm2 stop all 
fi
