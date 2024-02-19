date = "2022-07-25T00:23:27Z"
title = "Related Standards"
description = "WebAssembly relies upon many different standards. This page catalogs standards and where to work on them."
tags = ["standards", "wasi", "webassembly", "wasm", "components"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-07-25T21:50:50Z"

---

- [WebAssembly Standard and W3 Working Group](#webassembly-standard-and-w3-working-group)
- [WebAssembly System Interface (WASI)](#webassembly-system-interface-wasi)
  - [The Component Model](#the-component-model)
- [WebAssembly Gateway Interface (Wagi)](#webassembly-gateway-interface-wagi)
- [Spin Improvement Proposals (SIPs)](#spin-improvement-proposals-sips)

This page tracks WebAssembly standards along with useful resources for understanding those standards or getting involved.

## WebAssembly Standard and W3 Working Group

WebAssembly is standardized by W3C, the same group that standardizes CSS, HTML, and HTTP.

- The [W3's official Wasm site](https://www.w3.org/wasm/)
- Almost all of the working drafts of proposed standards are [in the WebAssembly GitHub Org](https://github.com/WebAssembly)
    - All proposals [are in one repo](https://github.com/WebAssembly/proposals)
    - The [meetings repo](https://github.com/WebAssembly/meetings) is good to find out when things are happening
- The [W3 GitHub repo](https://github.com/w3c/wasm-wg/)
- The [W3 Community Page](https://www.w3.org/community/webassembly/)

## WebAssembly System Interface (WASI)

- The [WASI site](https://wasi.dev) is the main page
- The [WASI repo](https://github.com/WebAssembly/WASI)
- The working group [charter](https://github.com/WebAssembly/WASI/blob/main/Charter.md)
- Most of the WASI proposed standards are [in the WebAssembly GitHub](https://github.com/search?q=org%3AWebAssembly+wasi)
- The [WASI libc library](https://github.com/WebAssembly/wasi-libc) is the C library for core WASI

### The Component Model

One very important WebAssembly specification is the Component Model.

- The [proposal](https://github.com/WebAssembly/component-model)
- The [design and specification](https://github.com/WebAssembly/component-model)
- A great [intro blog post](https://www.fermyon.com/blog/webassembly-component-model)
- The [Canonical ABI](https://github.com/WebAssembly/component-model/blob/main/design/mvp/CanonicalABI.md)

## WebAssembly Gateway Interface (Wagi)

DeisLabs (at Microsoft) proposed Wagi based on the CGI 1.1 specification.

- The architecture document is [in the Wagi server repo](https://github.com/deislabs/wagi/blob/main/docs/architecture.md)
- The description of the [environment variables](https://github.com/deislabs/wagi/blob/main/docs/environment_variables.md)
- Spin's [Wagi support](https://spin.fermyon.dev/http-trigger/)

## Spin Improvement Proposals (SIPs)

- The [source repository](https://github.com/fermyon/spin/tree/main/docs/content/sips)
- The [published versions](https://spin.fermyon.dev/sips/index)
