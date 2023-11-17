title = "Redis Storage"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/redis-outbound.md"

---
- [Using Redis From Applications](#using-redis-from-applications)
- [Granting Network Permissions to Components](#granting-network-permissions-to-components)

Spin provides an interface for you to read and write the Redis key/value store, and to publish Redis pub-sub messages.

{{ details "Why do I need a Spin interface? Why can't I just use my language's Redis library?" "The current version of the WebAssembly System Interface (WASI) doesn't provide a sockets interface, so Redis libraries that depend on sockets can't be built to Wasm. The Spin interface means Wasm modules can bypass this limitation by asking Spin to make the Redis connection on their behalf." }}

## Using Redis From Applications

The Spin SDK surfaces the Spin Redis interface to your language. The set of operations is common across all SDKs:

| Operation    | Parameters | Returns | Behavior |
|--------------|---------------------|---------|----------|
| `open`       | address    | connection resource | Opens a connection to the specified Redis instance. The host must be listed in `allowed_outbound_hosts`. Other operations must be called through a connection. (Exception: for JavaScript and Python, do not call `open`, and pass the address to each data operation - see the language guides below.) |
| Single value operations                      |
| `get`        | key        | bytes   | Returns the value of `key`. If the key does not exist, returns a zero-length array. |
| `set`        | key, bytes | -       | Sets the value of `key`, overwriting any existing value. |
| `incr`       | key        | integer | Increments the value at `key` by 1. If the key does not exist, its value is set to 0 first (and immediately incremented to 1). If the current value isn't an integer, or a string that represents an integer, it errors and the value is not changed. |
| `del`        | list of keys | -     | Removes the specified keys. Keys that don't exist are ignored (they do _not_ cause an error). |
| Set value operations                         |
| `sadd`       | key, list of strings | integer | Adds the strings to the set of values of `key`, and returns the number of newly added values. If the key does not exist, its value is set to the set of values |
| `smembers`   | key        | list of strings | Returns the set of values of `key`. if the key does not exist, this is an empty set. |
| `srem`       | key, list of strings | integer | Removes the strings from the set of values of `key`, and returns the number of newly removed values. If the key does not exist, this does nothing. |
| Pub-sub operations                           |
| `publish`    | channel, bytes | - | Publishes a message to the specified channel, with the specified payload bytes. |
| General operations                           |
| `execute`    | command, list of argument values | list of results | Executes the specified command with the specified arguments. This is a general-purpose 'escape hatch' if you need a command that isn't covered by the built-in operations. |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/redis/index.html)

Redis functions are available in the `spin_sdk::redis` module.

To access a Redis instance, use the `Connection::open` function.

```rust
let connection = spin_sdk::redis::Connection::open(&address)?;
```

You can then call functions on the `Connection` to work with the Redis instance:

```rust
connection.set("my-key", &"my-value".into());
let data = connection.get("my-key")?;
```

For full details of the Redis API, see the [Spin SDK reference documentation](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/redis/index.html);

**General Notes**

* Keys are of type `&str`.
* Bytes parameters are of type `&[u8]` and return values are `Vec<u8>`.
* Numeric return values are of type `i64`.
* All functions wrap the return in `anyhow::Result`.

**`get` Operation**

* This returns a `Result<Option<Vec<u8>>>`. If the key is not found, the return value is `Ok(None)`.

**`del` Operation**

* The list of keys is passed as `&[String]`.

**Set Operations**

* List arguments are passed as `&[String]` and returned as `Vec<String>`.

**`execute` Operation**

* The arguments and results are enums, representing integers, binary payloads, and (for results) status and nil values.

You can find a complete Rust code example for using outbound Redis from an HTTP component in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/rust-outbound-redis). Please also see this, related, [outbound Redis (using Rust) section](./rust-components#storing-data-in-redis-from-rust-components). 

{{ blockEnd }}

{{ startTab "TypeScript"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/spin-js-sdk/)

Redis functions are available on [the `Redis` object](https://fermyon.github.io/spin-js-sdk/variables/Redis.html). The function names match the operations above, but you must pass the Redis instance address to _each_ operation as its first parameter. For example:

```javascript
import {Redis} from "@fermyon/spin-sdk"

const value = Redis.get(address, key);
```

**General Notes**

* The `spinSdk` object is always available at runtime. Code checking and completion are available in TypeScript at design time if the module imports anything from the `@fermyon/spin-sdk` package.
* Address and key parameters are strings.
* Bytes parameters and return values are buffers (TypeScript `ArrayBuffer`).
* Lists are passed and returned as arrays.
* If a Spin SDK function fails, it throws an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

**`execute` Operation**

* The arguments and results can be either numbers or buffers. (In TypeScript they are union types, e.g. `BigInt | ArrayBuffer`.)

You can find a complete TypeScript example for using outbound Redis from an HTTP component in the [JavaScript SDK repository on GitHub](https://github.com/fermyon/spin-js-sdk/tree/main/examples/typescript/outbound_redis). Please also see this, related, [outbound Redis (using TypeScript) section](./javascript-components#storing-data-in-redis-from-jsts-components).

{{ blockEnd }}

{{ startTab "Python"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/spin-python-sdk/spin_redis.html)

Redis functions are available in [the `spin_redis` module](https://fermyon.github.io/spin-python-sdk/spin_redis.html). The function names are prefixed `redis_`. You must pass the Redis instance address to _each_ operation as its first parameter. For example:

```python
from spin_redis import redis_get

value = redis_get(address, key)
```

**General Notes**

* Address and key parameters are strings (`str`).
* Bytes parameters and return values are `bytes`. (You can pass literal strings using the `b` prefix, e.g. `redis_set(address, key, b"hello")`.)
* Numeric return values are of type `int64`.
* Lists are passed and returned as Python lists.
* Errors are signalled through exceptions.

You can find a complete Python code example for using outbound Redis from an HTTP component in the [Python SDK repository on GitHub](https://github.com/fermyon/spin-python-sdk/tree/main/examples/outbound_redis). Please also see this, related, [outbound Redis (using Python) section](./python-components#an-outbound-redis-example).

{{ blockEnd }}

{{ startTab "TinyGo"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2@v2.0.0/redis)

Redis functions are available in the `github.com/fermyon/spin/sdk/go/v2/redis` package. [See Go Packages for reference documentation.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2/redis) The function names are TitleCased. For example:

```go
import (
	"github.com/fermyon/spin/sdk/go/v2/redis"
)

rdb := redis.NewClient(addr)
payload, err := rdb.Get(key)
```

**General Notes**

* Key parameters are strings.
* Bytes parameters are byte slices (`[]byte`).
* Lists are passed as slices. For example, `redis.Del` takes the keys to delete as a `[]string`.
* Errors are return through the usual Go multiple return values mechanism.

**`execute` Operation**

* The arguments are passed as `[]redis.RedisParameter`. You can construct `RedisParameter` instances around an `interface{}` but must provide a `Kind`. For example, `hello := redis.RedisParameter{Kind: redis.RedisParameterKindBinary, Val: []byte("hello")}`.
* The results are returned as `[]redis.Result`. You can use the `Kind` member of `redis.Result` to interpret the `Val`.

You can find a complete TinyGo example for using outbound Redis from an HTTP component in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/tinygo-outbound-redis). Please also see this, related, [outbound Redis (using TinyGo) section](./go-components#storing-data-in-redis-from-go-components). 

{{ blockEnd }}

{{ blockEnd }}

## Granting Network Permissions to Components

By default, Spin components are not allowed to make outgoing network requests, including Redis. This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing. To grant a component permission to make network requests to a particular host, use the `allowed_outbound_hosts` field in the component manifest, specifying the host and allowed port:

```toml
[component.uses-redis]
allowed_outbound_hosts = ["redis://redis.example.com:6379"]
```
