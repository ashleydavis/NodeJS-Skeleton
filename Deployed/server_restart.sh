#!/bin/bash
# Note: if you update this file and deploy, this script will be invoke on the serer.

D=$(date +"%m_%d_%Y")
LOG=$(pwd)/logs/restart_$D.log
echo === $D === > $LOG
pm2 delete all >> $LOG
cd ./Server >> $LOG
npm install -y --no-bin-links >> $LOG
pm2 start ./server.js >> $LOG
pm2 save >> $LOG
echo Restart after commit $HG_NODE >> $LOG
