title = "spin aka v0.4.2 Updates"
template = "changelog_fwf_item"
date = "2025-07-10T12:00:00Z"
enable_shortcodes = true
tags = ["spin_aka_plugin"]
[extra]
type= "changelog_post"

---

We're excited to announce the release of `spin aka` v0.4.2, the latest version of Fermyon Wasm Functions' plugin!

### ✨ What's New in `spin aka` v0.4.2

- A new `spin aka app history` command has been added that enables you to view things like the deployments you've made to your app.

  ```console
  $ spin aka app history --app-name hello-world
  +------------+----------------------------------+-------------+
  | Event      | Timestamp                        | Details     |
  +=============================================================+
  | deployment | 2025-05-26T15:44:16.906412-06:00 | Version - 3 |
  |------------+----------------------------------+-------------|
  | deployment | 2025-05-23T10:24:28.689647-06:00 | Version - 2 |
  |------------+----------------------------------+-------------|
  | deployment | 2025-05-23T10:11:55.305177-06:00 | Version - 1 |
  +------------+----------------------------------+-------------+
  ```

- `spin aka login` no longer fails if you are trying to log in with a user that is associated with multiple accounts.

<!-- break -->

Existing users can get started by upgrading your [`spin aka` plugin](https://spinframework.dev/v3/managing-plugins#upgrading-plugins) or [request access](https://fibsu0jcu2g.typeform.com/fwf-preview) to Fermyon Wasm Functions today.
