title = "Static file server template"
template = "render_hub_content_body"
date = "2023-07-24T00:22:56Z"
content-type = "text/html"
tags = ["rust", "http"]

[extra]
author = "fermyon"
type = "hub_document"
category = "Template"
language = "Rust"
created_at = "2022-10-15T00:22:56Z"
last_updated = "2023-03-14T00:22:56Z"
spin_version = ">v0.1"
summary =  "A Spin template to serve static assets."
url = "https://github.com/fermyon/spin-fileserver"
template_id = "static-fileserver"
repo_url = "https://github.com/fermyon/spin"
keywords = "static websites, fileserver"

---

Using the component as part of a Spin application
Let's have a look at the component definition (from spin.toml):

```toml
[[component]]
source = "spin_static_fs.wasm"
id = "fileserver"
files = [{ source = "", destination = "/" }]
[component.trigger]
route = "/..."
```

This component will recursively mount all files from the current directory and will serve them. If an index.html file is in the source root, it will be served if no file is specified.

Running the static server:

```
$ spin up --listen 127.0.0.1:3000 --file spin.toml
At this point, the component is going to serve all files in the current directory, and this can be tested using curl:

$ curl localhost:3000/LICENSE
                              Apache License
                        Version 2.0, January 2004
                    http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
...
```

_Setting the cache header_
Currently, this file server has a single cache header that it can set through the CACHE_CONTROL environment variable. If no value is set, the default max-age=60 is used instead for all media types.

_Setting the fallback path_
You can configure a FALLBACK_PATH environment variable that points to a file that will be returned instead of the default 404 Not Found response. If no environment value is set, the default behavior is to return a 404 Not Found response. This behavior is useful for Single Page Applications that use view routers on the front-end like React and Vue.

_For more on configuring a component, see: https://spin.fermyon.dev/configuration/_
[[component]]
source = "target/wasm32-wasi/release/spin_static_fs.wasm"
id = "fs"
files = [{ source = "test", destination = "/" }]
environment = { FALLBACK_PATH = "index.html" }
