title = "Running Spin Applications"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/running-apps.md"

---
- [Specifying the Application to Run](#specifying-the-application-to-run)
- [Specifying the Wasm File to Run](#specifying-the-wasm-file-to-run)
  - [Testing HTTP Applications](#testing-http-applications)
- [Application Output](#application-output)
- [Persistent Logs](#persistent-logs)
- [Trigger-Specific Options](#trigger-specific-options)
- [Monitoring Applications for Changes](#monitoring-applications-for-changes)
- [Splitting an Application Across Environments](#splitting-an-application-across-environments)
- [The Always Build Option](#the-always-build-option)
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

> If your application doesn't run, you can [run `spin doctor`](./troubleshooting-application-dev.md) to check for problems with your Spin configuration and tools.

## Specifying the Wasm File to Run

The `spin up --from` (`spin up -f`) option can point to a pre-existing Wasm binary executable instead of an application's manifest:

<!-- @selectiveCpy -->

```bash
$ spin up --from mymodule.wasm
```

Please note that the uses for performing `spin up` using just a Wasm file are very limited outside of basic testing of the Wasm file. This is because Wasm files run in this way have no access to application-level configuration that allows storage, outbound HTTP and so on. Only incoming HTTP handlers are supported.

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

To control logging, pass the `--log-dir` flag.  The logs will be saved to the specified directory (no matter whether the application is local or remote):

<!-- @selectiveCpy -->

```bash
$ spin up --log-dir ~/dev/bugbash
```

If you prefer **not** to have the `stdout` and `stderr` of your application's components written to disk (as in the example above), you can pass the `--log-dir` flag with an empty string, like this:

<!-- @selectiveCpy -->

```bash
$ spin up --log-dir ""
```

## Trigger-Specific Options

Some trigger types support additional `spin up` flags.  For example, HTTP applications can have a `--listen` flag to specify an address and port to listen on.  See the [HTTP trigger](http-trigger) and [Redis trigger](redis-trigger) pages for more details.

## Monitoring Applications for Changes

Spin's `watch` command rebuilds and restarts Spin applications whenever files change. You can use the `spin watch` command in place of the `spin build` and `spin up` commands, to build, run and then keep your Spin application running without manual intervention while staying on the latest code and files.

> The `watch` command accepts valid `spin up` options and passes them through to `spin up` for you when running/rerunning the Spin application.
E.g. `spin watch --listen 127.0.0.1:3001`

By default, Spin watch monitors:

* The application manifest (`spin.toml` file)
* Any files specified in the `component.(id).build.watch` sections of the `spin.toml` file
* Any files specified in the `component.(id).files` sections of the `spin.toml` file
* The files specified in the `component.(id).source` sections of the `spin.toml` file

If any of these change, Spin will rebuild the application if necessary, then restart the application with the new files.

> Spin watch does not consider changes to a file's metadata (file permissions or when it was last modified) as a change.

The following `spin.toml` configuration (belonging to a Spin `http-rust` application) is configured to ensure that the application is both **rebuilt** (via `cargo build --target wasm32-wasi --release`) and **rerun** whenever changes occur in any Rust source (`.rs`) files, the `Cargo.toml` file or the `spin.toml` file, itself. When changes occur in either the Wasm binary file (`target/wasm32-wasi/release/test.wasm`) or the text file (`my-files/changing-file.txt`) the application is only **rerun** using the initial `spin up` command:

<!-- @nocpy -->

 ```toml
[component.test]
// -- snip
files = ["my-files/changing-file.txt"]
source = "target/wasm32-wasi/release/test.wasm"
[component.test.build]
command = "cargo build --target wasm32-wasi --release"
# Example watch configuration for a Rust application
watch = ["src/**/*.rs", "Cargo.toml"]
```

If the `build` section specifies a `workdir`, then `watch` patterns are relative to that directory. Otherwise, `watch` patterns are relative to the directory containing the `spin.toml` file.

If you would prefer Spin watch to only rerun the application (without a rebuild) when changes occur, you can use the `--skip-build` option when running the `spin watch` command.  In this case, Spin will ignore the `component.(id).build.watch` section, and monitor only the `spin.toml`, `component.source` and `component.files`.

The table below outlines exactly which files `spin watch` will monitor for changes depending on how you run the command. `spin watch` uses the configuration found on every component in your application.

| Files                   | `spin watch` monitors for changes              | `spin watch --skip-build` monitors for changes |
| ----------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Application manifest `spin.toml`   | Yes                                 | Yes                                            |
| Component `build.watch` | Yes                                            | No                                             |
| Component `files`       | Yes                                            | Yes                                            |
| Component `source`      | No (Yes if the component has no build command) | Yes  

Spin watch waits up to 100 milliseconds before responding to filesystem events, then processes all events that occurred in that interval together. This is so that if you make several changes close together (for example, using a Save All command), you get them all processed in one rebuild/reload cycle, rather than going through a cycle for each one. You can override the interval by passing in the `--debounce` option; e.g. `spin watch --debounce 1000` will make Spin watch respond to filesystem events at most once per second.

> Note: If the build step (`spin build`) fails, `spin up` will not be re-run, and the previous version of the app will remain.

Passing the `--clear` flag clears the screen anytime a rebuild or rerun occurs. Spin watch does not clear the screen between rebuild and rerun as this provides you with an opportunity to see any warnings.

For additional information about Spin's `watch` feature, please see the [Spin watch - live reload for Wasm app development](https://www.fermyon.com/blog/spin-watch-live-reloading) blog article.

> The application manifests shown in the blog post are the version 1 manifest, but the content applies equally to the version 2 format. 

## Splitting an Application Across Environments

You can run a subset of the components in an application by using the `--component-id` (`-c`) flag. Set the flag multiple times to select multiple components.

> This is an experimental feature. Unlike stable features, it may change even between minor versions.

This supports _selective deployment_ - that is, splitting an application across environments while still distributing it as a single unit. For example, suppose your application contains the following layers:

* A front end which handles browser and API requests, which you want to run in edge data centres close to users
* A database backend which must be run in a single central location
* An AI service which requires an LLM model to be loaded onto the hardware

You could deploy the application across the environments by using `--component-id`. For example:

<!-- @nocpy -->

```console
# on the US data centre edge nodes
$ spin up -f registry.example.com/app:1.1.0 -c ui -c api -c assets

# on the European data centre edge nodes
$ spin up -f registry.example.com/app:1.1.0 -c ui -c api -c assets 

# on the European data centre core nodes
$ spin up -f registry.example.com/app:1.1.0 -c database

# in the LLM environment
$ spin up -f registry.example.com/app:1.1.0 -c chat-engine -c sentiment-analyzer
```

> In practice you'd set these commands up in a scheduler or orchestrator rather than typing them interactively - or, more likely, use a selection-aware scheduler such as [SpinKube](https://www.spinkube.dev/) rather than running `spin up` directly.

If you run a subset which includes a component that uses [local service chaining](./http-outbound#local-service-chaining), then you must also include all chaining targets in the subset - Spin checks this at load time.  [Self-requests](./http-outbound#making-http-requests-within-an-application) will work only if the target route maps to a component in the subset, but this is not checked at load time - instead, self-requests to unselected components will fail at request time with 404 Not Found.

## The Always Build Option

Some people find it frustrating having to remember to build their applications before running `spin up`. If you want to _always_ build your projects when you run them, set the `SPIN_ALWAYS_BUILD` environment variable in your profile or session. If this is set, `spin up` runs [`spin build`](build) before starting your applications.

## Next Steps

- Learn how to [create and update a Spin application](writing-apps)
- Learn about how to [configure your application at runtime](dynamic-configuration)
- See how to [package and distribute your application](registry-tutorial)
- Try deploying your application to run in the [Fermyon Cloud](/cloud/quickstart)
