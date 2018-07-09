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
      #if [[ $file  == *.md* ]]; then
      #   # Ignore the README files in the node_modules
      #else
         echo "****************************************************************************************"
         echo " $injection Injection found in the file : $file"
         echo " Please correct the file before running the code!!"
         echo "****************************************************************************************"
      #fi
     #echo $file
   done
done

bdiff=$(git status | grep "modified: ")
echo "$bdiff"

