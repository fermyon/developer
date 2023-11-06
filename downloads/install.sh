#!/usr/bin/env bash
set -euo pipefail

# Fancy colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color aka reset

# Version to install. Defaults to latest or set by --version or -v
VERSION=""

# Print in colors - 0=green, 1=red, 2=neutral
# e.g. fancy_print 0 "All is great"
fancy_print() {
    if [[ $1 == 0 ]]; then
        echo -e "${GREEN}${2}${NC}"
    elif [[ $1 == 1 ]]; then
        echo -e "${RED}${2}${NC}"
    elif [[ $1 == 3 ]]; then
        echo -e "${YELLOW}${2}${NC}"
    else
        echo -e "${2}"
    fi
}

# Function to print the help message
print_help() {
    fancy_print 2 ""
    fancy_print 2 "---- Spin Installer Script ----"
    fancy_print 2 "This script installs Spin in the current directory."
    fancy_print 2 ""
    fancy_print 2 "Command line arguments"
    fancy_print 2 "--version or -v  : Provide what version to install e.g. \"v0.8.0\" or \"canary\"."
    fancy_print 2 "--help    or -h  : Shows this help message"
}

# Function used to check if utilities are available
require() {
    if ! hash "$1" &>/dev/null; then
        fancy_print 1 "'$1' not found in PATH. This is required for this script to work."
        exit 1
    fi
}

# Parse input arguments
while [[ $# -gt 0 ]]; do
    case $1 in
    '--version' | -v)
        shift
        if [[ $# -ne 0 ]]; then
            VERSION="${1}"
        else
            fancy_print 1 "Please provide the desired version. e.g. --version v0.8.0 or -v canary"
            exit 0
        fi
        ;;
    '--help' | -h)
        shift
        print_help
        ;;
    *)
        fancy_print 1 "Unknown argument ${1}."
        print_help
        exit 1
        ;;
    esac
    shift
done

# Check all required utilities are available
require curl
require tar
require uname

# Check if we're on a supported system and get OS and processor architecture to download the right version
UNAME_ARC=$(uname -m)

case $UNAME_ARC in
"x86_64")
    ARC="amd64"
    ;;
"arm64" | "aarch64")
    ARC="aarch64"
    ;;
*)
    fancy_print 1 "The Processor type: ${UNAME_ARC} is not yet supported by Spin."
    exit 1
    ;;
esac

case $OSTYPE in
"linux-gnu"*)
    OS="linux"
    ;;
"darwin"*)
    OS="macos"
    ;;
*)
    fancy_print 1 "The OSTYPE: ${OSTYPE} is not supported by this script."
    fancy_print 2 "Please refer to this article to install Spin: https://developer.fermyon.com/spin/quickstart"
    exit 1
    ;;
esac

# Check desired version. Default to latest if no desired version was requested
if [[ $VERSION = "" ]]; then
    VERSION=$(curl -so- https://github.com/fermyon/spin/releases | grep 'href="/fermyon/spin/releases/tag/v[0-9]*.[0-9]*.[0-9]*\"' | sed -E 's/.*\/fermyon\/spin\/releases\/tag\/(v[0-9\.]+)".*/\1/g' | head -1)
fi

# Constructing download FILE and URL
FILE="spin-${VERSION}-${OS}-${ARC}.tar.gz"
URL="https://github.com/fermyon/spin/releases/download/${VERSION}/${FILE}"

# Establish the location of current working environment
current_dir=$(pwd)

# Define Spin directory name
spin_directory_name=("/spin")

if [ -d "${current_dir}${spin_directory_name}" ]; then
    fancy_print 1 "Error: .${spin_directory_name} already exists, please delete ${current_dir}${spin_directory_name} and run the installer again."
    exit 1
fi

# Download file, exit if not found - e.g. version does not exist
fancy_print 0 "Step 1: Downloading: ${URL}"
curl -fsOL $URL || (fancy_print 1 "Error downloading the file: ${FILE}"; exit 1)
fancy_print 0 "Done...\n"

# Decompress the file
fancy_print 0 "Step 2: Decompressing: ${FILE}"
tar xfv $FILE
./spin --version
fancy_print 0 "Done...\n"

# Remove the compressed file
fancy_print 0 "Step 3: Removing the downloaded tarball"
rm $FILE
fancy_print 0 "Done...\n"

# Install default templates
fancy_print 0 "Step 4: Installing default templates"
./spin templates install --git "https://github.com/fermyon/spin" --upgrade
./spin templates install --git "https://github.com/fermyon/spin-python-sdk" --upgrade
./spin templates install --git "https://github.com/fermyon/spin-js-sdk" --upgrade

fancy_print 0 "Step 5: Installing default plugins"
./spin plugins update
if [[ $VERSION = "canary" ]]; then
    ./spin plugins install -u https://github.com/fermyon/spin-js-sdk/releases/download/canary/js2wasm.json --yes
    ./spin plugins install -u https://github.com/fermyon/spin-python-sdk/releases/download/canary/py2wasm.json --yes
    ./spin plugins install -u https://github.com/fermyon/cloud-plugin/releases/download/canary/cloud.json --yes
else
    ./spin plugins install js2wasm --yes
    ./spin plugins install py2wasm --yes
    ./spin plugins install cloud --yes
fi

if [[ $VERSION = "canary" ]]; then
    fancy_print 3 "Warning: You are using canary Spin, but templates use latest stable SDKs."
    fancy_print 3 "Be sure to update templates to point to 'canary' SDKs."
fi
# Direct to quicks-start doc
fancy_print 0 "You're good to go. Check here for the next steps: https://developer.fermyon.com/spin/quickstart"
fancy_print 0 "Run './spin' to get started"
