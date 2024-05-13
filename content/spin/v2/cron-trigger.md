title = "The Spin Cron Trigger"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/cron-trigger.md"

---

Spin has built-in support for creating and running components driven by time. This page covers Spin options that are specific to the Spin Cron Trigger.

The [experimental Cron trigger for Spin](https://github.com/fermyon/spin-trigger-cron) allows you to write and deploy workloads, in a similar fashion to the Cron command-line utility. Let's look at how to set this up and deploy a web application that is driven by time.

## Specifying a Cron Trigger

A Cron trigger maps a cron expression (a schedule) to a component. For example:

<!-- @nocpy -->

```toml
[[trigger.cron]]
component = "hello-cron"
cron_expression = "1/2 * * * * *"
```

## Cron Trigger Expressions

The expression is based on the crontab (cron table) syntax whereby each line is made up of 5 fields that represent the time to execute.

Let's look at a time-based workload inside an application.

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

## Create the Web Application

With the plugin and template installed, we create a new application:

```bash
spin new -t cron-rust hello_cron --accept-defaults
```

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

## Configuring the Cron Schedule

If we open the application manifest (`vi spin.toml`), we will notice the `trigger.cron` section:

```toml
[[trigger.cron]]
component = "hello-cron"
cron_expression = "1/2 * * * * *"
```

As you can see here, the `cron_expression` (describing the schedule on which to execute the component) looks a lot like a line from a crontab (cron table) file. 



