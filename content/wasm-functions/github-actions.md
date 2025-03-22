title = "Deploy Using GitHub Actions"
template = "functions_main"
date = "2025-03-06T22:47:00Z"
enable_shortcodes = true

---
- [Create a Personal Access Token](#create-a-personal-access-token)
- [Create a GitHub Actions File](#create-a-github-actions-file)
- [Rotating Tokens](#rotating-tokens)
- [Adding Additional Build Tools](#adding-additional-build-tools)
- [Specifying Variables](#specifying-variables)
- [Next Steps](#next-steps)

This article will guide you through deploying a Spin Application to _Fermyon Wasm Functions_ using
GitHub Actions.

## Create a Personal Access Token

The first step is to generate a Personal Access Token (PAT). Personal Access Tokens are used for
authenticating with Fermyon Wasm Functions in situations where you do not have access to a browser
window, such as in the middle of a Continuous Integration (CI) or Continuous Deployment (CD)
workflow.

To generate a Personal Access Token for use in a GitHub Actions workflow, [install the Spin
CLI](/deploy#install-the-spin-cli) and follow these steps:

<!-- @selectiveCpy -->

```sh
$ spin aka login
$ spin aka tokens create --name mytoken
A personal access token has been created! The token will expire 30 days from now.
Here is your access token: pat_**************************
```

Copy the token to your clipboard. This is your only chance to see it, so make sure to save it
somewhere secure.

Once you have your token, add it to your GitHub repository's secrets:

1. Go to your repository on GitHub.
2. Click on **Settings**.
3. In the left sidebar, click **Secrets and Variables**, then click **Actions**.
4. Click **New repository secret**.
5. Name your secret `SPIN_AKA_ACCESS_TOKEN` and paste your Personal Access Token in the **Value**
   field.
6. Click **Add secret**.

You can use any name for `SPIN_AKA_ACCESS_TOKEN`. Just note that we will reference this variable in
the github actions workflow file later, so make sure to update it there as well.

Alternatively, you can use the `gh` cli to do this. The CLI will prompt you to enter a secret value.

<!-- @selectiveCpy -->

```sh
$ gh secret set SPIN_AKA_ACCESS_TOKEN
```

If you saved the access token in a file somewhere, you can have it read from that file:

<!-- @selectiveCpy -->

```sh
$ gh secret set SPIN_AKA_ACCESS_TOKEN < access_token.txt
```

Your Personal Access Token is now ready to be used in your GitHub Actions workflow. We will
reference it in the workflow file shown below.

## Create a GitHub Actions File

In your repository, create a new directory called `.github/workflows` if it doesn't already exist.
Inside this directory, create a new file named `deploy.yml` with the following content:

<!-- @selectiveCpy -->

```yaml
name: Deploy to Fermyon Wasm Functions

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Clone repository
      uses: actions/checkout@v4

    - name: Install Spin
      run: |
        curl -fsSL https://wasm-functions.fermyon.app/downloads/install.sh | bash
        mv spin /usr/local/bin/spin

    - name: Build
      run: spin build

    - name: Login to Fermyon Wasm Functions
      run: spin aka login --token ${{ secrets.SPIN_AKA_ACCESS_TOKEN }}

    - name: Deploy to Fermyon Wasm Functions
      run: spin aka deploy
```

This GitHub Actions workflow will trigger on every push to the `main` branch. It checks out your
repository, installs Spin, and deploys your Spin Application to Fermyon Wasm Functions using the
provided secrets.

## Rotating Tokens

By default, tokens generated with `spin aka tokens create` expire in 30 days. Once 30 days are up,
the token will expire and you must create a new token to continue using it in a CI/CD pipeline.

Before your token expires, create a new token to replace the old one:

<!-- @selectiveCpy -->

```sh
$ spin aka tokens create --name mynewtoken
A personal access token has been created! The token will expire 30 days from now.
Here is your access token: pat_**************************
```

If you need a longer time window between rotations, you can extend the expiration date up to 90 days
from the time it is issued:

<!-- @selectiveCpy -->

```sh
$ spin aka tokens create --name mynewtoken --expiration-days 90
A personal access token has been created! The token will expire 90 days from now.
Here is your access token: pat_**************************
```

Follow the steps above to update your `SPIN_AKA_ACCESS_TOKEN` repository secret to replace the old
value with the new personal access token you just created.

## Adding Additional Build Tools

Some applications need additional build tools installed before it will compile. For example, if your
project is written in Rust, it will need the `wasm32-wasip1` Rust compiler target available.

Add any custom tooling you need to compile your project prior to calling `spin build`:

<!-- @selectiveCpy -->

```yaml
    - name: Install Spin
      run: curl -fsSL https://wasm-functions.fermyon.app/downloads/install.sh | bash

    - name: Add build dependencies
      run: rustup target add wasm32-wasip1

    - name: Build
      run: spin build
```

## Specifying Variables

Spin supports [application variables](/spin/variables). Instead of being static, their values can be
updated without modifying the application, creating a simpler experience for rotating secrets,
updating API endpoints, and more.

For example, consider a Spin application with the following variable declaration as part of the
application manifest (`spin.toml`):

<!-- @selectiveCpy -->

```toml
[variables]
compression_level = { default = "1" }
```

When deploying the Spin application to _Fermyon Wasm Functions_, you can set variables by providing
`--variable` flags and passing key and value using the `key=value` format. For example, to change
the value of the `compression_level` variable from a repository secret, modify the step where the
app is deployed to Fermyon Wasm Functions:

<!-- @selectiveCpy -->

```yaml
    - name: Deploy to Fermyon Wasm Functions
      run: spin aka deploy --variable compression_level=${{ secrets.COMPRESSION_LEVEL }}
```

## Next Steps

**Congratulations on deploying your Spin Application to Fermyon Wasm Functions! 🥳**

- Make sure to check the [FAQ and Known Limitations](faq) article
