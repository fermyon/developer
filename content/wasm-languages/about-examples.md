date = "2024-02-18T01:01:01Z"
title = "About WebAssembly Examples"
description = "The WebAssembly examples all follow some common patterns. This page explains them"
template = "page"
tags = ["webassembly", "examples"]
[extra]
author = "Fermyon Staff"  # Use "Fermyon Staff" for general content
type = "page"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/about-examples.md"

---

The [Fermyon WebAssembly Language Guide](/wasm-languages/webassembly-language-support) tracks languages that can be executed within a WebAssembly runtime. We do our best to keep things consistent across pages. This page explains how we create our examples.

## The Typical Example

Providing detailed language-specific examples is beyond the scope of the language guide. Instead, we try to provide the following pieces of relevant information:

- How to get the tools necessary to work with the language
- How to create a simple "Hello World" style program
- How to compile that program
- How to execute that program

Our canonical example is to build a simple web page that prints `Hello, World` in plain text. In order to serve it as a web page, we try to write the script using one of two tools:

- [Spin](https://spin.fermyon.dev/), a framework for building WebAssembly-based web applications and microservices.
- [Wagi](https://github.com/deislabs/wagi), used in older content from before Spin was released. All Wagi applications run on Spin (though you must use a `spin.toml` instead of a `modules.toml`).

For command line examples, the example runs with [wasmtime](https://wasmtime.dev/), which is committed to implementing the WASI specification.

Other runtimes and execution environments are out of the scope of this documentation. However, you may find links to examples in the _Learn More_ section at the bottom of each language page

To that end, the simplest example, written in Swift, looks like this:

```swift
print("content-type: text/plain\n\n");
print("Hello, World\n");
```

When run on `wasmtime`, it should produce output like this:

```console
$ wasmtime hello.wasm
content-type: text/plain

Hello, World
```

When executed on Spin (or Wagi) and accessed via Curl, it should look like this:

```console
$ curl localhost:3000                                       
Hello, World
```

## Libraries, SDKs, and Helpers

Generally, if there is a useful library, SDK, or helper, examples will use the best one. Many times, a language's CGI library can be used with Wagi-style invocations on Spin or Wagi. Additionally, Spin has SDKs for a growing list of languages.

In the end, though, every Wagi executor (on Spin) [uses the same CGI-like mechanism](https://github.com/deislabs/wagi/blob/main/docs/architecture.md) to read a request and write a response.

## Spin Configuration

Newer examples use a `spin.toml` to show how the program is executed with Spin. The generic `spin.toml` looks something like this:

```toml
spin_manifest_version = 2

[application]
name = "spin-hello"
version = "0.1.0"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "Hello world app."

[[trigger.http]]
route = "/..."
component = "spin-hello"

[component.spin-hello]
source = "target/wasm32-wasi/release/spin_hello.wasm"
allowed_outbound_hosts = []
[component.spin-hello.build]
command = "cargo build --target wasm32-wasi --release"
watch = ["src/**/*.rs", "Cargo.toml"]
```

The format and fields are defined in the [official Spin configuration docs](https://developer.fermyon.com/spin/v2/manifest-reference).

The command to build and start a Spin application is `spin build --up`. This will typically start a server on `http://localhost:3000` unless you specify otherwise.

## Wagi Configuration

Older examples us Wagi instead of Spin. They may provide examples that use a `modules.toml` file instead of a `spin.toml` file. A simple example looks like this:

```toml
[[module]]
module = "hello.wasm"
route = "/"
```

Then we start `wagi` with `wagi -c modules.toml`.

>> If you are interested in contributing to this guide, head on over to [the GitHub repo](https://github.com/fermyon/wasm-languages).
