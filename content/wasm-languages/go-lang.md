date = "2024-02-18T01:01:01Z"
title = "Go in WebAssembly"
description = "Go can be compiled to WebAssembly. TinyGo, an alternative implementation of Go, is the most promising"
tags = ["go", "golang", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/go-lang.md"

---

Go was early to the WebAssembly game, with the Go compiler producing `wasm32` output alongside its regularly supported build targets.
But the core Go tools have fallen behind.
Instead, the alterative Go implementation called [TinyGo](https://tinygo.org/) seems to have taken the lead.

## Available Implementations

- Go supports browser-based WebAssembly
- TinyGo supports `wasm32-wasi` as a build target
- The [Elements compiler](https://www.elementscompiler.com/elements/) may also support compiling browser-oriented Wasm

We have had the best luck with TinyGo.

## Usage

With TinyGo, it is possible to compile _most_ Go code into Wasm with WASI support.
That means you can write Go code targeting the Fermyon Platform.

## Pros and Cons

Things we like:

- TinyGo works very well
- Spin has full support for Go

We're neutral about:

- The resulting binary sizes start at around 300k, but can rapidly climb

Things we're not big fans of:

- Upstream (mainline) Go does not have WASI support
- TinyGo is still missing (mostly reflection-based) features of Go

## Example

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

TinyGo can compile to `wasm32-wasi`, and TinyGo apps can be [run on the Fermyon Platform](https://spin.fermyon.dev/go-components/). You will need to [install TinyGo](https://tinygo.org/getting-started/) to do this example. Note that you also have to have [Go installed](https://go.dev/learn/)

As with any Go project, the first step is to create a `go.mod` file:

```
module github.com/fermyon/example-go

go 1.23
```

Since Spin has a [Go SDK](https://github.com/spinframework/spin-go-sdk) which is nice and easy to use, we'll fetch that and use it:

```console
$ go get github.com/spinframework/spin-go-sdk
```

Next, create a simple Go program named `main.go`:

```go
package main

import (
	"fmt"
	"net/http"

	spinhttp "github.com/spinframework/spin-go-sdk/http"
)

func main() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello, World!")
	})
}
```

When it comes to compiling, though, we will need to use TinyGo instead of Go. This particular set of flags has produced the best results for us:

```
tinygo build -target=wasi -gc=leaking -o main.wasm main.go
```

The above will output a `main.wasm` file. A simple `spin.toml` for running the above in Spin looks like this:

```toml
spin_manifest_version = 2

[application]
name = "spin-go-hello"
version = "1.0.0"
description = "Hello world app."
authors = ["Fermyon Engineering <engineering@fermyon.com>"]

[[trigger.http]]
component = "hello"
route = "/"

[component.hello]
source = "main.wasm"
[component.hello.build]
command = "tinygo build -target=wasi -gc=leaking -o main.wasm main.go"
```

> Note: we've set the `hello` component's build command to be the tinygo invocation above, so that `spin build` will run it from now on

From there, it's just a matter of using `spin up` to start the server. As usual, we can test using a web browser or Curl:

```console
$ curl localhost:3000/
Hello, World!
```

## Learn More

Here are some great resources:

- TinyGo has [a step-by-step walkthrough](https://tinygo.org/docs/guides/webassembly/) for building and running Go WebAssembly modules
- There are [instructions](https://spinframework.dev/go-components/) and [examples](https://github.com/spinframework/spin-go-sdk/tree/main/examples)
- Get started quickly with Spin templates for Go: e.g. `spin templates list --tag go` and `spin new -t http-go`
- A [short article](https://golangbot.com/webassembly-using-go/) on compiling to Go's "JS/Wasm" target
