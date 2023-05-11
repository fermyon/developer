title = "Running Spin Applications"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main//content/spin/running-apps.md"

---
- [Specifying the Application to Run](#specifying-the-application-to-run)
  - [Testing HTTP Applications](#testing-http-applications)
- [Application Output](#application-output)
- [Persistent Logs](#persistent-logs)
- [Trigger-Specific Options](#trigger-specific-options)
- [The Spin Watch Feature](#the-spin-watch-feature)
- [Next Steps](#next-steps)

Once you have created and built your application, it's ready to run.  To run an application, use the `spin up` command.

## Specifying the Application to Run

By default, `spin up` looks for a file named `spin.toml` in the current directory.

If your manifest is named something different, or isn't in your current directory, use the `-f` (`--from`) flag. You also use `-f` to run remote applications.

| `-f` Value                      | `spin up` Behavior  |
|---------------------------------|---------------------|
| File name: `-f demo.toml`       | Runs the specified manifest file |
| Directory name: `-f demo/`      | Looks for a `spin.toml` file in that directory and runs that |
| Registry reference: `-f ghcr.io/fermyon/example:v1` | Pulls the application from the registry and runs that |

> If Spin misunderstands a registry reference as a file name, or vice versa, you can use `--from-file` or `--from-registry` instead of `-f` to disambiguate.

> If you see the error `failed to resolve content at "example.wasm"` (where `example.wasm` is the module file of a component), check that the application has been built.

### Testing HTTP Applications

By default, HTTP applications listen on `localhost:3000`.  You can override this with the `--listen` option.  Spin prints links to the application components to make it easy to open them in the browser or copy them to `curl` commands for testing.

## Application Output

By default, Spin prints application output, and any of its own error messages, to the console.

To hide application output, pass the `--quiet` flag:

<!-- @selectiveCpy -->

```bash
$ spin up --quiet
```

To limit application output to specific components, pass the `--follow` flag:

<!-- @selectiveCpy -->

```bash
$ spin up --follow cart --follow cart-api
```

## Persistent Logs

By default:

* If you run an application from the file system (a TOML file), Spin saves a copy of the application output and error messages.  This is saved in the `.spin/logs` directory, under the directory containing the manifest file.
* If you run an application from a registry reference, Spin does not save a copy of the application output and error messages; they are only printed to the console.

To control logging, pass the `--log-dir` flag.  The logs will be saved to the specified directory (no matter whether the application is local or remote).

<!-- @selectiveCpy -->

```bash
$ spin up --log-dir ~/dev/bugbash
```

## Trigger-Specific Options

Some trigger types support additional `spin up` flags.  For example, HTTP applications can have a `--listen` flag to specify an address and port to listen on.  See the [HTTP trigger](http-trigger) and [Redis trigger](redis-trigger) pages for more details.

## The Spin Watch Feature

Spin's `watch` command rebuilds and restarts Spin applications whenever files change. You can use the `spin watch` [command](https://developer.fermyon.com/common/cli-reference#watch) in place of the `spin build` and `spin up` commands, to build, run and then keep your Spin application running without manual intervention while staying on the latest code and files.

> The `watch` command accepts valid Spin [up](https://developer.fermyon.com/common/cli-reference#up) options and passes them through to `spin up` for you when running/rerunning the Spin application.

By default, Spin watch monitors the application manifest (`spin.toml` file) and will rebuild the running application if the manifest changes. Spin watch also monitors any files specified in the `component.build.watch` section of the `spin.toml` file. For example, the following configuration (belonging to a Spin `http-rust` application) will be rebuilt via `cargo build --target wasm32-wasi --release` and then rerun using the initial `spin up` command whenever changes occur in either Rust (`.rs`) source files or the `Cargo.toml` file. Glob patterns (i.e. the use of the `*` wildcard) are accepted, as shown below:

```toml
[[component]]
[component.build]
command = "cargo build --target wasm32-wasi --release"
watch = ["src/**/*.rs", "Cargo.toml"]
```
If you would prefer Spin watch to only rerun the application (without a rebuild) when changes occur, you can use the `--skip-build` option when running the `spin watch` command.  In this case, Spin will ignore the `component.build.watch` section, and monitor only the `spin.toml`, `component.source` and `component.files`.

 Spin watch can will also monitor any changes to files specified in the `spin.toml`'s `component.files` areas and will rerun the application when changes occur. For example, any changes to `changing-file.txt` in the `my-files` directory will cause Spin watch to rerun the application:

 ```toml
[[component]]
// -- snip
files = ["my-files/changing-file.txt"]
[component.build]
command = "cargo build --target wasm32-wasi --release"
watch = ["src/**/*.rs", "Cargo.toml"]
```

Spin watch waits up to 100 milliseconds before responding to filesystem events, then processes all events that occurred in that interval together. This is so that if you make several changes close together (for example, using a Save All command), you get them all processed in one rebuild/reload cycle, rather than going through a cycle for each one. You can override the interval by passing in the `--debounce` option; e.g. `spin watch --debounce 1000` will make Spin watch respond to filesystem events at most once per second.

> Note: Action is only taken after the `--debounce` time has elapsed. For example, when a watched file is changed using a `--debounce` value of 10000 (10 seconds) no effect will be seen in the application, until a full 10 seconds has elapsed; at which point rebuild and/or rerun may occur.

> Note: If the build step (`spin build`) fails, `spin up` will not be run.

Passing the `--clear` flag will clear the screen anytime a rebuild or rerun occurs. Spin watch will not clear the screen between rebuild and rerun as this provides you with an opportunity to see any warnings.

> Note: Spin watch will always rebuild every component in your Spin application. It does not discern which individual component changed.

Spin watch does not consider changes a file's metadata (when it was last modified) as a change

## Next Steps

- Learn how to [create and update a Spin application](writing-apps)
- Learn about how to [configure your application at runtime](dynamic-configuration)
- See how to [package and distribute your application](spin-oci)
- Try deploying your application to run in the [Fermyon Cloud](/cloud/quickstart)
