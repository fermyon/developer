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

 Spin application are best suited for event-driven, stateless workloads that have low-latency requirements. If your Spin applications needs to persist state, the data will need to be stored in an external tool or service. In [Spin v0.9.0](https://www.fermyon.com/blog/spin-v09), we've added support for key/value storage. This is a storage option for applications that need to data in the form of key/value pairs and are satistifed by a BASE consistency model. Workload examples include general value caching, session caching, counters, serialized application state.

 Spin users can use new a API in the Spin SDKs for persisting and retrieving non-relational data from a key/value store across multiple requests to and from the same application. Together with the updated SDKs we are introducing a built-in, _local_ key/value store available with minimal configuration for every Spin application. The default key/value store is available for the following SKDs: Go, JavaScript, TypeScript, and Rust. 

 Let's get started with creating and deploying your first Spin application that uses key/value storage.

## Prerequisites

First, follow [this guide](./install.md) to install Spin v0.9.0 or later. To ensure you have the correct version, you can check with this command:

<!-- @selectiveCpy -->

```bash
spin --version
```

## Use Spin SDK To Open And Persist Data In A Default Key/Value Store 

First, we must open a default key/value store for our Spin application. This is a special store that every environment running Spin applications will make available for their application (which when running Spin applications locally, is built using [SQLite](https://www.sqlite.org/index.html)). Then we will complete the following actions: 
- Check if key exists and retreive the corresponding value with the Spin SDK
- List all the keys with the Spin SDK

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

```rust

// key for the application state
const DATA_KEY: &str = "app-data";
// application state
#[derive(Serialize, Deserialize, Default)]
struct Data {
    views: u64,
    previous_request: String,
}
/// A simple Spin HTTP component.
#[http_component]
fn hello_kv(req: Request) -> Result<Response> {
    // open the default KV store
    let kv = Store::open_default()?;
    // check whether the key already exists
    let mut data = match kv.exists(DATA_KEY)? {
        // if it exists, get the value and deserialize it
        true => serde_json::from_slice(&kv.get(DATA_KEY)?)?,
        false => Data::default(),
    };
    // update the key/value pair using the new data
    data.views += 1;
    let body = serde_json::to_string(&data)?;
    data.previous_request = req.uri().path().into();
    // update the key/value pair using the new data
    kv.set(DATA_KEY, serde_json::to_vec(&data)?)?;
    // send the value as a response
    Ok(http::Response::builder()
        .status(200)
        .header("content-type", "application/json")
        .body(Some(body.into()))?)
}

```

{{ blockEnd }}

{{ startTab "Typscript"}}

<!-- @selectiveCpy -->

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

{{ blockEnd }}

## Configure `spin.toml` To Use A Default Key/Value Store

<!-- @selectiveCpy -->

```toml

# spin.toml
spin_version = "1"
name = "spin-hello-world"
trigger = { type = "http", base = "/" }
version = "1.0.0"
[[component]]
id = "kv-example"
# we need to explicitly grant this component access
# to the application's default KV store.
key_value_stores = ["default"]
[component.trigger]
route = "/app/..."

```

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

curl localhost:3000/app/hello
curl localhost:3000/app/goodbye
curl localhost:3000/app/hi-again

```

You should see the following output to confirm the key/value pairs are being stored correctly:

<!-- @selectiveCpy -->

```bash

$ curl localhost:3000/rust/hello
{"views":1,"previous_request":""}
$ curl localhost:3000/rust/goodbye
{"views":2,"previous_request":"/rust/hello"}
$ curl localhost:3000/rust/hi-again
{"views":3,"previous_request":"/rust/goodbye"}

```

## Conclusion

This is an early preview for working with key/value stores, and we want to get feedback on the ergonomics of the API (and what new APIs we should implement), as well as on what backing stores you would like to see. In the next iterations for this feature, we will focus on configuring multiple KV stores with multiple backing services (such as cloud services).

## Next Steps

- You can read the [improvement proposal for key/value support](https://github.com/fermyon/spin/pull/1045) as well as the [the implementation for the current feature](https://github.com/fermyon/spin/pull/1035).
- Please share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf)
