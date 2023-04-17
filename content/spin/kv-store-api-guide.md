title = "Key Value Store"
template = "spin_main"
date = "2023-04-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/kv-store-api-guide.md"

---
- [Using  Store From Applications](#using-key-value-store-from-applications)
- [Granting Key Value Store Permissions to Components](#granting-key-value-store-permissions-to-components)

Spin provides an interface for you to persist data in a key value store managed by Spin. This key value store allows Spin developers to persist non-relational data across application envocations. To learn more about key value store use cases and how to enable your Spin application to use a key value store, check out our [key value tutorial](./kv-store-tutorial.md).

{{ details "Why do I need a Spin interface? Why can't I just use my own external store?" "You can absolutely still use your own external store either with the Redis or Postgres APIs, or outbound HTTP. However, if you're interested in quick, non-relational local storage without any infrastructure set-up then Spin's key value store is a great option." }}

## Using Key Value Store From Applications

The Spin SDK surfaces the Spin key value store interface to your language. The following characteristics are true of keys and values:

* Keys as large as 256 bytes (UTF-8 encoded)
* Values as large as 1 megabyte
* Capacity for 1024 key value tuples

The set of operations is common across all SDKs:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| `open`  | name | store  | Open the store with the specified name. If `name` is the string "default", the default store is opened for the component that was granted access in the component manifest from `spin.toml`. Otherwise, `name` must refer to a store defined and configured in a [runtime configuration file](./dynamic-configuration.md#key-value-store-runtime-configuration) supplied with the application.|
| `get` | store, key | key | Get the value associated with the specified `key` from the specified `store`. |
| `set` | store, key, value | - | Set the `value` associated with the specified `key` in the specified `store`, overwriting any existing value. |
| `delete` | store, key | - | Delete the tuple with the specified `key` from the specified `store`. `error::invalid-store` will be raised if `store` is not a valid handle to an open store.  No error is raised if a tuple did not previously exist for `key`.|
| `exists` | store, key | boolean | Return whether a tuple exists for the specified `key` in the specified `store`.|
| `get-keys` | store | list<keys> | Return a list of all the keys in the specified `store`. |
| `close` | store | - | Close the specified `store`. |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

{{ blockEnd }}

{{ startTab "Typescript"}}

{{ blockEnd }}

{{ startTab "Python"}}

{{ blockEnd }}

{{ startTab "TinyGo"}}

Key value functions are provided by the `github.com/fermyon/spin/sdk/go/key_value` module. [![Go Reference](https://pkg.go.dev/badge/github.com/fermyon/spin/sdk/go/key_value.svg)](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/key_value)

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

## Granting Key Value Store Permissions to Components

By default, a given component of an app will not have access to any key value store. Access must be granted specifically to each component via the component manifest:

```toml
[component]
# Pass in 1 or more key value stores, based on how many you'd like your component to have access to
key_value_stores = ["<store 1>", "<store 2>"]
```

For example, a component could be given access to the default store using `key_value_stores = ["default"]`.