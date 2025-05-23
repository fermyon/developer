title = "Delete Applications"
template = "functions_main"
date = "2025-01-16T00:22:56Z"
enable_shortcodes = true

---
- [Find the Application You Want to Delete](#find-the-application-you-want-to-delete)
- [Delete Your Application](#delete-your-application)
- [Next Steps](#next-steps)

It’s easy to delete an Spin application from _Fermyon Wasm Functions_. This can be done in just a few steps using the `aka` plugin for `spin` CLI.

## Find the Application You Want to Delete

First, you may want to find the application you want to delete, you could use the `spin aka app list` command to retrieve a list of all Spin applications deployed to your _Fermyon Wasm Functions_ account:

<!-- @selectiveCpy -->

```console
$ spin aka app list
```

<!-- @nocpy -->

```console
hello-fermyon-wasm-functions
validate-jwt-tokens
query-external-database
```

## Delete Your Application

Use the `spin aka app delete` command to delete a particular Spin application from your _Fermyon Wasm Functions_ account:

<!-- @selectiveCpy -->

```console
$ spin aka app delete --app-name validate-jwt-tokens
```

The `spin aka app delete` command, will ask you to confirm deleting the application of choice. Once confirmed, the application will be removed from your _Fermyon Wasm Functions_ account.

<!-- @nocpy -->

```console
Are you sure you want to delete the app 'validate-jwt-tokens' (21077e3b-d632-4df3-921f-f7ebefb9aaca)? yes
Deleted app successfully.
```

That’s all about deleting your Spin Application from _Fermyon Wasm Functions_!

## Next Steps

- Make sure to check the [FAQ and Known Limitations](faq) article
