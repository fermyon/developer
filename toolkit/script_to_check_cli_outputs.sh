#!/bin/bash
if [ $# -ne 2 ]; then
  echo "Usage: $0 <current_version> <new_version>"
  echo "Usage: $0 v2.6.0 v2.7.0"
  exit 1
fi
SPIN_CURRENT=$1
SPIN_LATEST=$2
mkdir ~/$SPIN_CURRENT
mkdir ~/$SPIN_LATEST
cp -rp check_cli_output.py ~/$SPIN_CURRENT
cp -rp check_cli_output.py ~/$SPIN_LATEST
cd ~
cd $SPIN_CURRENT
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v $SPIN_CURRENT
python3 check_cli_output.py > $SPIN_CURRENT
cd ../ 
cd $SPIN_LATEST
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v $SPIN_LATEST
python3 check_cli_output.py > $SPIN_LATEST
cd ../
diff $SPIN_CURRENT/$SPIN_CURRENT $SPIN_LATEST/$SPIN_LATEST
rm -rf ~/$SPIN_CURRENT
rm -rf ~/$SPIN_LATEST
