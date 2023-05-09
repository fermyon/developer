title = "Spin Cache"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/cache.md"

---

- [The Spin Registry Cache](#the-spin-registry-cache)
- [Viewing Registry Cache Files](#viewing-registry-cache-files)
- [Clearing Registry Cache Files](#clearing-registry-cache-files)

## The Spin Registry Cache

A running Spin application can [fetch resources from remote registries](https://developer.fermyon.com/spin/spin-oci) and individual component sources via HTTP endpoints. These resources naturally consume network bandwidth. To ensure network efficiency, and to prevent waiting to download the same files every time an application is started, Spin automatically maintains a local `spin/registry` cache.

## Viewing Registry Cache Files

All downloadable application files that are automatically cached can be found in the following file paths, depending on the operating system being used to run the Spin application:

| Platform | Value | Example |
| :--- | :--- | :--- |
| Linux | `$XDG_CACHE_HOME` or `$HOME/.cache/spin/registry` | `/home/alice/.cache/spin/registry` |
| macOS | `$HOME/Library/Caches/spin/registry` | `/Users/Alice/Library/Caches/spin/registry` |
| Windows | `{FOLDERID_LocalAppData}/spin/registry` | `C:\Users\Alice\AppData\Local/spin/registry` |

For example inspecting the local `spin/registry` cache on macOS, (using the `tree` command) would look like this:

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

The `data` directory contains all static assets referenced from applications distributed with remote registries. The `wasm` directory contains all component sources referenced either in applications distributed with remote registries, or component sources from HTTP endpoints, directly referenced in `spin.toml` (for example, the static file server, or the KV explorer). 

> The `data` and `wasm` directories are content addressable. This means that if multiple applications reference the same static file or component source, Spin will be able to determine if it has already been pulled (on that users operating system), based on its digest. This also means that if an application has an update, Spin will only pull the changes in the component sources and static assets.

The `manifests` directory contains the registry manifests for entire apps distributed with remote registries. They are placed in subdirectories that identify the application based on the registry, repository, and digest (or tag). The schema is aligned with the documentation on [distributing Spin apps using the OCI format](https://developer.fermyon.com/spin/distributing-apps).

> When running an application from a remote registry, even if the application has already been pulled, Spin will first contact the registry to fetch the manifest.

## Clearing the Registry Cache

Clearing the registry cache directory can be done by removing the `registry` directory entirely, or by removing the `registry`'s parent directory (`spin`). The only direct effect of these actions is that Spin will have to pull again all component sources and static assets.