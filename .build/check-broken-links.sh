#!/bin/bash
set -euo pipefail

require() {
  if ! hash "$1" &>/dev/null; then
    echo "'$1' not found in PATH"
    exit 1
  fi
}

cleanup() {
  if [[ "$?" == "124" ]]; then
    echo "timeout exceeded waiting for the developer portal to run"
  fi
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

## allow unpublished content during broken link checker
export PREVIEW_MODE=1

## start the developer portal in background
npm run spin >/dev/null 2>&1 &

## wait for portal to be up and running
export RESP_CODE="$(mktemp)"
timeout 60s bash -c 'until curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000 > $RESP_CODE; do sleep 2; done'

echo "checking website health via http://localhost:3000"

[[ "$(< $RESP_CODE)" == "200" ]] && \
  (echo "Success: website returned a 200 response code") || \
  (echo "Failure: unexpected response code: $(< $RESP_CODE)" && exit 1)

echo "starting link checker"

## Run the broken link checker
report="$(mktemp)"
blc_error=false
blc --recursive http://127.0.0.1:3000                                                                                                                                                       \
                                                                                                                                                                                            \
    `## Ignore searching Edit links`                                                                                                                                                        \
    --exclude 'https://github.com/fermyon/developer/blob/main/content/*'                                                                                                                    \
                                                                                                                                                                                            \
    `## returns 403`                                                                                                                                                                        \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits'                                                                            \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account'                                                    \
    --exclude 'https://docs.github.com/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email'    \
    --exclude 'https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification'                                                        \
    --exclude 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template'                                                            \
    --exclude 'https://twitter.com/fermyontech'                                                                                                                                             \
    --exclude 'https://twitter.com/fermyontech/status/1641537393818738710'                                                                                                                  \
    --exclude 'https://www.godaddy.com'                                                                                                                                                     \
    --exclude 'https://linux.die.net/man/1/which'                                                                                                                                           \
                                                                                                                                                                                            \
    `## false positives`                                                                                                                                                                    \
    --exclude 'https://www.gnu.org/software/coreutils/'                                                                                                                                     \
    --exclude 'https://events.hashicorp.com/hashitalksdeploy'                                                                                                                               \
    --exclude 'https://dotnet.microsoft.com/en-us/download/dotnet/8.0'                                                                                                                      \
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
    --exclude 'https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/'                                                                         \
    --exclude 'https://support.google.com/domains/answer/3290309?hl=en#'                                                                                                                    \
    --exclude 'https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor'                                                                                                              \
    --exclude 'https://www.reddit.com/r/Clojure/comments/jkznto/web_assembly_clojure_current_state/'                                                                                        \
    --exclude 'https://www.reddit.com/r/Rlanguage/comments/b4izog/compile_r_to_webassembly_and_use_as_a_data/'                                                                              \
    --exclude 'https://www.tutorialspoint.com/webassembly/webassembly_working_with_cplusplus.htm'                                                                                           \
    --exclude 'http://localhost:16686/'                                                                                                                                                     \
    --exclude 'http://localhost:5050/explore'                                                                                                                                               \
    --exclude 'http://localhost:5050/explore'                                                                                                                                               \
    --exclude 'https://stackshare.io/stackups/powershell-vs-webassembly'                                                                                                                   \
    --exclude 'https://blog.cloudflare.com/cloudflare-workers-now-support-cobol/'                                                                                                                   \
    --exclude 'https://support.google.com/webmasters/answer/9008080?hl=en' | tee "${report}" || blc_error=true

cat "${report}" | grep "├─BROKEN─" > broken_links || true

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
  if [ "${blc_error}" == "true" ]; then
    echo "Failure: error(s) encountered attempting to check website links" && exit 1
  fi
  echo "All the links are valid!"
fi
