title = "HTTP Trigger Reference"
template = "functions_main"
date = "2025-07-11T00:00:00Z"
enable_shortcodes = true

---
- [HTTP Requests](#http-requests)
  - [Request Headers](#request-headers)

Fermyon Wasm Functions currently supports the [`http` trigger type](https://spinframework.dev/v3/http-trigger) for Spin applications.

# HTTP Requests

Here we'll cover details around the inbound HTTP request received by an application (or a specific component) when running on Fermyon Wasm Functions.

## Request Headers

In addition to any headers passed by the client making the request to an application, there are several Spin-related headers included in the request passed to your component.

> Each of the headers below link to upstream Spin documentation, where more details and examples can be seen.

- [`spin-full-url`](https://spinframework.dev/v3/http-trigger#additional-request-information-spin-full-url): The full URL of the request. This includes full host and scheme information.
- [`spin-path-info`](https://spinframework.dev/v3/http-trigger#additional-request-information-spin-path-info): The request path relative to the component route
- [`spin-path-match-n`](https://spinframework.dev/v3/http-trigger#additional-request-information-spin-path-match-n): (Conditionally included): Where n is the pattern for a single-segment wildcard value (e.g. spin-path-match-userid will access the value in a URL containing a route that includes :userid)
- [`spin-matched-route`](https://spinframework.dev/v3/http-trigger#additional-request-information-spin-matched-route): The part of the trigger route that was matched by the route (including the wildcard indicator if present)
- [`spin-raw-component-route`](https://spinframework.dev/v3/http-trigger#additional-request-information-spin-raw-component-route): The component route pattern matched, including the wildcard indicator if present

Other headers of interest that can be utilized by the triggered component are seen below:

- `true-client-ip`: The IP of the client sending the request (e.g. "151.49.93.60")
