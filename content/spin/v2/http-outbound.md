title = "Making HTTP Requests"
template = "spin_main"
date = "2023-11-02T01:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/http-outbound.md"

---
- [Using HTTP From Applications](#using-http-from-applications)
- [Granting HTTP Permissions to Components](#granting-http-permissions-to-components)
  - [Making HTTP Requests Within an Application](#making-http-requests-within-an-application)

Spin provides an interface for you to make outgoing HTTP requests.

{{ details "Why do I need a Spin interface? Why can't I just use my language's HTTP library?" "The current version of the WebAssembly System Interface (WASI) doesn't provide a sockets interface, so HTTP libraries can't be built to Wasm. The Spin interface means Wasm modules can bypass this limitation by asking Spin to perform the HTTP request on their behalf." }}

## Using HTTP From Applications

The outbound HTTP interface depends on your language.

> Under the surface, Spin uses the `wasi-http` interface. If your tools support the Wasm Component Model, you can work with that directly; but for most languages the Spin SDK is more idiomatic.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

To send requests, use the [`spin_sdk::http::send`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/fn.send.html) function. This takes a request argument and returns a response (or error). It is `async`, so within an async inbound handler you can have multiple outbound `send`s running concurrently.

> Support for streaming request and response bodies is **experimental**. We currently recommend that you stick with the simpler non-streaming interfaces if you don't require streaming.

`send` is quite flexible in its request and response types. The request may be:

* [`http::Request`](https://docs.rs/http/latest/http/request/struct.Request.html) - typically constructed via `http::Request::builder()`
* [`spin_sdk::http::Request`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.Request.html) - typically constructed via `spin_sdk::http::Request::get()`, `spin_sdk::http::Request::post()`, or `spin_sdk::http::Request::builder()`
  * You can also use the [builder type](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.RequestBuilder.html) directly - `build` will be called automatically for you
* [`spin_sdk::http::OutgoingRequest`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.OutgoingRequest.html) - constructed via `OutgoingRequest::new()`
* Any type for which you have implemented the `TryInto<spin_sdk::http::OutgoingRequest>` trait

Generally, you should use `OutgoingRequest` when you need to stream the outbound request body; otherwise, the `Request` types are usually simpler.

The response may be:

* [`http::Response`](https://docs.rs/http/latest/http/response/struct.Response.html)
* [`spin_sdk::http::Response`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.Response.html)
* [`spin_sdk::http::IncomingResponse`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.IncomingResponse.html)
* Any type for which you have implemented the [spin_sdk::http::conversions::TryFromIncomingResponse](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/conversions/trait.TryFromIncomingResponse.html) trait

Generally, you should use `IncomingResponse` when you need to stream the response body; otherwise, the `Response` types are usually simpler.

Here is an example of doing outbound HTTP in a simple request-response style:

```rust
use spin_sdk::http::{IntoResponse, Request, send};
use spin_sdk::http_component;

#[http_component]
// The trigger handler (in this case an HTTP handler) has to be async
// so we can `await` the outbound send.
async fn handle_request(_req: Request) -> anyhow::Result<impl IntoResponse> {

    // For this example, use the spin_sdk::http::RequestBuilder type
    // for the outbound request.
    let outbound_req = Request::get("https://www.fermyon.com/");

    // Send the outbound request, capturing the response as raw bytes
    let response: http::Response<Vec<u8>> = send(outbound_req).await?;

    // Use the outbound response body
    let response_len = response.body().len();

    Ok(http::Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body(format!("The test page was {response_len} bytes"))?)
}
```

For an example of receiving the response in a streaming style, [see this example in the Spin repository](https://github.com/fermyon/spin/blob/main/examples/wasi-http-rust-streaming-outgoing-body/src/lib.rs).

{{ blockEnd }}

{{ startTab "TypeScript"}}

HTTP operations are available via the standard JavaScript `fetch` function. The Spin runtime maps this to the underlying Wasm interface. For example:

```javascript
const response = await fetch("https://example.com/users");
```

**Notes**

* Although the underlying Spin interface is blocking, the `fetch` function is defined by JavaScript as async. You must await the response, but the request will always block, and the promise will resolve as soon as the request is returned.

You can find a complete example of using outbound HTTP in the JavaScript SDK repository on GitHub ([TypeScript](https://github.com/fermyon/spin-js-sdk/tree/main/examples/typescript/outbound_http), [JavaScript](https://github.com/fermyon/spin-js-sdk/tree/main/examples/javascript/outbound-http)).

{{ blockEnd }}

{{ startTab "Python"}}

HTTP functions and classes are available in the `spin_http` module. The function name is `http_send`. The request type is `Request`, and the response type is `Response`. For example:

```python
from spin_http import Request, Response, http_send

response = http_send(
    Request("GET", "https://random-data-api.fermyon.app/animals/json", {}, None))
```

**Notes**

* For compatibility with idiomatic Python, types do not necessarily match the underlying Wasm interface. For example, `method` is a string.
* Request and response bodies are `bytes`. (You can pass literal strings using the `b` prefix.)  Pass `None` for no body.
* Request and response headers are dictionaries.
* Errors are signalled through exceptions.

You can find a complete example for using outbound HTTP in the [Python SDK repository on GitHub](https://github.com/fermyon/spin-python-sdk/tree/main/examples/outbound_http).

{{ blockEnd }}

{{ startTab "TinyGo"}}

HTTP functions are available in the `github.com/fermyon/spin/sdk/go/v2/http` package. [See Go Packages for reference documentation.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2/http) The general function is named `Send`, but the Go SDK also surfaces individual functions, with request-specific parameters, for the `Get` and `Post` operations. For example:

```go
import (
	spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
)

res1, err1 := spinhttp.Get("https://random-data-api.fermyon.app/animals/json")
res2, err2 := spinhttp.Post("https://example.com/users", "application/json", json)

request, err := http.NewRequest("PUT", "https://example.com/users/1", bytes.NewBufferString(user1))
request.Header.Add("content-type", "application/json")
res3, err3 := spinhttp.Send(req)

```

**Notes**

* In the `Post` function, the body is an `io.Reader`. The Spin SDK reads this into the underlying Wasm byte array.
* The `NewRequest` function is part of the standard library. The `Send` method adapts the standard request type to the underlying Wasm interface.
* Errors are returned through the usual Go multiple return values mechanism.

You can find a complete example for using outbound HTTP in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/http-tinygo-outbound-http).

{{ blockEnd }}

{{ blockEnd }}

## Granting HTTP Permissions to Components

By default, Spin components are not allowed to make outgoing HTTP requests. This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing. To grant a component permission to make HTTP requests to a particular host, use the `allowed_outbound_hosts` field in the component manifest:

```toml
[component]
allowed_outbound_hosts = [ "https://random-data-api.fermyon.app", "http://api.example.com:8080" ]
```

The Wasm module can make HTTP requests _only_ to the specified hosts. If a port is specified, the module can make requests only to that port; otherwise, the module can make requests only on the default port for the scheme. Requests to other hosts (or ports) will fail with an error.

For development-time convenience, you can also pass the string `"https://*:*"` in the `allowed_outbound_hosts` collection. This allows the Wasm module to make HTTP requests to _any_ host and on any port. However, once you've determined which hosts your code needs, you should remove this string and list the hosts instead.  Other Spin implementations may restrict host access and disallow components that ask to connect to anything and everything!

### Making HTTP Requests Within an Application

In an HTTP component, you can make requests to a path to make HTTP requests **within the current Spin application**. For example, if you make an outbound HTTP request to /api/customers/, Spin replaces self with whatever host the application is running on. It also replaces the URL scheme (`http` or `https`) with the scheme of the current HTTP request. For example, if the application is running in the cloud, Spin changes `/api` to `https://.../api`.

Using paths means that the application doesn't need to know the URL where it's deployed, or whether it's running locally versus in the cloud.

> This doesn't work in Redis components because Spin uses the incoming HTTP request to determine the current host.

You must still grant permission by including `self` in `allowed_outbound_hosts`:

```toml
allowed_outbound_hosts = ["http://self", "https://self"]
```
