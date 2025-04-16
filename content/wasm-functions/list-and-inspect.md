title = "List and Inspect Applications"
template = "functions_main"
date = "2025-01-16T00:22:56Z"
enable_shortcodes = true

---
- [List Your Applications](#list-your-applications)
- [Inspecting an Application](#inspecting-an-application)
- [Next Steps](#next-steps)

This articles illustrates how to list and inspect Spin applications deployed to your _Fermyon Wasm Functions_ account using the [`spin aka`](deploy/#install-the-aka-plugin) plugin.

## List Your Applications

To list all Spin applications deployed to your _Fermyon Wasm Functions_ account, use the `spin aka apps list` command as shown in the following snippet:

<!-- @selectiveCpy -->

```console
$ spin aka apps list
```

Depending on which apps you have deployed to your _Fermyon Wasm Functions_ account, the actual output will differ from the output shown here:

<!-- @nocpy -->

```console
hello-fermyon-wasm-functions
validate-jwt-tokens
query-external-database
```

By default, `spin aka apps list` will print the name of each Spin application deployed to your _Fermyon Wasm Functions_ account as plain text. Alternatively, you could add the `--format` flag and change the output format to `JSON`:

<!-- @selectiveCpy -->

```console
$ spin aka apps list --format json
```

This time, you'll receive the list of Spin applications as `JSON` array:

<!-- @nocpy -->

```json
[
  "hello-fermyon-wasm-functions",
  "validate-jwt-tokens",
  "query-external-database"
]
```

You can also use the `--verbose` flag to learn more about your apps. Below, you'll see the Spin app names alongside their respective app identifiers:

```console
$ spin aka apps list --verbose
hello-fermyon-wasm-functions(25a5fd1e-d476-40fd-bc54-6cee0e846540)
validate-jwt-tokens(8d8ffd7d-57fe-4c0e-b982-251542db8792)
query-external-database(b6cc1427-392c-4f96-859d-bb4d0adc216c)
```

## Inspecting an Application

Use the `spin aka apps info` command, to gather fundamental information about a Spin application deployed to your _Fermyon Wasm Functions_ account. The command requires the name of the desired application to be passed as an argument to the `--name` flag:

<!-- @selectiveCpy -->

```console
$ spin aka apps info --name hello-fermyon-wasm-functions
```

<!-- @nocpy -->

```console
Name: hello-fermyon-wasm-functions (25a5fd1e-d476-40fd-bc54-6cee0e846540)
URL: https://25a5fd1e-d476-40fd-bc54-6cee0e846540.aka.fermyon.tech/
Created at: 2025-04-15 17:22:55 UTC
Invocations: 29 in the past 7 days
```

As you can see, you'll also receive the public origin, which could be used to access the Spin application. Similar to the `spin aka apps list` command, you could add the `--format json` flag to make the command return fundamental information about a particular application as `JSON` object:

<!-- @selectiveCpy -->
```console
$ spin aka apps info --name hello-fermyon-wasm-functions --format json
```

<!-- @nocpy -->

```json
{
  "id": "25a5fd1e-d476-40fd-bc54-6cee0e846540",
  "name": "hello-fermyon-wasm-functions",
  "url": "https://25a5fd1e-d476-40fd-bc54-6cee0e846540.aka.fermyon.tech/",
  "created_at": "2025-04-15 17:22:55 UTC",
  "invocations": "29 in the past 7 days"
}
```

## Next Steps

- [Get Application Logs](get-logs)