title = "Get Application Logs"
template = "functions_main"
date = "2025-01-16T00:22:56Z"
enable_shortcodes = true

---

- [Retrieving Logs of Your Application](#retrieving-logs-of-your-application)
- [Next Steps](#next-steps)

Retrieving logs of your Spin applications at runtime is crucial to understand runtime behavior and for gathering insights. 

## Retrieving Logs of Your Application

Use the `spin aka logs` command, to retrieve logs of your Spin application deployed to _Fermyon Wasm Functions_.

If you invoke the command from within the directory of your Spin application (the directory in which your `spin.toml` file is located), it will - by default - load all logs of the current Spin application.

If the command is invoked outside the application directory, or if you want to receive log messages of a particular Spin application running on _Fermyon Wasm Functions_, you must explicitly specify the name of the application using the `--app` flag:

<!-- @selectiveCpy -->

```console
$ spin aka logs --app hello-fermyon-wasm-functions
```

The `spin aka logs` command, will print all log messages to `stdout` as shown here:

<!-- @nocpy -->

```console
2025-01-16 13:31:46 [hello-fermyon-wasm-functions]  2025/01/16 13:31:36 INFO GET https://11077e3b-d632-4df3-921f-f7ebefb9aaca.aka.fermyon.tech/hello: Handled by handle_hello func
2025-01-16 13:31:48 [hello-fermyon-wasm-functions]  2025/01/16 13:31:47 INFO POST https://11077e3b-d632-4df3-921f-f7ebefb9aaca.aka.fermyon.tech/greet: Handled by handle_greet func
2025-01-16 13:31:48 [hello-fermyon-wasm-functions]  2025/01/16 13:31:47 WARN Greet invoked with invalid payload. Will respond with HTTP 400
2025-01-16 13:32:04 [hello-fermyon-wasm-functions]  2025/01/16 13:31:56 INFO POST https://11077e3b-d632-4df3-921f-f7ebefb9aaca.aka.fermyon.tech/greet: Handled by handle_greet func
```

The log messages shown above have been generated using the [`log/slog` package](https://go.dev/blog/slog) by a Spin application written in Go. Technically, everything your Spin application writes to `stdout` and `stderr` will be captured by _Fermyon Wasm Functions_ and made accessible via the `spin aka logs` command. 

## Next Steps

- [Delete an application](delete)