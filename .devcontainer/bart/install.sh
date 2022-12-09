#! /bin/bash

VERSION="v0.6.0"
# OSARCH="linux-amd64"

wget https://github.com/fermyon/bartholomew/releases/download/${VERSION}/bart
chmod a+x bart
su
mv ./bart /usr/local/bin/