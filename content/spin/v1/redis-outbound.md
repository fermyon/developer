title = "Redis Storage"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical = "https://developer.fermyon.com/spin/v2/redis-outbound"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/redis-outbound.md"

---
- [Using Redis From Applications](#using-redis-from-applications)

Spin provides an interface for you to read and write the Redis key/value store, and to publish Redis pub-sub messages.

{{ details "Why do I need a Spin interface? Why can't I just use my language's Redis library?" "The current version of the WebAssembly System Interface (WASI) doesn't provide a sockets interface, so Redis libraries that depend on sockets can't be built to Wasm. The Spin interface means Wasm modules can bypass this limitation by asking Spin to make the Redis connection on their behalf." }}

## Using Redis From Applications

The Spin SDK surfaces the Spin Redis interface to your language. The set of operations is common across all SDKs:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| Single value operations                      |
| `get`        | address, key        | bytes   | Returns the value of `key`. If the key does not exist, returns a zero-length array. |
| `set`        | address, key, bytes | -       | Sets the value of `key`, overwriting any existing value. |
| `incr`       | address, key        | integer | Increments the value at `key` by 1. If the key does not exist, its value is set to 0 first (and immediately incremented to 1). If the current value isn't an integer, or a string that represents an integer, it errors and the value is not changed. |
| `del`        | address, list of keys | -     | Removes the specified keys. Keys that don't exist are ignored (they do _not_ cause an error). |
| Set value operations                         |
| `sadd`       | address, key, list of strings | integer | Adds the strings to the set of values of `key`, and returns the number of newly added values. If the key does not exist, its value is set to the set of values |
| `smembers`   | address, key        | list of strings | Returns the set of values of `key`. if the key does not exist, this is an empty set. |
| `srem`       | address, key, list of strings | integer | Removes the strings from the set of values of `key`, and returns the number of newly removed values. If the key does not exist, this does nothing. |
| Pub-sub operations                           |
| `publish`    | address, channel, bytes | - | Publishes a message to the specified channel, with the specified payload bytes. |
| General operations                           |
| `execute`    | address, command, list of argument values | list of results | Executes the specified command with the specified arguments. This is a general-purpose 'escape hatch' if you need a command that isn't covered by the built-in operations. |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

Redis functions are available in the `spin_sdk::redis` module. The function names match the operations above. For example:

```rust
use spin_sdk::redis;

let value = redis::get(&address, &key)?;
```

**General Notes**

* Address and key parameters are of type `&str`.
* Bytes parameters are of type `&[u8]` and return values are `Vec<u8>`.
* Numeric return values are of type `i64`.
* All functions wrap the return in `anyhow::Result`.

**`del` Operation**

* The list of keys is passed as `&[&str]`.

**Set Operations**

* List arguments are passed as `&[&str]` and returned as `Vec<String>`.

**`execute` Operation**

* The arguments and results are enums, representing integers, binary payloads, and (for results) status and nil values.

You can find a complete Rust code example for using outbound Redis from an HTTP component in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/rust-outbound-redis). Please also see this, related, [outbound Redis (using Rust) section](./rust-components#storing-data-in-redis-from-rust-components). 

{{ blockEnd }}

{{ startTab "TypeScript"}}

Redis functions are available on the `Redis` object. The function names match the operations above. For example:

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

Redis functions are available in the `spin_redis` module. The function names are prefixed `redis_`. For example:

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

Redis functions are available in the `github.com/fermyon/spin/sdk/go/redis` package. [See Go Packages for reference documentation.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/redis). The function names are TitleCased. For example:

```go
import (
	"github.com/fermyon/spin/sdk/go/redis"
)

payload, err := redis.Get(address, key)
```

**General Notes**

* Address and key parameters are strings.
* Bytes parameters are byte slices (`[]byte`).
* Lists are passed as slices. For example, `redis.Del` takes the keys to delete as a `[]string`.
* Errors are return through the usual Go multiple return values mechanism.

**`execute` Operation**

* The arguments are passed as `[]redis.RedisParameter`. You can construct `RedisParameter` instances around an `interface{}` but must provide a `Kind`. For example, `hello := redis.RedisParameter{Kind: redis.RedisParameterKindBinary, Val: []byte("hello")}`.
* The results are returned as `[]redis.Result`. You can use the `Kind` member of `redis.Result` to interpret the `Val`.

You can find a complete TinyGo example for using outbound Redis from an HTTP component in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/tinygo-outbound-redis). Please also see this, related, [outbound Redis (using TinyGo) section](./go-components#storing-data-in-redis-from-go-components). 

{{ blockEnd }}

{{ blockEnd }}
