#!/bin/bash
if [ $# -ne 2 ]; then
  echo "Usage: $0 <current_version> <new_version>"
  echo "Usage: $0 v2.5.0 v2.6.0"
  exit 1
fi
SPIN_CURRENT=$1
SPIN_LATEST=$2
SPIN_CURRENT_TMP=$(mktemp -d tmp.XXXXXX)
echo "Temporary directory created at: $SPIN_CURRENT_TMP"
SPIN_LATEST_TMP=$(mktemp -d tmp.XXXXXX)
echo "Temporary directory created at: $SPIN_LATEST_TMP"
SPIN_CURRENT_INSTALL_DIR="$SPIN_CURRENT_TMP/$SPIN_CURRENT"
SPIN_LATEST_INSTALL_DIR="$SPIN_LATEST_TMP/$SPIN_LATEST"
mkdir $SPIN_CURRENT_INSTALL_DIR
mkdir $SPIN_LATEST_INSTALL_DIR
cp -rp check_cli_output.py $SPIN_CURRENT_INSTALL_DIR
cp -rp check_cli_output.py $SPIN_LATEST_INSTALL_DIR
cd $SPIN_CURRENT_INSTALL_DIR
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v $SPIN_CURRENT
python3 check_cli_output.py > $SPIN_CURRENT
cd ../../
cd $SPIN_LATEST_INSTALL_DIR
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v $SPIN_LATEST
python3 check_cli_output.py > $SPIN_LATEST
cd ../../
diff $SPIN_CURRENT_INSTALL_DIR/$SPIN_CURRENT $SPIN_LATEST_INSTALL_DIR/$SPIN_LATEST
rm -r tmp.*
