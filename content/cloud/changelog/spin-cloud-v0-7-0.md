title = "Spin Cloud v0.7.0 Updates"
template = "changelog_item"
date = "2024-01-25T12:00:00Z"
enable_shortcodes = true
tags = ["spin_cloud_plugin"]
[extra]
type= "changelog_post"
twitter_card_type = "summary_large_image" 
image = "/static/image/changelog/spin-cloud-0.7.0.jpg"

---

<img src="/static/image/changelog/spin-cloud-0.7.0.jpg" alt="Spin Cloud 0.7.0 changelog">

Before the v0.7.0 release of the [`spin cloud` plugin](https://github.com/fermyon/cloud-plugin), Spin applications could only use a "default" key-value store. This release of the cloud plugin brings support for sharing key-value stores between applications, linking multiple key-value stores to an application, and dynamically updating which key-value stores are linked to an application.

<!-- break -->

## Spin Cloud v0.7.0 Updates

The updated CLI includes all the commands needed to take these management actions:

- `spin cloud kv create` will create a key-value store on Fermyon Cloud
- `spin cloud kv delete` will delete a key-value store
- `spin cloud kv rename` will rename a key-value store
- `spin cloud kv set` will set key-value pairs in a key-value store
- `spin cloud link kv` will connect your key-value store to a Spin application
- `spin cloud unlink kv` will disconnect your key-value store from a Spin application
- `spin cloud deploy` will detect whether your application uses key-value stores and prompt you to create new key-value stores or link the application to existing ones.

## Upgrading to Spin Cloud v0.7.0

To upgrade your `spin cloud` plugin, please use the following command:

```bash
spin plugins update
spin plugins upgrade cloud
```

If you encounter any issues or have questions during the upgrade process, please don't hesitate to reach out to our [Discord #cloud channel](https://www.fermyon.com/discord).
