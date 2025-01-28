title = "Long-Running Jobs over HTTP"
template = "render_hub_content_body"
date = "2024-04-11T06:55:00Z"
content-type = "text/plain"
tags = ["patterns", "rust", "mqtt", "http"]

[extra]
author = "Thorsten Hans"
type = "hub_document"
category = "Pattern"
language = "Rust"
created_at = "2024-04-11T06:55:00Z"
last_updated = "2024-04-11T06:55:00Z"
spin_version = ">=v2.4.2"
summary = "This sample illustrates how to offload time-intense computing from an HTTP API to a background app using MQTT"
url = "https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/long-running-jobs-over-http"
keywords = "Patterns, MQTT, HTTP, Rust"

---

This sample demonstrates how you can add support for long-running jobs over HTTP using Spin and its `MQTT` capabilities.

### What are Long-Running Jobs over HTTP

In some situations you may want to perform data processing which takes longer than usual HTTP requests and could result in users facing timeouts. By using the `MQTT` capabilities provided by Spin, you can move the time-consuming actions (or jobs) to a different (background) process.

For demonstration purposes, this application uses [Eclipse Mosquitto](https://mosquitto.org/) as a message broker to offload time-consuming tasks from the [`API`](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/long-running-jobs-over-http/api) app to either the [`Spin Worker`](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/long-running-jobs-over-http/spin-worker) or the [`Native Worker`](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/long-running-jobs-over-http/native-worker). Upon creating a new job, a unique identifier for the job is created and used to track its status and report back to the callee (using response payload and the response `Location` header).

The API and both workers track the state of the jobs using a SQLite database.
