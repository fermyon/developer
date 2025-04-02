title = "Deploy Applications"
template = "functions_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true

---
- [Prerequisites](#prerequisites)
  - [Install the Spin CLI](#install-the-spin-cli)
  - [Install the `aka` Plugin](#install-the-aka-plugin)
- [Log in to the Fermyon Wasm Functions](#log-in-to-the-fermyon-wasm-functions)
- [Deploy Your Application](#deploy-your-application)
  - [Specifying Variables](#specifying-variables)
- [Next Steps](#next-steps)

This article will guide you through deploying a Spin Application to _Fermyon Wasm Functions_. You can deploy your [Spin App](/spin) in just a few steps.

## Prerequisites

### Install the Spin CLI

Before developing a Spin application, you need to have the Spin CLI installed locally. Here’s a way to install the Spin CLI:

<!-- @selectiveCpy -->

```console
$ curl -fsSL https://wasm-functions.fermyon.app/downloads/install.sh | bash
```

{{ details "Additional info" "It's easier if you move the spin binary somewhere in your path, so it can be accessed from any directory. E.g., `sudo mv ./spin /usr/local/bin/spin`. \n\nYou can verify the version of Spin installed by running `spin --version`" }}

### Install the `aka` Plugin

{{ details "Note" "If you installed the Spin CLI following the steps provided above, you can skip this step." }}

In order to interact with Fermyon Wasm Functions (Login, Deploy, etc), you need to install the Fermyon Wasm Functions for Akamai Spin plugin (`aka`). The plugin can be installed using this command:

<!-- @selectiveCpy -->

```console
$ spin plugin install aka
```

If you've previously installed the `aka` plugin, take a moment to upgrade it to ensure compatibility with the latest features and fixes. To upgrade, run:

<!-- @selectiveCpy -->

```console
$ spin plugins update
$ spin plugins upgrade aka
```

You can learn more about managing Spin plugins in [this article](../spin/v3/managing-plugins.md).

## Log in to Fermyon Wasm Functions

Once you've installed the `aka` plugin for Spin, you must log in to _Fermyon Wasm Functions_, which requires your GitHub account to sign in:

<!-- @selectiveCpy -->

```console
$ spin aka login
```

<!-- @nocpy -->

```console
Go to https://login.infra.fermyon.tech/realms/neutrino/device?user_code=AAAA-BBBB and follow the prompts.

Don't worry, we'll wait here for you. You got this.
```

Click the link displayed as part of the output from the `spin aka login` command. Authenticate using your individual GitHub Account and authorize the `spin` CLI for interacting with your _Fermyon Wasm Functions_ account.

## Deploy Your Application

After having signed in to _Fermyon Wasm Functions_, you deploy the application by running the `spin aka deploy` command from within the directory where the `spin.toml` file of your application is located:

<!-- @selectiveCpy -->

```console
$ spin aka deploy
```

<!-- @nocpy -->

```console
App 'myapp' initialized successfully.
Deploying application to Fermyon Wasm Functions on Akamai..
Waiting for application to be ready... ready

View application:   https://c8769081-7ae5-4041-a10f-61d344a67da2.aka.fermyon.tech/
```

### Specifying Variables

Spin supports [application variables](/spin/variables). Instead of being static, their values can be updated without modifying the application, creating a simpler experience for rotating secrets, updating API endpoints, and more.

For example, consider a Spin application with the following variable declaration as part of the application manifest (`spin.toml`):

<!-- @selectiveCpy -->

```toml
[variables]
compression_level = { default = "1" }
```

When deploying the Spin application to _Fermyon Wasm Functions_, you can set variables by providing `--variable` flags and passing key and value using the `key=value` format. See the following `spin aka deploy` command, which changes the value of the `compression_level` variable to `3`:

<!-- @selectiveCpy -->

```console
$ spin aka deploy --variable compression_level=3
```

<!-- @nocpy -->

```console
Deploying application to Fermyon Wasm Functions on Akamai..
Waiting for application to be ready... ready

View application:   https://c8769081-7ae5-4041-a10f-61d344a67da2.aka.fermyon.tech/
```

---

Take a look at the [Quickstart](quickstart), it guides you through the process of creating a new Spin application (either using JavaScript, TypeScript, or Rust) and deploying it to _Fermyon Wasm Functions_.

{{ details "Additional info" "`spin aka deploy` can point to a `spin.toml` file by using the `--file` option." }}

**Congratulations on deploying your Spin Application to Fermyon Wasm Functions! 🥳**

## Next Steps

- Next, let's look at [how to upgrade an application](upgrade).
