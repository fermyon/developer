title = "Install Spin"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
keywords = "install"

---
- [Installing Spin](#installing-spin)
- [Building Spin From Source](#building-spin-from-source)
- [Using Cargo to Install Spin](#using-cargo-to-install-spin)
- [Next Steps](#next-steps)

## Installing Spin

Spin runs on Linux (amd64 and arm64), macOS (Intel and Apple Silicon), and Windows with WSL2 (amd64).

{{ tabs "os" }}

{{ startTab "Linux"}}

There are multiple ways to install Spin. The easiest is to use the installer script, hosted on this site:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-linux"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash</code></pre>

It's highly recommended to add Spin to a folder, which is on your path, e.g.:

<!-- @selectiveCpy -->

```bash
$ sudo mv spin /usr/local/bin/
```

> Please note: On a fresh Linux installation, you will also need the standard build toolchain
(`gcc`, `make`, etc.), the SSL library headers, and on some distributions you may need `pkg-config`.

On Debian-like distributions, including Ubuntu, you can install the standard build toolchain with a command like this:

<!-- @selectiveCpy -->

```bash
$ sudo apt-get install build-essential libssl-dev pkg-config
```

To install a specific version, you can pass arguments to the install script this way:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-linux-version"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v v0.8.0</code></pre>

To install the canary version of spin, you should pass the argument `-v canary`. The canary version is always the latest commit to the main branch of Spin:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-linux-canary"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v canary</code></pre>

{{ blockEnd }}

{{ startTab "macOS"}}

There are multiple ways to install Spin. The easiest is to use the installer script, hosted on this site:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-macos"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash</code></pre>

It's highly recommended to add Spin to a folder, which is on your path, e.g.:

<!-- @selectiveCpy -->

```bash
$ sudo mv spin /usr/local/bin/
```

To install a specific version, you can pass arguments to the install script this way:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-macos-version"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v v0.8.0</code></pre>

To install the canary version of spin, you should pass the argument `-v canary`. The canary version is always the latest commit to the main branch of Spin:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-macos-canary"><code>$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v canary</code></pre>

{{ blockEnd }}

{{ startTab "Windows"}}

On Windows systems you can download <a href="https://github.com/fermyon/spin/releases/tag/v0.8.0" class="spin-install" id="spin-install-windows">the Windows binary release of Spin</a>.

Simply unzip the binary release and place the `spin.exe` in your system path.

{{ blockEnd }}
{{ blockEnd }}

## Building Spin From Source

[Follow the contribution document](./contributing-spin.md) for a detailed guide on building Spin from source:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-source-build"><code>$ git clone https://github.com/fermyon/spin
$ cd spin && make build
$ ./target/release/spin --help
</code></pre>

## Using Cargo to Install Spin

If you have [`cargo`](https://doc.rust-lang.org/cargo/getting-started/installation.html), you can clone the repo and install it to your path:

<!-- @selectiveCpy -->

<pre class="bash spin-install" id="spin-install-source-cargo"><code>$ git clone https://github.com/fermyon/spin -b v0.8.0
$ cd spin
$ rustup target add wasm32-wasi
$ cargo install --locked --path .
$ spin --help
</code></pre>

## Next Steps

- [Take Spin for a spin](./quickstart.md)
- Learn about how to [develop a Spin application](developing)
- Try the [Fermyon Cloud](/cloud/quickstart)
