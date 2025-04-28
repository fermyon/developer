date = "2024-02-18T01:01:01Z"
title = "Rust in WebAssembly"
description = "Rust supports a broad array of WebAssembly options."
tags = ["rust", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/rust.md"

---

Rust is probably the best supported language of the WebAssembly ecosystem.
Not only does Rust support several WebAssembly compile targets,
but `wasmtime`, Spin, Wagi, and many other WebAssembly tools are written in Rust.
Rust can be used to create Fermyon Platform apps.

## Available Implementations

WebAssembly and WASI support are [officially supported](https://www.rust-lang.org/what/wasm) by the Rust project.

## Usage

While the WebAssembly compiler does not ship with the default Rust distribution, it can be easily added.
To add the `wasm32-wasi` compiler, simply use `rustup`:

```console
$ rustup target add wasm32-wasi
```

Then to compile a program to rust, set the target when running `cargo build`:

```console
$ cargo build --target wasm32-wasi --release
```

While `--release` is not required, doing so will drastically reduce the size of the output `.wasm` module.
WebAssembly binaries will be written to your project's `target/wasm32-wasi/release` directory.

## Pros and Cons

Things we like:

- The Rust ecosystem for Wasm and WASI is fabulous
- Many of the Wasm tools are written in Rust, which means there is plenty of code to look at
- Spin usually has Rust support for features before it has support for other languages
- Wasmtime, written in Rust, often has cutting edge features before other runtimes
- We have used many Rust libraries off the shelf with WebAssembly
- Thanks to Cargo's flexible build system, some crates even have special feature flags to enable Wasm features (e.g. Chrono)
- Because of Rust's memory management techniques, Rust binary sizes are small compared to similar languages

Things we're not big fans of:

- Many Rust libraries do not work with Wasm. Most notably, anything that uses Tokio or `async` does not yet work.

## Example

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

When writing Spin applications in Rust, use `cargo init --lib` or `cargo new --lib`. Spin loads the `wasm` files as libraries, not as executables with a `main` function.

Here is an example `lib.rs`:

```rust
use spin_sdk::http::{IntoResponse, Request, Response};
use spin_sdk::http_component;

/// A simple Spin HTTP component.
#[http_component]
fn hello_world(_req: Request) -> anyhow::Result<impl IntoResponse> {
    Ok(Response::new(200, "Writing a very simple Spin component in Rust"))
}
```

Note that your `Cargo.toml` will need to include at least the Spin SDK. We recommend starting with something like this:

```toml
[package]
name = "rust-hello"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = [ "cdylib" ]

[dependencies]
# Useful crate to handle errors.
anyhow = "1"
# The Spin SDK.
spin-sdk = "3.0.1"
```

To build a Spin app in rust, use `cargo build`:

```console
$ cargo build --target wasm32-wasi --release
```

(Again, we suggest `--release` to keep binary sizes small.)

The resulting binary can be run in Spin with a `spin.toml` that looks something like this:

```toml
spin_manifest_version = 2

[application]
name = "spin-hello"
version = "1.0.0"
description = "Hello world app."
authors = ["Fermyon Engineering <engineering@fermyon.com>"]

[[trigger.http]]
id = "trigger-hello"
component = "hello"
route = "/"

[component.hello]
source = "target/wasm32-wasi/release/hello.wasm"
[component.hello.build]
command = "cargo build --target wasm32-wasi --release"
```

> Note: we've set the `hello` component's build command to be the `cargo build` invocation above, so that `spin build` will run it from now on.

From there, running the app is as easy as `spin up`!

## Learn More

Here are some great resources:

- The official [documentation for Spin](https://spinframework.dev/rust-components/) has many examples, including creating Redis listeners.
- Rust has a [dedicated mini-site covering WebAssembly](https://www.rust-lang.org/what/wasm)
- The Rust Linz group did a [presentation on Rust and Wagi](https://www.youtube.com/watch?v=9NDwHBjLlhQ) and posted a GitHub [repo full of Wagi examples](https://github.com/rstropek/rust-samples)
- [Wasmtime](https://wasmtime.dev/) is the reference implementation of Wasm32-WASI.
- [egui](https://www.egui.rs/) provides a GUI toolkit that can be compiled into Wasm and run in the browser
- There are several rich examples in the [Spin Rust SDK repo](https://github.com/spinframework/spin-rust-sdk/tree/stable/examples) as well as the [Spin Up Hub](https://spinframework.dev/hub)
- The [Bartholomew CMS](https://github.com/fermyon/bartholomew) is written in Rust and runs in Spin
- The [spin-fileserver](https://github.com/spinframework/spin-fileserver) is a simple Rust Spin-native app
