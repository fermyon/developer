title = "spin aka v0.5.0 Updates"
template = "changelog_fwf_item"
date = "2025-09-16T12:00:00Z"
enable_shortcodes = true
tags = ["spin_aka_plugin"]
[extra]
type= "changelog_post"

---

### ✨ What's New in `spin aka` v0.5.0

In addition to minor fixes and improvements, this release brings the following functionality:

- The `spin aka info` command now supports JSON output in addition to plaintext. Just supply `--format json`.
- You can now filter logs using `spin aka logs` via these dimensions:
  - Component ID (eg `--component-id api`)
  - Deployment version (eg `--deployment-version 7`)
  - Region that handled the request (eg `--region fr-par`)
- You can deploy your app to a specific account by name
  - For example, `spin aka deploy --acount-name personal-account`

<!-- break -->

Existing users can get started by upgrading your [`spin aka` plugin](https://spinframework.dev/v3/managing-plugins#upgrading-plugins) or [request access](https://fibsu0jcu2g.typeform.com/fwf-preview) to Fermyon Wasm Functions today.
