title = "Spin Key Value Store"
template = "spin_main"
date = "2022-04-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main//content/spin/kv-store-api-guide.md"

---
- [Using Key Value Store From Applications](#using-key-value-store-from-applications)
- [Granting Key Value Store Permissions to Components](#granting-key-value-store-permissions-to-components)

Spin provides an interface for you to persist data in a Key Value Store managed by Spin.

{{ details "Why do I need a Spin interface? Why can't I just use my own external store?" "You can absolutely still use your own external store either with the Redis or Postgres APIs, or outbound HTTP. However, if you're interested in quick, non-relational local storage without any infrastructure set-up then Spin's Key Value store is a great option." }}

## Using Key Value Store From Applications

The Spin SDK surfaces the Spin Key Value Store interface to your language. The set of operations is common across all SDKs:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| `open`  | name | -  | Open the store with the specified name. If `name` is the string "default", the default store is opened. Otherwise, `name` must refer to a store defined and configured in a runtime configuration file supplied with the application.|
| `get` | store, key | - | Get the value associated with the specified `key` from the specified `store`. |
| `set` | store, key, value | - | Set the `value` associated with the specified `key` in the specified `store`, overwriting any existing value. |
| `delete` | store, key | - | Delete the tuple with the specified `key` from the specified `store`. |
| `exists` | store, key | - | Return whether a tuple exists for the specified `key` in the specified `store`.|
| `exists` | store | - | Return a list of all the keys in the specified `store`. |
| `close` | store | - | Close the specified `store`. |

## Granting Key Value Store Permissions to Components

By default, a given component of an app will not have access to any key-value store. Access must be granted specifically to each component via the component manifest:

```toml
[component]
key_value_stores = ["<store 1>", "<store 2>", ...]
```

For example, a component could be given access to the default store using `key_value_stores = ["default"]`.