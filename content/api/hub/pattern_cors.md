title = "CORS (Cross-Origin Resource Sharing)"
template = "render_hub_content_body"
date = "2024-04-03T13:50:00Z"
content-type = "text/plain"
tags = ["http", "rust", "patterns"]

[extra]
author = "Thorsten Hans"
type = "hub_document"
category = "Pattern"
language = "Rust"
created_at = "2024-04-03T13:50:00Z"
last_updated = "2024-04-03T13:50:00Z"
spin_version = ">=v2.4.0"
summary = "Illustrates how to implement CORS (Cross-Origin Resource Sharing) in Rust"
url = "https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/cors-rust"
keywords = "Patterns, HTTP, CORS"

---

This Spin App illustrates how to implement CORS (Cross-Origin Resource Sharing) in Rust

### What Is Cross-Origin Resource Sharing (CORS)?

CORS, or Cross-Origin Resource Sharing, is a security mechanism implemented by web browsers to control access to resources located on different domains. As an API developer, understanding CORS is crucial when building web APIs that need to be accessed by client-side scripts from web browsers. CORS prevents a web page from making requests to a different domain than the one that served the page, known as the same-origin policy, unless explicitly permitted. This restriction helps mitigate certain types of cross-site scripting (XSS) attacks.

To enable cross-origin requests, you need to configure their servers to include specific HTTP headers in their responses. These headers, such as `Access-Control-Allow-Origin`, indicate which domains are allowed to access the API's resources. By setting appropriate CORS headers, you can define the level of access permitted, whether it's open to all origins (`*`) or limited to specific domains. Additionally, you should be aware that preflight requests may be sent by the browser for certain types of requests, such as those with custom headers or methods, and they need to handle these preflight requests appropriately to ensure seamless communication between client-side scripts and the API.
