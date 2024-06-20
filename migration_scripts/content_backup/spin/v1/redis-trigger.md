title = "The Spin Redis trigger"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/redis-trigger"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/redis-trigger.md"

---
- [Specifying an Application as Redis](#specifying-an-application-as-redis)
- [Mapping a Channel to a Component](#mapping-a-channel-to-a-component)
- [Redis Components](#redis-components)
	- [The Message Handler](#the-message-handler)
- [Inside Redis Components](#inside-redis-components)

Pub-sub (publish-subscribe) messaging is a popular architecture for asynchronous message processing. Spin has built-in support to creating and running applications in response to messages on [pub-sub Redis channels](https://redis.io/topics/pubsub).

The Redis trigger in Spin subscribes to messages from a given Redis instance, and dispatches those messages to components for handling.

> This page deals with the Redis trigger for subscribing to pub-sub messages. For information about reading and writing the Redis key-value store, or for publishing messages, see the Language Guides.

## Specifying an Application as Redis

Every Spin application has a trigger specified in the manifest, which declares the type of events it responds to.
For Redis applications, the application trigger has `type = "redis"`:

<!-- @nocpy -->

```toml
# spin.toml
trigger = { type = "redis", address = "redis://localhost:6379" }
```

The Redis trigger also requires an `address` field.  This is the address of the Redis instance to monitor.  Specify it using the `redis:` URL scheme.

> If you create an application from a Redis template, the trigger will be already set up for you.

By default, Spin does not authenticate to Redis. You can work around this by providing a password in the `redis://` URL.  For example: `address = "redis://:p4ssw0rd@localhost:6379"`

> Do not use passwords in code committed to version control systems.

> We plan to offer secrets-based authentication in future versions of Spin.

In addition, each component must have Redis-specific configuration in its `[component.trigger]` table.

## Mapping a Channel to a Component

Each component handles one channel, specified in the `channel` field of the component `trigger` table.  For example, Spin will trigger this component when it receives a message on the `purchaseorders` channel:

<!-- @nocpy -->

```toml
[component.trigger]
channel = "purchaseorders"
```

> Spin subscribes only to the channels that are mapped to components. Other channels are ignored.

## Redis Components

Spin runs Redis components using the [WebAssembly component model](https://github.com/WebAssembly/component-model).  In this model, the Wasm module exports a well-known function that Spin calls to handle the Redis message.

### The Message Handler

The exact signature of the Redis handler, and how a function is identified to be exported as the handler, will depend on your language.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

In Rust, the handler is identified by the `#[spin_sdk::redis_component]` attribute.  It takes a `bytes::Bytes`, representing the raw payload of the Redis message, and returns an `anyhow::Result` indicating success or an error with details.  This example just logs the payload as a string:

```rust
use anyhow::Result;
use bytes::Bytes;
use spin_sdk::redis_component;
use std::str::from_utf8;

/// A simple Spin Redis component.
#[redis_component]
fn on_message(message: Bytes) -> Result<()> {
    println!("{}", from_utf8(&message)?);
    Ok(())
}
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

The JavaScript/TypeScript SDK doesn't currently support Redis components.  Please [let us know](https://github.com/fermyon/spin-js-sdk/issues) if this is important to you.

{{ blockEnd }}

{{ startTab "Python"}}

The Python SDK doesn't currently support Redis components.  Please [let us know](https://github.com/fermyon/spin-python-sdk/issues) if this is important to you.

{{ blockEnd }}

{{ startTab "TinyGo"}}

In Go, you register the handler as a callback in your program's `init` function.  Call `redis.Handle` (from the Spin SDK `redis` package), passing your handler as the sole argument.  Your handler takes a single byte slice (`[]byte`) argument, and may return an error or `nil`.

> The do-nothing `main` function is required by TinyGo but is not used; the action happens in the `init` function and handler callback.

This example just logs the payload as a string:

```go
package main

import (
	"fmt"

	"github.com/fermyon/spin/sdk/go/redis"
)

func init() {
	redis.Handle(func(payload []byte) error {
		fmt.Println(string(payload))
		return nil
	})
}

func main() {}
```

{{ blockEnd }}

{{ blockEnd }}

## Inside Redis Components

For the most part, you'll build Redis component modules using a language SDK (see the Language Guides section), such as a Rust crate or Go package.  If you're interested in what happens inside the SDK, or want to implement Redis components in another language, read on!

> The WebAssembly component model is in its early stages, and over time the triggers and application entry points will undergo changes, both in the definitions of functions and types, and in the binary representations of those definitions and of primitive types (the so-called Application Binary Interface or ABI).  However, Spin ensures binary compatibility over the course of any given major release.  For example, a component built using the Spin 1.0 SDK will work on any version of Spin in the 1.x range.

The Redis component interface is defined using a WebAssembly Interface (WIT) file.  ([Learn more about the evolving WIT standard here.](https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md)).  You can find the latest WITs for Spin Redis components at [https://github.com/fermyon/spin/tree/v1.6/wit/ephemeral](https://github.com/fermyon/spin/tree/v1.6/wit/ephemeral).

The core Redis types are defined in [https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/redis-types.wit](https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/redis-types.wit), though note that not all of these are used in the pub-sub Redis trigger:

<!-- @nocpy -->

```fsharp
// General purpose error.
enum error {
    success,
    error,
}

// The message payload.
type payload = list<u8>

// Remaining types are not used in the trigger
```

> The same Redis types are also used to model the API for sending outbound Redis requests.

The entry point for Spin Redis components is then defined in [https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/spin-redis.wit](https://github.com/fermyon/spin/blob/v1.6/wit/ephemeral/spin-redis.wit):

<!-- @nocpy -->

```fsharp
// wit/ephemeral/spin-redis.wit

use * from redis-types

// The entry point for a Redis handler.
handle-redis-message: func(message: payload) -> expected<unit, error>
```

This is the function signature that all Redis components must implement, and
which is used by Spin when instantiating and invoking the component.

This interface (`spin-redis.wit`) can be directly used together with the
[Bytecode Alliance `wit-bindgen` project](https://github.com/bytecodealliance/wit-bindgen)
to build a component that Spin can invoke.

This is exactly how Spin SDKs, such as the [Rust](rust-components) and [Go](go-components) SDKs, are built.
As more languages add support for the component model, we plan to add support for them in the same way.

> WIT and the ABI are evolving standards.  The latest version of `wit-bindgen` creates binary implementations that do not work with current language implementation of the WebAssembly System Interface (WASI).  Spin remains pinned to an older implementation of `wit-bindgen` until the next generation of the component model stabilizes and achieves language-level support.
