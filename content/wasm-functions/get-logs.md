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

By default, this command provides logs for the application your workspace is [linked to](app-linking). If your workspace isn't linked to an application, you can either specify the application name using the `--app-name` flag for a one-time connection or run `spin aka link` to link your workspace to an application running on _Fermyon Wasm Functions_.

<!-- @selectiveCpy -->

```console
$ spin aka logs --app-name hello-fermyon-wasm-functions
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

- [Managing Personal Access Tokens (PATs)](managing-personal-access-tokens)
