title = "Spin Cron Trigger"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/plain"
tags = ["trigger", "rust"]

[extra]
author = "Fermyon"
type = "hub_document"
category = "Plugin"
language = "Rust"
created_at = "2023-12-05T00:22:56Z"
last_updated = "2023-12-05T00:22:56Z"
spin_version = “>=v2.0.1"
summary = "An experimental cron trigger for Spin apps"
url = "https://github.com/fermyon/spin-trigger-cron"
keywords = "trigger, cron"

---

An experimental plugin that enables cron trigger for Spin applications. 

### Prerequisites
* [Rust](https://www.rust-lang.org/tools/install)
* `pluginify` plugin (see below)

```bash
spin plugins install --url https://github.com/itowlson/spin-pluginify/releases/download/canary/pluginify.json
```

### Creating Spin App With Cron Trigger

After creating a Spin application and moving into the directory, add `cron_expression` as your desired trigger type in your application manifest and then specify the component you would like to handle that event on a seperate line. `cron_expression` follows standard cron syntax. The example below is triggered every 2 seconds).

```toml
[[trigger.cron]]
component = "<your-component-name>"
cron_expression = "1/2 * * * * *"
```
