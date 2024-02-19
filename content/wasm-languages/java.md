date = "2022-01-12T00:23:27Z"
title = "Java in WebAssembly"
description = "Java can be compiled to WebAssembly by a number of projects. Most are currently focused on the browser."
tags = ["java", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Java in WebAssembly](#java-in-webassembly)
  - [Uses](#uses)
  - [Available Implementations](#available-implementations)
  - [Learn More](#learn-more)

# Java in WebAssembly

Many exciting WebAssembly things are happening in the Java ecosystem.
There are a few projects that are rapidly maturing, and that can generate browser-oriented JS.

The various projects handle memory management differently.
Their feature sets also differ.

## Uses

All of the existing Java implementations are browser oriented, and are designed to let developers write Java and link to it from JavaScript.

## Available Implementations

There is a working [Wasm plus WASI version of TeaVM](https://github.com/fermyon/teavm-wasi) that allows you to run Java apps in Spin and other WASI-compliant runtimes (like WasmTime).

Here's a detailed video by Joel Dice:
<iframe width="560" height="315" src="https://www.youtube.com/embed/MFruf7aqcbE?si=tAdqWPq1W7LqvT0p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

- The [Bytecoder project](https://mirkosertic.github.io/Bytecoder/) cross-compiles Java to WebAssembly that can be executed in the browser
- The [TeaVM project](https://teavm.org/) has experimental support for browser-based WebAssembly
- A dedicate WebAssembly compiler called [JWebAssembly](https://github.com/i-net-software/JWebAssembly) can translate any JVM bytecode to WebAssembly, including Groovy, Clojure, and Kotlin. It, too, is browser-centric.
- [CheerpJ](https://leaningtech.com/cheerpj/) is much more ambitious, handling the UI as well

## Learn More

Here are some great resources:

- [WebAssembly for the Java Geek](https://www.javaadvent.com/2022/12/webassembly-for-the-java-geek.html) details how Wasm's bytecodes and virtual machine differ from Java's, and why this makes a difference.
- An [in-depth blog](http://blog.dmitryalexandrov.net/webassembly-for-java-developers/) showing practical ways to run Java as Wasm
- Does Wasm remind you of Java Applets? Then read [this blog post](https://steveklabnik.com/writing/is-webassembly-the-return-of-java-applets-flash)
- [GraalVM](https://www.graalvm.org/reference-manual/wasm/) has gained a lot of momentum as a WebAssembly runtime, though it does not appear to support compiling from languages to WebAssembly.
- The New Stack wrote about [Java and WebAssembly](https://thenewstack.io/webassembly/javas-history-could-point-the-way-for-webassembly/) from a more historical perspective
- Fermyon posted about [the differences between different languages](https://www.fermyon.com/blog/complex-world-of-wasm-language-support) and how that makes a difference with WebAssembly
- Joel Dice's [WasmDay talk on JVM and WASI](https://youtu.be/MFruf7aqcbE?si=ZfvfuZIL6-JwFJMN)
- [Hands on with Java and Wasm](https://www.infoworld.com/article/3692456/hands-on-with-java-and-wasm.html) at InfoWorld provides a TeaVM example targeted for the browser.
