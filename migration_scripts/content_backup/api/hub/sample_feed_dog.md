title = "Dog Feeding Tracker with NFC and iPhone"
template = "render_hub_content_body"
date = "2023-08-30T00:00:00Z"
content-type = "text/html"
tags = ["typescript", "javascript", "key-value"]

[extra]
author = "technosophos"
type = "hub_document"
category = "Sample"
language = "JS/TS"
created_at = "2023-08-30T00:00:00Z"
last_updated = "2023-08-30T00:00:00Z"
spin_version = ">v1.4"
summary =  "A dog food tracker app that uses NFC tags and an iPhone shortcut with a Spin app"
url = "https://github.com/technosophos/feed-the-dog"
keywords = "typescript, javascript, key-value"

---

In our family, it is hard to track whether the dog gets his three meals a day. So I wrote a simple app that works like this:

1. The dog food bin has an NFC tag
2. Our iPhones have a shortcut that, when the NFC tag is tapped, checks how many times the dog has been fed
3. A Spin TypeScript app uses Key Value Store to track and store how many times the NFC token has been tapped
4. If the dog has been fed already, the iPhone shortcut lets the user know. Otherwise it logs a feeding.

The Spin app has both a web UI and a simple JSON REST API. The iPhone shortcut uses the REST API.
