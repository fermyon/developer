date = "2022-01-12T00:23:27Z"
title = "Lua in WebAssembly"
description = "Lua has several interesting WebAssembly projects."
tags = ["lua", "language", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Lua in WebAssembly](#lua-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
  - [Learn More](#learn-more)

# Lua in WebAssembly

[Lua](https://www.lua.org/) is a lightweight scripting language designed to be easily embedded. It enjoys broad usage as a plugin-and-extension language, and has a large ecosystem. But it is not generally considered one of the top programming languages.

## Available Implementations

Lua does not have an official implementation of a Lua-to-Wasm compiler.

The following unofficial projects compile or run Lua in WebAssembly:

- [Wasmoon](https://github.com/ceifa/wasmoon) runs [Lua as a script](https://www.fermyon.com/blog/scripts-vs-compiled-wasm) in the browser via a Lua engine compiled to Wasm. It also works with Node.js and Deno, but does not appear to have WASI bindings.
- [WebAssembly-Lua](https://github.com/ysugimoto/webassembly-lua) - Likely unmaintained emscripted-based compilation.
- [Wasm_Lua](https://github.com/vvanders/wasm_lua) is a project that compiles the Lua engine to WebAssembly, allowing you to run [Lua as a script](https://www.fermyon.com/blog/scripts-vs-compiled-wasm). It also appears to be unmaintained

It should also be possible to compile Lua interpreters written in Wasm-supported languages. For example, [Hematita](https://crates.io/crates/hematita), written in Rust, should be compilable to Wasm. This is the
same technique [Bartholomew](https://developer.fermyon.com/bartholomew/index) uses for Rhai scripting. 

## Usage

Wasmoon, the most promising of the above projects, is used to run Lua scripts (uncompiled) inside of browsers, Node, or Deno. The [documentation](https://github.com/ceifa/wasmoon#api-usage) describes usage.

## Pros and Cons

No details. 

## Example

Currently, there are no examples. None of the known implementations have WASI support.

## Learn More

Here are some great resources:

- This [fun blog post](https://yiwei.dev/port-lua-to-web-environment-using-webassembly/) explains how to tweak Lua to compile the interpreter to WebAssembly.
- [Wasm2Lua](https://github.com/SwadicalRag/wasm2lua) is an interesting project that translates Wasm modules to Lua code. 
