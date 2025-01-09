title = "The Spin Command Trigger"
template = "spin_main"
date = "2025-01-09T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/command-trigger.md"

---

- [Installing the Command Trigger](#installing-the-command-trigger)
  - [Installing the Command Trigger Plugin](#installing-the-command-trigger-plugin)
  - [Installing the Command Trigger Template](#installing-the-command-trigger-template)
- [Creating the Application](#creating-the-application)
  - [Inspecting the Source Code](#inspecting-the-source-code)
  - [Building and Running the Application](#building-and-running-the-application)
- [Learn more about the Spin Command Trigger](#learn-more-about-the-spin-command-trigger)
- [Additional Spin Triggers](#additional-spin-triggers)
  - [Common Triggers](#common-triggers)
  - [Community Triggers](#community-triggers)


Spin has experimental support for creating and running components once. Please note that there are only working Command trigger app samples written in [Rust](https://github.com/fermyon/spin-trigger-command/tree/main/examples) at present.

> Please note: You can not `spin deploy` an application to Fermyon Cloud if it uses `command` because non-HTTP triggers are not supported in Fermyon Cloud.

Let's look at how the [experimental Command trigger for Spin](https://github.com/fermyon/spin-trigger-command/) allows you to deploy an application that runs once to completion. The Command trigger specification references a specific component. For example:

<!-- @nocpy -->

```toml
[[trigger.command]]
component = "hello"
```

## Installing the Command Trigger

### Installing the Command Trigger Plugin

First, we install the plugin:

```bash
spin plugins update
spin plugin install trigger-command
```

### Installing the Command Trigger Template

Then, we install the template:

```bash
spin templates install --git https://github.com/fermyon/spin-trigger-command
```

## Creating the Application

With the plugin and template installed, we create a new application:

```bash
spin new -t command-rust hello --accept-defaults
```

### Inspecting the Source Code

The Rust source code for this application is as follows:

```Rust
fn main() {
    println!("Hello, Fermyon!");
}
```

### Building and Running the Application

We can immediately run this pre-written (template) application and observe the time-driven execution:

```bash
cd hello
spin build --up

Building component hello with `cargo build --target wasm32-wasi --release`

...

Finished building all Spin components

Hello, Fermyon!
```

As we can see from the above output, our application is executed once to completion without the need for any incoming requests.

## Learn more about the Spin Command Trigger

<iframe width="560" height="315" src="https://www.youtube.com/embed/l2nh_xpjCiM?si=fBPaiqoIkJPQ95W_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

If you would like to learn more about using the Spin Command Trigger, please check out the [Spin Command Trigger GitHub repository](https://github.com/fermyon/spin-trigger-command/).

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