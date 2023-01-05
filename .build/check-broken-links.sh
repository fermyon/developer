#!/bin/bash
set -euo pipefail

require() {
  if ! hash "$1" &>/dev/null; then
    echo "'$1' not found in PATH"
    exit 1
  fi
}

## add broken-link-checker to PATH
export PATH=$PATH:`pwd`/node_modules/broken-link-checker/bin

require spin
require timeout
require blc

echo "starting developer portal"

## start the developer portal in background
(npm run spin >/dev/null 2>&1 &)

## wait for portal to be up and running
timeout 60s bash -c 'until curl --silent -f http://localhost:3000 > /dev/null; do sleep 2; done'

## Run the broken link checker          
blc --recursive http://127.0.0.1:3000                                                                                                                                                       \
                                                                                                                                                                                            \
    `## returns 403`                                                                                                                                                                        \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits'                                                                            \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account'                                                    \
    --exclude 'https://docs.github.com/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email'    \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification'                                                        \
                                                                                                                                                                                            \
    `## false positives`                                                                                                                                                                    \
    --exclude 'https://marketplace.visualstudio.com/items?itemName=fermyon.spin-vscode&ssr=false#overview'                                                                                  \
    --exclude 'https://marketplace.visualstudio.com/items?itemName=fermyon.autobindle'                                                                                                      \
    --exclude 'https://crates.io/'                                                                                                                                                          \
    --exclude 'https://crates.io/crates/bytes'                                                                                                                                              \
    --exclude 'https://crates.io/crates/http'                                                                                                                                               \
    --exclude 'https://events.hashicorp.com/hashitalksdeploy'                                                                                                                               \
    --exclude 'https://www.instagram.com/fermyontech/'                                                                                                                                      \
    --exclude 'https://www.linkedin.com/company/fermyon/'