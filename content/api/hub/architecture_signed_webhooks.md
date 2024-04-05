title = "Signed Webhooks"
template = "render_hub_content_body"
date = "2024-04-03T13:50:00Z"
content-type = "text/plain"
tags = ["webhooks", "rust", "python", "architecture"]

[extra]
author = "Thorsten Hans"
type = "hub_document"
category = "Architecture"
language = "Rust"
created_at = "2024-04-03T13:50:00Z"
last_updated = "2024-04-03T13:50:00Z"
spin_version = ">=v2.4.0"
summary = "An implementation of signed webhooks using the WebAssembly Component Model."
url = "https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/signed-webhooks"
keywords = "Architecture, HTTP, webhooks"

---

This sample demonstrates how to implement signed webhooks by extracting signing and verification logic into a dedicated WebAssembly Component and re-using it from within WebAssembly Components written in different programming languages.

### What Are Signed Webhooks?

Webhooks are automated messages sent from one application to another when a specific event occurs. They enable real-time communication and trigger actions in response to events, eliminating the need for continuous polling.

Signing the payload of webhooks is crucial for ensuring the integrity and authenticity of the data being transmitted between applications. By signing the payload, you can verify that the data received from a webhook hasn't been tampered with during transit and originates from a trusted source. This security measure helps prevent various forms of attacks, such as data tampering or injection, which could potentially compromise the integrity and reliability of the system. 