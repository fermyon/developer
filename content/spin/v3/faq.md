title = "Frequently Asked Questions"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/whats-new.md"

---
- [Spin 3.0](#spin-30)
  - [How do I migrate an application from Spin 2.x to Spin 3.x?](#how-do-i-migrate-an-application-from-spin-2x-to-spin-3x)

## Spin 3.0

### How do I migrate an application from Spin 2.x to Spin 3.x?

Most applications will not require changes. The following changes may affect application authors:

* The HTTP trigger application-level `base` option has been removed. To simulate the effect of `base`, use a common prefix for your routes.
* **TODO: understand incoming-request.authority changes and write them up here**
* The on-disk format for [Serverless AI](serverless-ai-api-guide.md) LLMs has changed. You will need to re-download local models and re-organise them in accordance with the new format. See [**TODO**](https://tba.tba/fill/in/the/right/link) for details. (No application code changes are required.)
* Some modules produced by languages with older WASI support may no longer run. This specifically affects WAGI applications compiled with a WASI-SDK version 18 or earlier. See https://github.com/fermyon/spin/issues/2552 for details of the issue and for possible workarounds.

The following change will not affect most application authors, but may affect you if you work directly with the low-level WASI interfaces:

* If an outbound HTTP request is denied, the `HTTP-request-denied` error previously occurred immediately on the initial `wasi:http/outgoing-handler#handle` call. It now occurs when calling `get` on the `future-incoming-response` returned from the `handle` call.
