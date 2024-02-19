date = "2022-01-12T00:23:27Z"
title = "Zig in WebAssembly"
description = "Zig can be compiled to WebAssembly."
tags = ["zig", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Zig in WebAssembly](#zig-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
  - [Learn More](#learn-more)
  - [Learn More](#learn-more-1)

# Zig in WebAssembly

Zig, a systems language, has official support for WebAssembly.
Zig's implementation uses LLVM to supply the compile target.

## Available Implementations

Zig's official implementation [supports WebAssembly](https://ziglang.org/download/0.4.0/release-notes.html#WebAssembly-Support).

## Usage

LLVM has a `wasm32-wasi` target, so Zig should be usable to build Fermyon Platform applications.
It can also be used in the browser.

For the most part, write your Zig code as usual. When compiling, use the target `wasm32-wasi`.

## Pros and Cons

Things we like:

- The Zig compiler is so nice, we now use it to compile our C as well as our Zig.

Things we're not big fans of:

- When we get Wasm-related errors, they can be really terse.


## Example

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

You must have [Zig](https://ziglang.org/learn/) installed.

Create a new Zig program:

```console
$ mkdir hello-zig
$ cd hello-zig
$ zig init-exe
```

Inside of the `src/` directory is a file named `main.zig`. Edit it as follows:

```zig
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("content-type: text/plain\n\n", .{});
    try stdout.print("Hello, World!\n", .{});
}
```

Now compile the program:

```console
zig build-exe -O ReleaseSmall -target wasm32-wasi src/main.zig
```

You can verify that it runs using `wasmtime`:

```console
$ wasmtime main.wasm
content-type: text/plain

Hello
```

Now you should have a `main.wasm` file. Create a `spin.toml` file to load the Zig program:

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "A Spin example HTTP application for Zig."
name = "spin-hello-zig"
trigger = { type = "http", base = "/" }
version = "1.0.0"

[[component]]
source = "main.wasm"
id = "zig-hello"
[component.trigger]
route = "/zig-hello"
executor = { type = "wagi" } # Note: We are running this using the Wagi spec
```

Run `spin up` and then use `curl` or a web browser to send a request:

```curl localhost:3000/zig-hello
Hello, World!
```

## Learn More

Here are some great resources:

## Learn More

Here are some great resources:

- The official [release notes](https://ziglang.org/download/0.4.0/release-notes.html#WebAssembly-Support) on WebAssembly support in Zig
- An example repo that shows how to [access the browser DOM](https://github.com/shritesh/zig-wasm-dom) in Zig
- A [short video](https://youtu.be/gJLIiF15wjQ) on Zig