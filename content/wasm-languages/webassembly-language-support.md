date = "2022-01-11T20:08:47Z"
title = "WebAssembly Language Support Matrix"
description = "Tracking the programming languages that compile to WebAssembly (Wasm). This page stays up to date with information about which languages can compile to Wasm, and what their language characteristics are."
template = "page"
tags = ["webassembly", "programming languages", "javascript", "python", "rust", "dotnet", "ruby"]
[extra]
author = "Fermyon Staff"

---

- [WebAssembly Support in Top 20 Languages](#webassembly-support-in-top-20-languages)
- [WebAssembly Specific Languages](#webassembly-specific-languages)
- [Other Notable Languages](#other-notable-languages)
- [How To Read These Charts](#how-to-read-these-charts)
- [Updates and Additions](#updates-and-additions)
- [Relevant Standards](#relevant-standards)

This guide tracks support for compiling a language to WebAssembly. It is organized into three sections: Support for the top 20 languages, WebAssembly-specific languages, and other notable languages. We track whether the language can be compiled to run in the browser, in other non-browser environments, and in a [WASI](https://wasi.dev) environment. In the detail page for each language, we do our best to not only state the current level of support, but also point to an array of useful resources.

## WebAssembly Support in Top 20 Languages

This reports on the top 20 languages from [RedMonk's ranking](https://redmonk.com/sogrady/2022/03/28/language-rankings-1-22/).
Some languages, like CSS, PowerShell, and "Shell", don't really have a meaningful expression in Wasm. However, we have left them here for completeness.

| Language                  | Core  | Browser | WASI | Spin SDK |
|---------------------------| ----- | ------- | ---- | -------- |
| [JavaScript][JavaScript]  | ✅    | ✅      | ✅   | ✅       |
| [Python][Python]          | ✅    | ⏳      | ✅   | ✅       |
| [Java][Java]              | ✅    | ✅      | ✅   | ⏳       |
| [PHP][PHP]                | ✅    | ✅      | ✅   | ❌       |
| CSS                       | N/A   | N/A     | N/A  | N/A      |
| [C# and .NET][CSHARP]     | ✅    | ✅      | ✅   | ✅       |
| [C++][CPLUSPLUS]          | ✅    | ✅      | ✅   | ❌       |
| [TypeScript][TypeScript]  | ✅    | ⏳      | ❌   | ✅       |
| [Ruby][Ruby]              | ✅    | ✅      | ✅   | ❌       |
| [C][C]                    | ✅    | ✅      | ✅   | ❌       |
| [Swift][Swift]            | ✅    | ✅      | ✅   | ⏳       |
| [R][R]                    | ❌    | ✅      | ❌   | ❌       |
| [Objective-C][ObjectiveC] | ?     | ❌      | ❌   | ❌       |
| Shell                     | N/A   | N/A     | N/A  | N/A      |
| [Scala (JVM)][Scala]      | ✅    | ✅      | ✅   | ⏳       |
| [Scala (native)][Scala]   | ⏳    | ❌      | ❌   | ❌       | 
| [Go][Go]                  | ✅    | ✅      | ✅   | ✅       |
| [PowerShell][PowerShell]  | ❌    | ❌      | ❌   | ❌       |
| [Kotlin (JVM)][Kotlin]    | ✅    | ✅      | ✅   | ⏳       |
| [Kotlin (Wasm)][Kotlin]   | ⏳    | ✅      | ⏳   | ❌       |
| [Rust][Rust]              | ✅    | ✅      | ✅   | ✅       |
| [Dart][Dart]              | ❌    | ⏳      | ❌   | ❌       |

* _Core_ means there is an implementation of WebAssembly 1.0
* _Browser_ means there is at least one browser implementation
* _WASI_ means the language supports at least Preview 1 of the WASI proposal
* _Spin SDK_ indicates there is a Spin SDK for the language

Anything with WASI or Spin SDK support runs on Fermyon Cloud, Spin, and Fermyon Platform.

## WebAssembly Specific Languages

| Language                         | Browser | CLI | WASI | Spin SDK |
| -------------------------------- | ------- | --- | ---- | -------- |
| [AssemblyScript][AssemblyScript] | ✅      | ✅  | ✅   | ❌       |
| [Grain][Grain]                   | ✅      | ✅  | ✅   | ❌       |
| [Motoko][Motoko]                 | ✅      | ✅  | ✅   | ❌       |

* _Browser_ means there is at least one browser implementation
* _CLI_ means the language has a CLI runtime mode
* _WASI_ means the language supports at least Preview 1 of the WASI proposal
* _Spin SDK_ indicates there is a Spin SDK for the language

## Other Notable Languages

These languages enjoy broad use (though perhaps not in the top 20) and have at least some degree of WebAssembly Support

| Language                  | Browser | CLI | WASI | Spin SDK |
| ------------------------- | ------- | --- | ---- | -------- |
| [Clojure][Clojure]        | ✅      | ✅  | ✅   | ⏳       |
| [COBOL][Cobol]            | ⏳      | ✅  | ⏳   | ❌       |
| [Erlang (BEAM)][Erlang]   | ⏳      | ⏳  | ⏳   | ❌       |
| [Haskell][Haskell]        | ✅      | ✅  | ✅   | ❌       |
| [Lisp][Lisp]              | ⏳      | ⏳  | ⏳   | ❌       |
| [Lua][Lua]                | ✅      | ❌  | ❌   | ❌       |
| [Perl][Perl]              | ✅      | ❌  | ❌   | ❌       |
| [Prolog][Prolog]          | ✅      | ❌  | ❌   | ✅       |
| [Zig][Zig]                | ✅      | ✅  | ✅   | ❌       |

* _Browser_ means there is at least one browser implementation
* _CLI_ means the language has a CLI runtime mode
* _WASI_ means the language supports at least Preview 1 of the WASI proposal
* _Spin SDK_ indicates there is a Spin SDK for the language

## How To Read These Charts

For each environment, we use the following icons to indicate a level of support:

- ✅  Usable
- ⏳ In progress
- ❌ Not implemented
- `N/A` Not applicable

Spin, Fermyon Platform and Fermyon Cloud require [WASI](https://wasi.dev) support. Any language that has a ✅ for WASI should be supported on the Fermyon Platform. The *Spin SDK* indicates that there is additional libraries available for Spin.

>> If you are interested in contributing to this guide, head on over to [the GitHub repo](https://github.com/fermyon/wasm-languages).

We are often asked which languages are best supported for production-grade WebAssembly. We suggest [C][C]/[C++][CPLUSPLUS], [Rust][Rust], and [AssemblyScript][AssemblyScript].

## Updates and Additions

The source for the WebAssembly Language Guide is located in a [public GitHub project](https://github.com/fermyon/wasm-languages). If you find errors, want to make additions, or have further corrections for us, the [issue queue](https://github.com/fermyon/wasm-languages/issues) is a great place to discuss.

If you're more interested in chatting about things, check out our [Discord server](https://discord.gg/AAFNfS7NGf) or hit us up a [@FermyonTech on Twitter](https://twitter.com/fermyontech)

## Relevant Standards

Throughout our pages, we talk about technologies like WASI, Wagi, and Spin. Many of these are backed by formal documents. See the [Standards] page for links to the relevant texts along with helpful resources.

[JavaScript]: /wasm-languages/javascript
[Python]: /wasm-languages/python
[Java]: /wasm-languages/java
[PHP]: /wasm-languages/php
[CPLUSPLUS]: /wasm-languages/cpp
[CSHARP]: /wasm-languages/c-sharp
[TypeScript]: /wasm-languages/typescript
[Ruby]: /wasm-languages/ruby
[C]: /wasm-languages/c-lang
[Swift]: /wasm-languages/swift
[R]: /wasm-languages/r-lang
[ObjectiveC]: /wasm-languages/objective-c
[Shell]: /wasm-languages/shell
[Scala]: /wasm-languages/scala
[Go]: /wasm-languages/go-lang
[PowerShell]: /wasm-languages/powershell
[Kotlin]: /wasm-languages/kotlin
[Rust]: /wasm-languages/rust
[Dart]: /wasm-languages/dart

[AssemblyScript]: /wasm-languages/assemblyscript
[Grain]: /wasm-languages/grain
[Motoko]: /wasm-languages/motoko

[Cobol]: /wasm-languages/cobol
[Clojure]: /wasm-languages/clojure
[Erlang]: /wasm-languages/erlang-beam
[Haskell]: /wasm-languages/haskell
[Lisp]: /wasm-languages/lisp
[Lua]: /wasm-languages/lua
[perl]: /wasm-languages/perl
[prolog]: /wasm-languages/prolog
[Zig]: /wasm-languages/zig

[Standards]: /wasm-languages/standards
