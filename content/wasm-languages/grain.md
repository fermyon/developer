date = "2022-01-12T00:23:27Z"
title = "Grain in WebAssembly"
description = "Grain is a WebAssembly-first language. It supports both in-browser and WASI modes."
tags = ["grain", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Grain in WebAssembly](#grain-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
  - [Learn More](#learn-more)

# Grain in WebAssembly

Grain is a functional programming language that is designed specifically to compile to WebAssembly.
We have enjoyed using it because of its intuitive syntax and great tooling.

## Available Implementations

There is one official [implementation of Grain](https://grain-lang.org/)

## Usage

Grain can be used in the browser. It also supports WASI, so it can be used for the Fermyon Platform (Wagi and Spin) or with commandline runners like Wasmtime.

## Pros and Cons

Things we like:

- Easy to learn
- Good toolchain
- Good documentation

We're neutral about:

- Compiled object size.
- Execution speed.

Things we're not big fans of:

- Not a lot of third party libraries yet

## Example

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

To use Grain, you will need to [install the Grain toolkit](https://grain-lang.org/docs/getting_grain).

Start with a `hello.gr` file:

```grain
print("content-type: text/plain\n")
print("\n)
print("Hello, World!")
```

Compile the program with the `grain` compiler:

```console
$ grain hello.gr
```

The above will produce a `hello.gr.wasm` file. As usual, you can run `wasmtime hello.gr.wasm` to see the output. The first time you compile a grain application, it will take a long time. After that, compiling is much faster.

To run the WebAssembly app with Spin, create a `spin.toml` file:

```
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "Grain example."
name = "spin-grain"
trigger = { type = "http", base = "/" }
version = "1.0.0"

[[component]]
id = "grain-hello"
source = "hello.gr.wasm"
[component.trigger]
route = "/"
# Spin components written in Grain use the Wagi HTTP executor
executor = { type = "wagi" }
```

From there, you can use `spin up` to start a server, and see the results on `http://localhost:3000`.

## Learn More

Here are some great resources:

- The official [Hello World example](https://grain-lang.org/docs/guide/hello_world)
- An InfoWorld article [on the basics of Grain](https://www.infoq.com/news/2021/05/grain-web-assembly-first/)
- An example [Wagi application in Grain](https://github.com/deislabs/hello-wagi-grain)
- A production-grade [Wagi file server in Grain](https://github.com/deislabs/wagi-fileserver)
- A French-language walk-thru video [of Grain, Wagi, and Wasmer](https://youtu.be/TDNxLGMDuVs)