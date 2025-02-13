title = "Spin Cron Trigger"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/plain"
tags = ["trigger", "rust", "plugins"]

[extra]
author = "fermyon"
type = "hub_document"
category = "Plugin"
language = "Rust"
created_at = "2023-12-05T00:22:56Z"
last_updated = "2023-12-05T00:22:56Z"
spin_version = ">=v2.0.1"
summary = "An experimental cron trigger for Spin apps"
url = "https://github.com/spinframework/spin-trigger-cron"
keywords = "trigger, cron"

---

An experimental plugin that enables cron trigger for Spin applications.

## Installing Plugin

You can install the plugin using the following command:

```bash
spin plugins install --url https://github.com/spinframework/spin-trigger-cron/releases/download/canary/trigger-cron.json
```

## Installing Template

You can install the template using the following command:

```bash
spin templates install --git https://github.com/spinframework/spin-trigger-cron
```

Once the template is installed, you can create a new application using:

```bash
spin new -t cron-rust hello_cron --accept-defaults
```

To run the newly created app:

```bash
cd hello_cron
spin build --up
```

### Configuring the Cron Trigger

The trigger type is `cron` and there are no application-level configuration options.

The following options are available to set in the [[trigger.cron]] section:

| Name                  | Type             | Required? | Description |
|-----------------------|------------------|-----------|-------------|
| `component`           | string or table  | required  | The component to run on the schedule given in `cron_expression`. (This is the standard Spin trigger component field.) |
| `cron_expression`     | string           | required  | The `cron` expression describing the schedule on which to execute the component. |

```toml
[[trigger.cron]]
component = "<your-component-name>"
cron_expression = "1/2 * * * * *"
```
