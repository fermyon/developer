title = "Upgrade an Application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"

---

To upgrade your Spin application, there are just a few steps to take. This doesn’t require so much stress.

Firstly, navigate to the ‘spin.toml’ file (the configuration file). In the file, you’ll find this line of code for the version:

```bash
version = "0.1.0"
```

In this case, just change it to the latest version of Spin as:

```bash
version = "0.6.0"
```

Then you can redeploy your application by running this command:

```bash
spin deploy
```

That’s how to upgrade a Spin Application, just as simple as that!