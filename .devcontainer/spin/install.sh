#! /bin/bash

# VERSION="v0.6.0"
# OSARCH="linux-amd64"

# wget https://github.com/fermyon/spin/releases/download/${VERSION}/spin-${VERSION}-${OSARCH}.tar.gz
# tar xfv spin-${VERSION}-${OSARCH}.tar.gz
# su
# mv ./spin /usr/local/bin/

# New non version-specific approach (using Spin install script)
curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
su
apt-get install -y build-essential libssl-dev pkg-config
mv spin /usr/local/bin/

