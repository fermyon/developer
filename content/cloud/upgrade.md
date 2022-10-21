title = "Upgrade an Application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true

---

- [Upgrade your application](#upgrade-your-application)
- [Next steps](#next-steps)

To upgrade your Spin application, there are just a few steps to take. This doesn’t require so much stress.

## Upgrade your application

To upgrade a Spin application running in the Fermyon Cloud, you first have to change the version of your application.

1. Open the `spin.toml` file. In the file, you’ll find this line of code for the version:

```toml
version = "0.1.0"
```

In this case, we're changing the version from `0.1.0` to `0.1.1`

```toml
version = "0.1.1"
```

{{ details "Additional info" "Spin application are packaged using [Bindle](https://github.com/deislabs/bindle). Bindle ensures immutability, meaning you cannot overwrite a Bindle (name+version), once it has been uploaded to a Bindle server. /n/n `spin deploy` will fail if you try to redeploy a version of an application, which already exists in the Fermyon Cloud." }}

You can now deploy the upgraded version of your application by running this command:

```console
spin deploy
```

That’s how to upgrade a Spin Application, just as simple as that!

## Next steps

- [Delete an application](delete)
- Find known issues and file new ones with this [GitHub repository](https://github.com/fermyon/feedback)
