title = "Develop a Spin application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true

---
- [Prerequisites - Install the Spin CLI](#prerequisites---install-the-spin-cli)
- [Create a New Spin Application From a Template](#create-a-new-spin-application-from-a-template)
- [Run the Application](#run-the-application)
- [Write Your Code](#write-your-code)
- [Next Steps](#next-steps)

This article briefly describes how to create a new Spin application. For a more thorough guide to developing Spin applications, take a look [here](/spin/developing).

## Prerequisites - Install the Spin CLI

Before developing a Spin application, you need to have the Spin CLI installed locally. Here’s a way to install the Spin CLI:

<!-- @selectiveCpy -->

```bash
$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
```

{{ details "Additional info" "It's easier if you move the spin binary somewhere in your path, so it can be accessed from any directory. E.g., `sudo mv ./spin /usr/local/bin/spin`. \n\nYou can verify the version of Spin installed by running `spin --version`" }}

## Create a New Spin Application From a Template

You can create your very own application based on [templates from the Spin repository](https://github.com/fermyon/spin/tree/main/templates). Start by installing a set of Spin application templates [from the Spin repository](https://github.com/fermyon/spin/tree/main/templates):

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin --update
Copying remote template source
Installing template http-rust...
Installing template http-go...
...
+--------------------------------------------------+
| Name         Description                         |
+==================================================+
| http-rust    HTTP request handler using Rust     |
| http-go      HTTP request handler using (Tiny)Go |
| ...                                              |
+--------------------------------------------------+
```

{{ details "Additional info" "If you already have templates installed, you can update them by running `spin templates install --git https://github.com/fermyon/spin --update` \n\nIf you’re interested in building your own template, you can follow the guide here [templates from the Spin repository](https://github.com/fermyon/spin/tree/main/templates) and the [Spin Improvement Proposal (SIP) for templates](https://github.com/fermyon/spin/pull/273)." }}

We will be using the http-rust template to build our Spin Application, by running `spin new`:

<!-- @selectiveCpy -->

```bash
$ spin new
Pick a template to start your project with:
  http-c (HTTP request handler using C and the Zig toolchain)
  http-csharp (HTTP request handler using C# (EXPERIMENTAL))
  http-go (HTTP request handler using (Tiny)Go)
  http-grain (HTTP request handler using Grain)
> http-rust (HTTP request handler using Rust)
  http-swift (HTTP request handler using SwiftWasm)
  http-zig (HTTP request handler using Zig)
  redis-go (Redis message handler using (Tiny)Go)
  redis-rust (Redis message handler using Rust)

Enter a name for your new project: hello_rust
Project description: My first Rust Spin application
HTTP base: /
HTTP path: /...
```

The command created all the files we need to build and run our Spin Application. Here’s the `spin.toml` file — the manifest file for a Spin application:

<!-- @nocpy -->

```bash
spin_version = "1"
authors = ["Doc Docsen <docs@fermyon.com>"]
description = "My first Rust Spin application"
name = "hello_rust"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-rust"
source = "target/wasm32-wasi/release/hello_rust.wasm"
[component.trigger]
route = "/..."
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

Next, let’s build the app:

<!-- @selectiveCpy -->

```bash
$ spin build
Executing the build command for component hello-rust: cargo build --target wasm32-wasi --release
    Updating crates.io index
    Updating git repository `https://github.com/fermyon/spin`
    Updating git repository `https://github.com/bytecodealliance/wit-bindgen`
    ...
   Compiling hello-rust v0.1.0 (/Users/doc/hello_rust)
    Finished release [optimized] target(s) in 10.15s
Successfully ran the build command for the Spin components.
```

## Run the Application

Now it’s time to `spin up` the application:

<!-- @selectiveCpy -->

```bash
$ spin up
Serving http://127.0.0.1:3000
Available Routes:
  hello-rust: http://127.0.0.1:3000 (wildcard)
```

{{ details "Additional info" "To get information printed to the console, use the `--follow-all` flag when running `spin up`. /n/nYou can also set the RUST_LOG environment variable for detailed logs, before running `spin up`, e.g., `RUST_LOG=spin=debug spin up`." }}

Spin will instantiate all components from the application manifest, and will create the router configuration for the HTTP trigger accordingly. The component can now be invoked by making requests to `http://localhost:3000`:

<!-- @selectiveCpy -->

```
$ curl -i localhost:3000
HTTP/1.1 200 OK
foo: bar
content-length: 15

Hello, Fermyon
```

## Write Your Code

For this template, we have a single crate built from `src/lib.rs`, which contains the following code:

<!-- @nocpy -->

```rust
use anyhow::Result;
use spin_sdk::{
    http::{Request, Response},
    http_component,
};
/// A simple Spin HTTP component.
#[http_component]
fn hello_rust(req: Request) -> Result<Response> {
    println!("{:?}", req.headers());
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some("Hello, Fermyon".into()))?)
}
```

Let's change the body text returned to be a parameter from the URL, by changing the `hello_rust` function to the code below:

<!-- @nocpy -->

```rust
/// A simple Spin HTTP component, returning the value of the first URL parameter as a greeting.
/// Try `curl "http://localhost:3000?Doc"`
#[http_component]
fn hello_rust(req: Request) -> Result<Response> {
    println!("{:?}", req.headers());
    
    let query_string = req.uri().query();

    let reply_body = match query_string {
        Some(s) => format!("Hello {s}!"),
        None => "Who's there?".to_string(),
    };
    
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some(reply_body.into()))?)
}
```

This Spin application will now take the query string of the URL `http://localhost:3000?Doc` and return the text `Hello Doc!` as a greeting.

## Next Steps

- Learn how to [deploy an application](deploy)
- To learn more about how to develop Spin applications, head over to the [Spin documentation](/spin)
- Find known issues and file new ones with this [GitHub repository](https://github.com/fermyon/feedback)
