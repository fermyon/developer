title = "Key value explorer template"
template = "render_hub_content_body"
date = "2023-07-24T00:22:56Z"
content-type = "text/html"
tags = ["go", "http", "kv"]

[extra]
author = "radu-matei"
type = "hub_document"
category = "Template"
language = "Go"
created_at = "2023-10-15T00:22:56Z"
last_updated = "2023-05-18T00:22:56Z"
spin_version = ">=v1.0"
summary =  "A Spin component for exploring the contents of key/value stores."
url = "https://github.com/fermyon/spin-kv-explorer"
template_id = "kv-explorer"
repo_url = "https://github.com/fermyon/spin-kv-explorer"
keywords = "key-value, kv, explorer"

---

This template enables managing the key value pairs set in any key value store linked to an application.

To keep the contents of your key value store secure, the explorer expects the credentials to access the UI and the API to be stored in the configuration store as variables. Values can be set locally using the [variables provider](../../spin/v2/dynamic-configuration#application-variables-runtime-configuration) or you can skip checking for the credentials on every request by passing the `SPIN_APP_KV_SKIP_AUTH` environment variable. When deploying to cloud, set the `kv_explorer_user` and `kv_explorer_password` variables using the `--variable` flag. These credentials can then be updated at any time using `spin cloud variables set`.

Visit the [GitHub repo](https://github.com/fermyon/spin-kv-explorer) for complete configuration instructions.

## Installation and Use

```sh
spin templates install --upgrade --git https://github.com/fermyon/spin-kv-explorer
```

Use the `spin add` command to add the KV explorer to your application, specifying `kv-explorer` as the component name.
```sh
spin add kv-explorer -t kv-explorer
```
