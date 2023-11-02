title = "Creating Spin Plugins"
template = "spin_main"
date = "2023-11-03T01:00:00Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/plugin-authoring.md"

---
- [What Are Spin Plugins?](#what-are-spin-plugins)
- [How to Find and Use a Spin Plugin](#how-to-find-and-use-a-spin-plugin)
- [Authoring a Spin Plugin](#authoring-a-spin-plugin)
  - [Environment Variables Available to the Plugin Executable](#environment-variables-available-to-the-plugin-executable)
  - [Packaging a Plugin](#packaging-a-plugin)
  - [Creating a Spin Plugin Manifest](#creating-a-spin-plugin-manifest)
  - [Installing a Local Plugin](#installing-a-local-plugin)
  - [Contributing a Plugin](#contributing-a-plugin)

Spin plugins add new functionality or subcommands to Spin without modifying the
Spin codebase. They make Spin easily extensible while keeping it lightweight.
Spin plugins can add new triggers to Spin (such as the [example timer
trigger](https://github.com/fermyon/spin/blob/main/examples/spin-timer/trigger-timer.json)),
enable new language SDKs (such as
[`js2wasm`](https://github.com/fermyon/spin-plugins/blob/main/manifests/js2wasm/js2wasm.json)),
and more.

This document will cover what Spin plugins are, how to use a plugin, and how to
create a plugin.

## What Are Spin Plugins?

A Spin plugin is an executable that is added to Spin's plugins directory
(`$XDG_DATA_HOME/spin/plugins`) upon a `spin plugins install <plugin-name>`. The
plugin is then ready to be used. If the plugin is an extension to the Spin CLI,
it can now be executed directly as a subcommand: `spin <plugin-name>`. If the
plugin is a trigger plugin, it will be executed during `spin up` when an app
using that trigger is run. 

While for now plugins are assumed to be executables, in the future, support for
plugging in WebAssembly modules may be desirable.

## How to Find and Use a Spin Plugin

Spin maintains a centralized catalogue of available Spin plugins in the [Spin
plugins repository](https://github.com/fermyon/spin-plugins). During plugin
installation, if it does not already exist, Spin fetches the remote catalogue
and creates a local snapshot. To ensure that the local snapshot is up to date,
it is best to run `spin plugins update` before installing any plugins. 

To list available plugins, run `spin plugins search`. Now, decide which plugin to
install. For example, the `js2wasm` plugin, which is needed in order to build
JavaScript Spin applications, can be installed by running:

<!-- @selectiveCpy -->

```bash
$ spin plugins install js2wasm
```

With the plugin installed, you can now call `spin js2wasm` to run it. In this
case, for example, you might call it from your JavaScript application's npm
build script. Learn more about building Spin components in JavaScript
[here](./javascript-components.md).

To upgrade installed plugins to newer versions, run `spin plugin update` to
fetch the latest plugins to the local catalogue and `spin plugin upgrade` to perform the
upgrade on the installed plugins.

## Authoring a Spin Plugin

Spin plugins are implemented as a manifest that points to one or more `.tar.gz` archives which contain the plugin executables. So, to create a plugin you must:

1. Create tar archives of the executables for the platforms you want to support
2. Compose a manifest that describes the plugin and lists the URLs for those tar archives

### Environment Variables Available to the Plugin Executable

Your plugin may need to know information about the instance of Spin it's running in. For example, suppose your plugin wants to call `spin build`. The trouble is that you don't know if it's on the user's system PATH. Suppose, further, that your plugin would prefer to call `spin build -c` (to build only a specific component) if it's available but can fall back to `spin build` (to build everything) if it's not. The `-c` option only exists in Spin 1.4 and above, so this optimization requires that you know which version of Spin you're running in.

To help with this, when a user uses Spin to run your plugin, Spin sets a number of environment variables on the plugin process. Your code can use these environment variables to find out things like the path to the Spin binary and which version of Spin it is. When your plugin runs, the parent Spin process will set these to the right values for the _user's_ instance of Spin. In the example above, when your plugin wants to run `spin build`, it can consult the `SPIN_BIN_PATH` environment variable for the program path, and be confident that the `SPIN_VERSION` environment variable matches the Spin binary at that location.

The variables Spin sets are:

| Name               | Meaning                                                                                                               | Example |
|--------------------|-----------------------------------------------------------------------------------------------------------------------|---------|
| SPIN_BIN_PATH      | The path to the Spin executable that the user is running. Use this if your plugin issues commands using the Spin CLI. | /Users/alice/.cargo/bin/spin |
| SPIN_BRANCH        | The Git branch from which the Spin executable was built.                                                              | main |
| SPIN_BUILD_DATE    | The date on which the Spin executable was built, in yyyy-mm-dd format.                                                | 2023-05-15 |
| SPIN_COMMIT_DATE   | The date of the Git commit from which the Spin executable was built, in yyyy-mm-dd format.                            | 2023-05-15 |
| SPIN_COMMIT_SHA    | The SHA of the Git commit from which the Spin executable was built.                                                   | 49fb11b |
| SPIN_DEBUG         | Whether the Spin executable is a debug build.                                                                         | false |
| SPIN_TARGET_TRIPLE | The processor and operating system for which the Spin executable was built, in Rust target-triple format.             | aarch64-apple-darwin |
| SPIN_VERSION       | The version of Spin. This can be used to detect features availability, or to determine pre-stable command syntax.     | 1.3.0 |
| SPIN_VERSION_MAJOR | The major version of Spin.                                                                                            | 1 |
| SPIN_VERSION_MINOR | The minor version of Spin.                                                                                            | 3 |
| SPIN_VERSION_PRE   | The prerelease version string, or empty if this is a released version of Spin.                                        | pre0 |

> These variables aren't set if the launching Spin instance is version 1.3 or earlier. If you depend on these variables, set the `spinCompatibility` entry in the manifest to require 1.4 or above.

### Packaging a Plugin

After creating your plugin executable, package it along with its license as a
`tar.gz` archive. Note that the `name` field in the plugin manifest must match
both the binary and license name. See the [`spin-plugins`
repository
README](https://github.com/fermyon/spin-plugins#spin-plugin-naming-conventions)
for more details on naming conventions.

Refer to the aptly named [`example`
plugin](https://github.com/fermyon/spin-plugins/tree/main/example) for an
example of how to build a plugin.

### Creating a Spin Plugin Manifest

A Spin plugin manifest is a JSON file that conforms to the [a specific JSON
schema](https://github.com/fermyon/spin-plugins/blob/main/json-schema/spin-plugin-manifest-schema-0.1.json).
A manifest defines a plugin’s name, version, license, homepage (i.e. GitHub
repo), compatible Spin version, and gives a short description of the plugin. It
also lists the URLs of the tar archives of the plugin for various operating
systems and platforms. The URL can point to the local path to the file by using
the file scheme `file://`, for example, `file:///tmp/my-plugin.tar.gz`.

To ensure your plugin manifest is valid, follow the steps in the [`spin-plugins`
repository
README](https://github.com/fermyon/spin-plugins#validating-plugin-schemas).

### Installing a Local Plugin

By default, Spin will look in the plugins catalogue for a plugin. However, when
developing and testing a plugin, it is unlikely to be in the the catalogue. For
both installs and upgrades, the `--file` or `--url` flags can be used to point
to specific local or remote plugin manifests. For example, a local manifest
called `practice.json` can be installed and run as follows:

<!-- @selectiveCpy -->

```bash
$ spin plugin install --file practice.json
$ spin practice
```

### Contributing a Plugin

If you think the community would benefit from your newly created plugin, create
a PR to add it to the [Spin plugins
catalogue](https://github.com/fermyon/spin-plugins/tree/main/manifests)!
