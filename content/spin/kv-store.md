title = "Persistent Data: Spin"
template = "spin_main"
date = "2023-02-21T00:00:00Z"
enable_shortcodes = true
[extra]

---
- [Key Value Storage With Spin Applications](#key-value-storage-with-spin-applications)
- [SQLite](#sqlite)
  - [Redis, PostgreSQL \& SQLite](#redis-postgresql--sqlite)
- [Tutorial Prerequisites](#tutorial-prerequisites)
- [Creating a New Application](#creating-a-new-application)
- [Configuration](#configuration)
  - [The Spin TOML File](#the-spin-toml-file)
- [Using the Spin SDK](#using-the-spin-sdk)
  - [The Spin SDK Version](#the-spin-sdk-version)
- [Quick Overview - Video](#quick-overview---video)
- [Source Code](#source-code)
- [Building and Deploying Your Spin Application](#building-and-deploying-your-spin-application)
- [Storing and Retrieving Data From Your Default Key/Value Store](#storing-and-retrieving-data-from-your-default-keyvalue-store)
- [Conclusion](#conclusion)
- [Next Steps](#next-steps)

## Key Value Storage With Spin Applications

Spin applications are best suited for event-driven, stateless workloads that have low-latency requirements. Keeping track of the application's state (storing information) is an integral part of any useful product or service. For example, users (and the business) will expect to store and load data/information at all times; during an application’s execution. [Spin](https://www.fermyon.com/blog/spin-v09) has support for applications that need data in the form of key/value pairs and are satisfied by a BASE consistency model. Workload examples include general value caching, session caching, counters, and serialized application state.

## SQLite

SQLite is an integral part of Spin's key/value API. As of Spin v0.9.0 onwards, users can easily access, a built-in, _local_ key/value SQLite database in every Spin application. This persistent storage feature is available by default and with minimal configuration. Supported language SDKs currently include Go, JavaScript/TypeScript, and Rust. With these new changes implemented.

> Spin users can now persist and retrieve non-relational data from a key/value store across multiple requests to and from the same application; written in any of these languages.

### Redis, PostgreSQL & SQLite

A while back, around the Spin v0.5.0 version, we published an article on [Persistent Storage in Webassembly Applications](https://www.fermyon.com/blog/persistent-storage-in-webassembly-applications). In that previous article, we showed the Spin framework's capabilities of providing WebAssembly executables with access to different levels of on-disk persistence. We demonstrated manually installing Redis from source, running our Redis server on localhost and then reading and writing from Redis via both the Redis CLI itself and also via the Spin SDK. Our current documentation also has examples of using both [Redis](https://developer.fermyon.com/cloud/data-redis) and [PostgreSQL](https://developer.fermyon.com/cloud/data-postgres), via [Redis Labs](https://redis.com/) and [ElephantSQL](https://www.elephantsql.com/plans.html) services respectively. 

In all of these previous examples, to persist data within your application, a separate data storage layer is a requirement. These methods of data persistence are perfectly fine and sound to use, as part of your application, if you choose to do so.

However, from Spin v0.9.0 onwards, you are no longer required to install any on-disk persistence; outside of just installing Spin itself. SQLite exists inside Spin. SQLite is embedded in a way that is analogous to how one would imagine using a software library i.e. SQLite is designed to be used in this manner and therefore, for all intents and purposes, you could say that SQLite does not exist outside of Spin. When you run your Spin application using the [spin up](https://developer.fermyon.com/common/cli-reference#up) command SQLite is available to your application. When your application is no longer running, neither is SQLite. Your data will continue to persist at all times (including during restarts) and will support the running of your application.

In the future, it may be possible to embed other database technologies into Spin. For example, future Spin SDK updates may target other databases such as Redis; which may allow you to build applications using Redis via minimal Spin configuration without the need to locally install and maintain your own Redis instance.

Let's get started with creating and deploying your first Spin application that uses this new key/value storage mechanism.

## Tutorial Prerequisites

First, follow [this guide](./install.md) to install Spin. To ensure you have the correct version, you can check with this command:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

> If the version is 0.8 or earlier, you'll need to upgrade to a more recent version.

## Creating a New Application

As previously documented, you can go ahead and [create a new Spin application from a template](https://developer.fermyon.com/spin/quickstart#creating-a-new-spin-application-from-a-template). Before you do though, please go ahead and read the [spin template](https://developer.fermyon.com/common/cli-reference#templates) and [spin new](https://developer.fermyon.com/common/cli-reference#new) sections of the Spin Command Line Interface (CLI) documentation. You will learn how to use the commands effectively and also see many handy options to [install](https://developer.fermyon.com/common/cli-reference#install-templates) and [upgrade](https://developer.fermyon.com/common/cli-reference#upgrade-templates) templates and so forth. When you are ready, go ahead and create your new application using commands similar to the ones shown below:

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

# Reference: https://github.com/karthik2804/spin-kv-ts
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

Take special note of the `key_value_stores = ["default"]` line in the `[[component]]` area of the `spin.toml` file, as shown in the next section. A newly scaffolded application will not have this line; you will need to add it. 

Each Spin application's `key_value_stores` instances are implemented on a per-component basis across the entire Spin application. What this essentially means is that (in cases where you have more than one `[[component]]`) any component in your Spin application (which has the same `key_value_stores = ["default"]` configuration line) will be equally able to access that same data store. If one of your components creates a new key/value, another one of your application's components can update/overwrite that initial key/value, after the fact.

### The Spin TOML File

In this section we begin by configuring the application's `spin.toml` to use a default key/value store i.e. you will need to add the `key_value_stores` configuration before proceeding, as demonstrated below:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "A simple application that exercises key-value storage."
name = "spin-key-value"
trigger = { type = "http", base = "/test" }
version = "0.1.0"

[[component]]
id = "spin-key-value"
source = "target/wasm32-wasi/release/spin-key-value.wasm"
allowed_http_hosts = []
key_value_stores = ["default"]
[component.trigger]
route = "/..."
[component.build]
command = "cargo build --target wasm32-wasi --release"
```

{{ blockEnd }}

{{ startTab "TypeScript" }}

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "A simple application that exercises key-value storage."
name = "spin-key-value"
trigger = { type = "http", base = "/test" }
version = "0.1.0"

[[component]]
id = "spin-key-value"
source = "target/spin-key-value.wasm"
exclude_files = ["**/node_modules"]
key_value_stores = ["default"]
[component.trigger]
route = "/..."
[component.build]
command = "npm run build"
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "A simple application that exercises key-value storage."
name = "spin-key-value"
trigger = { type = "http", base = "/test" }
version = "1.0.0"

[[component]]
id = "spin-key-value"
source = "main.wasm"
key_value_stores = ["default"]
[component.trigger]
route = "/..."
[component.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
```

{{ blockEnd }}

{{ blockEnd }}

## Using the Spin SDK

In this section, we use the Spin SDK to open and persist our application's data inside our default key/value store. This is a special store that every environment running Spin applications will make available for their application. As mentioned above the store is essentially an embedding of [SQLite](https://www.sqlite.org/index.html) within the Spin framework. 

### The Spin SDK Version

If you have an existing application and would like to try out the key/value feature, please check the Spin SDK reference in your existing application's `Cargo.toml` file. If it refers to version 0.8 or earlier then update the Spin SDK reference to match your upgraded version of Spin. For example:

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

<!-- @nocpy -->

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

<!-- @nocpy -->

```typescript
import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  let store = spinSdk.kv.openDefault()
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

<!-- @nocpy -->

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

Now run the subsequent command to deploy your application: 

<!-- @selectiveCpy -->

```bash
$ spin up
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

We can now use a `HEAD` request to confirm that our component is holding data for us. Essentially, all we want to see here is a `200 OK` response; when calling our components endpoint (`/test`). Let's give it a try:

<!-- @selectiveCpy -->

```bash
curl -I HEAD localhost:3000/test -v                                                     

Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000
HEAD /test HTTP/1.1
Host: localhost:3000
HTTP/1.1 200 OK
```

Perfect, `200 OK`, now, let's create a `GET` request that fetches the data from our component:

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
curl -X DELETE localhost:3000/test -v

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
curl -I HEAD localhost:3000/test -v

Trying 127.0.0.1:3000...
Connected to localhost (127.0.0.1) port 3000
HEAD /test HTTP/1.1
Host: localhost:3000
HTTP/1.1 404 Not Found
```

As we can see above, there is currently no data found at the `/test` endpoint of our application.

## Conclusion

We want to get feedback on the ergonomics of the key/value API. We are curious about what new APIs you would suggest we implement and are also interested in learning about what backing stores you would like to see. In the next iterations for this feature, we will focus on configuring multiple KV stores with multiple backing services (such as cloud services).

## Next Steps

You can read the [improvement proposal for key/value support](https://github.com/fermyon/spin/pull/1045) as well as the implementation for the [current feature](https://github.com/fermyon/spin/pull/1035). Please feel free to ask questions and also share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf).

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
