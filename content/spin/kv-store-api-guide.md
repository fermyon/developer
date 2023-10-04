title = "Key Value Store"
template = "spin_main"
date = "2023-04-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/kv-store-api-guide.md"

---
- [Using Key Value Store From Applications](#using-key-value-store-from-applications)
- [Custom Key Value Stores](#custom-key-value-stores)
- [Granting Key Value Store Permissions to Components](#granting-key-value-store-permissions-to-components)

Spin provides an interface for you to persist data in a key value store managed by Spin. This key value store allows Spin developers to persist non-relational data across application invocations. To learn more about key value store use cases and how to enable your Spin application to use a key value store, check out our [key value tutorial](./kv-store-tutorial.md).

{{ details "Why do I need a Spin interface? Why can't I just use my own external store?" "You can absolutely still use your own external store either with the Redis or Postgres APIs, or outbound HTTP. However, if you're interested in quick, non-relational local storage without any infrastructure set-up then Spin's key value store is a great option." }}

## Using Key Value Store From Applications

The Spin SDK surfaces the Spin key value store interface to your language. The following characteristics are true of keys and values:

* Keys as large as 256 bytes (UTF-8 encoded)
* Values as large as 1 megabyte
* Capacity for 1024 key value tuples

The set of operations is common across all SDKs:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| `open`  | name | store  | Open the store with the specified name. If `name` is the string "default", the default store is opened, provided that the component that was granted access in the component manifest from `spin.toml`. Otherwise, `name` must refer to a store defined and configured in a [runtime configuration file](./dynamic-configuration.md#key-value-store-runtime-configuration) supplied with the application.|
| `get` | store, key | value | Get the value associated with the specified `key` from the specified `store`. |
| `set` | store, key, value | - | Set the `value` associated with the specified `key` in the specified `store`, overwriting any existing value. |
| `delete` | store, key | - | Delete the tuple with the specified `key` from the specified `store`. `error::invalid-store` will be raised if `store` is not a valid handle to an open store.  No error is raised if a tuple did not previously exist for `key`.|
| `exists` | store, key | boolean | Return whether a tuple exists for the specified `key` in the specified `store`.|
| `get-keys` | store | list<keys> | Return a list of all the keys in the specified `store`. |
| `close` | store | - | Close the specified `store`. |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

Key value functions are available in the `spin_sdk::key_value` module. The function names match the operations above. For example:

```rust
use anyhow::Result;
use spin_sdk::{
    http::{Request, Response},
    http_component,
    key_value::{Store},
};
#[http_component]
fn handle_request(_req: Request) -> Result<Response> {
    let store = Store::open_default()?;
    store.set("mykey", "myvalue")?;
    let value = store.get("mykey")?;
    Ok(http::Response::builder().status(200).body(Some(value.into()))?)
}
```

**General Notes** 

`set` **Operation**
- For set, the value argument can be of any type that implements AsRef<[u8]>

`get` **Operation**
- For get, the return value is of type Vec<u8>. If the key does not exist then Error::NoSuchKey is returned.

`open` **Operation**
- The close operation is not surfaced; it is called automatically when the store is dropped.

`set_json` and `get_json` **Operation**
- Rust applications can [store and retrieve serializable Rust types](/spin/rust-components#storing-data-in-the-spin-key-value-store).

{{ blockEnd }}

{{ startTab "Typescript"}}

With Typescript, the key value functions can be accessed after opening a store using either the `Kv.open` or the `Kv.openDefault` methods which returns a handle to the store. For example:

```javascript
import { HandleRequest, HttpRequest, HttpResponse, Kv } from "@fermyon/spin-sdk"

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
    let store = Kv.openDefault()
    store.set("mykey", "myvalue")
    return {
            status: 200,
            headers: {"content-type":"text/plain"},
            body: store.get("mykey")
    }
}

```

**General Notes**
- The spinSdk object is always available at runtime. Code checking and completion are available in TypeScript at design time if the module imports anything from the @fermyon/spin-sdk package. For example: 

`get` **Operation**
- The result is of the type `ArrayBuffer | null`
- If the key does not exist, `get` returns `null` (no error is thrown)

`set` **Operation**
- The value argument is of the type `ArrayBuffer | string`.

`setJson` and `getJson` **Operation**
- JavaScript and TypeScript applications can store JavaScript objects using `setJson`; these are serialized within the store as JSON. These serialized objects can be retrieved and deserialized using `getJson`. If you call `getJson` on a key that doesn't exist then an error is thrown (note that this is different behavior from `get`).

{{ blockEnd }}

{{ startTab "Python"}}

The key value functions are provided through the `spin_key_value` module in the Python SDK. For example:

```python
from spin_http import Response
from spin_key_value import kv_open_default


def handle_request(request):

    store = kv_open_default()
    store.set("mykey", "myvalue")
    value = store.get()
    //
    return Response(status, [("content-type", "text/plain")], value)   

```

**General Notes**

`get` **Operation**
- If a key does not exist, it returns `None`

{{ blockEnd }}

{{ startTab "TinyGo"}}

Key value functions are provided by the `github.com/fermyon/spin/sdk/go/key_value` module. [See Go Packages for reference documentation.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/key_value). For example: 

```go
import "github.com/fermyon/spin/sdk/go/key_value"

func example() error {
    store, err := key_value.Open("default")
    if err != nil {
        return err
    }
    defer key_value.Close(store)
    return key_value.Set(store, "mykey", []byte("myvalue"))
}

```

{{ blockEnd }}

{{ blockEnd }}

## Custom Key Value Stores

Spin defines a key-value store named `"default"` and provides automatic backing storage.  If you need to customize Spin with additional stores, or to change the backing storage for the default store, you can do so via the `--runtime-config-file` flag and the `runtime-config.toml` file.  See [Key Value Store Runtime Configuration](/spin/dynamic-configuration#key-value-store-runtime-configuration) for details.

## Granting Key Value Store Permissions to Components

By default, a given component of an app will not have access to any key value store. Access must be granted specifically to each component via the component manifest:

```toml
[component]
# Pass in 1 or more key value stores, based on how many you'd like your component to have access to
key_value_stores = ["<store 1>", "<store 2>"]
```

For example, a component could be given access to the default store using `key_value_stores = ["default"]`.