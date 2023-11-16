title = "Handle POST requests with Spin's JS/TS Router"
template = "render_hub_content_body"
date = "2023-11-15T00:00:00Z"
content-type = "text/html"
tags = ["typescript", "javascript", "router"]

[extra]
author = "technosophos"
type = "hub_document"
category = "Sample"
language = "JS/TS"
created_at = "2023-11-15T00:00:00Z"
last_updated = "2023-11-15T00:00:00Z"
spin_version = ">v2.0"
summary =  "Handle POST data from within Spin's JS/TS Router"
url = "https://github.com/technosophos/ts-router-post"
keywords = "typescript, javascript, router"

---

This shows one technique for handling POST data using the `Router` object [built into the JS/TS SDK](https://developer.fermyon.com/spin/v2/javascript-components) for Spin.

This example illustrates how to pass the HTTP body from Spin's SDK all the way to your end function without needing to use middleware.

```typescript
export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  let router = Router()
  // Note that we pass `request.body` as the second param.
  // That contains an ArrayBuffer with the encoded body.
  router.post("/", (req, body) => {

    // Decode the ArrayBuffer into a string
    let decodedBody = decoder.decode(body)
    return {
      status: 200,
      headers: { "content-type": "text/plain" },
      body: decodedBody
    }
  })
  // IMPORTANT: We pass the request body as the second param.
  return await router.handleRequest(request, request.body)
}
```

Check out the GitHub repository for a full runnable example.
