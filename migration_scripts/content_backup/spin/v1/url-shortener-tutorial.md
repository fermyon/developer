title = "Building a URL Shortener With Spin"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/url-shortener-tutorial"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/url-shortener-tutorial.md"

---
- [A Simple URL Shortener Built With Spin](#a-simple-url-shortener-built-with-spin)
- [Here Is One We Prepared Earlier](#here-is-one-we-prepared-earlier)
- [Conclusion](#conclusion)

## A Simple URL Shortener Built With Spin

This tutorial will walk you through building a Spin component that
redirects short URLs to their configured destinations.
In essence, this is a simple HTTP component that returns a response that contains
redirect information based on the user-defined routes.

This is an evolving tutorial. As Spin allows building more complex components
(through supporting access to services like databases), this tutorial will be
updated to reflect that.

## Here Is One We Prepared Earlier

The complete implementation for this tutorial [can be found on GitHub](https://github.com/fermyon/url-shortener).

First, our URL shortener allows users to configure their own final URLs —
currently, that is done through a configuration file that contains multiple
`[[route]]` entries, each containing the shortened path as `source`, and
the `destination` URL:

```toml
[[route]]
source = "/spin"
destination = "https://github.com/fermyon/spin"

[[route]]
source = "/hype"
destination = "https://www.fermyon.com/blog/how-to-think-about-wasm"
```

Whenever a request for `https://<domain>/spin` is sent, our component will
redirect to `https://github.com/fermyon/spin`. Now that we have a basic
understanding of how the component should behave, let's see how to implement it
using Spin.

First, we start with [a new Spin component written in Rust](./rust-components.md):

```rust
/// A Spin HTTP component that redirects requests 
/// based on the router configuration.
#[http_component]
fn redirect(req: Request) -> Result<Response> {
    let router = Router::default()?;
    router.redirect(req)
}
```

All the component does is create a new router based on the default configuration,
then use it to redirect the request. Let's see how the router is defined:

```rust
#[derive(Debug, Deserialize, Serialize)]
pub struct Route {
    pub source: String,
    pub destination: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Router {
    #[serde(rename = "route")]
    pub routes: Vec<Route>,
}
```

The `Router` structure is a Rust representation of the TOML configuration above.

```rust
pub fn redirect(self, req: Request) -> Result<Response> {
    // read the request path from the `spin-path-info` header
    let path_info = req
        .headers()
        .get("spin-path-info")
        .expect("cannot get path info from request headers");
    // if the path is not present in the router configuration,
    // return 404 Not Found.
    let route = match self.path(path_info.to_str()?) {
        Some(r) => r,
        None => return not_found(),
    };
    // otherwise, return the redirect to the destination
    let res = http::Response::builder()
        .status(http::StatusCode::PERMANENT_REDIRECT)
        .header(http::header::LOCATION, route.destination)
        .body(None)?;
    Ok(res)
}
```

The `redirect` function is straightforward — it reads the request path from the
`spin-path-info` header (make sure to read the [document about the HTTP trigger](./http-trigger.md)
for an overview of the HTTP headers present in Spin components), selects the
corresponding destination from the router configuration, then sends the
HTTP redirect to the new location.

At this point, we can build and run the module with Spin:

```bash
$ spin build
$ spin up
```

And the component can now handle incoming requests:

<!-- @selectiveCpy -->

```bash
# based on the configuration file, a request
# to /spin should be redirected
$ curl -i localhost:3000/spin
HTTP/1.1 308 Permanent Redirect
location: https://github.com/fermyon/spin
content-length: 0
# based on the configuration file, a request
# to /hype should be redirected
$ curl -i localhost:3000/hype
HTTP/1.1 308 Permanent Redirect
location: https://www.fermyon.com/blog/how-to-think-about-wasm
content-length: 0
# /abc is not present in the router configuration,
# so this returns a 404.
$ curl -i localhost:3000/abc
HTTP/1.1 404 Not Found
content-length: 9

Not Found
```

> Notice that you can use the `--listen` option for `spin up` to start the
> web server on a specific host and port, which you can then bind to a domain.

We can now [publish the application to an OCI registry](./distributing-apps.md) (together
with router configuration file):

<!-- @selectiveCpy -->

```bash
$ spin registry push ghcr.io/alyssa-p-hacker/url-shortener:v1
Pushed with digest sha256:3c408a1b29b3098286c7ea5ab22f47248ccfadcc63ad5596ca0d85e3f522c43d
```

And now we can run the application directly from the registry:

<!-- @selectiveCpy -->

```bash
$ spin up -f ghcr.io/alyssa-p-hacker/url-shortener:v1

Serving http://127.0.0.1:3000
Available Routes:
  shortener: http://127.0.0.1:3000 (wildcard)
```

## Conclusion

In this tutorial we built a simple URL shortener as a Spin component.
In the future we will expand this tutorial by storing the router configuration
in a database supported by Spin, and potentially create another component that
can be used to add new routes to the configuration.
