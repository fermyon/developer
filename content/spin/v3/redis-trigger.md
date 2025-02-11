title = "The Spin Redis trigger"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/redis-trigger.md"

---
- [Specifying a Redis Trigger](#specifying-a-redis-trigger)
  - [Setting a Default Server](#setting-a-default-server)
- [Redis Trigger Authentication](#redis-trigger-authentication)
- [Redis Components](#redis-components)
  - [The Message Handler](#the-message-handler)
- [Inside Redis Components](#inside-redis-components)
- [Additional Spin Triggers](#additional-spin-triggers)
  - [Common Triggers](#common-triggers)
  - [Community Triggers](#community-triggers)

Pub-sub (publish-subscribe) messaging is a popular architecture for asynchronous message processing. Spin has built-in support to creating and running applications in response to messages on [pub-sub Redis channels](https://redis.io/topics/pubsub).

The Redis trigger in Spin subscribes to messages from a given Redis instance, and dispatches those messages to components for handling.

> This page deals with the Redis trigger for subscribing to pub-sub messages. For information about reading and writing the Redis key-value store, or for publishing messages, see the Language Guides.

> The Redis trigger is not yet available in Fermyon Cloud.

## Specifying a Redis Trigger

A Redis trigger maps a Redis channel to a component. For example:

```toml
[[trigger.redis]]
address = "redis://notifications.example.com:6379" # the Redis instance that the trigger subscribes to (optional - see below)
channel = "messages"          # the channel that the trigger subscribes to
component = "my-application"  # the name of the component to handle this route
```

Such a trigger says that Redis messages on the specified _channel_ should be handled by the specified _component_. The `component` field works the same way across all triggers - see [Triggers](triggers) for the details.

> Spin subscribes only to the channels that are mapped to components. Other channels are ignored. If multiple components subscribe to the same channel, a message on that channel will activate all of the components.

You can use [application variables](./variables.md#adding-variables-to-your-applications) in the `address` and `channel` fields.

### Setting a Default Server

In many applications, all components listen to the same Redis server (on different channels, of course). For this case, it is more convenient to specify the server at the application level instead of on each component. This is done via the `[application.trigger.redis]` section of manifest:

```toml
[application.trigger.redis]
address = "redis://notifications.example.com:6379"
```

> If you create an application from a Redis template, the trigger will be already set up for you.

You can use [application variables](./variables.md#adding-variables-to-your-applications) in the `address` field.

## Redis Trigger Authentication

By default, Spin does not authenticate to Redis. You can work around this by providing a password in the `redis://` URL.  For example: `address = "redis://:p4ssw0rd@localhost:6379"`

> Do not use passwords in code committed to version control systems.

> We plan to offer secrets-based authentication in future versions of Spin.

As mentioned above, you can use [application variables](./variables.md#adding-variables-to-your-applications) in Redis `address` fields. This can be particularly useful for credentials, allowing you to pass credentials in via [variables providers](./dynamic-configuration.md#application-variables-runtime-configuration) rather than including them in `spin.toml`.

## Redis Components

Spin runs Redis components using the [WebAssembly component model](https://component-model.bytecodealliance.org/).  In this model, the Wasm module exports a well-known interface that Spin calls to handle the Redis message.

### The Message Handler

The exact signature of the Redis handler, and how a function is identified to be exported as the handler, will depend on your language.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://docs.rs/spin-sdk/latest/spin_sdk/index.html)

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

In Python, the handler needs to implement the [`InboundRedis`](https://fermyon.github.io/spin-python-sdk/wit/exports/index.html#spin_sdk.wit.exports.InboundRedis) class, and override the `handle_message` method:

```python
from spin_sdk.wit import exports
class InboundRedis(exports.InboundRedis):
    def handle_message(self, message: bytes):
        print(message)
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2@v2.0.0/redis)

In Go, you register the handler as a callback in your program's `init` function.  Call `redis.Handle` (from the Spin SDK `redis` package), passing your handler as the sole argument.  Your handler takes a single byte slice (`[]byte`) argument, and may return an error or `nil`.

> The do-nothing `main` function is required by TinyGo but is not used; the action happens in the `init` function and handler callback.

This example just logs the payload as a string:

```go
package main

import (
	"fmt"

	"github.com/fermyon/spin/sdk/go/v2/redis"
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

The Redis component interface is defined using a WebAssembly Interface (WIT) file.  ([Learn more about the WIT language here.](https://component-model.bytecodealliance.org/design/wit.html)).  You can find the latest WITs for Spin Redis components at [https://github.com/fermyon/spin/tree/main/wit](https://github.com/fermyon/spin/tree/main/wit).

In particular, the entry point for Spin Redis components is defined in [the `inbound-redis` interface](https://github.com/fermyon/spin/blob/main/wit/deps/spin%40unversioned/inbound-redis.wit):

<!-- @nocpy -->

```fsharp
interface inbound-redis {
  use redis-types.{payload, error}

  // The entrypoint for a Redis handler.
  handle-message: func(message: payload) -> result<_, error>
}
```

This is the interface that all Redis components must implement, and
which is used by Spin when instantiating and invoking the component.
However, it is implemented internally by the Spin SDK - you don't need to implement it directly.

## Additional Spin Triggers

You can leverage different triggers as part of your Spin apps to address common requirements and build real-world, distributed applications with Spin.

### Common Triggers

- [HTTP Trigger](./http-trigger.md)
- [Redis Trigger](./redis-trigger.md)
- [Command Trigger](./command-trigger.md)
- [Cron Trigger](./cron-trigger.md)
- [SQS Trigger](./sqs-trigger.md)

### Community Triggers

The incredible Spin and [SpinKube](https://spinkube.dev) community, also provides the following, additional Spin triggers:

- [Kinesis Trigger](./community-kinesis-trigger.md)
- [MQTT Trigger](./community-mqtt-trigger.md)