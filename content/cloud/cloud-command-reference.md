title = "Cloud Command Reference"
date = "2023-06-07T22:41:02.478752Z"
template = "cloud_main"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/cloud-command-reference.md"

---
- [Spin Cloud Command](#spin-cloud-command)
- [spin cloud](#spin-cloud)
- [spin cloud apps](#spin-cloud-apps)
- [spin cloud apps delete](#spin-cloud-apps-delete)
- [spin cloud apps info](#spin-cloud-apps-info)
- [spin cloud apps list](#spin-cloud-apps-list)
- [spin cloud deploy](#spin-cloud-deploy)
- [spin cloud help](#spin-cloud-help)
- [spin cloud link](#spin-cloud-link)
- [spin cloud link sqlite](#spin-cloud-link-sqlite)
- [spin cloud login](#spin-cloud-login)
- [spin cloud logout](#spin-cloud-logout)
- [spin cloud logs](#spin-cloud-logs)
- [spin cloud sqlite](#spin-cloud-sqlite)
- [spin cloud sqlite create](#spin-cloud-sqlite-create)
- [spin cloud sqlite delete](#spin-cloud-sqlite-delete)
- [spin cloud sqlite execute](#spin-cloud-sqlite-execute)
- [spin cloud sqlite help](#spin-cloud-sqlite-help)
- [spin cloud sqlite list](#spin-cloud-sqlite-list)
- [spin cloud sqlite rename](#spin-cloud-sqlite-rename)
- [spin cloud unlink](#spin-cloud-unlink)
- [spin cloud unlink sqlite](#spin-cloud-unlink-sqlite)
- [spin cloud variables](#spin-cloud-variables)
- [spin cloud variables delete](#spin-cloud-variables-delete)
- [spin cloud variables help](#spin-cloud-variables-help)
- [spin cloud variables list](#spin-cloud-variables-list)
- [spin cloud variables set](#spin-cloud-variables-set)
- [Subcommand Stability Table](#subcommand-stability-table)

## Spin Cloud Command

Fermyon provides a [`cloud` plugin](https://github.com/fermyon/cloud-plugin) for the [Spin CLI](./cli-reference.md) for you to manage Spin applications in Fermyon Cloud. This page documents the `spin cloud` command. Specifically, all of the available options and subcommands. For more information on subcommand stability, see the [subcommands stability table](#subcommand-stability-table). You can reproduce the Spin Cloud command documentation on your machine by using the `--help` flag. For example:

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud --help

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

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud --help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud SQLite databases
    variables    Manage Spin application variables

```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud --help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud NoOps SQL databases
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud --help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud NoOps SQL databases
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud --help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud NoOps SQL databases
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud --help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    link         Link apps to resources
    login        Login to Fermyon Cloud
    logs         Fetch logs for an app from Fermyon Cloud
    sqlite       Manage Fermyon Cloud SQLite databases
    unlink       Unlink apps from resources
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud --help
Fermyon Engineering <engineering@fermyon.com>

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    link         Link apps to resources
    login        Log into Fermyon Cloud
    logout       Log out of Fermyon Cloud
    logs         Fetch logs for an app from Fermyon Cloud
    sqlite       Manage Fermyon Cloud SQLite databases
    unlink       Unlink apps from resources
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud apps

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps --help

spin-cloud-apps 0.2.0 (df0e822 2023-09-13)
Manage applications deployed to Fermyon Cloud

USAGE:
    spin cloud apps <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete an app deployed in Fermyon Cloud
    help      Print this message or the help of the given subcommand(s)
    list      List all the apps deployed in Fermyon Cloud
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps --help

Manage applications deployed to Fermyon Cloud

USAGE:
    spin cloud apps <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete an app deployed in Fermyon Cloud
    help      Print this message or the help of the given subcommand(s)
    info      Get details about a deployed app in Fermyon Cloud
    list      List all the apps deployed in Fermyon Cloud
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps --help

Manage applications deployed to Fermyon Cloud

USAGE:
    spin cloud apps <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete an app deployed in Fermyon Cloud
    help      Print this message or the help of the given subcommand(s)
    info      Get details about a deployed app in Fermyon Cloud
    list      List all the apps deployed in Fermyon Cloud
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps --help

Manage applications deployed to Fermyon Cloud

USAGE:
    spin cloud apps <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete an app deployed in Fermyon Cloud
    help      Print this message or the help of the given subcommand(s)
    info      Get details about a deployed app in Fermyon Cloud
    list      List all the apps deployed in Fermyon Cloud
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps --help
Manage applications deployed to Fermyon Cloud

USAGE:
    spin cloud apps <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete an app deployed in Fermyon Cloud
    help      Print this message or the help of the given subcommand(s)
    info      Get details about a deployed app in Fermyon Cloud
    list      List all the apps deployed in Fermyon Cloud
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud apps delete

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps delete --help

spin-cloud-apps-delete 0.2.0 (df0e822 2023-09-13)
Delete an app deployed in Fermyon Cloud

USAGE:
    spin cloud apps delete [OPTIONS] <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps delete --help

Delete an app deployed in Fermyon Cloud

USAGE:
    spin cloud apps delete [OPTIONS] <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps delete --help

Delete an app deployed in Fermyon Cloud

USAGE:
    spin cloud apps delete [OPTIONS] <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps delete --help

Delete an app deployed in Fermyon Cloud

USAGE:
    spin cloud apps delete [OPTIONS] <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps delete --help
Delete an app deployed in Fermyon Cloud

USAGE:
    spin cloud apps delete <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud apps info

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps info --help
Get details about a deployed app in Fermyon Cloud

USAGE:
    spin cloud apps info [OPTIONS] <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps info --help
Get details about a deployed app in Fermyon Cloud

USAGE:
    spin cloud apps info [OPTIONS] <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps info --help
Get details about a deployed app in Fermyon Cloud

USAGE:
    spin cloud apps info [OPTIONS] <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps info --help
Get details about a deployed app in Fermyon Cloud

USAGE:
    spin cloud apps info <APP>

ARGS:
    <APP>    Name of Spin app

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud apps list

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps list --help

List all the apps deployed in Fermyon Cloud

USAGE:
    spin cloud apps list [OPTIONS]

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps list --help

List all the apps deployed in Fermyon Cloud

USAGE:
    spin cloud apps list [OPTIONS]

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps list --help

List all the apps deployed in Fermyon Cloud

USAGE:
    spin cloud apps list [OPTIONS]

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps list --help

List all the apps deployed in Fermyon Cloud

USAGE:
    spin cloud apps list [OPTIONS]

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud apps list --help
List all the apps deployed in Fermyon Cloud

USAGE:
    spin cloud apps list

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud deploy

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

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

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

Package and upload an application to the Fermyon Cloud

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
            Set a variable (variable=value) in the deployed application. Any existing value will be
            overwritten. Can be used multiple times
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

Package and upload an application to the Fermyon Cloud

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
            Set a variable (variable=value) in the deployed application. Any existing value will be
            overwritten. Can be used multiple times
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

Package and upload an application to the Fermyon Cloud

USAGE:
    spin cloud deploy [OPTIONS]

OPTIONS:
        --build
            Specifies to perform `spin build` before deploying the application [env:
            SPIN_ALWAYS_BUILD=]

        --buildinfo <BUILDINFO>
            Build metadata to append to the oci tag

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
            Set a variable (variable=value) in the deployed application. Any existing value will be
            overwritten. Can be used multiple times
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

Package and upload an application to the Fermyon Cloud

USAGE:
    spin cloud deploy [OPTIONS]

OPTIONS:
        --build
            For local apps, specifies to perform `spin build` before deploying the application [env:
            SPIN_ALWAYS_BUILD=]

        --buildinfo <BUILDINFO>
            Build metadata to append to the oci tag

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -f, --from <APPLICATION>
            The application to deploy. This may be a manifest (spin.toml) file, a directory
            containing a spin.toml file, or a remote registry reference. If omitted, it defaults to
            "spin.toml"

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
            Set a variable (variable=value) in the deployed application. Any existing value will be
            overwritten. Can be used multiple times
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help

Package and upload an application to the Fermyon Cloud

USAGE:
    spin cloud deploy [OPTIONS]

OPTIONS:
        --build
            For local apps, specifies to perform `spin build` before deploying the application.

            This is ignored on remote applications, as they are already built.

            [env: SPIN_ALWAYS_BUILD=]

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance

            [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -f, --from <APPLICATION>
            The application to deploy. This may be a manifest (spin.toml) file, a directory
            containing a spin.toml file, or a remote registry reference. If omitted, it defaults to
            "spin.toml"

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the deployed application's default store. Any
            existing value will be overwritten. Can be used multiple times

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness

            [default: 60]

    -V, --version
            Print version information

        --variable <VARIABLES>
            Set a variable (variable=value) in the deployed application. Any existing value will be
            overwritten. Can be used multiple times
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud deploy --help
Package and upload an application to the Fermyon Cloud

USAGE:
    spin cloud deploy [OPTIONS]

OPTIONS:
        --build
            For local apps, specifies to perform `spin build` before deploying the application.

            This is ignored on remote applications, as they are already built.

            [env: SPIN_ALWAYS_BUILD=]

    -f, --from <APPLICATION>
            The application to deploy. This may be a manifest (spin.toml) file, a directory
            containing a spin.toml file, or a remote registry reference. If omitted, it defaults to
            "spin.toml"

    -h, --help
            Print help information

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the deployed application's default store. Any
            existing value will be overwritten. Can be used multiple times

        --link <LINKS>
            Specifies how application labels (such as SQLite databases) should be linked if they are
            not already linked. This is intended for non-interactive environments such as release
            pipelines; therefore, if any links are specified, all links must be specified.

            Links must be of the form 'sqlite:label=database'. Databases that do not exist will be
            created.

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness

            [default: 60]

    -V, --version
            Print version information

        --variable <VARIABLES>
            Set a variable (variable=value) in the deployed application. Any existing value will be
            overwritten. Can be used multiple times
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud help

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

<!-- @selectiveCpy -->
```console
$ spin cloud help

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

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud SQLite databases
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud NoOps SQL databases
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud NoOps SQL databases
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    link         Link apps to resources
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud NoOps SQL databases
    unlink       Unlink apps from resources
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud help

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    link         Link apps to resources
    login        Login to Fermyon Cloud
    logs         Fetch logs for an app from Fermyon Cloud
    sqlite       Manage Fermyon Cloud SQLite databases
    unlink       Unlink apps from resources
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud help
Fermyon Engineering <engineering@fermyon.com>

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    link         Link apps to resources
    login        Log into Fermyon Cloud
    logout       Log out of Fermyon Cloud
    logs         Fetch logs for an app from Fermyon Cloud
    sqlite       Manage Fermyon Cloud SQLite databases
    unlink       Unlink apps from resources
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud link

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud link --help
Link apps to resources

USAGE:
    spin cloud <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps         Manage applications deployed to Fermyon Cloud
    deploy       Package and upload an application to the Fermyon Cloud
    help         Print this message or the help of the given subcommand(s)
    link         Link apps to resources
    login        Login to Fermyon Cloud
    sqlite       Manage Fermyon Cloud NoOps SQL databases
    unlink       Unlink apps from resources
    variables    Manage Spin application variables
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud link --help
Link apps to resources

USAGE:
    spin cloud link <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    help      Print this message or the help of the given subcommand(s)
    sqlite    Link an app to a SQLite database
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud link --help
Link apps to resources

USAGE:
    spin cloud link <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    help      Print this message or the help of the given subcommand(s)
    sqlite    Link an app to a SQLite database
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud link sqlite

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud link sqlite --help
Link an app to a NoOps SQL database

USAGE:
    spin cloud link sqlite [OPTIONS] --app <APP> --database <DATABASE> <LABEL>

ARGS:
    <LABEL>    The name by which the application will refer to the database

OPTIONS:
    -a, --app <APP>
            The app that will be using the database

    -d, --database <DATABASE>
            The database that the app will refer to by the label

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud link sqlite --help
Link an app to a SQLite database

USAGE:
    spin cloud link sqlite [OPTIONS] --app <APP> --database <DATABASE> <LABEL>

ARGS:
    <LABEL>    The name by which the application will refer to the database

OPTIONS:
    -a, --app <APP>
            The app that will be using the database

    -d, --database <DATABASE>
            The database that the app will refer to by the label

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud link sqlite --help
Link an app to a SQLite database

USAGE:
    spin cloud link sqlite --app <APP> --database <DATABASE> <LABEL>

ARGS:
    <LABEL>    The name by which the application will refer to the database

OPTIONS:
    -a, --app <APP>              The app that will be using the database
    -d, --database <DATABASE>    The database that the app will refer to by the label
    -h, --help                   Print help information
    -V, --version                Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud login

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

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

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

USAGE:
    spin cloud login [OPTIONS]

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

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

USAGE:
    spin cloud login [OPTIONS]

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

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

USAGE:
    spin cloud login [OPTIONS]

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

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

USAGE:
    spin cloud login [OPTIONS]

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

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help

USAGE:
    spin cloud login [OPTIONS]

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

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud login --help
Log into Fermyon Cloud

USAGE:
    spin cloud login [OPTIONS]

OPTIONS:
        --auth-method <auth-method>    [env: AUTH_METHOD=] [possible values: github, token]
    -h, --help                         Print help information
    -k, --insecure                     Ignore server certificate errors
        --list                         List saved logins
        --status                       Display login status
        --token <TOKEN>                Auth Token [env: SPIN_AUTH_TOKEN=]
        --url <CLOUD_SERVER_URL>       URL of Fermyon Cloud Instance [env: CLOUD_URL=] [default:
                                       https://cloud.fermyon.com/]
    -V, --version                      Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud logout

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud logout --help
Log out of Fermyon Cloud

USAGE:
    spin cloud logout

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud logs

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud logs --help

Logs fetches app logs from Fermyon Cloud

USAGE:
    spin cloud logs [OPTIONS] <APP>

ARGS:
    <APP>    App name

OPTIONS:
        --environment-name <environment-name>
            Use the Fermyon instance saved under the specified name. If omitted, Spin looks for app
            in default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

        --follow
            Follow logs output

    -h, --help
            Print help information

        --interval <interval>
            Interval in seconds to refresh logs from cloud [default: 2]

        --show-timestamps <show-timestamps>
            Show timestamps [default: true] [possible values: true, false]

        --since <since>
            Only return logs newer than a relative duration. The duration format is a number and a
            unit, where the unit is 's' for seconds, 'm' for minutes, 'h' for hours or 'd' for days
            (e.g. "30m" for 30 minutes ago).  The default it 7 days [default: 7d]

        --tail <tail>
            Number of lines to show from the end of the logs [default: 10]

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud logs --help
Fetch logs for an app from Fermyon Cloud

USAGE:
    spin cloud logs [OPTIONS] <APP>

ARGS:
    <APP>    App name

OPTIONS:
        --follow
            Follow logs output

    -h, --help
            Print help information

        --interval <interval>
            Interval in seconds to refresh logs from cloud [default: 2]

        --show-timestamps <show-timestamps>
            Show timestamps [default: true] [possible values: true, false]

        --since <since>
            Only return logs newer than a relative duration. The duration format is a number and a
            unit, where the unit is 's' for seconds, 'm' for minutes, 'h' for hours or 'd' for days
            (e.g. "30m" for 30 minutes ago).  The default it 7 days [default: 7d]

        --tail <tail>
            Number of lines to show from the end of the logs [default: 10]

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud sqlite

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite --help

Manage Fermyon Cloud SQLite databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete     Delete a SQLite database
    execute    Execute SQL against a SQLite database
    help       Print this message or the help of the given subcommand(s)
    list       List all SQLite databases of a user
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite --help

Manage Fermyon Cloud SQLite databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete     Delete a NoOps SQL database
    execute    Execute SQLite statements against a NoOps SQL database
    help       Print this message or the help of the given subcommand(s)
    list       List all NoOps SQL databases of a user
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}
Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite --help

Manage Fermyon Cloud NoOps SQL databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete     Delete a NoOps SQL database
    execute    Execute SQLite statements against a NoOps SQL database
    help       Print this message or the help of the given subcommand(s)
    list       List all NoOps SQL databases of a user
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite --help

Manage Fermyon Cloud NoOps SQL databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create     Create a NoOps SQL database
    delete     Delete a NoOps SQL database
    execute    Execute SQLite statements against a NoOps SQL database
    help       Print this message or the help of the given subcommand(s)
    list       List all NoOps SQL databases of a user
    rename     Rename a NoOps SQL database
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite --help

Manage Fermyon Cloud NoOps SQL databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create     Create a SQLite database
    delete     Delete a SQLite database
    execute    Execute SQL statements against a SQLite database
    help       Print this message or the help of the given subcommand(s)
    list       List all your SQLite databases
    rename     Rename a SQLite database
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite --help
Manage Fermyon Cloud SQLite databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create     Create a SQLite database
    delete     Delete a SQLite database
    execute    Execute SQL statements against a SQLite database
    help       Print this message or the help of the given subcommand(s)
    list       List all your SQLite databases
    rename     Rename a SQLite database
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud sqlite create

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite create --help

Create a NoOps SQL database

USAGE:
    spin cloud sqlite create [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to create

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite create --help

Create a SQLite database

USAGE:
    spin cloud sqlite create [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to create

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite create --help
Create a SQLite database

USAGE:
    spin cloud sqlite create <NAME>

ARGS:
    <NAME>    Name of database to create

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud sqlite delete

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite delete --help

Delete a SQLite database

USAGE:
    spin cloud sqlite delete [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to delete

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information

    -y, --yes
            Skips prompt to confirm deletion of database
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite delete --help

Delete a SQLite database

USAGE:
    spin cloud sqlite delete [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to delete

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information

    -y, --yes
            Skips prompt to confirm deletion of database
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite delete --help

Delete a NoOps SQL database

USAGE:
    spin cloud sqlite delete [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to delete

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information

    -y, --yes
            Skips prompt to confirm deletion of database
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite delete --help

Delete a NoOps SQL database

USAGE:
    spin cloud sqlite delete [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to delete

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information

    -y, --yes
            Skips prompt to confirm deletion of database
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite delete --help

Delete a SQLite database

USAGE:
    spin cloud sqlite delete [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to delete

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information

    -y, --yes
            Skips prompt to confirm deletion of database
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite delete --help
Delete a SQLite database

USAGE:
    spin cloud sqlite delete [OPTIONS] <NAME>

ARGS:
    <NAME>    Name of database to delete

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information
    -y, --yes        Skips prompt to confirm deletion of database
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud sqlite execute

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite execute --help

Execute SQL against a SQLite database

USAGE:
    spin cloud sqlite execute [OPTIONS] <NAME> <STATEMENT>

ARGS:
    <NAME>         Name of database to execute against
    <STATEMENT>    Statement to execute

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite execute --help

Execute SQL against a SQLite database

USAGE:
    spin cloud sqlite execute [OPTIONS] <NAME> <STATEMENT>

ARGS:
    <NAME>         Name of database to execute against
    <STATEMENT>    Statement to execute

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite execute --help

Execute SQLite statements against a NoOps SQL database

USAGE:
    spin cloud sqlite execute [OPTIONS] <NAME> <STATEMENT>

ARGS:
    <NAME>         Name of database to execute against
    <STATEMENT>    Statement to execute

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite execute --help

Execute SQLite statements against a NoOps SQL database

USAGE:
    spin cloud sqlite execute [OPTIONS] <NAME> <STATEMENT>

ARGS:
    <NAME>         Name of database to execute against
    <STATEMENT>    Statement to execute

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite execute --help

Execute SQL statements against a SQLite database

USAGE:
    spin cloud sqlite execute [OPTIONS] <STATEMENT>

ARGS:
    <STATEMENT>    Statement to execute

OPTIONS:
    -a, --app <APP>
            App to which label relates

    -d, --database <DATABASE>
            Name of database to execute against

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -l, --label <LABEL>
            Label of database to execute against

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite execute --help
Execute SQL statements against a SQLite database

USAGE:
    spin cloud sqlite execute [OPTIONS] <STATEMENT>

ARGS:
    <STATEMENT>    Statement to execute

OPTIONS:
    -a, --app <APP>              App to which label relates
    -d, --database <DATABASE>    Name of database to execute against
    -h, --help                   Print help information
    -l, --label <LABEL>          Label of database to execute against
    -V, --version                Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud sqlite help

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite help

Manage Fermyon Cloud SQLite databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete     Delete a SQLite database
    execute    Execute SQL against a SQLite database
    help       Print this message or the help of the given subcommand(s)
    list       List all SQLite databases of a user
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite help

Manage Fermyon Cloud SQLite databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete     Delete a NoOps SQL database
    execute    Execute SQLite statements against a NoOps SQL database
    help       Print this message or the help of the given subcommand(s)
    list       List all NoOps SQL databases of a user
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite help

Manage Fermyon Cloud NoOps SQL databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete     Delete a NoOps SQL database
    execute    Execute SQLite statements against a NoOps SQL database
    help       Print this message or the help of the given subcommand(s)
    list       List all NoOps SQL databases of a user
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite help

Manage Fermyon Cloud NoOps SQL databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create     Create a NoOps SQL database
    delete     Delete a NoOps SQL database
    execute    Execute SQLite statements against a NoOps SQL database
    help       Print this message or the help of the given subcommand(s)
    list       List all NoOps SQL databases of a user
    rename     Rename a NoOps SQL database
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite help

Manage Fermyon Cloud SQLite databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create     Create a SQLite database
    delete     Delete a SQLite database
    execute    Execute SQL statements against a SQLite database
    help       Print this message or the help of the given subcommand(s)
    list       List all your SQLite databases
    rename     Rename a SQLite database
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite help
Manage Fermyon Cloud SQLite databases

USAGE:
    spin cloud sqlite <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create     Create a SQLite database
    delete     Delete a SQLite database
    execute    Execute SQL statements against a SQLite database
    help       Print this message or the help of the given subcommand(s)
    list       List all your SQLite databases
    rename     Rename a SQLite database
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud sqlite list

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite list --help

List all SQLite databases of a user

USAGE:
    spin cloud sqlite list [OPTIONS]

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite list --help

List all SQLite databases of a user

USAGE:
    spin cloud sqlite list [OPTIONS]

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite list --help

List all NoOps SQL databases of a user

USAGE:
    spin cloud sqlite list [OPTIONS]

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite list --help

List all NoOps SQL databases of a user

USAGE:
    spin cloud sqlite list [OPTIONS]

OPTIONS:
    -a, --app <APP>
            Filter list by an app

    -d, --database <DATABASE>
            Filter list by a database

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

        --format <FORMAT>
            Format of list [default: table] [possible values: table, json]

    -g, --group-by <GROUP_BY>
            Grouping strategy of tabular list [default: app] [possible values: app, database]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite list --help
List all your SQLite databases

USAGE:
    spin cloud sqlite list [OPTIONS]

OPTIONS:
    -a, --app <APP>
            Filter list by an app

    -d, --database <DATABASE>
            Filter list by a database

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

        --format <FORMAT>
            Format of list [default: table] [possible values: table, json]

    -g, --group-by <GROUP_BY>
            Grouping strategy of tabular list [default: app] [possible values: app, database]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite list --help
List all your SQLite databases

USAGE:
    spin cloud sqlite list [OPTIONS]

OPTIONS:
    -a, --app <APP>              Filter list by an app
    -d, --database <DATABASE>    Filter list by a database
        --format <FORMAT>        Format of list [default: table] [possible values: table, json]
    -g, --group-by <GROUP_BY>    Grouping strategy of tabular list [default: app] [possible values:
                                 app, database]
    -h, --help                   Print help information
    -V, --version                Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud sqlite rename

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite rename --help

Rename a NoOps SQL database

USAGE:
    spin cloud sqlite rename [OPTIONS] <NAME> <NEW_NAME>

ARGS:
    <NAME>        Current name of database to rename
    <NEW_NAME>    New name for the database

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite rename --help

Rename a SQLite database

USAGE:
    spin cloud sqlite rename [OPTIONS] <NAME> <NEW_NAME>

ARGS:
    <NAME>        Current name of database to rename
    <NEW_NAME>    New name for the database

OPTIONS:
        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud sqlite rename --help
Rename a SQLite database

USAGE:
    spin cloud sqlite rename <NAME> <NEW_NAME>

ARGS:
    <NAME>        Current name of database to rename
    <NEW_NAME>    New name for the database

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud unlink

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud unlink --help
Unlink apps from resources

USAGE:
    spin cloud unlink <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    help      Print this message or the help of the given subcommand(s)
    sqlite    Unlink an app from a NoOps SQL database
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud unlink --help
Unlink apps from resources

USAGE:
    spin cloud unlink <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    help      Print this message or the help of the given subcommand(s)
    sqlite    Unlink an app from a SQLite database
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud unlink --help
Unlink apps from resources

USAGE:
    spin cloud unlink <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    help      Print this message or the help of the given subcommand(s)
    sqlite    Unlink an app from a SQLite database
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud unlink sqlite

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud unlink sqlite --help
Unlink an app from a NoOps SQL database

USAGE:
    spin cloud unlink sqlite [OPTIONS] --app <APP> <LABEL>

ARGS:
    <LABEL>    The name by which the application refers to the database

OPTIONS:
    -a, --app <APP>
            The app that will be using the database

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud unlink sqlite --help
Unlink an app from a SQLite database

USAGE:
    spin cloud unlink sqlite [OPTIONS] --app <APP> <LABEL>

ARGS:
    <LABEL>    The name by which the application refers to the database

OPTIONS:
    -a, --app <APP>
            The app that will be using the database

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud unlink sqlite --help
Unlink an app from a SQLite database

USAGE:
    spin cloud unlink sqlite --app <APP> <LABEL>

ARGS:
    <LABEL>    The name by which the application refers to the database

OPTIONS:
    -a, --app <APP>    The app that will be using the database
    -h, --help         Print help information
    -V, --version      Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud variables

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help

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

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables --help
Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud variables delete

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables delete --help

Delete variables

USAGE:
    cloud variables delete [OPTIONS] --app <app> [VARIABLES_TO_DELETE]...

ARGS:
    <VARIABLES_TO_DELETE>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables delete --help

Delete variables

USAGE:
    spin cloud variables delete [OPTIONS] --app <app> [VARIABLES_TO_DELETE]...

ARGS:
    <VARIABLES_TO_DELETE>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables delete --help

Delete variables

USAGE:
    spin cloud variables delete [OPTIONS] --app <app> [VARIABLES_TO_DELETE]...

ARGS:
    <VARIABLES_TO_DELETE>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables delete --help

Delete variables

USAGE:
    spin cloud variables delete [OPTIONS] --app <app> [VARIABLES_TO_DELETE]...

ARGS:
    <VARIABLES_TO_DELETE>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables delete --help

Delete variables

USAGE:
    spin cloud variables delete [OPTIONS] --app <app> [VARIABLES_TO_DELETE]...

ARGS:
    <VARIABLES_TO_DELETE>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables delete --help

Delete variables

USAGE:
    spin cloud variables delete [OPTIONS] --app <app> [VARIABLES_TO_DELETE]...

ARGS:
    <VARIABLES_TO_DELETE>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables delete --help
Delete variables

USAGE:
    spin cloud variables delete --app <app> [VARIABLES_TO_DELETE]...

ARGS:
    <VARIABLES_TO_DELETE>...    Variable pair to set

OPTIONS:
        --app <app>    Name of Spin app
    -h, --help         Print help information
    -V, --version      Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud variables help

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables help

Manage Spin application variables

USAGE:
    cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables help

Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables help
Manage Spin application variables

USAGE:
    spin cloud variables <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete variables
    help      Print this message or the help of the given subcommand(s)
    list      List all variables of an application
    set       Set variables
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud variables list

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --help

List all variables of an application

USAGE:
    cloud variables list [OPTIONS] --app <app>

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --help

List all variables of an application

USAGE:
    spin cloud variables list [OPTIONS] --app <app>

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --help

List all variables of an application

USAGE:
    spin cloud variables list [OPTIONS] --app <app>

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --help

List all variables of an application

USAGE:
    spin cloud variables list [OPTIONS] --app <app>

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --help

List all variables of an application

USAGE:
    spin cloud variables list [OPTIONS] --app <app>

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --help

List all variables of an application

USAGE:
    spin cloud variables list [OPTIONS] --app <app>

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables list --help
List all variables of an application

USAGE:
    spin cloud variables list --app <app>

OPTIONS:
        --app <app>    Name of Spin app
    -h, --help         Print help information
    -V, --version      Print version information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud variables set

{{ tabs "cloud-plugin-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables set --help

Set variables

USAGE:
    cloud variables set [OPTIONS] --app <app> [VARIABLES_TO_SET]...

ARGS:
    <VARIABLES_TO_SET>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables set --help

Set variables

USAGE:
    spin cloud variables set [OPTIONS] --app <app> [VARIABLES_TO_SET]...

ARGS:
    <VARIABLES_TO_SET>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables set --help

Set variables

USAGE:
    spin cloud variables set [OPTIONS] --app <app> [VARIABLES_TO_SET]...

ARGS:
    <VARIABLES_TO_SET>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables set --help

Set variables

USAGE:
    spin cloud variables set [OPTIONS] --app <app> [VARIABLES_TO_SET]...

ARGS:
    <VARIABLES_TO_SET>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables set --help

Set variables

USAGE:
    spin cloud variables set [OPTIONS] --app <app> [VARIABLES_TO_SET]...

ARGS:
    <VARIABLES_TO_SET>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables set --help

Set variables

USAGE:
    spin cloud variables set [OPTIONS] --app <app> [VARIABLES_TO_SET]...

ARGS:
    <VARIABLES_TO_SET>...    Variable pair to set

OPTIONS:
        --app <app>
            Name of Spin app

        --environment-name <environment-name>
            Deploy to the Fermyon instance saved under the specified name. If omitted, Spin deploys
            to the default unnamed instance [env: FERMYON_DEPLOYMENT_ENVIRONMENT=]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

<!-- @selectiveCpy -->
```console
$ spin cloud variables set --help
Set variables

USAGE:
    spin cloud variables set --app <app> [VARIABLES_TO_SET]...

ARGS:
    <VARIABLES_TO_SET>...    Variable pair to set

OPTIONS:
        --app <app>    Name of Spin app
    -h, --help         Print help information
    -V, --version      Print version information
```

{{ blockEnd }}

{{ blockEnd }}

## Subcommand Stability Table

CLI commands have four phases that indicate levels of stability:

- `Experimental`: These commands are experiments and may or may not be available in later versions of the CLI.
- `Stabilizing`: These commands have moved out of the `experimental` phase and we are now in the active process of stabilizing them. This includes updating flags, command output, errors, and more.
- `Stable`: These commands have moved out of the `stablizing` phase and will not change in backwards incompatible ways until the next major version release.
- `Deprecated`: Support for these commands will be removed in a future release.

{{ tabs "command-version" }}

{{ startTab "v0.1.1"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud deploy</code>                                  | Stabilizing |
| <code>cloud login</code>                                   | Stabilizing |
| <code>cloud variables</code>                               | Stabilizing |

{{ blockEnd }}

{{ startTab "v0.1.2"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud deploy</code>                                  | Stabilizing |
| <code>cloud login</code>                                   | Stabilizing |
| <code>cloud sqlite</code>                                  | Stabilizing |
| <code>cloud variables</code>                               | Stabilizing |

{{ blockEnd }}

{{ startTab "v0.2.0"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud apps</code>                                    | Stabilizing |
| <code>cloud deploy</code>                                  | Stabilizing |
| <code>cloud login</code>                                   | Stabilizing |
| <code>cloud sqlite</code>                                  | Stabilizing |
| <code>cloud variables</code>                               | Stabilizing |

{{ blockEnd }}

{{ startTab "v0.3.0"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud apps</code>                                    | Stabilizing |
| <code>cloud deploy</code>                                  | Stabilizing |
| <code>cloud login</code>                                   | Stabilizing |
| <code>cloud sqlite</code>                                  | Stabilizing |
| <code>cloud variables</code>                               | Stabilizing |

{{ blockEnd }}

{{ startTab "v0.4.0"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud apps</code>                                    | Stabilizing |
| <code>cloud deploy</code>                                  | Stabilizing |
| <code>cloud link</code>                                    | Stabilizing |
| <code>cloud login</code>                                   | Stabilizing |
| <code>cloud sqlite</code>                                  | Stabilizing |
| <code>cloud unlink</code>                                  | Stabilizing |
| <code>cloud variables</code>                               | Stabilizing |

{{ blockEnd }}

{{ startTab "v0.5.0"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud apps</code>                                    | Stabilizing |
| <code>cloud deploy</code>                                  | Stabilizing |
| <code>cloud link</code>                                    | Stabilizing |
| <code>cloud login</code>                                   | Stabilizing |
| <code>cloud logs</code>                                    | Stabilizing |
| <code>cloud sqlite</code>                                  | Stabilizing |
| <code>cloud unlink</code>                                  | Stabilizing |
| <code>cloud variables</code>                               | Stabilizing |

{{ blockEnd }}

{{ startTab "v0.6.0"}}

Spin compatibility: `>= v1.3`

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>cloud apps</code>                                    | Stabilizing |
| <code>cloud deploy</code>                                  | Stabilizing |
| <code>cloud link</code>                                    | Stabilizing |
| <code>cloud login</code>                                   | Stabilizing |
| <code>cloud logout</code>                                  | Stabilizing |
| <code>cloud logs</code>                                    | Stabilizing |
| <code>cloud sqlite</code>                                  | Stabilizing |
| <code>cloud unlink</code>                                  | Stabilizing |
| <code>cloud variables</code>                               | Stabilizing |

{{ blockEnd }}

{{ blockEnd }}
