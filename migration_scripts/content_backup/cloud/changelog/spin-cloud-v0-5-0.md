title = "Spin Cloud v0.5 Updates"
template = "changelog_item"
date = "2023-11-02T12:00:00Z"
enable_shortcodes = true
tags = ["spin_cloud_plugin"]
[extra]
type= "changelog_post"
twitter_card_type = "summary_large_image" 
image = "/static/image/changelog/spin-cloud-0.5.0.jpg"

---

## Spin Cloud v0.5.0 Changelog

We’re excited to announce the v0.5.0 release of the `spin cloud` plugin. Some notable improvements over the last minor update include: 

- Support for component model on Fermyon Cloud! Simply use [Spin 2.0’s application manifest](https://developer.fermyon.com/spin/v2/manifest-reference) and run `spin cloud deploy` to deploy your component model enlightened Spin application to Fermyon Cloud. You can learn more about the many benefits of the component model (polyglot, performance, & portability, to name a few) with [our latest blog post](https://www.fermyon.com/blog/index).
- `spin cloud logs` allows you to stream logs produced by your Spin application of choice running on Fermyon Cloud.

Also, please note, there is a slight rewording in the help commands of `spin cloud`'s help text:

- Removal of `NoOps` database wording, from `spin cloud` help text. The `NoOps` feature has been renamed to Fermyon Cloud `SQLite database`; so you will notice the new wording of `SQLite database`, anywhere you used to see `NoOps`. No action is required on your end as part of the name change.

**References**

- [Spin 2.0 blog post](https://www.fermyon.com/blog/index)
- [Spin 2.0 quickstart guide](https://developer.fermyon.com/spin/v2/quickstart)
- [Spin Cloud Plugin Reference Documentation](/cloud/cloud-command-reference)
