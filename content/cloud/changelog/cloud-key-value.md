title = "Fermyon Cloud Key Value Store"
template = "changelog_item"
date = "2022-04-18T07:00:00Z"
enable_shortcodes = true
tags = ["storage"]
[extra]
type= "changelog_post"

---

Fermyon Cloud now supports [Key Value Store](https://spinframework.dev/kv-store-api-guide). While Spin applications are well suited for event-driven, stateless workloads, these serverless workloads often rely on external services to persist state beyond the lifespan of a single request. With the introduction of [Fermyon Cloud Key Value Store](https://www.fermyon.com/blog/introducing-fermyon-cloud-key-value-store), you can now persist non-relational data in a key/value store that is always available for your serverless application (within milliseconds and without cold starts). No infrastructure provisioning or maintenance is required. Developers can now deploy their Fermyon Cloud Key Value Store applications simply by running `spin cloud deploy`.

<img src="https://www.fermyon.com/static/image/twc-introducing-fermyon-cloud-key-value-store.jpg" alt="Key Value Store">

<!-- break -->

References:

- [Spin Key Value API Guide](https://spinframework.dev/kv-store-api-guide) 
- [Spin Key Value Tutorial](https://spinframework.dev/key-value-store-tutorial)
- [Introducing Fermyon Cloud Key Store](https://www.fermyon.com/blog/introducing-fermyon-cloud-key-value-store)
- [Cloud Limitations](/cloud/faq)