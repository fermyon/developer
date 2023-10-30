title = "Building Spin components in other languages"
template = "spin_main"
date = "2023-11-02T16:00:00Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/other-languages.md"

---
- [C/C++](#cc)
- [C# and .NET Languages](#c-and-net-languages)
- [Grain](#grain)
- [Ruby](#ruby)
- [Zig](#zig)

> This document is continuously evolving as we improve language SDKs and add
> more examples on how to build Spin components in various programming languages.

> See the document on writing [Rust](./rust-components.md) and [Go](./go-components.md)
> components for Spin for detailed guides.

WebAssembly is becoming [a popular compilation target for programming languages](https://www.fermyon.com/wasm-languages/webassembly-language-support), and as language toolchains add support for the
[WebAssembly component model](https://github.com/WebAssembly/component-model),
building Spin components will also become supported.

As a general rule:

- if your language supports the
[WebAssembly component model](https://component-model.bytecodealliance.org/),
you can build Spin components either through an official Spin SDK
(such as [the Spin SDK for Rust](./rust-components.md)), or through using
bindings generators like [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen)
(for languages such as C and C++)
- if your language compiles to WASI, but doesn't have support for the component
model, you can build [Spin HTTP components](./http-trigger.md) that use the
Wagi executor — for example in languages such as
[Grain](https://github.com/deislabs/hello-wagi-grain) or [Swift](https://github.com/fermyon/wagi-python).
- if your language doesn't currently compile to WASI, there is no way to
build and run Spin components in that programming language

## C/C++

C and C++ are both broadly supported in the WebAssembly ecosystem. WASI/Wagi support means that both can be used to write Spin apps.

- The [C entry in the Wasm Language Guide](https://www.fermyon.com/wasm-languages/c-lang) has examples.
- The [C++ entry in the Wasm Language Guide](https://www.fermyon.com/wasm-languages/cpp) has specific caveats for writing C++ (like exception handling)
- The [yo-wasm](https://github.com/deislabs/yo-wasm) project makes setting up C easier.

## C# and .NET Languages

.NET has experimental support for WASI, so many (if not all) .NET languages, including C# and F#, can be used to write Spin applications.

- The [C# entry in the Wasm Language Guide](https://www.fermyon.com/wasm-languages/c-sharp) has a full example.

## Grain

[Grain](https://grain-lang.org/), a new functional programming language, has WASI/Wagi support and can be used to write Spin apps.

- The [Grain entry in the Wasm Language Guide](https://www.fermyon.com/wasm-languages/grain) has details
- A simple [Hello World example](https://github.com/deislabs/hello-wagi-grain) shows how to use Grain
- For a production-quality example. the [Wagi Fileserver](https://github.com/deislabs/wagi-fileserver) is written in Grain

## Ruby

Upstream [Ruby](https://www.ruby-lang.org/en/) officially supports WebAssembly and WASI, and we here at Fermyon have successfully run Ruby apps in Spin.

- The [Ruby entry in the Wasm Language Guide](https://www.fermyon.com/wasm-languages/ruby) has the latest information
- [Ruby's 3.2.0 Preview 1 release notes](https://www.ruby-lang.org/en/news/2022/04/03/ruby-3-2-0-preview1-released/) detail WASI support

## Zig

Zig is a low-level systems language that has support for Wasm and WASI, and can be used to write Spin apps.

- The [Zig entry in the Wasm Language Guide](https://www.fermyon.com/wasm-languages/zig) covers the basics
- Zig's [0.4 release notes](https://ziglang.org/download/0.4.0/release-notes.html#WebAssembly-Support) explain WebAssembly support