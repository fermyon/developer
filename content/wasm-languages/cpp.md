date = "2022-01-12T00:23:27Z"
title = "C++ in WebAssembly"
description = "C++ support is provided via C support."
tags = ["c++", "cpp", "webassembly", "qt"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-03-10T21:50:50Z"

---

- [C++ in WebAssembly](#c-in-webassembly)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Examples](#examples)
  - [Learn More](#learn-more)

# C++ in WebAssembly

C++ support for WebAssembly is handled by the [C language support](/wasm-languages/c-lang). And C language support is currently excellent.

However, specific C++ tools are maturing quickly. For example, Cheerp targets compiling C++ to WebAssembly with generated JavaScript interop.

>> Read the [C language guide](/wasm-languages/c-lang) for examples and more coverage of the WASI SDK, Clang, LLVM, and Emscripten

## Usage

For the most part, C++ support comes via C support. Both Emscripten and the C WASI SDK provide support for C++. Recent versions of LLVM and Clang support WebAssembly out of the box.

For this reason, it should be possible to compile C++ code both for browser targets and WASI targets. One thing to be aware of with C++, though, is that exception handling is not yet supported.

## Pros and Cons

Things we like:

- Because C is so well supported, C++ is among the better supported WebAssembly languages
- It is great that common compilers have added support
- We believe C++-centered tooling for WebAssembly is on the rise

We're neutral about:

- Setup is not easy, but it is doable

Things we're not big fans of:

- Features like exception handling are sorely missed

## Examples

See the [example on the C page](/wasm-languages/c-lang#examples).

## Learn More

Here are some great resources:

- The [WebAssembly and C++](https://neugierig.org/software/blog/2022/06/wasm-c++.html) blog post by Evan Martin is a great analysis of the state of C++ dev for WebAssembly.
- Cheerp is an [LLVM-based toolchain for compiling C++ to Wasm and JavaScript](https://github.com/leaningtech/cheerp-compiler). An overview [blog post](https://medium.com/leaningtech/cheerp-2-7-compile-cpp-to-webassembly-plus-javascript-c9b3ef7e318b) explains the basics.
- Mozilla has a tutorial on [Compiling C++ to Wasm with Emscripten](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)
- We love this [really cool slide presentation](https://nxxm.github.io/cppcon2018/CPP_EVERYWHERE_WITH_WASM.html#/) with a code walk of C++ in the browser
- Example of building [C++ WebAssembly files with Clang](https://github.com/PetterS/clang-wasm)
- The [yo-wasm](https://github.com/deislabs/yo-wasm) tool can help you get started faster. (Yes, we built `yo-wasm`.)
- The [QT GUI toolkit](https://www.qt.io/) supports [compiling to WebAssembly](https://wiki.qt.io/Qt_for_WebAssembly) for the browser. (We blogged about [LibreOffice in the browser](/blog/qt-libreoffice-wasm). That uses QT.)
- An article showing how to use [Emscripten to compile C++ to Wasm](https://medium.com/@tdeniffel/pragmatic-compiling-from-c-to-webassembly-a-guide-a496cc5954b8)
- TutorialsPoint has a tutorial for [compiling C++ to WebAssembly using Emscripten](https://www.tutorialspoint.com/webassembly/webassembly_working_with_cplusplus.htm), but it focuses only on the browser case.