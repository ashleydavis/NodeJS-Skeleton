echo "============== Provisioning =================="
D=$(date +"%m_%d_%Y")
mkdir logs
LOG=./logs/provision_$D.log
echo "============== Setting timezone =================="
sudo timedatectl set-timezone Australia/Brisbane
echo "============== OS Update =================="
#todo: sudo apt-get update
echo "============== Software Dependencies =================="
sudo apt-get install -y git
sudo apt-get install -y mercurial
sudo apt-get install -y nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo apt-get install -y npm
sudo apt-get install -y mongodb
sudo npm install -g -y bower
echo "============== PM2 setup =================="
sudo npm install pm2 -g --unsafe-perm
sudo env PATH=$PATH:/usr/bin pm2 startup ubuntu -u $USER
sudo chown -R $USER ./.pm2
echo "============== Fixing mongodb conf =================="
sudo sed -i 's/bind_ip = 127.0.0.1/#bind_ip  = 127.0.0.1/g' /etc/mongodb.conf
sudo service mongodb restart