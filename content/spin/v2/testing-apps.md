title = "Testing Applications"
template = "spin_main"
date = "2024-05-05T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/testing-apps.md"

---

The [spin test plugin](https://github.com/fermyon/spin-test) allows you to run tests, written in WebAssembly, against a Spin application (where all Spin and WASI APIs are configurable mocks).

To use `spin-test` you write test scenarios for your app in any language with WebAssembly component support, and mock out all interactions your app has with the outside world without requiring any code changes to the app itself. That means the code you test in development is the same code that runs in production.

> Note: `spin-test` is still under active development and so the details here may have changed since this post was first published. Check [the spin-test repo](https://github.com/fermyon/spin-test) for the latest information on installation and usage.

## Prerequisites

The example below uses the [Rust programming language](https://www.rust-lang.org/) and [cargo components](https://github.com/bytecodealliance/cargo-component)(a cargo subcommand for building WebAssembly components).

## Installing the Plugin

To run `spin test` , you’ll first need to install the canary release of the plugin. As `spin test` matures, we’ll be making stable releases:

```bash
spin plugin install -u https://github.com/fermyon/spin-test/releases/download/canary/spin-test.json
```

This will install the plugin which can be invoked with `spin test`.

## Creating App and Component

First, create an empty Spin app, change into that app folder and then add a component inside it:

<!-- @selectiveCpy -->

```bash
$ spin new -t http-empty my-app --accept-defaults
$ cd my-app/
$ spin add -t http-rust my-component --accept-defaults
```

The above commands will scaffold out the application in the following format:

<!-- @nocpy -->

```bash
my-app/
├── my-component
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── spin.toml
```

## Creating a Test Suite

There is currently first-class support for Rust, but any language with support for writing WebAssembly components can be used as long as the `fermyon:spin-test/test` world is targeted. You can find the definition of this world [here](https://github.com/fermyon/spin-test/blob/4dcaf79c10fc29a8da2750bdaa383b5869db1715/host-wit/world.wit#L13-L16).

We use `cargo` (Rust's package manager & build system) to create a test suite, and then change into our newly created `tests` directory:

<!-- @selectiveCpy -->

```bash
$ cargo new tests --lib
$ cd tests
```

After running the cargo new command we will have the following application structure:

<!-- @nocpy -->

```bash
my-app/
├── my-component
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── spin.toml
└── tests
    ├── Cargo.toml
    └── src
        └── lib.rs
```

From within that test suite (from inside the `tests` directory), we then add the spin-test SDK reference:

<!-- @selectiveCpy -->

```bash
$ cargo add spin-test-sdk --git https://github.com/fermyon/spin-test
```

Then, we open the `Cargo.toml` file from within in the `tests` directory and edit to add the `crate-type` of `cdylib`:

<!-- Leaving out annotation so this can just be copied by the user without any frills -->

```toml
[lib]
crate-type = ["cdylib"]
```

The `my-app/tests/Cargo.toml` file will look like this after editing:

```toml
[package]
name = "tests"
version = "0.1.0"
edition = "2021"

[dependencies]
spin-test-sdk = { git = "https://github.com/fermyon/spin-test", version = "0.1.0" }

[lib]
crate-type = ["cdylib"]
```

## Writing a Test

Next, create a test that `spin-test` can run as a compiled WebAssembly component.

Here’s an example of two tests written in Rust using the [Spin Test Rust SDK](https://github.com/fermyon/spin-test/tree/main/crates/spin-test-sdk). The first test ensures that the Spin app responds properly to an HTTP request. The second test ensures that the Spin app responds properly when the key-value store has a certain key already set.

Open the `my-app/tests/src/lib.rs` file and fill it with the following content:

<!-- Leaving out annotation so this can just be copied by the user without any frills -->

```rust
use spin_test_sdk::bindings::{
    // fermyon::spin_test_virt::{http_handler, key_value},
    wasi::http,
};
use spin_test_sdk::{
    bindings::{fermyon::spin_test_virt, wasi},
    spin_test,
};

#[spin_test]
fn it_works() {
    make_request();
}

fn make_request() {
    // Perform the request
    let request = http::types::OutgoingRequest::new(http::types::Headers::new());
    request.set_path_with_query(Some("/?user_id=123")).unwrap();
    let response = spin_test_sdk::perform_request(request);

    // Assert response status and body
    assert_eq!(response.status(), 200);
}

#[spin_test]
fn cache_hit() {
    let user_json = r#"{"id":123,"name":"Ryan"}"#;

    // Configure the app's 'cache' key-value store
    let key_value = spin_test_virt::key_value::Store::open("cache");
    // Set a specific key with a specific value
    key_value.set("123", user_json.as_bytes());

    // Make the request against the Spin app
    let request = wasi::http::types::OutgoingRequest::new(wasi::http::types::Headers::new());
    request.set_path_with_query(Some("/user_id?id=123")).unwrap();
    let response = spin_test_sdk::perform_request(request);

    // Assert the response status and body
    assert_eq!(response.status(), 200);
    let body = response.body_as_string().unwrap();
    assert_eq!(body, user_json);

    // Assert the key-value store was queried
    assert_eq!(
        key_value.calls(),
        vec![spin_test_virt::key_value::Call::Get("123".to_owned())]
    );
}
```

The following points are intended to unpack the above example for your understanding:

- Each function marked with `#[spin_test]` will be run as a separate test.
- Each test can perform any setup to their environment by using the APIs available in `spin_test_sdk::bindings::fermyon::spin_test_virt`
- After requests are made, you can use the APIs in `spin_test_sdk::bindings::fermyon::spin_test_virt` to make assertions that confirm that the request has been responded to (i.e. response status equals 200) or that the state of various resources (i.e. key/value store) have been changed.

The tests above run inside of WebAssembly. Calls, such as Key Value storage and retrieval, never actually leave the WebAssembly sandbox. This means your tests are quick and reproducible as you don’t need to rely on running an actual web server, and you don’t need to ensure any of your app’s dependencies are running. Everything your app interacts with is mocked for you.

<!-- markdownlint-disable-next-line titlecase-rule -->
## Configure `spin-test`

Before you can run the test, you'll need to tell `spin-test` where your test lives and how to build it. You do this from inside our app’s manifest (the `spin.toml` file). We change back up into our application's root directory:

<!-- @selectiveCpy -->

```bash
$ cd ..
```

Then we edit the `my-app` application's manifest (the `spin.toml` file) by adding the following block:

<!-- Leaving out annotation so this can just be copied by the user without any frills -->

```toml
[component.my-component.tool.spin-test]
source = "tests/target/wasm32-wasi/release/tests.wasm"
build = "cargo component build --release"
dir = "tests"
```

After editing, the whole `my-app/spin.toml` file will look like the following:

```toml
spin_manifest_version = 2

[application]
name = "my-app"
version = "0.1.0"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = ""

[[trigger.http]]
route = "/..."
component = "my-component"

[component.my-component]
source = "my-component/target/wasm32-wasi/release/my_component.wasm"
allowed_outbound_hosts = []
[component.my-component.build]
command = "cargo build --target wasm32-wasi --release"
workdir = "my-component"
watch = ["src/**/*.rs", "Cargo.toml"]

[component.my-component.tool.spin-test]
source = "tests/target/wasm32-wasi/release/tests.wasm"
build = "cargo component build --release"
dir = "tests"
```

## Building and Running the Test

Finally, we're ready for our test to be run. We can do this by invoking `spin-test` from the directory where our Spin application lives:

<!-- @selectiveCpy -->

```bash
$ spin build
$ spin test

running 2 tests
Handling request to Some(HeaderValue { inner: String("http://localhost/?user_id=123") })
thread '<unnamed>' panicked at src/lib.rs:42:5:
assertion `left == right` failed
  left: "Hello, Fermyon"
 right: "{\"id\":123,\"name\":\"Ryan\"}"
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
test cache-hit ... FAILED
Handling request to Some(HeaderValue { inner: String("http://localhost/?user_id=123") })
test it-works  ... ok

failures:

---- cache-hit ----
test 'spin-test-cache-hit' failed 


failures:
    cache-hit

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 1.16s
```

When running the above `spin test` command, we now notice that one of the tests fails. This output is correct and a good example of how the tests can catch missed implementation in the application's code. 

The reason that one test fails is we still need to update the application code to store and retrieve data from the Key Value store. The other test that is successfully passing is doing so because it is correctly receiving a response code of `200`. (We will still see this correct response once we update the logic to return the Key Value data in the response.)

The templated application source code is as follows:

<!-- @nocpy -->

```
#[http_component]
fn handle_my_component(req: Request) -> anyhow::Result<impl IntoResponse> {
    println!("Handling request to {:?}", req.header("spin-full-url"));
    Ok(Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body("Hello, Fermyon")
        .build())
}
```

Update the application's code in `my-app/my-component/src/lib.rs` to match the following:

<!-- @selectiveCpy -->

```rust
use spin_sdk::{
    http::{IntoResponse, Request, Response, Method},
    http_component,
    key_value::Store,
};

#[http_component]
fn handle_request(req: Request) -> anyhow::Result<impl IntoResponse> {
    // Open the default key-value store
    let store = Store::open_default()?;

    let (status, body) = match *req.method() {
        Method::Post => {
            // Add the request (URI, body) tuple to the store
            store.set(req.path(), req.body())?;
            println!(
                "Storing value in the KV store with {:?} as the key",
                req.path()
            );
            (200, None)
        }
        Method::Get => {
            // Get the value associated with the request URI, or return a 404 if it's not present
            match store.get(req.path())? {
                Some(value) => {
                    println!("Found value for the key {:?}", req.path());
                    (200, Some(value))
                }
                None => {
                    println!("No value found for the key {:?}", req.path());
                    (404, None)
                }
            }
        }
        Method::Delete => {
            // Delete the value associated with the request URI, if present
            store.delete(req.path())?;
            println!("Delete key {:?}", req.path());
            (200, None)
        }
        Method::Head => {
            // Like GET, except do not return the value
            let code = if store.exists(req.path())? {
                println!("{:?} key found", req.path());
                200
            } else {
                println!("{:?} key not found", req.path());
                404
            };
            (code, None)
        }
        // No other methods are currently supported
        _ => (405, None),
    };
    Ok(Response::new(status, body))
}
```

Then add the following line to the application's manifest (the `my-app/spin.toml` file) (within the `[component.my-component]` section):

```toml
[component.my-component]
...
key_value_stores = ["default"]
...
```

> If you would like to learn more about Key Value storage, see [this tutorial](./key-value-store-tutorial.md).

Next, we can build and run the application and store a value inside the Key Value store:

<!-- @selectiveCpy -->

```
```bash
$ spin build
$ spin up
```

In a fresh terminal, issue the following command that performs a POST request with our data:

<!-- @selectiveCpy -->

```bash
$ curl localhost:3000/user_id -H 'Content-Type: application/json' -d '{"id":123, "name": "Ryan"}'
```

We can check the data is in there using the following command (which is same logic as our test):

<!-- @selectiveCpy -->

```bash
$ curl localhost:3000/user_id?id=123
```

With that data in place, the `spin test` command (that uses a GET request to obtail the `user_id` where `123` is the `id`) will yield two passing tests:

<!-- @selectiveCpy -->

```bash
$ spin test


```

## Next Steps

`spin-test` is still in the early days of development, so you’re likely to run into things that don’t quite work yet. We’d love to hear about your experience so we can prioritize which features and bugs to fix first. We’re excited about the future potential of using WebAssembly components for testing, and we look forward to hearing about your experiences as we continue the development of `spin-test`.