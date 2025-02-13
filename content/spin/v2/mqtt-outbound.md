title = "MQTT Messaging"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/mqtt-outbound.md"

---
- [Sending MQTT Messages From Applications](#sending-mqtt-messages-from-applications)
- [Granting Network Permissions to Components](#granting-network-permissions-to-components)
  - [Configuration-Based Permissions](#configuration-based-permissions)
- [Known Issues](#known-issues)

Spin provides an experimental interface for you to send messages using the MQTT protocol.

{{ details "Why do I need a Spin interface? Why can't I just use my language's MQTT library?" "Few MQTT libraries have been updated to work over the WASI 0.2 sockets interface. The Spin interface means Wasm modules can bypass this limitation by asking Spin to make the MQTT connection on their behalf." }}

> Want to receive MQTT messages?  Use [the MQTT trigger](https://github.com/spinkube/spin-trigger-mqtt) to handle messages in your Spin application.

## Sending MQTT Messages From Applications

The Spin SDK surfaces the Spin MQTT interface to your language. The set of operations defined in Spin's API is as follows:

| Operation    | Parameters          | Returns | Behavior |
|--------------|---------------------|---------|----------|
| `open`       | address, username, password, keep-alive | connection resource | Opens a connection to the specified MQTT server. The host must be listed in `allowed_outbound_hosts`. Other operations must be called through a connection. |
| `publish`    | topic, payload, QoS | -       | Publishes the payload (a binary blob) as a message to the specified topic. |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://docs.rs/spin-sdk/latest/spin_sdk/mqtt/index.html)

MQTT functions are available in the `spin_sdk::mqtt` module.

To access an MQTT server, use the `Connection::open` function.

```rust
let connection = spin_sdk::mqtt::Connection::open(&address, &username, &password, keep_alive_secs)?;
```

You can then call the `Connection::publish` function to send MQTT messages:

```rust
let cat_picture: Vec<u8> = request.body().to_vec();
connection.publish("pets", &cat_picture, spin_sdk::mqtt::Qos::AtLeastOnce)?;
```

For full details of the MQTT API, see the [Spin SDK reference documentation](https://docs.rs/spin-sdk/latest/spin_sdk/mqtt/index.html);

You can find a complete Rust code example for using outbound MQTT from an HTTP component in the [Spin Rust SDK repository on GitHub](https://github.com/spinframework/spin-rust-sdk/tree/main/examples/mqtt-outbound).

{{ blockEnd }}

{{ startTab "TypeScript"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://spinframework.github.io/spin-js-sdk/modules/Mqtt.html)

To access an MQTT server, use the `Mqtt.open` function.

```ts
let connection = Mqtt.open(address, username, password, keepAliveSecs);
```

You can then call the `publish` method on the connection to send MQTT messages:

```ts
let catPicture = new Uint8Array(await req.arraybuffer());
connection.publish("pets", catPicture, QoS.AtleastOnce);
```

For full details of the MQTT API, see the [Spin SDK reference documentation](https://spinframework.github.io/spin-js-sdk/modules/Mqtt.html)

You can find a complete Rust code example for using outbound MQTT from an HTTP component in the [Spin Rust SDK repository on GitHub](https://github.com/spinframework/spin-js-sdk/tree/sdk-v2/examples/spin-host-apis/spin-mqtt).

{{ blockEnd }}

{{ startTab "Python"}}

MQTT is not available in the current version of the Python SDK.

{{ blockEnd }}

{{ startTab "TinyGo"}}

MQTT is not available in the current version of the Go SDK.

{{ blockEnd }}

{{ blockEnd }}

## Granting Network Permissions to Components

By default, Spin components are not allowed to make outgoing network requests, including MQTT. This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing. To grant a component permission to make network requests to a particular host, use the `allowed_outbound_hosts` field in the component manifest, specifying the host and allowed port:

```toml
[component.uses-mqtt]
allowed_outbound_hosts = ["mqtt://messaging.example.com:1883"]
```

### Configuration-Based Permissions

You can use [application variables](./variables.md#adding-variables-to-your-applications) in the `allowed_outbound_hosts` field. However, this feature is not yet available on Fermyon Cloud.

## Known Issues

The MQTT API is experimental and subject to change.  The following issues are known:

* The MQTT sender interface in the current version of Spin is known to occasionally drop errors, especially if under load. A fix is in progress.
