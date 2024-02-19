date = "2022-01-12T00:23:27Z"
title = "Rust in WebAssembly"
description = "Rust supports a broad array of WebAssembly options."
tags = ["rust", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Rust in WebAssembly](#rust-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
    - [Writing Wagi-based Rust Apps](#writing-wagi-based-rust-apps)
  - [Learn More](#learn-more)

# Rust in WebAssembly

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

Rust can use Spin's native executor as well as Spin's Wagi executor. We strongly recommend the native one, as it has more features.

When writing Spin applications in Rust, use `cargo init --lib` or `cargo new --lib`. Spin loads the `wasm` files as libraries, not as executables with a `main` function.

Here is an example `lib.rs` that uses Spin's native executor:

```rust
use anyhow::Result;
use spin_sdk::{
    http::{Request, Response},
    http_component,
};

/// A simple Spin HTTP component.
#[http_component]
fn hello_world(_req: Request) -> Result<Response> {
    Ok(http::Response::builder()
        .status(200)
        .body(Some("Writing a very simple Spin component in Rust".into()))?)
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
# Crate to simplify working with bytes.
bytes = "1"
# General-purpose crate with common HTTP types.
http = "0.2"
# The Spin SDK.
spin-sdk = { git = "https://github.com/fermyon/spin" }
# Crate that generates Rust Wasm bindings from a WebAssembly interface.
wit-bindgen-rust = { git = "https://github.com/bytecodealliance/wit-bindgen", rev = "2f46ce4cc072107153da0cefe15bdc69aa5b84d0" }
```

To build a Spin app in rust, use `cargo build`:

```console
$ cargo build --target wasm32-wasi --release
```

(Again, we suggest `--release` to keep binary sizes small.)

The resulting binary can be run in Spin with a `spin.toml` that looks something like this:

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "Hello world app."
name = "spin-hello"
trigger = { type = "http", base = "/" }
version = "1.0.0"

[[component]]
id = "hello"
source = "target/wasm32-wasi/release/hello.wasm"
[component.trigger]
route = "/"
```

Note that we do _not_ add an `executor` line at the bottom of this file as we do in many other examples.

From there, running the app is as easy as `spin up`!

### Writing Wagi-based Rust Apps

It is also possible to write a Wagi application in Rust and run it in Spin or Wagi. Examples of this exist [in the Wagi examples repository](https://github.com/deislabs/wagi-examples).

## Learn More

Here are some great resources:

- The official [documentation for Spin](https://spin.fermyon.dev/rust-components/) has many examples, including creating Redis listeners.
- Rust has a [dedicated mini-site covering WebAssembly](https://www.rust-lang.org/what/wasm)
- The Rust Linz group did a [presentation on Rust and Wagi](https://www.youtube.com/watch?v=9NDwHBjLlhQ) and posted a GitHub [repo full of Wagi examples](https://github.com/rstropek/rust-samples)
- [Wasmtime](https://wasmtime.dev/) is the reference implementation of Wasm32-WASI.
- [egui](https://www.egui.rs/) provides a GUI toolkit that can be compiled into Wasm and run in the browser
- DeisLabs has some [Rust Wagi examples](https://github.com/deislabs/wagi-examples)
- The [Bartholomew CMS](https://github.com/fermyon/bartholomew) is written in Rust and runs in Spin or Wagi
- The [spin-fileserver](https://github.com/fermyon/spin-fileserver) is a simple Rust Spin-native app
- There are several rich examples in the [Spin Kitchen Sink repo](https://github.com/fermyon/spin-kitchensink)