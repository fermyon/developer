title = "Develop a Spin application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra] 
url = "https://github.com/fermyon/developer/blob/main/content/cloud/develop.md"

---
- [Prerequisites - Install the Spin CLI](#prerequisites---install-the-spin-cli)
- [Install Spin](#install-spin)
- [Install the Prerequisites](#install-the-prerequisites)
  - [Install a Template](#install-a-template)
  - [Install the Tools](#install-the-tools)
- [Create a New Spin Application From a Template](#create-a-new-spin-application-from-a-template)
- [Run the Application](#run-the-application)
- [Next Steps](#next-steps)

This article briefly describes how to create a new Spin application. For a more thorough guide to developing Spin applications, take a look [here](/spin/writing-apps).

## Prerequisites - Install the Spin CLI

Before developing a Spin application, you need to have the Spin CLI installed locally. Here’s a way to install the Spin CLI:

## Install Spin

{{ tabs "os" }}

{{ startTab "Linux"}}

Download the `spin` binary using the `install.sh` script hosted on this site:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-quick"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
</code></pre>

Then move the `spin` binary somewhere in your path, so you can run it from anywhere. For example:

<!-- @selectiveCpy -->

```bash
$ sudo mv ./spin /usr/local/bin/spin
```

{{ blockEnd }}

{{ startTab "macOS"}}

Download the `spin` binary using the `install.sh` script hosted on this site:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-quick"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash
</code></pre>

Then move the `spin` binary somewhere in your path, so you can run it from anywhere. For example:

<!-- @selectiveCpy -->

```bash
$ sudo mv ./spin /usr/local/bin/spin
```

{{ blockEnd }}

{{ startTab "Windows"}}

Download <a href="https://github.com/fermyon/spin/releases/latest" class="spin-install" id="spin-install-windows">the Windows binary release of Spin</a> from GitHub.

Unzip the binary release and place the `spin.exe` in your system path.

{{ blockEnd }}

{{ blockEnd }}

## Install the Prerequisites

### Install a Template

The quickest and most convenient way to start a new application is to use a Spin template.  Let's install the templates for your preferred language.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin --update
Copying remote template source
Installing template redis-rust...
Installing template http-rust...
... other templates omitted ...
+------------------------------------------------------------------------+
| Name                Description                                        |
+========================================================================+
| ... other templates omitted ...                                        |
| http-rust           HTTP request handler using Rust                    |
| redis-rust          Redis message handler using Rust                   |
| ... other templates omitted ...                                        |
+------------------------------------------------------------------------+
```

Note: The Rust templates are in a repo that contains several other languages; they will all be installed together.

{{ blockEnd }}

{{ startTab "TypeScript" }}

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-js-sdk --update
Copying remote template source
Installing template http-js...
Installing template http-ts...
+------------------------------------------------------------------------+
| Name                Description                                        |
+========================================================================+
| http-js             HTTP request handler using Javascript              |
| http-ts             HTTP request handler using Typescript              |
+------------------------------------------------------------------------+
```

{{ blockEnd }}

{{ startTab "Python" }}

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-python-sdk --update
Copying remote template source
Installing template http-py...
+---------------------------------------------+
| Name      Description                       |
+=============================================+
| http-py   HTTP request handler using Python |
+---------------------------------------------+
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin --update
Copying remote template source
Installing template redis-go...
Installing template http-go...
+------------------------------------------------------------------------+
| Name                Description                                        |
+========================================================================+
| ... other templates omitted ...                                        |
| http-go             HTTP request handler using (Tiny)Go                |
| redis-go            Redis message handler using (Tiny)Go               |
| ... other templates omitted ...                                        |
+------------------------------------------------------------------------+
```

Note: The Go templates are in a repo that contains several other languages; they will all be installed together.

{{ blockEnd }}

{{ blockEnd }}

{{ details "Additional info" "If you already have templates installed, you can update them by running `spin templates install --git https://github.com/fermyon/spin --update`." }}

### Install the Tools

Some languages require additional tool support for Wasm.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

You'll need the `wasm32-wasi` target for Rust:

<!-- @selectiveCpy -->

```bash
$ rustup target add wasm32-wasi
```

[Learn more in the language guide.](/spin/rust-components)

{{ blockEnd }}

{{ startTab "TypeScript" }}

You'll need the Spin `js2wasm` plugin:

<!-- @selectiveCpy -->

```bash
$ spin plugins update
$ spin plugins install js2wasm --yes
```

[Learn more in the language guide.](/spin/javascript-components)

{{ blockEnd }}

{{ startTab "Python" }}

You'll need the Spin `py2wasm` plugin:

<!-- @selectiveCpy -->

```bash
$ spin plugins update
$ spin plugins install py2wasm --yes
```

[Learn more in the language guide.](/spin/python-components)

{{ blockEnd }}

{{ startTab "TinyGo" }}

You'll need the TinyGo compiler, as the standard Go compiler does not yet support the WASI standard.  See the [TinyGo installation guide](https://tinygo.org/getting-started/install/).

[Learn more in the language guide.](/spin/go-components)

{{ blockEnd }}

{{ blockEnd }}

## Create a New Spin Application From a Template

Now you can create your very own application based on one of the templates you just installed.  For this example, we'll show how to create a HTTP application.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

Use the `spin new` command and the `http-rust` template to scaffold a new Spin application:

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
Description: My first Rust Spin application
HTTP path: /...
```

This command created a directory with the necessary files needed to build and run a Rust Spin application.  Here's the `spin.toml` file, the manifest for a Spin application:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "hello_rust"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = "My first Rust Spin application"

[[trigger.http]]
route = "/..."
component = "hello-rust"

[component.hello-rust]
source = "target/wasm32-wasi/release/hello_rust.wasm"
allow_outbound_hosts = []
[component.hello-rust.build]
command = "cargo build --target wasm32-wasi --release"
watch = ["src/**/*.rs", "Cargo.toml"]
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

Use the `spin new` command and the `http-ts` template to scaffold a new Spin application.  (If you prefer JavaScript to TypeScript, the `http-js` template is very similar.)

<!-- @selectiveCpy -->

```bash
$ spin new
Pick a template to start your application with:
  http-js (HTTP request handler using Javascript)
> http-ts (HTTP request handler using Typescript)
Enter a name for your new application: hello_typescript
Description: My first TypeScript Spin application
HTTP path: /...
```

This command created a directory with the necessary files needed to build and run a TypeScript Spin application.  Here's the `spin.toml` file, the manifest for a Spin application:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
authors = ["Your Name <your-name@example.com>"]
description = "My first TypeScript Spin application"
name = "hello_typescript"
version = "0.1.0"

[[trigger.http]]
route = "/..."
component = "hello-typescript"

[component.hello-typescript]
source = "target/hello-typescript.wasm"
exclude_files = ["**/node_modules"]
[component.hello-typescript.build]
command = "npm run build"
```

{{ blockEnd }}

{{ startTab "Python"}}

Use the `spin new` command and the `http-py` template to scaffold a new Spin application:

<!-- @selectiveCpy -->

```bash
$ spin new
Pick a template to start your application with:
> http-py (HTTP request handler using Python)
Enter a name for your new application: hello_python
Description: My first Python Spin application
HTTP path: /...
```

This command created a directory with the necessary files needed to build and run a Python Spin application.  Here's the `spin.toml` file, the manifest for a Spin application:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
authors = ["Your Name <your-name@example.com>"]
description = "My first Python Spin application"
name = "hello_python"
version = "0.1.0"

[[trigger.http]]
route = "/..."
component = "hello-python"

[component.hello-python]
source = "app.wasm"
[component.hello-python.build]
command = "spin py2wasm app -o app.wasm"
watch = ["app.py", "Pipfile"]
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

Use the `spin new` command and the `http-go` template to scaffold a new Spin application:

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

This command created a directory with the necessary files needed to build and run a Go Spin application using the TinyGo compiler.  Here's the `spin.toml` file, the manifest for a Spin application:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "hello_go"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = "My first Go Spin application"

[[trigger.http]]
route = "/..."
component = "hello-go"

[component.hello-go]
source = "main.wasm"
allow_outbound_hosts = []
[component.hello-go.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
watch = ["**/*.go", "go.mod"]
```

{{ blockEnd }}

{{ blockEnd }}

Next, let’s build the app:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

```bash
$ spin build
Building component hello-rust with `cargo build --target wasm32-wasi --release`
    Updating crates.io index
    Updating git repository `https://github.com/fermyon/spin`
   # ...
    Finished release [optimized] target(s) in 27.81s
Finished building all Spin components
```

If the build fails, check:

* Are you in the `hello_rust` directory?
* Did you successfully [install the `wasm32-wasi` target](#install-the-tools)?
* Is your version of Rust up to date (`cargo --version`)?  The Spin SDK needs Rust 1.64 or above.

{{ blockEnd }}

{{ startTab "TypeScript"}}

As normal for NPM projects, before you build for the first time, you must run `npm install`:

<!-- @selectiveCpy -->

```bash
$ npm install

added 141 packages, and audited 142 packages in 10s

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Then run `spin build`:

<!-- @selectiveCpy -->

```bash
$ spin build
Building component hello-typescript with `npm run build`

> hello-typescript@1.0.0 build
> npx webpack --mode=production && mkdir -p target && spin js2wasm -o target/hello-typescript.wasm dist/spin.js
  # ...
Starting to build Spin compatible module
Preinitiating using Wizer
Optimizing wasm binary using wasm-opt
Spin compatible module built successfully
Finished building all Spin components
```

If the build fails, check:

* Are you in the `hello_typescript` directory?
* Did you run `npm install` before building`?
* Did you install the `js2wasm` plugin?

{{ blockEnd }}

{{ startTab "Python"}}

<!-- @selectiveCpy -->

```bash
$ spin build
Building component hello-python with `spin py2wasm app -o app.wasm`
Spin-compatible module built successfully
Finished building all Spin components
```

If the build fails, check:

* Are you in the `hello_python` directory?
* Did you install the `py2wasm` plugin?

{{ blockEnd }}

{{ startTab "TinyGo"}}

<!-- @selectiveCpy -->

```bash
$ spin build 
Building component hello-go with `tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go`
Finished building all Spin components
```

If the build fails, check:

* Are you in the `hello_go` directory?
* Did you successfully [install TinyGo](#install-the-tools)?
* Are your versions of Go and TinyGo up to date?  The Spin SDK needs TinyGo 0.27 or above.

{{ blockEnd }}

{{ blockEnd }}

## Run the Application

Now it’s time to `spin up` the application:

<!-- @selectiveCpy -->

```bash
$ spin up
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  hello-rust: http://127.0.0.1:3000 (wildcard)
```

{{ details "Additional info" "Spin prints application output, and any Spin errors, to the console.  To see additional diagnostic information, set the RUST_LOG environment variable for detailed logs, before running `spin up`, e.g., `RUST_LOG=spin=debug spin up`." }}

Spin will instantiate all components from the application manifest, and will create the router configuration for the HTTP trigger accordingly. The component can now be invoked by making requests to `http://localhost:3000`:

<!-- @selectiveCpy -->

```
$ curl -i localhost:3000
HTTP/1.1 200 OK
content-type: text/plain
transfer-encoding: chunked
date: Thu, 02 Nov 2023 02:08:31 GMT

Hello, Fermyon
```

## Next Steps

- Learn how to [deploy an application](deploy)
- To learn more about how to develop Spin applications, head over to the [Spin documentation](/spin)
- Find known issues and file new ones with this [GitHub repository](https://github.com/fermyon/feedback)
