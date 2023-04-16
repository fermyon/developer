title = "Building Spin components in Rust"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main//content/spin/rust-components.md"

---
- [Prerequisites](#prerequisites)
  - [Install the Templates](#install-the-templates)
  - [Install the Tools](#install-the-tools)
- [HTTP Components](#http-components)
- [Redis Components](#redis-components)
- [Sending Outbound HTTP Requests](#sending-outbound-http-requests)
- [Storing Data in Redis From Rust Components](#storing-data-in-redis-from-rust-components)
- [Storing Data in the Spin Key-Value Store](#storing-data-in-the-spin-key-value-store)
- [Storing Data in Relational Databases](#storing-data-in-relational-databases)
- [Using External Crates in Rust Components](#using-external-crates-in-rust-components)
- [Troubleshooting](#troubleshooting)
- [Manually Creating New Projects With Cargo](#manually-creating-new-projects-with-cargo)

Spin aims to have best-in-class support for building components in Rust, and
writing such components should be familiar for Rust developers.

> This guide assumes you have Spin installed. If this is your first encounter with Spin, please see the [Quick Start](quickstart), which includes information about installing Spin with the Rust templates, installing required tools, and creating Rust applications.

> This guide assumes you are familiar with the Rust programming language,
> but if you are just getting started, be sure to check [the
official resources for learning Rust](https://www.rust-lang.org/learn).

> All examples from this page can be found in [the Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples).

## Prerequisites

### Install the Templates

You don't need the Spin Rust templates to work on Rust components, but they speed up creating new applications and components.  You can install them as follows:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin --update
Copying remote template source
Installing template redis-rust...
Installing template http-rust...
... other templates omitted ...
+------------------------------------------------------------------------+
| Name                Description                                        |
+========================================================================+
| ... other templates omitted ...                                        |
| http-rust           HTTP request handler using Rust                    |
| redis-rust          Redis message handler using Rust                   |
| ... other templates omitted ...                                        |
+------------------------------------------------------------------------+
```

Note: The Rust templates are in a repo that contains several other languages; they will all be installed together.

### Install the Tools

To build Spin components, you'll need the `wasm32-wasi` target for Rust.

<!-- @selectiveCpy -->

```bash
$ rustup target add wasm32-wasi
```

> If you get a lot of strange errors when you try to build your first Rust component, check that you have this target installed by running `rustup target list --installed`. This is the most common source of problems when starting out with Rust in Spin!

## HTTP Components

In Spin, HTTP components are triggered by the occurrence of an HTTP request, and
must return an HTTP response at the end of their execution. Components can be
built in any language that compiles to WASI, but Rust has improved support
for writing Spin components with the Spin Rust SDK.

> Make sure to read [the page describing the HTTP trigger](./http-trigger.md) for more
> details about building HTTP applications.

Building a Spin HTTP component using the Rust SDK means writing a single function
that takes an HTTP request as a parameter, and returns an HTTP response — below
is a complete implementation for such a component:

<!-- @nocpy -->

```rust
use anyhow::Result;
use spin_sdk::{
    http::{Request, Response},
    http_component,
};

/// A simple Spin HTTP component.
#[http_component]
fn hello_world(req: Request) -> Result<Response> {
    println!("{:?}", req);
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some("Hello, Fermyon!".into()))?)
}
```

The important things to note in the implementation above:

- the `spin_sdk::http_component` macro marks the function as the
  entry point for the Spin component
- the function signature — `fn hello_world(req: Request) -> Result<Response>` —
  the Spin HTTP component uses the HTTP objects from the popular Rust crate
  [`http`](https://crates.io/crates/http), and the request and response bodies
  are optionally using [`bytes::Bytes`](https://crates.io/crates/bytes)
  (`spin_sdk::http::Request` is a type alias for `http::Request<Option<Bytes>>`)
- the component returns a Rust `anyhow::Result`, so if there is an error processing the request, it returns an `anyhow::Error`.

## Redis Components

Besides the HTTP trigger, Spin has built-in support for a Redis trigger —
which will connect to a Redis instance and will execute Spin components for
new messages on the configured channels.

> See the [Redis trigger](./redis-trigger.md) for details about the Redis trigger.

Writing a Redis component in Rust also takes advantage of the SDK:

<!-- @nocpy -->

```rust
use anyhow::Result;
use bytes::Bytes;
use spin_sdk::redis_component;

/// A simple Spin Redis component.
#[redis_component]
fn on_message(message: Bytes) -> Result<()> {
    println!("{}", std::str::from_utf8(&message)?);
    Ok(())
}
```

- the `spin_sdk::redis_component` macro marks the function as the
  entry point for the Spin component
- in the function signature — `fn on_message(msg: Bytes) -> anyhow::Result<()>` —
`msg` contains the payload from the Redis channel
- the component returns a Rust `anyhow::Result`, so if there is an error
processing the request, it returns an `anyhow::Error`.

The component can be built with Cargo by executing:

<!-- @selectiveCpy -->

```bash
$ cargo build --target wasm32-wasi --release
```

The manifest for a Redis application must contain the address of the Redis
instance the trigger must connect to:

<!-- @nocpy -->

```toml
spin_manifest_version = "1"
name = "spin-redis"
trigger = { type = "redis", address = "redis://localhost:6379" }
version = "0.1.0"

[[component]]
id = "echo-message"
source = "target/wasm32-wasi/release/spinredis.wasm"
[component.trigger]
channel = "messages"
```

This application will connect to `redis://localhost:6379`, and for every new
message on the `messages` channel, the `echo-message` component will be executed:

<!-- @selectiveCpy -->

```bash
# first, start redis-server on the default port 6379
$ redis-server --port 6379
# then, start the Spin application
$ spin up --file spin.toml
# the application log file will output the following
INFO spin_redis_engine: Connecting to Redis server at redis://localhost:6379
INFO spin_redis_engine: Subscribed component 0 (echo-message) to channel: messages
```

For every new message on the  `messages` channel:

<!-- @selectiveCpy -->

```bash
$ redis-cli
127.0.0.1:6379> publish messages "Hello, there!"
```

Spin will instantiate and execute the component we just built, which will emit the `println!` message to the application log file:

```
INFO spin_redis_engine: Received message on channel "messages"
Hello, there!
```

> You can find a complete example for a Redis triggered component in the
> [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/redis-rust).

## Sending Outbound HTTP Requests

If allowed, Spin components can send outbound HTTP requests.
Let's see an example of a component that makes a request to
[an API that returns random dog facts](https://some-random-api.ml/facts/dog) and
inserts a custom header into the response before returning:

<!-- @nocpy -->

```rust
#[http_component]
fn hello_world(_req: Request) -> Result<Response> {
    let mut res = spin_sdk::http::send(
        http::Request::builder()
            .method("GET")
            .uri("https://some-random-api.ml/facts/dog")
            .body(None)?,
    )?;

    res.headers_mut()
        .insert(http::header::SERVER, "spin/0.1.0".try_into()?);

    Ok(res)
}
```

> The `http::Request::builder()` method is provided by the Rust `http` crate. The `http` crate is already added to projects using the Spin `http-rust` template. If you create a project without using this template, you'll need to add the `http` crate yourself via `cargo add http`.

Before we can execute this component, we need to add the `some-random-api.ml`
domain to the application manifest `allowed_http_hosts` list containing the list of
domains the component is allowed to make HTTP requests to:

<!-- @nocpy -->

```toml
# spin.toml
spin_manifest_version = "1"
name = "spin-hello-world"
trigger = { type = "http", base = "/" }
version = "1.0.0"

[[component]]
id = "hello"
source = "target/wasm32-wasi/release/spinhelloworld.wasm"
allowed_http_hosts = [ "some-random-api.ml" ]
[component.trigger]
route = "/outbound"
```

Running the application using `spin up --file spin.toml` will start the HTTP
listener locally (by default on `localhost:3000`), and our component can
now receive requests in route `/outbound`:

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000/outbound
HTTP/1.1 200 OK
date: Fri, 18 Mar 2022 03:54:36 GMT
content-type: application/json; charset=utf-8
content-length: 185
server: spin/0.1.0

{"fact":"It's rumored that, at the end of the Beatles song, 
\"A Day in the Life,\" Paul McCartney recorded an ultrasonic whistle, 
audible only to dogs, just for his Shetland sheepdog."}
```

> Without the `allowed_http_hosts` field populated properly in `spin.toml`,
> the component would not be allowed to send HTTP requests, and sending the
> request would result in a "Destination not allowed" error.

> You can set `allowed_http_hosts = ["insecure:allow-all"]` if you want to allow
> the component to make requests to any HTTP host. This is **NOT** recommended
> for any production or publicly-accessible application.

We just built a WebAssembly component that sends an HTTP request to another
service, manipulates that result, then responds to the original request.
This can be the basis for building components that communicate with external
databases or storage accounts, or even more specialized components like HTTP
proxies or URL shorteners.

## Storing Data in Redis From Rust Components

Using the Spin's Rust SDK, you can use the Redis key/value store and to publish
messages to Redis channels. This can be used from both HTTP and Redis triggered
components.

Let's see how we can use the Rust SDK to connect to Redis:

<!-- @nocpy -->

```rust
use anyhow::{anyhow, Result};
use spin_sdk::{
    http::{internal_server_error, Request, Response},
    http_component, redis,
};

// The environment variable set in `spin.toml` that points to the
// address of the Redis server that the component will publish
// a message to.
const REDIS_ADDRESS_ENV: &str = "REDIS_ADDRESS";

// The environment variable set in `spin.toml` that specifies
// the Redis channel that the component will publish to.
const REDIS_CHANNEL_ENV: &str = "REDIS_CHANNEL";

/// This HTTP component demonstrates fetching a value from Redis
/// by key, setting a key with a value, and publishing a message
/// to a Redis channel. The component is triggered by an HTTP
/// request served on the route configured in the `spin.toml`.
#[http_component]

fn publish(_req: Request) -> Result<Response> {
    let address = std::env::var(REDIS_ADDRESS_ENV)?;
    let channel = std::env::var(REDIS_CHANNEL_ENV)?;

    // Get the message to publish from the Redis key "mykey"
    let payload = redis::get(&address, "mykey").map_err(|_| anyhow!("Error querying Redis"))?;

    // Set the Redis key "spin-example" to value "Eureka!"
    redis::set(&address, "spin-example", &b"Eureka!"[..])
        .map_err(|_| anyhow!("Error executing Redis set command"))?;

    // Set the Redis key "int-key" to value 0
    redis::set(&address, "int-key", format!("{:x}", 0).as_bytes())
        .map_err(|_| anyhow!("Error executing Redis set command"))?;
    let int_value = redis::incr(&address, "int-key")
        .map_err(|_| anyhow!("Error executing Redis incr command",))?;
    assert_eq!(int_value, 1);

    // Publish to Redis
    match redis::publish(&address, &channel, &payload) {
        Ok(()) => Ok(http::Response::builder().status(200).body(None)?),
        Err(_e) => internal_server_error(),
    }
}
```

This HTTP component demonstrates fetching a value from Redis by key, setting a
key with a value, and publishing a message to a Redis channel. The component is
triggered by an HTTP request served on the route configured in the `spin.toml`:

<!-- @nocpy -->

```toml
[[component]]
environment = { REDIS_ADDRESS = "redis://127.0.0.1:6379", REDIS_CHANNEL = "messages" }
[component.trigger]
route = "/publish"
```

This HTTP component can be paired with a Redis component, triggered on new
messages on the `messages` Redis channel.

> You can find a complete example for using outbound Redis from an HTTP component
> in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/rust-outbound-redis).

## Storing Data in the Spin Key-Value Store

Spin has a key-value store built in. For information about using it from Rust, see [the key-value store tutorial](kv-store).

## Storing Data in Relational Databases

Spin provides clients for MySQL and PostgreSQL. For information about using them from Rust, see [Relational Databases](rdbms-storage).

## Using External Crates in Rust Components

In Rust, Spin components are regular libraries that contain a function
annotated using the `http_component` macro, compiled to the
[`wasm32-wasi` target](https://doc.rust-lang.org/stable/nightly-rustc/rustc_target/spec/wasm32_wasi/index.html).
This means that any [crate](https://crates.io) that compiles to `wasm32-wasi` can
be used when implementing the component.

## Troubleshooting

If you bump into issues building and running your Rust component, here are some common causes of problems:

- Make sure `cargo` is present in your path
- Make sure the [Rust](https://www.rust-lang.org/) version is recent.
  - To check: run  `cargo --version`.  The Spin SDK needs Rust 1.64 or above.
  - To update: run `rustup update`.
- Make sure the `wasm32-wasi` compiler target is installed.
  - To check: run `rustup target list --installed` and check that `wasm32-wasi` is on the list.
  - To install: run `rustup target add wasm32-wasi`.
- Make sure you are building in `release` mode.  Spin manifests refer to your Wasm file by a path, and the default path corresponds to `release` builds.
  - To build manually: run `cargo build --release --target wasm32-wasi`.
  - If you're using `spin build` and the templates, this should be set up correctly for you.
- Make sure that the `source` field in the component manifest match the path and name of the Wasm file in `target/wasm32-wasi/release`. These could get out of sync if you renamed the Rust package in its `Cargo.toml`.

## Manually Creating New Projects With Cargo

The recommended way of creating new Spin projects is by starting from a template.
This section shows how to manually create a new project with Cargo.

When creating a new Spin project with Cargo, you should use the `--lib` flag:

<!-- @selectiveCpy -->

```bash
$ cargo init --lib
```

A `Cargo.toml` with standard Spin dependencies looks like this:

<!-- @nocpy -->

```toml
[package]
name = "your-app"
version = "0.1.0"
edition = "2021"

[lib]
# Required to have a `cdylib` (dynamic library) to produce a Wasm module.
crate-type = [ "cdylib" ]

[dependencies]
# Useful crate to handle errors.
anyhow = "1"
# Crate to simplify working with bytes.
bytes = "1"
# General-purpose crate with common HTTP types.
http = "0.2"
# The Spin SDK.
spin-sdk = { git = "https://github.com/fermyon/spin" }
# Crate that generates Rust Wasm bindings from a WebAssembly interface.
wit-bindgen-rust = { git = "https://github.com/bytecodealliance/wit-bindgen", rev = "cb871cfa1ee460b51eb1d144b175b9aab9c50aba" }
```

> `wit-bindgen` evolves rapidly to track draft standards.  Very recent versions of `wit-bindgen` are unlikely to work correctly with Spin.  So the dependency must be pinned to a specific `rev`.  Over time, Spin expects to track "peninsulas of stability" in the evolving standards.
