title = "Testing Applications"
template = "spin_main"
date = "2024-05-05T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/testing-apps.md"

---

The `spin-test` plugin allows you to run tests, written in WebAssembly, against a Spin application (where all Spin and WASI APIs are configurable mocks).

To use `spin-test` you write test scenarios for your app in any language, with WebAssembly component support, and mock out all interactions your app has with the outside world without requiring any code changes to the app itself. That means the code you test in development is the same code that runs in production.

> Note: `spin-test` is still under active development and so the details here may have changed since this post was first published. Check [the spin-test repo](https://github.com/fermyon/spin-test) for the latest information on installation and usage.

## Prerequisites

The example below uses the [Rust programming language](https://www.rust-lang.org/) and [cargo components](https://github.com/bytecodealliance/cargo-component)(a cargo subcommand for building WebAssembly components).

## Installing the Plugin

To run `spin-test` , you’ll first need to install the canary release of the plugin. As `spin-test` matures, we’ll be making stable releases:

```bash
spin plugin install -u https://github.com/fermyon/spin-test/releases/download/canary/spin-test.json
```

This will install the plugin which can be invoked with `spin test`.

## Creating App and Component

First, create an empty Spin app, change into that app folder and then add a component inside it:

<!-- @selectiveCpy -->

```bash
$ spin new -t http-empty my-component --accept-defaults
$ cd my-component/
$ spin add -t http-rust my-component --accept-defaults
```

## Creating a Test Suite

We, change back into the app's root directory and use `cargo new` to create a test suite, and then change into that directory:

<!-- @selectiveCpy -->

```bash
$ cargo new tests --lib
$ cd tests
```

From within that test suite, we then add the spin-test SDK reference:

<!-- @selectiveCpy -->

```bash
$ cargo add spin-test-sdk --git https://github.com/fermyon/spin-test
```

Then, we open the `Cargo.toml` file and edit to add the crate-type of `cdylib`:

<!-- @selectiveCpy -->

```toml
[lib]
crate-type = ["cdylib"]
```

The `my-component/tests/Cargo.toml` file will look like this after editing:

```toml
[package]
name = "tests"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
spin-test-sdk = { git = "https://github.com/fermyon/spin-test", version = "0.1.0" }
```

## Writing a Test

Next, create a test test that `spin-test` can run as a compiled WebAssembly component.

There is currently first-class support for Rust, but any language with support for writing WebAssembly components can be used as long as the `fermyon:spin-test/test` world is targeted. You can find the definition of this world [here](https://github.com/fermyon/spin-test/blob/4dcaf79c10fc29a8da2750bdaa383b5869db1715/host-wit/world.wit#L13-L16).

Here’s an example of a test written in Rust using the [Spin Test Rust SDK](https://github.com/fermyon/spin-test/tree/main/crates/spin-test-sdk) that tests to ensure that the Spin app responds properly when the key-value store has a certain key already set.

Open the `my-component/tests/src/lib.rs` file and fill it with the following content:

```rust
use spin_test_sdk::{
    bindings::{
        // fermyon::spin_test_virt::{http_handler, key_value},
        wasi::http,
    },
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
```

The following points are intended to unpack the above example for your understanding:

- Each function marked with `#[spin_test]` will be run as a separate test.
- Each test can perform any setup to their environment by using the APIs available in `spin_test_sdk::bindings::fermyon::spin_test_virt`.
- Requests are made to the Spin application using the `spin_test_sdk::perform_request` function.
- After requests are made, you can use the APIs in `spin_test_sdk::bindings::fermyon::spin_test_virt` to check how the request has changed the state of various resources (such as the key/value store) and make assertions that things changed in the way you expected.

The test above will run inside of WebAssembly. Calls, such as Key Value storage and retrieval, never actually leave the WebAssembly sandbox. This means your tests are quick and reproducible as you don’t need to rely on running an actual web server, and you don’t need to ensure any of your app’s dependencies are running. Everything your app interacts with is mocked for you.

<!-- markdownlint-disable-next-line titlecase-rule -->
## Configure `spin-test`

Before you can run the test, you'll need to tell `spin-test` where your test lives and how to build it. You do this from inside our app’s manifest (the `spin.toml` file). We change back up into our application's root directory:

<!-- @selectiveCpy -->

```bash
$ cd ..
```

Then we edit the application's manifest (the `spin.toml` file) as shown below:

<!-- @selectiveCpy -->

```toml
[component.my-component.tool.spin-test]
source = "tests/target/wasm32-wasi/release/tests.wasm"
build = "cargo component build --release"
dir = "tests"
```

The whole file will look like the following:

```toml
spin_manifest_version = 2

[application]
name = "my-component"
version = "0.1.0"
authors = ["tpmccallum <tim.mccallum@fermyon.com>"]
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

```bash
$ spin build
$ spin-test

running 1 test
Handling request to Some(HeaderValue { inner: String("http://localhost/?user_id=123") })
test it-works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.68s
```

## Next Steps

`spin-test` is still in the early days of development, so you’re likely to run into things that don’t quite work yet. We’d love to hear about your experience so we can prioritize which features and bugs to fix first. We’re excited about the future potential of using WebAssembly components for testing, and we look forward to hearing about your experiences as we continue the development of `spin-test`.