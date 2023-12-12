title = "Configuring Spin Application Variables and Secrets"
date = "2023-06-05T16:40:01.672734Z"
template = "cloud_main"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/variables.md"

---

- [Prerequisites](#prerequisites)
- [Creating Our Spin Application](#creating-our-spin-application)
- [Adding Variables to an Application Component](#adding-variables-to-an-application-component)
- [Using Variables in a Spin Application](#using-variables-in-a-spin-application)
- [Deploying the Application to Fermyon Cloud](#deploying-the-application-to-fermyon-cloud)

Spin supports dynamic application variables. Instead of being static, their values can be updated without modifying the application, creating a simpler experience for rotating secrets, updating API endpoints, and more. 

These variables are defined in a Spin application manifest (in the `[variables]` section) and are provided by a configuration provider. When using Spin locally, the configuration provider can be Vault for secrets or host environment variables. You can refer to the [dynamic configuration documentation](/spin/dynamic-configuration.md) to learn how to configure variables locally. In Fermyon Cloud, you can set and update variables for Spin applications using the [`spin cloud variables`](/cloud/cloud-command-reference.md#spin-cloud-variables) command.

This tutorial will guide you through the process of creating a simple application that validates passwords. If you prefer to learn through video, you can follow along with this recording.

<iframe width="900" height="506" src="https://www.youtube.com/embed/T9B3VgGTYr0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

Before starting, ensure that you have Spin v1.3.0 or greater installed on your computer. You can follow the official Fermyon Cloud Quickstart guide to [install Spin](/cloud/quickstart#install-spin) and [log into Fermyon Cloud](/cloud/quickstart#log-in-to-the-fermyon-cloud).

Since this example is written in Python, make sure you have the required tools installed to write Spin applications in Python. The Spin CLI facilitates the creation of new Spin applications using application [templates](/cloud/cli-reference#templates). In this tutorial, we will use the `http-py` template. Install it along with the `py2wasm` Spin plugin, which enables compiling Python apps to Wasm, using the following commands:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-python-sdk --upgrade
$ spin plugins update
$ spin plugins install py2wasm --yes
```

The output from the above commands should be similar to the following:

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

Let's start by [creating a new Spin application](/cloud/cli-reference#new) using the Python template. Follow the steps below:

<!-- @selectiveCpy -->

```bash
$ spin new -t http-py           
Enter a name for your new application: pw_checker
Description: A Spin app that validates a password
HTTP path: /...
```

## Adding Variables to an Application Component

Our application receives a password via the HTTP request body, compares it to an expected password, and returns a JSON response indicating whether the submitted password matches or not.

In reality, you'd have multiple usernames and password hashes in a database, but for this tutorial, we will configure the expected password using a Spin application variable. We'll name the variable `password` and set `required = true` since there is no reasonable default value. To do this, add a top-level `[variables]` section to the application manifest (`spin.toml`) and declare the variable within it:

<!-- @nocpy -->

```toml
# Add this above the [component.pw-checker] section
[variables]
secret = { required = true }
```

To surface the variable to the `pw-checker` component, add a `[component.pw-checker.variables]` section in the component and specify the variable within it. Instead of statically assigning the value of the config variable, we are referencing the dynamic variable with [mustache](https://mustache.github.io/)-inspired string templates. Only components that explicitly use the variables in their configuration section will get access to them. This enables only exposing variables and secrets to the desired components of an application:

<!-- @nocpy -->

```toml
# Add this below the [component.pw-checker.build] section
[component.pw-checker.variables]
password = "\{{ secret }}"
```

The resulting application manifest should look similar to the following:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "pw_checker"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = "A Spin app with a dynamically updatable variable"

[[trigger.http]]
route = "/..."
component = "pw-checker"

[variables]
secret = { required = true }

[component.pw-checker]
source = "target/wasm32-wasi/release/pw_checker.wasm"
allow_outbound_hosts = []

[component.pw-checker.build]
command = "cargo build --target wasm32-wasi --release"
watch = ["src/**/*.rs", "Cargo.toml"]

[component.pw-checker.variables]
password = "\{{ secret }}"
```

## Using Variables in a Spin Application

Now that we have defined our variables and surfaced them to our component, we are ready to implement our Spin application. The application should get the user-provided password from the body of the HTTP request, compare it to the expected password set in our configuration variable, and authenticate accordingly. We will use the Spin `spin_config` module to retrieve the value of the `password` variable:

```py
from spin_http import Response
from spin_config import config_get

def handle_request(request):
    password = request.body.decode("utf-8")
    expected = config_get("password")
    access = "denied"
    if expected == password:
        access = "accepted"
    response = f'\{{"authentication": "{access}"}}'
    return Response(200,
                    {"content-type": "application/json"},
                    bytes(response, "utf-8"))
```

Build and run the application locally to test it out. We will use the [environment variable provider](/spin/dynamic-configuration.md#environment-variable-provider) to set the variable values locally. The provider gets the variable values from the `spin` process's environment, searching for environment variables prefixed with `SPIN_VARIABLE_`:

<!-- @selectiveCpy -->

```bash
$ spin build
Building component pw-checker with `spin py2wasm app -o app.wasm`
Spin-compatible module built successfully
Finished building all Spin components
$ SPIN_VARIABLE_SECRET="123" spin up
```

Send a request to the application with the correct password in the body to authenticate successfully:

<!-- @selectiveCpy -->

```bash
$ curl -d "123" http://127.0.0.1:3000
{"authentication": "accepted"}
```

## Deploying the Application to Fermyon Cloud

Let's deploy our application to the cloud with initial values for our variables. All values are stored encrypted:

<!-- @selectiveCpy -->

```bash
$ spin deploy --variable secret="123"  
Uploading pw_checker version 0.1.0+r7123456 to Fermyon Cloud...
Deploying...
Waiting for application to become ready........... ready
Available Routes:
  pw-checker: https://pw-checker-abcdefg.fermyon.app (wildcard)
```

Check if we can authenticate again using the deployed application:

<!-- @selectiveCpy -->

```bash
$ curl -d "123" https://pw-checker-abcdefg.fermyon.app
{"authentication": "accepted"}
```

We're in! Now, let's update one of the variables and observe how it dynamically changes. Fermyon provides `cloud` plugin for the Spin CLI, for you to manage Spin applications in Fermyon Cloud. The `variables` subcommand allows you to `set`, `list`, and `delete` application variables.

Set a new password and observe that access is now denied:

<!-- @selectiveCpy -->

```bash
$ spin cloud variables set password="456" --app "pw_checker"
$ curl -d "123" https://pw-checker-abcdefg.fermyon.app                          
{"authentication": "denied"}
```

The `spin cloud variables` command can also be used to list application variables. Only names are listed, as values remain secret:

<!-- @selectiveCpy -->

```bash
$ spin cloud variables list --app "pw_checker"
    password
```

Congratulations 🎉! You've built and deployed your first dynamically configurable Spin application.

If you want to do more with your Spin applications, check out tutorials on persisting data in Fermyon Cloud, whether with the [built-in key/value service](/spin/key-value-store-tutorial.md), [Redis](/cloud/data-redis.md), or [PostgreSQL](/cloud/data-postgres.md).
