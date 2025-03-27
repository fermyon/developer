title = "JWT Token Validation with Wasm Functions"
template = "functions_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/wasm-functions/jwd-scenario.md"

---
- [Prerequisites](#prerequisites)

In this tutorial, we demonstrate how to offload JWT token validation to a Spin App running on Fermyon Wasm Functions. We'll take clients request tokens from an OAuth 2.0/OpenID-compliant Identity Provider and then send them as an Authorization header to an EdgeWorker. The EdgeWorker forwards the token to the Spin App for validation, which returns a 200 HTTP status for valid tokens or a 401 for invalid ones, with detailed feedback. This process happens early in the EdgeWorker's onClientRequest phase, ensuring fast and efficient validation thanks to the Spin applications running on Fermyon Wasm Functions. Let's take a look at how this works in action! 

>> Remaining coming soon! Meantime visit the [JWT Validation](https://github.com/fermyon/a3000-usecases/blob/main/family-1/jwt-validation.md) example in GitHub
