title = "Using Key Value Storage with Spin Applications"
template = "spin_main"
date = "2023-02-21T00:00:00Z"
enable_shortcodes = true
[extra]

---
- [Using Key Value Storage With Spin Applications](#using-key-value-storage-with-spin-applications)
    - [Prerequisites](#prerequisites)
    - [Use Spin SDK To Open And Persist Data In A Default Key/Value Store](#use-spin-sdk-to-open-and-persist-data-in-a-default-keyvalue-store)
    - [Configure `spin.toml` To Use A Default Key/Value Store](#configure-spintoml-to-use-a-default-keyvalue-store)
    - [Build And Deploy Your Spin App](#build-and-deploy-your-spin-app)
    - [Store and Retrieve Data From Your Default Key/Value Store](#store-and-retrieve-data-from-your-default-keyvalue-store)
    - [Conclusion](#conclusion)
    - [Next Steps](#next-steps)

## Using Key Value Storage with Spin Applications

 Spin applications are best suited for event-driven, stateless workloads that have low-latency requirements. If your Spin application needs to persist state, the data should be stored in an external tool or service. In [Spin v0.9.0](https://www.fermyon.com/blog/spin-v09), we've added support for key/value storage. This is a storage option for applications that need to data in the form of key/value pairs and are satisfied by a BASE consistency model. Workload examples include general value caching, session caching, counters, and serialized application state.

 Spin users can use new a API in the Spin SDKs for persisting and retrieving non-relational data from a key/value store across multiple requests to and from the same application. Together with the updated SDKs we are introducing a built-in, _local_ key/value store available with minimal configuration for every Spin application. The default key/value store is available for the following SKDs: Go, JavaScript/TypeScript, and Rust. 

 Let's get started with creating and deploying your first Spin application that uses key/value storage.

## Prerequisites

First, follow [this guide](./install.md) to install Spin v0.9.0 or later. To ensure you have the correct version, you can check with this command:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

## Use Spin SDK To Open And Persist Data In A Default Key/Value Store 

First, we must open a default key/value store for our Spin application. This is a special store that every environment running Spin applications will make available for their application (which when running Spin applications locally, is built using [SQLite](https://www.sqlite.org/index.html)). Then we will complete the following actions: 
- Check if key exists and retreive the corresponding value with the Spin SDK
- List all the keys with the Spin SDK

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

## Configure `spin.toml` To Use A Default Key/Value Store

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

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

## Build And Deploy Your Spin Application

Now let's build and deploy our Spin Application locally. Run the following command to build your application: 

<!-- @selectiveCpy -->

```bash

spin build

```

Now run the subsequent command to deploy your application: 

<!-- @selectiveCpy -->

```bash

spin up

```

## Store and Retrieve Data From Your Default Key/Value Store

Once you have completed this minimal configuration and deployed your application, data will be persisted across requests:

<!-- @selectiveCpy -->

```bash

curl localhost:3000/hello
curl localhost:3000/goodbye
curl localhost:3000/hi-again

```

You should see the following output to confirm the key/value pairs are being stored correctly:

<!-- @nocopy -->

```bash

$ curl localhost:3000/hello
{"views":1,"previous_request":""}
$ curl localhost:3000/goodbye
{"views":2,"previous_request":"/hello"}
$ curl localhost:3000/hi-again
{"views":3,"previous_request":"/goodbye"}

```

## Conclusion

This is an early preview for working with key/value stores, and we want to get feedback on the ergonomics of the API (and what new APIs we should implement), as well as on what backing stores you would like to see. In the next iterations for this feature, we will focus on configuring multiple KV stores with multiple backing services (such as cloud services).

## Next Steps

- You can read the [improvement proposal for key/value support](https://github.com/fermyon/spin/pull/1045) as well as the [the implementation for the current feature](https://github.com/fermyon/spin/pull/1035).
- Please share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf)
