title = "Configuring Spin Application Variables and Secrets"
date = "2023-06-05T16:40:01.672734Z"
template = "cloud_main"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main//content/cloud/variables.md"

---

- [Prerequisites](#prerequisites)
- [Creating Our Spin Application](#creating-our-spin-application)
- [Adding Variables to an Application Component](#adding-variables-to-an-application-component)
- [Using Variables in a Spin Application](#using-variables-in-a-spin-application)
- [Deploying the Application to Fermyon Cloud](#deploying-the-application-to-fermyon-cloud)

Spin supports dynamic application variables. Instead of being static, their values can be updated without modifying the application, creating a simpler experience for rotating secrets, updating API endpoints, and more. 

These variables are defined in a Spin application manifest (in the `[variables]` section) and then provided by a configuration provider. Locally with Spin, the configuration provider may be Vault for secrets or host environment variables. See the [dynamic configuration documentation](../spin/dynamic-configuration.md) to learn about configuring variables locally. These variables can also be set and updated for Spin applications in the Fermyon Cloud using the the `spin cloud variables` CLI.

This tutorial will walk through creating a simple application that validates a password.

## Prerequisites

First, you need to have Spin installed on your computer. Please use the official Fermyon Cloud Quickstart to both [install](/cloud/quickstart#install-spin) Spin and also [log in](/cloud/quickstart#log-in-to-the-fermyon-cloud) to Fermyon Cloud.

Next, since this example is written in Python, lets make sure we have the required tools installed for Python Spin applications. Spin CLI facilitates the creation of new Spin applications through the use of application [templates](/cloud/cli-reference#templates). The template we are interested in, for this tutorial, is the `http-py` template. Lets ensure its installed along with the `py2wasm` Spin plugin that enables compiling the Python app to Wasm:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-python-sdk --upgrade
$ spin plugins install py2wasm --yes
```

The output from the command above will be similar to the following:

<!-- @nocpy -->

```text
Copying remote template source
Installing template http-py...
Installed 1 template(s)

+---------------------------------------------+
| Name      Description                       |
+=============================================+
| http-py   HTTP request handler using Python |
+---------------------------------------------+

Plugin 'py2wasm' was installed successfully!

Description:
	A plugin to convert Python applications to Spin compatible modules

Homepage:
	https://github.com/fermyon/spin-python-sdk
```

## Creating Our Spin Application

Let's start by [creating a new Spin application](/cloud/cli-reference#new) from a the Python template. Using the docs as a reference, we can perform the following:

<!-- @selectiveCpy -->

```bash
$ spin new http-py pw_checker
Project description: A Spin app that validates a password
HTTP base: /
HTTP path: /...
```

## Adding Variables to an Application Component

Next, let's add two variables to our application. Add a top level `[variables]` section to the application manifest (`spin.toml`) and define a `password` and `expected_password` variable, marking them as required. Now, add these variables to a component by referencing them in the `[component.config]` section in the `pw-checker` component. Instead of statically assigning the value of the config variables, we are referencing the dynamic variables with [mustache](https://mustache.github.io/)-inspired string templates. The resultant application manifest should look similar to the following:

> Note: only components that explicitly use the variables in their configuration section will get access to them.

<!-- @selectiveCpy -->
```toml
spin_manifest_version = "1"
description = "A Spin app with a dynamically updatable "
name = "pw_checker"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[variables]
expected_password = { required = true }
password = { required = true }

[[component]]
id = "pw-checker"
source = "app.wasm"
[component.trigger]
route = "/..."
[component.build]
command = "spin py2wasm app -o app.wasm"
[component.config]
password = "{{ password }}"
expected_password = "{{ expected_password }}"
```

## Using Variables in a Spin Application

Now that we have defined our variables and exposed them to our component, lets implement our Spin application. The application should retrieve each variable and validate that the expected password matched the actual password. We will use the Spin `config_config` SDK to get the values. 

<!-- @selectiveCpy -->
```py
from spin_http import Response
from spin_config import config_get


def handle_request(request):
    expected = config_get("expected_password")
    actual = config_get("password")
    response = "Access denied"
    if expected == actual:
        response = "Access permitted"

    return Response(200,
                    {"content-type": "text/plain"},
                    bytes(response, "utf-8"))

```

Lets build and run our application locally to test it out. We will use the [environment variable provider](../spin/dynamic-configuration.md#environment-variable-provider) to set the variable values locally.

<!-- @selectiveCpy -->
```console
$ spin build
$ SPIN_CONFIG_EXPECTED_PASSWORD="123" SPIN_CONFIG_
PASSWORD="123" spin up
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  pw-checker: http://127.0.0.1:3000 (wildcard)
```

Let's query our application to see if we are granted access.

<!-- @selectiveCpy -->
```console
$ curl http://127.0.0.1:3000
Access permitted%
```

## Deploying the Application to Fermyon Cloud

Let's deploy our application to the cloud with initial values for our variables. All values are stored encrypted.

<!-- @selectiveCpy -->
```console
$ spin deploy --variable expected_password="123" --variable password="123"
Uploading pw_checker version 0.1.0+r7123456...
Deploying...
Waiting for application to become ready........... ready
Available Routes:
  pw-checker: https://pw-checker-abcdefg.fermyon.app (wildcard)
```

And once again check if we have access:

<!-- @selectiveCpy -->
```console
$ curl https://pw-checker-abcdefg.fermyon.app
Access permitted%
```

We're in! Let's now update one of the variable and see how it dynamically changes. Spin has a `cloud` plugin that is used for managing Spin applications in Fermyon cloud. The `variables` subcommand can be used to `set`, `list`, and `delete` application variables:

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help
cloud-variables 0.1.0
Manage Spin application variables

USAGE:
    cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variable pairs
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variable pairs
```

Let's set an incorrect password and see how we are now denied access:

<!-- @selectiveCpy -->
```console
$ spin cloud variables set password="wrong" --app "pw_checker"
$ curl https://pw-checker-abcdefg.fermyon.app                          
Access denied% 
```

The `cloud variables` CLI can also be used to list application variables. Only variable names are listed as values remain secret.

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --app "pw_checker"
App pw_checker has the following variables:
    password
    expected_password
```
