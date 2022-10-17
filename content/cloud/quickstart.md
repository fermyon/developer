title = "Let's get started"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true

---

> This is the open beta of the Fermyon Cloud. For more info about the limitations and support, please see read the [FAQ](/cloud/faq).

- [Install Spin](#install-spin)
- [Log in to the Fermyon cloud](#log-in-to-the-fermyon-cloud)
- [Clone the quickstart repo](#clone-the-quickstart-repo)
- [Deploy the application](#deploy-the-application)
- [Success](#success)
- [Next Steps](#next-steps)

This guide will get you up and running in the Fermyon Cloud in less than two minutes. And to do so, we've already made a Spin application ready for you to deploy.

## Install Spin

First, you need to have Spin installed on your computer. Use the below command to install the latest version of Spin.

```bash
curl https://canary.developer.fermyon.com/downloads/install.sh | bash
```

This command downloaded and unpacked the latest Spin binary in the current directory. You can now run spin using the command `./spin`

{{ details "Learn more" "Spin is an open-source project used for creating, developing, building, running, and deploying Spin applications. It is both a CLI tool and a runtime, and provides SDKs for a variety of programming languages, including, but not limited to, Rust, TinyGo, and C#. \n\n The Spin project provides installers that are supported on Linux (amd64), macOS (amd64 and arm64), and Windows(amd64). \n\n The [Spin](https://developer.fermyon.com/spin) documentation is a good place to learn more about Spin and how to develop applications."}}

## Log in to the Fermyon cloud

Now, let's log in to the Fermyon cloud. You will be using your GitHub user account to sign in.

```bash
./spin login
```

This command will generate an authentication code for your current device to be authorized against the Fermyon Cloud. Follow the instructions in the prompt to complete the authorization.

{{ details "Learn more" "The default behavior of `spin login` is to authenticate with the Fermyon Cloud. The command can authenticate against any instance of the [Fermyon Platform](https://fermyon.dev)." }}

## Clone the quickstart repo

To make this easy, we've already compiled a Webassembly module and created a Spin application for you to deploy.

Let's go ahead and clone the <https://github.com/fermyon/cloud-start> repository to your computer, to get that application.

```bash
git clone https://github.com/fermyon/cloud-start && cd cloud-start
```

This command clones the repository into a new directory named `cloud-start`, and then enters that directory.

{{ details "Learn more" "Normally you would start by using the command `spin new [template name] [project name]` to create a new Spin application. This gives you the option to choose a template, based on your preference of programming language and the trigger you want to use for your first module - e.g., `spin new rust-http my_rust_http_trigger`. \n\n The [Spin quickstart](/spin/quickstart) guides you through creating a Spin application from scratch." }}

## Deploy the application

Let's deploy the application

```bash
../spin deploy
```

The `../spin` command will use the Spin binary in the parent directory of the current path and use the Spin application definition file `spin.toml` in the current directory, to know what application to deploy.

{{ details "Learn more" "Deploying a Spin application includes packaging the application in a Bindle and uploading it to a Bindle registry, as well as creating the application in the Fermyon Cloud. \n\n You can learn more about the deployment process [here](./deployment-bindles)." }}

## Success

This is what success looks like:

<!-- @nocpy -->
```bash
Application cloud_start/0.1.0 deployed, running at cloud-start-00000000.fermyon.app
```

You can CTRL+Click on the link in the terminal to go to the web application you just deployed.

Congratulations, you've now deployed your first application to the Fermyon Cloud!

## Next Steps

- Go and check out how to build a Spin application from scratch, by following this [tutorial](/cloud/data-in-the-cloud)
- Or dive into learning more about the [Fermyon Cloud](/cloud/fermyon-cloud)
