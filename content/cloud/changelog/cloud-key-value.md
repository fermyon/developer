title = "Fermyon Cloud Key Value Store"
template = "changelog_item"
date = "2022-04-18T00:07:00Z"
enable_shortcodes = true
tags = ["storage"]
[extra]
type= "changelog_post"

---

Fermyon Cloud now supports [Spin's Key Value Store](../../spin/kv-store-api-guide.md). While Spin applications are best suited for event-driven, stateless workloads, storing and retreiving state from an external store is a common requirement for these workloads as well. Spin applications can now persist their non-relational data using a completely managed Key Value Store hosted by Fermyon Cloud, no infrastructure provisioning or maintenance required. Developers who have been using Spin's Key Value Store locally can deploy their applications to Fermyon Cloud, without any configuration changes required, simply by running `spin cloud deploy`.

<img src="/static/image/changelog/two-introducing-fermyon-cloud-key-value-store.jpeg" alt="Key Value Store">

<!-- break -->

References:

- [Spin Key Value API Guide](https://developer.fermyon.com/spin/kv-api-guide) 
- [Spin Key Value Tutorial](https://developer.fermyon.com/spin/kv-tutorial)
- [Cloud Limitations](https://developer.fermyon.com/cloud/faq)