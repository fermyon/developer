date = "2024-02-18T01:01:01Z"
title = "AssemblyScript in WebAssembly"
description = "AssemblyScript is a WebAssembly-centered language. It is one of the best languages if you want to target only WebAssembly."
tags = ["assemblyscript", "typescript", "javascript", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-03-10T21:50:50Z"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/assemblyscript.md"

---

Inspired by [TypeScript](./typescript.md), AssemblyScript is a strongly typed language. It was written specifically with WebAssembly in mind, and the entire toolchain is oriented around WebAssembly.

Since it has a [WASI implementation](https://github.com/AssemblyScript/wasi-shim), AssemblyScript can be used on the Fermyon Platform for writing Wagi or Spin apps.

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

```bash
$ mkdir AssemblyScript-example
$ cd AssemblyScript-example
$ npm init
# Answer questions
```

Install the AssemblyScript compiler:

```bash
$ npm install --save-dev assemblyscript
$ npm install --save @assemblyscript/loader
```

Install the [WASI shim](https://github.com/AssemblyScript/wasi-shim)

```bash
$ npm install --save-dev @assemblyscript/wasi-shim
```

Now use `npx` to scaffold out your new project:

```console
$ npx asinit .
Version: 0.27.24

This command will make sure that the following files exist in the project
directory 'AssemblyScript-example':

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

  ./tests/index.js
  Stater test to check that the module is functioning.

  ./index.html
  Starter HTML file that loads the module in a browser.

The command will try to update existing files to match the correct settings
for this instance of the compiler in 'AssemblyScript-example/node_modules/assemblyscript'.

Do you want to proceed? [Y/n] Y

- Making sure that the project directory exists...
  Exists: AssemblyScript-example

- Making sure that the 'assembly' directory exists...
  Created: AssemblyScript-example/assembly

- Making sure that 'assembly/tsconfig.json' is set up...
  Created: AssemblyScript-example/assembly/tsconfig.json

- Making sure that 'assembly/index.ts' exists...
  Created: AssemblyScript-example/assembly/index.ts

- Making sure that the 'build' directory exists...
  Created: AssemblyScript-example/build

- Making sure that 'build/.gitignore' is set up...
  Created: AssemblyScript-example/build/.gitignore

- Making sure that 'package.json' contains the build commands...
  Updated: AssemblyScript-example/package.json

- Making sure that 'asconfig.json' is set up...
  Created: AssemblyScript-example/asconfig.json

- Making sure that the 'tests' directory exists...
  Created: AssemblyScript-example/tests

- Making sure that 'tests/index.js' exists...
  Created: AssemblyScript-example/tests/index.js

- Making sure that 'index.html' exists...
  Created: AssemblyScript-example/index.html

Done!

Don't forget to install dependencies before you start:

  npm install

To edit the entry file, open 'assembly/index.ts' in your editor of choice.
Create as many additional files as necessary and use them as imports.

To build the entry file to WebAssembly when you are ready, run:

  npm run asbuild

Running the command above creates the following binaries incl. their respective
text format representations and source maps:

  ./build/debug.wasm
  ./build/debug.wasm.map
  ./build/debug.wat

  ^ The debuggable WebAssembly module as generated by the compiler.
    This one matches your sources exactly, without any optimizations.

  ./build/release.wasm
  ./build/release.wasm.map
  ./build/release.wat

  ^ The optimized WebAssembly module using default optimization settings.
    You can change the optimization settings in 'package.json'.

To run the tests, do:

  npm test

The AssemblyScript documentation covers all the details:

  https://www.assemblyscript.org

Have a nice day!
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
├── index.html
├── node_modules
│   ├── @assemblyscript
│   ├── assemblyscript
│   ├── binaryen
│   └── long
├── package-lock.json
├── package.json
└── tests
    └── index.js

9 directories, 7 files
```

The `assembly/` directory is where the code lives.

Now, we can write a simple AssemblyScript module in the `assembly/index.ts` file, as shown below:

```typescript
console.log("content-type: text/plain");
console.log("");
console.log("Hello, World");
```

While based on JavaScript and TypeScript, AssemblyScript is not a typical scripting language. It must be compiled before it can be executed. The AssemblyScript tools configure NPM to run the compiler for us:

```console
$ npx asc assembly/index.ts -o build/optimized.wasm --optimize --config ./node_modules/@assemblyscript/wasi-shim/asconfig.json
```

<!-- markdownlint-disable-next-line titlecase-rule -->
### Running in `wasmtime`

```console
$ wasmtime build/optimized.wasm 
content-type: text/plain
Hello, World
```

The module emits `content-type` information and an empty line, so it can be executed in any Wagi runtime such as Wagi, Spin, or Wagi.NET.

<!-- markdownlint-disable-next-line titlecase-rule -->
### Running using `spin up`

Here's an example with [Spin](https://github.com/fermyon/spin).

Create a simple `spin.toml` and edit it as follows::

```toml
spin_manifest_version = 2

[application]
name = "spin-hello-ts"
version = "0.1.0"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "spin-hello-ts"

[[trigger.http]]
route = "/..."
executor = { type = "wagi" } # Note: We are running this using the Wagi spec
component = "spin-hello-ts"

[component.spin-hello-ts]
source = "build/optimized.wasm"
```

Then run Spin to serve our new module at `http://localhost:3000/`:

```console
$ spin up
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  spin-hello-ts: http://127.0.0.1:3000 (wildcard)
```

At this point you can use a web browser or curl to check the results:

```console
$ curl -i localhost:3000   
HTTP/1.1 200 OK
content-type: text/plain
content-length: 13
date: Mon, 04 Mar 2024 05:09:15 GMT

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
