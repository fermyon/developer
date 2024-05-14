title = "The Spin Cron Trigger"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/cron-trigger.md"

---

Spin has experimental support for creating and running components driven by time. This page covers Spin options that are specific to the Spin Cron Trigger. Please note, that there are only working Cron Trigger app samples written in [Rust](https://github.com/fermyon/spin-trigger-cron/tree/main/guest-rust) and [Python](https://github.com/fermyon/spin-trigger-cron/tree/main/guest-python) at present.

> Please note: You can not `spin deploy` an application to Fermyon Cloud if it uses `cron` because Non-HTTP triggers are not supported in Fermyon Cloud.

Let's look at how the [experimental Cron trigger for Spin](https://github.com/fermyon/spin-trigger-cron) allows you to deploy a web application that is driven by time.

## Specifying a Cron Trigger

A Cron trigger maps a cron expression (a schedule) to a component. For example:

<!-- @nocpy -->

```toml
[[trigger.cron]]
component = "hello-cron"
cron_expression = "1/2 * * * * *"
```

## Cron Trigger Expressions

The expression is based on the crontab (cron table) syntax whereby each line is made up of 5 fields that represent the time to execute. Let's look at a time-based workload inside a Rust application.

## Installing the Cron Trigger Plugin

First, we install the plugin:

```bash
spin plugins install --url https://github.com/fermyon/spin-trigger-cron/releases/download/canary/trigger-cron.json
```

## Installing the Cron Trigger Template

Then, we install the template:

```bash
spin templates install --git https://github.com/fermyon/spin-trigger-cron
```

## Creating the Web Application

With the plugin and template installed, we create a new application:

```bash
spin new -t cron-rust hello_cron --accept-defaults
```

## Inspecting the Source Code

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