#!/bin/bash

if [[ $BUILD_ENV -ne "DEV" ]]; then
   if [[ $EUID -ne 0 ]]; then
      echo "This script must be run as root" 
      exit 1
   fi
fi

npm install
npm run build
if [[ $BUILD_ENV -ne "DEV" ]]; then
  pm2 stop all 
fi
