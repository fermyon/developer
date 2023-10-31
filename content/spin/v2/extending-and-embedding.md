title = "Extending and Embedding Spin"
template = "spin_main"
date = "2023-11-02T16:00:00Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/extending-and-embedding.md"

---
- [Extending Spin with a Custom Trigger](#extending-spin-with-a-custom-trigger)
  - [Implement the Trigger World](#implement-the-trigger-world)
  - [The Trigger Implements the `TriggerExecutor` Trait](#the-trigger-implements-the-triggerexecutor-trait)
  - [The Trigger is an Executable](#the-trigger-is-an-executable)
  - [The Trigger Detects Events...](#the-trigger-detects-events)
  - [...and Invokes the Guest](#and-invokes-the-guest)
- [Other Ways to Extend and Use Spin](#other-ways-to-extend-and-use-spin)

## Extending Spin with a Custom Trigger

> The complete example for a custom trigger [can be found on GitHub](https://github.com/fermyon/spin/tree/main/examples/spin-timer).

Spin currently implements triggers and application models for:

- [HTTP applications](./http-trigger.md) that are triggered by incoming HTTP
requests, and that return an HTTP response
- [Redis applications](./redis-trigger.md) that are triggered by messages on Redis
channels

The Spin internals and execution context (the part of Spin executing
components) are agnostic of the event source and application model.
In this document, we will explore how to extend Spin with custom event sources
(triggers) and application models built on top of the WebAssembly component
model, as well as how to embed Spin in your application.

In this article, we will build a Spin trigger to run the applications based on a
timer, executing Spin components at a configured time interval.

> Custom triggers are an experimental feature. The trigger APIs are not stabilized, and you may need to tweak your trigger code as you update to new Spin versions.

Application entry points are defined using
[WebAssembly Interface (WIT)](https://component-model.bytecodealliance.org/design/wit.html). Here's the entry point for HTTP triggers:

<!-- @nocpy -->

```fsharp
interface incoming-handler {
  use types.{incoming-request, response-outparam}

  handle: func(
    request: incoming-request,
    response-out: response-outparam
  )
}
```

The entry point we want to execute for our timer trigger takes no input and doesn't return anything. This is purposefully chosen
to be a simple function signature. For simplicity, we allow guest code to use Spin's [application variables API](./variables.md) but not other Spin APIs.

> Custom trigger guest code can't currently use the Spin SDK and must refer to the Spin WITs directly.

Here is the resulting timer WIT:

<!-- @nocpy -->

```fsharp
// examples/spin-timer/spin-timer.wit
package fermyon:example

world spin-timer {
  import fermyon:spin/variables@2.0.0
  export handle-timer-request: func()
}
```

`handle-timer-request` is the function that all components executed by the timer trigger must
implement, and which is used by the timer executor when instantiating and
invoking the component.

The timer trigger itself is a Spin plugin whose name is `trigger-timer`. The first part must be `trigger` and the second part is the trigger type.

You can see the full timer trigger code at the link above but here are some key features.

### Implement the Trigger World

The timer trigger implements the WIT world described in `spin-timer.wit`. To do that, it uses the [Bytecode Alliance `wit-bindgen` project](https://github.com/bytecodealliance/wit-bindgen) — this generates code that allows the trigger to invoke the guest's entry point, and allows the guest to invoke the Spin APIs available in the world.

<!-- @nocpy -->

```rust
// examples/spin-timer/src/main.rs
wasmtime::component::bindgen!({
    path: ".",
    world: "spin-timer",
    async: true
});
```

### The Trigger Implements the `TriggerExecutor` Trait

Using `TriggerExecutor` allows the trigger to offload a great deal of boilerplate loader work to `spin_trigger::TriggerExecutorCommand`.

```rust
struct TimerTrigger {
    engine: TriggerAppEngine<Self>,
    speedup: u64,
    component_timings: HashMap<String, u64>,
}

#[async_trait]
impl TriggerExecutor for TimerTrigger {
    // ...
}
```

### The Trigger is an Executable

A trigger is a separate program, so that it can be installed as a plugin. So it is a Rust `bin` project and has a `main` function. It can be useful to also provide a library crate, so that projects that embed Spin can load it in process if desired, but the timer sample doesn't currently show that.

```rust
type Command = TriggerExecutorCommand<TimerTrigger>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let t = Command::parse();
    t.run().await
}
```

### The Trigger Detects Events...

In this case the trigger "detects" events by running a timer. In most cases, the trigger detects events by listening on a socket, completion port, or other mechanism, or by polling a resource such as a directory or an HTTP endpoint.

```rust
for (c, d) in &self.component_timings {
    scope.spawn(async {
        let duration = tokio::time::Duration::from_millis(*d * 1000 / speedup);
        loop {
            tokio::time::sleep(duration).await;
            self.handle_timer_event(c).await.unwrap();
        }
    });
}
```

### ...and Invokes the Guest

The `TriggerExecutorCommand` infrastructure equips the trigger object with a `TriggerAppEngine` specialized to the entry point described in the WIT, and already initialized with the guest Wasm. When an event occurs, the trigger invokes the guest via this engine.

```rust
async fn handle_timer_event(&self, component_id: &str) -> anyhow::Result<()> {
    // Load the guest...
    let (instance, mut store) = self.engine.prepare_instance(component_id).await?;
    let EitherInstance::Component(instance) = instance else {
        unreachable!()
    };
    let instance = SpinTimer::new(&mut store, &instance)?;
    // ...and call the entry point
    instance.call_handle_timer_request(&mut store).await
}
```

## Other Ways to Extend and Use Spin

Besides building custom triggers, the internals of Spin could also be used independently:

- The Spin execution context can be used entirely without a `spin.toml` application manifest — for embedding scenarios, the configuration for the
execution can be constructed without a `spin.toml`, for example by running applications only from a registry.  See [Building a Host for the Spin Runtime](https://www.fermyon.com/blog/building-host-for-spin-runtime) for a simple example.
