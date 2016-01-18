echo ===== Starting Server =====
sudo stop nodejs-skeleton

echo === Installing npm deps ===
cd ~/deployment/Server && npm install -y --no-bin-links

echo === Starting server ===
sudo start nodejs-skeleton

# For errors
# sudo cat /var/log/upstart/nodejs-skeleton.log

echo ===== Server Started =====
