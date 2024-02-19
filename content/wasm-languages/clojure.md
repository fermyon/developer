date = "2023-10-26T00:23:27Z"
title = "Clojure in WebAssembly"
description = "Clojure can be compiled to WebAssembly via TeaVM."
tags = ["language", "webassembly"]
template = "page_lang"

[extra]
author = "Fermyon Staff"

---

- [Clojure in WebAssembly](#clojure-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Learn More](#learn-more)

# Clojure in WebAssembly

Clojure is a functional programming language that is part of the Java/JVM ecosystem.

## Available Implementations

<!--
List official implementations first, and other implementations as well.

Make sure to link to the website or repository
-->

The TeaVM can execute Java Bytecode inside of a WebAssembly runtime. Clojure is compiled to Java Bytecode.

We track Java Bytecode execution in the [Java section of the WebAssembly Language Guide](java).

It is also likely that you can take [Clojurescript](https://clojure.org/about/clojurescript), transform it to JavaScript (which is normal) and then [use a Javascript Wasm tool](https://clojure.org/about/clojurescript). In this case, it should be possible to use the full [Spin Javascript SDK]() within Clojurescript.

## Learn More

Here are some great resources:

- There's a thread on [Reddit](https://www.reddit.com/r/Clojure/comments/jkznto/web_assembly_clojure_current_state/) about compiling Clojure to Wasm directly
- The [Spin Javascript SDK](https://www.fermyon.com/blog/spin-js-sdk) just so happens to be maintained by the same team working on [TeaVM support for Wasm and WASI](https://github.com/fermyon/teavm-wasi)
<!-- 
Bullet list to things like blogs, projects, etc.
-->
