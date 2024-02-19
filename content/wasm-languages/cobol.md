date = "2022-01-12T00:23:27Z"
title = "COBOL in WebAssembly"
description = "COBOL can be compiled to WebAssembly."
tags = ["language", "webassembly", "cobol"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-03-10T21:50:50Z"

---

- [COBOL in WebAssembly](#cobol-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Example](#example)
  - [Pros and Cons](#pros-and-cons)
  - [Learn More](#learn-more)

# COBOL in WebAssembly

That venerable business language of the pre-2000 era is back. COBOL can be compiled to WebAssembly. We are not entirely sure, given the [blog's date](https://blog.cloudflare.com/cloudflare-workers-now-support-cobol/) whether this was originally an April Fool's Day joke. But... it does appear to work. This project has since been renamed to Cobweb.

CloudFlare Workers execute on CloudFlare's edge service. This particular COBOL implementation appears to be intended for that use case.

The Register summarized the project as follows:

> Using the GNUCobol project, you can compile COBOL code to C and then use Emscripten to compile the C code to WebAssembly. Cloudflare offers a tool called cobaul [now Cobweb] to simplify this process

## Available Implementations

The only implementation of COBOL in Wasm that we know of is CloudFlare's. However, they appear to have achieved most of the work by [patching a few things in GnuCOBOL](https://github.com/cloudflare/cobweb/tree/master/deps).

This version does not seem to have support for anything other than CloudFlare workers. For example, there is not Browser or WASI support.

## Example

While we could not generate an example for Wasmtime or Wagi, CloudFlare does have [an example for CloudFlare Workers](https://github.com/cloudflare/cobweb/tree/master/example).

## Pros and Cons

Things we like:
- Frankly, we think this project is hipster retro cool.

Things we're not big fans of:
- Cobweb does not seem to support anything other than CloudFlare Workers.

## Learn More

Here are some great resources:

- The [Cobweb project](https://github.com/cloudflare/cobweb) from CloudFlare
- El Reg wrote a [totally serious and not at all snarky review](https://www.theregister.com/2020/04/16/cloudflare_cobol/)