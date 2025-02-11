title = "The Spin Cron Trigger"
template = "spin_main"
date = "2025-01-09T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/cron-trigger.md"

---

- [Cron Trigger Expressions](#cron-trigger-expressions)
- [Installing the Cron Trigger](#installing-the-cron-trigger)
  - [Installing the Cron Trigger Plugin](#installing-the-cron-trigger-plugin)
  - [Installing the Cron Trigger Template](#installing-the-cron-trigger-template)
- [Creating the Application](#creating-the-application)
  - [Inspecting the Source Code](#inspecting-the-source-code)
- [Building and Running the Application](#building-and-running-the-application)
- [Additional Spin Triggers](#additional-spin-triggers)
  - [Common Triggers](#common-triggers)
  - [Community Triggers](#community-triggers)


Spin has experimental support for creating and running components on a schedule. Please note that there are only working Cron Trigger app samples written in [Rust](https://github.com/fermyon/spin-trigger-cron/tree/main/guest-rust) and [Python](https://github.com/fermyon/spin-trigger-cron/tree/main/guest-python) at present.

> Please note: You can not `spin deploy` an application to Fermyon Cloud if it uses `cron` because non-HTTP triggers are not supported in Fermyon Cloud.

Let's look at how the [experimental Cron trigger for Spin](https://github.com/fermyon/spin-trigger-cron) allows you to deploy an application that runs on a schedule. A Cron trigger maps a cron expression (a schedule) to a specific component. For example:

<!-- @nocpy -->

```toml
[[trigger.cron]]
component = "hello-cron"
cron_expression = "1/2 * * * * *"
```

> Note: The 7th field (year) for the `cron_expression` is optional.

## Cron Trigger Expressions

The expression is based on the crontab (cron table) syntax whereby each line is made up of 7 fields that represent the time to execute.

```bash
#  ┌──────────── sec (0–59)
#  |    ┌───────────── min (0–59)
#  |    │  ┌───────────── hour (0–23)
#  |    │  │  ┌───────────── day of month (1–31)
#  |    │  │  │  ┌───────────── month (1–12)
#  |    │  │  │  │  ┌───────────── day of week (0–6)
#  |    │  │  │  │  |  ┌─────────────- year
#  |    │  │  │  │  |  │
#  |    │  │  │  │  |  │
  1/30  *  *  *  *  *  * 
```

> For more information about setting the schedule, please see the [Spin Cron Trigger repository](https://github.com/fermyon/spin-trigger-cron?tab=readme-ov-file#trigger-configuration). 

Let's look at a time-based workload inside a Rust application.

## Installing the Cron Trigger

### Installing the Cron Trigger Plugin

First, we install the plugin:

```bash
spin plugins install --url https://github.com/fermyon/spin-trigger-cron/releases/download/canary/trigger-cron.json
```

### Installing the Cron Trigger Template

Then, we install the template:

```bash
spin templates install --git https://github.com/fermyon/spin-trigger-cron
```

## Creating the Application

With the plugin and template installed, we create a new application:

```bash
spin new -t cron-rust hello_cron --accept-defaults
```

### Inspecting the Source Code

The Rust source code for this application is as follows:

```Rust
use spin_cron_sdk::{cron_component, Error, Metadata};
use spin_sdk::variables;

#[cron_component]
async fn handle_cron_event(metadata: Metadata) -> Result<(), Error> {
    let key = variables::get("something").unwrap_or_default();
    println!(
        "[{}] Hello this is me running every {}",
        metadata.timestamp, key
    );
    Ok(())
}
```

## Building and Running the Application

We can immediately run this pre-written (template) application and observe the time-driven execution:

```bash
cd hello_cron
spin build --up

Building component hello-cron with `cargo build --target wasm32-wasi --release`

...

Finished building all Spin components
[1715640447] Hello from a cron component
[1715640449] Hello from a cron component
[1715640451] Hello from a cron component
[1715640453] Hello from a cron component
[1715640455] Hello from a cron component
[1715640457] Hello from a cron component
```

As we can see from the above output, our application is now running and executing the function every two seconds without the need for any incoming requests or any intervention from users or other machines.

If you would like to learn more about using the Spin Cron Trigger, please check out [the Spin Cron Trigger blog post](https://www.fermyon.com/blog/spin-cron-trigger) and the [Spin Cron Trigger GitHub repository](https://github.com/fermyon/spin-trigger-cron).

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