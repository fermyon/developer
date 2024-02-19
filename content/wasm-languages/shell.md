date = "2022-01-12T00:23:27Z"
title = "Shell in WebAssembly"
description = "Various projects are implementing shell-like implementations in WebAssembly"
tags = ["shell", "bash", "sh", "csh", "unix"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Shell in WebAssembly](#shell-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Learn More](#learn-more)

# Shell in WebAssembly

"Shell" refers to the class of UNIX-like languages that are designed for interactive prompts and shell scripts.
This includes sh (Borne Shell), bash (Borne Again Shell), csh (C Shell), and zsh (Z Shell) among others.

Unlike many of the languages in this guide, we assume that shell scripting using these languages is unlikely to be a desirable development experience. This is in part because, by nature, shell is designed to call and run other programs, which WebAssembly typically does not allow. However, we are starting to see some shell-like languages appear on the scene.

## Available Implementations

- [WASI FS Access](https://github.com/GoogleChromeLabs/wasi-fs-access) provides an example shell that works similarly to bash
- [WebAssembly.sh](https://github.com/wasmerio/webassembly.sh) is a basic shell integrated with Wasmer. 

## Usage

Both of the implementations above provide a shell-like in-browser experience.

## Learn More

Here are some great resources:

- RReverser's blog post on [writing a shell in Wasm](https://rreverser.com/webassembly-shell-with-a-real-filesystem-access-in-a-browser/)
- Aaron Turner's [WebAssembly.sh](https://webassembly.sh/) - the actual program, not a resource
