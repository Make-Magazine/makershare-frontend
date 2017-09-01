npm install
npm run build
pm2 stop all 
sudo cp -r src/assets dist/assets
sass dist/assets/css/style.scss dist/assets/css/style.css
pm2 restart all