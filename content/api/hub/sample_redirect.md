title = "Short links and QR codes"
template = "render_hub_content_body"
date = "2023-08-14T00:00:00Z"
content-type = "text/html"
tags = ["rust", "html", "components"]

[extra]
author = "mikkelhegn"
type = "hub_document"
category = "Sample"
language = "Rust"
created_at = "2023-08-14T00:00:00Z"
last_updated = "2023-08-14T00:00:00Z"
spin_version = ">v1.0"
summary =  "A sample of using mulitple components to create an app"
url = "https://github.com/mikkelhegn/redirect"
keywords = "rust, static content, components, html, qr code"

---

A nice little app to create short links and generate QR codes.

The sample has an api, an admin UI (html), a component to redirect, and uses an external component to generate QR codes.

Redirect records are store in the KeyValue store in Spin.

The application is capable of running in Fermyon Cloud.
