title = "Upgrade Spin"
template = "spin_main"
date = "2023-05-01T00:01:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/upgrade.md"

---
- [Check Spin Version](#check-spin-version)
- [Upgrade Spin Version](#upgrade-spin-version)
  - [Upgrade From Source](#upgrade-from-source)
  - [Upgrading Using Cargo](#upgrading-using-cargo)
  - [Upgrading Using OS Package Managers](#upgrading-using-os-package-managers)
- [Upgrade Spin Templates](#upgrade-spin-templates)
  - [Upgrading Using OS Package Managers](#upgrading-using-os-package-managers-1)
- [Upgrade Spin Plugins](#upgrade-spin-plugins)
  - [Upgrading Using OS Package Managers](#upgrading-using-os-package-managers-2)

## Check Spin Version

To check which version of Spin you have, run `spin --version`:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

To find out if an upgrade is available, compare this version with the [latest release version](https://github.com/fermyon/spin/releases/latest) listed in the Spin GitHub repository.

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

### Upgrade From Source

Todo

### Upgrading Using Cargo

Todo

### Upgrading Using OS Package Managers

Todo

## Upgrade Spin Templates

Todo ... [the Spin CLI](/common/cli-reference#upgrade-templates) ... [upgrade templates](/spin/managing-templates#upgrading-templates) ...

### Upgrading Using OS Package Managers

Todo `apt` and/or `brew`?

## Upgrade Spin Plugins

Todo ... [the Spin CLI](/common/cli-reference#update-plugins) ... [the Spin CLI](/cli-reference#upgrade-plugins) ... [upgrade plugins](/spin/managing-plugins#upgrading-plugins)

### Upgrading Using OS Package Managers

Todo `apt` and/or `brew`?

