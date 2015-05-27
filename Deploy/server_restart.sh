#!/bin/bash
# Note: if you update this file and deploy, this script will be invoke on the serer.

D=$(date +"%m_%d_%Y")
LOG=./logs/restart_$D.log
echo === $D === > $LOG
forever stopall >> $LOG
forever start ./Server/server.js >> $LOG
echo Restart after commit $HG_NODE >> $LOG
