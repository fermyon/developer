title = "Application Structure"
template = "spin_main"
date = "2023-11-02T16:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/spin-application-structure.md"
keywords = "structure"

---

A Spin application can contain multiple components. If more than one component is built from source, you should consider how to organise the application project.

> If you have multiple components, but all except one is downloaded from a remote source such as a URL, you don't need to worry about the additional structure recommended on this page here. For example, an application with one custom component and two fileserver components doesn't need to start from the `empty` template.

The discussion on this page assumes that you know from the start that you are going to need to build multiple components. If you've already started a project, you may need to move some existing code around when you add your second built-from-source component. For information about this, see [this Spin Application Structure blog post](https://www.fermyon.com/blog/spin-application-structure) or [this video](https://www.youtube.com/watch?v=QQD-qodabSc).

> The blog post and video show manifest changes in the Spin 1 format. In the Spin 2 manifest format, the changes are similar, affecting the component `source` and `build` sections.

## Recommended Application Structure

If we start with a blank canvas and use the `http-empty` template we will get a new Spin application:

<!-- @selectiveCpy -->

```console
$ spin new -t http-empty
Enter a name for your new application: myapp
Description: My application
```

The above command will provide an empty structure, as shown below:

<!-- @nocpy -->

```console
└── myapp
    └── spin.toml
```

To add new components to the application, we simply move into the `myapp` directory and begin to add components using the `spin add` subcommand:

<!-- @selectiveCpy -->

```console
$ spin add -t http-rust
Enter a name for your new component: first-http-rust-component
Description: The first of many new components
HTTP path: /first/...
$ spin add -t http-rust
Enter a name for your new component: second-http-rust-component
Description: The second of many new components
HTTP path: /second/...
```

After adding two new components, we can see the visual representation of our application. Notice the symmetry; there is no hierarchy or nesting of components:

<!-- @nocpy -->

```console
.
├── first-http-rust-component
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── second-http-rust-component
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── spin.toml
```

To customize each of the two components, we can modify the `lib.rs` (Rust source code) of each component:

```rust
#[http_component]
fn handle_first_http_rust_component(req: Request) -> Result<Response> {
    Ok(http::Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body("Hello, First Component")?)
}
```

```rust
#[http_component]
fn handle_second_http_rust_component(req: Request) -> Result<Response> {
    Ok(http::Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body("Hello, Second Component")?)
}
```

As an additional example of adding more components, let's add a new static file server component:

<!-- @selectiveCpy -->

```console
$ spin add static-fileserver
Enter a name for your new component: assets
HTTP path: /static/...
Directory containing the files to serve: assets
```

After the static file server component is added, we create the `assets` directory (our local directory containing the files to serve) and then add some static content into the `assets` directory to be served:

<!-- @selectiveCpy -->

```console
$ mkdir assets
$ cp ~/Desktop/my-static-image.jpg assets
$ cp ~/Desktop/old.txt assets
$ cp ~/Desktop/new.txt assets
```

> The above commands are just an example that assumes you have the image (`my-static-image.jpg`) and two text files (`old.txt` & `new.txt`) on your Desktop.

Why stop there? We can add even more functionality to our application. Let's now add a `redirect` component to redirect requests made to `/static/old.txt` and forward those through to `/static/new.txt`:

<!-- @selectiveCpy -->

```console
$ spin add redirect
Enter a name for your new component: additional-component-redirect
Redirect from: /static/old.txt
Redirect to: /static/new.txt
```

We now have 4 separate components scaffolded for us by Spin. Note the application manifest (the `spin.toml` file) is correctly configured based on our `spin add` commands:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "myapp"
version = "0.1.0"

[[trigger.http]]
route = "/first/..."
component = "first-http-rust-component"

[component.first-http-rust-component]
source = "first-http-rust-component/target/wasm32-wasi/release/first_http_rust_component.wasm"
allowed_http_hosts = []
[component.first-http-rust-component.build]
command = "cargo build --target wasm32-wasi --release"
workdir = "first-http-rust-component"
watch = ["src/**/*.rs", "Cargo.toml"]

[[trigger.http]]
route = "/second/..."
component = "second-http-rust-component"

[component.second-http-rust-component]
source = "second-http-rust-component/target/wasm32-wasi/release/second_http_rust_component.wasm"
allowed_http_hosts = []
[component.second-http-rust-component.build]
command = "cargo build --target wasm32-wasi --release"
workdir = "second-http-rust-component"
watch = ["src/**/*.rs", "Cargo.toml"]

[[trigger.http]]
route = "/static/..."
component = "assets"

[component.assets]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.1.0/spin_static_fs.wasm", digest = "sha256:96c76d9af86420b39eb6cd7be5550e3cb5d4cc4de572ce0fd1f6a29471536cb4" }
files = [ { source = "assets", destination = "/" } ]

[[trigger.http]]
component = "additional-component-redirect"
route = "/static/old.txt"

[component.additional-component-redirect]
source = { url = "https://github.com/fermyon/spin-redirect/releases/download/v0.1.0/redirect.wasm", digest = "sha256:8bee959843f28fef2a02164f5840477db81d350877e1c22cb524f41363468e52" }
environment = { DESTINATION = "/static/new.txt" }
```

Also, note that the application's folder structure, scaffolded for us by Spin via the spin add commands, is symmetrical and shows no nesting of components:

<!-- @nocpy -->

```console
├── assets
│   ├── my-static-image.jpg
│   ├── new.txt
│   └── old.txt
├── first-http-rust-component
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── second-http-rust-component
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── spin.toml
```

This is the recommended Spin application structure.

## Next Steps

- Learn about how to [build your Spin application code](build)
- Try [running your application locally](running-apps)
- Discover how Spin application authors [design and organise applications](see-what-people-have-built-with-spin)
- Learn about how to [configure your application at runtime](dynamic-configuration)
- Look up details in the [application manifest reference](manifest-reference)
- Try deploying a Spin application to the [Fermyon Cloud](/cloud/quickstart)