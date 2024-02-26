date = "2024-02-18T01:01:01Z"
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

Zig supports [generating code for all targets that LLVM supports](https://ziglang.org/documentation/0.11.0/#Targets). LLVM has a `wasm32-wasi` target, so Zig should be usable to build Fermyon Platform applications.
It can also be used in the browser.

For the most part, write your Zig code as usual. When compiling, use the target `wasm32-wasi`.

## Pros and Cons

Things we like:

- The Zig compiler is so nice that we now use it to compile our C and Zig.

Things we're not big fans of:

- When we get Wasm-related errors, they can be really terse. However, since the original publishing of this page (around Zig 0.4.0), updates have been made to the error section of the official Zig documentation e.g. explaining how [Zig's error handling](https://ziglang.org/documentation/0.11.0/#toc-Common-errdefer-Slip-Ups) includes `defer` statements and `errdefer`, which triggers on block-exit errors. For example:

```zig
fn createFoo(param: i32) !Foo {
    const foo = try tryToAllocateFoo();
    // now we have allocated foo. we need to free it if the function fails.
    // but we want to return it if the function succeeds.
    errdefer deallocateFoo(foo);

    const tmp_buf = allocateTmpBuffer() orelse return error.OutOfMemory;
    // tmp_buf is truly a temporary resource, and we for sure want to clean it up
    // before this block leaves scope
    defer deallocateTmpBuffer(tmp_buf);

    if (param > 1337) return error.InvalidParam;

    // here the errdefer will not run since we're returning success from the function.
    // but the defer will run!
    return foo;
}
```

# Examples

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples). In these examples, we initially run our applications using the [wasmtime](https://github.com/bytecodealliance/wasmtime) runtime and then progress and demonstrate how to run Zig applications using the [Spin framework](https://developer.fermyon.com/spin/v2/index).

You must have [Zig](https://ziglang.org/learn/) installed. If you haven't already done so, please also go ahead and [install Spin](https://developer.fermyon.com/spin/v2/install).

## Example 1

Below is a WebAssembly System Interface (WASI) example where Zig uses the standard library to read command line arguments.

Create a new Zig program:

```console
$ mkdir hello-zig
$ cd hello-zig
$ zig init-exe
info: Created build.zig
info: Created src/main.zig
info: Next, try `zig build --help` or `zig build run`
```

Inside the `src/` directory is a file named `main.zig`. Edit it as follows:

```zig
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

```console
$ zig build-exe src/main.zig -target wasm32-wasi
```

As mentioned above, we are going to run our application using the [wasmtime](https://github.com/bytecodealliance/wasmtime) runtime:

```console
$ wasmtime src/main.wasm 123 hello
0: main.wasm
1: 123
2: hello

```

## Example 2

In this example we are going to build a hello-world type of example (print a response) and build using Zig. We will then run the application with wasmtime, and then the Zig-built `.wasm` binary will run inside a [Spin](https://developer.fermyon.com/spin/v2/index) application.

Create a new Zig program:

```console
$ mkdir hello-zig
$ cd hello-zig
$ zig init-exe
info: Created build.zig
info: Created src/main.zig
info: Next, try `zig build --help` or `zig build run`
```

Inside the `src/` directory is a file named `main.zig`. Edit it as follows:

```zig
const std = @import("std");

pub fn main() !void {
    // Prints to stderr (it's a shortcut based on `std.io.getStdErr()`)
    std.debug.print("All your {s} are belong to us.\n", .{"codebase"});

    // stdout is for the actual output of your application, for example if you
    // are implementing gzip, then only the compressed bytes should be sent to
    // stdout, not any debugging messages.
    const stdout_file = std.io.getStdOut().writer();
    var bw = std.io.bufferedWriter(stdout_file);
    const stdout = bw.writer();

    try stdout.print("Run `zig build test` to run the tests.\n", .{});

    try bw.flush(); // don't forget to flush!
}

test "simple test" {
    var list = std.ArrayList(i32).init(std.testing.allocator);
    defer list.deinit(); // try commenting this out and see if zig detects the memory leak!
    try list.append(42);
    try std.testing.expectEqual(@as(i32, 42), list.pop());
}
```

Now compile and run the program using wasmtime:

```console
$ zig build-exe -O ReleaseSmall -target wasm32-wasi src/main.zig
$ wasmtime main.wasm
All your codebase are belong to us.
Run `zig build test` to run the tests.
```

Now you should have a `main.wasm` file:

```console
$ tree .
.
├── build.zig
├── main.wasm
├── main.wasm.o
├── src
│   └── main.zig
└── zig-cache
    ├── h
    ├── o
    │   └── c8d45f36408768ee488d7b453a8723a3
    │       └── builtin.zig
    └── z
        └── b78f88b24cc6c1a13507ecfccf9702c3
```

### Using Spin

We need to perform a couple of steps to make this Zig application run inside the Spin framework. Firstly, we create a new `spin.toml` file and edit it as follows:

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

Next, we have to update the Zig source code slightly to ensure the response object has a `content-type`. If we just use the default Zig source code Spin will produce an error similar to the following:

```console
ERROR spin_http::wagi: HTTP 500 error error=Exactly one of 'location' or 'content-type' must be specified
```

Run `spin up`:

```console
spin up     
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  spin-hello-zig: http://127.0.0.1:3000 (wildcard)
```

Then, use `curl` (in a new terminal) or a web browser to send a request:

```curl
$ curl -i localhost:3000
HTTP/1.1 500 Internal Server Error
content-length: 61
date: Mon, 26 Feb 2024 01:18:46 GMT

Exactly one of 'location' or 'content-type' must be specified% 
```

## Learn More

Here are some great resources:

## Learn More

Here are some great resources:

- The official [release notes](https://ziglang.org/download/0.11.0/release-notes.html#WebAssembly-Support) on WebAssembly support in Zig
- An example repo that shows how to [access the browser DOM](https://github.com/shritesh/zig-wasm-dom) in Zig
- A [short video](https://youtu.be/gJLIiF15wjQ) on Zig
