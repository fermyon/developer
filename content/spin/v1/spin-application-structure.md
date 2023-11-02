title = "Application Structure"
template = "spin_main"
date = "2023-08-20T00:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/spin-application-structure.md"
keywords = "structure"

---

As mentioned in this [blog post](https://www.fermyon.com/blog/spin-application-structure), we are often asked about how to structure Spin applications that involve multiple source code components. There are a few nuances to this discussion, such as the use of different application trigger types and how to modify an existing application's structure. These nuances are discussed in the blog post and also in [this video](https://www.youtube.com/watch?v=QQD-qodabSc). This page, however, will focus only on creating multi-component Spin applications from scratch using the http-empty template. This template serves as the foundation for the recommended Spin application structure when creating applications that respond to HTTP requests.

## Recommended Application Structure

If we start with a blank canvas and use the `http-empty` template we will get a new Spin application:

<!-- @selectiveCpy -->

```console
$ spin new http-empty
Enter a name for your new application: myapp
Description: My application
HTTP base: /
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
$ spin add http-rust
Enter a name for your new component: first-http-rust-component
Description: The first of many new components
HTTP path: /first/...
$ spin add http-rust
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
/// A simple Spin HTTP component.
#[http_component]
fn handle_first_http_rust_component(req: Request) -> Result<Response> {
    println!("{:?}", req.headers());
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some("Hello, First Component".into()))?)
}
```

```rust
/// A simple Spin HTTP component.
#[http_component]
fn handle_second_http_rust_component(req: Request) -> Result<Response> {
    println!("{:?}", req.headers());
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some("Hello, Second Component".into()))?)
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
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "My application"
name = "myapp"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "first-http-rust-component"
source = "first-http-rust-component/target/wasm32-wasi/release/first_http_rust_component.wasm"
allowed_http_hosts = []
[component.trigger]
route = "/first/..."
[component.build]
command = "cargo build --target wasm32-wasi --release"
workdir = "first-http-rust-component"
watch = ["src/**/*.rs", "Cargo.toml"]

[[component]]
id = "second-http-rust-component"
source = "second-http-rust-component/target/wasm32-wasi/release/second_http_rust_component.wasm"
allowed_http_hosts = []
[component.trigger]
route = "/second/..."
[component.build]
command = "cargo build --target wasm32-wasi --release"
workdir = "second-http-rust-component"
watch = ["src/**/*.rs", "Cargo.toml"]

[[component]]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.2/spin_static_fs.wasm", digest = "sha256:65456bf4e84cf81b62075e761b2b0afaffaef2d0aeda521b245150f76b96421b" }
id = "assets"
files = [ { source = "assets", destination = "/" } ]
[component.trigger]
route = "/static/..."

[[component]]
source = { url = "https://github.com/fermyon/spin-redirect/releases/download/v0.0.1/redirect.wasm", digest = "sha256:d57c3d91e9b62a6b628516c6d11daf6681e1ca2355251a3672074cddefd7f391" }
id = "additional-component-redirect"
environment = { DESTINATION = "/static/new.txt" }
[component.trigger]
route = "/static/old.txt"
executor = { type = "wagi" }
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