title = "Develop a Spin application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"

---

## Installing the Spin CLI

Before developing a Spin application, you need to have the Spin CLI (the latest version) installed locally. Here’s a way to install the Spin CLI:

```bash
$ curl https://spin.fermyon.dev/downloads/install.sh | bash
```

You can verify the version of the CLI version installed by using this command:

```bash
$ ./spin --version
spin 0.5.0 (b9fedcc 2022-09-02)
```

Move the spin binary somewhere in your path, so it can be accessed from any directory.

```bash
$ sudo mv ./spin /usr/local/bin/spin
```

## ****Creating a new Spin application from a template****

You create your very own application based on [templates from the Spin repository](https://github.com/fermyon/spin/tree/main/templates).

```bash
$ spin templates list
You have no templates installed. Run
spin templates install --git https://github.com/fermyon/spin
to install a starter set.
```

After doing this, you need to configure templates [from the Spin repository](https://github.com/fermyon/spin/tree/main/templates) (In this case, we’ll be using the `http-rust` template):

```bash
$ spin templates install --git https://github.com/fermyon/spin
Copying remote template source
Installing template redis-rust...
Installing template http-rust...
Installing template http-go...
+--------------------------------------------------+
| Name         Description                         |
+==================================================+
| http-go      HTTP request handler using (Tiny)Go |
| http-rust    HTTP request handler using Rust     |
| redis-rust   Redis message handler using Rust    |
| ...                                              |
+--------------------------------------------------+
```

> If you’re interested in building your own template, you can follow the existing [templates from the Spin repository](https://github.com/fermyon/spin/tree/main/templates) and the [Spin Improvement Proposal (SIP) for templates](https://github.com/fermyon/spin/pull/273).
> 

As mention earlier, we’ll be using the http-rust template to build our Spin Application.

```bash
$ spin new http-rust spin-hello-world
Project description: A simple Spin HTTP component in Rust
HTTP base: /
HTTP path: /hello
$ tree
├── .cargo
│   └── config.toml
├── .gitignore
├── Cargo.toml
├── spin.toml
└── src
    └── lib.rs
```

The command created all the files we need to build and run our Spin Application. Here’s the `spin.toml` file — the manifest file for a Spin application:

```bash
spin_version = "1"
description = "A simple Spin HTTP component in Rust"
name = "spin-hello-world"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "spin-hello-world"
source = "target/wasm32-wasi/release/spin_hello_world.wasm"
[component.trigger]
route = "/hello"
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

Next, let’s build the app.

```bash
$ spin build
Executing the build command for component spin-hello-world: cargo build --target wasm32-wasi --release
   Compiling spin_hello_world v0.1.0
    Finished release [optimized] target(s) in 0.10s
Successfully ran the build command for the Spin components.
```

The command above was used to build all the components in the Spin manifest file at once. and also has a flag that starts the application after finishing the compilation, `spin build --up`. For more details, see the [page about developing Spin applications](https://spin.fermyon.dev/developing) to learn more.

> 💡 If you run into errors, you can use the `rustup-check` command to see if your Rust installation is up-to-date.

## Running the application

Now that we’ve checked the application’s configuration, and built the components, it’s time to `spin up` the application.

```bash
$ spin up
Serving HTTP on address http://127.0.0.1:3000
Available Routes:
  spin-hello-world: http://127.0.0.1:3000/hello
```

Optionally, set the RUST_LOG environment variable for detailed logs, before running `spin up`.

```
$ export RUST_LOG=spin=trace
```

Spin will instantiate all components from the application manifest, and will create the router configuration for the HTTP trigger accordingly. The component can now be invoked by making requests to `http://localhost:3000/hello` (see route field in the configuration):

```
$ curl -i localhost:3000/hello
HTTP/1.1 200 OK
foo: bar
content-length: 15

Hello, Fermyon!
```

## Next Step

The next step after installing the Spin CLI is creating your very first Spin application by going through and practicing what is in the [quickstart section of the Spin docs](/cloud/deploy).