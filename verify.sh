#!/bin/bash

for injection in 'coinhive' \
                 'cdn.rawgit.com' \
                 'void 0===window' 
do
   echo "Searching for $injection.  This takes time, please wait ...";
   for file in `grep -Ril "$injection" dist/*`; do
      echo "****************************************************************************************"
      echo " $injection Injection found in the file : $file"
      echo " Please correct the file before running the code!!"
      echo "****************************************************************************************"
   done
   for file in `grep -Ril "$injection" dist-server/*`; do
      echo "****************************************************************************************"
      echo " $injection Injection found in the file : $file"
      echo " Please correct the file before running the code!!"
      echo "****************************************************************************************"
   done
   for file in `grep -Ril "$injection" node_modules/* | grep -vi readme.md`; do
      echo "****************************************************************************************"
      echo " $injection Injection found in the file : $file"
      echo " Please correct the file before running the code!!"
      echo "****************************************************************************************"
   done
   ## scan the Drupal code
   for file in `grep -Ril "$injection" ../maker-back/*`; do
      echo "****************************************************************************************"
      echo " $injection Injection found in the file : $file"
      echo " Please correct the file before running the code!!"
      echo "****************************************************************************************"
   done
   ## scan the Rio Drupal code
   for file in `grep -Ril "$injection" ../makershare/* | grep -vi readme.md`; do
      echo "****************************************************************************************"
      echo " $injection Injection found in the file : $file"
      echo " Please correct the file before running the code!!"
      echo "****************************************************************************************"
   done
done

bdiff=$(git status | grep "modified: ")
echo "$bdiff"

