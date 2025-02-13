title = "Check for Update"
template = "render_hub_content_body"
date = "2023-08-24T08:42:56Z"
content-type = "text/plain"
tags = ["cli", "tooling"]

[extra]
author = "ThorstenHans"
type = "hub_document"
category = "Plugin"
language = "Rust"
created_at = "2023-08-23T15:20:00Z"
last_updated = "2023-08-23T15:20:00Z"
spin_version = ">=0.4"
summary = "A plugin to check if your local spin CLI installation is up-to-date"
url = "https://github.com/ThorstenHans/spin-plugin-check-for-update"
keywords = "plugins, tooling, cli, updates"

---

This Spin plugin determines if the local installation of `spin` CLI is up-to-date or not. On invocation, the plugin will request the version number of `spin` (only considering stable releases) and compare it to the version installed locally. If the local installation is outdated, installation instructions will be printed to `stdout`.

## Installation

```bash
spin plugins install --url https://raw.githubusercontent.com/spinframework/spin-plugins/main/manifests/check-for-update/check-for-update.json
```

## Usage

```bash
spin check-for-update

# ⠋⠉ Checking for latest spin CLI version...

# Your spin CLI is up to date (version 1.4.1) ✅
```
