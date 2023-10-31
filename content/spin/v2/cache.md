title = "Spin Internal Data Layout"
template = "spin_main"
date = "2023-11-02T01:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/cache.md"

---

- [Base Directories](#base-directories)
- [Plugins](#plugins)
- [Templates](#templates)
- [Application Cache](#application-cache)
  - [Inside the Application Cache](#inside-the-application-cache)

This page describes how Spin lays out its internal data on disk.

> This document is provided as a reference for users wanting to diagnose problems or to reset Spin state. Don't modify the contents of these directories. Spin updates these directories as you issue the relevant commands on the command line.

> No stability guarantees apply to the internal layout. It may change between Spin versions.

## Base Directories

Spin uses similar layouts across Linux, MacOS and Windows platforms, but the paths to various areas of the user's home directory differ across the platforms. On this page, the following terms have the following meanings:

| Name          | Linux                                    | MacOS                                | Windows |
|---------------------|------------------------------------------|--------------------------------------|-------------------|
| `DATA_DIR`    | `$XDG_DATA_HOME` or `$HOME/.local/share` | `$HOME/Library/Application Support`, or `$HOMEBREW_PREFIX/etc/fermyon-spin` if installed using Homebrew  | `%LOCALAPPDATA%` or `%USERPROFILE%\AppData\Local` |
| `CACHE_DIR`   | `$XDG_CACHE_HOME` or `$HOME/.cache`      | `$HOME/Library/Caches`               | `%LOCALAPPDATA%` or `%USERPROFILE%\AppData\Local` |

These directories are based on the [XDG specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html), and specifically on the cross-platform implementation in the [Rust `dirs` crate](https://docs.rs/dirs/latest/dirs/).

> If Spin cannot resolve a base directory as listed above, it falls back to `$HOME/.spin` (`%USERPROFILE%\.spin` on Windows).

## Plugins

Installed plugins are stored in `(DATA_DIR)/spin/plugins`.  A snapshot of the plugins registry is also stored under that directory at `(DATA_DIR)/spin/plugins/.spin-plugins`; this is structured as a Git repository.

> Note: If you [install Spin](./install) using Homebrew, the plugins are stored at `$HOMEBREW_PREFIX/fermyon-spin/plugins`.

If you delete the plugins directory, you will no longer be able to run your plugins (until you reinstall them), but other Spin operations will be unaffected.

## Templates

Installed templates are stored in `(DATA_DIR)/spin/templates`.

> Note: If you [install Spin](install) using Homebrew, the templates are stored at `$HOMEBREW_PREFIX/fermyon-spin/templates`.

If you delete the templates directory, you will lose access to your installed templates (until you reinstall them), but other Spin operations will be unaffected.

## Application Cache

Downloaded application data, such as applications downloaded from registries or Wasm modules downloaded from URLs, are stored in `(CACHE_DIR)/spin/registry`.

If you delete the application cache directory, Spin will automatically re-download the files as needed.  Spin operations will be otherwise unaffected.

### Inside the Application Cache

> **Reminder:** This information is provided for diagnostic and entertainment purposes only, and may change across Spin versions. The only operation a user can safely undertake is to delete the entire `registry` directory.

The application cache is divided into three subdirectories, `data`, `manifests`, and `wasm`.

The `data` directory contains all static assets referenced from applications distributed with remote registries. The `wasm` directory contains all component sources referenced either in applications distributed with remote registries, or component sources from HTTP endpoints, directly referenced in `spin.toml`.

> The `data` and `wasm` directories are content addressable. This means that if multiple applications reference the same static file or component source, Spin will be able to determine if it has already been pulled (on that users operating system), based on its digest. This also means that if an application has an update, Spin will only pull the changes in the component sources and static assets.

The `manifests` directory contains the registry manifests for entire apps distributed with remote registries. They are placed in subdirectories that identify the application based on the registry, repository, and digest (or tag).

The following `tree` command shows a typical (abbreviated) cache directory:

<!-- @selectiveCpy -->

```console
$ tree ~/Library/Caches/spin/registry/

├── data
│   ├── sha256:41a4649a8a8c176133792119cb45a7686767d3fa376ffd656e2ff76a6071fb07
│   └── sha256:da3fda2db338a73483068072e22f7e7eef27afdbae3db824e130932adce703ba
├── manifests
│   └── ghcr.io
│       └── radu-matei
│           ├── hello-registries
│           │   └── latest
│           │       ├── config.json
│           │       └── manifest.json
│           └── spin-openai-demo
│               └── v1
│                   ├── config.json
│                   └── manifest.json
└── wasm
    ├── sha256:0b985e7d43e719f34cbb54849759a2f8e7913c0f9b17bf7cb2b3d2458d33859e
    └── sha256:d5f9e1f6b61b90f7404e3800285f7860fe2cfc7d0116023efc370adbb403fe87
```
