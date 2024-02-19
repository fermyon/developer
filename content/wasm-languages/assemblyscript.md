date = "2022-01-12T00:23:27Z"
title = "AssemblyScript in WebAssembly"
description = "AssemblyScript is a WebAssembly-centered language. It is one of the best languages if you want to target only WebAssembly."
tags = ["assemblyscript", "typescript", "javascript", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-03-10T21:50:50Z"

---

- [AssemblyScript in WebAssembly](#assemblyscript-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
    - [Running in `wasmtime`](#running-in-wasmtime)
  - [Learn More](#learn-more)

# AssemblyScript in WebAssembly

Inspired by [TypeScript](/wasm-langauges/typescript), AssemblyScript is a strongly typed language. It was written specifically with WebAssembly in mind, and the entire toolchain is oriented around WebAssembly.

Since it has a [WASI implementation](https://github.com/jedisct1/as-wasi), AssemblyScript can be used on the Fermyon Platform for writing Wagi or Spin apps.

It is also well-suited for browser-based applications. And it can run inside of Wasmtime and other CLIs.

## Available Implementations

AssemblyScript has an [official implementation](https://www.assemblyscript.org/).

## Usage

To get started with AssemblyScript, you will need to have a [Node.js environment](https://nodejs.org/en/), including NPM.

From there, you can get started by creating a new Node project.

## Pros and Cons

Things we like about AssemblyScript:

- Familiar to TypeScript and JavaScript developers
- Because of that, we can use our normal tools for dev
- Good integration with NPM and the Node ecosystem
- Support for common JS idioms (like `Console.log` instead of `println`)

We're neutral about:

- File sizes, which are larger than we expected, but not enough to be a problem
- The automatic generation of WAT files, unoptimized binaries, and things we don't normally use

Things we're not big fans of:

- It's just different enough from TypeScript to be frustrating at times.
- AssemblyScript WTF-16 instead of the more common UTF-8/UTF-16. This is a hotly debated issue, but our preference is for UTF-8.

## Example

This section provides a basic example of building AssemblyScript from source.

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

Set up the project like this:

```console
$ npm init
# Answer questions
$ npm install --save @assemblyscript/loader

added 1 package, and audited 2 packages in 986ms

found 0 vulnerabilities
$ npm install --save-dev assemblyscript

added 6 packages, and audited 8 packages in 2s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities 
```

Now use `npx` to scaffold out your new project:

```console
$ npx asinit .
Version: 0.19.23

This command will make sure that the following files exist in the project
directory '/Users/technosophos/Code/AssemblyScript/hello':

  ./assembly
  Directory holding the AssemblyScript sources being compiled to WebAssembly.

  ./assembly/tsconfig.json
  TypeScript configuration inheriting recommended AssemblyScript settings.

  ./assembly/index.ts
  Example entry file being compiled to WebAssembly to get you started.

  ./build
  Build artifact directory where compiled WebAssembly files are stored.

  ./build/.gitignore
  Git configuration that excludes compiled binaries from source control.

  ./asconfig.json
  Configuration file defining both a 'debug' and a 'release' target.

  ./package.json
  Package info containing the necessary commands to compile to WebAssembly.

  ./index.js
  Main file loading the WebAssembly module and exporting its exports.

  ./tests/index.js
  Example test to check that your module is indeed working.

The command will try to update existing files to match the correct settings
for this instance of the compiler in '/Users/technosophos/Code/AssemblyScript/hello/node_modules/assemblyscript'.

Do you want to proceed? [Y/n] y
# More output that is similar to above
```

At this point you should have a directory structure that looks like this:

```console
$ tree -L 2
.
├── asconfig.json
├── assembly
│   ├── index.ts
│   └── tsconfig.json
├── build
├── index.js
├── node_modules
│   ├── @assemblyscript
│   ├── assemblyscript
│   ├── binaryen
│   ├── buffer-from
│   ├── long
│   ├── source-map
│   └── source-map-support
├── package-lock.json
├── package.json
└── tests
    └── index.js

11 directories, 7 files
```

The `assembly/` directory is where the code lives.

Add WASI support by installing the `as-wasi` package:

```console
$ npm install --save as-wasi

added 1 package, and audited 9 packages in 1s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Now we can write a simple AssemblyScript module:

```typescript
import "wasi";
import { Console } from "as-wasi";

Console.log("content-type: text/plain");
Console.log("");
Console.log("Hello, World");
```

While based on JavaScript and TypeScript, AssemblyScript is not a typical scripting language. It must be compiled before it can be executed. The AssemblyScript tools configure NPM to run the compiler for us:

```console
$ npm run asbuild

> hello@1.0.0 asbuild
> npm run asbuild:untouched && npm run asbuild:optimized

> hello@1.0.0 asbuild:untouched
> asc assembly/index.ts --target debug

> hello@1.0.0 asbuild:optimized
> asc assembly/index.ts --target release
```

This creates two builds in the `builds/` directory:

```console
$ ls -lah build
total 1760
drwxr-xr-x   9 technosophos  staff   288B Mar  8 16:02 .
drwxr-xr-x  11 technosophos  staff   352B Mar  8 16:07 ..
-rw-r--r--   1 technosophos  staff    27B Mar  8 14:27 .gitignore
-rw-r--r--   1 technosophos  staff   5.1K Mar  8 16:11 optimized.wasm
-rw-r--r--   1 technosophos  staff   373K Mar  8 16:11 optimized.wasm.map
-rw-r--r--   1 technosophos  staff    41K Mar  8 16:11 optimized.wat
-rw-r--r--   1 technosophos  staff   9.7K Mar  8 16:11 untouched.wasm
-rw-r--r--   1 technosophos  staff   375K Mar  8 16:11 untouched.wasm.map
-rw-r--r--   1 technosophos  staff    60K Mar  8 16:11 untouched.wat
```

Map files are for the browser. WAT files are large text file versions of the WebAssembly. The `.wasm` files are the ones we care about. In general, the `optimized.wasm` file is the one we use.

<!-- markdownlint-disable-next-line titlecase-rule -->
### Running in `wasmtime`

This is how the module is run in [wasmtime](https://wasmtime.dev/):

```console
$ wasmtime build/optimized.wasm
content-type: text/plain

Hello, World
```

The module emits `content-type` information and an empty line, so it can be executed in any Wagi runtime such as Wagi, Spin, or Wagi.NET.

Here's an example with [Wagi](https://github.com/deislabs/wagi).

Create a simple `modules.toml`:

```toml
[[module]]
module = "build/optimized.wasm"
route = "/"
```

Then run Wagi to serve our new module at `http://localhost:3000/`:

```console
$ wagi -c modules.toml
No log_dir specified, using temporary directory /var/folders/rk/mkbs8vx12zs0gkm680h_gth00000gn/T/.tmpTxamNm for logs
Ready: serving on http://127.0.0.1:3000
```

At this point you can use a web browser or curl to check the results:

```console
$ curl localhost:3000                                       
Hello, World
```
 
For more on running AssemblyScript in the browser, read the [AssemblyScript documentation](https://www.assemblyscript.org/)

## Learn More

Here are some great resources:

- Wasm-by-Example has a good [code walkthrough](https://wasmbyexample.dev/examples/wasi-hello-world/wasi-hello-world.assemblyscript.en-us.html)
- This [blog post](https://blog.ttulka.com/learning-webassembly-9-assemblyscript-basics) covers the basics.
- Here's an example of [A Wagi app written in AssemblyScript](https://github.com/deislabs/hello-wagi-as)
- Fastly's blog [also has an intro to AssemblyScript](https://www.fastly.com/blog/meet-assemblyscript-your-next-computing-language)
- [yo-wasm](https://github.com/deislabs/yo-wasm) can help you generate an AssemblyScript project