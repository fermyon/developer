title = "The Spin HTTP Trigger"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/http-trigger.md"

---
- [Specifying an HTTP Trigger](#specifying-an-http-trigger)
- [HTTP Trigger Routes](#http-trigger-routes)
  - [Routing with an Application `base`](#routing-with-an-application-base)
  - [Resolving Overlapping Routes](#resolving-overlapping-routes)
  - [Health Check Route](#health-check-route)
- [Authoring HTTP Components](#authoring-http-components)
  - [The Request Handler](#the-request-handler)
  - [Getting Request and Response Information](#getting-request-and-response-information)
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
components. This page covers Spin options that are specific to HTTP.

The HTTP trigger type in Spin is a web server. When an application has HTTP triggers, Spin listens for incoming requests and,
based on the [application manifest](./writing-apps.md), it routes them to a
component, which provides an HTTP response.

## Specifying an HTTP Trigger

An HTTP trigger maps an HTTP route to a component.  For example:

```toml
[[trigger.http]]
route = "/..."                # the route that the trigger matches
component = "my-application"  # the name of the component to handle this route
```

Such a trigger says that HTTP requests matching the specified _route_ should be handled by the specified _component_. The `component` field works the same way across all triggers - see [Triggers](triggers) for the details.

## HTTP Trigger Routes

An HTTP route may be _exact_ or _wildcard_.

An _exact_ route matches only the given route.  This is the default behavior.  For example, `/cart` matches only `/cart`, and not `/cart/checkout`:

<!-- @nocpy -->

```toml
# Run the `shopping-cart` component when the application receives a request to `/cart`...
[[trigger.http]]
route = "/cart"
component = "shopping-cart"

# ...and the `checkout` component for `/cart/checkout`
[[trigger.http]]
route = "/cart/checkout"
component = "checkout"
```

A _wildcard_ route matches the given route and any route under it.  A route is a wildcard if it ends in `/...`.  For example, `/users/...` matches `/users`, `/users/1`, `/users/1/edit`, and so on.  Any of these routes will run the mapped component.

> In particular, the route `/...` matches all routes.

<!-- @nocpy -->

```toml
[[trigger.http]]
# Run the `user-manager` component when the application receives a request to `/users`
# or any path beginning with `/users/`
route = "/users/..."
component = "user-manager"
```

### Routing with an Application `base`

You can set a base path for the entire application using the optional `[application.trigger.http]` section:

```toml
[application.trigger.http]
base = "/shop"
```

If the application `base` is omitted, or is `"/"`, then all trigger routes are matched exactly as given.

If `base` contains a non-root path, this is prefixed to all trigger routes,
exact or wildcard.

For example, suppose the application `base` path is `base = "/shop"`.  Then a trigger with `route = "/cart"` will be executed for requests to `/shop/cart`.  Similarly, a trigger with `route = "/users/..."` will be executed for requests to `/shop/users`, `/shop/users/1`, `/shop/users/1/edit` and so on.

### Resolving Overlapping Routes

If multiple triggers could potentially handle the same request based on their
defined routes, the trigger whose route has the longest matching prefix 
takes precedence.  This also means that exact matches take precedence over wildcard matches.

In the following example, requests starting with the  `/users/` prefix (e.g. `/users/1`)
will be handled by `user-manager`, even though it is also matched by the `shop` route, because the `/users` prefix is longer than `/`.
But requests to `/users/admin` will be handled by the `admin` component, not `user-manager`, because that is a more exact match still:

<!-- @nocpy -->

```toml
# spin.toml

[[trigger.http]]
route = "/users/..."
component = "user-manager"

[[trigger.http]]
route = "/users/admin"
component = "admin"

[[trigger.http]]
route = "/..."
component = "shop"
```

### Health Check Route

Every HTTP application automatically has a special route always configured at `/.well-known/spin/health`, which
returns `OK 200` when the Spin instance is healthy.

## Authoring HTTP Components

> Spin has two ways of running HTTP components, depending on language support for the evolving WebAssembly component standards.  This section describes the default way, which is currently used by Rust, JavaScript/TypeScript, Python, and TinyGo components.  For other languages, see [HTTP Components with Wagi](#http-with-wagi-webassembly-gateway-interface) below.

By default, Spin runs components using the [WebAssembly component model](https://component-model.bytecodealliance.org/).  In this model, the Wasm module exports a well-known interface that Spin calls to handle the HTTP request.

### The Request Handler

The exact signature of the HTTP handler, and how a function is identified to be exported as the handler, will depend on your language.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

In Rust, the handler is identified by the [`#[spin_sdk::http_component]`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/attr.http_component.html) attribute.  The handler function can have one of two forms: _request-response_ or _input-output parameter_.

**Request-Response Handlers**

This form of handler function receives the request as an argument, and returns the response as the return value of the function. For example:

```rust
#[http_component]
async fn handle(request: http::Request) -> anyhow::Result<http::Response> { ... }
```

In this form, nothing is sent to the client until the entire response is ready. It is convenient for many use cases, but is not suitable for streaming responses.

> The Rust SDK includes **experimental** support for streaming request and response bodies. We currently recommend that you stick with the simpler non-streaming interfaces if you don't require streaming.

You have some flexibility in choosing the types of the request and response.  The request may be:

* [`http::Request`](https://docs.rs/http/latest/http/request/struct.Request.html)
* [`spin_sdk::http::Request`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.Request.html)
* [`spin_sdk::http::IncomingRequest`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.IncomingRequest.html)
* Any type for which you have implemented the [`spin_sdk::http::conversions::TryFromIncomingRequest`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/conversions/trait.TryFromIncomingRequest.html) trait

The response may be:

* [`http::Response`](https://docs.rs/http/latest/http/response/struct.Response.html) - typically constructed via `Response::builder()`
* [`spin_sdk::http::Response`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.Response.html) - typically constructed via a [`ResponseBuilder`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.ResponseBuilder.html)
* Any type for which you have implemented the [`spin_sdk::http::IntoResponse`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/trait.IntoResponse.html) trait
* A `Result` where the success type is one of the above and the error type is `anyhow::Error` or another error type for which you have implemented `spin_sdk::http::IntoResponse` (such as `anyhow::Result<http::Response>`)

For example:

```rust
use http::{Request, Response};
use spin_sdk::http::IntoResponse;
use spin_sdk::http_component;

/// A simple Spin HTTP component.
#[http_component]
async fn handle_hello_rust(_req: Request<()>) -> anyhow::Result<impl IntoResponse> {
    Ok(Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body("Hello, Fermyon")?)
}
```

> If you're familiar with Spin 1.x, note that Spin 2 is more forgiving with the type in the `.body()` call. You don't need to convert it to bytes or wrap it in an `Option`. To return an empty body, you can pass `()` instead of `None`.

To extract data from the request, specify a body type as the generic parameter for the `Request` type. You can use raw content types such as `Vec<u8>` and `String`, or automatically deserialize a JSON body by using the `spin_sdk::http::Json<T>` type.

**Input-Output Parameter Handlers**

In this form, the handler function receives the request as an argument of type [`spin_sdk::http::IncomingRequest`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.IncomingRequest.html). It also receives an argument of type [`spin_sdk::http::ResponseOutparam`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.ResponseOutparam.html), through which is sends the response. The function does not return a value. This form is recommended for streaming responses.

To send a response:

1. Create a [`spin_sdk::http::OutgoingResponse`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.OutgoingResponse.html).
2. Call `take_body()` on the `OutgoingResponse` - this gives you a [`futures::Sink`](https://docs.rs/futures/latest/futures/sink/trait.Sink.html) that you can later use to send data via the response.
3. Call `set` on the `ResponseOutparam`, passing the `OutgoingResponse`.
4. Call `send` on the `Sink` as many times as you like. Each send is carried out as you call it, so you can send the first part of the response without waiting for the whole response to be ready.

> You will need to reference the `futures` crate in `Cargo.toml`, and `use futures::SinkExt;`, to access the `send` method.

```rust
use futures::SinkExt;
use spin_sdk::http::{Headers, IncomingRequest, OutgoingResponse, ResponseOutparam};
use spin_sdk::http_component;

/// A streaming Spin HTTP component.
#[http_component]
async fn handle_hello_rust(_req: IncomingRequest, response_out: ResponseOutparam) {
    // Status code and headers must be supplied before calling take_body
    let response = OutgoingResponse::new(
        200,
        &Headers::new(&[("content-type".to_string(), b"text/plain".to_vec())]),
    );
    // Get the sink for writing the body into. This must be mutable!
    let mut body = response.take_body();

    // Connect the OutgoingResponse to the ResponseOutparam.
    response_out.set(response);

    // Write to the body sink over a period of time. (In this case we simulate a
    // long-running operation by manually calling `thread::sleep`.)
    for i in 1..20 {
        let payload = format!("Hello {i}\n");
        if let Err(e) = body.send(payload.into()).await {
            eprintln!("Error sending payload: {e:#}");
            return;
        }
        std::thread::sleep(std::time::Duration::from_millis(100));
    }
}
```

For a full Rust SDK reference, see the [Rust Spin SDK documentation](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/index.html).

{{ blockEnd }}

{{ startTab "TypeScript"}}

In JavaScript or TypeScript, the handler is identified by name.  It must be called `handleRequest`.  The way you declare it is slightly different between the two languages.

In **JavaScript**, `handleRequest` is declared as `export async function`.  It takes a JsvaScript object representing the request, and returns a response object.  The fields of these objects are exactly the same as in TypeScript:

```javascript
export async function handleRequest(request) {
    return {
        status: 200,
        headers: { "content-type": "text/plain" },
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
        headers: { "content-type": "text/plain" },
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

        spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
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

### Getting Request and Response Information

Exactly how the Spin SDK surfaces the request and response types varies from language to language; this section calls out general features.

* In the request record, the URL contains the path and query, but not the scheme and host.  For example, in a request to `https://example.com/shop/users/1?theme=pink`, the URL contains `/shop/users/1?theme=pink`.  If you need the full URL, you can get it from the `spin-full-url` header - see the table below.

### Additional Request Information

As well as any headers passed by the client, Spin sets several headers on the request passed to your component, which you can use to access additional information about the HTTP request.

> In the following table, the examples suppose that:
> * Spin is listening on `example.com:8080`
> * The application `base` is `/shop`
> * The trigger `route` is `/users/...`
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

The HTTP component interface is defined using a WebAssembly Interface (WIT) file.  ([Learn more about the WIT language here.](https://component-model.bytecodealliance.org/design/wit.html)).  You can find the latest WITs for Spin HTTP components at [https://github.com/fermyon/spin/tree/main/wit](https://github.com/fermyon/spin/tree/main/wit).

The HTTP types and interfaces are defined in [https://github.com/fermyon/spin/tree/main/wit/deps/http](https://github.com/fermyon/spin/tree/main/wit/deps/http), which tracks [the `wasi-http` specification](https://github.com/WebAssembly/wasi-http).

In particular, the entry point for Spin HTTP components is defined in [the `incoming-handler` interface](https://github.com/fermyon/spin/blob/main/wit/deps/http/incoming-handler.wit):

<!-- @nocpy -->

```fsharp
// incoming-handler.wit

interface incoming-handler {
  use types.{incoming-request, response-outparam}

  handle: func(
    request: incoming-request,
    response-out: response-outparam
  )
}
```

This is the interface that all HTTP components must implement, and which is used by the Spin HTTP executor when instantiating and invoking the component.

However, this is not necessarily the interface you, the component author, work with. It may not even be the interface of the component you build!

In many cases, you will use a more idiomatic wrapper provided by the Spin SDK, which implements the "true" interface internally. In some cases, you will build a Wasm "core module" which implements an earlier version of the Spin HTTP interface, which Spin internally adapts to the "true" interface as it loads your module.

But if you wish, and if your language supports it, you can implement the `incoming-handler` interface directly, using tools such as the
[Bytecode Alliance `wit-bindgen` project](https://github.com/bytecodealliance/wit-bindgen). Spin will happily load and run such a component. This is exactly how Spin SDKs, such as the [Rust](rust-components) SDK, are built; as component authoring tools roll out for Go, JavaScript, Python, and other languages, you'll be able to use those tools to build `wasi-http` handlers and therefore Spin HTTP components.

> The WASI family of specifications, and tool support for some component model features that WASI depends on, are not yet fully stabilized. If you implement `wasi-http` directly, you may need to do some trialing to find tool versions which work together and with Spin.

## HTTP With Wagi (WebAssembly Gateway Interface)

A number of languages support WASI Preview 1 but not the component model. To enable developers to use these languages, Spin supports an
HTTP executor based on [Wagi](https://github.com/deislabs/wagi), or the
WebAssembly Gateway Interface, a project that implements the
[Common Gateway Interface](https://datatracker.ietf.org/doc/html/rfc3875)
specification for WebAssembly.

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

Spin uses the component model by default, and cannot detect from the Wasm module alone whether it was built with component model support.  For Wagi components, therefore, you must tell Spin in the component manifest to run them using Wagi instead of 'default' Spin.  To do this, use the `executor` field in the `trigger` table:

```toml
[[trigger.http]]
route = "/"
component = "wagi-test"
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
