date = "2022-01-12T00:23:27Z"
title = "Swift in WebAssembly"
description = "Swift can be compiled to WebAssembly and run in-browser, at the CLI, and with WASI enabled."
tags = ["swift", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Swift in WebAssembly](#swift-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
    - [Optimizing](#optimizing)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
  - [Learn More](#learn-more)

# Swift in WebAssembly

Swift is a popular language in the Apple ecosystem.
But it is no longer just for iOS apps.
Thanks to a recent community-led project, it is possible to [compile Swift into WebAssembly](https://swiftwasm.org/)
destined either for the browser or for a WASI environment.

## Available Implementations

The [SwiftWasm](https://swiftwasm.org/) project compiles Swift to WebAssembly. While this is a community-led project, the [stated goal](https://book.swiftwasm.org/index.html) of the project is:

> [T]o fully support the WebAssembly target for Swift and to be merged into the upstream repository.

It works like a drop-in replacement to the standard Swift tools.

The [RemObjects Elements](https://www.elementscompiler.com/elements/) compiler (commercial license required) may support compiling Swift to WebAssembly, too. We have not tested it.

## Usage

SwiftWasm supports macOS and Linux operating systems. In addition to the standard Swift environment, you will need to [install the SwiftWasm tools](https://book.swiftwasm.org/getting-started/setup.html).

Once that is done, the `swift` tool should report SwiftWasm support:

```
$ swift --version
SwiftWasm Swift version 5.5 (swiftlang-5.5.0)
Target: arm64-apple-darwin21.1.0
```

From there, the `swift` tool works as usual.

One of Fermyon's engineers has been working on a [Spin SDK for Swift](https://github.com/endocrimes/swiftwasm-test). It's in its early stages.

### Optimizing

You may find that optimizing Swift code with `wasm-opt` (part of [Binaryen](https://github.com/WebAssembly/binaryen)) can cut down binary size. The `hello.wasm` compiled below was 9.1M. Running it through `wasm-opt -Os` cut it down to 5.0M.

## Pros and Cons

Things we like:

- Swift is a great language with many good core features
- The toolchain for Wasm feels no different than native tools
- The project documentation is very good

We're neutral about:

- The binary sizes can be quite large, so we recommend running `wasm-opt` on your `.wasm` files to trim out unused code.

Things we're not big fans of:

- There is no Windows support

## Example

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

Once you have installed SwiftWasm, it is easy to build applications for the Fermyon Platform using Wagi.

The simplest Swift program for Spin (or Wagi) looks like this:

```swift
print("content-type: text/plain\n\n")
print("Hello, World!\n")
```

To compile, set the target to `wasm32-unknown-wasi` (which ensures that WASI support is enabled):

```console
$ swiftc -target wasm32-unknown-wasi hello.swift -o hello.wasm
```

This binary can be executed with `wasmtime`:

```console
$ wasmtime hello.wasm
content-type: text/plain

Hello, World!
```

To run it as a Spin web application, we can add a `spin.toml` that looks like this:

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "Hello world app."
name = "spin-hello"
trigger = { type = "http", base = "/" }
version = "1.0.0"

[[component]]
id = "hello"
source = "hello.wasm"
[component.trigger]
route = "/"
executor = { type = "wagi" }
```

Note that we use the `wagi` executor.

And then, in the same directory, run `spin up`. Once the server is running, you can use either `curl` or a web browser to test it.

```console
$ curl localhost:3000                                       

Hello, World!
```

>> When the Swift Spin SDK is generally available, it will be possible to use many Fermyon Spin services like Key Value Store, SQLite Database, and Serverless AI.

## Learn More

Here are some great resources:

- It is possible to use the [Swift Package Manager with Wasm](https://book.swiftwasm.org/getting-started/swift-package.html)
- There is a [Swift Spin SDK](https://github.com/endocrimes/swiftwasm-test) in development.
- The [SwiftWasm Book](https://book.swiftwasm.org/) has examples and info about compiling to Wasm32+WASI
- [yo-wasm](https://github.com/deislabs/yo-wasm) supports Swift
- Here is a [very quick quickstart](https://betterprogramming.pub/get-started-with-swift-for-webassembly-on-macos-with-swiftwasm-5d588a086120) if the docs look too verbose
