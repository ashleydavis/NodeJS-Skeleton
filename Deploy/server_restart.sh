#!/bin/bash
# Note: if you update this file and deploy, this script will be invoke on the serer.

D=$(date +"%m_%d_%Y")
LOG=./logs/restart_$D.log
echo === $D === > $LOG
pm2 delete all >> $LOG
pm2 start ./Server/server.js >> $LOG
pm2 save >> $LOG
echo Restart after commit $HG_NODE >> $LOG
