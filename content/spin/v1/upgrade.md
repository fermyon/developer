title = "Upgrade Spin"
template = "spin_main"
date = "2023-05-01T00:01:01Z"
enable_shortcodes = true
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/upgrade"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/upgrade.md"

---
- [Are You on the Latest Version?](#are-you-on-the-latest-version)
- [Upgrade Spin](#upgrade-spin)
  - [Cargo](#cargo)
  - [Installer](#installer)
  - [Source](#source)
- [Troubleshooting](#troubleshooting)
  - [Not Seeing the Latest Version?](#not-seeing-the-latest-version)

## Are You on the Latest Version?

The best way to know if you're on the latest version of Spin is to run `spin --version`:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

You can compare the output from the above command with the [latest release release](https://github.com/spinframework/spin/releases/latest) listed in the Spin GitHub repository (which is also shown in the image below):

![spin version image](https://img.shields.io/github/v/release/spinframework/spin)

## Upgrade Spin

Spin can be installed in many ways, and therefore the upgrade procedure can differ between users. Here are a few suggested ways to upgrade Spin to the latest version. If you're not sure how or where you installed your current version of Spin try using the `which` command on [Linux and macOS](https://linux.die.net/man/1/which) and the `where` command on [Windows](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/where), as shown below:

{{ tabs "os" }}

{{ startTab "Linux"}}

<!-- @selectiveCpy -->

```bash
$ which spin
```

{{ blockEnd }}

{{ startTab "macOS"}}

<!-- @selectiveCpy -->

```bash
$ which spin
```

{{ blockEnd }}

{{ startTab "Windows"}}

<!-- @selectiveCpy -->

```bash
$ where spin
```

{{ blockEnd }}

{{ blockEnd }}

### Cargo

If you originally followed the documentation's [Cargo install method](./install#using-cargo-to-install-spin), please revisit to reinstall.

> Hint: Your Spin executable will likely be in the following location:

<!-- @nocpy -->

```bash
~/.cargo/bin/spin
```

### Installer 

If you originally followed the documentation's [installer script method](./install#installing-spin), please revisit to reinstall.

> Hint: Your Spin executable will likely be in the following location:

<!-- @nocpy -->

```bash
/usr/local/bin/spin
```

### Source

If you followed the documentation's [install from source method](./install#building-spin-from-source) please revisit to reinstall.

> Hint: Your Spin executable will likely be in the following location (where you originally cloned the Spin repository):

```bash
~/spin/target/release/spin
```

### Homebrew

If you installed Spin using [Homebrew](https://brew.sh/) please use the following commands to upgrade Spin.

<!-- @selectiveCpy -->

```bash
$ brew update
$ brew upgrade spinframework/tap/spin
```

## Troubleshooting

If you have upgraded Spin and don't see the newer version, please consider the following.

### Not Seeing the Latest Version?

It may be possible that you have installed Spin **using more than one** of the above methods. In this case, the Spin executable that runs is the one that is listed first in your `PATH` system variable. 

If you have upgraded Spin yet still see the old version using `spin --version` this can be due to the order of precedence in your `PATH`. Try echoing your path to the screen and checking to see whether the location of your intended Spin executable is listed before or after other pre-existing installation paths:

```bash
echo $PATH
/Users/my_user/.cargo/bin:/usr/local/bin
```

> Paths are separated by the `:` (colon)

In the above case, the [Cargo install method](./install#using-cargo-to-install-spin)'s installation will take precedence over the [installer script method](./install#installing-spin)'s installation. 

In this case, you can either remove the Cargo installation of Spin using `cargo uninstall spin-cli` or update your system path to prioritize the Spin binary path that you prefer.
