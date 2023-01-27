title = "Creating Spin Plugins"
template = "spin_main"
date = "2023-02-6T00:22:56Z"
---

Spin plugins add new functionality or subcommands to Spin without modifying the
Spin codebase. They make Spin easily extensible while keeping it lightweight.
Spin plugins can add new triggers to Spin (such as the [example timer
trigger](https://github.com/fermyon/spin/blob/main/examples/spin-timer/trigger-timer.json)),
enable new language SDKs (such as
[`js2wasm`](https://github.com/fermyon/spin-plugins/blob/main/manifests/js2wasm/js2wasm.json)),
and more.

This document will cover what Spin plugins are, how to use a plugin, and how to
create a plugin.

## What are Spin Plugins?

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

To list available plugins, run `spin plugins list`. Now, decide which plugin to
install. For example, the `js2wasm` plugin, which is needed in order to build
JavaScript Spin applications, can be installed by running:

```sh
spin plugins install js2wasm
```

With the plugin installed, you can now call `spin js2wasm` to run it. In this
case, for example, you might call it from your JavaScript application's npm
build script. Learn more about building Spin components in JavaScript
[here](https://developer.fermyon.com/spin/javascript-components.md).

To upgrade installed plugins to newer versions, run `spin plugin update` to
fetch the latest plugins to the local catalogue and `spin plugin upgrade` to perform the
upgrade on the installed plugins.

## Authoring a Spin Plugin

Spin plugins are implemented as a manifest that points to one or more `.tar.gz` archives which contain the plugin executables. So, to create a plugin you must:

1. Create tar archives of the executables for the platforms you want to support
2. Compose a manifest that describes the plugin and lists the URLs for those tar archives

### Packaging a Plugin

After creating your plugin executable, package it along with its license as a
`tar.gz` archive. Note that the `name` field in the plugin manifest must match
both the binary and license name (i.e. `$name.license`). See the [`spin-plugins`
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

```sh
spin plugin install --file practice.json
spin practice
```

### Contributing a Plugin

If you think the community would benefit from your newly created plugin, create
a PR to add it to the [Spin plugins
catalogue](https://github.com/fermyon/spin-plugins/tree/main/manifests)!
