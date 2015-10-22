echo "============== Creating deployment repo =================="
mkdir deployment
mkdir ./deployment/logs
hg init deployment
echo "[hooks]" >> deployment/.hg/hgrc
echo "changegroup = hg up >> ./logs/update.log; chmod +x ./Deployed/server_restart.sh; ./Deployed/server_restart.sh" >> deployment/.hg/hgrc
echo "============== Done =================="
