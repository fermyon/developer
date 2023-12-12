title = "Writing Spin Applications"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/writing-apps.md"

---
- [Writing an Application Manifest](#writing-an-application-manifest)
  - [The `trigger` Fields](#the-trigger-fields)
  - [The Component Name](#the-component-name)
  - [The Component `source`](#the-component-source)
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
* What events the application should run in response to (the _triggers_)
* The Wasm modules of the application and their associated settings (the _components_)
* Optionally, configuration variables that the user can set when running the application

By convention, the Spin manifest file is usually called `spin.toml`.

This example is the manifest for a simple HTTP application with a single trigger executed when the `/hello` endpoint is accessed:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

# General identification information
[application]
name = "spin-hello-world"
version = "1.0.0"
description = "A simple application that returns hello world."

# The application's sole trigger. This application responds to HTTP requests
# on the path "/hello", and handles them using the "hello" component.
[[trigger.http]]
route = "/hello"
component = "hello"

# The "hello" component
[component.hello]
description = "A simple component that returns hello world."
# The Wasm module to run for the component
source = "target/wasm32-wasi/release/helloworld.wasm"
# How to build the Wasm module from source
[component.hello.build]
command = "cargo build --target wasm32-wasi --release"
```

You can look up the various fields in the [Manifest Reference](manifest-reference), but let's look at the key fields in more detail.

### The `trigger` Fields

An application contains one or more _triggers_.  Each trigger specifies a type, an event of that type that the application responds to, and a component to handle that event.

> In current versions of Spin, all triggers in the application must be of the same type. You can't listen for Redis messages and HTTP requests in the same application.

The description above might sound a bit abstract. Let's clarify it with a concrete example. The most common trigger type is `http`, for which events are distinguished by the route. So an HTTP trigger might look like this:

```toml
# double square brackets because there could be multiple 'trigger.http' tables
[[trigger.http]]       # the type is part of the TOML "section"
route = "/hello"       # the route (event) that this trigger responds to
component = "greeter"  # the component to handle the trigger
```

Put the type (`http`), event (`route = "/hello"`), and component (`greeter`) together, and this is saying "when the application gets an HTTP request to `/hello`, respond to it using the `greeter` component.

For more details about `http` triggers, see the [HTTP trigger](http-trigger) documentation.

Another trigger type is `redis`, which is triggered by Redis pub-sub messages. For the `redis` type, the trigger event is specified by a pub-sub channel, e.g. `channel = "alerts"`. See the [Redis trigger](redis-trigger) documentation for more information.

Multiple triggers may refer to the same component. For example, you could have another trigger on `/dober-dan` which also invokes the `greeter` component.

Some triggers have additional application-level configuration options.  For example, the HTTP trigger allows you to provide a `base` field, which tells Spin the "root" route to which all component routes are relative.  See the [HTTP trigger](http-trigger) and [Redis trigger](redis-trigger) documentation for more details.

> If you're familiar with Spin 1.x, note that triggers are now distinct entries in the manifest, and _refer_ to components, instead of being specified _inside_ components.

### The Component Name

Component names are identifier strings.  While not significant in themselves, they must be unique within the application.  Triggers use names to refer to components, and Spin uses the name in logging and error messages to tell you which component a message applies to.

Each component is a TOML table, and the name is written as part of the table header. For example:

<!-- @nocpy -->

```toml
[component.greeter]
```

### The Component `source`

Each component has a `source` field which tells Spin where to load the Wasm module from.

For components that you are working on locally, set it to the file path to the compiled Wasm module file.  This must be a relative path from the directory containing `spin.toml`.

<!-- @nocpy -->

```toml
[component.shopping-cart]
source = "dist/cart.wasm"
```

For components that are published on the Web, provide a `url` field containing the URL of the Wasm module, and a `digest` field indicating the expected SHA256 hash of the module contents.  The digest must be prefixed with the string `sha256:`.  Spin uses the digest to check that the module is what you were expecting, and won't load the module if the content doesn't match.

<!-- @nocpy -->

```toml
[component.asset-server]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.1/spin_static_fs.wasm", digest = "sha256:650376c33a0756b1a52cad7ca670f1126391b79050df0321407da9c741d32375" }
```

Multiple components can have the same source.  An example is a document archive, where one component might serve user interface assets (CSS, images, etc.) on one route, while another serves the documents themselves on another route - both using the same file server module, but with different settings.

## Writing a Component Wasm Module

> You won't normally create a component by hand, but will instead [create](#creating-an-application-from-a-template) or [add](#adding-a-new-component-to-an-application) one from a template. Skip to those sections if that's what you want to do. But it's important to know what a component looks like so you can understand where to write your own code.

At the Wasm level, a Spin component is a Wasm component or module that exports a handler for the application trigger.  At the developer level, a Spin component is a library or program that implements your event handling logic, and uses Spin interfaces, libraries, or tools to associate that with the events handled by Spin.

See the Language Guides section for how to do this in your preferred language. As an example, this is a component written in the Rust language. The `hello_world` function uses an attribute `#[http_component]` to identify the function as handling a Spin HTTP event. The function takes a `Request` and returns a `Result<Response>`:

```rust
#[http_component]​
fn hello_world(_req: Request) -> Result<Response> {​
    Ok(Response::builder()​
        .status(200)​
        .body("Hello, Fermyon!")?)​
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
[component.asset-server]
files = [ "images/**/*.jpg", { source = "styles/dist", destination = "/styles" } ]
```

The `files` field is an array listing the files, patterns and directories you want to include. Each element of the array can be:

* A glob pattern, such as `images/**/*.jpg`.  In this case, the files that match the pattern are available to the Wasm code, at the same paths as they are in your file system. For example, if the glob pattern matches `images/photos/lake.jpg`, the Wasm module can access it using the path `images/photos/lake.jpg`.  Glob patterns are relative to the directory containing `spin.toml`, and must be within that directory.
* A mapping from a `source` file or directory to a `destination` location, such as `{ source = "styles/dist", destination = "/styles" }`.  In this case, the file, or the entire contents of the source directory, are available to the Wasm code at the destination location.  In this example, if you have a file named `styles/dist/list/exciting.css`, the Wasm module can access it using the path `/styles/list/exciting.css`.  Source locations are relative to the directory containing `spin.toml`; destination locations must be absolute.

If your files list would match some files or directories that you _don't_ want included, you can use the `exclude_files` field to omit them.

> By default, Spin takes a snapshot of your included files, and components access that snapshot. This ensures that when you test your application, you are checking it with the set of files it will be deployed with. However, it also means that your component does not pick up changes to the files while it is running. When testing a Web site, you might want to be able to edit a HTML or CSS file, and see the changes reflected without restarting Spin. You can tell Spin to give components access to the original, "live" files by passing the `--direct-mounts` flag to `spin up`.

## Adding Environment Variables to Components

Environment variables can be provided to components via the Spin application manifest.

To do this, use the `environment` field in the component manifest:

<!-- @nocpy -->

```toml
[component.pet-info]
environment = { PET = "CAT", FOOD = "WATERMELON" }
```

The field accepts a map of environment variable key/value pairs. They are mapped inside the component at runtime.

The environment variables can then be accessed inside the component. For example, in Rust:

```rs
#[http_component]
fn handle_hello_rust(req: Request) -> Result<Response> {
    let response = format!("My {} likes to eat {}", std::env::var("PET")?, std::env::var("FOOD")?);
    Ok(Response::builder()
        .status(200)
        .body(response)?)
}
```

## Granting Networking Permissions to Components

By default, Spin components are not allowed to make outgoing network requests.  This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing.

To grant a component permission to make outbound requests to a particular address, use the `allowed_outbound_hosts` field in the component manifest. Each entry must comprise a host name or IP address _and_ a port. For example:

<!-- @nocpy -->

```toml
[component.talkative]
allowed_outbound_hosts = ["redis://redis.example.com:6379", "https://api.example.com:8080"]
```

If a port is specified, the component can make requests only to that port.  If no port is specified, the component can make requests only to the default port for the scheme (e.g. port 443 for the `https` scheme, port 5432 for the `postgres` scheme).  If you need to allow requests to _any_ port, use the wildcard `*` (e.g. `mysql://db.example.com:*`).

> If you're familiar with Spin 1, `allowed_outbound_hosts` replaces `allowed_http_hosts`. Spin 2 still accepts `allowed_http_hosts` but will recommend migrating to `allowed_outbound_hosts`. Additionally, if your application uses the version 1 manifest format, _and_ the manifest does not specify `allowed_outbound_hosts`, then version 1 components are allowed to use Redis, MySQL and PostgreSQL without restriction.

The Wasm module can send network traffic _only_ to the hosts specified in these two fields. Requests to other hosts (or other ports) will fail with an error.

{{ details "This feels like extra work! Why do I have to list the hosts?" "This comes from the Wasm principle of deny by default: the user of a component, rather than the component itself, should decide what resource it's allowed to access. But this isn't just abstract principle: it's critical to being able to trust third party components. For example, suppose you add `bad-boy-brians-totally-legitimate-file-server.wasm` to your application. Unless you unwisely grant it network permissions, you can be _provably certain_ that it doesn't access your Postgres database or send information to evildoers." }}

For development-time convenience, you can also pass the string `"*://*:*"` in the `allowed_outbound_hosts` collection.  This allows the component to make network requests to _any_ host and on any port.  However, once you've determined which hosts your code needs, you should remove this string, and list the hosts instead.  Other Spin implementations may restrict host access, and may disallow components that ask to connect to anything and everything!

## Granting Storage Permissions to Components

By default, Spin components are not allowed to access Spin's storage services.  This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing.  To grant a component permission to use a Spin-provided store, use the `key_value_stores` field in the component manifest:

<!-- @nocpy -->

```toml
[component.squirrel]
key_value_stores = [ "default" ]
```

See [Persisting Data with Spin](key-value-store-tutorial) for more information.

## Example Manifests

This section shows some examples of Spin component manifests.

### Including a Directory of Files

This example shows a Spin HTTP component that includes all the files in `static/` under the application directory, made available to the Wasm module at the `/` path.

<!-- @nocpy -->

```toml
[[trigger.http]]
route = "/static/..."
component = "fileserver"

[component.fileserver]
source = "modules/spin_static_fs.wasm"
files = [ { source = "static/", destination = "/" } ]
```

### Using Public Components

This is similar to the file server component above, but gets the Wasm module from a public release instead of a local copy.  Notice that the files are still drawn from a local path.  This is a way in which you can use off-the-shelf component logic with your own application data.

<!-- @nocpy -->

```toml
[[trigger.http]]
route = "/static/..."
component = "fileserver"

[component.fileserver]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.1/spin_static_fs.wasm", digest = "sha256:650376c33a0756b1a52cad7ca670f1126391b79050df0321407da9c741d32375" }
files = [ { source = "static/", destination = "/" } ]
```

### Customizing the Executor

This example shows an HTTP component whose Wasm module, instead of using the default Spin HTTP interface, uses the CGI-like WAGI (WebAssembly Gateway Interface) protocol. Spin can't work out the application model from the component, so the manifest needs to tell Spin to use WAGI instead of its default mode. It does this via the `executor` field. This is specific to the HTTP trigger so it goes under `trigger.http`.

In addition, this module does not provide its WAGI functionality via the default `_start` entry point, but via a custom entry point named `serve-wagi`.  The `executor` table needs to tell Spin this via the `entrypoint` field.  Finally, this component needs to run the WAGI entry point with a specific set of command line arguments, which are expressed in the WAGI executor's `argv` field.

<!-- @nocpy -->

```toml
[[trigger.http]]
route = "/..."
component = "env"
executor = { type = "wagi", argv = "test ${SCRIPT_NAME} ${ARGS} done", entrypoint = "serve-wagi" }

[component.env]
source = "modules/env_wagi.wasm"
files = [ "content/**/*" , "templates/*", "scripts/*", "config/*"]
```

### Setting the Redis Channel to Monitor

The example shows a Redis component.  The manifest sets the `channel` field to say which channel the component should monitor.  In this case, the component is invoked for new messages on the `messages` channel.

<!-- @nocpy -->

```toml
[[trigger.redis]]
channel = "messages"
component = "echo-message"

[component.echo-message]
source = "spinredis.wasm"
```

## Next Steps

- Learn about [Spin application structure](spin-application-structure)
- Learn about how to [build your Spin application code](build)
- Try [running your application locally](running-apps)
- Discover how Spin application authors [design and organise applications](see-what-people-have-built-with-spin)
- Learn about how to [configure your application at runtime](dynamic-configuration)
- Look up details in the [application manifest reference](manifest-reference)
- Try deploying a Spin application to the [Fermyon Cloud](/cloud/quickstart)