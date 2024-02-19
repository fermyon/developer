date = "2022-01-12T00:23:27Z"
title = "Ruby in WebAssembly"
description = "Ruby can be compiled to WebAssembly. While there are a number of projects to do so, none are complete."
tags = ["ruby", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Ruby in WebAssembly](#ruby-in-webassembly)
- [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Pros and Cons](#pros-and-cons)
  - [Example](#example)
  - [Learn More](#learn-more)

# Ruby in WebAssembly

Ruby is one of the most popular scripting languages.
Famous for the Rails framework, it has been a stalwart for web developers.

Ruby now has multiple WebAssembly-based projects, including an official release of CRuby.

# Available Implementations

There is an official [Wasm build of Ruby](https://github.com/ruby/ruby.wasm/).
It supports WASI and a wide array of features.
VMware provides a [release of the official Ruby runtime as Wasm](https://github.com/vmware-labs/webassembly-language-runtimes)
Shopify has a [Wizer-optimized version of Ruby](https://github.com/Shopify/ruvy), which they call Ruvy, that speeds up startup time. This, too, uses the official CRuby.

In addition to the official Ruby distribution, [Artichoke](https://www.artichokeruby.org/) is a Rust implementation of Ruby that can compile to WebAssembly (`wasm32-unknown`).

`rlang` (a subset of Ruby) can run Wasm32 code in a `wasm32-wasi` runtime like `wasmtime`.

In this guide, we focus on the official release of Ruby (`ruby.wasm`).

## Usage

To use the official Ruby Wasm, [download a prebuilt binary](https://github.com/ruby/ruby.wasm/releases) and decompress the downloaded archive.

Inside of the package, you will find a full distribution of Ruby:

```console
$ tree -L 3
.
├── usr
│   └── local
│       ├── bin
│       ├── include
│       ├── lib
│       └── share
└── var
    └── lib
        └── gems
```

The Wasm binaries are in `/usr/local/bin`. For example, to run the Ruby interpreter, you can use `wasmtime ./usr/local/bin/ruby`. The example section below illustrates usage.

## Pros and Cons

Things we like:

- The toolchain has been very thoughtfully developed
- It is possible to use gems that do not have C code. (We suspect there might be a way to use C extensions, but we haven't figured it out)

We're neutral about:

- The size of the interpreter is large, and can take a moment to start
- Spin (and Wagi) need extra configuration to simulate a command line for Ruby

Things we're not big fans of:

- At this stage, users of the Wasm version will need to understand how Ruby loads its dependencies

## Example

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

Ruby can run in either Spin or Wagi. Here, we show how to use Spin.

Start out with a new directory:

```console
$ mkdir hello-ruby
$ cd hello-ruby
```

Now fetch a copy of the Ruby source from the [official releases](https://github.com/ruby/ruby.wasm/releases).
For this example, we are downloading the `ruby-head-wasm32-unknown-wasi-full.tar.gz` version, 
but one of the smaller versions works just as well.

Now create a local `lib` dir where we will put our own source.
It is also a good idea to create `.gem/`, though we won't use it in this example.

```console
$ mkdir lib
$ mkdir .gem
```

At this point, our directory should look like this:

```console
$ tree -L 2 -a -d
.
├── .gem
├── head-wasm32-unknown-wasi-full
│   ├── usr
│   └── var
└── lib
```

Inside of `lib`, we can create `hello.rb`:

```ruby
puts "content-type: text/plain"
puts ""
puts "Hello, World"
```

You can verify this works by using `ruby lib/hello.rb`. 

```console
$ ruby lib/hello.rb
content-type: text/plain

Hello, World
```

Ruby is a scripting language, which means it will need to load a number of scripts (ours plus all of the built-in libraries) off of its filesystem. The `spin.toml` file for Ruby is more complex than most:

```toml
spin_version = "1"
name = "example-ruby-app"
version = "0.1.0"
trigger = { type = "http", base = "/" }

[[component]]
files = [
  { source = "lib", destination = "/lib" },
  { source = ".gem", destination = "/.gem" },
  { source = "head-wasm32-unknown-wasi-full/usr", destination = "/usr" },
]
id = "ruby"
source = "head-wasm32-unknown-wasi-full/usr/local/bin/ruby"
[component.trigger]
executor = { type = "wagi", argv = "${SCRIPT_NAME} -v /lib/hello.rb ${SCRIPT_NAME} ${ARGS}" }
route = "/"
[component.environment]
HOME = "/"
GEM_HOME = "/.gem"
```

Note that we need to mount several sets of files: `lib`, `.gem`, and `usr`. This exposes all of Ruby's supporting files.
(Remember: Ruby is a scripting language, and only the interpreter is compiled to Wasm. The rest is Ruby source.)

While `lib` and `.gem` should point to your local dev environment, you need to load `usr` from the Ruby project.

A few environment variables also need to be set for the interpreter: `HOME` and `GEM_HOME`.
These should usually be set exactly as above.

Next, running `spin up` will start the server.

```console
$ spin up
Preparing Wasm modules is taking a few seconds...

Serving HTTP on address http://127.0.0.1:3000
```

Note that the first line occurs because when Spin starts up, it does take Ruby a few moments to load all of its supporting files.
_Using one of the [smaller instances](https://github.com/ruby/ruby.wasm/releases) will improve startup time
and overall performance._

From here, we can run our usual `curl` command or point a web browser to Spin:

```console
$ curl localhost:3000
Hello, World
```

And that's all there is to it.

>> If you need help with Ruby and Spin/Wagi, [join our Discord](https://discord.gg/AAFNfS7NGf) and ask. We know it's not the easiest environment to get running.

## Learn More

Here are some great resources:

- The [official project](https://github.com/ruby/ruby.wasm) explains building `ruby.wasm`
- [Ruvy](https://github.com/Shopify/ruvy) is the official Ruby, but optimized (via Wizer) for faster startup times, and to not load script files. This works similarly to Fermyon's JS and Python SDKs.
- VMware's [Ruby interpreter compiled to Wasm](https://github.com/vmware-labs/webassembly-language-runtimes)
- InfoWorld (Oct. 2023) explains Shopify's new [Ruvy runtime](https://www.infoworld.com/article/3709509/ruvy-converts-ruby-code-to-webassembly.html)
- An update on [the state of Ruby, Wasm, and WASI](https://medium.com/@kateinoigakukun/final-report-webassembly-wasi-support-in-ruby-4aface7d90c9) in March, 2022
- Instructions for [building Ruby with wasm32-wasi support](https://github.com/ruby/ruby/pull/5407)
- A fun [dice roller browser app](https://repl-wasm.bcdice.org/) written in Ruby. Source is on [GitHub](https://github.com/bcdice/repl.wasm)
- [Rlang](https://github.com/ljulliar/rlang) compiles a subset of the Ruby language to Wasm
- [Artichoke](https://www.artichokeruby.org/) is a Rust implementation of Ruby that can compile to WebAssembly (`wasm32-unknown`)
- The [mruby](https://github.com/mruby/mruby) runtime has been compiled to WebAssembly, which means you can interpret a Ruby script inside of a Wasm module
- [Prism](https://github.com/prism-rb/prism) uses `mruby` to run Ruby inside of WebAssembly
- While it doesn't seem to be active anymore, [run.rb](https://runrb.io/) is a project for running Ruby in the browser as Wasm.
- [wruby](https://github.com/pannous/wruby) also no longer looks active, but it was an `mruby`-based in-browser Ruby interpreter.
