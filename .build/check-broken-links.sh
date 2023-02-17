#!/bin/bash
set -euo pipefail

require() {
  if ! hash "$1" &>/dev/null; then
    echo "'$1' not found in PATH"
    exit 1
  fi
}

cleanup() {
  echo "stopping process for $$"
  cleanup_with_child $$ false
}

cleanup_with_child() {
  local pid="$1"
  local and_self="${2:-false}"

  echo "cleanup_with_child $pid"

  if children="$(pgrep -P "$pid")"; then
      for child in $children; do
          echo "stopping child $child (parent: $pid)"
          cleanup_with_child "$child" true
      done
  fi

  if [[ "$and_self" == true ]]; then
      echo "stopping self $pid"
      kill -9 "$pid" 2>/dev/null || true
  fi
}

trap cleanup EXIT

## add broken-link-checker to PATH
export PATH=$PATH:`pwd`/node_modules/broken-link-checker/bin

require spin
require timeout
require blc

echo "starting developer portal"

## start the developer portal in background
npm run spin >/dev/null 2>&1 &

## wait for portal to be up and running
timeout 60s bash -c 'until curl --silent -f http://localhost:3000 > /dev/null; do sleep 2; done'

echo "starting link checker"

## Run the broken link checker          
blc --recursive http://127.0.0.1:3000                                                                                                                                                       \
                                                                                                                                                                                            \
    `## returns 403`                                                                                                                                                                        \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits'                                                                            \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account'                                                    \
    --exclude 'https://docs.github.com/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email'    \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification'                                                        \
    --exclude 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template'                                                            \
                                                                                                                                                                                            \
    `## false positives`                                                                                                                                                                    \
    --exclude 'https://events.hashicorp.com/hashitalksdeploy'                                                                                                                               \
    --exclude 'https://www.developerweek.com/'                                                                                                                                              \
    --exclude 'https://marketplace.visualstudio.com/items?itemName=fermyon.spin-vscode&ssr=false#overview'                                                                                  \
    --exclude 'https://marketplace.visualstudio.com/items?itemName=fermyon.autobindle'                                                                                                      \
    --exclude 'https://crates.io/'                                                                                                                                                          \
    --exclude 'https://crates.io/crates/bytes'                                                                                                                                              \
    --exclude 'https://crates.io/crates/http'                                                                                                                                               \
    --exclude 'https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one'                                                                                              \
    --exclude 'https://events.hashicorp.com/hashitalksdeploy'                                                                                                                               \
    --exclude 'https://www.instagram.com/fermyontech/'                                                                                                                                      \
    --exclude 'https://www.linkedin.com/company/fermyon/'                                                                                                                                   \
    --exclude 'https://support.google.com/webmasters/answer/7552505'                                                                                                                        \
    --exclude 'https://support.google.com/webmasters/answer/9008080?hl=en'| tee /dev/stderr | grep "├─BROKEN─" > broken_links || true
   

if [ -s broken_links ]; then
  echo "Some links are broken, retrying to check for transient errors"
  while read -r line; do
    url="$(echo $line | awk '{print $2}')"
    if curl --retry 5 --retry-all-errors --retry-delay 1 --output /dev/null --silent --head --fail "$url"; then
      echo "$url is not broken"
    else
      echo "$line" >> final_broken
    fi
  done <broken_links
  if [ -f "final_broken" ]; then  
    echo -e "The list of broken links are\n"
    cat -n final_broken
    exit 1
  else  
    echo "All the errors were transient. The links are valid!"  
  fi  
else
  echo "All the links are valid!"
fi
