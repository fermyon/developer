date = "2022-01-12T00:23:27Z"
title = "Perl in WebAssembly"
description = "A Perl interpreter in WebAssembly is available."
tags = ["perl", "language", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2023-10-26T00:50:50Z"

---

- [Perl in WebAssembly](#perl-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Learn More](#learn-more)

# Perl in WebAssembly

Perl (Practical Extraction and Reporting Language) was the _lingua franca_ of the early web.
A powerful scripting language, it became a popular way to write CGI.

Larry Wall, its creator, once called it the "first post-modern programming language"
because it was driven more by a desire to add the things developers liked than to follow specific academic strictures.
Its regular expressions have lived on, influencing the designs of countless
other programming languages.

## Available Implementations

There is no official Perl distribution that is WebAssembly-capable.

The [WebPerl project](https://webperl.zero-g.net/) provides a browser-centered Perl interpreter in Wasm.
Build instructions support Perl 5.26 and newer.

WebPerl does not provide a WASI implementation, and does not appear to be runnable outside of a browser.
But the maintainer has suggested he'd [like to add WASI support](https://github.com/haukex/webperl/issues/23).

## Usage

WebPerl describes [usage inside of a browser](https://webperl.zero-g.net/using.html).

## Pros and Cons

Things we like:

- The project supports a tremendous number of features, including a way to bundle PMs.
- The project is impressively well thought out
- Documentation covers a wide variety of cases and uses
- There is even a sample IDE

Things we're not big fans of:

- It runs only in the browser
- The project seems to be stagnant

## Learn More

Here are some great resources:

- The [source code of WebPerl](https://github.com/haukex/webperl)
- We [asked](https://github.com/haukex/webperl/issues/23) if there are plans for a WASI version of WebPerl
