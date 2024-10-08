title = "Migrating an Application from Spin 2.x to Spin 3.x"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/migration-v2-v3.md"

---

Most applications will not require changes. The following changes may affect application authors:

* The HTTP trigger application-level `base` option has been removed. To simulate the effect of `base`, use a common prefix for your routes.
* Spin now infers the `authority` property of an incoming HTTP request from either the request URL or the HTTP Host header.
  (If the request includes both, then they must agree.) This means that when a client makes the request through a DNS name,
  the `authority` will be that DNS name, rather than the Spin server's listener address. If your components use the `authority`
  property then you should carefully re-test that they work correctly after this change.
* Spin now adds an HTTP Host header on `self` requests (those made using a path only). The value of the header is the listener address
  of the Spin HTTP server. Consequently, the component receiving the `self` request will always see the URL `authority` as that of the
  Spin HTTP server. If your application uses self-requests, and the receiving components use the `authority`
  property, then you should carefully re-test that they work correctly after this change.
* The on-disk format for [Serverless AI](serverless-ai-api-guide.md) LLMs has changed. You will need to re-download local
  models and re-organise them in accordance with the new format. See the [Serverless AI API guide](serverless-ai-api-guide.md#file-structure)
  for details. (No application code changes are required.)
* The [environment provider for application variables](dynamic-configuration.md#environment-variable-provider) is now overridden
  by application variable providers configured in the [runtime config file](dynamic-configuration.md#application-variables-runtime-configuration).
  If you relied on environment variables taking precedence over other sources, you will need to stop setting `--runtime-config-file`
  or tweak your workflow.
* Some modules produced by languages with older WASI support may no longer run. This specifically affects WAGI applications
  compiled with a WASI-SDK version 18 or earlier. See [https://github.com/fermyon/spin/issues/2552](https://github.com/fermyon/spin/issues/2552) for details
  of the issue and for possible workarounds.

The following change will not affect most application authors, but may affect you if you work directly with the low-level WASI interfaces:

* If an outbound HTTP request is denied, the `HTTP-request-denied` error previously occurred immediately on the
  initial `wasi:http/outgoing-handler#handle` call. It now occurs when calling `get` on the `future-incoming-response`
  returned from the `handle` call.
