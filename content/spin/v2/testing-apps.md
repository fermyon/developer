title = "Testing Applications"
template = "spin_main"
date = "2024-05-05T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/testing-apps.md"

---

The `spin-test` plugin allows you to run tests, written in WebAssembly, against a Spin application (where all Spin and WASI APIs are configurable mocks).

To use `spin-test` you write test scenarios for your app in any language, with WebAssembly component support, and mock out all interactions your app has with the outside world without requiring any code changes to the app itself. That means the code you test in development is the same code that runs in production.

## Prerequisites

Spin test requires Spin 2.5 or newer. Please [install](./install.md) or [upgrade](./upgrade.md) Spin to begin.

## Installing the Plugin

To run `spin-test` , you’ll first need to install the canary release of the plugin. As `spin-test` matures, we’ll be making stable releases:

```bash
spin plugin install -u https://github.com/fermyon/spin-test/releases/download/canary/spin-test.json
```

This will install the plugin which can be invoked with `spin test`:

## Writing a Test

Next, you'll need a test that `spin-test` can run compiled to a WebAssembly component.

There is currently first-class support for Rust, but any language with support for writing WebAssembly components can be used as long as the `fermyon:spin-test/test` world is targeted. You can find the definition of this world [here](https://github.com/fermyon/spin-test/blob/4dcaf79c10fc29a8da2750bdaa383b5869db1715/host-wit/world.wit#L13-L16).

Here’s an example of a test written in Rust using the [Spin Test Rust SDK](https://github.com/fermyon/spin-test) that tests to ensure that the Spin app responds properly when the key-value store has a certain key already set:

```rust
use spin_test_sdk::{
    bindings::{fermyon::spin_test_virt, wasi},
    spin_test,
};

#[spin_test]
fn cache_hit() {
    let user_json = r#"{"id":123,"name":"Ryan"}"#;

    // Configure the app's 'cache' key-value store
    let key_value = spin_test_virt::key_value::Store::open("cache");
    // Set a specific key with a specific value
    key_value.set("123", user_json.as_bytes());

    // Make the request against the Spin app
    let request = wasi::http::types::OutgoingRequest::new(wasi::http::types::Headers::new());
    request.set_path_with_query(Some("/?user_id=123")).unwrap();
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

The test above will run inside of WebAssembly. The calls to the key-value store and the Spin app itself never leave the WebAssembly sandbox. This means your tests are quick and reproducible as you don’t need to rely on running an actual web server, and you don’t need to ensure any of your app’s dependencies are running. Everything your app interacts with is mocked for you.

## Configure Spin Test

Before we can run the test, we'll need to tell `spin-test` where our test lives and how to build it. We do this from inside our app’s manifest (the `spin.toml` file). Let's imagine our app has a component named "my-component" that we want to test. In the manifest we can add the following configuration:

```toml
[component.my-component.tool.spin-test]
# A relative path to where the built test component binary will live.
source = "my-test/target/wasm32-wasi/release/test.wasm"
# A command for building the target component.
build = "cargo component build --release"
# The directory where the `build` command should be run.
dir = "my-test"
```

## Running the Test

Finally, we're ready for our test to be run. We can do this simply by invoking `spin-test` from the directory where our Spin application lives:

```bash
$ spin-test

running 1 test
test cache-hit ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.46s
```

## Next Steps

`spin-test` is still in the early days of development, so you’re likely to run into things that don’t quite work yet. We’d love to hear about your experience so we can prioritize which features and bugs to fix first. We’re excited about the future of testing powered by WebAssembly components, and we look forward to hearing about your experiences as we continue the development of `spin-test`.