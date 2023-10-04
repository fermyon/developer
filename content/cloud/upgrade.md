title = "Upgrade an Application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/upgrade.md"

---
- [Upgrade Your Application](#upgrade-your-application)
- [Next Steps](#next-steps)

Upgrading your application is as simple as redeploying after you've made changes to your application code or version.

## Upgrade Your Application

When upgrading a Spin application running in the Fermyon Cloud, you may wish to change the version of your application
when code changes have been made. This is an optional step.

1. Open the `spin.toml` file. In the file, you’ll find this line of code for the version:

<!-- @nocpy -->

```toml
version = "0.1.0"
```

In this case, we're changing the version from `0.1.0` to `0.1.1`:

<!-- @nocpy -->

```toml
version = "0.1.1"
```

Whether you've just updated your application code or also bumped the version, you can now deploy the upgraded version
of your application by running this command:

<!-- @selectiveCpy -->

```bash
$ spin deploy
```

That’s how to upgrade a Spin Application, just as simple as that!

## Next Steps

- [Delete an application](delete)
- Find known issues and file new ones with this [GitHub repository](https://github.com/fermyon/feedback)
