#!/bin/bash

cp build.htaccess dist/.htaccess

echo "Minifying the Javascript now...."
for jsfile in $(find dist -type f -name "*.js" | grep -v learning); do
    uglifyjs $jsfile -c -m -o $jsfile 2>/dev/null
done


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
