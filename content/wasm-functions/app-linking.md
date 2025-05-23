title = "Link Applications"
template = "functions_main"
date = "2025-01-16T00:22:56Z"
enable_shortcodes = true

---
- [Inspecting Your Workspace](#inspecting-your-workspace)
- [Linking Your Workspace](#linking-your-workspace)
- [Running Commands](#running-commands)
- [Unlinking Your Workspace](#unlinking-your-workspace)
- [Next Steps](#next-steps)

Your local workspace can be linked to an application running in _Fermyon Wasm Functions_. This is a convenience so that you don't always have to specify the `--app-name` when running commands.

{{ details "What is a workspace?" "A workspace is a directory on your local machine that contains the Spin application code and manifest file. It is where you develop and test your application before deploying it to _Fermyon Wasm Functions_. Any child directory of where the Spin manifest is located is also considered part of the workspace." }}

## Inspecting Your Workspace

You can see information about the current workspace by navigating to the directory where your Spin application is located and running the following command:

<!-- @selectiveCpy -->

```console
$ spin aka info
```

Among other things this command will tell if your workspace is linked to an application on _Fermyon Wasm Functions_ and if so which one.

<!-- @nocpy -->

```console
Auth Info
  Accounts: your-account
Workspace Info
  Root dir: /Users/user/src/hello-spin
  Linked app: hello-spin
```

When you run `spin aka deploy` for the first time, it will automatically linked your workspace to the application you just deployed.

## Linking Your Workspace

If your workspace is not linked to an application, you can link it by running the following command:

<!-- @selectiveCpy -->

```console
$ spin aka link
```

This command will prompt you to select an application to link to. You can also specify the application name directly:

<!-- @selectiveCpy -->

```console
$ spin aka link --app-name <app-name>
```

This will link your workspace to the specified application. You can verify that the workspace is linked by running the `spin aka info` command again.

## Running Commands

Now anytime you run a command in this workspace _Fermyon Wasm Functions_ will automatically assume that you want to run it against the linked application. For example, if you run `spin aka deploy` it will upgrade that application. If you run `spin aka logs`, it will show the logs for that application and so on.

## Unlinking Your Workspace

If you wish to unlink your workspace from the currently linked application, you can do so by running the following command:

<!-- @selectiveCpy -->

```console
$ spin aka unlink
```

You can run `spin aka info` again to verify that the workspace is no longer linked to an application.

{{ details "Note" "Unlinking your workspace does not delete the application on _Fermyon Wasm Functions_. It simply removes the link between your local workspace and the application." }}

## Next Steps

- [List and Inspect Applications](list-and-inspect)
