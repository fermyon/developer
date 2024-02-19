date = "2022-02-15T00:18:54Z"
title = "Lisp in WebAssembly"
description = "Lisp can be compiled to WebAssembly."
tags = ["language", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Lisp in WebAssembly](#lisp-in-webassembly)
  - [Uses](#uses)
  - [Available Implementations](#available-implementations)
  - [Learn More](#learn-more)

# Lisp in WebAssembly

The famous functional programming language Lisp has some interesting properties that has intrigued developers. A few projects are work-in-progress ports of Lisp in WebAssembly. Nothing appears to be production-ready yet, but the progress is promising.

## Uses

Currently, environments are mainly for R&D usage, and are not entirely complete for either in-browser or out-of-browser usage.

## Available Implementations

The [Wisp project][https://github.com/mbrock/wisp] is a Lisp-to-Wasm compiler that is currently being (re-)written in [Zig](/wasm-languages/zig).

## Learn More

Here are some great resources:

- The [Wisp project](https://github.com/mbrock/wisp) is making steady progress
- Wisp appears to be part of a [larger project](https://github.com/nodfur/os)
- [Wasm-Lisp](https://github.com/rolfrm/wasm-lisp) is not as actively maintained, and did not (as far as we know) implement the entire compiler.