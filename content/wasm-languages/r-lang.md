date = "2022-01-12T00:23:27Z"
title = "R in WebAssembly"
description = "R cannot be compiled to WebAssembly yet, but we have seen a few conversations floating around."
tags = ["r language", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-02-17T16:55:42Z"

---

- [R in WebAssembly](#r-in-webassembly)
  - [Learn More](#learn-more)

# R in WebAssembly

R is a popular statistics-oriented language. An in-browser version of the language is now in development. This version patches the official R repository and adds browser tooling. We are unsure whether this version of R can be run in standalone WebAssembly runtimes like Wasmtime or Wamr.

At one point there was an interesting [conversation about WebAssembly](https://www.reddit.com/r/Rlanguage/comments/b4izog/compile_r_to_webassembly_and_use_as_a_data/) on the R language Subreddit. As far as we know, nothing came of it. But to settle one of the debates on that thread, [yes, it appears Fortran can be compiled to Wasm](https://github.com/DirkWillem/WebAssembly-Fortran-Demo)

## Learn More

Here are some great resources:

- [webR](https://github.com/georgestagg/webR), an in-browser implementation of R
- An excellent [blog post](https://blog.ouseful.info/2022/02/17/running-r-and-debian-linux-in-the-browser-via-wasm/) on webR.
- An [in-browser R console](https://www.mas.ncl.ac.uk/~ngs54/webR/) built using webR
- A [Fortran-to-Wasm](https://github.com/StarGate01/Full-Stack-Fortran) compiler toolchain.