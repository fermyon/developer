title = "Spin Command Line Interface (CLI) Reference"
template = "cloud_main"
date = "2022-01-01T00:00:01Z"
[extra]

---

This page documents the Spin Command Line Interface (CLI). Specifically, all of the available Spin Options and Subcommands. You can reproduce this documentation on your machine by using the `--help` For example:

```
$ spin --help

USAGE:
    spin <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    bindle       Commands for publishing applications as bindles
    build        Build the Spin application
    deploy       Deploy a Spin application
    help         Print this message or the help of the given subcommand(s)
    new          Scaffold a new application or component based on a template
    plugin       Install/uninstall Spin plugins
    templates    Commands for working with WebAssembly component templates
    up           Start the Spin application
```

### Bindle

Adding a subcommand (and again issuing the `--help` command) will provide information specific to that particular subcommand. For example:

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

#### Prepare

Again, adding another related subcommand provides even more specific information. For example:

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

#### Push

```
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

```
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

```
USAGE:
    spin deploy [OPTIONS] --bindle-server <BINDLE_SERVER_URL> --hippo-server <HIPPO_SERVER_URL> --hippo-username <HIPPO_USERNAME> --hippo-password <HIPPO_PASSWORD>

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
            Path to assemble the bindle before pushing (defaults to a temporary directory)

    -e, --deploy-existing-bindle
            Deploy existing bindle if it already exists on bindle server

    -f, --file <APP_CONFIG_FILE>
            Path to spin.toml [default: spin.toml]

    -h, --help
            Print help information

        --hippo-password <HIPPO_PASSWORD>
            Hippo password [env: HIPPO_PASSWORD=]

        --hippo-server <HIPPO_SERVER_URL>
            URL of hippo server [env: HIPPO_URL=]

        --hippo-username <HIPPO_USERNAME>
            Hippo username [env: HIPPO_USERNAME=]

    -k, --insecure
            Ignore server certificate errors from bindle and hippo

        --no-buildinfo
            Disable attaching buildinfo [env: SPIN_DEPLOY_NO_BUILDINFO=]

        --readiness-timeout <READINESS_TIMEOUT_SECS>
            How long in seconds to wait for a deployed HTTP application to become ready. The default
            is 60 seconds. Set it to 0 to skip waiting for readiness [default: 60]
```

### New

```
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
                                       specified in the file
```

### Plugin

```
USAGE:
    spin plugin <SUBCOMMAND>

OPTIONS:
    -h, --help    Print help information

SUBCOMMANDS:
    help         Print this message or the help of the given subcommand(s)
    install      Install plugin from a manifest
    uninstall    Remove a plugin from your installation
    update       Fetch the latest Spin plugins from the spin-plugins repository
    upgrade      Upgrade one or all plugins
```

#### Install

```
USAGE:
    spin plugin install [OPTIONS] [PLUGIN_NAME]

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

#### Uninstall

```
USAGE:
    spin plugin uninstall <NAME>

ARGS:
    <NAME>    Name of Spin plugin

OPTIONS:
    -h, --help    Print help information
```

#### Update

```
USAGE:
    spin plugin uninstall <NAME>

ARGS:
    <NAME>    Name of Spin plugin

OPTIONS:
    -h, --help    Print help information
tpmccallum@Tims-MacBook-Pro-3 spin % spin plugin update --help   
spin-plugin-update 
Fetch the latest Spin plugins from the spin-plugins repository

USAGE:
    spin plugin update

OPTIONS:
    -h, --help    Print help information
```

#### Upgrade

```
USAGE:
    spin plugin upgrade [OPTIONS] [PLUGIN_NAME]

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

```
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
    
#### Install

```
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

#### List

```
USAGE:
    spin templates list

OPTIONS:
    -h, --help    Print help information
```

#### Uninstall

```
USAGE:
    spin templates uninstall <TEMPLATE_ID>

ARGS:
    <TEMPLATE_ID>    The template to uninstall

OPTIONS:
    -h, --help    Print help information
```