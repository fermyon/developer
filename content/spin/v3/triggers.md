title = "Triggers"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/triggers.md"

---
- [Triggers and Components](#triggers-and-components)
  - [Mapping a Trigger to a Named Component](#mapping-a-trigger-to-a-named-component)
  - [Writing the Component Inside the Trigger](#writing-the-component-inside-the-trigger)
  - [Choosing Between the Approaches](#choosing-between-the-approaches)
  - [Setting Up Multiple Trigger Types](#setting-up-multiple-trigger-types)
- [Available Triggers for Spin](#available-triggers-for-spin)
  - [Common Triggers](#common-triggers)
  - [Community Triggers](#community-triggers)

A Spin _trigger_ maps an event, such as an HTTP request or a Redis pub-sub message, to a component that handles that event.

An application can contain multiple triggers.

In Spin 2.2 and earlier, all triggers must be of the same type.  For example, an application can contain triggers for multiple HTTP routes, or for multiple Redis pub-sub channels, but not both.

In Spin 2.3 and later, an application can contain triggers of different types.  For example, a single application can serve HTTP on one or more routes, and at the same time subscribe to one or more Redis pub-sub channels. 

> If you're familiar with [Spin 1.x](/spin/manifest-reference-v1#the-trigger-table), note that [Spin 2 uses the term "trigger"](/spin/manifest-reference#the-trigger-table) to refer to each individual route or channel, rather than the trigger type. It's closer to the `[component.trigger]` usage than to the application trigger.

## Triggers and Components

How events are specified depends on the type of trigger involved. For example, an [HTTP trigger](./http-trigger.md) is specified by the route it handles. A [Cron Trigger](#spin-cron-trigger) is specified by the schedule on which it runs. A [Redis trigger](./redis-trigger.md) is specified by the channel it monitors. A trigger always, however, has a `component` field, specifying the component that handles matching events.  The `component` can be specified in two ways.

### Mapping a Trigger to a Named Component

An application manifest can define _named_ components in the `component` section. Each component is a WebAssembly component file (or reference) plus the supporting resources it needs, and metadata such as build information. The component name is written as part of the TOML `component` declaration. For example:

```toml
[component.checkout]  # The component's name is "checkout"
source = "target/wasm32-wasip1/release/checkout.wasm"
allowed_outbound_hosts = ["https://payment-processing.example.com"]
key_value_stores = ["default"]
[component.checkout.build]
command = "cargo build --target wasm32-wasip1 --release"
```

To map a trigger to a named component, specify its name in the trigger's `component` field:

```toml
[[trigger.http]]
route = "/cart/checkout"
component = "checkout"
```

### Writing the Component Inside the Trigger

Instead of writing the component in a separate section and referencing it by name, you can write it the same fields _inline_ in the trigger `component` field.  For example:

```toml
# Using inline table syntax
[[trigger.http]]
route = "/cart/..."
component = { source = "dist/cart.wasm" }

# Nested table syntax
[[trigger.http]]
route = "/cart/..."
[trigger.http.component]
source = "target/wasm32-wasip1/release/checkout.wasm"
allowed_outbound_hosts = ["payment-processing.example.com"]
```

These behave in the same way: the inline table syntax is more compact for short declarations, but the nested table syntax is easier to read when there are many fields or the values are long.

### Choosing Between the Approaches

These ways of writing components achieve the same thing, so which should you choose?

Named components have the following advantages:

* Reuse. If you want two triggers to behave in the same way, they can refer to the same named component. Remember this means they are not just handled by the same Wasm file, but with the same settings.
* Named. If an error occurs, Spin can tell you the name of the component where the error happened. With inline components, Spin has to synthesize a name. This isn't a big deal in single-component apps, but makes diagnostics harder in larger apps.

Inline components have the following advantages:

* Compact, especially when using inline table syntax.
* One place to look. Both the trigger event and the handling details are always in the same piece of TOML.

If you are not sure, or are not experienced, we recommend using named components at first, and adopting inline components as and when you find cases where you prefer them.

### Setting Up Multiple Trigger Types

In this section, we build an application that contains multiple triggers.

Here is an example of creating an application with both HTTP and Redis triggers:

<!-- @nocpy -->

```bash
# Start with an empty application
$ spin new -t http-empty multiple-trigger-example
Description: An application that handles both HTTP requests and Redis messages

# Change into to the application directory
$ cd multiple-trigger-example

# Add an HTTP trigger application
$ spin add -t http-rust rust-http-trigger-example
Description: A Rust HTTP example
HTTP path: /...

# Add a Redis trigger application
$ spin add -t redis-rust rust-redis-trigger-example
Description: A Rust redis example
Redis address: redis://localhost:6379
Redis channel: one
```

The above `spin new` and `spin add` commands will scaffold a Spin manifest (`spin.toml` file) with the following triggers:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "multiple-trigger-example"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = "An application that handles both HTTP requests and Redis messages"

[[trigger.http]]
route = "/..."
component = "rust-http-trigger-example"

[component.rust-http-trigger-example]
source = "rust-http-trigger-example/target/wasm32-wasip1/release/rust_http_trigger_example.wasm"
allowed_outbound_hosts = []
[component.rust-http-trigger-example.build]
command = "cargo build --target wasm32-wasip1 --release"
workdir = "rust-http-trigger-example"
watch = ["src/**/*.rs", "Cargo.toml"]

[application.trigger.redis]
address = "redis://localhost:6379"

[[trigger.redis]]
channel = "one"
component = "rust-redis-trigger-example"

[component.rust-redis-trigger-example]
source = "rust-redis-trigger-example/target/wasm32-wasip1/release/rust_redis_trigger_example.wasm"
allowed_outbound_hosts = []
[component.rust-redis-trigger-example.build]
command = "cargo build --target wasm32-wasip1 --release"
workdir = "rust-redis-trigger-example"
watch = ["src/**/*.rs", "Cargo.toml"]                             
```

## Available Triggers for Spin

You can leverage different triggers as part of your Spin apps to address common requirements and build real-world, distributed applications with Spin.

### Common Triggers

- [HTTP Trigger](./http-trigger.md)
- [Redis Trigger](./redis-trigger.md)
- [Command Trigger](./command-trigger.md)
- [Cron Trigger](./cron-trigger.md)
- [SQS Trigger](./sqs-trigger.md)

### Community Triggers

The incredible Spin and [SpinKube](https://spinkube.dev) community, also provides the following additional Spin triggers:

- [Kinesis Trigger](./community-kinesis-trigger.md)
- [MQTT Trigger](./community-mqtt-trigger.md)