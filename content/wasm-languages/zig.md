date = "2024-02-25T01:01:01Z"
title = "Zig in WebAssembly"
description = "Zig can be compiled to WebAssembly."
tags = ["zig", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/zig.md"

---

Zig, a systems language, has official support for WebAssembly.
Zig's implementation uses LLVM to supply the compile target.

## Available Implementations

Zig [supports building for WebAssembly](https://ziglang.org/documentation/0.11.0/#WebAssembly) out of the box.

## Usage

Zig supports [generating code for all targets that LLVM supports](https://ziglang.org/documentation/0.11.0/#Targets). LLVM has a `wasm32-wasi` target, so Zig is usable to build Fermyon Platform applications.
It can also be used in the browser.

For the most part, write your Zig code as usual. When compiling, use the target `wasm32-wasi`.

## Pros and Cons

Things we like:

- The Zig compiler is so nice that we now use it to compile our C and Zig.

Things we're not big fans of:

- When we get Wasm-related errors, they can be really terse.

# Examples

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples). In these examples, we initially run our applications using the [wasmtime](https://github.com/bytecodealliance/wasmtime) runtime and then progress and demonstrate how to run Zig applications using the [Spin framework](https://spinframework.dev/v2/index).

You must have [Zig](https://ziglang.org/learn/) installed. If you haven't already done so, please also go ahead and [install Spin](https://spinframework.dev/v2/install).

## Example 1

Below is a WebAssembly System Interface (WASI) example where Zig uses the standard library to read command line arguments.

Create a new Zig program:

```bash
$ mkdir hello-zig
$ cd hello-zig
$ zig init-exe
info: Created build.zig
info: Created src/main.zig
info: Next, try `zig build --help` or `zig build run`
```

Inside the `src/` directory is a file named `main.zig`. Edit it as follows:

```
const std = @import("std");

pub fn main() !void {
    var general_purpose_allocator = std.heap.GeneralPurposeAllocator(.{}){};
    const gpa = general_purpose_allocator.allocator();
    const args = try std.process.argsAlloc(gpa);
    defer std.process.argsFree(gpa, args);

    for (args, 0..) |arg, i| {
        std.debug.print("{}: {s}\n", .{ i, arg });
    }
}
```

We can now build and run the WASI example:

```bash
$ zig build-exe src/main.zig -target wasm32-wasi
```

As mentioned above, we are going to run our application using the [wasmtime](https://github.com/bytecodealliance/wasmtime) runtime:

```bash
$ wasmtime src/main.wasm 123 hello
0: main.wasm
1: 123
2: hello
```

## Example 2

In this example we are going to build a "hello world" WAGI application using Zig. We will then run the Wasm binary with wasmtime to view the output in the console, and then run it again as a [Spin](https://spinframework.dev/v2/index) application served over HTTP.

Create a new Zig program:

```bash
$ mkdir hello-zig
$ cd hello-zig
$ zig init-exe
info: Created build.zig
info: Created src/main.zig
info: Next, try `zig build --help` or `zig build run`
```

Inside the `src/` directory is a file named `main.zig`. Edit it as follows:

```
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("content-type: text/plain\n\n", .{});
    try stdout.print("Hello, World!\n", .{});
}
```

Now compile and run the program using wasmtime:

```bash
$ zig build-exe -O ReleaseSmall -target wasm32-wasi src/main.zig
$ wasmtime main.wasm    
content-type: text/plain
Hello, World!
```

### Using Spin

Create a new `spin.toml` file and edit it as follows:

```toml
spin_manifest_version = 2

[application]
name = "spin-hello-zig"
version = "0.1.0"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "spin-hello-zig"

[[trigger.http]]
route = "/..."
executor = { type = "wagi" } # Note: We are running this using the Wagi spec
component = "spin-hello-zig"

[component.spin-hello-zig]
source = "main.wasm"
```

Once we have the Spin manifest file (`spin.toml`), we can run `spin up`:

```bash
spin up     
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  spin-hello-zig: http://127.0.0.1:3000 (wildcard)
```

Then, use `curl` (in a new terminal) or a web browser to send a request:

```bash
$ curl -i localhost:3000
HTTP/1.1 200 OK
content-type: text/plain
content-length: 14
date: Mon, 26 Feb 2024 02:08:33 GMT

Hello, World!
```

## Learn More

Here are some great resources:

- The official [release notes](https://ziglang.org/download/0.11.0/release-notes.html#WebAssembly-Support) on WebAssembly support in Zig
- An example repo that shows how to [access the browser DOM](https://github.com/shritesh/zig-wasm-dom) in Zig
- The [Zig GitHub repository](https://github.com/ziglang/zig)
