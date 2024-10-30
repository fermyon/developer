date = "2024-02-18T01:01:01Z"
title = "Grain in WebAssembly"
description = "Grain is a WebAssembly-first language. It supports both in-browser and WASI modes."
tags = ["grain", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/grain.md"

---

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

```
module Main

provide let _start = () => {
  print("content-type: text/plain")
  print("")
  print("Hello, World!")
}
```

Compile the program with the `grain` compiler:

```console
$ grain compile --release --use-start-section hello.gr
```

The above will produce a `hello.gr.wasm` file. As usual, you can run `wasmtime hello.gr.wasm` to see the output. The first time you compile a grain application, it will take a long time. After that, compiling is much faster.

To run the WebAssembly app with Spin, create a `spin.toml` file:

```
spin_manifest_version = 2

[application]
name = "spin-grain"
version = "1.0.0"
description = "Grain example."
authors = ["Fermyon Engineering <engineering@fermyon.com>"]

[[trigger.http]]
id = "trigger-grain-hello"
component = "grain-hello"
route = "/"
executor = { type = "wagi" }

[component.grain-hello]
source = "hello.gr.wasm"
```

From there, you can use `spin up` to start a server, and see the results on `http://localhost:3000`.

## Learn More

Here are some great resources:

- The official [Hello World example](https://grain-lang.org/docs/guide/hello_world)
- An InfoWorld article [on the basics of Grain](https://www.infoq.com/news/2021/05/grain-web-assembly-first/)
- An example [Wagi application in Grain](https://github.com/deislabs/hello-wagi-grain)
- A production-grade [Wagi file server in Grain](https://github.com/deislabs/wagi-fileserver)
- A French-language walk-thru video [of Grain, Wagi, and Wasmer](https://youtu.be/TDNxLGMDuVs)