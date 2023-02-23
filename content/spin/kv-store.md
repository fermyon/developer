title = "Persistent Data: Spin"
template = "common_main"
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
- [Checking the Spin SDK Version](#checking-the-spin-sdk-version)
- [Building and Deploying Your Spin Application](#building-and-deploying-your-spin-application)
- [Storing and Retrieving Data From Your Default Key/Value Store](#storing-and-retrieving-data-from-your-default-keyvalue-store)
- [Conclusion](#conclusion)
- [Next Steps](#next-steps)

## Key Value Storage With Spin Applications

Spin applications are best suited for event-driven, stateless workloads that have low-latency requirements. Keeping track of the application's state (storing information) is an integral part of any useful product or service. For example, users (and the business) will expect to store and load data/information at all times; during an application’s execution. In [Spin v0.9.0](https://www.fermyon.com/blog/spin-v09), we've added support for key/value storage. This is a storage option for applications that need data in the form of key/value pairs and are satisfied by a BASE consistency model. Workload examples include general value caching, session caching, counters, and serialized application state.

## SQLite

SQLite is an integral part of Spin's key/value API. As of Spin v0.9.0 onwards, users can easily access, a built-in, _local_ key/value SQLite database in every Spin application. This persistent storage feature is available by default and with minimal configuration. Supported language SDKs currently include Go, JavaScript/TypeScript, and Rust. With these new changes implemented.

> Spin users can now persist and retrieve non-relational data from a key/value store across multiple requests to and from the same application; written in any of these languages.

### Redis, PostgreSQL & SQLite

A while back, around the Spin v0.5.0 version, we published an article on [Persistent Storage in Webassembly Applications](https://www.fermyon.com/blog/persistent-storage-in-webassembly-applications). In that previous article, we showed the Spin framework's capabilities of providing WebAssembly executables with access to different levels of on-disk persistence. We demonstrated manually installing Redis from source, running our Redis server on localhost and then reading and writing from Redis via both the Redis CLI itself and also via the Spin SDK. Our current documentation also has examples of using both [Redis](https://developer.fermyon.com/cloud/data-redis) and [PostgreSQL](https://developer.fermyon.com/cloud/data-postgres), via [Redis Labs](https://redis.com/) and [ElephantSQL](https://www.elephantsql.com/plans.html) services respectively. In all of these previous examples, to persist data within your applications, a separate data storage layer is a requirement. These methods of data persistence are perfectly fine and sound to use, as part of your application, if you choose to do so.

However, from Spin v0.9.0 onwards, you are no longer required to install any on-disk persistence; outside of just installing Spin itself. SQLite exists inside Spin. SQLite is embedded in a way that is analogous to how one would imagine using a software library i.e. SQLite is designed to be used in this manner and therefore, for all intents and purposes, you could say that SQLite does not exist outside of Spin. When you run your Spin application using the [spin up](https://developer.fermyon.com/common/cli-reference#up) command SQLite is available to your application. When your application is no longer running, neither is SQLite. Your data will continue to persist at all times (including during restarts) and will support the running of your application. Let's get started with creating and deploying your first Spin application that uses this new key/value storage mechanism.

## Tutorial Prerequisites

First, follow [this guide](./install.md) to install Spin v0.9.0 or later. To ensure you have the correct version, you can check with this command:

<!-- @selectiveCpy -->

```bash
$ spin --version
spin 0.9.0
```

## Creating a New Application

As previously documented, you can go ahead and [create a new Spin application from a template](https://developer.fermyon.com/spin/quickstart#creating-a-new-spin-application-from-a-template). Before you do though, please go ahead and read the [spin template](https://developer.fermyon.com/common/cli-reference#templates) and [spin new](https://developer.fermyon.com/common/cli-reference#new) sections of the Spin Command Line Interface (CLI) documentation. You will learn how to use the commands effectively and also see many handy options to [install](https://developer.fermyon.com/common/cli-reference#install-templates) and [upgrade](https://developer.fermyon.com/common/cli-reference#upgrade-templates) templates and so forth. When you are ready, go ahead and create your new application using commands similar to the ones shown below:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

```bash
spin new http-rust my_http_rust_app
```

{{ blockEnd }}

{{ startTab "TypeScript" }}

```bash
spin new http-ts my_http_typescript_app
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

```bash
spin new http-go my_http_go_app
```

{{ blockEnd }}

{{ blockEnd }}

## Configuration

Take special note of the `key_value_stores = ["default"]` line in the `[[component]]` area of the `spin.toml` file, as shown in the next section. A newly scaffolded application will not have this line. You will need to add it.

### The Spin TOML File

In this section we begin by configuring the application's `spin.toml` to use a default key/value store i.e. you will need to add the `key_value_stores` configuration before proceeding, as demonstrated below:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = "A simple application that exercises key-value storage."
name = "spin-key-value"
trigger = {type = "http", base = "/test"}
version = "1.0.0"

[[component]]
id = "hello"
source = "target/wasm32-wasi/release/spin_key_value.wasm"
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
trigger = {type = "http", base = "/test"}
version = "1.0.0"

[[component]]
id = "hello"
source = "target/wasm32-wasi/release/spin_key_value.wasm"
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
name = "tinygo-key-value-example"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "key-value"
source = "main.wasm"
key_value_stores = ["default"]
[component.trigger]
route = "/test"
[component.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
```

{{ blockEnd }}

{{ blockEnd }}

## Using the Spin SDK

In this section, we use the Spin SDK to open and persist our application's data inside our default key/value store. This is a special store that every environment running Spin applications will make available for their application. As mentioned above the store is essentially an embedding of [SQLite](https://www.sqlite.org/index.html) within the Spin framework. 

## Checking the Spin SDK Version

Please note that your application will need to specify Spin v0.9.0 in its configuration. For example, a new application made using the `http-rust` template might need the reference to the Spin SDK in its `Cargo.toml` file updated to look like the following:

<!-- @nocpy -->

```toml
# The Spin SDK.
spin-sdk = { git = "https://github.com/fermyon/spin", tag = "v0.9.0" }
```

Similarly an application created using the `http-go` template might need the reference to the Spin SDK in its `go.mod` file updated to look like the following:

<!-- @nocpy -->

```mod
require github.com/fermyon/spin/sdk/go v0.9.0
```

The same applies to other programming languages and their respective configuration. This information is provided to prevent you from experiencing an error such as the following:

```bash
unresolved import spin_sdk::key_value
key_value::{Error, Store}
^^^^^^^^^ could not find `key_value` in `spin_sdk`
```

Once we have created our store, we can use the Spin SDK to:
- check if a key exists and if so, retrieve the corresponding value, and
- list all the available keys.

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
const key = "app-data";
interface Data {
  views: number,
  previous_request: string
}
export async function handleRequest(request) {
  let kv = spinSdk.kv.openDefault();
  let data: Data;
  if (kv.exists(key)) {
    data = JSON.parse(decoder.decode(kv.get(key)))
  } else {
    data = { views: 0, previous_request: "" } as Data;
  }
  data.views += 1000;
  data.previous_request = request.uri;
  kv.set(key, JSON.stringify(data));
    return {
        status: 200,
        headers: ("content-type", "application/json"),
        body: encoder.encode(data.tostring).buffer
    }
}
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

```go
package main

import (
	"net/http"
	"reflect"
	"fmt"

	spin_http "github.com/fermyon/spin/sdk/go/http"
	"github.com/fermyon/spin/sdk/go/key_value"
)

func init() {

	// handler for the http trigger
	spin_http.Handle(func(w http.ResponseWriter, r *http.Request) {
		store, err := key_value.Open("default");
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		defer key_value.Close(store)

		if err := key_value.Set(store, "foo", []byte("bar")); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		{
			expected := []byte("bar")
			if value, err := key_value.Get(store, "foo"); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			} else if !reflect.DeepEqual(value, expected) {
				http.Error(
					w,
					fmt.Sprintf("expected %v, got %v", expected, value),
					http.StatusInternalServerError,
				)
				return
			}
		}

		{
			expected := []string{"foo"}
			if value, err := key_value.GetKeys(store); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			} else if !reflect.DeepEqual(value, expected) {
				http.Error(
					w,
					fmt.Sprintf("expected %v, got %v", expected, value),
					http.StatusInternalServerError,
				)
				return
			}
		}

		if err := key_value.Delete(store, "foo"); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if exists, err := key_value.Exists(store, "foo"); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		} else if exists {
			http.Error(w, "key was not deleted as expected", http.StatusInternalServerError)
			return
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

Once you have completed this minimal configuration and deployed your application, data will be persisted across requests:

<!-- @selectiveCpy -->

```bash
$ curl localhost:3000/hello
{"views":1,"previous_request":""}
$ curl localhost:3000/goodbye
{"views":2,"previous_request":"/hello"}
$ curl localhost:3000/hi-again
{"views":3,"previous_request":"/goodbye"}
```

When you run the above commands, you will see the output (similar to what is shown in our code block above); confirming the key/value pairs are stored correctly.

## Conclusion

This is an early preview for working with key/value stores, and we want to get feedback on the ergonomics of the API. We are curious about what new APIs you would suggest we implement and are also interested in learning about what backing stores you would like to see. In the next iterations for this feature, we will focus on configuring multiple KV stores with multiple backing services (such as cloud services).

## Next Steps

You can read the [improvement proposal for key/value support](https://github.com/fermyon/spin/pull/1045) as well as the implementation for the [current feature](https://github.com/fermyon/spin/pull/1035). Please feel free to ask questions and also share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf).