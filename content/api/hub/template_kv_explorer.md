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
url = "https://github.com/radu-matei/spin-kv-explorer"
keywords = "key-value, kv, explorer"

---

The explorer will use the default store to persist the credentials to access the UI and the API. If no values are set, the first invocation will set a randomly generated pair of username and password under the kv-credentials key, with the value following the user:password format. On the first run, the values will be printed in the logs, and they can be used to log in and change them (creating a new credentials value will override the existing value).

*Known limitations* 
the explorer can only be used with Spin's default key/value store. When this will be configurable, this component will support working with custom stores as well.
