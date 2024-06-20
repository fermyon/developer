title = "Spin Cloud v0.5.1 Patch Update"
template = "changelog_item"
date = "2023-11-13T12:00:00Z"
enable_shortcodes = true
tags = ["spin_cloud_plugin"]
[extra]
type= "changelog_post"

---

## Spin Cloud v0.5.1 Patch Update

Fermyon recently released `spin cloud` v0.5.1 patch update to fix an issue introduced in v0.5.0 where `allowed_http_hosts` behaves unexpectedly (allow-listed domains were still not reachable). This issue has been fixed in this latest patch update. To upgrade your `spin cloud` plugin, please using the following command:

```bash
spin plugins upgrade cloud
```

If you encounter any issues or have questions during the upgrade process, please don't hesitate to reach out to our [Discord #cloud channel](https://discord.com/channels/926888690310053918/1024646765149950022).

**References**

- [Spin 2.0 blog post](https://www.fermyon.com/blog/index)
- [Spin 2.0 quickstart guide](https://developer.fermyon.com/spin/v2/quickstart)
- [Spin Cloud Plugin Reference Documentation](/cloud/cloud-command-reference)
- [Using Spin to Make HTTP Requests](/spin/v2/http-outbound)
