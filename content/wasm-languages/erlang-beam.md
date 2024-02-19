date = "2022-01-12T00:23:27Z"
title = "Erlang (BEAM languages) in WebAssembly"
description = "BEAM-based languages are getting support for a WebAssembly runtime and compiler."
tags = ["language", "webassembly", "beam", "erlang", "elixir"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Erlang in WebAssembly](#erlang-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
  - [Learn More](#learn-more)

# Erlang in WebAssembly

Erlang is the most prominent of the [BEAM languages](https://github.com/llaisdy/beam_languages). Elixir is another popular BEAM language.

The Lumen project is endeavoring to create a BEAM runtime and a compiler so that the BEAM applications can be run in a WebAssembly host environment. 

## Available Implementations

Lumen is a [compiler and runtime](https://github.com/lumen/lumen).

## Usage

It is not immediately clear what the intended usage pattern for Lumen and WebAssembly is.

## Pros and Cons

Things we like:

- The idea of having both runtime and code compile is cool

Things we're not big fans of:

- We could not immediately figure out exactly how Lumen works, and builds appear to be failing
- The project might be stalled or unmaintained. It has not been updated in over a year.

## Example

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

No example is available at this time.

## Learn More

Here are some great resources:

- Erlang fans may also appreciate [Lunatic](https://lunatic.solutions/), a WebAssembly platform built using an Erlang-style OTP. It will soon support WASI.
