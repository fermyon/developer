title = "Spin Key-Value Store"
template = "spin_main"
date = "2023-02-21T00:00:00Z"
enable_shortcodes = true
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/key-value-store-tutorial"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/key-value-store-tutorial.md"

---
- [Key Value Store With Spin Applications](#key-value-store-with-spin-applications)
- [Tutorial Prerequisites](#tutorial-prerequisites)
- [Creating a New Spin Application](#creating-a-new-spin-application)
- [Configuration](#configuration)
  - [The Spin TOML File](#the-spin-toml-file)
- [Write Code to Save and Load Data](#write-code-to-save-and-load-data)
  - [The Spin SDK Version](#the-spin-sdk-version)
- [Quick Overview - Video](#quick-overview---video)
- [Source Code](#source-code)
- [Building and Deploying Your Spin Application](#building-and-deploying-your-spin-application)
- [Storing and Retrieving Data From Your Default Key/Value Store](#storing-and-retrieving-data-from-your-default-keyvalue-store)
- [Conclusion](#conclusion)
- [Next Steps](#next-steps)

## Key Value Store With Spin Applications

Spin applications are best suited for event-driven, stateless workloads that have low-latency requirements. Keeping track of the application's state (storing information) is an integral part of any useful product or service. For example, users (and the business) will expect to store and load data/information at all times during an application’s execution. [Spin](https://www.fermyon.com/blog/spin-v09) has support for applications that need data in the form of key/value pairs and are satisfied by a Basically Available, Soft State, and Eventually Consistent (BASE) model. Workload examples include general value caching, session caching, counters, and serialized application state. In this tutorial, you will learn how to do the following:

* Create a Spin application with `spin new`
* Use the key value store SDK to get, set, and list key value pairs
* Configure your application manifest (`spin.toml`) to use the default key value store
* Run your key value store Spin application locally with `spin up`

## Tutorial Prerequisites

First, follow [this guide](./install.md) to install Spin. To ensure you have the correct version, you can check with this command:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

> Please ensure you're on version 1.0 or newer.

## Creating a New Spin Application

Let's create a Spin application that will send and retreive data from a key value store. To make things easy, we'll start from a template using the following commands ([learn more](./quickstart#creating-a-new-spin-application-from-a-template)):

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

```bash
$ spin new http-rust spin-key-value

# Reference: https://github.com/fermyon/spin/tree/main/examples/rust-key-value
```

{{ blockEnd }}

{{ startTab "TypeScript" }}

<!-- @selectiveCpy -->

```bash
$ spin new http-ts spin-key-value

# Reference: https://github.com/fermyon/spin-js-sdk/tree/main/examples/typescript/spin_kv
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

<!-- @selectiveCpy -->

```bash
$ spin new http-go spin-key-value

# Reference: https://github.com/fermyon/spin/tree/main/examples/tinygo-key-value
```

{{ blockEnd }}

{{ blockEnd }}

## Configuration

Good news - Spin will take care of setting up your key value store. However, in order to make sure your Spin application has permission to access the key value store, you must add the `key_value_stores = ["default"]` line in the `[[component]]` area of the `spin.toml` file. This line is necessary to communicate to Spin that a given component has access to the default key value store. A newly scaffolded Spin application will not have this line; you will need to add it. 

>> Tip: You can choose between various store implementations by modifying [the runtime configuration](dynamic-configuration.md#key-value-store-runtime-configuration). The default implementation uses [SQLite](https://www.sqlite.org/index.html) within the Spin framework.

Each Spin application's `key_value_stores` instances are implemented on a per-component basis across the entire Spin application. This means that within a multi-component Spin application (which has the same `key_value_stores = ["default"]` configuration line), each `[[component]]` will access that same data store. If one of your application's components creates a new key/value pair, another one of your application's components can update/overwrite that initial key/value after the fact.

### The Spin TOML File

We will give our components access to the key value store by adding the `key_value_stores = ["default"]` in the `[[component manifest]]` as shown below:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

```toml
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "A simple application that exercises key-value storage."
name = "spin-key-value"
trigger = { type = "http", base = "/test" }
version = "0.1.0"

[[component]]
id = "spin-key-value"
source = "target/wasm32-wasi/release/spin-key-value.wasm"
allowed_http_hosts = []
# Gives this component access to the default key value store
key_value_stores = ["default"]
[component.trigger]
route = "/..."
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

{{ blockEnd }}

{{ startTab "TypeScript" }}

```toml
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "A simple application that exercises key-value storage."
name = "spin-key-value"
trigger = { type = "http", base = "/test" }
version = "0.1.0"

[[component]]
id = "spin-key-value"
source = "target/spin-key-value.wasm"
exclude_files = ["**/node_modules"]
# Gives this component access to the default key value store
key_value_stores = ["default"]
[component.trigger]
route = "/..."
[component.build]
command = "npm run build"
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

```toml
spin_manifest_version = "1"
authors = ["Your Name <your-name@example.com>"]
description = "A simple application that exercises key-value storage."
name = "spin-key-value"
trigger = { type = "http", base = "/test" }
version = "1.0.0"

[[component]]
id = "spin-key-value"
source = "main.wasm"
# Gives this component access to the default key value store
key_value_stores = ["default"]
[component.trigger]
route = "/..."
[component.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
```

{{ blockEnd }}

{{ blockEnd }}

## Write Code to Save and Load Data

In this section, we use the Spin SDK to open and persist our application's data inside our default key/value store. This is a special store that every environment running Spin applications will make available for their application. 

> Please note: Spin applications written in Rust can [store and retrieve Rust data structures](./rust-components#storing-data-in-the-spin-key-value-store) in the application's data store.

### The Spin SDK Version

If you have an existing application and would like to try out the key/value feature, please check the Spin SDK reference in your existing application's configuration. For example, if using Rust please check your application's `Cargo.toml` file. If it refers to version 0.8 or earlier then update the Spin SDK reference to match your upgraded version of Spin:

<!-- @nocpy -->

```toml
# The Spin SDK.
spin-sdk = { git = "https://github.com/fermyon/spin", tag = "v0.10.0" }
```

Similarly an application created using the `http-go` template might need the reference to the Spin SDK in its `go.mod` file updated to look like the following:

<!-- @nocpy -->

```bash
module github.com/http_go

go 1.17

require github.com/fermyon/spin/sdk/go v0.10.0
```

The same applies to other programming languages and their respective configuration. This information is provided to prevent you from experiencing an error such as the following:

<!-- @nocpy -->

```bash
unresolved import spin_sdk::key_value
key_value::{Error, Store}
^^^^^^^^^ could not find `key_value` in `spin_sdk`
```

## Quick Overview - Video

Before we get into the source code, let's watch a quick overview of the new key/value store feature.

<iframe width="560" height="315" src="https://www.youtube.com/embed/qNBnVA2pkkY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Source Code

Now let's use the Spin SDK to:
- add new data
- check that the new data exists
- retrieve that data
- delete data
- check the data has been removed

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

```rust
use anyhow::Result;
use http::{Method, StatusCode};
use spin_sdk::{
    http::{Request, Response},
    http_component,
    key_value::{Error, Store},
};

#[http_component]
fn handle_request(req: Request) -> Result<Response> {
    // Open the default key-value store
    let store = Store::open_default()?;

    let (status, body) = match req.method() {
        &Method::POST => {
            // Add the request (URI, body) tuple to the store
            store.set(req.uri().path(), req.body().as_deref().unwrap_or(&[]))?;
            (StatusCode::OK, None)
        }
        &Method::GET => {
            // Get the value associated with the request URI, or return a 404 if it's not present
            match store.get(req.uri().path()) {
                Ok(value) => (StatusCode::OK, Some(value.into())),
                Err(Error::NoSuchKey) => (StatusCode::NOT_FOUND, None),
                Err(error) => return Err(error.into()),
            }
        }
        &Method::DELETE => {
            // Delete the value associated with the request URI, if present
            store.delete(req.uri().path())?;
            (StatusCode::OK, None)
        }
        &Method::HEAD => {
            // Like GET, except do not return the value
            match store.exists(req.uri().path()) {
                Ok(true) => (StatusCode::OK, None),
                Ok(false) => (StatusCode::NOT_FOUND, None),
                Err(error) => return Err(error.into()),
            }
        }
        // No other methods are currently supported
        _ => (StatusCode::METHOD_NOT_ALLOWED, None),
    };

    Ok(http::Response::builder().status(status).body(body)?)
}
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

```typescript
import { HandleRequest, HttpRequest, HttpResponse, Kv } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  let store = Kv.openDefault()
  let status = 200
  let body

  switch (request.method) {
    case "POST":
      store.set(request.uri, request.body || (new Uint8Array()).buffer)
      break;
    case "GET":
      let val
      try {
        val = store.get(request.uri)
        body = decoder.decode(val)
      } catch (error) {
        status = 404
      }
      break;
    case "DELETE":
      store.delete(request.uri)
      break;
    case "HEAD":
      if (!store.exists(request.uri)) {
        status = 404
      }
      break;
    default:
  }

  return {
    status: status,
    body: body
  }
}
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

```go
package main

import (
	"io"
	"net/http"

	spin_http "github.com/fermyon/spin/sdk/go/http"
	"github.com/fermyon/spin/sdk/go/key_value"
)

func init() {
	// handler for the http trigger
	spin_http.Handle(func(w http.ResponseWriter, r *http.Request) {
		store, err := key_value.Open("default")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer key_value.Close(store)

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		switch r.Method {
		case http.MethodPost:
			err := key_value.Set(store, r.URL.Path, body)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusOK)
		case http.MethodGet:
			value, err := key_value.Get(store, r.URL.Path)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusOK)
			w.Write(value)
		case http.MethodDelete:
			err := key_value.Delete(store, r.URL.Path)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusOK)
		case http.MethodHead:
			exists, err := key_value.Exists(store, r.URL.Path)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			if exists {
				w.WriteHeader(http.StatusOK)
				return
			}

			w.WriteHeader(http.StatusNotFound)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		}
	})
}

func main() {}
```

{{ blockEnd }}

{{ blockEnd }}

## Building and Deploying Your Spin Application

Now let's build and deploy our Spin Application locally. Run the following command to build your application: 

<!-- @selectiveCpy -->

```bash
$ spin build
```

## Storing and Retrieving Data From Your Default Key/Value Store

Once you have completed this minimal configuration and deployed your application, data will be persisted across requests. Let's begin by creating a `POST` request that stores a JSON key/value object:

<!-- @selectiveCpy -->

```bash
# Create a new POST request and set the key/value pair of foo:bar
$ curl -X POST localhost:3000/test -H 'Content-Type: application/json' -d '{"foo":"bar"}' -v

Trying 127.0.0.1:3000...
Connected to localhost (127.0.0.1) port 3000
POST /test HTTP/1.1
Host: localhost:3000
Content-Type: application/json
HTTP/1.1 200 OK
```

We can now use a `HEAD` request to confirm that our component is holding data for us. Essentially, all we want to see here is a `200 OK` response when calling our components endpoint (`/test`). Let's give it a try:

<!-- @selectiveCpy -->

```bash
$ curl -I HEAD localhost:3000/test -v                                                     

Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000
HEAD /test HTTP/1.1
Host: localhost:3000
HTTP/1.1 200 OK
```

Perfect, `200 OK`. Now, let's create a `GET` request that fetches the data from our component:

<!-- @selectiveCpy -->

```bash
# Create a GET request and fetch the key/value that we stored in the previous request
$ curl -X GET localhost:3000/test -v

Trying 127.0.0.1:3000...
Connected to localhost (127.0.0.1) port 3000
GET /test HTTP/1.1
Host: localhost:3000
HTTP/1.1 200 OK
{
    "foo": "bar"
}
```

Great!, the above command successfully returned our data as intended:

<!-- @nocpy -->

```json
{
    "foo": "bar"
}
```

Lastly, we show how to create a `DELETE` request that removes the data for this specific component altogether:

<!-- @selectiveCpy -->

```bash
$ curl -X DELETE localhost:3000/test -v

Trying 127.0.0.1:3000...
Connected to localhost (127.0.0.1) port 3000
DELETE /test HTTP/1.1
Host: localhost:3000
HTTP/1.1 200 OK
```

Note how all of the above commands returned `200 OK` responses. In these examples, we were able to `POST`, `HEAD` (check to see if data exists), `GET` and also `DELETE` data from our component.

Interestingly there is one more request we can re-run before wrapping up this tutorial. If no data exists in the component's endpoint of `/test` (which is technically the case now that we have sent the `DELETE` request) the `HEAD` request should correctly return `404 Not Found`. You can consider this a type of litmus test; let's try it out:

<!-- @selectiveCpy -->

```bash
$ curl -I HEAD localhost:3000/test -v

Trying 127.0.0.1:3000...
Connected to localhost (127.0.0.1) port 3000
HEAD /test HTTP/1.1
Host: localhost:3000
HTTP/1.1 404 Not Found
```

As we can see above, there is currently no data found at the `/test` endpoint of our application.

## Conclusion

We want to get feedback on the ergonomics of the key value API. We are curious about what new APIs you would suggest we implement and are also interested in learning about what backing stores you would like to see.

## Next Steps

You can read the [improvement proposal for key/value support](https://github.com/fermyon/spin/blob/main/docs/content/sips/010-key-value.md) as well as the implementation for the [current feature](https://github.com/fermyon/spin/pull/1035). Please feel free to ask questions and also share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Key/Value Store - Spin 0.10.0",
  "description": "Overview of the key/value store in Spin v0.10.0",
  "thumbnailUrl": "https://www.fermyon.com/static/image/twc-spin.png",
  "uploadDate": "2023-02-25T08:00:00+00:00",
  "duration": "PT3M16S",
  "contentUrl": "https://www.youtube.com/watch?v=qNBnVA2pkkY",
  "embedUrl": "https://www.youtube.com/embed/qNBnVA2pkkY"
}
</script>
