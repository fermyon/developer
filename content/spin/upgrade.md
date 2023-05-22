title = "Upgrade Spin"
template = "spin_main"
date = "2023-05-01T00:01:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/upgrade.md"

---

## Check Spin Version

Your existing version of Spin can be checked using the [Spin Command Line Interface (CLI)](/common/cli-reference) command `spin --version`, as shown below:

<!-- @selectiveCpy -->

```bash
$ spin --help
```

You can compare the output of the above command with the version listed by the [latest](https://github.com/fermyon/spin/releases/latest) tag endpoint, in the [Spin GitHub repository](https://github.com/fermyon/spin).

## Upgrade Spin Version

As Spin can be installed in many ways, and therefore the upgrade procedure can differ between users. Here are a few suggested ways to upgrade Spin to the latest version.

Firstly you might want to confirm where Spin is being run from, on your system. On Linux and macOS systems this can be done by using the `which` command, as shown below:

<!-- @selectiveCpy -->

```bash
$ which spin
```

If you originally installed Spin using cargo, the above command will return something like the following:

<!-- @nocpy -->

```bash

```

If you originally used the installer, you will likely see that Spin is being run from a local `bin` directory. For example:

<!-- @nocpy -->

```bash
/usr/local/bin/spin
```

## Upgrade From Source

## Upgrading Using Cargo


