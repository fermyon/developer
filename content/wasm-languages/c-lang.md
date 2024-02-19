date = "2022-01-12T00:23:27Z"
title = "The C language in WebAssembly"
description = "C support for WebAssembly is great. As one of the earliest supported languages, it enjoys broad support."
tags = ["c", "c language", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-03-10T21:50:50Z"

---
- [C in WebAssembly](#c-in-webassembly)
  - [Available Implementations](#available-implementations)
    - [WASI SDK and Clang/LLVM](#wasi-sdk-and-clangllvm)
    - [Emscripten](#emscripten)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Examples](#examples)
    - [Compiling C Using the Zig Compiler Toolchain](#compiling-c-using-the-zig-compiler-toolchain)
  - [Learn More](#learn-more)

# C in WebAssembly

C is a low-level programming language that is typically compiled into a native executable. It is one of the most well-known and frequently used languages.

C is one of the best-supported WebAssembly languages. The original developers of WebAssembly had C in mind as a target language, and have put significant work into C support.

Because C++ (aka CPP) is a C language, it is frequently the case that C++ programs can also be compiled to WebAssembly. In addition to this document, there is also a WebAssembly Language Support page [specifically for C++](/wasm-languages/cpp).

## Available Implementations

There are a few ways to compile C (and C++) to WebAssembly.

### WASI SDK and Clang/LLVM

Using the [WASI SDK](https://github.com/WebAssembly/wasi-sdk), you can compile C code into WebAssembly with WASI support. Later in this guide, we show an example built this way.

The repo above provides most of the tools you will need to build code this way.

### Emscripten

When developing Browser-oriented WebAssembly code, many developers use [Emscripten](https://emscripten.org/index.html).

> Emscripten is a complete compiler toolchain to WebAssembly, using LLVM, with a special focus on speed, size, and the Web platform.

Mozilla's [Compiling C/C++ Guide](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm) is a great starting point.

Since our guide is less interested in browser-specific applications of WebAssembly, we do not cover Emscripten in our examples below.

## Usage

C support for WebAssembly is in exceptional condition. It may be used to port old libraries to WebAssembly or to write new (especially performance-focused) code that can be run as WebAssembly.

While C is a low-level language, not all of the `stdlib` is supported by WebAssembly's sandboxed runtime. Sockets, for example, are not currently supported. For that reason, not all C programs can be compiled to WebAssembly (and some that may appear to compile may not run as expected).

It is good to be familiar with both [WASI](https://wasi.dev) and the WebAssembly runtime's host extensions when writing or porting C or C++ code.

## Pros and Cons

Things we like about C/C++ as a WebAssembly language:

- For the most part, it works the same in WebAssembly as it does anywhere else
- Regular C/C++ tooling works well
- Binary sizes tend to be compact
- Over and above regular C/C++ code, compiling it to WebAssembly improves security
- Many C/C++ libraries can be compiled to WebAssembly

We're neutral about:

- The toolchain, which is neither better nor worse than the regular C/C++ tooling

Things we're not big fans of:

- It can be frustrating to figure out which existing libraries can be ported
- C++ exceptions are not yet supported, nor are threads

## Examples

Since it supports the WASI specification, C can be used on the Fermyon Platform with Wagi and Spin. Our example uses the [WASI SDK](https://github.com/WebAssembly/wasi-sdk).

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

The first step is to install the WASI SDK. If you use this broadly, it may be a good idea to install it in a common location. For our example, though, we will create a project and install the SDK inside of that project.

You can download the latest version from the [WASI releases page](https://github.com/WebAssembly/wasi-sdk/releases).
At the time of this writing, the latest version is `14.0`. Here's a command line example for a Mac:

```console
$ curl -O -sSL https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-14/wasi-sdk-14.0-macos.tar.gz
$ tar xf wasi-sdk-14.0-macos.tar.gz
```

Now we can write a simple C program using WASI. Here is the text ouf `hello.c`:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("Content-Type: text/plain\n\n");
    printf("Hello, World\n");
}
```

To compile this, we will use the `clang` that comes with the WASI SDK.

```console
./wasi-sdk-14.0/bin/clang --sysroot wasi-sdk-14.0/share/wasi-sysroot/ hello.c -o hello.wasm
```

>> Newer versions of Clang may only need the command `clang --target=wasm32-wasi --sysroot=wasi-sdk-14.0/share/wasi-sysroot/  hello.c -o hello.wasm`

The above should produce a file named `hello.wasm`. We can execute that with Wasmtime:

```
$ wasmtime hello.wasm
Content-Type: text/plain

Hello, World
```

To run this using Wagi, we need to create a simple `modules.toml`:

```toml
[[module]]
module = "hello.wasm"
route = "/"
```

Then we can run Wagi:

```console
$ wagi -c modules.toml
```

And using Curl or a web browser, we can hit `http://localhost:3000` and see the output:

```console
$ curl localhost:3000
Hello, World
```

### Compiling C Using the Zig Compiler Toolchain

Users have reported that it is easier to compile C programs with Zig. With Zig, you will not need to separately install the WASI SDK, as it is included with the toolchain.

Once again, here is our program:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("Content-Type: text/plain\n\n");
    printf("Hello, World\n");
}
```

To compile with Zig, use a `zig build-exe` with the `-lc` ("library C") flag:

```console
$ zig build-exe -O ReleaseSmall -target wasm32-wasi hello.c -lc
```

Now the `hello.wasm` can be run in `wasmtime` or `spin`:

```console
$ wasmtime hello.wasm
Content-Type: text/plain

Hello, World
```

## Learn More

Here are some great resources:

- Mozilla has a tutorial on [Compiling C/C++ to Wasm with Emscripten](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)
- The [yo-wasm](https://github.com/deislabs/yo-wasm) tool can help you get started faster. (Yes, we built `yo-wasm`.)
- Here's an example of a [Wagi fileserver written in C](https://github.com/deislabs/wagi-fileserver-c)
- If you want to work directly with the [Wasi libc](https://github.com/WebAssembly/wasi-libc), you can do that, too. 