title = "The Spin HTTP Trigger"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/http-trigger"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/http-trigger.md"

---
- [Specifying an Application as HTTP](#specifying-an-application-as-http)
- [Mapping a Route to a Component](#mapping-a-route-to-a-component)
  - [Routing with an Application `base`](#routing-with-an-application-base)
  - [Resolving Overlapping Routes](#resolving-overlapping-routes)
  - [Health Check Route](#health-check-route)
- [HTTP Components](#http-components)
  - [The Request Handler](#the-request-handler)
  - [The Request and Response Records](#the-request-and-response-records)
  - [Additional Request Information](#additional-request-information)
  - [Inside HTTP Components](#inside-http-components)
- [HTTP With Wagi (WebAssembly Gateway Interface)](#http-with-wagi-webassembly-gateway-interface)
  - [Wagi Component Requirements](#wagi-component-requirements)
  - [Request Handling in Wagi](#request-handling-in-wagi)
  - [Wagi HTTP Environment Variables](#wagi-http-environment-variables)
- [Exposing HTTP Triggers Using HTTPS](#exposing-http-triggers-using-https)
  - [Trigger Options](#trigger-options)
  - [Environment Variables](#environment-variables)

HTTP applications are an important workload in event-driven environments,
and Spin has built-in support for creating and running HTTP
components. This page covers Spin options that are specific to HTTP applications.

The HTTP trigger in Spin is a web server. It listens for incoming requests and
based on the [application manifest](./writing-apps.md), it routes them to a
component, which returns an HTTP response.

## Specifying an Application as HTTP

Every Spin application has a trigger specified in the manifest, which declares the type of events it responds to.
For HTTP applications, the application trigger has `type = "http"`:

<!-- @nocpy -->

```toml
# spin.toml
trigger = { type = "http", base = "/" }
```

The HTTP trigger also requires a `base` field.  Spin interprets each component route as relative to this route.  In most cases, you can set this to `"/"`, the base of the Web server, meaning Spin applies no prefix to component routes.

> If you create an application from a HTTP template, the trigger will be already set up for you.

In addition, each component must have HTTP-specific configuration in its `[component.trigger]` table.

## Mapping a Route to a Component

Each component handles one route, specified in the `route` field of the component `trigger` table.

The route may be _exact_ or _wildcard_.

An _exact_ route matches only the given route.  This is the default behavior.  For example, `/cart` matches only `/cart`, and not `/cart/checkout`:

<!-- @nocpy -->

```toml
# Run the `cart.wasm` module when the application receives a request to `/cart`...
[[component]]
id = "cart"
source = "cart.wasm"
[component.trigger]
route = "/cart"

# ...and the `checkout.wasm` module for `/cart/checkout`
[[component]]
id = "checkout"
source = "checkout.wasm"
[component.trigger]
route = "/cart/checkout"
```

A _wildcard_ route matches the given route and any route under it.  A route is a wildcard if it ends in `/...`.  For example, `/users/...` matches `/users`, `/users/1`, `/users/1/edit`, and so on.  Any of these routes will run the mapped component.

> In particular, the route `/...` matches all routes.

<!-- @nocpy -->

```toml
[[component]]
id = "user-manager"
source = "users.wasm"
# Run the `users.wasm` module when the application receives a request to `/users`
# or any path beginning with `/users/`
[component.trigger]
route = "/users/..."
```

### Routing with an Application `base`

If the application `base` is `"/"` then all component routes are matched exactly as given.

If `base` contains a non-root path, this is prefixed to all component routes,
exact or wildcard.

For example, suppose the application `base` path is `base = "/shop"`.  Then a component with `route = "/cart"` will be executed for requests to `/shop/cart`.  Similarly, a component with `route = "/users/..."` will be executed for requests to `/shop/users`, `/shop/users/1`, `/shop/users/1/edit` and so on.

### Resolving Overlapping Routes

If multiple components could potentially handle the same request based on their
defined routes, the component whose route has the longest matching prefix 
takes precedence.  This also means that exact matches take precedence over wildcard matches.

In the following example, requests starting with the  `/users/` prefix (e.g. `/users/1`)
will be handled by `user-manager`, even though it is also matched by the `shop` route, because the `/users` prefix is longer than `/`.
But requests to `/users/admin` will be handled by the `admin` component, not `user-manager`, because that is a more exact match still:

<!-- @nocpy -->

```toml
# spin.toml

trigger = { type = "http", base = "/"}

[[component]]
id = "user-manager"
[component.trigger]
route = "/users/..."

[[component]]
id = "admin"
[component.trigger]
route = "/users/admin"

[[component]]
id = "shop"
[component.trigger]
route = "/..."
```

### Health Check Route

Every HTTP application automatically has a special route always configured at `/.well-known/spin/health`, which
returns `OK 200` when the Spin instance is healthy.

## HTTP Components

> Spin has two ways of running HTTP components, depending on language support for the evolving WebAssembly component standards.  This section describes the default way, which is currently used by Rust, JavaScript/TypeScript, Python, and TinyGo components.  For other languages, see [HTTP Components with Wagi](#http-with-wagi-webassembly-gateway-interface)) below.

By default, Spin runs components using the [WebAssembly component model](https://github.com/WebAssembly/component-model).  In this model, the Wasm module exports a well-known function that Spin calls to handle the HTTP request.

### The Request Handler

The exact signature of the HTTP handler, and how a function is identified to be exported as the handler, will depend on your language.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

In Rust, the handler is identified by the `#[spin_sdk::http_component]` attribute.  It takes a `spin_sdk::http::Request`, and returns a `spin_sdk::http::Response` (or error).  These types are instantiations of the standard `http::Request` and `http::Response` types and behave exactly like them:

```rust
use anyhow::Result;
use spin_sdk::{
    http::{Request, Response},
    http_component,
};

/// A simple Spin HTTP component.
#[http_component]
fn handle_hello_rust(req: Request) -> Result<Response> {
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some("Hello, Fermyon".into()))?)
}
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

In JavaScript or TypeScript, the handler is identified by name.  It must be called `handleRequest`.  The way you declare it is slightly different between the two languages.

In **JavaScript**, `handleRequest` is declared as `export async function`.  It takes a JsvaScript object representing the request, and returns a response object.  The fields of these objects are exactly the same as in TypeScript:

```javascript
export async function handleRequest(request) {
    return {
        status: 200,
        headers: { "foo": "bar" },
        body: "Hello from JS-SDK"
    }
}
```

In **TypeScript**, `handleRequest` is declared as an `export const` of the `HandleRequest` function type - that is, a function literal rather than a function declaration.  It takes a `HttpRequest` object, and returns a `HttpResponse` object, both defined in the `@fermyon/spin-sdk` package:

```javascript
import { HandleRequest, HttpRequest, HttpResponse} from "@fermyon/spin-sdk"

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
    return {
      status: 200,
      headers: { "foo": "bar" },
      body: "Hello from TS-SDK"
    }
}
```

{{ blockEnd }}

{{ startTab "Python"}}

In Python, the handler is identified by name.  It must be called `handle_request`.  It takes a request object and must return an instance of `Response`, defined in the `spin_http` package:

```python
from spin_http import Response

def handle_request(request):
    return Response(200,
                    [("content-type", "text/plain")],
                    bytes(f"Hello from the Python SDK", "utf-8"))
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

In Go, you register the handler as a callback in your program's `init` function.  Call `spinhttp.Handle`, passing your handler as the sole argument.  Your handler takes a `http.Request` record, from the standard `net/http` package, and a `ResponseWriter` to construct the response.

> The do-nothing `main` function is required by TinyGo but is not used; the action happens in the `init` function and handler callback.

```go
package main

import (
        "fmt"
        "net/http"

        spinhttp "github.com/fermyon/spin/sdk/go/http"
)

func init() {
        spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
                w.Header().Set("Content-Type", "text/plain")
                fmt.Fprintln(w, "Hello Fermyon!")
        })
}

func main() {}
```

> If you are moving between languages, note that in most other Spin SDKs, your handler _constructs and returns_ a response, but in Go, _Spin_ constructs a `ResponseWriter`, and you write to it; your handler does not return a value.

{{ blockEnd }}

{{ blockEnd }}

### The Request and Response Records

Exactly how the Spin SDK surfaces the request and response types varies from language to language; this section calls out general features.

* In the request record, the URL contains the path and query, but not the scheme and host.  For example, in a request to `https://example.com/shop/users/1?theme=pink`, the URL contains `/shop/users/1?theme=pink`.  If you need the full URL, you can get it from the `spin-full-url` header - see the table below.

### Additional Request Information

As well as any headers passed by the client, Spin sets several headers on the request passed to your component, which you can use to access additional information about the HTTP request.

> In the following table, the examples suppose that:
> * Spin is listening on `example.com:8080`
> * The application `base` is `/shop`
> * The component `route` is `/users/...`
> * The request is to `https://example.com:8080/shop/users/1/edit?theme=pink`

| Header Name                  | Value                | Example |
|------------------------------|----------------------|---------|
| `spin-full-url`              | The full URL of the request. This includes full host and scheme information. | `https://example.com:8080/shop/users/1/edit?theme=pink` |
| `spin-path-info`             | The request path relative to the component route (including any base) | `/1/edit` |
| `spin-matched-route`         | The part of the request path that was matched by the route (including the base and wildcard indicator if present) | `/shop/users/...` |
| `spin-raw-component-route`   | The component route pattern matched, as written in the component manifest (that is, _excluding_ the base, but including the wildcard indicator if present) | `/users/...` |
| `spin-component-route`       | The component route pattern matched, _excluding_ any wildcard indicator | `/users` |
| `spin-base-path`             | The application base path | `/shop` |
| `spin-client-addr`           | The IP address and port of the client | `127.0.0.1:53152` |

### Inside HTTP Components

For the most part, you'll build HTTP component modules using a language SDK (see the Language Guides section), such as a JavaScript module or a Rust crate.  If you're interested in what happens inside the SDK, or want to implement HTTP components in another language, read on!

> The WebAssembly component model is in its early stages, and over time the triggers and application entry points will undergo changes, both in the definitions of functions and types, and in the binary representations of those definitions and of primitive types (the so-called Application Binary Interface or ABI).  However, Spin ensures binary compatibility over the course of any given major release.  For example, a component built using the Spin 1.0 SDK will work on any version of Spin in the 1.x range.

The HTTP component interface is defined using a WebAssembly Interface (WIT) file.  ([Learn more about the evolving WIT standard here.](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md)).  You can find the latest WITs for Spin HTTP components at [https://github.com/fermyon/spin/tree/v1.6/wit/ephemeral](https://github.com/fermyon/spin/tree/v1.6/wit/ephemeral).

The core HTTP types are defined in [https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/http-types.wit](https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/http-types.wit):

<!-- @nocpy -->

```fsharp
// wit/ephemeral/http-types.wit

// The HTTP status code.
type http-status = u16
// The HTTP body.
type body = list<u8>
// The HTTP headers represented as a list of (name, value) pairs.
type headers = list<tuple<string, string>>
// The HTTP parameter queries, represented as a list of (name, value) pairs.
type params = list<tuple<string, string>>
// The HTTP URI of the current request.
type uri = string
// The HTTP method.
enum method { get, post, put,... }

// An HTTP request.
record request {
    method: method,
    uri: uri,
    headers: headers,
    params: params, // Retained for binary compatibility but no longer used
    body: option<body>,
}

// An HTTP response.
record response {
    status: http-status,
    headers: option<headers>,
    body: option<body>,
}

// error types omitted
```

> The same HTTP types are also used to model the API for sending outbound HTTP requests.

The entry point for Spin HTTP components is then defined in [https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/spin-http.wit](https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/spin-http.wit):

<!-- @nocpy -->

```fsharp
// wit/ephemeral/spin-http.wit

use * from http-types

// The entry point for an HTTP handler.
handle-http-request: function(req: request) -> response
```

This is the function signature that all HTTP components must implement, and
which is used by the Spin HTTP executor when instantiating and invoking the
component.

This interface (`spin-http.wit`) can be directly used together with the
[Bytecode Alliance `wit-bindgen` project](https://github.com/bytecodealliance/wit-bindgen)
to build a component that the Spin HTTP executor can invoke.

This is exactly how Spin SDKs, such as the [Rust](rust-components), [JavaScript](javascript-components), [Python](python-components) and [Go](go-components) SDKs, are built.
As more languages add support for the component model, we plan to add support for them in the same way.

> WIT and the ABI are evolving standards.  The latest version of `wit-bindgen` creates binary implementations that do not work with current language implementations of the WebAssembly System Interface (WASI).  Spin remains pinned to an older implementation of `wit-bindgen` until the next generation of the component model stabilizes and achieves language-level support.

## HTTP With Wagi (WebAssembly Gateway Interface)

The WebAssembly component model proposal is currently in its early stages, which
means only a few programming languages fully implement it. While the language
communities implement toolchain support for the component model (for emitting
components and for automatically generating bindings for importing other
components), we want to allow developers to use any language that compiles to
WASI to build Spin HTTP applications. This is why Spin currently implements an
HTTP executor based on [Wagi](https://github.com/deislabs/wagi), or the
WebAssembly Gateway Interface, a project that implements the
[Common Gateway Interface](https://datatracker.ietf.org/doc/html/rfc3875)
specification for WebAssembly.

> Spin will keep supporting the Wagi-based executor while language toolchains
> add support for the WebAssembly component model. When enough programming
> languages have implemented the component model, we will work with the Spin
> community to decide when to deprecate the Wagi executor.

Wagi allows a module built in any programming language that compiles to [WASI](https://wasi.dev/)
to handle an HTTP request by passing the HTTP request information to the module's
standard input, environment variables, and arguments, and expecting the HTTP
responses through the module's standard output.
This means that if a language has support for the WebAssembly System Interface,
it can be used to build Spin HTTP components.
The Wagi model is only used to parse the HTTP request and response. Everything
else — defining the application, running it, or [distributing](./distributing-apps.md)
is done the same way as a component that uses the Spin executor.

### Wagi Component Requirements

Spin uses the component model by default, and cannot detect from the Wasm module alone whether it was built with component model support.  For Wagi components, therefore, you must tell Spin in the component manifest to run them using Wagi instead of 'default' Spin.  To do this, use the `executor` field in the `[component.trigger]` table:

```toml
[[component]]
id = "wagi-test"
source = "wagitest.wasm"
[component.trigger]
route = "/"
executor = { type = "wagi" }
```

> If, for whatever reason, you want to highlight that a component uses the default Spin execution model, you can write `executor = { type = "spin" }`.  But this is the default and is rarely written out.

Wagi supports non-default entry points, and allows you to pass an arguments string that a program can receive as if it had been passed on the command line. If you need these you can specify them in the `executor` table. For details, see the [Manifest Reference](manifest-reference#the-componenttrigger-table-for-http-applications).

### Request Handling in Wagi

Building a Wagi component in a particular programming language that can compile
to `wasm32-wasi` does not require any special libraries — instead,
[building Wagi components](https://github.com/deislabs/wagi/tree/main/docs) can
be done by reading the HTTP request from the standard input and environment
variables, and sending the HTTP response to the module's standard output.

In pseudo-code, this is the minimum required in a Wagi component:

- either the `content-media` or `location` headers must be set — this is done by
printing its value to standard output
- an empty line between the headers and the body
- the response body printed to standard output:

<!-- @nocpy -->

```text
print("content-type: text/html; charset=UTF-8\n\n");
print("hello world\n");
```

Here is a working example, written in [Grain](https://grain-lang.org/),
a programming language that natively targets WebAssembly and WASI but
does not yet support the component model:

```js
import Process from "sys/process";
import Array from "array";

print("content-type: text/plain\n");

// This will print all the Wagi env variables
print("==== Environment: ====");
Array.forEach(print, Process.env());

// This will print the route path followed by each query
// param. So /foo?bar=baz will be ["/foo", "bar=baz"].
print("==== Args: ====");
Array.forEach(print, Process.argv());
```

> You can find examples on how to build Wagi applications in
> [the DeisLabs GitHub organization](https://github.com/deislabs?q=wagi&type=public&language=&sort=).

### Wagi HTTP Environment Variables

Wagi passes request metadata to the program through well-known environment variables. The key path-related request variables are:

- `X_FULL_URL` - the full URL of the request —
  `http://localhost:3000/test/hello/abc/def?foo=bar`
- `PATH_INFO` - the path info, relative to both the base application path _and_
  component route — in our example, where the base path is `/test`, and the
  component route is `/hello`, this is `/abc/def`.
- `X_MATCHED_ROUTE` - the base path and route pattern matched (including the
  wildcard pattern, if applicable; this updates the header set in Wagi to
  include the base path) — in our case `"/test/hello/..."`.
- `X_RAW_COMPONENT_ROUTE` - the route pattern matched (including the wildcard
  pattern, if applicable) — in our case `/hello/...`.
- `X_COMPONENT_ROUTE` - the route path matched (stripped of the wildcard
  pattern) — in our case `/hello`
- `X_BASE_PATH` - the application base path — in our case `/test`.

For details, and for a full list of all Wagi environment variables, see
[the Wagi documentation](https://github.com/deislabs/wagi/blob/main/docs/environment_variables.md).

## Exposing HTTP Triggers Using HTTPS

When exposing HTTP triggers using HTTPS you must provide `spin up` with a TLS certificate and a private key. This can be achieved by either using trigger options (`--tls-cert` and `--tls-key`) when running the `spin up` command, or by setting environment variables (`SPIN_TLS_CERT` and `SPIN_TLS_KEY`) before running the `spin up` command.

### Trigger Options

The `spin up` command's `--tls-cert` and `--tls-key` trigger options provide a way for you to specify both a TLS certificate and a private key (whilst running the `spin up` command).

The `--tls-cert` option specifies the path to the TLS certificate to use for HTTPS, if this is not set, normal HTTP will be used. The certificate should be in PEM format. 

The `--tls-key` option specifies the path to the private key to use for HTTPS, if this is not set, normal HTTP will be used. The key should be in PKCS#8 format. For more information, please see the [Spin CLI Reference](./cli-reference#trigger-options).

### Environment Variables

The `spin up` command can also automatically use the `SPIN_TLS_CERT` and `SPIN_TLS_KEY` environment variables instead of the respective flags (`--tls-cert` and `--tls-key`):

<!-- @nocpy -->

```bash
SPIN_TLS_CERT=<path/to/cert>
SPIN_TLS_KEY=<path/to/key>
```

Once set, `spin up` will automatically use these explicitly set environment variables. For example, if using a Linux-based system, you can go ahead and use the `export` command to set the variables in your session (before you run the `spin up` command):

<!-- @nocpy -->

```bash
export SPIN_TLS_CERT=<path/to/cert>
export SPIN_TLS_KEY=<path/to/key>
```
