title = "Building Spin components in Rust"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/rust-components.md"

---
- [Prerequisites](#prerequisites)
  - [Install the Templates](#install-the-templates)
  - [Install the Tools](#install-the-tools)
- [HTTP Components](#http-components)
- [Redis Components](#redis-components)
- [Sending Outbound HTTP Requests](#sending-outbound-http-requests)
- [Routing in a Component](#routing-in-a-component)
- [Storing Data in Redis From Rust Components](#storing-data-in-redis-from-rust-components)
- [Storing Data in the Spin Key-Value Store](#storing-data-in-the-spin-key-value-store)
  - [Serializing Objects to the Key-Value Store](#serializing-objects-to-the-key-value-store)
- [Storing Data in SQLite](#storing-data-in-sqlite)
- [Storing Data in Relational Databases](#storing-data-in-relational-databases)
- [Using External Crates in Rust Components](#using-external-crates-in-rust-components)
  - [Using the `http` crate](#using-the-http-crate)
- [AI Inferencing From Rust Components](#ai-inferencing-from-rust-components)
- [Troubleshooting](#troubleshooting)
- [Manually Creating New Projects With Cargo](#manually-creating-new-projects-with-cargo)
- [Read the Rust Spin SDK Documentation](#read-the-rust-spin-sdk-documentation)

Spin aims to have best-in-class support for building components in Rust, and
writing such components should be familiar for Rust developers.

> This guide assumes you have Spin installed. If this is your first encounter with Spin, please see the [Quick Start](quickstart), which includes information about installing Spin with the Rust templates, installing required tools, and creating Rust applications.

> This guide assumes you are familiar with the Rust programming language,
> but if you are just getting started, be sure to check [the
official resources for learning Rust](https://www.rust-lang.org/learn).

> All examples from this page can be found in [the Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples).

[**Want to go straight to the Spin SDK reference documentation?**  Find it here.](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/index.html)

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

Building a Spin HTTP component using the Rust SDK means writing a single function decorated with the [`#[http_component]`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/attr.http_component.html) attribute. The function can have one of two forms:

* takes an HTTP request as a parameter, and returns an HTTP response — shown below
* taken as parameters _both_ the HTTP request and an object through which to write a response - see [the HTTP trigger page](./http-trigger#authoring-http-components) for an example.

```rust
use spin_sdk::http::{Request, Response, IntoResponse};
use spin_sdk::http_component;

/// A simple Spin HTTP component.
#[http_component]
async fn handle_hello_rust(_req: Request) -> anyhow::Result<impl IntoResponse> {
    Ok(Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body("Hello, Fermyon")
        .build())
}
```

The important things to note in the implementation above:

- the [`spin_sdk::http_component`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/attr.http_component.html) macro marks the function as the entry point for the Spin component
- the function signature — `fn hello_world(req: Request) -> Result<impl IntoResponse>` —
  the Spin HTTP component allows for a flexible set of response types via the [`IntoResponse`](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/trait.IntoResponse.html) trait, including the SDK's `Response` type and the `Response` type from the Rust [`http` crate](https://crates.io/crates/http). See the section on [using the `http` crate](#using-the-http-crate) for more information.

> If you're familiar with Spin 1.x, you will see some changes when upgrading to the Spin 2 SDK. Mostly these provide more flexibility, but you will likely need to change some details such as module paths. If you don't want to modify your code, you can continue using the 1.x SDK - your components will still run.

## Redis Components

Besides the HTTP trigger, Spin has built-in support for a Redis trigger —
which will connect to a Redis instance and will execute Spin components for
new messages on the configured channels.

> See the [Redis trigger](./redis-trigger.md) for details about the Redis trigger.

Writing a Redis component in Rust also takes advantage of the SDK:

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
spin_manifest_version = 2
name = "spin-redis"
version = "0.1.0"

[application.trigger.redis]
address = "redis://localhost:6379"

[[trigger.redis]]
channel = "messages"
component = { source = "target/wasm32-wasi/release/spinredis.wasm" }
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
[an API that returns random animal facts](https://random-data-api.fermyon.app/animals/json) and
inserts a custom header into the response before returning:

```rust
use anyhow::Result;
use spin_sdk::{
    http::{IntoResponse, Request, Method, Response},
    http_component,
};

#[http_component]
async fn send_outbound(_req: Request) -> Result<impl IntoResponse> {
    // Create the outbound request object
    let req = Request::builder()
        .method(Method::Get)
        .uri("https://random-data-api.fermyon.app/animals/json")
        .build();

    // Send the request and await the response
    let res: Response = spin_sdk::http::send(req).await?;

    println!("{:?}", res);  // log the response
    Ok(res)
}
```

> The `http::Request::builder()` method is provided by the Rust `http` crate. The `http` crate is already added to projects using the Spin `http-rust` template. If you create a project without using this template, you'll need to add the `http` crate yourself via `cargo add http`.

Before we can execute this component, we need to add the `random-data-api.fermyon.app`
domain to the component's `allowed_outbound_hosts` list in the application manifest. This contains the list of
domains the component is allowed to make network requests to:

<!-- @nocpy -->

```toml
# spin.toml
spin_manifest_version = 2

[application]
name = "animal-facts"
version = "1.0.0"

[[trigger.http]]
route = "/..."
component = "get-animal-fact"

[component.get-animal-fact]
source = "get-animal-fact/target/wasm32-wasi/release/get_animal_fact.wasm"
allowed_outbound_hosts = ["https://random-data-api.fermyon.app"]
```

Running the application using `spin up` will start the HTTP
listener locally (by default on `localhost:3000`), and our component can
now receive requests in route `/outbound`:

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000
HTTP/1.1 200 OK
date: Fri, 27 Oct 2023 03:54:36 GMT
content-type: application/json; charset=utf-8
content-length: 185
spin-component: get-animal-fact

{"timestamp":1684299253331,"fact":"Reindeer grow new antlers every year"}   
```

> Without the `allowed_outbound_hosts` field populated properly in `spin.toml`,
> the component would not be allowed to send HTTP requests, and sending the
> request would result in a "Destination not allowed" error.

> You can set `allowed_outbound_hosts = ["https://*:*"]` if you want to allow
> the component to make requests to any HTTP host. This is not recommended
> unless you have a specific need to contact arbitrary servers and perform your own safety checks.

We just built a WebAssembly component that sends an HTTP request to another
service, manipulates that result, then responds to the original request.
This can be the basis for building components that communicate with external
databases or storage accounts, or even more specialized components like HTTP
proxies or URL shorteners.

> The Spin SDK for Rust provides more flexibility than we show here, including allowing streaming uploads or downloads. See the [Outbound HTTP API Guide](./http-outbound.md) for more information.

## Routing in a Component

The Rust SDK [provides a router](https://github.com/fermyon/spin/tree/main/examples/http-rust-router) that makes it easier to handle routing within a component:

```rust
use anyhow::Result;
use spin_sdk::{
    http::{IntoResponse, Params, Request, Response, Router},
    http_component,
};

/// A Spin HTTP component that internally routes requests.
#[http_component]
fn handle_route(req: Request) -> Response {
    let mut router = Router::new();
    router.get("/goodbye/:planet", api::goodbye_planet);
    router.any_async("/*", api::echo_wildcard);
    router.handle(req)
}

mod api {
    use super::*;

    // /goodbye/:planet
    pub fn goodbye_planet(_req: Request, params: Params) -> Result<impl IntoResponse> {
        let planet = params.get("planet").expect("PLANET");
        Ok(Response::new(200, planet.to_string()))
    }

    // /*
    pub async fn echo_wildcard(_req: Request, params: Params) -> Result<impl IntoResponse> {
        let capture = params.wildcard().unwrap_or_default();
        Ok(Response::new(200, capture.to_string()))
    }
}
```

> For further reference, see the [Spin SDK HTTP router](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/http/struct.Router.html).

## Storing Data in Redis From Rust Components

Using the Spin's Rust SDK, you can use the Redis key/value store and to publish
messages to Redis channels. This can be used from both HTTP and Redis triggered
components.

Let's see how we can use the Rust SDK to connect to Redis:

```rust
use anyhow::Context;
use spin_sdk::{
    http::{responses::internal_server_error, IntoResponse, Request, Response},
    http_component,
    redis::Connection,
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
fn publish(_req: Request) -> anyhow::Result<impl IntoResponse> {
    let address = std::env::var(REDIS_ADDRESS_ENV)?;
    let channel = std::env::var(REDIS_CHANNEL_ENV)?;

    // Establish a connection to Redis
    let conn = Connection::open(&address)?;

    // Get the message to publish from the Redis key "mykey"
    let payload = conn
        .get("mykey")
        .context("Error querying Redis")?
        .context("'mykey' was unexpectedly empty")?;

    // Set the Redis key "spin-example" to value "Eureka!"
    conn.set("spin-example", &"Eureka!".to_owned().into_bytes())
        .context("Error executing Redis set command")?;

    // Set the Redis key "int-key" to value 0
    conn.set("int-key", &format!("{:x}", 0).into_bytes())
        .context("Error executing Redis set command")?;
    let int_value = conn
        .incr("int-key")
        .context("Error executing Redis incr command")?;
    assert_eq!(int_value, 1);

    // Publish to Redis
    match conn.publish(&channel, &payload) {
        Ok(()) => Ok(Response::builder().status(200).build()),
        Err(_e) => Ok(internal_server_error())
    }
}
```

As with all networking APIs, you must grant access to Redis hosts via the `allowed_outbound_hosts` field in the application manifest:

<!-- @nocpy -->

```toml
[component.redis-test]
environment = { REDIS_ADDRESS = "redis://127.0.0.1:6379", REDIS_CHANNEL = "messages" }
# Note this contains only the host and port - do not include the URL!
allowed_outbound_hosts = ["redis://127.0.0.1:6379"]
```

This HTTP component can be paired with a Redis component, triggered on new
messages on the `messages` Redis channel.

> You can find a complete example for using outbound Redis from an HTTP component
> in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/rust-outbound-redis).

## Storing Data in the Spin Key-Value Store

Spin has a key-value store built in. For information about using it from Rust, see [the key-value store tutorial](key-value-store-tutorial).

### Serializing Objects to the Key-Value Store

The Spin key-value API stores and retrieves only lists of bytes. The Rust SDK provides helper functions that allow you to store and retrieve [Serde](https://docs.rs/serde/latest/serde) serializable values in a typed way. The underlying storage format is JSON (and is accessed via the `get_json` and `set_json` helpers). 

To make your objects serializable, you will also need a reference to `serde`. The relevant `Cargo.toml` entries look like this:

```
[dependencies]
// --snip --
serde = { version = "1.0.163", features = ["derive"] }
// --snip --
```

We configure our application to provision the default `key_value_stores` by adding the following line to our application's manifest (the `spin.toml` file), at the component level:

```
[component.redis-test]
key_value_stores = ["default"]
```

The Rust code below shows how to store and retrieve serializable objects from the key-value store (note how the example below implements Serde's `derive` feature):

```rust
use anyhow::Context;
use serde::{Deserialize, Serialize};
use spin_sdk::{
    http::{Request, Response},
    http_component,
    key_value::Store,
};

// Define a serializable User type
#[derive(Serialize, Deserialize)]
struct User {
    fingerprint: String,
    location: String,
}

#[http_component]
fn handle_request(_req: Request) -> anyhow::Result<Response> {
    // Open the default key-value store
    let store = Store::open_default()?;

    // Create an instance of a User object and populate the values
    let user = User {
        fingerprint: "0x1234".to_owned(),
        location: "Brisbane".to_owned(),
    };
    // Store the User object using the "my_json" key
    store.set_json("my_json", &user)?;
    // Retrieve the user object from the key-value store, using the "my_json" key
    let retrieved_user: User = store.get_json("my_json")?.context("user not found")?;
    // Return the user's fingerprint as the response body
    Ok(Response::builder()
        .status(200)
        .body(retrieved_user.fingerprint)
        .build())
}
```

> If you are familiar with Spin 1.x, you will be used to `get` and `get_json` returning a `Result<...>`, with "key not found" being one of the error cases. In Spin 2, `get` and `get_json` return `Result<Option<...>>`, with "key not found" represented by `Ok(None)`.

Once built and running (using `spin build` and `spin up`) you can test the above example in your browser (by visiting localhost:3000) or via curl, as shown below:

<!-- @selectiveCpy -->

```bash
$ curl localhost:3000
HTTP/1.1 200 OK

0x1234
```

For more information on the Rust key-value API see [the Spin SDK documentation](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/key_value/index.html).

## Storing Data in SQLite

For more information about using SQLite from Rust, see [SQLite storage](sqlite-api-guide).

## Storing Data in Relational Databases

Spin provides clients for MySQL and PostgreSQL. For information about using them from Rust, see [Relational Databases](rdbms-storage).

## Using External Crates in Rust Components

In Rust, Spin components are regular libraries that contain a function
annotated using the `http_component` macro, compiled to the
[`wasm32-wasi` target](https://doc.rust-lang.org/stable/nightly-rustc/rustc_target/spec/wasm32_wasi/index.html).
This means that any [crate](https://crates.io) that compiles to `wasm32-wasi` can
be used when implementing the component.

### Using the `http` crate

If you're already familiar with the popular [`http` crate](https://crates.io/crates/http), you may wish to use that instead of using the HTTP types included in the Spin SDK. Generally, the `http` crate's types can be used anywhere the Spin SDK HTTP types can be used. For example, the first basic HTTP component can be rewritten to use the `http` crate like so:

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

Of course, you'll need to remember to add the http crate to your `Cargo.toml`:

```
[dependencies]
// --snip --
http = "0.2.9"
// --snip --
```

## AI Inferencing From Rust Components

For more information about using Serverless AI from Rust, see the [Serverless AI](serverless-ai-api-guide) API guide.

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
# The Spin SDK.
spin-sdk = { git = "https://github.com/fermyon/spin" }
```

## Read the Rust Spin SDK Documentation

Although you learned a lot by following the concepts and samples shown here, you can dive even deeper and read the [Rust Spin SDK documentation](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/index.html).
