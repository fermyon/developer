title = "Writing Spin Applications"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]
url = "https://github.com/fermyon/spin/blob/main/docs/content/configuration.md"

---
- [Spin Components](#spin-components)
- [Spin Application Manifest](#spin-application-manifest)
- [Next Steps](#next-steps)

Spin applications are comprised of general information (metadata), and a collection
of at least one _component_. Configuration for a Spin application lives in a TOML
file called `spin.toml` (the _application manifest_). In the example below we can see
a simple HTTP application with a single component executed when the `/hello` endpoint
is accessed:

```toml
spin_version = "1"
name = "spin-hello-world"
description = "A simple application that returns hello world."
trigger = { type = "http", base = "/" }
version = "1.0.0"

[[component]]
id = "hello"
description = "A simple component that returns hello world."
source = "target/wasm32-wasi/release/spinhelloworld.wasm"
[component.trigger]
route = "/hello"
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

## Spin Components

At the Wasm level, a Spin component is a Wasm module that exports a handler for the application trigger.  At the developer level, a Spin component is a library or program that implements your event handling logic, and uses Spin interfaces, libraries, or tools to associate that with the events handled by Spin.

See the Language Guides section for how to do this in your preferred language.  As an example, though, this is a component written in the Rust language.  The `hello_world` function uses an attribute to identify the function as handling a Spin HTTP event.  The function takes a `Request` and returns a `Result<Response>`:

<!-- @nocpy -->

```rust
#[http_component]​
fn hello_world(_req: Request) -> Result<Response> {​
    Ok(http::Response::builder()​
        .status(200)​
        .body(Some("Hello, Fermyon!".into()))?)​
}​
```

## Spin Application Manifest

Spin components are wired up into applications using the application manifest.  See the examples below, or the [manifest reference](manifest-reference) for full details.

- a Spin HTTP component that contains the files in `static/` mapped to `/`:

<!-- @nocpy -->

```toml
[[component]]
source = "modules/spin_static_fs.wasm"
id = "fileserver"
files = [ { source = "static/", destination = "/" } ]
[component.trigger]
route = "/static/..."
```

- the same static file serving component, but getting the Wasm module from a public release instead of a local copy:

<!-- @nocpy -->

```toml
[[component]]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.1/spin_static_fs.wasm", digest = "sha256:650376c33a0756b1a52cad7ca670f1126391b79050df0321407da9c741d32375" }
id = "fileserver"
files = [ { source = "static/", destination = "/" } ]
[component.trigger]
route = "/static/..."
```

- a Wagi HTTP component that contains file mounts and sets the module `argv` and
  invokes a custom export function as the entry point:

<!-- @nocpy -->

```toml
[[component]]
source = "modules/env_wagi.wasm"
id = "env"
files = [ "content/**/*" , "templates/*", "scripts/*", "config/*"]
[component.trigger]
route = "/..."
executor = { type = "wagi", argv = "test ${SCRIPT_NAME} ${ARGS} done", entrypoint = "some-other-export-function" }
```

- a Redis component that is invoked for new messages on the `messages` channel:

<!-- @nocpy -->

```toml
[[component]]
id = "echo-message"
source = "spinredis.wasm"
[component.trigger]
channel = "messages"
```

## Next Steps

- Learn about how to [develop a Spin application](developing)
- Learn about how to [configure your application at runtime](dynamic-configuration)
- Look up details in the [application manifest reference](manifest-reference)
- Try deploying a Spin application to the [Fermyon Cloud](/cloud/quickstart)
