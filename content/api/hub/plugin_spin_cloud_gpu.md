title = "Spin Cloud GPU Plugin"
template = "render_hub_content_body"
date = "2023-10-22T00:22:56Z"
content-type = "text/html"
tags = ["serverless_ai", "gpu", "inferencing", "embedding"]

[extra]
author = "fermyon"
type = "hub_document"
category = "Plugin"
language = ""
created_at = "2023-10-20T00:22:56Z"
last_updated = "2023-10-20T00:22:56Z"
spin_version = ">=1.5"
summary =  "A plugin to connect local Spin apps to Fermyon Cloud GPUs"
url = "https://github.com/fermyon/spin-cloud-gpu"

---

Ever tested your AI-powered Spin app locally and spent quite a while waiting for your machine's compute to kick in...? Us too! The spin-cloud-gpu plugin allows you to use GPUs on Fermyon Cloud while running your Spin app locally with `spin up`.

## Installation

```bash
spin plugins install -u https://github.com/fermyon/spin-cloud-gpu/releases/download/canary/cloud-gpu.json -y
```

For usage information, check out the source in [GitHub](https://github.com/fermyon/spin-cloud-gpu).