title = "Deploy an application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true

---

- [Prerequisites - Install the Spin CLI](#prerequisites---install-the-spin-cli)
- [Login to the Fermyon Cloud](#login-to-the-fermyon-cloud)
- [Deploy your application](#deploy-your-application)
- [Next steps](#next-steps)

This article will guide you through deploying a Spin Application with the Fermyon Cloud. You can deploy your [Spin App](/spin) or [Bartholomew](https://github.com/fermyon/bartholomew) site in just a few steps.

## Prerequisites - Install the Spin CLI

Before developing a Spin application, you need to have the Spin CLI installed locally. Here’s a way to install the Spin CLI:

```console
curl https://spin.fermyon.dev/downloads/install.sh | bash
```

{{ details "Additional info" "It's easier if you move the spin binary somewhere in your path, so it can be accessed from any directory. E.g., `sudo mv ./spin /usr/local/bin/spin`. \n\nYou can verify the version of Spin installed by running `spin --version`" }}

## Login to the Fermyon Cloud

Next, you can Log in to the Fermyon Cloud, which requires your GitHub account to sign in.

<!-- @selectiveCpy -->
```console
$ spin login --url https://canary.cloud.fermyon.link
What authentication method does this server support?

1. Sign in with GitHub
2. Sign in with a username and password

Enter a number: 1
Open https://canary.cloud.fermyon.link/device-authorization in your browser
! Copy your one-time code: XXXXXXXX
Waiting for device authorization...
Waiting for device authorization...
Waiting for device authorization...
Device authorized!
```

This command generates an authentication code for your device to be authorized on the Fermyon Cloud. 

## Deploy your application

After having signed in to the Fermyon Cloud, you deploy the application, by running the following command in the directory where your applications `spin.toml` file is located.

<!-- @selectiveCpy -->
```console
$ spin deploy
Deployed Hello version 0.1.0+XXXXXXXX
Available Routes:
  c-hello: https://hello-XXXXXXXX.canary.platform.fermyon.link (wildcard)
```

Take a look at the [Quickstart article](quickstart) for how to get a pre-built application to deploy.

{{ details "Additional info" "`spin deploy` can point to a spin.toml file by using the `--file` option." }}

**Congratulations on Deploying your Spin Application! 🥳**

## Next steps

- Next, let's look at [how to upgrade an application](upgrade).
