title = "Spin Command Line Interface (CLI) Reference"
template = "spin_main"
date = "2022-01-01T00:00:01Z"
enable_shortcodes = true
[extra]
canonical_url = "https://spinframework.dev/v2/cli-reference"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/cli-reference.md"

---
- [spin add](#spin-add)
- [spin build](#spin-build)
- [spin cloud](#spin-cloud)
- [spin cloud deploy](#spin-cloud-deploy)
- [spin cloud login](#spin-cloud-login)
- [spin cloud variables](#spin-cloud-variables)
- [spin deploy](#spin-deploy)
- [spin doctor](#spin-doctor)
- [spin help](#spin-help)
- [spin login](#spin-login)
- [spin new](#spin-new)
- [spin plugins](#spin-plugins)
- [spin plugins install](#spin-plugins-install)
- [spin plugins list](#spin-plugins-list)
- [spin plugins uninstall](#spin-plugins-uninstall)
- [spin plugins update](#spin-plugins-update)
- [spin plugins upgrade](#spin-plugins-upgrade)
- [spin registry](#spin-registry)
- [spin registry login](#spin-registry-login)
- [spin registry pull](#spin-registry-pull)
- [spin registry push](#spin-registry-push)
- [spin templates](#spin-templates)
- [spin templates install](#spin-templates-install)
- [spin templates list](#spin-templates-list)
- [spin templates uninstall](#spin-templates-uninstall)
- [spin templates upgrade](#spin-templates-upgrade)
- [spin up](#spin-up)
  - [spin up (HTTP Trigger)](#spin-up-http-trigger)
- [spin watch](#spin-watch)
- [Stability Table](#stability-table)

This page documents the Spin Command Line Interface (CLI).

> Please note: When using the `spin --help` command you may see additional commands (followed by an asterisk symbol). These additional commands that are visible on your machine will show up depending on what plugins you have installed locally.

For information on command stability, see the [CLI stability table](#cli-stability-table).

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin add

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

{{ startTab "v1.3"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

{{ startTab "v1.4"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

{{ startTab "v1.5"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin build

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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
    -f, --from <APP_MANIFEST_FILE>    The application to build. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
    -u, --up                          Run the application after building
```

{{ blockEnd }}

{{ startTab "v1.3"}}

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
    -c, --component-id <COMPONENT_ID>...
            Component ID to build. This can be specified multiple times. The default is all
            components
    -f, --from <APP_MANIFEST_FILE>
            The application to build. This may be a manifest (spin.toml) file, or a directory
            containing a spin.toml file. If omitted, it defaults to "spin.toml" [default: spin.toml]
    -h, --help
            Print help information
    -u, --up
            Run the application after building
```

{{ blockEnd }}

{{ startTab "v1.4"}}

<!-- @selectiveCpy -->

```console
$ spin build --help

spin-build 
Build the Spin application

USAGE:
    spin build [OPTIONS] [--] [UP_ARGS]...

ARGS:
    <UP_ARGS>...    

OPTIONS:
    -c, --component-id <COMPONENT_ID>...
            Component ID to build. This can be specified multiple times. The default is all
            components

    -f, --from <APP_MANIFEST_FILE>
            The application to build. This may be a manifest (spin.toml) file, or a directory
            containing a spin.toml file. If omitted, it defaults to "spin.toml" [default: spin.toml]

    -h, --help
            Print help information

    -u, --up
            Run the application after building
```

{{ blockEnd }}

{{ startTab "v1.5"}}

<!-- @selectiveCpy -->

```console

USAGE:
    spin build [OPTIONS] [--] [UP_ARGS]...

ARGS:
    <UP_ARGS>...    

OPTIONS:
    -c, --component-id <COMPONENT_ID>...
            Component ID to build. This can be specified multiple times. The default is all
            components

    -f, --from <APP_MANIFEST_FILE>
            The application to build. This may be a manifest (spin.toml) file, or a directory
            containing a spin.toml file. If omitted, it defaults to "spin.toml" [default: spin.toml]

    -h, --help
            Print help information

    -u, --up
            Run the application after building
```

{{ blockEnd }}
{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

The `spin cloud` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference).

{{ blockEnd }}

{{ startTab "v1.4"}}

The `spin cloud` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference).

{{ blockEnd }}

{{ startTab "v1.5"}}

The `spin cloud` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference).

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud deploy

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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
```

{{ blockEnd }}

{{ startTab "v1.3"}}

The `spin cloud deploy` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-deploy).

{{ blockEnd }}

{{ startTab "v1.4"}}

The `spin cloud deploy` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-deploy).

{{ blockEnd }}

{{ startTab "v1.5"}}

The `spin cloud deploy` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-deploy).

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud login

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

The `spin cloud login` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-login).

{{ blockEnd }}

{{ startTab "v1.4"}}

The `spin cloud login` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-login).

{{ blockEnd }}

{{ startTab "v1.5"}}

The `spin cloud login` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-login).

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin cloud variables

{{ tabs "spin-version" }}

{{ startTab "v1.3"}}

The `spin cloud variables` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-variables).

{{ blockEnd }}

{{ startTab "v1.4"}}

The `spin cloud variables` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-variables).

{{ blockEnd }}

{{ startTab "v1.5"}}

The `spin cloud variables` command is implemented by the [Fermyon Cloud Plugin](/cloud/cloud-command-reference#spin-cloud-variables).

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin deploy

`spin deploy` is a shortcut to [`spin cloud deploy`](#spin-cloud-deploy).

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin doctor

{{ tabs "spin-version" }}

{{ startTab "v1.4"}}

<!-- @selectiveCpy -->

```console
$ spin doctor --help

spin-doctor 
Detect and fix problems with Spin applications

USAGE:
    spin doctor [OPTIONS]

OPTIONS:
    -f, --from <APP_MANIFEST_FILE>    The application to check. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
```

{{ blockEnd }}

{{ startTab "v1.5"}}

<!-- @selectiveCpy -->

```console
$ spin doctor --help

spin-doctor 
Detect and fix problems with Spin applications

USAGE:
    spin doctor [OPTIONS]

OPTIONS:
    -f, --from <APP_MANIFEST_FILE>    The application to check. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information                       Print help information
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin help

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

<!-- @selectiveCpy -->

```console
$ spin help      

spin 1.2.0
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
    watch        Build and run the Spin application, rebuilding and restarting it when files
                     change
```

{{ blockEnd }}

{{ startTab "v1.3"}}

<!-- @selectiveCpy -->

```console
$ spin help

spin 1.3.0 (9fb8256 2023-06-12)
The Spin CLI

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    build        Build the Spin application
    cloud        Commands for publishing applications to the Fermyon Cloud.
    deploy       Package and upload an application to the Fermyon Cloud.
    help         Print this message or the help of the given subcommand(s)
    login        Log into the Fermyon Cloud.
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    registry     Commands for working with OCI registries to distribute applications
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
    watch        Build and run the Spin application, rebuilding and restarting it when files
                     change

```

{{ blockEnd }}

{{ startTab "v1.4"}}

<!-- @selectiveCpy -->

```console
$ spin help

The Spin CLI

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    add          Scaffold a new component into an existing application
    build        Build the Spin application
    cloud*       Commands for publishing applications to the Fermyon Cloud.
    deploy       Package and upload an application to the Fermyon Cloud.
    doctor       Detect and fix problems with Spin applications
    help         Print this message or the help of the given subcommand(s)
    login        Log into the Fermyon Cloud.
    new          Scaffold a new application based on a template
    plugins      Install/uninstall Spin plugins
    registry     Commands for working with OCI registries to distribute applications
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
    watch        Build and run the Spin application, rebuilding and restarting it when files
                     change

* implemented via plugin
```

{{ blockEnd }}

{{ startTab "v1.5"}}

<!-- @selectiveCpy -->

{{ blockEnd }}

{{ blockEnd }}

> Please note: Spin `help` is a convenient way to access help using a subcommand, instead of using the `--help` option. For example, `spin help cloud` will give you the same output as `spin cloud --help`. Similarly, `spin help build` will give you the same output as `spin build --help` and so forth.

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin login

`spin login` is a shortcut to [`spin cloud login`](#spin-cloud-login).

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin new

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

{{ startTab "v1.3"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

{{ startTab "v1.4"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

{{ startTab "v1.5"}}

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
    -a, --accept-defaults              An optional argument that allows to skip prompts for the
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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin plugins

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin plugins install

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin plugins list

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin plugins uninstall

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin plugins update

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin plugins upgrade

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

**Note:** For additional information, please see the [Managing Plugins](https://spinframework.dev/managing-plugins) and/or [Creating Plugins](https://spinframework.dev/plugin-authoring) sections of the documentation.

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin registry

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

<!-- @selectiveCpy -->

```console
$ spin registry --help

spin-registry 
Commands for working with OCI registries to distribute applications

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

{{ startTab "v1.3"}}

<!-- @selectiveCpy -->

```console
$ spin registry --help

spin-registry 
Commands for working with OCI registries to distribute applications

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

{{ startTab "v1.4"}}

<!-- @selectiveCpy -->

```console
$ spin registry --help

spin-registry 
Commands for working with OCI registries to distribute applications

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

{{ startTab "v1.5"}}

<!-- @selectiveCpy -->

```console
$ spin registry --help

spin-registry 
Commands for working with OCI registries to distribute applications

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin registry login

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin registry pull

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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
    -k, --insecure    Ignore server certificate error
```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin registry push

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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
    -f, --from <APP_MANIFEST_FILE>    The application to push. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
    -k, --insecure                    Ignore server certificate errors
```

{{ blockEnd }}

{{ startTab "v1.3" }}

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
    -f, --from <APP_MANIFEST_FILE>    The application to push. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
    -k, --insecure                    Ignore server certificate errors
```

{{ blockEnd }}

{{ startTab "v1.4" }}

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
    -f, --from <APP_MANIFEST_FILE>    The application to push. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
    -k, --insecure                    Ignore server certificate errors
```

{{ blockEnd }}

{{ startTab "v1.5" }}

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
    -f, --from <APP_MANIFEST_FILE>    The application to push. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
    -k, --insecure                    Ignore server certificate errors

```

{{ blockEnd }}

{{ blockEnd }}

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin templates

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin templates install

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin templates list

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin templates uninstall

<!-- @selectiveCpy -->

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

<!-- @selectiveCpy -->

```console
$ spin templates uninstall --help

spin-templates-uninstall 
Remove a template from your installation

USAGE:
    spin templates list [OPTIONS]

OPTIONS:
    -h, --help          Print help information
        --tag <TAGS>    Filter templates matching all provided tags
        --verbose       Whether to show additional template details in the list
tpmccallum@192-168-1-16 developer % spin templates uninstall --help
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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin templates upgrade

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

{{ startTab "v1.3"}}

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

{{ startTab "v1.4"}}

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

{{ startTab "v1.5"}}

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

**Note:** For additional information, please see the [Managing Templates](https://spinframework.dev/managing-templates) and/or [Creating Templates](https://spinframework.dev/template-authoring) sections of the documentation.

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin up

The following options are available in relation to running your Spin application.

Note: There are three trigger options which only applies to the [HTTP trigger](#spin-up-http-triggers) (`--listen`, `--tls-cert` and `--tls-key`).

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

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

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the application's default store. Any existing value
            will be overwritten. Can be used multiple times

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

{{ startTab "v1.3"}}

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

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the application's default store. Any existing value
            will be overwritten. Can be used multiple times

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

{{ startTab "v1.4"}}

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

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the application's default store. Any existing value
            will be overwritten. Can be used multiple times

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

        --sqlite <SQLITE_STATEMENTS>
            Run a SQLite statement such as a migration against the default database. To run from a
            file, prefix the filename with @ e.g. spin up --sqlite @migration.sql

        --state-dir <STATE_DIR>
            Set the application state directory path. This is used in the default locations for
            logs, key value stores, etc.
            
            For local apps, this defaults to `.spin/` relative to the `spin.toml` file. For remote
            apps, this has no default (unset). Passing an empty value forces the value to be unset.
```

{{ blockEnd }}

{{ startTab "v1.5"}}

> From Spin 1.5 onwards, `spin up` will auto-create the working directory (`workdir`) specified in spin.toml if the directory specified in spin.toml does not already exist.

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

        --disable-pooling
            Enable Wasmtime's pooling instance allocator

        --follow <FOLLOW_ID>
            Print output to stdout/stderr only for given component(s)

        --key-value <KEY_VALUES>
            Set a key/value pair (key=value) in the application's default store. Any existing value
            will be overwritten. Can be used multiple times

    -L, --log-dir <APP_LOG_DIR>
            Log directory for the stdout and stderr of components

    -q, --quiet
            Silence all component output to stdout/stderr

        --runtime-config-file <RUNTIME_CONFIG_FILE>
            Configuration file for config providers and wasmtime config
            
            [env: RUNTIME_CONFIG_FILE=]

        --sqlite <SQLITE_STATEMENTS>
            Run a SQLite statement such as a migration against the default database. To run from a
            file, prefix the filename with @ e.g. spin up --sqlite @migration.sql

        --state-dir <STATE_DIR>
            Set the application state directory path. This is used in the default locations for
            logs, key value stores, etc.
            
            For local apps, this defaults to `.spin/` relative to the `spin.toml` file. For remote
            apps, this has no default (unset). Passing an empty value forces the value to be unset.
```

{{ blockEnd }}

{{ blockEnd }}

> **Please note:** If the `-f` or `--from` options do not accurately infer the intended registry or `.toml` file for your application, then you can explicitly specify either the `--from-registry` or  `--from-file` options to clarify this.

<!-- markdownlint-disable-next-line titlecase-rule -->
### spin up (HTTP Trigger)

The following additional trigger options are available for the [spin up](#spin-up) command, when using the HTTP trigger. E.g. `spin up --listen`

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

<!-- @selectiveCpy -->

```console
    --listen <ADDRESS>
        IP address and port to listen on

        [default: 127.0.0.1:3000]

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

{{ startTab "v1.1"}}

<!-- @selectiveCpy -->

```console
    --listen <ADDRESS>
        IP address and port to listen on

        [default: 127.0.0.1:3000]

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

{{ startTab "v1.2"}}

<!-- @selectiveCpy -->

```console
    --listen <ADDRESS>
        IP address and port to listen on

        [default: 127.0.0.1:3000]

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

{{ startTab "v1.3"}}

<!-- @selectiveCpy -->

```console
    --listen <ADDRESS>
        IP address and port to listen on

        [default: 127.0.0.1:3000]

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

{{ startTab "v1.4"}}

<!-- @selectiveCpy -->

```console
    --listen <ADDRESS>
        IP address and port to listen on

        [default: 127.0.0.1:3000]

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

{{ startTab "v1.5"}}

<!-- @selectiveCpy -->

```console
    --listen <ADDRESS>
        IP address and port to listen on

        [default: 127.0.0.1:3000]

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

<!-- markdownlint-disable-next-line titlecase-rule -->
## spin watch

{{ tabs "spin-version" }}

{{ startTab "v1.1"}}

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

{{ startTab "v1.2"}}

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
    -f, --from <APP_MANIFEST_FILE>    The application to watch. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
        --skip-build                  Only run the Spin application, restarting it when build
                                      artifacts change
```

{{ blockEnd }}

{{ startTab "v1.3"}}

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
    -f, --from <APP_MANIFEST_FILE>    The application to watch. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
        --skip-build                  Only run the Spin application, restarting it when build
                                      artifacts change
```

{{ blockEnd }}

{{ startTab "v1.4"}}

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
    -f, --from <APP_MANIFEST_FILE>    The application to watch. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
        --skip-build                  Only run the Spin application, restarting it when build
                                      artifacts change
```

{{ blockEnd }}

{{ startTab "v1.5"}}

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
    -f, --from <APP_MANIFEST_FILE>    The application to watch. This may be a manifest (spin.toml)
                                      file, or a directory containing a spin.toml file. If omitted,
                                      it defaults to "spin.toml" [default: spin.toml]
    -h, --help                        Print help information
        --skip-build                  Only run the Spin application, restarting it when build
                                      artifacts change
```

{{ blockEnd }}

{{ blockEnd }}

## Stability Table

CLI commands have four phases that indicate levels of stability:

- `Experimental`: These commands are experiments and may or may not be available in later versions of the CLI.
- `Stabilizing`: These commands have moved out of the `experimental` phase and we are now in the active process of stabilizing them. This includes updating flags, command output, errors, and more.
- `Stable`: These commands have moved out of the `stablizing` phase and will not change in backwards incompatible ways until the next major version release.
- `Deprecated`: Support for these commands will be removed in a future release.

{{ tabs "spin-version" }}

{{ startTab "v1.0"}}

| Command                                                    | Stability   |
| ---------------------------------------------------------- | ----------- |
| <code>spin add</code>                                      | Stable      |
| <code>spin build</code>                                    | Stable      |
| <code>spin new</code>                                      | Stable      |
| <code>spin plugins</code>                                  | Stable      |
| <code>spin templates </code>                               | Stable      |
| <code>spin up</code>                                       | Stable      |
| <code>spin cloud </code>                                   | Stabilizing |
| <code>spin registry</code>                                 | Stabilizing |
| <code>spin bindle</code>                                   | Deprecated  |

{{ blockEnd }}

{{ startTab "v1.1"}}

| Command                                                                               | Stability    |
| ------------------------------------------------------------------------------------- | ------------ |
| <code>spin add</code>                                                                 | Stable       |
| <code>spin build</code>                                                               | Stable       |
| <code>spin new</code>                                                                 | Stable       |
| <code>spin plugins</code>                                                             | Stable       |
| <code>spin templates</code>                                                           | Stable       |
| <code>spin up</code>                                                                  | Stable       |
| <code>spin cloud</code>                                                               | Stabilizing  |
| <code>spin registry</code>                                                            | Stabilizing  |
| <code>spin watch</code>                                                               | Experimental |
| <code>spin bindle</code>                                                              | Deprecated   |

{{ blockEnd }}

{{ startTab "v1.2"}}

| Command                                                                               | Stability    |
| ------------------------------------------------------------------------------------- | ------------ |
| <code>spin add</code>                                                                 | Stable       |
| <code>spin build</code>                                                               | Stable       |
| <code>spin new</code>                                                                 | Stable       |
| <code>spin plugins</code>                                                             | Stable       |
| <code>spin templates</code>                                                           | Stable       |
| <code>spin up</code>                                                                  | Stable       |
| <code>spin cloud</code>                                                               | Stabilizing  |
| <code>spin registry</code>                                                            | Stabilizing  |
| <code>spin watch</code>                                                               | Experimental |
| <code>spin bindle</code>                                                              | Deprecated   |

{{ blockEnd }}

{{ startTab "v1.3"}}

| Command                                                                               | Stability    |
| ------------------------------------------------------------------------------------- | ------------ |
| <code>spin add</code>                                                                 | Stable       |
| <code>spin build</code>                                                               | Stable       |
| <code>spin new</code>                                                                 | Stable       |
| <code>spin plugins</code>                                                             | Stable       |
| <code>spin templates</code>                                                           | Stable       |
| <code>spin up</code>                                                                  | Stable       |
| <code>spin cloud</code>                                                               | Stabilizing  |
| <code>spin registry</code>                                                            | Stabilizing  |
| <code>spin watch</code>                                                               | Experimental |
| <code>spin bindle</code>                                                              | Deprecated   |

{{ blockEnd }}

{{ startTab "v1.4"}}

| Command                                                                               | Stability    |
| ------------------------------------------------------------------------------------- | ------------ |
| <code>spin add</code>                                                                 | Stable       |
| <code>spin build</code>                                                               | Stable       |
| <code>spin new</code>                                                                 | Stable       |
| <code>spin plugins</code>                                                             | Stable       |
| <code>spin templates</code>                                                           | Stable       |
| <code>spin up</code>                                                                  | Stable       |
| <code>spin cloud</code>                                                               | Stabilizing  |
| <code>spin registry</code>                                                            | Stabilizing  |
| <code>spin doctor</code>                                                              | Experimental |
| <code>spin watch</code>                                                               | Experimental |
| <code>spin bindle</code>                                                              | Deprecated   |

{{ blockEnd }}

{{ startTab "v1.5"}}

| Command                                                                               | Stability    |
| ------------------------------------------------------------------------------------- | ------------ |
| <code>spin add</code>                                                                 | Stable       |
| <code>spin build</code>                                                               | Stable       |
| <code>spin new</code>                                                                 | Stable       |
| <code>spin plugins</code>                                                             | Stable       |
| <code>spin templates</code>                                                           | Stable       |
| <code>spin up</code>                                                                  | Stable       |
| <code>spin cloud</code>                                                               | Stabilizing  |
| <code>spin registry</code>                                                            | Stabilizing  |
| <code>spin doctor</code>                                                              | Experimental |
| <code>spin watch</code>                                                               | Experimental |
| <code>spin bindle</code>                                                              | Deprecated   |

{{ blockEnd }}

{{ blockEnd }}
