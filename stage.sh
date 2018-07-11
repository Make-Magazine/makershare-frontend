#!/bin/bash

echo "Correcting Stage Path"
find ./dist/ -type f -exec \
    sed -i 's/:\/\/makershare/:\/\/preview.makershare/g' {} +
find ./dist/ -type f -exec \
    sed -i 's/:\/\/manage-makershare/:\/\/preview-manage.makershare/g' {} +
