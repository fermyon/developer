title = "Spin Cloud v0.3 & 0.4 Updates"
template = "changelog_item"
date = "2024-1-30T12:00:00Z"
enable_shortcodes = true
tags = ["spin_cloud_plugin"]
[extra]
type= "changelog_post"
twitter_card_type = "summary_large_image" 
image = "/static/image/changelog/TODO.jpg" 

---

Today we're announcing the minor release of [`spin cloud` plugin v0.6.0](https://github.com/fermyon/cloud-plugin), which allows the management of key value stores via CLI. 

Highlights include:

* create a key value store with `spin cloud kv create`
* delete a key value store with `spin cloud kv delete`
* link a key value store to a Spin app via `spin cloud link kv`
* unlink a key value store from a Spin app via `spin cloud unlink kv`
* write a key/value pair to your key value store via `spin cloud kv set`

<img src="/static/image/changelog/TODO" alt="Spin Cloud 0.6.0 changelog">

Check out our [linking Spin apps to key value stores blog post]() to see these subcommands in action! 

<!-- break -->

References:

- [Spin Cloud Plugin v0.6.0 Release Notes](https://github.com/fermyon/cloud-plugin/releases/tag/v0.6.0)
- [Spin Cloud Plugin Reference Documentation](/cloud/cloud-command-reference)
- [Linking Applications To Resources Using Labels](/cloud/linking-applications-to-resources-using-labels)
- [Key Value Store Tutorial](/cloud/kv-cloud-tutorial.md) 
