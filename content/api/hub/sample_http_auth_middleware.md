title = "HTTP Auth Middleware"
template = "render_hub_content_body"
date = "2023-11-03T00:00:00Z"
content-type = "text/html"
tags = ["rust", "authentication", "http"]

[extra]
author = "fermyon"
type = "hub_document"
category = "Sample"
language = “Rust"
created_at = "2023-11-03T00:00:00Z"
last_updated = "2023-11-07T00:00:00Z"
spin_version = ">=v2.0"
summary =  "Example of how to compose a middleware component with a business logic component"
url = "https://github.com/fermyon/http-auth-middleware"
keywords = "rust, http, auth"

---

This sample shows how to compose a middleware component with a business logic component using [Spin 2.0](https://www.fermyon.com/blog/introducing-spin-v2) and the Component Model. 

## Instructions

### Install Prerequisites
* Install [`cargo component`](https://github.com/bytecodealliance/cargo-component):

```bash
cargo install --git https://github.com/bytecodealliance/cargo-component cargo-component
```

* Install a fork of [wasm-tools](https://github.com/dicej/wasm-tools/tree/wasm-compose-resource-imports):

```bash
cargo install --git https://github.com/dicej/wasm-tools --branch wasm-compose-resource-imports wasm-tools --locked
```

* Install latest [Spin](https://developer.fermyon.com/spin/v2/install)
* Create an OAuth App in your [GitHub Developer Settings](https://github.com/settings/developers). 
  * Set the callback URL to `http://127.0.0.1:3000/login/callback`. 
  * Accept defaults and input dummy values for the rest of the fields.
  * Save the Client ID
  * Generate a new Client Secret and save that as well

### Build And Run The Spin App

```bash
# Build the middleware
cargo component build --manifest-path github-oauth/Cargo.toml --release

# Build and run the example
spin up --build -f example -e CLIENT_ID=<YOUR_GITHUB_APP_CLIENT_ID> -e CLIENT_SECRET=<YOUR_GITHUB_APP_CLIENT_SECRET>

# Open http://127.0.0.1:3000/login in a browser

# Deploy to Fermyon Cloud
spin cloud deploy
```

## Running with Wasmtime

Please visit the [G]itHub repository](https://github.com/fermyon/http-auth-middleware#running-with-wasmtime) for detailed instructions on how to run with Wasmtime. 
