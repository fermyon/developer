date = "2022-01-12T00:23:27Z"
title = "Typescript in WebAssembly"
description = "TypeScript can be converted to JavaScript, and JS tools can be used to build Wasm binaries."
tags = ["typescript", "javascript", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [TypeScript in WebAssembly](#typescript-in-webassembly)
  - [Learn More](#learn-more)

# TypeScript in WebAssembly

TypeScript is a popular language in its own right, but it is a very near relative of JavaScript.
In fact, most of the time, TS code is converted to JavaScript during the development cycle.
As such, the best approach to using TypeScript in WebAssembly is to convert it and [use JavaScript tools](/wasm-languages/javascript).

Another potential solution is to [use AssemblyScript](/wasm-languages/assemblyscript), a subset of TypeScript tooled specifically for WebAssembly.

## Learn More

Here are some great resources:

- A [detailed post](https://blog.bitsrc.io/typescript-to-webassembly-the-what-the-how-and-the-why-3916a2561d37) on moving from TypeScript to AssemblyScript