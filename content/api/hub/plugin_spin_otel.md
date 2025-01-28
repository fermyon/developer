title = "Spin OTel"
template = "render_hub_content_body"
date = "2024-08-16T00:22:56Z"
content-type = "text/plain"
tags = ["open telemetry", "observability"]

[extra]
author = "fermyon"
type = "hub_document"
category = "Plugin"
language = "Go"
created_at = "2024-08-16T00:22:56Z"
last_updated = "2024-08-16T00:22:56Z"
spin_version = ">=v2.5.0"
summary =  "A plugin that makes it easy to use OTel with Spin"
url = "https://github.com/fermyon/otel-plugin"
keywords = "traces,metrics,logs,logging,telemetry,open telemetry,opentelemetry"

---

Spin applications have the ability to export metrics and trace data. This plugin provides dashboards for viewing the data.

## Requirements

This plugin relies on third-party software to work properly. Please be sure you have the following installed before continuing:

- Latest version of [Docker](https://www.docker.com/products/docker-desktop)

## Installation

The trigger is installed as a Spin plugin. It can be installed from a release or build.

### Install the latest version of the plugin

The latest stable release of the command trigger plugin can be installed like so:

```sh
spin plugins update
spin plugin install otel
```

### Install the canary version of the plugin

The canary release of the command trigger plugin represents the most recent commits on `main` and may not be stable, with some features still in progress.

```sh
spin plugins install --url https://github.com/fermyon/otel-plugin/releases/download/canary/otel.json
```

## Usage

Once the plugin is installed, you can try the below commands:

### Set up the dashboards

```sh
spin otel setup
```

### Run a Spin app that exports telemetry data

```sh
spin otel up
```

Any flags that work with the `spin up` command, will work with the `spin otel up` command.

```sh
spin otel up -- --help
```

### Open the dashboards in the default browser

Dashboard for viewing metrics and logs:

```sh
spin otel open grafana
```

Dashboard for viewing trace data:

```sh
spin otel open jaeger
```

Dashboard for querying and viewing metrics:

```sh
spin otel open prometheus
```

### Terminate the dashboards

```sh
spin otel cleanup
```
