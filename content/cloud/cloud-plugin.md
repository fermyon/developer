title = "Cloud Command Reference"
date = "2023-06-07T22:41:02.478752Z"
template = "cloud_main"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/cloud-plugin.md"

---
- [Spin Cloud Command](#cloud)
  - [Deploy](#deploy)
  - [Login](#login)
  - [Variables](#variables)
    - [Set (Variables)](#set-variables)
    - [Delete (Variables)](#delete-variables)
    - [List (Variables)](#list-variables)
  - [Subcommands Stability Table](#subcommands-stability-table)

## Spin Cloud Command

Fermyon provides a `cloud` plugin for the Spin CLI for you to manage Spin applications in Fermyon Cloud. This page documents the `spin cloud` command. Specifically, all of the available options and subcommands. For more information on subcommand stability, see the [subcommands stability table](#subcommand-stability-table). You can reproduce the Spin Cloud command documentation on your machine by using the --help flag. For example:

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->

```console
$ spin cloud --help

cloud-plugin 0.1.0
Fermyon Engineering <engineering@fermyon.com>

USAGE:
    cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
```

{{ blockEnd }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->

```console
$ spin cloud --help

cloud-plugin 0.1.1
Fermyon Engineering <engineering@fermyon.com>

USAGE:
    cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ blockEnd }}

### Deploy

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

cloud-deploy 0.1.0
Package and upload an application to the Fermyon Cloud

USAGE:
    cloud deploy [OPTIONS]

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

    -f, --from <APP_MANIFEST_FILE>
            The application to deploy. This may be a manifest (spin.toml) file, or a directory
            containing a spin.toml file. If omitted, it defaults to "spin.toml" [default: spin.toml]

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the deployed application's default store. Any
            existing value will be overwritten. Can be used multiple times

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

cloud-deploy 0.1.1
Package and upload an application to the Fermyon Cloud

USAGE:
    cloud deploy [OPTIONS]

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

    -f, --from <APP_MANIFEST_FILE>
            The application to deploy. This may be a manifest (spin.toml) file, or a directory
            containing a spin.toml file. If omitted, it defaults to "spin.toml" [default: spin.toml]

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the deployed application's default store. Any
            existing value will be overwritten. Can be used multiple times

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]

    -V, --version
            Print version information

        --variable <VARIABLES>
            Set a variable pair (variable=value) in the deployed application. Any existing value
            will be overwritten. Can be used multiple times
```

{{ blockEnd }}

{{ blockEnd }}

## Login

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

cloud-login 0.1.0
Login to Fermyon Cloud

USAGE:
    cloud login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>
            [env: AUTH_METHOD=] [possible values: github, token]

        --environment-name <environment-name>
            Save the login details under the specified name instead of making them the default. Use
            named environments with `spin deploy --environment-name <name>` [env:
            FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -k, --insecure
            Ignore server certificate errors

        --list
            List saved logins

        --status
            Display login status

        --token <TOKEN>
            Auth Token [env: SPIN_AUTH_TOKEN=]

        --url <CLOUD_SERVER_URL>
            URL of Fermyon Cloud Instance [env: CLOUD_URL=] [default: https://cloud.fermyon.com/]

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

cloud-login 0.1.1
Login to Fermyon Cloud

USAGE:
    cloud login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>
            [env: AUTH_METHOD=] [possible values: github, token]

        --environment-name <environment-name>
            Save the login details under the specified name instead of making them the default. Use
            named environments with `spin deploy --environment-name <name>` [env:
            FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -k, --insecure
            Ignore server certificate errors

        --list
            List saved logins

        --status
            Display login status

        --token <TOKEN>
            Auth Token [env: SPIN_AUTH_TOKEN=]

        --url <CLOUD_SERVER_URL>
            URL of Fermyon Cloud Instance [env: CLOUD_URL=] [default: https://cloud.fermyon.com/]

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ blockEnd }}

### Variables

{{ tabs "cloud-plugin-version" }} 

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help

cloud-variables 0.1.1
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

{{ blockEnd }}

{{ blockEnd }}

### Subcommand Stability Table

CLI commands have four phases that indicate levels of stability:

- `Experimental`: These commands are experiments and may or may not be available in later versions of the CLI.
- `Stabilizing`: These commands have moved out of the `experimental` phase and we are now in the active process of stabilizing them. This includes updating flags, command output, errors, and more.
- `Stable`: These commands have moved out of the `stablizing` phase and will not change in backwards incompatible ways until the next major version release.
- `Deprecated`: Support for these commands will be removed in a future release.

{{ tabs "command-version" }}

{{ startTab "v0.1.0"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud deploy</code>                                                 | Stabilizing      |
| <code>cloud login</code>                                               | Stabilizing      |
| <code>cloud variables</code>                                                 | Stabilizing      |

{{ blockEnd }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud deploy</code>                                                 | Stabilizing      |
| <code>cloud login</code>                                               | Stabilizing      |
| <code>cloud variables</code>                                                 | Stabilizing      |

{{ blockEnd }}

{{ blockEnd }}
