title = "Taking Spin for a spin"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/quickstart"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/quickstart.md"
keywords = "quickstart"

---
- [Install Spin](#install-spin)
- [Install the Prerequisites](#install-the-prerequisites)
  - [Install a Template](#install-a-template)
  - [Install the Tools](#install-the-tools)
- [Create Your First Application](#create-your-first-application)
- [Build Your Application](#build-your-application)
- [Run Your Application](#run-your-application)
- [Deploy Your Application to Fermyon Cloud](#deploy-your-application-to-fermyon-cloud)
  - [Log in to Fermyon Cloud](#log-in-to-fermyon-cloud)
  - [Deploy the Application](#deploy-the-application)
- [Next Steps](#next-steps)

Let's get Spin and take it from nothing to a "hello world" application!

<iframe width="560" height="315" src="https://www.youtube.com/embed/GqpZ9Kw0K3E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Install Spin

{{ tabs "os" }}

{{ startTab "Linux"}}

Download the `spin` binary along with a starter set of templates and plugins using the `install.sh` script hosted on this site:

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

Download the `spin` binary along with a starter set of templates and plugins using the `install.sh` script hosted on this site:

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

[See more options for installing Spin.](install)

## Install the Prerequisites

### Install a Template

The quickest and most convenient way to start a new application is to install and use a Spin template for your preferred language:

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

### Install the Tools

Some languages require additional tool support for Wasm:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

You'll need the `wasm32-wasi` target for Rust:

<!-- @selectiveCpy -->

```bash
$ rustup target add wasm32-wasi
```

[Learn more in the language guide.](rust-components)

{{ blockEnd }}

{{ startTab "TypeScript" }}

You'll need the Spin `js2wasm` plugin:

<!-- @selectiveCpy -->

```bash
$ spin plugins update
$ spin plugins install js2wasm --yes
```

[Learn more in the language guide.](javascript-components)

{{ blockEnd }}

{{ startTab "Python" }}

You'll need the Spin `py2wasm` plugin:

<!-- @selectiveCpy -->

```bash
$ spin plugins update
$ spin plugins install py2wasm --yes
```

[Learn more in the language guide.](python-components)

{{ blockEnd }}

{{ startTab "TinyGo" }}

You'll need the TinyGo compiler, as the standard Go compiler does not yet support the WASI standard.  See the [TinyGo installation guide](https://tinygo.org/getting-started/install/).

[Learn more in the language guide.](go-components)

{{ blockEnd }}

{{ blockEnd }}

## Create Your First Application

{{suh_cards}}
{{card_element "template" "Zola SSG Tempalte" "A template for using Zola framework to create a static webpage" "https://developer.fermyon.com/hub/preview/template_zola_ssg" "rust" }}
{{blockEnd}}

Now you are ready to create your first Spin application:

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
Project description: My first Rust Spin application
HTTP base: /
HTTP path: /...
```

This command created a directory with the necessary files needed to build and run a Rust Spin application.  Change to that directory, and look at the files.  It looks very much like a normal Rust library project:

<!-- @selectiveCpy -->

```bash
$ cd hello_rust
$ tree
.
├── .cargo
│   └── config.toml
├── .gitignore
├── Cargo.toml
├── spin.toml
└── src
    └── lib.rs
```

The additional `spin.toml` file is the manifest file, which tells Spin what events should trigger what components.  In this case our trigger is HTTP, for a Web application, and we have only one component, at the route `/...`.  This is a wildcard that matches any route:

<!-- @nocpy -->

```toml
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "My first Rust Spin application"
name = "hello_rust"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-rust"
source = "target/wasm32-wasi/release/hello_rust.wasm"
allowed_http_hosts = []
[component.trigger]
route = "/..."
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

This represents a simple Spin HTTP application (triggered by an HTTP request), with
a single component called `hello-rust`. This component is on the route `/...`, which is a wildcard
meaning it will match any route.  When the application gets an HTTP request, Spin will map its route
to the `hello-rust` component, and execute the associated `hello_rust.wasm`
WebAssembly module.

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in Rust — a regular Rust function that
takes an HTTP request as a parameter and returns an HTTP response, and it is
annotated with the `http_component` macro which identifies it as the entry point
for HTTP requests:

```rust
use anyhow::Result;
use spin_sdk::{
    http::{Request, Response},
    http_component,
};

/// A simple Spin HTTP component.
#[http_component]
fn handle_hello_rust(req: Request) -> Result<Response> {
    println!("{:?}", req.headers());
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some("Hello, Fermyon".into()))?)
}
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

Use the `spin new` command and the `http-ts` template to scaffold a new Spin application.  (If you prefer JavaScript to TypeScript, the `http-js` template is very similar.):

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

This command created a directory with the necessary files needed to build and run a TypeScript Spin application.  Change to that directory, and look at the files.  It looks similar to a lot of NPM projects:

<!-- @selectiveCpy -->

```bash
$ cd hello_typescript
$ tree
.
├── package.json
├── README.md
├── spin.toml
├── src
│   └── index.ts
├── tsconfig.json
└── webpack.config.js
```

The additional `spin.toml` file is the manifest file, which tells Spin what events should trigger what components.  In this case our trigger is HTTP, for a Web application, and we have only one component, at the route `/...`.  This is a wildcard that matches any route:

<!-- @nocpy -->

```toml
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "My first TypeScript Spin application"
name = "hello_typescript"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-typescript"
source = "target/spin-http-js.wasm"
exclude_files = ["**/node_modules"]
[component.trigger]
route = "/..."
[component.build]
command = "npm run build"
```

This represents a simple Spin HTTP application (triggered by an HTTP request), with
a single component called `hello-typescript`. This component is on the route `/...`, which is a wildcard
meaning it will match any route.  When the application gets an HTTP request, Spin will map its route
to the `hello-typescript` component, and execute the associated `spin-http-js.wasm`
WebAssembly module.

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in TypeScript — a regular function named `handleRequest` that
takes an HTTP request as a parameter and returns an HTTP response.  (The
JavaScript version looks slightly different, but is still a function with
the same signature.)  The Spin `js2wasm` plugin looks for the `handleRequest` function
by name when building your application into a Wasm module:

```javascript
import { HandleRequest, HttpRequest, HttpResponse} from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
    return {
      status: 200,
      headers: { "foo": "bar" },
      body: encoder.encode("Hello from TS-SDK").buffer
    }
}
```

{{ blockEnd }}

{{ startTab "Python"}}

Use the `spin new` command and the `http-py` template to scaffold a new Spin application.

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

This command created a directory with the necessary files needed to build and run a Python Spin application.  Change to that directory, and look at the files.  It contains a minimal Python application:

<!-- @selectiveCpy -->

```bash
$ cd hello_python
$ tree
.
├── app.py
├── Pipfile
├── README.md
└── spin.toml
```

The additional `spin.toml` file is the manifest file, which tells Spin what events should trigger what components.  In this case our trigger is HTTP, for a Web application, and we have only one component, at the route `/...`.  This is a wildcard that matches any route.

<!-- @nocpy -->

```toml
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "My first Python Spin application"
name = "hello_python"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-python"
source = "app.wasm"
[component.trigger]
route = "/..."
[component.build]
command = "spin py2wasm app -o app.wasm"
```

This represents a simple Spin HTTP application (triggered by an HTTP request), with
a single component called `hello-python`. This component is on the route `/...`, which is a wildcard
meaning it will match any route.  When the application gets an HTTP request, Spin will map its route
to the `hello-python` component, and execute the associated `app.wasm`
WebAssembly module.

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in Python — a regular function named `handle_request` that
takes an HTTP request as a parameter and returns an HTTP response.  The Spin `py2wasm` plugin looks for the `handle_request` function by name when building your application into a Wasm module.

```python
from spin_http import Response

def handle_request(request):
    return Response(200,
                    [("content-type", "text/plain")],
                    bytes(f"Hello from the Python SDK", "utf-8"))
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

Use the `spin new` command and the `http-go` template to scaffold a new Spin application.

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

This command created a directory with the necessary files needed to build and run a Go Spin application using the TinyGo compiler.  Change to that directory, and look at the files.  It looks very much like a normal Go project:

<!-- @selectiveCpy -->

```bash
$ cd hello_go
$ tree
.
├── go.mod
├── go.sum
├── main.go
└── spin.toml
```

The additional `spin.toml` file is the manifest file, which tells Spin what events should trigger what components.  In this case our trigger is HTTP, for a Web application, and we have only one component, at the route `/...`.  This is a wildcard that matches any route.

<!-- @nocpy -->

```toml
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "My first Go Spin application"
name = "hello_go"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-go"
source = "main.wasm"
allowed_http_hosts = []
[component.trigger]
route = "/..."
[component.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
```

This represents a simple Spin HTTP application (triggered by an HTTP request), with
a single component called `hello-go`. This component is on the route `/...`, which is a wildcard
meaning it will match any route.  When the application gets an HTTP request, Spin will map its route
to the `hello-go` component, and execute the associated `main.wasm`
WebAssembly module.

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in Go. Notice where the work is done.  The
`main` function is empty (and Spin never calls it).  Instead, the `init` function
sets up a callback, and passes that callback to `spinhttp.Handle` to register it as
the handler for HTTP requests.  You can learn more about this structure
in the [Go language guide](go-components).

```go
package main

import (
        "fmt"
        "net/http"

        spinhttp "github.com/fermyon/spin/sdk/go/http"
)

func init() {
        spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
                w.Header().Set("Content-Type", "text/plain")
                fmt.Fprintln(w, "Hello Fermyon!")
        })
}

func main() {}
```

{{ blockEnd }}

{{ blockEnd }}

## Build Your Application

The Spin template creates starter source code.  Now you need to turn that into a Wasm module.  The template puts build instructions for each component into the manifest.  Use the `spin build` command to run them:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

```bash
$ spin build
Executing the build command for component hello-rust: cargo build --target wasm32-wasi --release
    Updating crates.io index
    Updating git repository `https://github.com/fermyon/spin`
    Updating git repository `https://github.com/bytecodealliance/wit-bindgen`
   Compiling anyhow v1.0.69
   Compiling version_check v0.9.4
   # ...
   Compiling spin-sdk v0.10.0 
   Compiling hello-rust v0.1.0 (/home/ivan/testing/start/hello_rust)
    Finished release [optimized] target(s) in 11.94s
Successfully ran the build command for the Spin components.
```

If the build fails, check:

* Are you in the `hello_rust` directory?
* Did you successfully [install the `wasm32-wasi` target](#install-the-tools)?
* Is your version of Rust up to date (`cargo --version`)?  The Spin SDK needs Rust 1.64 or above.

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.build` section:

```toml
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

You can always run this command manually; `spin build` is a shortcut to save you having to remember it.

{{ blockEnd }}

{{ startTab "TypeScript"}}

As normal for NPM projects, before you build for the first time, you must run `npm install`:

<!-- @selectiveCpy -->

```bash
$ npm install

added 134 packages, and audited 135 packages in 2s

18 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Then run `spin build`:

<!-- @selectiveCpy -->

```bash
$ spin build
Executing the build command for component hello-typescript: npm run build

> hello-typescript@1.0.0 build
> npx webpack --mode=production && mkdir -p target && spin js2wasm -o target/spin-http-js.wasm dist/spin.js

asset spin.js 4.57 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
./src/index.ts 2.85 KiB [built] [code generated]
webpack 5.75.0 compiled successfully in 1026 ms

Starting to build Spin compatible module
Preinitiating using Wizer
Optimizing wasm binary using wasm-opt
Spin compatible module built successfully
Successfully ran the build command for the Spin components.
```

If the build fails, check:

* Are you in the `hello_typescript` directory?
* Did you run `npm install` before building`?
* Did you install the `js2wasm` plugin?

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.build` section:

```toml
[component.build]
command = "npm run build"
```

You can always run this command manually; `spin build` is a shortcut.

{{ blockEnd }}

{{ startTab "Python"}}

<!-- @selectiveCpy -->

```bash
$ spin build
Executing the build command for component hello-python: spin py2wasm app -o app.wasm
Spin-compatible module built successfully
Successfully ran the build command for the Spin components.
```

If the build fails, check:

* Are you in the `hello_python` directory?
* Did you install the `py2wasm` plugin?

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.build` section:

```toml
[component.build]
command = "spin py2wasm app -o app.wasm"
```

You can always run this command manually; `spin build` is a shortcut.

{{ blockEnd }}

{{ startTab "TinyGo"}}

<!-- @selectiveCpy -->

```bash
$ spin build
Executing the build command for component hello-go: tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go
go: downloading github.com/fermyon/spin/sdk/go v0.10.0
Successfully ran the build command for the Spin components.
```

If the build fails, check:

* Are you in the `hello_go` directory?
* Did you successfully [install TinyGo](#install-the-tools)?
* Are your versions of Go and TinyGo up to date?  The Spin SDK needs TinyGo 0.27 or above.
* Set Environment Variable `CGO_ENABLED=1`. (Since the Go SDK is built using CGO, it requires the CGO_ENABLED=1 environment variable to be set.)

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.build` section:

```toml
[component.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
```

You can always run this command manually; `spin build` is a shortcut to save you having to remember it.

{{ blockEnd }}

{{ blockEnd }}

> `spin build` can be used to build all components defined in the Spin manifest
> file at the same time, and also has a flag that starts the application after
> finishing the compilation, `spin build --up`.
>
> For more details, see the [page about building Spin applications](./build.md).

## Run Your Application

Now that you have created the application and built the component, you can _spin up_
the application (pun intended):

<!-- @selectiveCpy -->

```bash
$ spin up
Serving http://127.0.0.1:3000
Available Routes:
  hello-typescript: http://127.0.0.1:3000 (wildcard)
```

If you would like to see what Spin is doing under the hood, set the RUST_LOG environment variable for detailed logs, before running `spin up`:

<!-- @selectiveCpy -->

```bash
$ export RUST_LOG=spin=trace
```

> The variable is `RUST_LOG` no matter what language your application is written in, because this is setting the log level for Spin itself.

Spin instantiates all components from the application manifest, and
creates the router configuration for the HTTP trigger according to the routes in the manifest. The
component can now be invoked by making requests to `http://localhost:3000/`
(or any path under that, since it's a wildcard):

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000
HTTP/1.1 200 OK
foo: bar
content-length: 14
date: Thu, 02 Mar 2023 00:05:42 GMT

Hello, Fermyon
```

> The `curl` output may vary based on which language SDK you use. 

Congratulations! You just created, built and ran your first Spin application!

## Deploy Your Application to Fermyon Cloud

`spin up` runs your application locally. Now it's time to put it on the Web via [Fermyon Cloud](https://cloud.fermyon.com).

> Fermyon Cloud's Starter tier is free, and doesn't require you to enter any kind of payment instrument. You only need a [GitHub account](https://docs.github.com/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/remembering-your-github-username-or-email).

### Log in to Fermyon Cloud

Before deploying your application to Fermyon Cloud, you have to log in, using the `spin login` command. This generates a code to authorize your current device against the Fermyon Cloud, and prints a link that will take you to where you enter the code. (You will need to be logged into your GitHub account; if you're not, it will prompt you to log in.) Follow the instructions in the prompt to complete the authorization process.

`spin login` prints a confirmation message when authorization completes:

<!-- @selectiveCpy -->

```bash
$ spin login

Copy your one-time code:

XXXXXXXX

...and open the authorization page in your browser:

https://cloud.fermyon.com/device-authorization

Waiting for device authorization...
Device authorized!
```

### Deploy the Application

Now let's deploy the application:

<!-- @selectiveCpy -->

```bash
$ spin deploy
```

The deployment process prints progress information as your application uploads and is rolled out to the cloud:

<!-- @nocpy -->

```console
Uploading hello_typescript version 0.1.0+XXXXXXXX to Fermyon Cloud...
Deploying...
Waiting for application to become ready... ready
Available Routes:
  hello-typescript: https://hello-typescript-XXXXXXXX.fermyon.app (wildcard)
```

You can Ctrl+Click on the link in the terminal to visit the web application you just deployed.

> In the example output above, `hello_typescript` is a placeholder for your application name - you'll see whatever you entered as the application name when you ran `spin new` earlier. The `XXXXXXXX` fragment is randomly generated to make a unique URL.

Congratulations again - you've now deployed your first Spin application to [Fermyon Cloud](https://cloud.fermyon.com)!

## Next Steps

- Learn more about [writing Spin components and manifests](writing-apps)
- Learn how to [build your Spin application code](build)
- Learn more about [Fermyon Cloud](/cloud/index)
