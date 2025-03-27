
title = "The aka Command Reference"
date = "2025-01-23T10:00:00.000000Z"
template = "functions_main"
enable_shortcodes = true

---
- [spin aka](#spin-aka)
- [spin aka apps](#spin-aka-apps)
- [spin aka apps delete](#spin-aka-apps-delete)
- [spin aka apps help](#spin-aka-apps-help)
- [spin aka apps info](#spin-aka-apps-info)
- [spin aka apps list](#spin-aka-apps-list)
- [spin aka deploy](#spin-aka-deploy)
- [spin aka help](#spin-aka-help)
- [spin aka init](#spin-aka-init)
- [spin aka login](#spin-aka-login)
- [spin aka logs](#spin-aka-logs)
- [spin aka send-feedback](#spin-aka-send-feedback)
---

The `spin aka` plugin enables you to interact with the Fermyon Wasm Functions platform. Use this plugin to log in, deploy, and inspect applications running on Fermyon Wasm Functions. See [install instructions](deploy#install-the-aka-plugin) for more.

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka --help

spin-aka 0.1.0 (d451558 2025-01-28)

USAGE:
    spin aka <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    apps             Manage applications deployed to Fermyon Wasm Functions on Akamai
    deploy           Package and upload an application to Fermyon Wasm Functions on Akamai
    help             Print this message or the help of the given subcommand(s)
    init             Configure an application
    login            Log into Fermyon Wasm Functions on Akamai
    logs             Get logs for an application
    send-feedback    Send Fermyon Wasm Functions preview feedback

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka apps

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka apps --help

spin-aka-apps 0.1.0 (d451558 2025-01-28)
Manage applications deployed to Fermyon Wasm Functions on Akamai

USAGE:
    spin aka apps <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    delete    Delete an app deployed in your account
    help      Print this message or the help of the given subcommand(s)
    info      Get details about an app deployed in your account
    list      List all the apps deployed in your account

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka apps delete

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka apps delete --help

spin-aka-apps-delete 0.1.0 (d451558 2025-01-28)
Delete an app deployed in your account

USAGE:
    spin aka apps delete [OPTIONS]

OPTIONS:
        --account <ACCOUNT>
            The account to perform the operation in.
            
            Defaults to the current account context.

    -f, --from <APPLICATION>
            A path to the application.
            
            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.
            
            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

    -i, --id <ID>
            ID of the app to delete.
            
            If neither `id` nor `name` is provided, the app will be inferred from the workspace
            config.

    -n, --name <NAME>
            Name of the app to delete.
            
            If neither `id` nor `name` is provided, the app will be inferred from the workspace
            config. Will error if there is not exactly one app in the account with this name.

    -V, --version
            Print version information

        --yes
            Skip the delete confirmation prompt

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka apps help

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka apps help --help


```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka apps info

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka apps info --help

spin-aka-apps-info 0.1.0 (d451558 2025-01-28)
Get details about an app deployed in your account

USAGE:
    spin aka apps info [OPTIONS]

OPTIONS:
        --account <ACCOUNT>
            The account to perform the operation in.
            
            Defaults to the current account context.

    -f, --from <APPLICATION>
            A path to the application.
            
            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.
            
            If omitted, it defaults to "./spin.toml".

        --format <FORMAT>
            Desired output format
            
            [default: plain]
            [possible values: plain, json]

    -h, --help
            Print help information

    -i, --id <ID>
            ID of the app to describe.
            
            If neither `id` nor `name` is provided, the app will be inferred from the workspace
            config.

    -n, --name <NAME>
            Name of the app to describe.
            
            If neither `id` nor `name` is provided, the app will be inferred from the workspace
            config. Will error if there is not exactly one app in the account with this name.

    -V, --version
            Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka apps list

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka apps list --help

spin-aka-apps-list 0.1.0 (d451558 2025-01-28)
List all the apps deployed in your account

USAGE:
    spin aka apps list [OPTIONS]

OPTIONS:
        --account <ACCOUNT>
            The account to perform the operation in.
            
            Defaults to the current account context.

        --format <FORMAT>
            Desired output format
            
            [default: plain]
            [possible values: plain, json]

    -h, --help
            Print help information

    -V, --version
            Print version information

        --verbose
            Show more detailed information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka deploy

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka deploy --help

spin-aka-deploy 0.1.0 (d451558 2025-01-28)
Package and upload an application to Fermyon Wasm Functions on Akamai

USAGE:
    spin aka deploy [OPTIONS]

OPTIONS:
        --account <ACCOUNT>
            The account to perform the operation in.
            
            Defaults to the current account context.

        --activate-edgeworkers <ACTIVATE_EDGEWORKERS>
            Activate EdgeWorkers on the specified networks
            
            [possible values: production, staging, both, none]

        --build
            For local apps, specifies to perform `spin build` before deploying the application.
            
            This is ignored on remote applications, as they are already built.
            
            [env: SPIN_ALWAYS_BUILD=]

        --cache-dir <CACHE_DIR>
            Cache directory for downloaded components and assets

    -f, --from <APPLICATION>
            A path to the application to deploy.
            
            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.
            
            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

    -V, --version
            Print version information

        --variable <VARIABLE>...
            A key-value pair to be passed to the application as a variable.
            
            Should be of the form `key=value`.

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka help

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka help --help


```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka init

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka init --help

spin-aka-init 0.1.0 (d451558 2025-01-28)
Configure an application

USAGE:
    spin aka init [OPTIONS]

OPTIONS:
        --account <ACCOUNT>
            The account to perform the operation in.
            
            Defaults to the current account context.

        --cache-dir <CACHE_DIR>
            Cache directory for downloaded components and assets

    -f, --from <APPLICATION>
            A path to the application to initialize.
            
            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.
            
            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

    -V, --version
            Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka login

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka login --help

spin-aka-login 0.1.0 (d451558 2025-01-28)
Log into Fermyon Wasm Functions on Akamai

USAGE:
    spin aka login

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka logs

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka logs --help

spin-aka-logs 0.1.0 (d451558 2025-01-28)
Get logs for an application

USAGE:
    spin aka logs [OPTIONS]

OPTIONS:
    -a, --app <APP>
            Name of the app to get logs for
            
            If not provided, the app will be inferred from the workspace config.

        --account <ACCOUNT>
            The account to perform the operation in.
            
            Defaults to the current account context.

    -f, --from <APPLICATION>
            A path to the application to print logs for.
            
            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.
            
            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

        --since <since>
            Only return logs since the given time. The time can be specified as an RFC3339
            timestamp, Unix epoch timestamp in seconds, or as a duration from the present. The
            duration is specified as a number followed by a unit: 's' for seconds, 'm' for minutes,
            'h' for hours, or 'd' for days (e.g. "30m" for 30 minutes ago). The default is 7 days
            
            [default: 7d]

        --tail <tail>
            Number of lines to show from the end of the logs
            
            [default: 10]

    -v, --verbose
            Verbose output

    -V, --version
            Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka send-feedback

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka send-feedback --help

spin-aka-send-feedback 0.1.0 (d451558 2025-01-28)
Send Fermyon Wasm Functions preview feedback

USAGE:
    spin aka send-feedback

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

```

{{ blockEnd }}
{{ blockEnd }}
