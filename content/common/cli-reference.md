title = "Spin Command Line Interface (CLI) Reference"
template = "common_main"
date = "2022-01-01T00:00:01Z"
enable_shortcodes = true
[extra]

---
- [Spin](#spin)
  - [Add](#add)
  - [Build](#build)
  - [Cloud](#cloud)
    - [Deploy (Cloud)](#deploy-cloud)
    - [Login (Cloud)](#login-cloud)
  - [Deploy](#deploy)
  - [Help](#help)
  - [Login](#login)
  - [New](#new)
  - [Plugins](#plugins)
    - [Install (Plugins)](#install-plugins)
    - [List (Plugins)](#list-plugins)
    - [Uninstall (Plugins)](#uninstall-plugins)
    - [Update (Plugins)](#update-plugins)
    - [Upgrade (Plugins)](#upgrade-plugins)
  - [OCI Registry](#oci-registry)
    - [Login (OCI Registry)](#login-oci-registry)
    - [Pull (OCI Registry)](#pull-oci-registry)
    - [Push (OCI Registry)](#push-oci-registry)
  - [Templates](#templates)
    - [Install (Templates)](#install-templates)
    - [List (Templates)](#list-templates)
    - [Uninstall (Templates)](#uninstall-templates)
    - [Upgrade (Templates)](#upgrade-templates)
  - [Up](#up)
    - [Trigger Options](#trigger-options)
      - [Redis Request Handler](#redis-request-handler)
      - [HTTP Request Handler](#http-request-handler)
  - [Watch](#watch)
  - [CLI Stability Table](#cli-stability-table)

## Spin

This page documents the Spin Command Line Interface (CLI). Specifically, all of the available Spin Options and Subcommands. For more information on command stability, see the [CLI stability table](#cli-stability-table). You can reproduce the Spin CLI documentation on your machine by using the `--help` flag. For example:

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin --help

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    build        Build the Spin application
    cloud        Commands for publishing applications to the Fermyon Platform
    deploy       Package and upload an application to the Fermyon Platform
    help         Print this message or the help of the given subcommand(s)
    login        Log into the Fermyon Platform
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    registry     Commands for working with OCI registries to distribute applications
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin --help

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    build        Build the Spin application
    cloud        Commands for publishing applications to the Fermyon Platform
    deploy       Package and upload an application to the Fermyon Platform
    help         Print this message or the help of the given subcommand(s)
    login        Log into the Fermyon Platform
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    registry     Commands for working with OCI registries to distribute applications
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
    watch        Rebuild and restart the Spin application when files changes
```

{{ blockEnd }}

{{ blockEnd }}

### Add

Adding a subcommand (and again issuing the `--help` command) will provide information specific to that particular subcommand. For example:

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin add --help

spin-add 
Scaffold a new component into an existing application

USAGE:
    spin add [OPTIONS] [ARGS]

ARGS:
    <TEMPLATE_ID>    The template from which to create the new application or component. Run
                     `spin templates list` to see available options
    <NAME>           The name of the new application or component

OPTIONS:
        --accept-defaults              An optional argument that allows to skip prompts for the
                                       manifest file by accepting the defaults if available on the
                                       template
    -f, --file <APP_MANIFEST_FILE>     Path to spin.toml
    -h, --help                         Print help information
    -o, --output <OUTPUT_PATH>         The directory in which to create the new application or
                                       component. The default is the name argument
        --tag <TAGS>                   Filter templates to select by tags
    -v, --value <VALUES>               Parameter values to be passed to the template (in name=value
                                       format)
        --values-file <VALUES_FILE>    A TOML file which contains parameter values in name = "value"
                                       format. Parameters passed as CLI option overwrite parameters
                                       specified in the file
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin add --help

spin-add 
Scaffold a new component into an existing application

USAGE:
    spin add [OPTIONS] [ARGS]

ARGS:
    <TEMPLATE_ID>    The template from which to create the new application or component. Run
                     `spin templates list` to see available options
    <NAME>           The name of the new application or component

OPTIONS:
        --accept-defaults              An optional argument that allows to skip prompts for the
                                       manifest file by accepting the defaults if available on the
                                       template
    -f, --file <APP_MANIFEST_FILE>     Path to spin.toml
    -h, --help                         Print help information
    -o, --output <OUTPUT_PATH>         The directory in which to create the new application or
                                       component. The default is the name argument
        --tag <TAGS>                   Filter templates to select by tags
    -v, --value <VALUES>               Parameter values to be passed to the template (in name=value
                                       format)
        --values-file <VALUES_FILE>    A TOML file which contains parameter values in name = "value"
                                       format. Parameters passed as CLI option overwrite parameters
                                       specified in the file
```

{{ blockEnd }}

{{ blockEnd }}

### Build

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin build --help

spin-build 
Build the Spin application

USAGE:
    spin build [OPTIONS] [UP_ARGS]...

ARGS:
    <UP_ARGS>...    

OPTIONS:
    -f, --from <APP_MANIFEST_FILE>    Path to application manifest. The default is "spin.toml"
    -h, --help                        Print help information
    -u, --up                          Run the application after building
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin build --help

spin-build 
Build the Spin application

USAGE:
    spin build [OPTIONS] [UP_ARGS]...

ARGS:
    <UP_ARGS>...    

OPTIONS:
    -f, --from <APP_MANIFEST_FILE>    Path to application manifest. The default is "spin.toml"
    -h, --help                        Print help information
    -u, --up                          Run the application after building
```

{{ blockEnd }}

{{ blockEnd }}

### Cloud

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin cloud --help

spin-cloud 
Commands for publishing applications to the Fermyon Platform

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    deploy    Package and upload an application to the Fermyon Platform
    help      Print this message or the help of the given subcommand(s)
    login     Log into the Fermyon Platform
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin cloud --help

spin-cloud 
Commands for publishing applications to the Fermyon Platform

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    deploy    Package and upload an application to the Fermyon Platform
    help      Print this message or the help of the given subcommand(s)
    login     Log into the Fermyon Platform
```

{{ blockEnd }}

{{ blockEnd }}

#### Deploy (Cloud)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin cloud deploy --help

spin-cloud-deploy 
Package and upload an application to the Fermyon Platform

USAGE:
    spin cloud deploy [OPTIONS]

OPTIONS:
        --buildinfo <BUILDINFO>
            Build metadata to append to the bindle version

    -d, --staging-dir <STAGING_DIR>
            Path to assemble the bindle before pushing (defaults to a temporary directory)

    -e, --deploy-existing-bindle
            Deploy existing bindle if it already exists on bindle server

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -f, --file <APP_MANIFEST_FILE>
            Path to spin.toml [default: spin.toml]

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Pass a key/value (key=value) to all components of the application. Can be used multiple
            times

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin cloud deploy --help

spin-cloud-deploy 
Package and upload an application to the Fermyon Platform

USAGE:
    spin cloud deploy [OPTIONS]

OPTIONS:
        --buildinfo <BUILDINFO>
            Build metadata to append to the bindle version

    -d, --staging-dir <STAGING_DIR>
            Path to assemble the bindle before pushing (defaults to a temporary directory)

    -e, --deploy-existing-bindle
            Deploy existing bindle if it already exists on bindle server

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -f, --file <APP_MANIFEST_FILE>
            Path to spin.toml [default: spin.toml]

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Pass a key/value (key=value) to all components of the application. Can be used multiple
            times

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]
```

{{ blockEnd }}

{{ blockEnd }}

#### Login (Cloud)

Please note: the previous `spin login` command (from versions before Spin v0.9.0) has been kept to ensure backward compatibility. In the Spin v0.9.0 release, both the `spin login --help` and `spin cloud login --help` commands will produce the same output, which is as follows:

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin cloud login --help

spin-cloud-login 
Log into the Fermyon Platform

USAGE:
    spin cloud login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>
            [env: AUTH_METHOD=] [possible values: github, username, token]

        --bindle-password <BINDLE_PASSWORD>
            Basic http auth password for the bindle server [env: BINDLE_PASSWORD=]

        --bindle-server <BINDLE_SERVER_URL>
            URL of bindle server [env: BINDLE_URL=]

        --bindle-username <BINDLE_USERNAME>
            Basic http auth username for the bindle server [env: BINDLE_USERNAME=]

        --environment-name <environment-name>
            Save the login details under the specified name instead of making them the default. Use
            named environments with `spin deploy --environment-name <name>` [env:
            FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -k, --insecure
            Ignore server certificate errors from bindle and hippo

        --list
            List saved logins

        --password <HIPPO_PASSWORD>
            Hippo password [env: HIPPO_PASSWORD=]

        --status
            Display login status

        --token <TOKEN>
            Auth Token [env: SPIN_AUTH_TOKEN=]

        --url <HIPPO_SERVER_URL>
            URL of hippo server [env: HIPPO_URL=] [default: https://cloud.fermyon.com/]

        --username <HIPPO_USERNAME>
            Hippo username [env: HIPPO_USERNAME=]
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin cloud login --help

spin-cloud-login 
Log into the Fermyon Platform

USAGE:
    spin cloud login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>
            [env: AUTH_METHOD=] [possible values: github, username, token]

        --bindle-password <BINDLE_PASSWORD>
            Basic http auth password for the bindle server [env: BINDLE_PASSWORD=]

        --bindle-server <BINDLE_SERVER_URL>
            URL of bindle server [env: BINDLE_URL=]

        --bindle-username <BINDLE_USERNAME>
            Basic http auth username for the bindle server [env: BINDLE_USERNAME=]

        --environment-name <environment-name>
            Save the login details under the specified name instead of making them the default. Use
            named environments with `spin deploy --environment-name <name>` [env:
            FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -k, --insecure
            Ignore server certificate errors from bindle and hippo

        --list
            List saved logins

        --password <HIPPO_PASSWORD>
            Hippo password [env: HIPPO_PASSWORD=]

        --status
            Display login status

        --token <TOKEN>
            Auth Token [env: SPIN_AUTH_TOKEN=]

        --url <HIPPO_SERVER_URL>
            URL of hippo server [env: HIPPO_URL=] [default: https://cloud.fermyon.com/]

        --username <HIPPO_USERNAME>
            Hippo username [env: HIPPO_USERNAME=]
```

{{ blockEnd }}

{{ blockEnd }}

### Deploy

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->
```console
$ spin deploy --help

spin-deploy 
Package and upload an application to the Fermyon Platform

USAGE:
    spin deploy [OPTIONS]

OPTIONS:
        --buildinfo <BUILDINFO>
            Build metadata to append to the bindle version

    -d, --staging-dir <STAGING_DIR>
            Path to assemble the bindle before pushing (defaults to a temporary directory)

    -e, --deploy-existing-bindle
            Deploy existing bindle if it already exists on bindle server

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -f, --file <APP_MANIFEST_FILE>
            Path to spin.toml [default: spin.toml]

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Pass a key/value (key=value) to all components of the application. Can be used multiple
            times

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->
```console
$ spin deploy --help

spin-deploy 
Package and upload an application to the Fermyon Platform

USAGE:
    spin deploy [OPTIONS]

OPTIONS:
        --buildinfo <BUILDINFO>
            Build metadata to append to the bindle version

    -d, --staging-dir <STAGING_DIR>
            Path to assemble the bindle before pushing (defaults to a temporary directory)

    -e, --deploy-existing-bindle
            Deploy existing bindle if it already exists on bindle server

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -f, --file <APP_MANIFEST_FILE>
            Path to spin.toml [default: spin.toml]

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Pass a key/value (key=value) to all components of the application. Can be used multiple
            times

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]
```

{{ blockEnd }}

{{ blockEnd }}

### Help

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin help      

spin 1.0.0 
The Spin CLI

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    build        Build the Spin application
    cloud        Commands for publishing applications to the Fermyon Platform
    deploy       Package and upload an application to the Fermyon Platform
    help         Print this message or the help of the given subcommand(s)
    login        Log into the Fermyon Platform
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    registry     Commands for working with OCI registries to distribute applications
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin help      

spin 1.1.0 
The Spin CLI

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    build        Build the Spin application
    cloud        Commands for publishing applications to the Fermyon Platform
    deploy       Package and upload an application to the Fermyon Platform
    help         Print this message or the help of the given subcommand(s)
    login        Log into the Fermyon Platform
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    registry     Commands for working with OCI registries to distribute applications
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
    watch        Rebuild and restart the Spin application when files changes
```

{{ blockEnd }}

{{ blockEnd }}

> Please note: Spin `help` is a convenient way to access help using a subcommand, instead of using the `--help` option. For example, `spin help cloud` will give you the same output as `spin cloud --help`. Similarly, `spin help build` will give you the same output as `spin build --help` and so forth.

### Login

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin login --help

spin-login 
Log into the Fermyon Platform

USAGE:
    spin login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>
            [env: AUTH_METHOD=] [possible values: github, username, token]

        --bindle-password <BINDLE_PASSWORD>
            Basic http auth password for the bindle server [env: BINDLE_PASSWORD=]

        --bindle-server <BINDLE_SERVER_URL>
            URL of bindle server [env: BINDLE_URL=]

        --bindle-username <BINDLE_USERNAME>
            Basic http auth username for the bindle server [env: BINDLE_USERNAME=]

        --environment-name <environment-name>
            Save the login details under the specified name instead of making them the default. Use
            named environments with `spin deploy --environment-name <name>` [env:
            FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -k, --insecure
            Ignore server certificate errors from bindle and hippo

        --list
            List saved logins

        --password <HIPPO_PASSWORD>
            Hippo password [env: HIPPO_PASSWORD=]

        --status
            Display login status

        --token <TOKEN>
            Auth Token [env: SPIN_AUTH_TOKEN=]

        --url <HIPPO_SERVER_URL>
            URL of hippo server [env: HIPPO_URL=] [default: https://cloud.fermyon.com/]

        --username <HIPPO_USERNAME>
            Hippo username [env: HIPPO_USERNAME=]
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin login --help

spin-login 
Log into the Fermyon Platform

USAGE:
    spin login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>
            [env: AUTH_METHOD=] [possible values: github, username, token]

        --bindle-password <BINDLE_PASSWORD>
            Basic http auth password for the bindle server [env: BINDLE_PASSWORD=]

        --bindle-server <BINDLE_SERVER_URL>
            URL of bindle server [env: BINDLE_URL=]

        --bindle-username <BINDLE_USERNAME>
            Basic http auth username for the bindle server [env: BINDLE_USERNAME=]

        --environment-name <environment-name>
            Save the login details under the specified name instead of making them the default. Use
            named environments with `spin deploy --environment-name <name>` [env:
            FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -k, --insecure
            Ignore server certificate errors from bindle and hippo

        --list
            List saved logins

        --password <HIPPO_PASSWORD>
            Hippo password [env: HIPPO_PASSWORD=]

        --status
            Display login status

        --token <TOKEN>
            Auth Token [env: SPIN_AUTH_TOKEN=]

        --url <HIPPO_SERVER_URL>
            URL of hippo server [env: HIPPO_URL=] [default: https://cloud.fermyon.com/]

        --username <HIPPO_USERNAME>
            Hippo username [env: HIPPO_USERNAME=]
```

{{ blockEnd }}

{{ blockEnd }}

### New

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin new --help  

spin-new 
Scaffold a new application based on a template

USAGE:
    spin new [OPTIONS] [ARGS]

ARGS:
    <TEMPLATE_ID>    The template from which to create the new application or component. Run
                     `spin templates list` to see available options
    <NAME>           The name of the new application or component

OPTIONS:
        --accept-defaults              An optional argument that allows to skip prompts for the
                                       manifest file by accepting the defaults if available on the
                                       template
    -h, --help                         Print help information
    -o, --output <OUTPUT_PATH>         The directory in which to create the new application or
                                       component. The default is the name argument
        --tag <TAGS>                   Filter templates to select by tags
    -v, --value <VALUES>               Parameter values to be passed to the template (in name=value
                                       format)
        --values-file <VALUES_FILE>    A TOML file which contains parameter values in name = "value"
                                       format. Parameters passed as CLI option overwrite parameters
                                       specified in the file
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin new --help  

spin-new 
Scaffold a new application based on a template

USAGE:
    spin new [OPTIONS] [ARGS]

ARGS:
    <TEMPLATE_ID>    The template from which to create the new application or component. Run
                     `spin templates list` to see available options
    <NAME>           The name of the new application or component

OPTIONS:
        --accept-defaults              An optional argument that allows to skip prompts for the
                                       manifest file by accepting the defaults if available on the
                                       template
    -h, --help                         Print help information
    -o, --output <OUTPUT_PATH>         The directory in which to create the new application or
                                       component. The default is the name argument
        --tag <TAGS>                   Filter templates to select by tags
    -v, --value <VALUES>               Parameter values to be passed to the template (in name=value
                                       format)
        --values-file <VALUES_FILE>    A TOML file which contains parameter values in name = "value"
                                       format. Parameters passed as CLI option overwrite parameters
                                       specified in the file
```

{{ blockEnd }}

{{ blockEnd }}

**Please note: `spin new` vs `spin add`**.  These commands are similar except that:

* `spin new` creates a _new_ application - that is, a new directory with a new `spin.toml` file.
* `spin add` _adds_ a component to an _existing_ application - that is, it modifies an existing `spin.toml` file.

### Plugins

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins --help

spin-plugins 
Install/uninstall Spin plugins

USAGE:
    spin plugins <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help         Print this message or the help of the given subcommand(s)
    install      Install plugin from a manifest
    list         List available or installed plugins
    uninstall    Remove a plugin from your installation
    update       Fetch the latest Spin plugins from the spin-plugins repository
    upgrade      Upgrade one or all plugins
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins --help

spin-plugins 
Install/uninstall Spin plugins

USAGE:
    spin plugins <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help         Print this message or the help of the given subcommand(s)
    install      Install plugin from a manifest
    list         List available or installed plugins
    uninstall    Remove a plugin from your installation
    update       Fetch the latest Spin plugins from the spin-plugins repository
    upgrade      Upgrade one or all plugins
```

{{ blockEnd }}

{{ blockEnd }}

#### Install (Plugins)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins install --help

spin-plugins-install 
Install plugin from a manifest.

The binary file and manifest of the plugin is copied to the local Spin plugins directory.

USAGE:
    spin plugins install [OPTIONS] [PLUGIN_NAME]

ARGS:
    <PLUGIN_NAME>
            Name of Spin plugin

OPTIONS:
    -f, --file <LOCAL_PLUGIN_MANIFEST>
            Path to local plugin manifest

    -h, --help
            Print help information

        --override-compatibility-check
            Overrides a failed compatibility check of the plugin with the current version of Spin

    -u, --url <REMOTE_PLUGIN_MANIFEST>
            URL of remote plugin manifest to install

    -v, --version <VERSION>
            Specific version of a plugin to be install from the centralized plugins repository

    -y, --yes
            Skips prompt to accept the installation of the plugin
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins install --help

spin-plugins-install 
Install plugin from a manifest.

The binary file and manifest of the plugin is copied to the local Spin plugins directory.

USAGE:
    spin plugins install [OPTIONS] [PLUGIN_NAME]

ARGS:
    <PLUGIN_NAME>
            Name of Spin plugin

OPTIONS:
    -f, --file <LOCAL_PLUGIN_MANIFEST>
            Path to local plugin manifest

    -h, --help
            Print help information

        --override-compatibility-check
            Overrides a failed compatibility check of the plugin with the current version of Spin

    -u, --url <REMOTE_PLUGIN_MANIFEST>
            URL of remote plugin manifest to install

    -v, --version <VERSION>
            Specific version of a plugin to be install from the centralized plugins repository

    -y, --yes
            Skips prompt to accept the installation of the plugin
```

{{ blockEnd }}

{{ blockEnd }}

#### List (Plugins)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins list --help   

spin-plugins-list 
List available or installed plugins

USAGE:
    spin plugins list [OPTIONS]

OPTIONS:
    -h, --help         Print help information
        --installed    List only installed plugins
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins list --help   

spin-plugins-list 
List available or installed plugins

USAGE:
    spin plugins list [OPTIONS]

OPTIONS:
    -h, --help         Print help information
        --installed    List only installed plugins
```

{{ blockEnd }}

{{ blockEnd }}

#### Uninstall (Plugins)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins uninstall --help

spin-plugins-uninstall 
Remove a plugin from your installation

USAGE:
    spin plugins uninstall <NAME>

ARGS:
    <NAME>    Name of Spin plugin

OPTIONS:
    -h, --help    Print help information
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins uninstall --help

spin-plugins-uninstall 
Remove a plugin from your installation

USAGE:
    spin plugins uninstall <NAME>

ARGS:
    <NAME>    Name of Spin plugin

OPTIONS:
    -h, --help    Print help information
```

{{ blockEnd }}

{{ blockEnd }}

#### Update (Plugins)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins update --help   

spin-plugins-update 
Fetch the latest Spin plugins from the spin-plugins repository

USAGE:
    spin plugins update

OPTIONS:
    -h, --help    Print help information
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins update --help   

spin-plugins-update 
Fetch the latest Spin plugins from the spin-plugins repository

USAGE:
    spin plugins update

OPTIONS:
    -h, --help    Print help information
```

{{ blockEnd }}

{{ blockEnd }}

#### Upgrade (Plugins)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins upgrade --help

spin-plugins-upgrade 
Upgrade one or all plugins

USAGE:
    spin plugins upgrade [OPTIONS] [PLUGIN_NAME]

ARGS:
    <PLUGIN_NAME>    Name of Spin plugin to upgrade

OPTIONS:
    -a, --all
            Upgrade all plugins

    -d, --downgrade
            Allow downgrading a plugin's version

    -f, --file <LOCAL_PLUGIN_MANIFEST>
            Path to local plugin manifest

    -h, --help
            Print help information

        --override-compatibility-check
            Overrides a failed compatibility check of the plugin with the current version of Spin

    -u, --url <REMOTE_PLUGIN_MANIFEST>
            Path to remote plugin manifest

    -v, --version <VERSION>
            Specific version of a plugin to be install from the centralized plugins repository

    -y, --yes
            Skips prompt to accept the installation of the plugin[s]
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin plugins upgrade --help

spin-plugins-upgrade 
Upgrade one or all plugins

USAGE:
    spin plugins upgrade [OPTIONS] [PLUGIN_NAME]

ARGS:
    <PLUGIN_NAME>    Name of Spin plugin to upgrade

OPTIONS:
    -a, --all
            Upgrade all plugins

    -d, --downgrade
            Allow downgrading a plugin's version

    -f, --file <LOCAL_PLUGIN_MANIFEST>
            Path to local plugin manifest

    -h, --help
            Print help information

        --override-compatibility-check
            Overrides a failed compatibility check of the plugin with the current version of Spin

    -u, --url <REMOTE_PLUGIN_MANIFEST>
            Path to remote plugin manifest

    -v, --version <VERSION>
            Specific version of a plugin to be install from the centralized plugins repository

    -y, --yes
            Skips prompt to accept the installation of the plugin[s]
```

{{ blockEnd }}

{{ blockEnd }}

**Note:** For additional information, please see the [Managing Plugins](https://developer.fermyon.com/spin/managing-plugins) and/or [Creating Plugins](https://developer.fermyon.com/spin/plugin-authoring) sections of the documentation.

### OCI Registry

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry --help

spin-registry 
Commands for working with OCI registries to distribute applications. Currently, the OCI commands are reusing the
credentials from ~/.docker/config.json to authenticate to registries

USAGE:
    spin registry <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help     Print this message or the help of the given subcommand(s)
    login    Log in to a registry
    pull     Pull a Spin application from a registry
    push     Push a Spin application to a registry
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry --help

spin-registry 
Commands for working with OCI registries to distribute applications. Currently, the OCI commands are reusing the
credentials from ~/.docker/config.json to authenticate to registries

USAGE:
    spin registry <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help     Print this message or the help of the given subcommand(s)
    login    Log in to a registry
    pull     Pull a Spin application from a registry
    push     Push a Spin application to a registry
```

{{ blockEnd }}

{{ blockEnd }}

#### Login (OCI Registry)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry login --help

spin-registry-login 
Log in to a registry

USAGE:
    spin registry login [OPTIONS] <SERVER>

ARGS:
    <SERVER>    

OPTIONS:
    -h, --help                   Print help information
    -p, --password <PASSWORD>    Password for the registry
        --password-stdin         Take the password from stdin
    -u, --username <USERNAME>    Username for the registry
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry login --help

spin-registry-login 
Log in to a registry

USAGE:
    spin registry login [OPTIONS] <SERVER>

ARGS:
    <SERVER>    

OPTIONS:
    -h, --help                   Print help information
    -p, --password <PASSWORD>    Password for the registry
        --password-stdin         Take the password from stdin
    -u, --username <USERNAME>    Username for the registry
```

{{ blockEnd }}

{{ blockEnd }}

#### Pull (OCI Registry)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry pull --help

spin-registry-pull 
Pull a Spin application from a registry

USAGE:
    spin registry pull [OPTIONS] <REFERENCE>

ARGS:
    <REFERENCE>    Reference of the Spin application

OPTIONS:
    -h, --help        Print help information
    -k, --insecure    Ignore server certificate errors
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry pull --help

spin-registry-pull 
Pull a Spin application from a registry

USAGE:
    spin registry pull [OPTIONS] <REFERENCE>

ARGS:
    <REFERENCE>    Reference of the Spin application

OPTIONS:
    -h, --help        Print help information
    -k, --insecure    Ignore server certificate errors
```

{{ blockEnd }}

{{ blockEnd }}

#### Push (OCI Registry)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry push --help 

spin-registry-push 
Push a Spin application to a registry

USAGE:
    spin registry push [OPTIONS] <REFERENCE>

ARGS:
    <REFERENCE>    Reference of the Spin application

OPTIONS:
    -f, --file <APP_MANIFEST_FILE>    Path to spin.toml
    -h, --help                        Print help information
    -k, --insecure                    Ignore server certificate errors
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin registry push --help 

spin-registry-push 
Push a Spin application to a registry

USAGE:
    spin registry push [OPTIONS] <REFERENCE>

ARGS:
    <REFERENCE>    Reference of the Spin application

OPTIONS:
    -f, --file <APP_MANIFEST_FILE>    Path to spin.toml
    -h, --help                        Print help information
    -k, --insecure                    Ignore server certificate errors
```

{{ blockEnd }}

{{ blockEnd }}

### Templates

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates --help    

spin-templates 
Commands for working with WebAssembly component templates

USAGE:
    spin templates <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help         Print this message or the help of the given subcommand(s)
    install      Install templates from a Git repository or local directory
    list         List the installed templates
    uninstall    Remove a template from your installation
    upgrade      Upgrade templates to match your current version of Spin
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates --help    

spin-templates 
Commands for working with WebAssembly component templates

USAGE:
    spin templates <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help         Print this message or the help of the given subcommand(s)
    install      Install templates from a Git repository or local directory
    list         List the installed templates
    uninstall    Remove a template from your installation
    upgrade      Upgrade templates to match your current version of Spin
```

{{ blockEnd }}

{{ blockEnd }}
    
#### Install (Templates)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates install --help

spin-templates-install 
Install templates from a Git repository or local directory.

The files of the templates are copied to the local template store: a directory in your data or home
directory.

USAGE:
    spin templates install [OPTIONS]

OPTIONS:
        --branch <BRANCH>
            The optional branch of the git repository

        --dir <FROM_DIR>
            Local directory containing the template(s) to install

        --git <FROM_GIT>
            The URL of the templates git repository. The templates must be in a git repository in a
            "templates" directory

    -h, --help
            Print help information

        --upgrade
            If present, updates existing templates instead of skipping
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates install --help

spin-templates-install 
Install templates from a Git repository or local directory.

The files of the templates are copied to the local template store: a directory in your data or home
directory.

USAGE:
    spin templates install [OPTIONS]

OPTIONS:
        --branch <BRANCH>
            The optional branch of the git repository

        --dir <FROM_DIR>
            Local directory containing the template(s) to install

        --git <FROM_GIT>
            The URL of the templates git repository. The templates must be in a git repository in a
            "templates" directory

    -h, --help
            Print help information

        --upgrade
            If present, updates existing templates instead of skipping
```

{{ blockEnd }}

{{ blockEnd }}

#### List (Templates)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates list --help   

spin-templates-list 
List the installed templates

USAGE:
    spin templates list [OPTIONS]

OPTIONS:
    -h, --help          Print help information
        --tag <TAGS>    Filter templates matching all provided tags
        --verbose       Whether to show additional template details in the list
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates list --help   

spin-templates-list 
List the installed templates

USAGE:
    spin templates list [OPTIONS]

OPTIONS:
    -h, --help          Print help information
        --tag <TAGS>    Filter templates matching all provided tags
        --verbose       Whether to show additional template details in the list
```

{{ blockEnd }}

{{ blockEnd }}

#### Uninstall (Templates)

<!-- @selectiveCpy -->

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates uninstall --help

spin-templates-uninstall 
Remove a template from your installation

USAGE:
    spin templates uninstall <TEMPLATE_ID>

ARGS:
    <TEMPLATE_ID>    The template to uninstall

OPTIONS:
    -h, --help    Print help information
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates uninstall --help

spin-templates-uninstall 
Remove a template from your installation

USAGE:
    spin templates uninstall <TEMPLATE_ID>

ARGS:
    <TEMPLATE_ID>    The template to uninstall

OPTIONS:
    -h, --help    Print help information
```

{{ blockEnd }}

{{ blockEnd }}

#### Upgrade (Templates)

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates upgrade --help  

spin-templates-upgrade 
Upgrade templates to match your current version of Spin.

The files of the templates are copied to the local template store: a directory in your data or home
directory.

USAGE:
    spin templates upgrade [OPTIONS]

OPTIONS:
        --all
            By default, Spin displays the list of installed repositories and prompts you to choose
            which to upgrade.  Pass this flag to upgrade all repositories without prompting

        --branch <BRANCH>
            The optional branch of the git repository, if a specific repository is given

    -h, --help
            Print help information

        --repo <GIT_URL>
            By default, Spin displays the list of installed repositories and prompts you to choose
            which to upgrade.  Pass this flag to upgrade only the specified repository without
            prompting
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin templates upgrade --help  

spin-templates-upgrade 
Upgrade templates to match your current version of Spin.

The files of the templates are copied to the local template store: a directory in your data or home
directory.

USAGE:
    spin templates upgrade [OPTIONS]

OPTIONS:
        --all
            By default, Spin displays the list of installed repositories and prompts you to choose
            which to upgrade.  Pass this flag to upgrade all repositories without prompting

        --branch <BRANCH>
            The optional branch of the git repository, if a specific repository is given

    -h, --help
            Print help information

        --repo <GIT_URL>
            By default, Spin displays the list of installed repositories and prompts you to choose
            which to upgrade.  Pass this flag to upgrade only the specified repository without
            prompting
```

{{ blockEnd }}

{{ blockEnd }}

**Note:** For additional information, please see the [Managing Templates](https://developer.fermyon.com/spin/managing-templates) and/or [Creating Templates](https://developer.fermyon.com/spin/template-authoring) sections of the documentation.

### Up

The following options are available in relation to running your Spin application. Additionally, depending on the type of trigger that your application uses (i.e. HTTP or Redis trigger), there are trigger-specific options available. Details of the trigger options can be found in the next section (below).

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin up --help

spin-up 
Start the Spin application
USAGE:
    spin up [OPTIONS]

OPTIONS:
        --direct-mounts         For local apps with directory mounts and no excluded files, mount
                                them directly instead of using a temporary directory
    -e, --env <ENV>             Pass an environment variable (key=value) to all components of the
                                application
    -f, --from <APPLICATION>    The application to run. This may be a manifest (spin.toml) file, a
                                directory containing a spin.toml file, or a remote registry
                                reference. If omitted, it defaults to "spin.toml"
    -h, --help                  
    -k, --insecure              Ignore server certificate errors from bindle server or registry
        --temp <TMP>            Temporary directory for the static assets of the components

TRIGGER OPTIONS:
        --allow-transient-write
            Set the static assets of the components in the temporary directory as writable

        --cache <WASMTIME_CACHE_FILE>
            Wasmtime cache configuration file
            
            [env: WASMTIME_CACHE_FILE=]

        --disable-cache
            Disable Wasmtime cache
            
            [env: DISABLE_WASMTIME_CACHE=]

        --follow <FOLLOW_ID>
            Print output to stdout/stderr only for given component(s)

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin up --help

spin-up 
Start the Spin application
USAGE:
    spin up [OPTIONS]

OPTIONS:
        --direct-mounts         For local apps with directory mounts and no excluded files, mount
                                them directly instead of using a temporary directory
    -e, --env <ENV>             Pass an environment variable (key=value) to all components of the
                                application
    -f, --from <APPLICATION>    The application to run. This may be a manifest (spin.toml) file, a
                                directory containing a spin.toml file, or a remote registry
                                reference. If omitted, it defaults to "spin.toml"
    -h, --help                  
    -k, --insecure              Ignore server certificate errors from bindle server or registry
        --temp <TMP>            Temporary directory for the static assets of the components

TRIGGER OPTIONS:
        --allow-transient-write
            Set the static assets of the components in the temporary directory as writable

        --cache <WASMTIME_CACHE_FILE>
            Wasmtime cache configuration file
            
            [env: WASMTIME_CACHE_FILE=]

        --disable-cache
            Disable Wasmtime cache
            
            [env: DISABLE_WASMTIME_CACHE=]

        --follow <FOLLOW_ID>
            Print output to stdout/stderr only for given component(s)

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

```

{{ blockEnd }}

{{ blockEnd }}

> **Please note:** If the `-f` or `--from` options do not accurately infer the intended registry or `.toml` file for your application, then you can explicitly specify either the `--from-registry` or  `--from-file` options to clarify this.

#### Trigger Options

##### Redis Request Handler

Below, please see the available trigger options for the Redis request handler.

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin up --help

spin-up 
Start the Spin application

OPTIONS:
        --direct-mounts         For local apps with directory mounts and no excluded files, mount
                                them directly instead of using a temporary directory
    -e, --env <ENV>             Pass an environment variable (key=value) to all components of the
                                application
    -f, --from <APPLICATION>    The application to run. This may be a manifest (spin.toml) file, a
                                directory containing a spin.toml file, or a remote registry
                                reference. If omitted, it defaults to "spin.toml"
    -h, --help                  
    -k, --insecure              Ignore server certificate errors from bindle server or registry
        --temp <TMP>            Temporary directory for the static assets of the components

TRIGGER OPTIONS:
        --allow-transient-write
            Set the static assets of the components in the temporary directory as writable

        --cache <WASMTIME_CACHE_FILE>
            Wasmtime cache configuration file
            
            [env: WASMTIME_CACHE_FILE=]

        --disable-cache
            Disable Wasmtime cache
            
            [env: DISABLE_WASMTIME_CACHE=]

        --follow <FOLLOW_ID>
            Print output to stdout/stderr only for given component(s)

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

        --state-dir <STATE_DIR>
            Set the application state directory path. This is used in the default locations for
            logs, key value stores, etc.
            
            For local apps, this defaults to `.spin/` relative to the `spin.toml` file. For remote
            apps, this has no default (unset). Passing an empty value forces the value to be unset.
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin up --help

spin-up 
Start the Spin application

OPTIONS:
        --direct-mounts         For local apps with directory mounts and no excluded files, mount
                                them directly instead of using a temporary directory
    -e, --env <ENV>             Pass an environment variable (key=value) to all components of the
                                application
    -f, --from <APPLICATION>    The application to run. This may be a manifest (spin.toml) file, a
                                directory containing a spin.toml file, or a remote registry
                                reference. If omitted, it defaults to "spin.toml"
    -h, --help                  
    -k, --insecure              Ignore server certificate errors from bindle server or registry
        --temp <TMP>            Temporary directory for the static assets of the components

TRIGGER OPTIONS:
        --allow-transient-write
            Set the static assets of the components in the temporary directory as writable

        --cache <WASMTIME_CACHE_FILE>
            Wasmtime cache configuration file
            
            [env: WASMTIME_CACHE_FILE=]

        --disable-cache
            Disable Wasmtime cache
            
            [env: DISABLE_WASMTIME_CACHE=]

        --follow <FOLLOW_ID>
            Print output to stdout/stderr only for given component(s)

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

        --state-dir <STATE_DIR>
            Set the application state directory path. This is used in the default locations for
            logs, key value stores, etc.
            
            For local apps, this defaults to `.spin/` relative to the `spin.toml` file. For remote
            apps, this has no default (unset). Passing an empty value forces the value to be unset.
```

{{ blockEnd }}

{{ blockEnd }}

##### HTTP Request Handler

Below, please see the available trigger options for the HTTP request handler. Note the additional three trigger options that the HTTP request handler offers (`--listen`, `--tls-cert` and `--tls-key`).

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

<!-- @selectiveCpy -->

```console
$ spin up --help

spin-up 
Start the Spin application

OPTIONS:
        --direct-mounts         For local apps with directory mounts and no excluded files, mount
                                them directly instead of using a temporary directory
    -e, --env <ENV>             Pass an environment variable (key=value) to all components of the
                                application
    -f, --from <APPLICATION>    The application to run. This may be a manifest (spin.toml) file, a
                                directory containing a spin.toml file, or a remote registry
                                reference. If omitted, it defaults to "spin.toml"
    -h, --help                  
    -k, --insecure              Ignore server certificate errors from bindle server or registry
        --temp <TMP>            Temporary directory for the static assets of the components

TRIGGER OPTIONS:
        --allow-transient-write
            Set the static assets of the components in the temporary directory as writable

        --cache <WASMTIME_CACHE_FILE>
            Wasmtime cache configuration file
            
            [env: WASMTIME_CACHE_FILE=]

        --disable-cache
            Disable Wasmtime cache
            
            [env: DISABLE_WASMTIME_CACHE=]

        --follow <FOLLOW_ID>
            Print output to stdout/stderr only for given component(s)

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

        --listen <ADDRESS>
            IP address and port to listen on
            
            [default: 127.0.0.1:3000]

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

        --state-dir <STATE_DIR>
            Set the application state directory path. This is used in the default locations for
            logs, key value stores, etc.
            
            For local apps, this defaults to `.spin/` relative to the `spin.toml` file. For remote
            apps, this has no default (unset). Passing an empty value forces the value to be unset.

        --tls-cert <TLS_CERT>
            The path to the certificate to use for https, if this is not set, normal http will be
            used. The cert should be in PEM format
            
            [env: SPIN_TLS_CERT=]

        --tls-key <TLS_KEY>
            The path to the certificate key to use for https, if this is not set, normal http will
            be used. The key should be in PKCS#8 format
            
            [env: SPIN_TLS_KEY=]
```

{{ blockEnd }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin up --help

spin-up 
Start the Spin application

OPTIONS:
        --direct-mounts         For local apps with directory mounts and no excluded files, mount
                                them directly instead of using a temporary directory
    -e, --env <ENV>             Pass an environment variable (key=value) to all components of the
                                application
    -f, --from <APPLICATION>    The application to run. This may be a manifest (spin.toml) file, a
                                directory containing a spin.toml file, or a remote registry
                                reference. If omitted, it defaults to "spin.toml"
    -h, --help                  
    -k, --insecure              Ignore server certificate errors from bindle server or registry
        --temp <TMP>            Temporary directory for the static assets of the components

TRIGGER OPTIONS:
        --allow-transient-write
            Set the static assets of the components in the temporary directory as writable

        --cache <WASMTIME_CACHE_FILE>
            Wasmtime cache configuration file
            
            [env: WASMTIME_CACHE_FILE=]

        --disable-cache
            Disable Wasmtime cache
            
            [env: DISABLE_WASMTIME_CACHE=]

        --follow <FOLLOW_ID>
            Print output to stdout/stderr only for given component(s)

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

        --listen <ADDRESS>
            IP address and port to listen on
            
            [default: 127.0.0.1:3000]

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

        --state-dir <STATE_DIR>
            Set the application state directory path. This is used in the default locations for
            logs, key value stores, etc.
            
            For local apps, this defaults to `.spin/` relative to the `spin.toml` file. For remote
            apps, this has no default (unset). Passing an empty value forces the value to be unset.

        --tls-cert <TLS_CERT>
            The path to the certificate to use for https, if this is not set, normal http will be
            used. The cert should be in PEM format
            
            [env: SPIN_TLS_CERT=]

        --tls-key <TLS_KEY>
            The path to the certificate key to use for https, if this is not set, normal http will
            be used. The key should be in PKCS#8 format
            
            [env: SPIN_TLS_KEY=]
```

{{ blockEnd }}

{{ blockEnd }}

### Watch

{{ tabs "spin-version" }}

{{ startTab "v1.1.0"}}

<!-- @selectiveCpy -->

```console
$ spin watch --help

spin-watch
Build and run the Spin application, rebuilding and restarting it when files change

USAGE:
    spin watch [OPTIONS] [UP_ARGS]...

ARGS:
    <UP_ARGS>...    Arguments to be passed through to spin up

OPTIONS:
    -c, --clear                       Clear the screen before each run
    -d, --debounce <DEBOUNCE>         Set the timeout between detected change and re-execution, in
                                      milliseconds [default: 100]
    -f, --file <APP_MANIFEST_FILE>    Path to spin.toml [default: spin.toml]
    -h, --help                        Print help information
        --skip-build                  Only run the Spin application, restarting it when build
                                      artifacts change
```

{{ blockEnd }}

{{ blockEnd }}

`spin watch` relies on configuration in your application manifest to know what files it should watch. For each component you should set the `component.build.watch` parameter with a list of glob patterns that your source files will match:

```toml
[component.build]
# Example watch configuration for a Rust application
watch = ["src/**/*.rs", "Cargo.toml"]
```

The table below outlines exactly which files `spin watch` will monitor for changes depending on how you run the command. `spin watch` uses the configuration found on every component in your application.

| Files                   | `spin watch` monitors for changes              | `spin watch --skip-build` monitors for changes |
| ----------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Application manifest    | Yes                                            | Yes                                            |
| `component.build.watch` | Yes                                            | No                                             |
| `component.files`       | Yes                                            | Yes                                            |
| `component.source`      | No (Yes if the component has no build command) | Yes                                            |

### CLI Stability Table

CLI commands have four phases that indicate levels of stability:

- `Experimental`: These commands are experiments and may or may not be available in later versions of the CLI.
- `Stabilizing`: These commands have moved out of the `experimental` phase and we are now in the active process of stabilizing them. This includes updating flags, command output, errors, and more.
- `Stable`: These commands have moved out of the `stablizing` phase and will not change in backwards incompatible ways until the next major version release.
- `Deprecated`: Support for these commands will be removed in a future release.

{{ tabs "spin-version" }}

{{ startTab "v1.0.0"}}

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>spin add</code>                                                 | Stable      |
| <code>spin build</code>                                               | Stable      |
| <code>spin new</code>                                                 | Stable      |
| <code>spin plugins <install&vert;list&vert;uninstall&vert;update&vert;upgrade></code> | Stable      |
| <code>spin templates <install&vert;list&vert;uninstall&vert;upgrade></code>       | Stable      |
| <code>spin up</code>                                                  | Stable      |
| <code>spin cloud <deploy&vert;login></code>                               | Stabilizing |
| <code>spin registry</code>                                            | Stabilizing |
| <code>spin bindle <prepare&vert;push></code>                              | Deprecated  |

{{ blockEnd }}

{{ blockEnd }}
