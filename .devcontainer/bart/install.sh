#! /bin/bash

VERSION="v0.6.0"
OSARCH="linux-amd64"

wget https://github.com/fermyon/bartholomew/releases/download/${VERSION}/bart-cli-${VERSION}-${OSARCH}.tar.gz
tar -zxvf bart-cli-${VERSION}-${OSARCH}.tar.gz
su
mv ./bart /usr/local/bin/