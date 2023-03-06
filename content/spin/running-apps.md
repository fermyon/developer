title = "Running Spin Applications"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/spin/blob/main/docs/content/running-apps.md"

---
- [Specifying the Application to Run](#specifying-the-application-to-run)
  - [Testing HTTP Applications](#testing-http-applications)
- [Application Output](#application-output)
- [Persistent Logs](#persistent-logs)
- [Trigger-Specific Options](#trigger-specific-options)
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

## Next Steps

- Learn how to [create and update a Spin application](writing-apps)
- Learn about how to [configure your application at runtime](dynamic-configuration)
- See how to [package and distribute your application](spin-oci)
- Try deploying your application to run in the [Fermyon Cloud](/cloud/quickstart)
