title = "Upgrade Applications"
template = "functions_main"
date = "2025-01-16T00:22:56Z"
enable_shortcodes = true

---
- [Upgrade Your Application](#upgrade-your-application)
  - [Specifying Variables](#specifying-variables)
- [Next Steps](#next-steps)

Upgrading your application is as simple as redeploying after you've made changes to your application code or changed its version.

## Upgrade Your Application

When upgrading a Spin application running in _Fermyon Wasm Functions_, you may wish to change the version of your application when code changes have been made. This is an optional step.

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

Whether you've just updated your application code or also bumped the version, you can now deploy the upgraded version of your application by running this command:

<!-- @selectiveCpy -->

```console
$ spin aka deploy
```

Remember to specify your application's variables when upgrading the Spin application on _Fermyon Wasm Functions_:

<!-- @selectiveCpy -->

```console
$ spin aka deploy --variable <key>=<value>
```

That’s how to upgrade a Spin application.

## Next Steps

- [Link Applications](app-linking)
