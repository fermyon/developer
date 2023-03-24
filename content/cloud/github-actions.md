title = "Deploying Spin Apps with GitHub Action"
template = "cloud_main"
date = "2022-03-23T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main//content/cloud/deploying-with-github-action.md"

---
- [Deploying Spin Apps with GitHub Actions](#visual-studio-code)
  - [Prerequisites](#prerequisites)
  - [Create a New GitHub Repository and Spin Application](#create-a-new-github-repository-and-spin-application)
  - [Set up GitHub Action](#set-up-github-action)
  - [Set A GitHub Repository Secret With Your Fermyon Cloud Personal Access Token (PAT)](#set-a-github-repository-secret-with-your-fermyon-cloud-personal-access-token-pat)
  - [Push Changes to Your Registry to Deploy Spin App](#push-changes-to-your-registry-to-deploy-spin-app)
  - [Next Steps](#next-steps)

## Deploying Spin Apps with GitHub Actions

GitHub Action is a Continuous Integration and Continous Deploment (CI/CD) platform for GitHub developers. With GitHub Actions, developers can create workflows that build and test (and even deploy to production) every pull request to their repositories. There are thousands of GitHub Actions, published by companies and individual enthusiasts alike, that automate otherwise mundane, repetitive innerloop developement tasks. 

Fermyon has a collection of three GitHub Actions: 
* `fermyon/actions/spin/setup` - enables users to install the Spin CLI and necessary plugins
*  `fermyon/actions/spin/push` - enables users to push their Spin applications to an OCI registry
*  `fermyon/actions/spin/deploy` - enables users to deploy their Spin applications to Fermyon Cloud.

This tutorial will focus specifically on `fermyon/actions/spin/deploy`. Upon completing this tutorial, you should have a GitHub repository that builds and deploys a Spin application to Fermyon Cloud every time you commit a pull request. Let's get started!

### Prerequisites 

To ensure the tutorial goes smoothly, please check you have the following dependencies in place: 
- [x] Spin v0.6.0 or newer [installed](quickstart#install-spin). You can check the version using `spin --version`.
- [x] Spin templates [installed](./spin/managing-templates#installing-from-the-spin-git-repository). You can check with `spin templates list`.
- [x] A Fermyon Cloud account set up via your preferred [GitHub user account](https://docs.github.com/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email) (and optionally [GitHub CLI](https://cli.github.com/manual/) installed).
- [x] A Fermyon Cloud [Personal Access Token](user-settings.md/#create-and-manage-a-personal-access-token-pat), stored in an accessible location. 

### Create a New GitHub Repository and Spin Application

If you have an existing Spin application in a GitHub repository you'd prefer to use then please switch into that directory instead and skip to the next section.

Otherwise, let's set up an empty GitHub repository. You can do this either on [GitHub's UI](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) or via the [GitHub CLI](https://cli.github.com/manual/gh_repo_create) using the `gh repo create` command. We'll use the GitHub CLI below for illustrative purposes.

<!-- @selectiveCpy -->

```bash
gh repo create github-actions-tutorial --public --clone && cd github-actions-tutorial
```

Now let's add a Spin application using a template that includes Spin's HTTP request handler. Choose your preferred language.

<!-- @selectiveCpy -->

```bash
spin new
```

For this tutorial, we've decided to create a simple Spin app in Python. If you've chosen another language, fear not, any support Spin language will work great. 

<!-- @selectiveNoCpy -->

```bash
...
Pick a template to start your application with: http-py (HTTP request handler using Python)
Enter a name for your new application: spin-python-app
Description: A simple Spin app written in Python
HTTP base: /
HTTP path: /...
```

Now let's get the GitHub Action setup. 

### Set up GitHub Action

First step is to create a folder to keep your GitHub Action `yaml`. Please create the following directory in your repository

<!-- @selectiveCpy -->

```bash
.github/workflows/
```

Now it's time to add the `fermyon/actions/spin/deploy` GitHub Action. To do so, please create a file called `spin-deploy-action.yml` and add the following code:

<!-- @selectiveCpy -->

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
          version: canary
          plugins: py2wasm

      - name: build and deploy
        uses: fermyon/actions/spin/deploy@v1
        with:
          manifest_file: spin-python-app/spin.toml
          fermyon_token: ${{ secrets.FERMYON_CLOUD_TOKEN }}
```

Since this tutorial is using Python, we've provided `py2wasm` as a required plugin in the `plugins` field. If you are using a Spin language that does not require a plugin, you can leave this field plank. To learn more about Spin langauges, please visit our [Langauage Support Overview](.spin/language-support-overview.md)

Make sure to modify the manifest file to point to your `spin.toml` path! If you're interested in learning more about GitHub Actions, we recommend checking out [GitHub's article](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

### Set A GitHub Repository Secret With Your Fermyon Cloud Personal Access Token (PAT)

Grab your Personal Access Token (PAT) you made note of in the [Prerequisites section](#prerequisites). Once you have the PAT handy, follow [GitHub's instructions](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) for adding encrypted secrets for a repository. Make sure to secret name you use matches the name you provided for the `manifest_file` parameter, and you supply your PAT as your secret. You should see the following screen once you have added your secret successfully:

![Registry Secret View](/static/image/github-reg-secret-success.png)

### Push Changes to Your Registry to Deploy Spin App

Now its time to put our GitHub Action to the test. Run the following commands to push your local changes to the GitHub repository and trigger a Spin applicationd deployment on Fermyon Cloud.

<!-- @selectiveCpy -->

```bash
git add . 
git commit -m "adding Spin application and GitHub Action"
git push
```

You should see a successful run on your GitHub Actions view on GitHub

![GitHub Actions with Spin app deployed](/static/image/github-action-app-deployed-gh.png)

. . . as well as your Spin application in Fermyon Cloud!

![Fermyon Cloud with Spin app deployed via GitHub Actions](/static/image/github-action-app-deployed.png)

Congrats on deploying your first Spin application using GitHub Actions!

## Next Steps

- Learn more about the [Fermyon GitHub Actions](https://github.com/fermyon/actions) collection
- To learn more about how to develop Spin applications, head over to the [Spin documentation](/spin)
- Find known issues and file new ones in the [Fermyon Cloud Feedback repository](https://github.com/fermyon/feedback)