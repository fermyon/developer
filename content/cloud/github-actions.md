title = "Deploying Spin Apps Using GitHub Action"
template = "cloud_main"
date = "2023-03-24T21:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/github-actions.md"

---
- [Deploying Spin Apps With Github Actions](#deploying-spin-apps-with-github-actions)
  - [Prerequisites](#prerequisites)
  - [Creating a New Github Repository](#creating-a-new-github-repository)
  - [Creating a New Spin Application](#creating-a-new-spin-application)
  - [Setting Up Github Actions](#setting-up-github-actions)
  - [Configuring GitHub Actions](#configuring-github-actions)
  - [Set a Github Repository Secret With Your Fermyon Cloud Personal Access Token (PAT)](#set-a-github-repository-secret-with-your-fermyon-cloud-personal-access-token-pat)
  - [Push Changes to Your Registry to Deploy Spin App](#push-changes-to-your-registry-to-deploy-spin-app)
- [Next Steps](#next-steps)

## Deploying Spin Apps With Github Actions

GitHub Action is a Continuous Integration and Continuous Deployment (CI/CD) platform for GitHub developers. With GitHub Actions, developers can create workflows that build, test and even deploy (to production) pull requests that have been merged into their repositories. There are thousands of GitHub Actions, published by companies and individual enthusiasts alike, that automate otherwise mundane, repetitive in-house development tasks.

Fermyon's Spin uses three GitHub Actions. For example:
* `fermyon/actions/spin/setup` - enables users to install the Spin CLI and necessary plugins,
* `fermyon/actions/spin/push` - enables users to push their Spin applications to an OCI registry, and
* `fermyon/actions/spin/deploy` - enables users to deploy their Spin applications to Fermyon Cloud.

This tutorial will focus specifically on `fermyon/actions/spin/deploy`. Upon completing this tutorial, you should have a GitHub repository that builds and deploys a Spin application to Fermyon Cloud every time you merge a pull request. Let's get started!

### Prerequisites 

To ensure the tutorial goes smoothly, please check you have the following:
* Spin (v0.6.0 or newer) [installed](/spin/quickstart#install-spin). You can check the version using `spin --version`.
* Spin templates [installed](/spin/managing-templates#installing-from-the-spin-git-repository). You can check with `spin templates list`.
* A Fermyon Cloud account; that is set up via your preferred [GitHub user account](https://docs.github.com/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email) (and optionally [GitHub CLI](https://cli.github.com/manual/) installed).
* A working Fermyon Cloud [Personal Access Token (PAT)](/cloud/user-settings#create-and-manage-a-personal-access-token-pat), that is stored in an accessible location.

### Creating a New Github Repository

If you have an existing Spin application in a GitHub repository you'd prefer to use then please switch to that directory instead, and skip to the "Setting Up Github Actions" section.

Otherwise, set up an empty GitHub repository. You can do this either on [GitHub's UI](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) or via the [GitHub CLI](https://cli.github.com/manual/gh_repo_create) using the `gh repo create` command. We'll use the GitHub CLI below for illustrative purposes.

<!-- @selectiveCpy -->

```bash
# Change to home dir
$ cd ~
# Create and change into ~/github-actions-tutorial dir
$ gh repo create github-actions-tutorial --public --clone && cd github-actions-tutorial
```

### Creating a New Spin Application

Now let's add a Spin application using a template that includes Spin's HTTP request handler. Choose your preferred language.

<!-- @selectiveCpy -->

```bash
# Create new Spin application
$ spin new
Pick a template to start your application with:
  http-c (HTTP request handler using C and the Zig toolchain)
  http-csharp (HTTP request handler using C# (EXPERIMENTAL))
  http-empty (HTTP application with no components)
  http-go (HTTP request handler using (Tiny)Go)
  http-grain (HTTP request handler using Grain)
  http-js (HTTP request handler using Javascript)
  http-php (HTTP request handler using PHP)
> http-py (HTTP request handler using Python)
  http-rust (HTTP request handler using Rust)
  http-swift (HTTP request handler using SwiftWasm)
  http-ts (HTTP request handler using Typescript)
  http-zig (HTTP request handler using Zig)
  redirect (Redirects a HTTP route)
  redis-go (Redis message handler using (Tiny)Go)
  redis-rust (Redis message handler using Rust)
  static-fileserver (Serves static files from an asset directory)
```

For this tutorial, we've decided to use Python (`http-py`). Please feel free to choose your preferred supported Spin language (when prompted to select an HTTP request handler template).

Once you have selected your preferred template, follow the prompts to complete the creation of your new application i.e. name the application `spin-python-app`, then add a description (and just hit enter to accept the default HTTP base and HTTP path options):

<!-- @nocpy -->

```console
Enter a name for your new application: spin-python-app
Description: A python application to test GitHub Actions.
HTTP base: /
HTTP path: /...
```

### Setting Up Github Actions

The first step, in setting up GitHub Actions, is to create a new folder called `workflows` (inside a new parent folder called `.github`). We use this new folder structure to keep a GitHub Action `.yaml` file (that we will create in a minute). For now, please go ahead and create the following directories in the base of your repository dir. For example:

<!-- @selectiveCpy -->

```bash
# Change into ~/github-actions-tutorial dir
$ cd ~/github-actions-tutorial
# Create workflows directory (and make parent directory as necessary via the -p option)
$ mkdir -p .github/workflows/
```

Now it's time to add the `fermyon/actions/spin/deploy` GitHub Action. To do so, please create a file called `spin-deploy-action.yaml`:

<!-- @selectiveCpy -->

```bash
$ cd ~/github-actions-tutorial/.github/workflows/
$ vi spin-deploy-action.yaml
```

Then add the following code, to the `spin-deploy-action.yaml` file:

<!-- @nocpy -->

```yml
name: spin-deploy

on:
  - push

jobs:
  spin:
    runs-on: ubuntu-latest
    name: Build and deploy
    steps:
      - uses: actions/checkout@v3

      - name: Setup `spin`
        uses: fermyon/actions/spin/setup@v1
        with:
          plugins: py2wasm

      - name: build and deploy
        uses: fermyon/actions/spin/deploy@v1
        with:
          manifest_file: spin-python-app/spin.toml
          fermyon_token: ${{ secrets.FERMYON_CLOUD_TOKEN }}
```

Since this tutorial is using Python, we've provided `py2wasm` as a required plugin in the `plugins` field. You can learn more about how to [manage plugins](/spin/managing-plugins), however, if you are using a Spin language that does not require a plugin, please disregard plugins and just remove this field.

> To learn more about language support for Spin features, please visit our [Language Support Overview](/spin/language-support-overview.md).

### Configuring GitHub Actions 

Make sure to modify the `manifest_file` field in the `spin-deploy-action.yaml` file, to point to our `spin.toml` file.

> If you're interested in learning more about configuring and understanding GitHub Actions, we recommend checking out [GitHub's article](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

### Set a Github Repository Secret With Your Fermyon Cloud Personal Access Token (PAT)

Grab your Personal Access Token (PAT) you made note of in the [Prerequisites section](#prerequisites). Once you have the PAT handy, follow [GitHub's instructions](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) for adding encrypted secrets for a repository. For example, press the green "New repository secret" button in the GitHub UI (under the repo's "Settings", "Secrets and variables" and "Actions" menu items).

![Registry Secret View](/static/image/github-reg-secret-success.png)

When creating the new secret (and pasting in your PAT) ensure that the secret's name (that you use in the GitHub UI) matches the actual name you provide for the `fermyon_token` value in the `spin-deploy-action.yaml` file. For example, if the GitHub UI has a secret named `FERMYON_CLOUD_TOKEN` (as shown in the screen capture above) then the `spin-deploy-action.yaml` file will have a line such as `fermyon_token: ${{ secrets.FERMYON_CLOUD_TOKEN }}`).

### Push Changes to Your Registry to Deploy Spin App

Now it's time to put our GitHub Action to the test. Run the following commands to push your local changes to the GitHub repository and trigger a Spin application deployment on Fermyon Cloud.

<!-- @selectiveCpy -->

```bash
$ cd ~/github-actions-tutorial/
$ git add . 
$ git commit -m "adding Spin application and GitHub Action"
$ git push
```

You should see a successful run on your GitHub Actions view on GitHub.

![GitHub Actions with Spin app deployed](/static/image/github-action-app-deployed-gh.png)

You should also see your Spin application in Fermyon Cloud.

![Fermyon Cloud with Spin app deployed via GitHub Actions](/static/image/github-action-app-deployed.png)

Congrats on deploying your first Spin application using GitHub Actions.

## Next Steps

- Learn more about the [Fermyon GitHub Actions](https://github.com/fermyon/actions) collection
- To learn more about how to develop Spin applications, head over to the [Spin documentation](/spin/index)
- Find known issues and file new ones in the [Fermyon Cloud Feedback repository](https://github.com/fermyon/feedback)
