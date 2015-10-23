echo ===== Starting Server =====

echo === Deleting PM2 server entry ===
pm2 delete server

echo === Cleaning tmp directory ===
sudo rm -rf ~/tmp

echo === Installing npm deps ===
cd ~/deployment/Server && npm install -y --no-bin-links

echo === Starting server ===
cd ~/deployment/Server && pm2 start ./server.js --name server

echo === Saving PM2 setup ===
pm2 save

echo ===== Server Started =====
