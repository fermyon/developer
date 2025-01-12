title = "Building Spin Application Code"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/build.md"

---

- [Setting Up for `spin build`](#setting-up-for-spin-build)
- [Running `spin build`](#running-spin-build)
- [Running the Application After Build](#running-the-application-after-build)
- [Overriding the Working Directory](#overriding-the-working-directory)
- [Next Steps](#next-steps)

A Spin application is made up of one or more components. Components are binary Wasm modules; _building_ refers to the process of converting your source code into those modules.

> Even languages that don't require a compile step when used 'natively' may still require a build step to adapt them to work as Wasm modules.

Because most compilers don't target Wasm by default, building Wasm modules often requires special command options, which you may not have at your fingertips.
What's more, when developing a multi-component application, you may need to issue such commands for several components on each iteration.
Doing this manually can be tedious and error-prone.

To make the build process easier, the `spin build` command allows you to build all the components in one command.

> You don't have to use `spin build` to manage your builds.  If you prefer to use a Makefile or other build system, you can!  `spin build` is just there to provide an 'out of the box' solution.

<!-- markdownlint-disable-next-line titlecase-rule -->
## Setting Up for `spin build`

To use `spin build`, each component that you want to build must specify the command used to build it in `spin.toml`, as part of its `component.(name).build` table:

```toml
[component.hello]
# This is the section you need for `spin build`
[component.hello.build]
command = "npm run build"
```

If you generated the component from a Fermyon-supplied template, the `build` section should be set up correctly for you.  You don't need to change or add anything.

> Different components may be built from different languages, and so each component can have its own build command.  In addition, some components may be precompiled into Wasm modules, and don't need a build command at all.  If a component doesn't have a build command, `spin build` just skips it.

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

For Rust applications, you must have the `wasm32-wasip1` target installed:

<!-- @selectiveCpy -->

```bash
$ rustup target add wasm32-wasip1
```

The build command typically runs `cargo build` with the `wasm32-wasip1` target and the `--release` option:

<!-- @nocpy -->

```toml
[component.hello.build]
command = "cargo build --target wasm32-wasip1 --release"
```

> If you are on Rust 1.77 or earlier, use `wasm32-wasi` (without the `p1`). We recommend upgrading to Rust 1.78 or above. Future versions of Rust will not support `wasm32-wasi` (without the `p1`).

{{ blockEnd }}

{{ startTab "TypeScript" }}

For JavaScript and TypeScript applications, you must have [Node.js](https://nodejs.org).


It's normally convenient to put the detailed build instructions in `package.json`. The build script looks like:

<!-- @nocpy -->

```json
{
  "scripts": {
    "build": "npx webpack --mode=production && npx mkdirp target && npx j2w -i dist.js -d combined-wit -n combined -o target/spin-http-js.wasm"
  }
}
```

{{ details "Parts of the build script" "The build script calls out to [`webpack`](https://webpack.js.org/) and `j2w` which is a script provided by the `@fermyon/spin-sdk` package that utilizes [`ComponentizeJS`](https://github.com/bytecodealliance/ComponentizeJS)."}}

The build command can then call the NPM script:

<!-- @nocpy -->

```toml
[component.hello.build]
command = "npm run build"
```

{{ blockEnd }}

{{ startTab "Python" }}

Ensure that you have Python 3.10 or later installed on your system. You can check your Python version by running:

```bash
python3 --version
```

If you do not have Python 3.10 or later, you can install it by following the instructions [here](https://www.python.org/downloads/).

For Python applications, you must have [`componentize-py`](https://pypi.org/project/componentize-py/) installed:

<!-- @selectiveCpy -->

```bash
$ pip3 install componentize-py
```

The build command then calls `componentize-py` on your application file:

<!-- @nocpy -->

```toml
[component.hello.build]
command = "componentize-py -w spin-http componentize app -o app.wasm"
```

{{ blockEnd }}

{{ startTab "TinyGo" }}

For Go applications, you must use the TinyGo compiler, as the standard Go compiler does not yet support the WASI standard.  See the [TinyGo installation guide](https://tinygo.org/getting-started/install/).

The build command calls TinyGo with the WASI backend and appropriate options:

<!-- @nocpy -->

```toml
[component.hello.build]
command = "tinygo build -target=wasip1 -gc=leaking -scheduler=none -buildmode=c-shared -no-debug -o main.wasm ."
```

{{ blockEnd }}

{{ blockEnd }}

> The output of the build command _must_ match the component's `source` path.  If you change the `build` or `source` attributes, make sure to keep them in sync.

<!-- markdownlint-disable-next-line titlecase-rule -->
## Running `spin build`

Once the build commands are set up, running `spin build` will execute, sequentially, each build command:

<!-- @selectiveCpy -->

```bash
$ spin build
Building component hello with `cargo build --target wasm32-wasip1 --release`
    Updating crates.io index
    Updating git repository `https://github.com/fermyon/spin`

    //--snip--

    Compiling hello v0.1.0 (hello)
    Finished release [optimized] target(s) in 39.05s
Finished building all Spin components
```

> If your build doesn't work, and your source code looks okay, you can [run `spin doctor`](./troubleshooting-application-dev.md) to check for problems with your Spin configuration and tools.

## Running the Application After Build

You can pass the `--up` option to `spin build` to start the application as soon as the build process completes successfully.

This is equivalent to running `spin up` immediately after `spin build`.  It accepts all the same flags and options that `up` does.  See [Running Applications](running-apps) for details.

## Overriding the Working Directory

By default, the `command` to build a component is executed in the directory containing the `spin.toml` file. If a component's entire build source is under a subdirectory, it is often more convenient to build in that subdirectory rather than try to pass the path to the build command. You can do this by setting the `workdir` option in the `component.(id).build` table.

For example, consider this Rust component located in subdirectory `deep`:

<!-- @nocpy -->

```bash
.
├── deep
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── spin.toml
```

To have the Rust build `command` run in directory `deep`, we can set the component's `workdir`:

<!-- @nocpy -->

```toml
[component.deep.build]
# `command` is the normal build command for this language
command = "cargo build --target wasm32-wasip1 --release"
# This tells Spin to run it in the directory of the build file (in this case Cargo.toml)
workdir = "deep"
```

> `workdir` must be a relative path, and it is relative to the directory containing `spin.toml`. Specifying an absolute path leads to an error.

## Next Steps

- Try [running your application locally](running-apps)
- Try deploying a Spin application to the [Fermyon Cloud](/cloud/quickstart)
