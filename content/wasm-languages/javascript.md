date = "2022-01-11T21:06:42Z"
title = "JavaScript in WebAssembly"
description = "JavaScript can be compiled to WebAssembly. There are even multiple implementations of JavaScript WebAssembly runtimes."
template = "page_lang"
tags = ["javascript","webassembly"]
[extra]
author = "Fermyon Staff"

---

- [JavaScript in WebAssembly](#javascript-in-webassembly)
  - [Uses](#uses)
  - [Available JavaScript Implementations](#available-javascript-implementations)
  - [Learn More](#learn-more)

# JavaScript in WebAssembly

Compiling JavaScript to WebAssembly is different than using JavaScript to talk to a WebAssembly module.
This article is focused on how to take JavaScript code and build it into a WebAssembly module.

## Uses

JavaScript in WebAssembly is a recent development. Shopify's platform can generate and run Wasm modules. If Shopify's `javy` tool is built with `--feature standalone-wasi`, then it can create `wasm32-wasi` modules that can be run on the Fermyon platform. While SpiderMonkey can be compiled into JavaScript, only proof-of-concept code exists for building and running WASM this way. However, we expect the SpiderMonkey implementation to mature rapidly.

## Available JavaScript Implementations

There are three popular ways of building JavaScript into WebAssembly.

1. Use the Mozilla SpiderMonkey engine
2. Use the QuickJS implementation and compile the runtime and script into a Wasm module
3. Use the Ducktape implementation of a JavaScript runtime, usually to "safe eval" JS inside of JS using Wasm as an indirection layer 

Recently, Suborbital has introduced a version of [Javy](https://github.com/suborbital/javy) that supports some of their extensions.

## Learn More

Here are some great resources:

- Shopify has created an easy-to-use builder that uses QuickJS. It is called [Javy](https://github.com/Shopify/javy)
- A short article on Wasm.Builders covers [JavaScript, MessagePack, and Javy](https://www.wasm.builders/deepanshu1484/javascript-and-wasi-24k8)
- Bytecode Alliance's [builder for Spidermonkey](https://github.com/bytecodealliance/spidermonkey-wasm-build) provides binary releases
- [QuickJS](https://bellard.org/quickjs/) is a tiny JavaScript runtime that can be compiled to Wasm.
- [Making JavaScript Run Fast on WebAssembly](https://bytecodealliance.org/articles/making-javascript-run-fast-on-webassembly) from Bytecode Alliance explains how SpiderMonkey and Wasm work together.
- [wasm-jseval](https://github.com/maple3142/wasm-jseval) uses Ducktape compiled to Wasm to `eval()` JavaScript inside of JavaScript. Think of it as sandboxed JS
- [QuickJS-Emscripten](https://github.com/justjake/quickjs-emscripten) does something similar to Wasm-JSEval, but with QuickJS instead of Ducktape
- While much conversation is dominated by JS devs who use Wasm in-browser, there is good discussion on the WebAssembly Discord server's `#javascript` channel.