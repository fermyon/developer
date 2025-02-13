title = "Spinlet"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/plain"
tags = ["rust"]

[extra]
author = "cardoso"
type = "hub_document"
category = "Plugin"
language = "Rust"
created_at = "2022-10-15T00:22:56Z"
last_updated = "2022-10-15T00:22:56Z"
spin_version = ">v1.4"
summary = "Spinlet is a plugin and runtime for building and running wasm32-wasi cli components as plugins for Spin"
url = "https://github.com/cardoso/spinlet"
keywords = "sandbox, runtime, cli components, wasm32-wasi"
---


Spinlet is a plugin and runtime for building and running wasm32-wasi cli components as  [plugins](https://github.com/spinframework/spin-plugins) for  [Spin](https://github.com/spinframework/spin). It provides a sandboxed environment with access control to protect the host system from malicious code. Spinlet supports features such as `std::env::args` and `std::fs::read_dir`, and allows users to specify which environment variables, directories, and files the plugin has access to.

## Requirements

Spinlet requires the following tools to be installed:

- [Rust](https://www.rust-lang.org/) >= 1.70.0
- [Spin](https://github.com/spinframework/spin) >= 1.2.0
- [wasm-tools](https://github.com/wasmtime/wasm-tools) >= 1.0.35
- [wit-bindgen](https://github.com/wasmtime/wasm-tools) >= 0.7.0
- [spin-pluginify](https://github.com/itowlson/spin-pluginify) >= [PR #6](https://github.com/itowlson/spin-pluginify/pull/6)

## Installation

```bash
git clone https://github.com/cardoso/spinlet
cd spinlet
spin pluginify -i
spin let
```