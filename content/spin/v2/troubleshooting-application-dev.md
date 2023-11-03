title = "Troubleshooting Application Development"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/troubleshooting-application-dev.md"

---

The `spin doctor` command detects problems that could stop your application building and running, and can help to fix them.  These include problems like invalid manifests, missing Wasm files, and missing tools.

To troubleshoot using `spin doctor`, run the command:

<!-- @selectiveCpy -->

```bash
$ spin doctor
```

> If you're not in the application directory, use the `-f` flag to tell the doctor which application to check

Spin performs a series of checks on your application. If it finds a problem, it prints a description and, if possible, offers to fix it. Here's an example where a stray keystroke has messed up the version field in the application manifest:

<!-- @selectiveCpy -->

```bash
$ spin doctor
📟 The Spin Doctor is in.
🩺 Checking spin.toml...

❗ Diagnosis: Manifest 'spin_manifest_version' must be "1", not "11"
🩹 The Spin Doctor can help! Would you like to:
> Set manifest version to "1"
  Do nothing
  See more details about the recommended changes
```

If `spin doctor` detects a problem it can fix, you can choose to accept the fix, skip it to fix manually later, or see more details before choosing.  If `spin doctor` can't fix the problem, it displays the problem so you can make your own decision about how to fix it.

> `spin doctor` is in an early stage of development, and there are many potential problems it doesn't yet check for. Please [raise an issue](https://github.com/fermyon/spin/issues/new?template=suggestion.md) if you have a problem you think `spin doctor` should check for.
