title = "Writing Spin Applications"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical = "https://developer.fermyon.com/spin/v2/writing-apps"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/writing-apps.md"

---
- [Writing an Application Manifest](#writing-an-application-manifest)
  - [The Application `trigger`](#the-application-trigger)
  - [The Component `id`](#the-component-id)
  - [The Component `source`](#the-component-source)
  - [The Component `trigger`](#the-component-trigger)
- [Writing a Component Wasm Module](#writing-a-component-wasm-module)
- [Creating an Application From a Template](#creating-an-application-from-a-template)
- [Adding a New Component to an Application](#adding-a-new-component-to-an-application)
- [Including Files with Components](#including-files-with-components)
- [Adding Environment Variables to Components](#adding-environment-variables-to-components)
- [Granting Networking Permissions to Components](#granting-networking-permissions-to-components)
- [Granting Storage Permissions to Components](#granting-storage-permissions-to-components)
- [Example Manifests](#example-manifests)
  - [Including a Directory of Files](#including-a-directory-of-files)
  - [Using Public Components](#using-public-components)
  - [Customizing the Executor](#customizing-the-executor)
  - [Setting the Redis Channel to Monitor](#setting-the-redis-channel-to-monitor)
- [Next Steps](#next-steps)

A Spin application consists of a set of WebAssembly (Wasm) _components_, and a _manifest_ that lists those components with some data about when and how to run them.  This page describes how to write components, manifests, and hence applications.

## Writing an Application Manifest

> You won't normally create a manifest by hand, but will instead [create](#creating-an-application-from-a-template) or [update](#adding-a-new-component-to-an-application) one from a template. Skip to those sections if that's what you want to do. But it's important to know what's inside a manifest for when you need to update component capabilities or troubleshoot a problem.

A Spin _application manifest_ is a [TOML](https://toml.io/) file that contains:

* Identification information about the application
* What events the application should run in response to (the _trigger_)
* The Wasm modules of the application and their associated settings (the _components_)
* Optionally, configuration variables that the user can set when running the application

By convention, the Spin manifest file is usually called `spin.toml`.

This example is the manifest for a simple HTTP application with a single component executed when the `/hello` endpoint is accessed:

<!-- @nocpy -->

```toml
# General identification information
spin_manifest_version = "1"
name = "spin-hello-world"
version = "1.0.0"
description = "A simple application that returns hello world."
# The application trigger. This application responds to HTTP requests
trigger = { type = "http", base = "/" }

# The single component
[[component]]
id = "hello"
description = "A simple component that returns hello world."
# The Wasm module to run for the component
source = "target/wasm32-wasi/release/helloworld.wasm"
# The component trigger. This component responds to HTTP requests to "/hello"
[component.trigger]
route = "/hello"
# How to build the Wasm module from source
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

You can look up the various fields in the [Manifest Reference](manifest-reference), but let's look at the key fields in more detail.

### The Application `trigger`

The most important field in the application-level section is the `trigger` field.  This tells Spin the _type_ of event that it should hook the application up to.  Spin has built-in support for responding to HTTP requests (`trigger = { type = "http" }`) and Redis messages (`trigger = { type = "redis" }`)

> In current versions of Spin, the trigger type is application-wide. You can't listen for Redis messages and HTTP requests in the same application.

Some triggers have additional application-level configuration options.  For example, the HTTP trigger requires you to provide a `base` field, which tells Spin the "root" route to which all component routes are relative.  See the [HTTP trigger](http-trigger) and [Redis trigger](redis-trigger) documentation for more details.

### The Component `id`

Component `id`s are identifier strings.  While not significant in themselves, they must be unique within the application.  Spin uses the `id` in logging and error messages to tell you which component a message applies to.

<!-- @nocpy -->

```toml
[[component]]
id = "hello"
```

### The Component `source`

Each component has a `source` field which tells Spin where to load the Wasm module from.

For components that you are working on locally, set it to the file path to the compiled Wasm module file.  This must be a relative path from the directory containing `spin.toml`.

<!-- @nocpy -->

```toml
[[component]]
source = "dist/cart.wasm"
```

For components that are published on the Web, provide a `url` field containing the URL of the Wasm module, and a `digest` field indicating the expected SHA256 hash of the module contents.  The digest must be prefixed with the string `sha256:`.  Spin uses the digest to check that the module is what you were expecting, and won't load the module if the content doesn't match.

<!-- @nocpy -->

```toml
[[component]]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.1/spin_static_fs.wasm", digest = "sha256:650376c33a0756b1a52cad7ca670f1126391b79050df0321407da9c741d32375" }
```

Multiple components can have the same source.  An example is a document archive, where one component might serve user interface assets (CSS, images, etc.) on one route, while another serves the documents themselves on another route - both using the same file server module, but with different settings.

### The Component `trigger`

Each component has a `trigger` field which contains per-component settings (as opposed to the application-level ones on the application's `trigger`).  In particular, this tells Spin when to run _this_ component rather than any other component.  For HTTP applications, the component trigger has a `route` that says which HTTP route the component should handle.  For Redis applications, the component trigger has a `channel` that says which Redis channel's messages the component should handle.  See the [HTTP trigger](http-trigger) and [Redis trigger](redis-trigger) documentation for more details.

<!-- @nocpy -->

```toml
[[component]]
[component.trigger]
route = "/hello"
```

## Writing a Component Wasm Module

> You won't normally create a component by hand, but will instead [create](#creating-an-application-from-a-template) or [add](#adding-a-new-component-to-an-application) one from a template. Skip to those sections if that's what you want to do. But it's important to know what a component looks like so you can understand where to write your own code.

At the Wasm level, a Spin component is a Wasm module that exports a handler for the application trigger.  At the developer level, a Spin component is a library or program that implements your event handling logic, and uses Spin interfaces, libraries, or tools to associate that with the events handled by Spin.

See the Language Guides section for how to do this in your preferred language. As an example, this is a component written in the Rust language. The `hello_world` function uses an attribute `#[http_component]` to identify the function as handling a Spin HTTP event. The function takes a `Request` and returns a `Result<Response>`:

```rust
#[http_component]​
fn hello_world(_req: Request) -> Result<Response> {​
    Ok(http::Response::builder()​
        .status(200)​
        .body(Some("Hello, Fermyon!".into()))?)​
}​
```

## Creating an Application From a Template

If you've installed the Spin templates for your preferred language, you can use them to get started without having to write a manifest or the boilerplate code yourself.  To do this, run the `spin new` command, and choose the template that matches the type of application you want to create, and the language you want to use.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

Choose the `http-rust` template to create a new HTTP application, or `redis-rust` to create a new Redis application.

<!-- @selectiveCpy -->

```bash
$ spin new
Pick a template to start your application with:
  http-c (HTTP request handler using C and the Zig toolchain)
  http-csharp (HTTP request handler using C# (EXPERIMENTAL))
  http-go (HTTP request handler using (Tiny)Go)
  http-grain (HTTP request handler using Grain)
> http-rust (HTTP request handler using Rust)
  http-swift (HTTP request handler using SwiftWasm)
  http-zig (HTTP request handler using Zig)
  redis-go (Redis message handler using (Tiny)Go)
  redis-rust (Redis message handler using Rust)

Enter a name for your new application: hello_rust
Project description: My first Rust Spin application
HTTP base: /
HTTP path: /...
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

Choose the `http-ts` or `http-js` template to create a new HTTP application, according to whether you want to use TypeScript or JavaScript.

> The JavaScript development kit doesn't yet support Redis applications.

<!-- @selectiveCpy -->

```bash
$ spin new
Pick a template to start your application with:
  http-js (HTTP request handler using Javascript)
> http-ts (HTTP request handler using Typescript)
Enter a name for your new application: hello_typescript
Project description: My first TypeScript Spin application
HTTP base: /
HTTP path: /...
```

{{ blockEnd }}

{{ startTab "Python"}}

Choose the `http-py` template to create a new HTTP application.

> The Python development kit doesn't yet support Redis applications.

<!-- @selectiveCpy -->

```bash
$ spin new
Pick a template to start your application with:
> http-py (HTTP request handler using Python)
Enter a name for your new application: hello_python
Description: My first Python Spin application
HTTP base: /
HTTP path: /...
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

Choose the `http-go` template to create a HTTP application, or `redis-go` to create a Redis application.

<!-- @selectiveCpy -->

```bash
$ spin new
Pick a template to start your application with:
  http-c (HTTP request handler using C and the Zig toolchain)
  http-empty (HTTP application with no components)
> http-go (HTTP request handler using (Tiny)Go)
  http-grain (HTTP request handler using Grain)
  http-php (HTTP request handler using PHP)
  http-rust (HTTP request handler using Rust)
Enter a name for your new application: hello_go
Description: My first Go Spin application
HTTP base: /
HTTP path: /...
```

{{ blockEnd }}

{{ blockEnd }}

All of these templates create a manifest containing a single component, and the source code for a minimal "hello world" component.

## Adding a New Component to an Application

To add a new component to an existing application using a template, run the `spin add` command. This works in a very similar way to `spin new`, except that it expects the `spin.toml` file to already exist, and adds the details for the new component to that `spin.toml`.

> Please take a look at the [Spin application structure](spin-application-structure) documentation, which explains how to achieve the recommended application structure (through the use of Spin templates via the `spin new` and `spin add` commands).

## Including Files with Components

You can include files with a component.  This means that:

1. The Wasm module will be able to read those files at runtime.
1. When you distribute or deploy the application, those files will be bundled with it so that the component can still access them.

To do this, use the `files` field in the component manifest:

<!-- @nocpy -->

```toml
[[component]]
files = [ "images/**/*.jpg", { source = "styles/dist", destination = "/styles" } ]
```

The `files` field is an array listing the files, patterns and directories you want to include. Each element of the array can be:

* A glob pattern, such as `images/**/*.jpg`.  In this case, the files that match the pattern are available to the Wasm code, at the same paths as they are in your file system. For example, if the glob pattern matches `images/photos/lake.jpg`, the Wasm module can access it using the path `images/photos/lake.jpg`.  Glob patterns are relative to the directory containing `spin.toml`, and must be within that directory.
* A mapping from a `source` directory to a `destination` directory, such as `{ source = "styles/dist", destination = "/styles" }`.  In this case, the entire contents of the source directory are available to the Wasm code at the destination directory.  In this example, if you have a file named `styles/dist/list/exciting.css`, the Wasm module can access it using the path `/styles/list/exciting.css`.  Source directories are relative to the directory containing `spin.toml`; destination directories must be absolute.

If your files list would match some files or directories that you _don't_ want included, you can use the `exclude_files` field to omit them.

> By default, Spin takes a snapshot of your included files, and components access that snapshot. This ensures that when you test your application, you are checking it with the set of files it will be deployed with. However, it also means that your component does not pick up changes to the files while it is running. When testing a Web site, you might want to be able to edit a HTML or CSS file, and see the changes reflected without restarting Spin. You can tell Spin to give components access to the original, "live" files by passing the `--direct-mounts` flag to `spin up`.

## Adding Environment Variables to Components

Environment variables can be provided to components via the Spin application manifest.

To do this, use the `environment` field in the component manifest:

<!-- @nocpy -->

```toml
[[component]]
environment = { PET = "CAT", FOOD = "WATERMELON" }
```

The field accepts a map of environment variable key/value pairs. They are mapped inside the component at runtime.

The environment variables can then be accessed inside the component. For example, in Rust:

```rs
#[http_component]
fn handle_hello_rust(req: Request) -> Result<Response> {
    let response = format!("My {} likes to eat {}", std::env::var("PET")?, std::env::var("FOOD")?);
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some(response.into()))?)
}
```

## Granting Networking Permissions to Components

By default, Spin components are not allowed to make outgoing HTTP requests.  This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing.  To grant a component permission to make HTTP requests to a particular host, use the `allowed_http_hosts` field in the component manifest:

<!-- @nocpy -->

```toml
[[component]]
allowed_http_hosts = [ "dog-facts.example.com", "api.example.com:8080" ]
```

The Wasm module can make HTTP requests _only_ to the specified hosts.  If a port is specified, the module can make requests only to that port; otherwise, the module can make requests only on the default HTTP and HTTPS ports.  Requests to other hosts (or other ports) will fail with an error.

For development-time convenience, you can also pass the string `"insecure:allow-all"` in the `allowed_http_hosts` collection.  This allows the Wasm module to make HTTP requests to _any_ host and on any port.  However, once you've determined which hosts your code needs, you should remove this string, and list the hosts instead.  Other Spin implementations may restrict host access, and may disallow components that ask to connect to anything and everything!

## Granting Storage Permissions to Components

By default, Spin components are not allowed to access Spin's storage services.  This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing.  To grant a component permission to use a Spin-provided store, use the `key_value_stores` field in the component manifest:

<!-- @nocpy -->

```toml
[[component]]
key_value_stores = [ "default" ]
```

See [Persisting Data with Spin](key-value-store-tutorial) for more information.

## Example Manifests

This section shows some examples of Spin component manifests.

### Including a Directory of Files

This example shows a Spin HTTP component that includes all the files in `static/` under the application directory, made available to the Wasm module at the `/` path.

<!-- @nocpy -->

```toml
[[component]]
source = "modules/spin_static_fs.wasm"
id = "fileserver"
files = [ { source = "static/", destination = "/" } ]
[component.trigger]
route = "/static/..."
```

### Using Public Components

This is similar to the file server component above, but gets the Wasm module from a public release instead of a local copy.  Notice that the files are still drawn from a local path.  This is a way in which you can use off-the-shelf component logic with your own application data.

<!-- @nocpy -->

```toml
[[component]]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.1/spin_static_fs.wasm", digest = "sha256:650376c33a0756b1a52cad7ca670f1126391b79050df0321407da9c741d32375" }
id = "fileserver"
files = [ { source = "static/", destination = "/" } ]
[component.trigger]
route = "/static/..."
```

### Customizing the Executor

This example shows an HTTP component whose Wasm module, instead of using the default Spin HTTP interface, uses the CGI-like WAGI (WebAssembly Gateway Interface) protocol. Spin can't work out the application model from the component, so the manifest needs to tell Spin to use WAGI instead of its default mode. It does this via the `executor` field. This is specific to the HTTP trigger so it goes under `component.trigger`.

In addition, this module does not provide its WAGI functionality via the default `_start` entry point, but via a custom entry point named `serve-wagi`.  The `executor` table needs to tell Spin this via the `entrypoint` field.  Finally, this component needs to run the WAGI entry point with a specific set of command line arguments, which are expressed in the WAGI executor's `argv` field.

<!-- @nocpy -->

```toml
[[component]]
source = "modules/env_wagi.wasm"
id = "env"
files = [ "content/**/*" , "templates/*", "scripts/*", "config/*"]
[component.trigger]
route = "/..."
executor = { type = "wagi", argv = "test ${SCRIPT_NAME} ${ARGS} done", entrypoint = "serve-wagi" }
```

### Setting the Redis Channel to Monitor

The example shows a Redis component.  The manifest sets the `channel` field to say which channel the component should monitor.  In this case, the component is invoked for new messages on the `messages` channel.

<!-- @nocpy -->

```toml
[[component]]
id = "echo-message"
source = "spinredis.wasm"
[component.trigger]
channel = "messages"
```

## Next Steps

- Learn about [Spin application structure](spin-application-structure)
- Learn about how to [build your Spin application code](build)
- Try [running your application locally](running-apps)
- Discover how Spin application authors [design and organise applications](see-what-people-have-built-with-spin)
- Learn about how to [configure your application at runtime](dynamic-configuration)
- Look up details in the [application manifest reference](manifest-reference)
- Try deploying a Spin application to the [Fermyon Cloud](/cloud/quickstart)