#!/bin/bash

cp build.htaccess dist/.htaccess
#cp 401.html dist/401.html

SOURCE="${BASH_SOURCE[0]}";
RDIR="$( pwd )"
echo "Source = $SOURCE";
echo "Dir = $RDIR";

## Ensure the links exists
if [ ! -L "dist/learning" ]; then
  if [[ "$RDIR" =~ "preview.makershare.com" ]]; then
    ln -s /home/jazminel/public_html/preview-learning/_site dist/learning
    echo "Directory Preview";
  else
    ln -s /home/jazminel/public_html/learning/_site dist/learning
    echo "Directory Makershare";
  fi
#  echo "Learning does not exists";
fi
if [ ! -L "dist/static-assets" ]; then
   ln -s assets/static-pages/static-assets/ dist/static-assets
fi
if [ ! -L "dist/fonts" ]; then
   ln -s assets/fonts dist/fonts
fi
