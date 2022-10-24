title = "Install Spin"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]
keywords = "install"
url = "https://github.com/fermyon/developer/blob/main/content/spin/install.md"
---

## Installing Spin

Spin runs on Linux (amd64), macOS (Intel and Apple Silicon) and Windows with WSL2 (amd64).

There are multiple ways to install Spin. The easiest is to use the installer script, hosted on this site.

This command will install the latest version of Spin in you current directory.

```console
curl https://spin.fermyon.dev/downloads/install.sh | bash
```

It's highly recommended to add Spin to a folder, which is on your path, e.g.:

```console
sudo mv spin /usr/local/bin/
```

## Linux: Additional Libraries

On a fresh Linux installation, you will also need the standard build toolchain
(`gcc`, `make`, etc.), the SSL library headers, and on some distributions you may need `pkg-config`.

On Debian-like distributions, including Ubuntu, you can install these with a command like this:

```console
sudo apt-get install build-essential libssl-dev pkg-config
```

## Installing a specific version of Spin

To install a specific version, you can pass arguments to the install script this way:

```console
curl https://spin.fermyon.dev/downloads/install.sh | bash -s -- -v v0.6.0
```

To install canary version of spin, you should pass the argument `-v canary`. The canary version is always the latest commit to the main branch of Spin.

```console
curl https://spin.fermyon.dev/downloads/install.sh | bash -s -- -v canary
```

## Building Spin from source

[Follow the contribution document](./contributing.md) for a detailed guide on building Spin from source:

```console
git clone https://github.com/fermyon/spin
cd spin && make build
./target/release/spin --help
```

## Using Cargo to install Spin

If you have [`cargo`](https://doc.rust-lang.org/cargo/getting-started/installation.html), you can clone the repo and install it to your path:

```console
git clone https://github.com/fermyon/spin -b v0.6.0
cd spin
rustup target add wasm32-wasi
cargo install --locked --path .
spin --help
```

## Next Steps

- [Take Spin for a spin](./quickstart.md)
- Learn about how to [develop a Spin application](developing)
- Try the [Fermyon Cloud](/cloud/quickstart)
