#! /bin/bash

VERSION="v0.6.0"
# OSARCH="linux-amd64"

wget https://github.com/fermyon/bartholomew/releases/download/${VERSION}/bart
su
mv ./bart /usr/local/bin/
chmod a+x /usr/local/bin/bart