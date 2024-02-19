date = "2022-01-12T00:23:27Z"
title = "Scala in WebAssembly"
description = "Scala native can be compiled to WebAssembly with a somewhat lengthy process. Some Java tools work for compiling Scala to WebAssembly, too."
tags = ["scala", "java", "kotlin", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Scala in WebAssembly](#scala-in-webassembly)

# Scala in WebAssembly

Like Kotlin, Scala began as a JVM-specific language and has moved toward other backends like LLVM.
Therefore, there are two paths for compiling Scala to WebAssembly:

1. Use Java tools to compile Scala/bytecode to WebAssembly
2. Use Scala Native toolchains to compile Scala to WebAssembly

If you are interested in the first way, we cover several tools in the [Java section](/wasm-languages/java).
Here, we'll look at the case for Scala Native.

Thus far, the only hint we have seen of someone compiling Scala Native to WebAssembly is this [GitHub repository](https://github.com/shadaj/scala-native-wasm).
