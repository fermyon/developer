title = "The Spin MQTT Trigger (Community)"
template = "spin_main"
date = "2025-01-09T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/community-mqtt-trigger.md"

---

- [Installing the MQTT Trigger](#installing-the-mqtt-trigger)
  - [Installing the MQTT Trigger Plugin](#installing-the-mqtt-trigger-plugin)
  - [Installing the MQTT Trigger Template](#installing-the-mqtt-trigger-template)
- [Creating the Application](#creating-the-application)
  - [Configuring the MQTT Connection](#configuring-the-mqtt-connection)
  - [Inspecting the Source Code](#inspecting-the-source-code)
- [Building and Running the Application](#building-and-running-the-application)
- [Additional Spin Triggers](#additional-spin-triggers)
  - [Common Triggers](#common-triggers)
  - [Community Triggers](#community-triggers)


Spin has experimental support for creating and running components for MQTT messages. Please note that there are only working MQTT Trigger app samples written in [Rust](https://github.com/spinkube/spin-trigger-mqtt/tree/main/examples/mqtt-app) at present.

> Please note: You can not `spin deploy` an application to Fermyon Cloud if it uses `mqtt` because non-HTTP triggers are not supported in Fermyon Cloud.

Let's look at how the [experimental MQTT trigger for Spin](https://github.com/spinkube/spin-trigger-mqtt) allows you to deploy an application that runs for every message received via MQTT. A MQTT trigger maps a configurable MQTT service to a specific component. For example:

<!-- @nocpy -->

```toml
[application.trigger.mqtt]
address = "mqtt://localhost:1883"
username = "user"
password = "password"
keep_alive_interval = "30"

[[trigger.mqtt]]
id = "mqtt-01"
component = "hello"
topic = "topic-one"
qos = "1"
```

> Note: A single Spin App could consist of multiple MQTT triggers invoking different components for individual topics, as shown in the next snippet

```toml
[application.trigger.mqtt]
address = "mqtt://localhost:1883"
username = "user"
password = "password"
keep_alive_interval = "30"

[[trigger.mqtt]]
id = "mqtt-01"
component = "hello-one"
topic = "topic-one"
qos = "1"

[[trigger.mqtt]]
id = "mqtt-02"
component = "hello-two"
topic = "topic-two"
qos = "1"
```

In the snippet above, you can see that different components are instantiated and invoked for messages appearing in topics `topic-one` and `topic-two`.


## Installing the MQTT Trigger

### Installing the MQTT Trigger Plugin

First, we install the plugin:

```bash
spin plugin install --url https://github.com/spinkube/spin-trigger-mqtt/releases/download/canary/trigger-mqtt.json --yes
```

### Installing the MQTT Trigger Template

Then, we install the template:

```bash
spin templates install --git https://github.com/spinkube/spin-trigger-mqtt --upgrade
```

## Creating the Application

With the plugin and template installed, we create a new application:

```bash
spin new -t mqtt-rust hello --accept-defaults
```

As part of creating the new application, `spin` CLI will ask for the desired topic name. When asked, provide your topic name and confirm with `[ENTER]`. 

### Configuring the MQTT Connection

The template will generate a Spin Application Manifest (`spin.toml`) for you. Configure the required settings under `[application.mqtt.trigger]` according to your needs. By default, the following configuration will be generated:

```toml
[application.trigger.mqtt]
address = "mqtt://localhost:1883"
username = ""
password = ""
keep_alive_interval = "30"
```

### Inspecting the Source Code

The Rust source code for this application is as follows:

```Rust
use chrono::{DateTime, Utc};
use spin_mqtt_sdk::{mqtt_component, Metadata, Payload};

#[mqtt_component]
async fn handle_message(message: Payload, metadata: Metadata) -> anyhow::Result<()> {
    let datetime: DateTime<Utc> = std::time::SystemTime::now().into();
    let formatted_time = datetime.format("%Y-%m-%d %H:%M:%S").to_string();

    println!(
        "{:?} Message received by wasm component: '{}'",
        formatted_time,
        String::from_utf8_lossy(&message)
    );
    Ok(())
}
```

## Building and Running the Application

We can immediately run this pre-written (template) application and observe the execution:

```bash
cd hello
spin build --up

Building component hello with `cargo build --target wasm32-wasi --release`

...

Finished building all Spin components
2025-01-09 15:59:13 Message received by wasm component: 'Hello'
2025-01-09 15:59:14 Message received by wasm component: 'Fermyon'
2025-01-09 15:59:18 Message received by wasm component: 'Friends'
```

As we can see from the above output, our application is now running and executing the function every message appearing in the specified topic of the MQTT service.

If you would like to learn more about using the Spin MQTT Trigger, please check out the [Spin MQTT Trigger GitHub repository](https://github.com/spinkube/spin-trigger-mqtt).

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
