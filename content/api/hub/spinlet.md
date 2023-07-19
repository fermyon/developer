title = "Spinlet"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/plain"
tags = ["test", "rust"]

[extra]
author = "cardoso"
type = "hub_document"
category = "Plugin"
language = "Rust"
created_at = "2022-10-15T00:22:56Z"
last_updated = "2022-10-15T00:22:56Z"
spin_version = ">v1.4"
summary = "Spinlet is a plugin and runtime for building and running wasm32-wasi cli components as plugins for Spin"
url = "https://github.com/cardoso/spinlet"

---

# Spinlet

Spinlet is a plugin and runtime for building and running wasm32-wasi cli components as  [plugins](https://github.com/fermyon/spin-plugins) for  [Spin](https://github.com/fermyon/spin). It provides a sandboxed environment with access control to protect the host system from malicious code. Spinlet supports features such as `std::env::args` and `std::fs::read_dir`, and allows users to specify which environment variables, directories, and files the plugin has access to.

## Requirements

Spinlet requires the following tools to be installed:

- [Rust](https://www.rust-lang.org/) >= 1.70.0
- [Spin](https://github.com/fermyon/spin) >= 1.2.0
- [wasm-tools](https://github.com/wasmtime/wasm-tools) >= 1.0.35
- [wit-bindgen](https://github.com/wasmtime/wasm-tools) >= 0.7.0
- [spin-pluginify](https://github.com/itowlson/spin-pluginify) >= [PR #6](https://github.com/itowlson/spin-pluginify/pull/6)

## Installation

```bash
git clone https://github.com/cardoso/spinlet
cd spinlet
spin pluginify -i
spin let
```

## Status

### Hooks

- [x] `spin let [command]`

Spinlets can now hook into spin's native commands by specifying in their manifest:

```toml
[hook.build.after]
enabled = true
[hook.build.before]
enabled = true
```

### Sandboxed Environment

- [x] access control

Spinlet's manifest allows users to specify which environment variables, directories, and files the plugin has access to.

```toml
[[access.fs.dir]]
path = "."
read = true

[[access.env.var]]
key = "HOME"

[access.env.args]
enabled = true
[access.io.stdin]
enabled = true
[access.io.stdout]
enabled = true
[access.io.stderr]
enabled = true

```

- [x] `std::env::args`

```rust
fn main() {
    for arg in std::env::args() {
        println!("{}", arg);
    }

    // Plugin only has access to environment variables specified in the manifest
    for (key, value) in std::env::vars() {
        println!("{}: {}", key, value);
    }
}
```

```bash
➜  spinlet git:(main) ✗ spin let update
You're using a pre-release version of Spin (1.3.0-pre0). This plugin might not be compatible (supported: >=0.7). Continuing anyway.
/Users/cardoso/Library/Application Support/spin/plugins/let/let
update
SPIN_BIN_PATH: /Users/cardoso/.cargo/bin/spin
SPIN_BRANCH: main
SPIN_BUILD_DATE: 2023-05-20
SPIN_COMMIT_DATE: 2023-05-19
SPIN_COMMIT_SHA: d476000
SPIN_DEBUG: false
SPIN_TARGET_TRIPLE: aarch64-apple-darwin
SPIN_VERSION: 1.3.0-pre0
SPIN_VERSION_MAJOR: 1
SPIN_VERSION_MINOR: 3
SPIN_VERSION_PATCH: 0
SPIN_VERSION_PRE: pre0
```

- [x] `std::fs::read_dir`

```rust
pub fn main() {
    /// Plugin only has access to files in the current working directory
    match std::fs::read_dir("/workspace") {
        Ok(dir) => {
            for entry in dir {
                match entry {
                    Ok(entry) => println!("{}", entry.path().display()),
                    Err(error) => println!("error reading entry: {}", error),
                }
            }
        }
        Err(error) => println!("error reading /: {}", error),
    }
}
```

```bash
➜  spinlet git:(main) ✗ pwd
/Users/cardoso/Developer/cardoso/spinlet/spinlet
➜  spinlet git:(main) ✗ spin let workspace
You're using a pre-release version of Spin (1.3.0-pre0). This plugin might not be compatible (supported: >=0.7). Continuing anyway.
/workspace/Cargo.toml
/workspace/.spinlets
/workspace/.DS_Store
/workspace/target
/workspace/install.sh
/workspace/let-0.1.5-macos-aarch64.tar.gz
/workspace/Cargo.lock
/workspace/README.md
/workspace/adapters
/workspace/build.sh
/workspace/.gitignore
/workspace/spinlets
/workspace/.git
/workspace/let.json
/workspace/spin-pluginify.toml
/workspace/src
```

## Usage

```bash
spin let [spinlet] -- [spinlet args]
```

```terminal
Usage: spin let [OPTIONS] <SPINLET> [-- <ARGS>...]

Arguments:
  <SPINLET>  Spinlet to run
  [ARGS]...  Arguments to pass to the
             spinlet

Options:
  -w, --workspace <WORKSPACE>
          Workspace to run the spinlet
          in [default: .]
  -h, --help
          Print help
```


