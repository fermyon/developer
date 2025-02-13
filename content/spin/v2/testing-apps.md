title = "Testing Applications"
template = "spin_main"
date = "2024-05-05T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/testing-apps.md"

---

The [spin test plugin](https://github.com/spinframework/spin-test) allows you to run tests, written in WebAssembly, against a Spin application (where all Spin and WASI APIs are configurable mocks).

To use `spin test` you write test scenarios for your app in any language with WebAssembly component support, and mock out all interactions your app has with the outside world without requiring any code changes to the app itself. That means the code you test in development is the same code that runs in production.

> Note: `spin test` is still under active development and so the details here may have changed since this post was first published. Check [the spin-test repo](https://github.com/spinframework/spin-test) for the latest information on installation and usage.

## Prerequisites

The example below uses the [Rust programming language](https://www.rust-lang.org/) and [cargo components](https://github.com/bytecodealliance/cargo-component)(a cargo subcommand for building WebAssembly components).

## Installing the Plugin

To run `spin test` , you’ll first need to install the canary release of the plugin. As `spin test` matures, we’ll be making stable releases:

```bash
spin plugin install -u https://github.com/spinframework/spin-test/releases/download/canary/spin-test.json
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

There is currently first-class support for writing tests in Rust, but any language with support for writing WebAssembly components can be used as long as the `fermyon:spin-test/test` world is targeted. You can find the definition of this world [here](https://github.com/spinframework/spin-test/blob/4dcaf79c10fc29a8da2750bdaa383b5869db1715/host-wit/world.wit#L13-L16). For this example, we'll use Rust.

We use `cargo` to create a test suite, and then change into our newly created `tests` directory:

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
$ cargo add spin-test-sdk --git https://github.com/spinframework/spin-test
```

Then, we open the `Cargo.toml` file from within in the `tests` directory and edit to add the `crate-type` of `cdylib`:

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
spin-test-sdk = { git = "https://github.com/spinframework/spin-test", version = "0.1.0" }

[lib]
crate-type = ["cdylib"]
```

## Writing a Test

Next, create a test that `spin test` can run as a compiled WebAssembly component.

In this example, we will write some tests appropriate to a JSON API service for information about service users. Here are two such tests written in Rust using the [Spin Test Rust SDK](https://github.com/spinframework/spin-test/tree/main/crates/spin-test-sdk). The first test ensures that the Spin app responds properly to an HTTP request. The second test ensures that the Spin app responds properly when the user data is present in the key-value store - for testing purposes, simulated by inserting it into a "virtual" store.

Open the `my-app/tests/src/lib.rs` file and fill it with the following content:

```rust
use spin_test_sdk::{
    bindings::{fermyon::spin_test_virt, wasi, wasi::http},
    spin_test,
};

#[spin_test]
fn send_get_request_without_key() {
    // Perform the request
    let request = http::types::OutgoingRequest::new(http::types::Headers::new());
    request.set_path_with_query(Some("/")).unwrap();
    let response = spin_test_sdk::perform_request(request);

    // Assert response status and body is 404
    assert_eq!(response.status(), 404);
}

#[spin_test]
fn send_get_request_with_invalid_key() {
    // Perform the request
    let request = http::types::OutgoingRequest::new(http::types::Headers::new());
    request.set_path_with_query(Some("/x?123")).unwrap();
    let response = spin_test_sdk::perform_request(request);

    // Assert response status and body is 404
    assert_eq!(response.status(), 404);
}

#[spin_test]
fn send_get_request_with_invalid_key_id() {
    // Perform the request
    let request = http::types::OutgoingRequest::new(http::types::Headers::new());
    request.set_path_with_query(Some("/user?0")).unwrap();
    let response = spin_test_sdk::perform_request(request);

    // Assert response status and body is 404
    assert_eq!(response.status(), 404);
}

#[spin_test]
fn cache_hit() {
    let user_json = r#"{"id":123,"name":"Ryan"}"#;

    // Configure the app's virtualised 'default' key-value store ready for the test
    let key_value = spin_test_virt::key_value::Store::open("default");
    // Set a specific key with a specific value
    key_value.set("123", user_json.as_bytes());

    // Make the request against the Spin app
    let request = wasi::http::types::OutgoingRequest::new(wasi::http::types::Headers::new());
    request.set_path_with_query(Some("/user?123")).unwrap();
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
- After requests are made, you can use the APIs in `spin_test_sdk::bindings::fermyon::spin_test_virt` to make assertions that confirm that the request has been responded to (e.g. response status equals 200) or that expected Spin API calls (e.g. `get` to the key/value API) have been made.

The tests above run inside of WebAssembly. Calls, such as Key Value storage and retrieval, never actually leave the WebAssembly sandbox. This means your tests are quick and reproducible as you don’t need to rely on running an actual web server, and you don’t need to ensure any of your app’s dependencies are running. Everything your app interacts with is mocked for you. The isolation benefits from this mocking mean that your application's actual data is never touched. There is also the added benefit of reproducibility whereby you never have to worry about leftover data from previous tests.

<!-- markdownlint-disable-next-line titlecase-rule -->
## Configure `spin-test`

Before you can run the test, you'll need to tell `spin-test` where your test lives and how to build it. You do this from inside our app’s manifest (the `spin.toml` file). We change back up into our application's root directory:

<!-- @selectiveCpy -->

```bash
$ cd ..
```

Then we edit the `my-app` application's manifest (the `spin.toml` file) by adding the following block:

```toml
[component.my-component.tool.spin-test]
source = "tests/target/wasm32-wasi/release/tests.wasm"
build = "cargo component build --release"
workdir = "tests"
```

## Updating the App to Pass the Tests

This section provides configuration and business logic at the application level. 

### Configure App Storage

We are using Key Value storage in the application and therefore need to configure the list of allowed `key_value_stores` in our `spin.toml` file (in this case we are just using the `default`). Go ahead and paste the `key_value_stores` configuration directly inside the `[component.my-component]` section, as shown below:

<!-- @nocpy -->

```toml
[component.my-component]
...
key_value_stores = ["default"]
...
```

> If you would like to learn more about Key Value storage, see [this tutorial](./key-value-store-tutorial.md).

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
key_value_stores = ["default"]
[component.my-component.build]
command = "cargo build --target wasm32-wasi --release"
workdir = "my-component"
watch = ["src/**/*.rs", "Cargo.toml"]

[component.my-component.tool.spin-test]
source = "tests/target/wasm32-wasi/release/tests.wasm"
build = "cargo component build --release"
dir = "tests"
```

### Adding Business Logic

The goal of tests is to ensure that the business logic in our application works as intended. We haven't yet updated our "business logic" frrom the "Hello, Fermyon" app. To make our new tests pass, copy and paste the following code into the application's source file (located at `my-app/my-component/src/lib.rs`):

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
        Method::Get => {
            // Get the value associated with the request URI, or return a 404 if it's not present
            match store.get(req.query())? {
                Some(value) => {
                    println!("Found value for the key {:?}", req.query());
                    (200, Some(value))
                }
                None => {
                    println!("No value found for the key {:?}", req.query());
                    (404, None)
                }
            }
        }
        // No other methods are currently supported
        _ => (405, None),
    };
    Ok(Response::new(status, body))
}
```

## Building and Running the Test

With the application's configuration and business logic done, we're ready for our test to be run. We can do this by invoking `spin-test` from the application's root directory (`my-app`):

<!-- @selectiveCpy -->

```bash
$ spin build
$ spin test

running 4 tests
No value found for the key "123"
test request-with-invalid-key    ... ok
Found value for the key "123"
test cache-hit                   ... ok
No value found for the key "0"
test request-with-invalid-key-id ... ok
No value found for the key ""
test request-without-key         ... ok

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 2.08s
```

## Next Steps

`spin-test` is still in the early days of development, so you’re likely to run into things that don’t quite work yet. We’d love to hear about your experience so we can prioritize which features and bugs to fix first. We’re excited about the future potential of using WebAssembly components for testing, and we look forward to hearing about your experiences as we continue the development of `spin-test`.

You might also like to learn about `spin doctor` which is a command-line tool that detects and helps fix issues preventing applications from building and running. For more information see the [troubleshooting applications page](./troubleshooting-application-dev.md).
