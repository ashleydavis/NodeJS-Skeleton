#!/bin/bash
# Note: if you update this file and deploy, this script will be invoke on the serer.

CWD=$(pwd)
D=$(date +"%m_%d_%Y")
LOG=$(pwd)/logs/restart_$D.log
echo === $D === > $LOG 2>&1 
echo Current directory = $CWD >> $LOG 2>&1 
echo User = $USER >> $LOG 2>&1 

echo === Deleting PM2 server entry === >> $LOG 2>&1 
pm2 delete server >> $LOG 2>&1 

echo === Cleaning tmp directory === >> $LOG 2>&1 
sudo rm -rf ~/tmp >> $LOG 2>&1 

echo === Installing npm deps === >> $LOG 2>&1 
cd $CWD/Server >> $LOG 2>&1 
npm install -y --no-bin-links >> $LOG 2>&1 

echo === Starting server === >> $LOG 2>&1 
pm2 start ./server.js --name server >> $LOG 2>&1 

echo === Saving PM2 setup === >> $LOG 2>&1 
pm2 save >> $LOG 2>&1 
echo Restart after commit $HG_NODE >> $LOG 2>&1 
