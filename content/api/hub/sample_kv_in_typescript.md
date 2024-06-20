title = "All KV Functions in TypeScript"
template = "render_hub_content_body"
date = "2023-08-23T00:00:00Z"
content-type = "text/html"
tags = ["typescript", "javascript", "key-value"]

[extra]
author = "technosophos"
type = "hub_document"
category = "Sample"
language = "JS/TS"
created_at = "2023-08-23T00:00:00Z"
last_updated = "2023-08-23T00:00:00Z"
spin_version = ">v1.3"
summary =  "Example usage of every single KV function using the TypeScript SDK"
url = "https://github.com/technosophos/all-kv-functions"
keywords = "typescript, javascript, key-value"

---

This sample shows how to use all of the different [Key/Value functions](../../spin/kv-store-api-guide) in TypeScript, including how to decode results, trap errors in a `try/catch`, and work with JSON.

This will help you get started with KV storage either locally using `spin up` or in Fermyon Cloud using `spin deploy`.

Everything is demoed in one `index.ts` file. And while it is TypeScript, it is easily adapted to JavaScript with almost no changes (other than the occasional type annotation).

Here's a snippet of the code you'll see in this project:

```javascript
  // We can get a list of all of the keys out of the DB.
  let keys = store.getKeys().join(", ")
  console.log("The keys in the DB are: " + keys)

  // Now we can get values back out. Note that the value is an array buffer,
  // so we have to convert it back to a string.
  let siteName = store.get("name")
  let dec = new TextDecoder("utf-8")
  // This will print "Pet Database" to the log
  console.log("Site name: " + dec.decode(siteName))

  // A non-existent key comes back with a null value.
  let noSuchValue = store.get("no-such-key")
  if (noSuchValue == null) {
    console.log("Got an expected 'null' for a nonexistent key")
  }
```
