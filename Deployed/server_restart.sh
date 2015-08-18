#!/bin/bash
# Note: if you update this file and deploy, this script will be invoke on the serer.

D=$(date +"%m_%d_%Y")
LOG=$(pwd)/logs/restart_$D.log
echo === $D === > $LOG 2>&1 
pm2 delete all >> $LOG 2>&1 
cd ./Server >> $LOG 2>&1 
npm install -y --no-bin-links >> $LOG 2>&1 
pm2 start ./server.js >> $LOG 2>&1 
pm2 save >> $LOG 2>&1 
echo Restart after commit $HG_NODE >> $LOG 2>&1 
