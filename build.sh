#!/bin/bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

#echo "Ensuring the permissions are set correctly"
#chown -R root ../maker-front/*
#chown -R root ../maker-back/*
#chmod -R 775 ../maker-front/*
#chmod -R 775 ../maker-back/*
#chgrp -R www-data ../maker-front/.
#chgrp -R www-data ../maker-back/.
#chmod -R g+rw ../maker-front/*
#chmod -R g+rw ../maker-back/*

#npm install
#npm run build
#pm2 stop all 

echo "Searching for Coinhive.  This takes time, please wait....";
for file in `grep -Ril coinhive dist/*`; do
   echo "****************************************************************************************"
   echo " COINHIVE Injection found in the file : $dist/$file"
   echo " Please correct the file before running the code!!"
   echo "****************************************************************************************"
done
for file in `grep -Ril coinhive dist-server/*`; do
   echo "****************************************************************************************"
   echo " COINHIVE Injection found in the file : dist-server/$file"
   echo " Please correct the file before running the code!!"
   echo "****************************************************************************************"
done

if [[ $BUILD_ENV -eq "STAGE" ]]; then
   echo "Correcting Stage Path"
   find ./dist/ -type f -exec \
       sed -i 's/:\/\/makershare/\/\/preview.makershare/g' {} +
   find ./dist/ -type f -exec \
       sed -i 's/:\/\/manage-makershare/\/\/preview-manage.makershare/g' {} +
fi 

