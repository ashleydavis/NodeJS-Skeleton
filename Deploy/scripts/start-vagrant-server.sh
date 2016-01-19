echo ===== Starting Server =====

echo === Installing npm deps ===
cd ~/deployment/Server
npm install -y --no-bin-links

echo === Starting server ===
forever start server.js

echo ===== Server Started =====
