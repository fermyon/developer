date = "2024-02-18T01:01:01Z"
title = "JavaScript in WebAssembly"
description = "JavaScript can be compiled to WebAssembly. There are even multiple implementations of JavaScript WebAssembly runtimes."
template = "page_lang"
tags = ["javascript","webassembly"]
[extra]
author = "Fermyon Staff"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/javascript.md"

---

Compiling JavaScript to WebAssembly is different than using JavaScript to talk to a WebAssembly module. This article is focused on how to take JavaScript code and build it into a WebAssembly module.

## Uses

JavaScript in WebAssembly is a recent development. Shopify's platform can generate and run Wasm modules. If Shopify's `javy` tool is built with `--feature standalone-wasi`, then it can create `wasm32-wasi` modules that can be run on the Fermyon platform. While SpiderMonkey can be compiled into JavaScript, only proof-of-concept code exists for building and running WASM this way. However, we expect the SpiderMonkey implementation to mature rapidly.

## Available JavaScript Implementations

There are three popular ways of building JavaScript into WebAssembly.

1. Use the Mozilla SpiderMonkey engine
2. Use the QuickJS implementation and compile the runtime and script into a Wasm module
3. Use the Ducktape implementation of a JavaScript runtime, usually to "safe eval" JS inside of JS using Wasm as an indirection layer 

Recently, Suborbital has introduced a version of [Javy](https://github.com/suborbital/javy) that supports some of their extensions.

You can compile JavaScript and TypeScript to Wasm for the Spin runtime using [the Spin JavaScript SDK](https://github.com/spinframework/spin-js-sdk). The Spin SDK borrows heavily from Javy, using the same approach of providing a CLI utility to convert a JS file into a Wasm file.

[JCO](https://bytecodealliance.github.io/jco/) is a fully native tool for working with WebAssembly Components in JavaScript.

## Example (Using Spin)

The Spin SDK makes it very easy to build Javascript/TypeScript Wasm applications simply by using a Spin template that handles all of the heavy lifting. If you would like to try out the Spin SDK for Javascript please follow along with the example below.

### Prerequisites

If you have not done so already, please [install Spin](/spin/v3/install). Having Spin installed will allow us to easily use Spin application templates.

### The Spin JS/TS SDK Template

The Spin JS/TS SDK provides a couple of Spin templates for quickly starting a new JS or TS application. These templates can be installed using the following command:

```console
$ spin templates install --git https://github.com/spinframework/spin-js-sdk
```

You will now see `http-ts` and `http-js` available when listing installed templates:

```console
$ spin templates list
```

### Application

Create a new Spin application, using the `http-js` template:

```console
$ spin new -t http-js javascript-example --accept-defaults
```

Take a look at the scaffolded program in `javascript-example/src/index.js`:

```javascript
import { ResponseBuilder } from "@fermyon/spin-sdk";

export async function handler(req, res) {
    console.log(req);
    res.send("hello universe");
}
```

Compile a Wasm binary and then start up a local server:

```console
$ cd javascript-example
$ npm install
$ spin build --up
Building component javascript-example with `npm run build`
// --snip--
Serving http://127.0.0.1:3000
Available Routes:
  javascript-example: http://127.0.0.1:3000 (wildcard)
```

Test it with `curl`:

```console
$ curl localhost:3000/
hello universe
```

The Wasm binary can be found at `target/javascript-example.wasm`.

## Learn More

Here are some great resources:

- Shopify has created an easy-to-use builder that uses QuickJS. It is called [Javy](https://github.com/Shopify/javy)
- Bytecode Alliance's [builder for Spidermonkey](https://github.com/bytecodealliance/spidermonkey-wasm-build) provides binary releases
- [QuickJS](https://bellard.org/quickjs/) is a tiny JavaScript runtime that can be compiled to Wasm.
- [Making JavaScript Run Fast on WebAssembly](https://bytecodealliance.org/articles/making-javascript-run-fast-on-webassembly) from Bytecode Alliance explains how SpiderMonkey and Wasm work together.
- [wasm-jseval](https://github.com/maple3142/wasm-jseval) uses Ducktape compiled to Wasm to `eval()` JavaScript inside of JavaScript. Think of it as sandboxed JS
- [QuickJS-Emscripten](https://github.com/justjake/quickjs-emscripten) does something similar to Wasm-JSEval, but with QuickJS instead of Ducktape
- While much conversation is dominated by JS devs who use Wasm in-browser, there is good discussion on the WebAssembly Discord server's `#javascript` channel.
