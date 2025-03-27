title = "Taking Spin for a spin"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/quickstart.md"
keywords = "quickstart"

---
- [Install Spin](#install-spin)
- [Install the Prerequisites](#install-the-prerequisites)
  - [Install a Template](#install-a-template)
  - [Install the Tools](#install-the-tools)
- [Create Your First Application](#create-your-first-application)
- [Structure of a Python Component](#structure-of-a-python-component)
- [Build Your Application](#build-your-application)
- [Run Your Application](#run-your-application)
- [Deploy Your Application to Fermyon Cloud](#deploy-your-application-to-fermyon-cloud)
  - [Log in to Fermyon Cloud](#log-in-to-fermyon-cloud)
  - [Deploy the Application](#deploy-the-application)
- [Next Steps](#next-steps)

Let's get Spin and take it from nothing to a "hello world" application!

<iframe width="560" height="315" src="https://www.youtube.com/embed/tlxkK_2NHII" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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

Download <a href="https://github.com/spinframework/spin/releases/latest" class="spin-install" id="spin-install-windows">the Windows binary release of Spin</a> from GitHub.

Unzip the binary release and place the `spin.exe` in your system path.

{{ blockEnd }}
{{ blockEnd }}

[See more options for installing Spin.](install)

## Install the Prerequisites

### Install a Template

> If you used the installer script above, the templates are already installed, and you can skip this section!

The quickest and most convenient way to start a new application is to install and use a Spin template for your preferred language.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/spinframework/spin--update
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
$ spin templates install --git https://github.com/spinframework/spin-js-sdk --update
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
$ spin templates install --git https://github.com/spinframework/spin-python-sdk --update
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
$ spin templates install --git https://github.com/spinframework/spin--update
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

You'll need the `wasm32-wasip1` target for Rust:

<!-- @selectiveCpy -->

```bash
$ rustup target add wasm32-wasip1
```

[Learn more in the language guide.](rust-components)

{{ blockEnd }}

{{ startTab "TypeScript" }}

You will need `npm` installed and on the path.  `npm` will install any additional build tools as part of building the application.

[Learn more in the language guide.](javascript-components)

{{ blockEnd }}

{{ startTab "Python" }}

Ensure that you have Python 3.10 or later installed on your system. You can check your Python version by running:

```bash
python3 --version
```

If you do not have Python 3.10 or later, you can install it by following the instructions [here](https://www.python.org/downloads/).

You'll install all the required Python tools as part of building the application.  We'll cover that in the Build Your Application section below.  For now, there's nothing to do here!

[Learn more in the language guide.](python-components)

{{ blockEnd }}

{{ startTab "TinyGo" }}

You'll need the TinyGo compiler, as the standard Go compiler does not yet support WASI exports.  See the [TinyGo installation guide](https://tinygo.org/getting-started/install/).

[Learn more in the language guide.](go-components)

{{ blockEnd }}

{{ blockEnd }}

## Create Your First Application

{{suh_cards}}
{{card_element "sample" "Checklist Sample App" "A checklist app that persists data in a key value store" "https://developer.fermyon.com/hub/preview/sample_checklist" "Typescript,Http,Kv" true }}
{{card_element "sample" "AI-assisted News Summarizer" "Read an RSS newsfeed and have AI summarize it for you" "https://developer.fermyon.com/hub/preview/sample_newsreader_ai" "Typescript,Javascript,Ai" true }}
{{card_element "template" "Zola SSG Template" "A template for using Zola framework to create a static webpage" "https://developer.fermyon.com/hub/preview/template_zola_ssg" "rust" true }}
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
HTTP path: /...
```

This command created a directory with the necessary files needed to build and run a Rust Spin application.  Change to that directory, and look at the files.  It looks very much like a normal Rust library project:

<!-- @selectiveCpy -->

```bash
$ cd hello_rust
$ tree
.
├── .gitignore
├── Cargo.toml
├── spin.toml
└── src
    └── lib.rs
```

The additional `spin.toml` file is the manifest file, which tells Spin what events should trigger what components.  In this case our trigger is HTTP, for a Web application, and we have only one component, at the route `/...`.  This is a wildcard that matches any route:

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
source = "target/wasm32-wasip1/release/hello_rust.wasm"
allowed_outbound_hosts = []
[component.hello-rust.build]
command = "cargo build --target wasm32-wasip1 --release"
watch = ["src/**/*.rs", "Cargo.toml"]
```

This represents a simple Spin HTTP application (triggered by an HTTP request).  It has:

* A single HTTP trigger, for the `/...` route, associated with the `hello-rust` component.  `/...` is a wildcard, meaning it will match any route.  When the application gets an HTTP request that matches this route - that is, any HTTP request at all! - Spin will run the `hello-rust` component.
* A single component called `hello-rust`, whose implementation is in the associated `hello_rust.wasm` WebAssembly component.  When, in response to the HTTP trigger, Spin runs this component, it will execute the HTTP handler in `hello_rust.wasm`.  (We're about to see the source code for that.)

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in Rust — a regular Rust function that
takes an HTTP request as a parameter and returns an HTTP response, and it is
annotated with the `http_component` macro which identifies it as the entry point
for HTTP requests:

```rust
use spin_sdk::http::{IntoResponse, Request, Response};
use spin_sdk::http_component;

/// A simple Spin HTTP component.
#[http_component]
fn handle_hello_rust(req: Request) -> anyhow::Result<impl IntoResponse> {
    println!("Handling request to {:?}", req.header("spin-full-url"));
    Ok(Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body("Hello, Fermyon")
        .build())
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
HTTP path: /...
```

This command created a directory with the necessary files needed to build and run a TypeScript Spin application.  Change to that directory, and look at the files.  It looks similar to a lot of NPM projects:

<!-- @selectiveCpy -->

```bash
$ cd hello_typescript
$ tree
.
├── config
│   └── knitwit.json
├── package.json
├── spin.toml
├── src
│   └── index.ts
├── tsconfig.json
└── webpack.config.js
```

The additional `spin.toml` file is the manifest file, which tells Spin what events should trigger what components.  In this case our trigger is HTTP, for a Web application, and we have only one component, at the route `/...`.  This is a wildcard that matches any route:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "hello_typescript"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = "My first TypeScript Spin application"

[[trigger.http]]
route = "/..."
component = "hello-typescript"

[component.hello-typescript]
source = "dist/hello-typescript.wasm"
exclude_files = ["**/node_modules"]
[component.hello-typescript.build]
command = "npm run build"
```

This represents a simple Spin HTTP application (triggered by an HTTP request).  It has:

* A single HTTP trigger, for the `/...` route, associated with the `hello-typescript` component.  `/...` is a wildcard, meaning it will match any route.  When the application gets an HTTP request that matches this route - that is, any HTTP request at all! - Spin will run the `hello-typescript` component.
* A single component called `hello-typescript`, whose implementation is in the associated `hello-typescript.wasm` WebAssembly component.  When, in response to the HTTP trigger, Spin runs this component, it will execute the HTTP handler in `hello-typescript.wasm`.  (We're about to see the source code for that.)

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in TypeScript — A function is attached to the fetch event listener which receives and responds to the HTTP request.

```javascript
❯ cat hello-world/src/index.ts 
import { AutoRouter } from 'itty-router';

let router = AutoRouter();

router
    .get("/", () => new Response("hello universe"))
    .get('/hello/:name', ({ name }) => `Hello, ${name}!`)

//@ts-ignore
addEventListener('fetch', async (event: FetchEvent) => {
    event.respondWith(router.fetch(event.request));
});
```

{{ blockEnd }}

{{ startTab "Python"}}

You can install the Spin template for Python HTTP handlers from the [spin-python-sdk repository](https://github.com/spinframework/spin-python-sdk) using the following command:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/spinframework/spin-python-sdk --update
```

The above command will install the `http-py` template and produce an output similar to the following:

<!-- @nocpy -->

```text
Copying remote template source
Installing template http-py...
Installed 1 template(s)

+---------------------------------------------+
| Name      Description                       |
+=============================================+
| http-py   HTTP request handler using Python |
+---------------------------------------------+
```

**Please note:** For more information about managing Spin templates, see the [templates guide](./managing-templates).

This command created a directory with the necessary files needed to build and run a Python Spin application.  Change to that directory, and look at the files.  It contains a minimal Python application:

<!-- @selectiveCpy -->

```bash
$ spin new -t http-py hello-python --accept-defaults
```

Once the component is created, we can change into the `hello-python` directory, create and activate a virtual environment and then install the component's requirements:

<!-- @selectiveCpy -->

```console
$ cd hello-python
```

Create a virtual environment directory (we are still inside the Spin app directory):

<!-- @selectiveCpy -->

```console
# python<version> -m venv <virtual-environment-name>
$ python3 -m venv venv-dir
```

Activate the virtual environment (this command depends on which operating system you are using):

<!-- @selectiveCpy -->

```console
# macOS & Linux command to activate
$ source venv-dir/bin/activate
```

If you are using Windows, use the following commands:

```bash
C:\Work> python3 -m venv venv
C:\Work> venv\Scripts\activate
```

The `(venv-dir)` will prefix your terminal prompt now:

<!-- @nocpy -->

```console
(venv-dir) user@123-456-7-8 hello-python %
```

The `requirements.txt`, by default, contains the references to the `spin-sdk` and `componentize-py` packages. These can be installed in your virtual environment using the following command:

<!-- @selectiveCpy -->

```bash
$ pip3 install -r requirements.txt 
Collecting spin-sdk==3.1.0 (from -r requirements.txt (line 1))
  Using cached spin_sdk-3.1.0-py3-none-any.whl.metadata (16 kB)
Collecting componentize-py==0.13.3 (from -r requirements.txt (line 2))
  Using cached componentize_py-0.13.3-cp37-abi3-macosx_10_12_x86_64.whl.metadata (3.4 kB)
Using cached spin_sdk-3.1.0-py3-none-any.whl (94 kB)
Using cached componentize_py-0.13.3-cp37-abi3-macosx_10_12_x86_64.whl (38.8 MB)
Installing collected packages: spin-sdk, componentize-py
Successfully installed componentize-py-0.13.3 spin-sdk-3.1.0
```

## Structure of a Python Component

The `hello-python` directory structure created by the Spin `http-py` template is shown below:

<!-- @nocpy -->

```text
├── app.py
├── spin.toml
└── requirements.txt 
```

The additional `spin.toml` file is the manifest file, which tells Spin what events should trigger what components.  In this case our trigger is HTTP, for a Web application, and we have only one component, at the route `/...`.  This is a wildcard that matches any route.

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "hello-python"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = "My first Python Spin application"

[[trigger.http]]
route = "/..."
component = "hello-python"

[component.hello-python]
source = "app.wasm"
[component.hello-python.build]
command = "componentize-py -w spin-http componentize app -o app.wasm"
```
This represents a simple Spin HTTP application (triggered by an HTTP request).  It has:

* A single HTTP trigger, for the `/...` route, associated with the `hello-python` component.  `/...` is a wildcard, meaning it will match any route.  When the application gets an HTTP request that matches this route - that is, any HTTP request at all! - Spin will run the `hello-python` component.
* A single component called `hello-python`, whose implementation is in the associated `app.wasm` WebAssembly component.  When, in response to the HTTP trigger, Spin runs this component, it will execute the HTTP handler in `app.wasm`.  (We're about to see the source code for that.)

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in Python — a regular function named `handle_request` that
takes an HTTP request as a parameter and returns an HTTP response.

<!-- @nocpy -->

```python
from spin_sdk.http import IncomingHandler, Request, Response

class IncomingHandler(IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        return Response(
            200,
            {"content-type": "text/plain"},
            bytes("Hello from the Python SDK!", "utf-8")
        )
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
allowed_outbound_hosts = []
[component.hello-go.build]
command = "tinygo build -target=wasip1 -gc=leaking -buildmode=c-shared -no-debug -o main.wasm ."
```

This represents a simple Spin HTTP application (triggered by an HTTP request).  It has:

* A single HTTP trigger, for the `/...` route, associated with the `hello-go` component.  `/...` is a wildcard, meaning it will match any route.  When the application gets an HTTP request that matches this route - that is, any HTTP request at all! - Spin will run the `hello-go` component.
* A single component called `hello-go`, whose implementation is in the associated `main.wasm` WebAssembly component.  When, in response to the HTTP trigger, Spin runs this component, it will execute the HTTP handler in `main.wasm`.  (We're about to see the source code for that.)

[Learn more about the manifest here.](./writing-apps)

Now let's have a look at the code. Below is the complete source
code for a Spin HTTP component written in Go. Notice where the work is done.  Because this is a component
rather than an application, there is no `main` function.  Instead, the `init` function
sets up a callback, and passes that callback to `spinhttp.Handle` to register it as
the handler for HTTP requests.  You can learn more about this structure
in the [Go language guide](go-components).

```go
package main

import (
        "fmt"
        "net/http"

        spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
)

func init() {
        spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
                w.Header().Set("Content-Type", "text/plain")
                fmt.Fprintln(w, "Hello Fermyon!")
        })
}
```

{{ blockEnd }}

{{ blockEnd }}

## Build Your Application

The Spin template creates starter source code.  Now you need to turn that into a Wasm module.  The template puts build instructions for each component into the manifest.  Use the `spin build` command to run them:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

```bash
$ spin build
Executing the build command for component hello-rust: cargo build --target wasm32-wasip1 --release
    Updating crates.io index
    Updating git repository `https://github.com/spinframework/spin`
    Updating git repository `https://github.com/bytecodealliance/wit-bindgen`
   Compiling anyhow v1.0.69
   Compiling version_check v0.9.4
   # ...
   Compiling spin-sdk v0.10.0 
   Compiling hello-rust v0.1.0 (/home/ivan/testing/start/hello_rust)
    Finished release [optimized] target(s) in 11.94s
Finished building all Spin components
```

If the build fails, check:

* Are you in the `hello_rust` directory?
* Did you successfully [install the `wasm32-wasip1` target](#install-the-tools)?
* Is your version of Rust up to date (`cargo --version`)?  The Spin SDK needs Rust 1.78 or above.

> The Rust target used to be called `wasm32-wasi` (without the `p1`). Even if you already installed the old target, you'll need to install the new one!

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.(id).build` section:

```toml
[component.hello-rust.build]
command = "cargo build --target wasm32-wasip1 --release"
```

You can always run this command manually; `spin build` is a shortcut to save you having to remember it.

{{ blockEnd }}

{{ startTab "TypeScript"}}

As normal for NPM projects, before you build for the first time, you must run `npm install`:

<!-- @selectiveCpy -->

```bash
$ npm install

added 141 packages, and audited 142 packages in 13s

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Then run `spin build`:

<!-- @selectiveCpy -->

```bash
$ spin build
Executing the build command for component hello-typescript: npm run build

> hello-typescript@1.0.0 build
> knitwit --out-dir build/wit/knitwit --out-world combined && npx webpack --mode=production && npx mkdirp target && npx j2w -i dist.js -d combined-wit -n combined -o target/hello-typescript.wasm

asset spin.js 4.57 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
./src/index.ts 2.85 KiB [built] [code generated]
webpack 5.75.0 compiled successfully in 1026 ms

Finished building all Spin components
```

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.(id).build` section:

```toml
[component.hello-typescript.build]
command = ["npm install", "npm run build"]
```

You can always run this command manually; `spin build` is a shortcut.

{{ blockEnd }}

{{ startTab "Python"}}

As a standard practice for Python, create and activate a virtual env:

If you are on a Mac/linux based operating system use the following commands:

```bash
$ python3 -m venv venv
$ source venv/bin/activate
```

If you are using Windows, use the following commands:

```bash
C:\Work> python3 -m venv venv
C:\Work> venv\Scripts\activate
```

Install `componentize-py` and `spin-sdk` packages

<!-- @selectiveCpy -->

```bash
$ pip3 install -r requirements.txt
```

Then run:

<!-- @selectiveCpy -->

```bash
$ spin build
Executing the build command for component hello-python: "componentize-py -w spin-http componentize app -o app.wasm"
Finished building all Spin components
```

If the build fails, check:

* Are you in the `hello-python` directory?
* Did you install the requirements?
* Is your virtual environment still activated?

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.(id).build` section:

```toml
[component.hello-python.build]
command = "componentize-py -w spin-http componentize app -o app.wasm"
```

You can always run this command manually; `spin build` is a shortcut.

{{ blockEnd }}

{{ startTab "TinyGo"}}

<!-- @selectiveCpy -->

```bash
$ spin build
Executing the build command for component hello-go: tinygo build -target=wasip1 -gc=leaking -buildmode=c-shared -no-debug -o main.wasm .
go: downloading github.com/fermyon/spin/sdk/go v0.10.0
Finished building all Spin components
```

If the build fails, check:

* Are you in the `hello_go` directory?
* Did you successfully [install TinyGo](#install-the-tools)?
* Are your versions of Go and TinyGo up to date?  The Spin SDK needs TinyGo 0.35 or above and Go 1.22 or above.
* Set Environment Variable `CGO_ENABLED=1`. (Since the Go SDK is built using CGO, it requires the CGO_ENABLED=1 environment variable to be set.)

If you would like to know what build command Spin runs for a component, you can find it in the manifest, in the `component.(id).build` section:

```toml
[component.hello-go.build]
command = "tinygo build -target=wasip1 -gc=leaking -buildmode=c-shared -no-debug -o main.wasm ."
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

> If another program is using port 3000, add the `--listen` flag. E.g. `spin up --listen 127.0.0.1:12345`.

> You can also run a Spin application using `spin watch`. This automatically rebuilds code and reloads content whenever they change. [Learn more.](./running-apps.md#monitoring-applications-for-changes)

Spin instantiates all components from the application manifest, and
creates the router configuration for the HTTP trigger according to the routes in the manifest. The
component can now be invoked by making requests to `http://localhost:3000/`
(or any path under that, since it's a wildcard):

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000
HTTP/1.1 200 OK
content-type: text/plain
content-length: 14
date = "2023-11-04T00:00:01Z"

Hello, Fermyon
```

> The `curl` output may vary based on which language SDK you use. 

You'll also see any logging (stdout/stderr) from the generated code printed to the console where Spin is running. For more details, see the [page about running Spin applications](./running-apps.md).

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
