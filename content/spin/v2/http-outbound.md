title = "Making HTTP Requests"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/http-outbound.md"

---
- [Using HTTP From Applications](#using-http-from-applications)
- [Granting HTTP Permissions to Components](#granting-http-permissions-to-components)
  - [Configuration-Based Permissions](#configuration-based-permissions)
- [Making HTTP Requests Within an Application](#making-http-requests-within-an-application)
  - [Local Service Chaining](#local-service-chaining)
  - [Intra-Application HTTP Requests by Route](#intra-application-http-requests-by-route)

Spin provides an interface for you to make outgoing HTTP requests.

{{ details "Why do I need a Spin interface? Why can't I just use my language's HTTP library?" "The current version of the WebAssembly System Interface (WASI) doesn't provide a sockets interface, so HTTP libraries can't be built to Wasm. The Spin interface means Wasm modules can bypass this limitation by asking Spin to perform the HTTP request on their behalf." }}

## Using HTTP From Applications

The outbound HTTP interface depends on your language.

> Under the surface, Spin uses the `wasi-http` interface. If your tools support the Wasm Component Model, you can work with that directly; but for most languages the Spin SDK is more idiomatic.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/index.html)

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
use spin_sdk::{
    http::{IntoResponse, Request, Method, Response},
    http_component,
};

#[http_component]
// The trigger handler (in this case an HTTP handler) has to be async
// so we can `await` the outbound send.
async fn handle_request(_req: Request) -> anyhow::Result<impl IntoResponse> {

    // Create the outbound request object
    let request = Request::builder()
        .method(Method::Get)
        .uri("https://www.fermyon.com/")
        .build();

    // Send the request and await the response
    let response: Response = spin_sdk::http::send(request).await?;

    // Use the outbound response body
    let response_len = response.body().len();

    // Return the response to the inbound request
    Ok(Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body(format!("The test page was {response_len} bytes"))
        .build())
}
```

For an example of receiving the response in a streaming style, [see this example in the Spin repository](https://github.com/fermyon/spin-rust-sdk/blob/main/examples/wasi-http-streaming-outgoing-body/src/lib.rs).

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

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/spin-python-sdk/http/index.html)

HTTP functions and classes are available in the `http` module. The function name is [`send`](https://fermyon.github.io/spin-python-sdk/http/index.html#spin_sdk.http.send). The [request type](https://fermyon.github.io/spin-python-sdk/http/index.html#spin_sdk.http.Request) is `Request`, and the [response type](https://fermyon.github.io/spin-python-sdk/http/index.html#spin_sdk.http.Response) is `Response`. For example:

```python
from spin_sdk.http import Request, Response, send
response = send(Request("GET", "https://random-data-api.fermyon.app/animals/json", {}, None))
```

**Notes**

* For compatibility with idiomatic Python, types do not necessarily match the underlying Wasm interface. For example, `method` is a string.
* Request and response bodies are `bytes`. (You can pass literal strings using the `b` prefix.)  Pass `None` for no body.
* Request and response headers are dictionaries.
* Errors are signalled through exceptions.

You can find a complete example for using outbound HTTP in the [Python SDK repository on GitHub](https://github.com/fermyon/spin-python-sdk/tree/main/examples/outgoing-request).

{{ blockEnd }}

{{ startTab "TinyGo"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2@v2.0.0/http)

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

You can find a complete example for using outbound HTTP in the [Spin repository on GitHub](https://github.com/fermyon/spin-go-sdk/tree/main/examples/http-outbound).

{{ blockEnd }}

{{ blockEnd }}

## Granting HTTP Permissions to Components

By default, Spin components are not allowed to make outgoing HTTP requests. This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing. To grant a component permission to make HTTP requests to a particular host, use the `allowed_outbound_hosts` field in the component manifest:

```toml
[component.example]
allowed_outbound_hosts = [ "https://random-data-api.fermyon.app", "http://api.example.com:8080" ]
```

The Wasm module can make HTTP requests _only_ to the specified hosts. If a port is specified, the module can make requests only to that port; otherwise, the module can make requests only on the default port for the scheme. Requests to other hosts (or ports) will fail with an error.

You can use a wildcard to allow requests to any subdomain of a domain:

```toml
[component.example]
allowed_outbound_hosts = [ "https://*.example.com" ]
```

For development-time convenience, you can also pass the string `"https://*:*"` in the `allowed_outbound_hosts` collection. This allows the Wasm module to make HTTP requests to _any_ host and on any port. However, once you've determined which hosts your code needs, you should remove this string and list the hosts instead.  Other Spin implementations may restrict host access and disallow components that ask to connect to anything and everything!

### Configuration-Based Permissions

You can use [application variables](./variables.md#adding-variables-to-your-applications) in the `allowed_outbound_hosts` field. However, this feature is not yet available on Fermyon Cloud.

## Making HTTP Requests Within an Application

If your Spin application functions as a set of microservices, you'll often want to make requests directly from one component to another within the same application. It's best not to use a full URL for this, because that's not portable across different deployment environments - the URL in the cloud is different from the one in your development environment. Instead, Spin provides two ways to make inter-component requests:

* By component ID ("local service chaining")
* By route

Both of these work only from HTTP components. That is, if you want to make an intra-application request from, say, a Redis trigger, you must use a full URL.

### Local Service Chaining

To make an HTTP request to another component in your application, use the special `<component-id>.spin.internal` host name. For example, an outbound HTTP request to `authz.spin.internal` will be handled by the `authz` component.

In this way of doing self-requests, the request is passed in memory without ever leaving the Spin host process. This is extremely fast, as the two components are wired almost directly together, but may reduce deployment flexibility depending on the nature of the microservices. Also, public components that are the target of service chaining requests may see URLs in both routed and chained forms: therefore, if they parse the URL (for example, extracting a resource identifier from the path), they must ensure both forms are correctly handled.

> Service chaining is the only way to call [private endpoints](./http-trigger#private-endpoints).

You must still grant permission by including the relevant `spin.internal` hosts in `allowed_outbound_hosts`:

```toml
allowed_outbound_hosts = ["http://authz.spin.internal", "https://reporting.spin.internal"]
```

To allow local chaining to _any_ component in your application, use a subdomain wildcard:

```toml
allowed_outbound_hosts = ["*://*.spin.internal"]
```

> Local service chaining is not currently supported on Fermyon Cloud.

### Intra-Application HTTP Requests by Route

To make an HTTP request to another route with your application, you can pass just the route as the URL. For example, if you make an outbound HTTP request to `/api/customers/`, Spin prepends the route with whatever host the application is running on. It also replaces the URL scheme (`http` or `https`) with the scheme of the current HTTP request. For example, if the application is running in the cloud, Spin changes `/api` to `https://.../api`.

In this way of doing self-requests, the request undergoes normal HTTP processing once Spin has prepended the host. For example, in a cloud deployment, the request passes through the network, and potentially back in through a load balancer or other gateway. The benefit of this is that it allows load to be distributed across the environment, but it may count against your use of bandwidth.

You must still grant permission by including `self` in `allowed_outbound_hosts`:

```toml
allowed_outbound_hosts = ["http://self", "https://self"]
```
