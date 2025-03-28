title = "Limit Access"
template = "render_hub_content_body"
date = "2025-01-20T00:00:00Z"
content-type = "text/plain"
tags = ["http", "typescript"]

[extra]
author = "Fermyon"
type = "hub_document"
category = "Sample"
language = "JS/TS"
created_at = "2025-01-20T00:00:00Z"
last_updated = "2025-01-20T00:00:00Z"
spin_version = ">=v3.1.0"
summary = "Shows how to limit access to an origin server."
url = "https://github.com/fermyon/fwf-examples/tree/main/samples/limit-access"
keywords = "TypeScript, HTTP"

---

This sample application shows how to limit access to a given origin until a configuration point in time.
Before that point in time, the Spin application responds to all requests with a configurable status code;
after it, the Spin application acts as a transparent proxy.

## Prerequisites

You need the following tools on your machine, to build, run and deploy the application to _Fermyon Wasm Functions_:

- The `spin` CLI
- A recent version of `npm`
- The `aka` plugin for `spin` CLI
- Access to _Fermyon Wasm Functions_
