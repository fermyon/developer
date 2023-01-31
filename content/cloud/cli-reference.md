title = "Spin Command Line Interface (CLI) Reference"
template = "cloud_main"
date = "2022-01-01T00:00:01Z"
[extra]

---

- [Spin](#spin)
  - [Add](#add)
  - [Bindle](#bindle)
    - [Prepare (Bindle)](#prepare-bindle)
    - [Push (Bindle)](#push-bindle)
  - [Build](#build)
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
  - [Templates](#templates)
    - [Install (Templates)](#install-templates)
    - [List (Templates)](#list-templates)
    - [Uninstall (Templates)](#uninstall-templates)
  - [Up](#up)

## Spin

This page documents the Spin Command Line Interface (CLI). Specifically, all of the available Spin Options and Subcommands. You can reproduce this documentation on your machine by using the `--help` For example:

<!-- @selectiveCpy -->

```
$ spin --help

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    bindle       Commands for publishing applications as bindles
    build        Build the Spin application
    deploy       Deploy a Spin application
    help         Print this message or the help of the given subcommand(s)
    login        Log into the server
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
```

### Add

Adding a subcommand (and again issuing the `--help` command) will provide information specific to that particular subcommand. For example:

<!-- @selectiveCpy -->

```
$ spin add --help

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
    -f, --file <APP_CONFIG_FILE>       Path to spin.toml
    -h, --help                         Print help information
    -o, --output <OUTPUT_PATH>         The directory in which to create the new application or
                                       component. The default is the name argument
    -v, --value <VALUES>               Parameter values to be passed to the template (in name=value
                                       format)
        --values-file <VALUES_FILE>    A TOML file which contains parameter values in name = "value"
                                       format. Parameters passed as CLI option overwrite parameters
                                       specified in the file
```

### Bindle

Adding a subcommand (and again issuing the `--help` command) will provide information specific to that particular subcommand. For example:

<!-- @selectiveCpy -->

```
$ spin bindle --help

USAGE:
    spin bindle <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help       Print this message or the help of the given subcommand(s)
    prepare    Create a standalone bindle for subsequent publication
    push       Publish an application as a bindle
```

#### Prepare (Bindle)

Again, adding another related subcommand provides even more specific information. For example:

<!-- @selectiveCpy -->

```
$ spin bindle prepare --help

USAGE:
    spin bindle prepare [OPTIONS] --staging-dir <STAGING_DIR>

OPTIONS:
        --buildinfo <BUILDINFO>        Build metadata to append to the bindle version
    -d, --staging-dir <STAGING_DIR>    Path to create standalone bindle
    -f, --file <APP_CONFIG_FILE>       Path to spin.toml
    -h, --help                         Print help information
```

#### Push (Bindle)

<!-- @selectiveCpy -->

```
$ spin bindle push --help

USAGE:
    spin bindle push [OPTIONS] --bindle-server <BINDLE_SERVER_URL>

OPTIONS:
        --bindle-password <BINDLE_PASSWORD>
            Basic http auth password for the bindle server [env: BINDLE_PASSWORD=]

        --bindle-server <BINDLE_SERVER_URL>
            URL of bindle server [env: BINDLE_URL=]

        --bindle-username <BINDLE_USERNAME>
            Basic http auth username for the bindle server [env: BINDLE_USERNAME=]

        --buildinfo <BUILDINFO>
            Build metadata to append to the bindle version

    -d, --staging-dir <STAGING_DIR>
            Path to assemble the bindle before pushing (defaults to temporary directory)

    -f, --file <APP_CONFIG_FILE>
            Path to spin.toml

    -h, --help
            Print help information

    -k, --insecure
            Ignore server certificate errors
```

### Build

<!-- @selectiveCpy -->

```
$ spin build --help

USAGE:
    spin build [OPTIONS] [UP_ARGS]...

ARGS:
    <UP_ARGS>...    

OPTIONS:
    -f, --file <APP_CONFIG_FILE>    Path to spin.toml
    -h, --help                      Print help information
    -u, --up                        Run the application after building
```

### Deploy

<!-- @selectiveCpy -->

```
$ spin deploy --help

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

    -f, --file <APP_CONFIG_FILE>
            Path to spin.toml [default: spin.toml]

    -h, --help
            Print help information

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]
```

### Help

<!-- @selectiveCpy -->

```
spin help

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    bindle       Commands for publishing applications as bindles
    build        Build the Spin application
    deploy       Deploy a Spin application
    help         Print this message or the help of the given subcommand(s)
    login        Log into the server
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
```

> Please note: Spin `help` is a convenient way to access help using a subcommand, instead of using the `--help` option. For example, `spin help deploy` will give you the same output as `spin deploy --help`. Similarly, `spin help build` will give you the same output as `spin build --help` and so forth.

### Login

<!-- @selectiveCpy -->

```
spin login --help

USAGE:
    spin login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>
            [env: AUTH_METHOD=] [possible values: github, username]

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

        --url <HIPPO_SERVER_URL>
            URL of hippo server [env: HIPPO_URL=] [default: https://cloud.fermyon.com/]

        --username <HIPPO_USERNAME>
            Hippo username [env: HIPPO_USERNAME=]
```

### New

<!-- @selectiveCpy -->

```
$ spin new --help

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
    -v, --value <VALUES>               Parameter values to be passed to the template (in name=value
                                       format)
        --values-file <VALUES_FILE>    A TOML file which contains parameter values in name = "value"
                                       format. Parameters passed as CLI option overwrite parameters
```

The `spin add` command is identical to `spin new` except that it adds a component to an existing application (instead of starting a new application).  It needs an existing `spin.toml` file, either in the current directory or referenced via the `-f` option.

### Plugins

<!-- @selectiveCpy -->

```
$ spin plugins --help

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

#### Install (Plugins)

<!-- @selectiveCpy -->

```
$ spin plugins install --help

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

#### List (Plugins)

<!-- @selectiveCpy -->

```
$ spin plugins list --help

USAGE:
    spin plugins list [OPTIONS]

OPTIONS:
    -h, --help         Print help information
        --installed    List only installed plugins
```

#### Uninstall (Plugins)

<!-- @selectiveCpy -->

```
$ spin plugins uninstall --help

USAGE:
    spin plugins uninstall <NAME>

ARGS:
    <NAME>    Name of Spin plugin

OPTIONS:
    -h, --help    Print help information
```

#### Update (Plugins)

<!-- @selectiveCpy -->

```
$ spin plugins update --help

Fetch the latest Spin plugins from the spin-plugins repository

USAGE:
    spin plugins update

OPTIONS:
    -h, --help    Print help information
```

#### Upgrade (Plugins)

<!-- @selectiveCpy -->

```
$ spin plugins upgrade --help

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

### Templates

<!-- @selectiveCpy -->

```
$ spin templates --help

USAGE:
    spin templates <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help         Print this message or the help of the given subcommand(s)
    install      Install templates from a Git repository or local directory
    list         List the installed templates
    uninstall    Remove a template from your installation
```
    
#### Install (Templates)

<!-- @selectiveCpy -->

```
$ spin templates install --help

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

        --update
            If present, updates existing templates instead of skipping
```

#### List (Templates)

<!-- @selectiveCpy -->

```
$ spin templates list --help

USAGE:
    spin templates list

OPTIONS:
    -h, --help    Print help information
```

#### Uninstall (Templates)

<!-- @selectiveCpy -->

```
$ spin templates uninstall --help

USAGE:
    spin templates uninstall <TEMPLATE_ID>

ARGS:
    <TEMPLATE_ID>    The template to uninstall

OPTIONS:
    -h, --help    Print help information
```

### Up

<!-- @selectiveCpy -->

```
$ spin up --help

USAGE:
    spin up [OPTIONS]

OPTIONS:
    -b, --bindle <BINDLE_ID>
            ID of application bindle

        --bindle-password <BINDLE_PASSWORD>
            Basic http auth password for the bindle server [env: BINDLE_PASSWORD=]

        --bindle-server <BINDLE_SERVER_URL>
            URL of bindle server [env: BINDLE_URL=]

        --bindle-username <BINDLE_USERNAME>
            Basic http auth username for the bindle server [env: BINDLE_USERNAME=]

        --direct-mounts
            For local apps with directory mounts and no excluded files, mount them directly instead
            of using a temporary directory

    -e, --env <ENV>
            Pass an environment variable (key=value) to all components of the application

    -f, --file <APP_CONFIG_FILE>
            Path to spin.toml

    -h, --help
            

    -k, --insecure
            Ignore server certificate errors from bindle server

        --temp <TMP>
            Temporary directory for the static assets of the components

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
            Print output for given component(s) to stdout/stderr

        --follow-all
            Print all component output to stdout/stderr

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

        --listen <ADDRESS>
            IP address and port to listen on
            
            [default: 127.0.0.1:3000]

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

        --tls-cert <TLS_CERT>
            The path to the certificate to use for https, if this is not set, normal http will be
            used. The cert should be in PEM format
            
            [env: SPIN_TLS_CERT=]

        --tls-key <TLS_KEY>
            The path to the certificate key to use for https, if this is not set, normal http will
            be used. The key should be in PKCS#8 format
            
            [env: SPIN_TLS_KEY=]
```
