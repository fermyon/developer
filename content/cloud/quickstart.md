title = "Let's get started"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/quickstart.md"

---
- [Install Spin](#install-spin)
- [Log in to the Fermyon Cloud](#log-in-to-the-fermyon-cloud)
- [Clone the Quickstart Repo](#clone-the-quickstart-repo)
- [Deploy the Application](#deploy-the-application)
- [Success](#success)
- [Next Steps](#next-steps)

> This is the open beta of the Fermyon Cloud. For more info about the limitations and support, please see read the [FAQ](/cloud/faq).

This guide will get you up and running in the Fermyon Cloud in less than two minutes. To do so, we've already made a Spin application ready for you to deploy to the cloud.

<p><img src="/static/image/cloud-video.png"></p>

## Install Spin

{{ tabs "os" }}

{{ startTab "Linux"}}

Download the `spin` binary using the `install.sh` script hosted on this site:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-quick"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
</code></pre>

Then move the `spin` binary somewhere in your path, so you can run it from anywhere. For example:

<!-- @selectiveCpy -->

```bash
$ sudo mv ./spin /usr/local/bin/spin
```

{{ blockEnd }}

{{ startTab "macOS"}}

Download the `spin` binary using the `install.sh` script hosted on this site:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-quick"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
</code></pre>

Then move the `spin` binary somewhere in your path, so you can run it from anywhere. For example:

<!-- @selectiveCpy -->

```bash
$ sudo mv ./spin /usr/local/bin/spin
```

{{ blockEnd }}

{{ startTab "Windows"}}

Download <a href="https://github.com/spinframework/spin/releases/latest" class="spin-install" id="spin-install-windows">the Windows binary release of Spin</a> from GitHub.

Unzip the binary release and place the `spin.exe` in your system path.

{{ blockEnd }}

{{ blockEnd }}

{{ details "Learn more" "[Spin](https://github.com/spinframework/spin) is an open-source project used for creating, developing, building, running, and deploying Spin applications. It is both a CLI tool and a runtime, and provides SDKs for a variety of programming languages, including, but not limited to, Rust, TinyGo, and C#. \n\n The Spin project provides installers that are supported on Linux (amd64), macOS (amd64 and arm64), and Windows(amd64). \n\n The [Spin](/spin) documentation is a good starting place to learn more about using the framework to develop applications."}}

## Log in to the Fermyon Cloud

Now, let's log in to the Fermyon Cloud. You will be using your [GitHub user account](https://docs.github.com/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email) to sign in:

<!-- @selectiveCpy -->

```bash
$ spin login

Copy your one-time code:

XXXXXXXX

...and open the authorization page in your browser:

https://cloud.fermyon.com/device-authorization

Waiting for device authorization...
Device authorized!
```

This command will generate an authentication code for your current device to be authorized against the Fermyon Cloud. Follow the instructions in the prompt to complete the authorization process.

{{ details "Learn more" "The default behavior of `spin login` is to authenticate with the Fermyon Cloud. The command can authenticate against any instance of the [Fermyon Platform](https://github.com/fermyon/installer)." }}

## Clone the Quickstart Repo

To make this easy, we've already compiled a Webassembly module and created a Spin application for you to deploy.

Let's go ahead and clone the <https://github.com/fermyon/cloud-start> repository to your computer to retrieve that application:

<!-- @selectiveCpy -->

```bash
$ git clone https://github.com/fermyon/cloud-start && cd cloud-start
```

This command clones the repository into a local directory named `cloud-start`, and then enters that directory.

{{ details "Learn more" "To write your Spin application, you would start by using the command `spin new [template name] [project name]`. This gives you the option to select a template based on your preference of programming language and trigger for your module - e.g., `spin new rust-http my_rust_http_trigger`. \n\n The [Spin quickstart](/spin/quickstart) guides you through creating a Spin application from scratch." }}

## Deploy the Application

Let's deploy the application:

<!-- @selectiveCpy -->

```bash
$ spin deploy
```

The `spin` command will run using the Spin binary in your system path and read the Spin application definition file `spin.toml` in the current (`cloud-start`) directory to know what application to deploy.

{{ details "Learn more" "Deploying a Spin application to the Fermyon Cloud includes packaging the application and all the required files, uploading it to an OCI registry, as well as instantiating the application on the cloud. \n\n You can learn more about the deployment process [here](./deployment-concepts)." }}

## Success

This is what a successful Spin application deployment on Fermyon Cloud looks like:

<!-- @nocpy -->

```console
Uploading cloud_start version 0.1.0+XXXXXXXX to Fermyon Cloud...
Deploying...
Waiting for application to become ready... ready
Available Routes:
  cloud-start: https://cloud-start-XXXXXXXX.fermyon.app (wildcard)
```

You can CTRL+Click on the link in the terminal to visit the web application you just deployed.

Congratulations, you've now deployed your first Spin application to the [Fermyon Cloud!](https://cloud.fermyon.com)

## Next Steps

- Log in to the [Fermyon Cloud](https://cloud.fermyon.com) to see your deployed applications and manage them
- Go and check out how to [build a Spin application from scratch](develop)
- Dive into learning more about the [Fermyon Cloud](fermyon-cloud)
- Learn how to [delete your Spin application](delete)
- Find known issues and file new ones with this [GitHub repository](https://github.com/fermyon/feedback)
