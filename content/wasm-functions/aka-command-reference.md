
title = "The aka Command Reference"
date = "2025-01-23T10:00:00.000000Z"
template = "functions_main"
enable_shortcodes = true

---
- [spin aka](#spin-aka)
- [spin aka app](#spin-aka-app)
- [spin aka app delete](#spin-aka-app-delete)
- [spin aka app help](#spin-aka-app-help)
- [spin aka app history](#spin-aka-app-history)
- [spin aka app link](#spin-aka-app-link)
- [spin aka app list](#spin-aka-app-list)
- [spin aka app status](#spin-aka-app-status)
- [spin aka app unlink](#spin-aka-app-unlink)
- [spin aka auth](#spin-aka-auth)
- [spin aka auth help](#spin-aka-auth-help)
- [spin aka auth token](#spin-aka-auth-token)
- [spin aka auth token create](#spin-aka-auth-token-create)
- [spin aka auth token delete](#spin-aka-auth-token-delete)
- [spin aka auth token help](#spin-aka-auth-token-help)
- [spin aka auth token list](#spin-aka-auth-token-list)
- [spin aka auth token regenerate](#spin-aka-auth-token-regenerate)
- [spin aka cron](#spin-aka-cron)
- [spin aka cron create](#spin-aka-cron-create)
- [spin aka cron delete](#spin-aka-cron-delete)
- [spin aka cron help](#spin-aka-cron-help)
- [spin aka cron list](#spin-aka-cron-list)
- [spin aka deploy](#spin-aka-deploy)
- [spin aka help](#spin-aka-help)
- [spin aka info](#spin-aka-info)
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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka --help

spin-aka 0.4.0 (d0e9cc8 2025-05-22)
Spin plugin for Fermyon Wasm Functions

USAGE:
    spin aka <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    app              Manage apps deployed to Fermyon Wasm Functions
    auth             Manage user authentication
    cron             UNSTABLE: Manage cron jobs for an app
    deploy           Deploy an app to Fermyon Wasm Functions
    help             Print this message or the help of the given subcommand(s)
    info             Print out user and workspace information
    login            Log into Fermyon Wasm Functions
    logs             Fetch the logs for an app
    send-feedback    Send us your feedback!

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka app

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app --help

spin-aka-app 0.4.0 (d0e9cc8 2025-05-22)
Manage apps deployed to Fermyon Wasm Functions

USAGE:
    spin aka app <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    cron       UNSTABLE: Manage cron jobs for an app
    delete     Delete an app
    deploy     Deploy an app to Fermyon Wasm Functions
    help       Print this message or the help of the given subcommand(s)
    history    Lists past events for an app
    link       Link your local workspace to an existing Fermyon Wasm Functions app
    list       List apps
    logs       Fetch the logs for an app
    status     Display information about an app
    unlink     Unlink your local workspace from an existing Fermyon Wasm Functions app

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka app delete

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app delete --help

spin-aka-app-delete 0.4.0 (d0e9cc8 2025-05-22)
Delete an app

USAGE:
    spin aka app delete [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

        --app-name <APP_NAME>
            Name of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

    -f, --from <PATH>
            A path to the app

            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.

            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

        --no-confirm
            Skip the delete confirmation prompt

    -V, --version
            Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka app help

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.1.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka apps help --help


```

{{ blockEnd }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app help --help


```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka app history

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app history --help
spin-aka-app-history 0.4.1 (486ad84 2025-07-04)
Lists past events for an app

USAGE:
    spin aka app history [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

        --app-name <APP_NAME>
            Name of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

    -f, --from <PATH>
            A path to the app

            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.

            If omitted, it defaults to "./spin.toml".

        --format <FORMAT>
            Desired output format

            [default: plain]
            [possible values: plain, json]

    -h, --help
            Print help information

    -V, --version
            Print version information
```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka app link

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app link --help

spin-aka-app-link 0.4.0 (d0e9cc8 2025-05-22)
Link your local workspace to an existing Fermyon Wasm Functions app

USAGE:
    spin aka app link [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app to link to.

            If neither `app-id` nor `app-name` is provided, the app will be selected from an
            interactive prompt.

        --app-name <APP_NAME>
            Name of the app to link to.

            If neither `app-id` nor `app-name` is provided, the app will be selected from an
            interactive prompt.

    -f, --from <PATH>
            A path to the workspace you want to link.

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app list --help

spin-aka-app-list 0.4.0 (d0e9cc8 2025-05-22)
List apps

USAGE:
    spin aka app list [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

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
## spin aka app status

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app status --help

spin-aka-app-status 0.4.0 (d0e9cc8 2025-05-22)
Display information about an app

USAGE:
    spin aka app status [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

        --app-name <APP_NAME>
            Name of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

    -f, --from <PATH>
            A path to the app

            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.

            If omitted, it defaults to "./spin.toml".

        --format <FORMAT>
            Desired output format

            [default: plain]
            [possible values: plain, json]

    -h, --help
            Print help information

    --usage-since <USAGE_SINCE>
        Only show app usage since the given time.

        The time can be specified as an RFC3339 timestamp, Unix epoch timestamp in seconds, or
        as a duration from the present. The duration is specified as a number followed by a
        unit: 's' for seconds, 'm' for minutes, 'h' for hours, or 'd' for days (e.g. "30m" for
        30 minutes ago). The default is 7 days. A maximum of 7 days and minimum of 5 minutes is
        enforced.

        [default: 7d]

    -V, --version
            Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka app unlink

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka app unlink --help

spin-aka-app-unlink 0.4.0 (d0e9cc8 2025-05-22)
Unlink your local workspace from an existing Fermyon Wasm Functions app

USAGE:
    spin aka app unlink [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

    -f, --from <PATH>
            A path to the workspace you want to unlink.

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
## spin aka auth

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth --help

spin-aka-auth 0.4.0 (d0e9cc8 2025-05-22)
Manage user authentication

USAGE:
    spin aka auth <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    help     Print this message or the help of the given subcommand(s)
    login    Log into Fermyon Wasm Functions
    token    Manage personal access tokens

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka auth help

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth help --help


```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka auth token

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth token --help

spin-aka-auth-token 0.4.0 (d0e9cc8 2025-05-22)
Manage personal access tokens

USAGE:
    spin aka auth token <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create        Create a new personal access token
    delete        Delete a personal access token
    help          Print this message or the help of the given subcommand(s)
    list          List personal access tokens for the current user
    regenerate    Regenerate a personal access token

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka auth token create

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth token create --help

spin-aka-auth-token-create 0.4.0 (d0e9cc8 2025-05-22)
Create a new personal access token

USAGE:
    spin aka auth token create [OPTIONS] --name <NAME>

OPTIONS:
    -d, --description <DESCRIPTION>
            Description of the token

    -e, --expiration-days <EXPIRATION_DAYS>
            How many days before the token expires [default: 30]

        --format <FORMAT>
            Desired output format [default: plain] [possible values: plain, table, json, yaml]

    -h, --help
            Print help information

    -n, --name <NAME>
            Name of the token

    -s, --short
            Show only the token, without additional information

    -V, --version
            Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka auth token delete

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth token delete --help

spin-aka-auth-token-delete 0.4.0 (d0e9cc8 2025-05-22)
Delete a personal access token

USAGE:
    spin aka auth token delete [OPTIONS] --id <ID>

OPTIONS:
    -h, --help          Print help information
    -i, --id <ID>       ID of the personal access token to delete
        --no-confirm    Skip the delete confirmation prompt
    -V, --version       Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka auth token help

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth token help --help


```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka auth token list

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth token list --help

spin-aka-auth-token-list 0.4.0 (d0e9cc8 2025-05-22)
List personal access tokens for the current user

USAGE:
    spin aka auth token list [OPTIONS]

OPTIONS:
        --format <FORMAT>    Desired output format [default: table] [possible values: plain, table,
                             json, yaml]
    -h, --help               Print help information
    -V, --version            Print version information
        --verbose            Show more detailed information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka auth token regenerate

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka auth token regenerate --help

spin-aka-auth-token-regenerate 0.4.0 (d0e9cc8 2025-05-22)
Regenerate a personal access token

USAGE:
    spin aka auth token regenerate --id <ID>

OPTIONS:
    -h, --help       Print help information
    -i, --id <ID>    ID of the personal access token to regenerate
    -V, --version    Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka cron

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka cron --help

spin-aka-cron 0.4.0 (d0e9cc8 2025-05-22)
UNSTABLE: Manage cron jobs for an app

USAGE:
    spin aka cron <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    create    Create a cron job for the current app
    delete    Delete a cron job from the current app
    help      Print this message or the help of the given subcommand(s)
    list      List cron jobs for the current app

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka cron create

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka cron create --help

spin-aka-cron-create 0.4.0 (d0e9cc8 2025-05-22)
Create a cron job for the current app

USAGE:
    spin aka cron create [OPTIONS] --schedule <SCHEDULE>

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

        --app-name <APP_NAME>
            Name of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

    -f, --from <PATH>
            A path to the app

            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.

            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

        --name <NAME>
            Optional name of the cron job

            Will default to an auto-generated name.

    -p, --path-and-query <PATH_AND_QUERY>
            The path and query of the request to make to the app

            e.g., "/api/cron?foo=bar".

    -s, --schedule <SCHEDULE>
            The cron schedule configuration

            e.g., "0 0 * * *" for every day at midnight.

    -V, --version
            Print version information

```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka cron delete

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka cron delete --help

spin-aka-cron-delete 0.4.0 (d0e9cc8 2025-05-22)
Delete a cron job from the current app

USAGE:
    spin aka cron delete [OPTIONS] <NAME>

ARGS:
    <NAME>
            The name of the cron job to delete

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

        --app-name <APP_NAME>
            Name of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

    -f, --from <PATH>
            A path to the app

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
## spin aka cron help

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka cron help --help


```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka cron list

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka cron list --help

spin-aka-cron-list 0.4.0 (d0e9cc8 2025-05-22)
List cron jobs for the current app

USAGE:
    spin aka cron list [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

        --app-name <APP_NAME>
            Name of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

    -f, --from <PATH>
            A path to the app

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka deploy --help

spin-aka-deploy 0.4.0 (d0e9cc8 2025-05-22)
Deploy an app to Fermyon Wasm Functions

USAGE:
    spin aka deploy [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app to deploy to

            If `app-id` is not provided, the app will be inferred from the workspace config. If no
            app is inferred a new app will be created.

        --build
            For local apps, specifies to perform `spin build` before deploying the app

            This is ignored on remote apps, as they are already built.

            [env: SPIN_ALWAYS_BUILD=]

        --cache-dir <CACHE_DIR>
            Cache directory for downloaded components and assets

        --create-name <NEW_APP_NAME>
            Name of the new app that will be created

            This is only valid when you are deploying to an app that does not exist yet.

    -f, --from <PATH>
            A path to the app

            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.

            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

        --no-confirm
            Skip the deploy confirmation prompt

    -V, --version
            Print version information

        --variable <KEY=VALUE | @FILE.json | @FILE.toml>...
            Variable(s) to be passed to the app

            A single key-value pair can be passed as `key=value`. Alternatively, the path to a JSON
            or TOML file may be given as `@file.json` or `@file.toml`.

            This option may be repeated. If the same key is specified multiple times the last value
            will be used.

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka help --help


```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin aka info

{{ tabs "aka-plugin-version" }}
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka info --help

spin-aka-info 0.4.0 (d0e9cc8 2025-05-22)
Print out user and workspace information

USAGE:
    spin aka info

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka login --help

spin-aka-login 0.4.0 (d0e9cc8 2025-05-22)
Log into Fermyon Wasm Functions

USAGE:
    spin aka login [OPTIONS]

OPTIONS:
    -h, --help             Print help information
        --token <TOKEN>    A personal access token to use for authentication [env:
                           SPIN_AKA_ACCESS_TOKEN=]
    -V, --version          Print version information

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka logs --help

spin-aka-logs 0.4.0 (d0e9cc8 2025-05-22)
Fetch the logs for an app

USAGE:
    spin aka logs [OPTIONS]

OPTIONS:
        --account-id <ACCOUNT_ID>
            The account to perform the operation in

            Defaults to the current account context.

        --app-id <APP_ID>
            ID of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

        --app-name <APP_NAME>
            Name of the app

            If neither `app-id` nor `app-name` is provided, the app will be inferred from the
            workspace config.

    -f, --from <PATH>
            A path to the app

            This may be a manifest (spin.toml) file or a directory containing a spin.toml file.

            If omitted, it defaults to "./spin.toml".

    -h, --help
            Print help information

        --since <since>
            Only return logs since the given time

            The time can be specified as an RFC3339 timestamp, Unix epoch timestamp in seconds, or
            as a duration from the present. The duration is specified as a number followed by a
            unit: 's' for seconds, 'm' for minutes, 'h' for hours, or 'd' for days (e.g. "30m" for
            30 minutes ago). The default is 7 days.

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
{{ startTab "v0.4.0"}}

Spin compatibility: `>=v3.0.0`

<!-- @selectiveCpy -->

```console
$ spin aka send-feedback --help

spin-aka-send-feedback 0.4.0 (d0e9cc8 2025-05-22)
Send us your feedback!

USAGE:
    spin aka send-feedback

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

```

{{ blockEnd }}
{{ blockEnd }}
