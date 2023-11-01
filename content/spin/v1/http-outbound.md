title = "Making HTTP Requests"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical = "https://developer.fermyon.com/spin/v2/http-outbound"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/http-outbound.md"

---
- [Using HTTP From Applications](#using-http-from-applications)
- [Granting HTTP Permissions to Components](#granting-http-permissions-to-components)
  - [Making HTTP Requests Within an Application](#making-http-requests-within-an-application)

Spin provides an interface for you to make outgoing HTTP requests.

{{ details "Why do I need a Spin interface? Why can't I just use my language's HTTP library?" "The current version of the WebAssembly System Interface (WASI) doesn't provide a sockets interface, so HTTP libraries can't be built to Wasm. The Spin interface means Wasm modules can bypass this limitation by asking Spin to perform the HTTP request on their behalf." }}

## Using HTTP From Applications

The Spin SDK surfaces the Spin HTTP interface to your language. The interface contains only one operation:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| `request`  | request record | response record   | Sends the given HTTP request, and returns the response. |

The request record specifies:

| Field      | Type     | Meaning          |
|------------|----------|------------------|
| `method`   | enum     | The HTTP method for the request, e.g. GET, POST, DELETE, etc. |
| `uri`      | string   | The URI to which to make the request |
| `headers`  | list of key-value string pairs | The request headers |
| `body`     | bytes    | Optional request body |

> The Wasm request record declaration also contains a `parameters` field. This is unused and is retained only for binary compatibility.

The response record contains:

| Field      | Type     | Meaning          |
|------------|----------|------------------|
| `status`   | integer  | The HTTP status code of the response, e.g. 200, 404, etc. |
| `headers`  | list of key-value string pairs | The response headers, if any |
| `body`     | bytes    | The response body, if any |

The exact detail of calling the `request` operation from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

HTTP functions are available in the `spin_sdk::outbound_http` module. The function is named `send_request`. It takes a `spin_sdk::http::Request` and returns a `spin_sdk::http::Response`. Both of these types are specializations of the `Request` and `Response` types from the `http` crate, and have all their behaviour and methods; the Spin SDK maps them to the underlying Wasm interface. For example:

```rust
use spin_sdk::http::{Request, Response};

let request = http::Request::builder()
    .method("POST")
    .uri("https://example.com/users")
    .body(Some(json_text.into()))?;

let response = spin_sdk::outbound_http::send_request(request)?;
println!("Status: {}", response.status().as_str());
```

**Notes**

* The Rust SDK surfaces the idiomatic `http` types rather than the raw Wasm interface types. For example, the `method` in Rust is a string, not an enum.
* Request and response bodies are of type `Option<bytes::Bytes>`.

You can find a complete example for using outbound HTTP in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/http-rust-outbound-http).

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

HTTP functions are available in the `github.com/fermyon/spin/sdk/go/http` package. [See Go Packages for reference documentation.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/http). The general function is named `Send`, but the Go SDK also surfaces individual functions, with request-specific parameters, for the `Get` and `Post` operations. For example:

```go
import (
	spinhttp "github.com/fermyon/spin/sdk/go/http"
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

By default, Spin components are not allowed to make outgoing HTTP requests. This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing. To grant a component permission to make HTTP requests to a particular host, use the `allowed_http_hosts` field in the component manifest:

```toml
[component]
allowed_http_hosts = [ "random-data-api.fermyon.app", "api.example.com:8080" ]
```

The Wasm module can make HTTP requests _only_ to the specified hosts. If a port is specified, the module can make requests only to that port; otherwise, the module can make requests only on the default HTTP and HTTPS ports. Requests to other hosts (or ports) will fail with an error.

For development-time convenience, you can also pass the string `"insecure:allow-all"` in the `allowed_http_hosts` collection. This allows the Wasm module to make HTTP requests to _any_ host and on any port. However, once you've determined which hosts your code needs, you should remove this string and list the hosts instead.  Other Spin implementations may restrict host access and disallow components that ask to connect to anything and everything!

### Making HTTP Requests Within an Application

In an HTTP component, you can use the special host `self` to make HTTP requests **within the current Spin application**. For example, if you make an outbound HTTP request to http://self/api/customers/, Spin replaces self with whatever host the application is running on. It also replaces the URL scheme (`http` or `https`) with the scheme of the current HTTP request. For example, if the application is running in the cloud, Spin changes `http://self/api` to `https://.../api`.

Using `self` means that the application doesn't need to know the URL where it's deployed, or whether it's running locally versus in the cloud.

> This doesn't work in Redis components because Spin uses the incoming HTTP request to determine the current host.

You must still grant permission by including `self` in `allowed_http_hosts`:

```toml
allowed_http_hosts = ["self"]
```