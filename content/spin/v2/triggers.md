title = "Triggers"
template = "spin_main"
date = "2023-11-02T01:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/triggers.md"

---
- [Triggers and Components](#triggers-and-components)
  - [Mapping a Trigger to a Named Component](#mapping-a-trigger-to-a-named-component)
  - [Writing the Component Inside the Trigger](#writing-the-component-inside-the-trigger)
  - [Choosing Between the Approaches](#choosing-between-the-approaches)

A Spin _trigger_ maps an event, such as an HTTP request or a Redis pub-sub message, to a component that handles that event.

An application can contain multiple triggers, but they must all be the same type. For example, an application can contain triggers for multiple HTTP routes, or for multiple Redis pub-sub channels, but can't contain both an HTTP _and_ a Redis trigger.

> If you're familiar with Spin 1.x, note that Spin 2 uses the term "trigger" to refer to each individual route or channel, rather than the trigger type. It's closer to the `[component.trigger]` usage than to the application trigger.

## Triggers and Components

How events are specified depends on the type of trigger involved. For example, an [HTTP trigger](./http-trigger.md) is specified by the route it handles; a [Redis trigger](./redis-trigger.md) is specified by the channel it monitors. A trigger always, however, has a `component` field, specifying the component that handles matching events.  The `component` can be specified in two ways.

### Mapping a Trigger to a Named Component

An application manifest can define _named_ components in the `component` section. Each component is a WebAssembly component file (or reference) plus the supporting resources it needs, and metadata such as build information. The component name is written as part of the TOML `component` declaration. For example:

```toml
[component.checkout]  # The component's name is "checkout"
source = "target/wasm32-wasi/release/checkout.wasm"
allowed_http_hosts = ["payment-processing.example.com"]
key_value_stores = ["default"]
[component.checkout.build]
command = "cargo build --target wasm32-wasi --release"
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
source = "target/wasm32-wasi/release/checkout.wasm"
allowed_http_hosts = ["payment-processing.example.com"]
```

These behave in the same way: the inline table syntax is more compact for short declarations, but the nested table syntax is easier to read when there are many fields or the values are long.

### Choosing Between the Approaches

These ways of writing components achieve the same thing, so which should you choose?

Named components have the following advantages:

* Reuse. If you want two triggers to behave in the same way, they can refer to the same named component. Remember this means they are not just handled by the same Wasm file, but with the same settings.
* Named. If an error occurs, Spin can tell your the name of the component where the error happened. With inline components, Spin has to synthesize a name. This isn't a big deal in single-component apps, but make diagnostics harder in larger apps.

Inline components have the following advantages:

* Compact, especially when using inline table syntax.
* One place to look. Both the trigger event and the handling details are always in the same piece of TOML.

If you are not sure, or are not experienced, we recommend using named components at first, and adopting inline components as and when you find cases where you prefer them.
