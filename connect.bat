@echo off
setlocal
if "%1" == "" set sshhost=nodejs-skeleton
if not "%1" == "" set sshhost=%1
ssh someuser@%sshhost%.cloudapp.net -i .\keys\your-private.key -o "StrictHostKeyChecking no" -C 
