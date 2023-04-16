title = "Deploy an application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main//content/cloud/deploy.md"

---
- [Prerequisites - Install the Spin CLI](#prerequisites---install-the-spin-cli)
- [Log in to the Fermyon Cloud](#log-in-to-the-fermyon-cloud)
- [Deploy Your Application](#deploy-your-application)
- [Next Steps](#next-steps)

This article will guide you through deploying a Spin Application with the Fermyon Cloud. You can deploy your [Spin App](/spin) or [Bartholomew](https://github.com/fermyon/bartholomew) site in just a few steps.

## Prerequisites - Install the Spin CLI

Before developing a Spin application, you need to have the Spin CLI installed locally. Here’s a way to install the Spin CLI:

<!-- @selectiveCpy -->

```console
$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
```

{{ details "Additional info" "It's easier if you move the spin binary somewhere in your path, so it can be accessed from any directory. E.g., `sudo mv ./spin /usr/local/bin/spin`. \n\nYou can verify the version of Spin installed by running `spin --version`" }}

## Log in to the Fermyon Cloud

Next, you can log in to the Fermyon Cloud, which requires your GitHub account to sign in:

<!-- @selectiveCpy -->

```console
$ spin login

Copy your one-time code:

XXXXXXXX

...and open the authorization page in your browser:

https://cloud.fermyon.com/device-authorization

Waiting for device authorization...
Device authorized!
```

This command generates an authentication code for your device to be authorized on the Fermyon Cloud. 

## Deploy Your Application

After having signed in to the Fermyon Cloud, you deploy the application, by running the following command in the directory where your applications `spin.toml` file is located:

<!-- @selectiveCpy -->

```console
$ spin deploy
Uploading cloud_start version 0.1.0+XXXXXXXX...
Deploying...
Waiting for application to become ready... ready
Available Routes:
  cloud-start: https://cloud-start-XXXXXXXX.fermyon.app (wildcard)
```

Take a look at the [Quickstart article](quickstart) for how to get a pre-built application to deploy.

{{ details "Additional info" "`spin deploy` can point to a spin.toml file by using the `--file` option." }}

**Congratulations on deploying your Spin Application! 🥳**

## Next Steps

- Next, let's look at [how to upgrade an application](upgrade).
