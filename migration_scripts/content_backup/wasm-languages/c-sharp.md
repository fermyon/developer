date = "2024-02-18T01:01:01Z"
title = "C# (and .NET) in WebAssembly"
description = "C# (C-sharp) is backed by the .NET (dotnet) ecosystem, whose Wasm support is rapidly maturing."
tags = ["c#", "csharp", "dotnet", ".net", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-03-10T21:50:50Z"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/c-sharp.md"

---

The .NET (aka dotnet) ecosystem supports a variety of languages, including C# (C sharp) and ASP.NET. Programs that target .NET are compiled to an intermediary bytecode format that runs in the .NET Common Language Runtime (CLR). This makes .NET an example of a [virtual machine language](https://www.fermyon.com/blog/scripts-vs-compiled-wasm).

An overview [blog post of the state of Wasm, dotnet, and the cloud was published December 2023](https://devblogs.microsoft.com/dotnet/extending-web-assembly-to-the-cloud/).

The roadmap to full Wasm and Component Model support in dotnet is tracked in this [GitHub Issue](https://github.com/dotnet/runtime/issues/96419), which is attached to dotnet's 9.0.0 milestone, to be released in November 2024.

## Available Implementations

The .NET ecosystem has long had support for browser-side WebAssembly via the [Blazor toolkit](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor).

An experiment for WASI support in dotnet [.NET WASI SDK](https://github.com/SteveSandersonMS/dotnet-wasi-sdk) exists, on top of which Fermyon created an [Spin SDK for dotnet](https://github.com/fermyon/spin-dotnet-sdk). These can be used to try out Spin and C# using dotnet 8.

## Pros and Cons

Things we like:

- Blazor is enjoying a surge of popularity in the browser
- The .NET WASI Runtime looks excellent
- Microsoft is investing in Wasi support in dotnet, and have a roadmap for dotnet 9.0.0

The roadmap for dotnet to get NativeAOT support, and have the standard library support WASI 0.2.0 looks good, with an experimental release to be shipped with dotnet 9.0.0 in November 2024.

## Example

There are two examples we want to show for dotnet:
1. An example building a [Spin component using dotnet and C#](#spin-dotnet-application)
2. An example building a [WebAssembly WASI module](#webassembly-wasi-module)

### Spin Dotnet Application

Our first example uses the [Spin SDK for dotnet](https://github.com/fermyon/spin-dotnet-sdk). This is an experimental preview and requires the [prerequisites](https://github.com/fermyon/spin-dotnet-sdk#prerequisites) described in the repo.

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

After having install the [required tooling](https://github.com/fermyon/spin-dotnet-sdk#prerequisites), install the templates for a Spin HTTP component using C#:

<!-- @selectiveCpy -->

```shell
$ spin templates install --git https://github.com/fermyon/spin-dotnet-sdk
Copying remote template source
Installing template http-csharp...
Installed 1 template(s)

+------------------------------------------------------------+
| Name          Description                                  |
+============================================================+
| http-csharp   HTTP request handler using C# (EXPERIMENTAL) |
+------------------------------------------------------------+
```

Next, let's create a new Spin application using that template:

<!-- @selectiveCpy -->

```shell
$ spin new -t http-csharp
Enter a name for your new application: dotnet-spin
Project description: A Spin application written in C#
HTTP path: /...
```

Enter the newly created directory. If you used `dotnet-spin` as the name, that wil be the name of the directory.

```shell
$ cd dotnet-spin/
```

And you can now use the `spin build --up` command to build the WebAssembly, and run (`up`) the Spin application:

<!-- @selectiveCpy -->

```shell
$ spin build --up
Building component dotnet-spin with `dotnet build -c Release`
MSBuild version 17.8.3+195e7f5a3 for .NET
  Determining projects to restore...
  Restored /Users/me/code/temp/dotnet-spin/Project.csproj (in 258 ms).
  Project -> /Users/me/code/temp/dotnet-spin/bin/Release/net8.0/DotnetSpin.dll
  1/26 Bundling DotnetSpin.dll...
  2/26 Bundling System.Collections.Concurrent.dll...
  3/26 Bundling Fermyon.Spin.Sdk.dll...
  ...
  26/26 Bundling System.Text.Encoding.Extensions.dll...
  DotnetSpin -> /Users/me/code/temp/dotnet-spin/bin/Release/net8.0/DotnetSpin.wasm
  Running wizer to preinitialize bin/Release/net8.0/DotnetSpin.wasm...

Build succeeded.
    0 Warning(s)
    0 Error(s)

Time Elapsed 00:00:11.51
Finished building all Spin components
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  dotnet-spin: http://127.0.0.1:3000 (wildcard)
```

Open a new prompt in your terminal, and send a request to the Spin application:

<!-- @selectiveCpy -->

```shell
$ curl localhost:3000
Hello from .NET
```

Congratulations, you've built a WebAssembly module using dotnet and Spin!

### WebAssembly WASI Module

This second example uses the dotnet console project template to build a WebAssembly WASI module, which can be run using a WebAssembly runtime like [Wasmtime](https://wasmtime.dev/).

For this example, the prerequisites are:
- [Dotnet 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Wasmtime](https://docs.wasmtime.dev/cli-install.html) - tested with `wasmtime-cli 21.0.0 (aaa39cb71 2024-05-20)`

Let's go ahead and create a new dotnet console project:

<!-- @selectiveCpy -->

```shell
$ dotnet new console --name dotnet-wasi
The template "Console App" was created successfully.

Processing post-creation actions...
Restoring /Users/me/code/temp/dotnet-wasi/dotnet-wasi.csproj:
  Determining projects to restore...
  Restored /Users/me/code/temp/dotnet-wasi/dotnet-wasi.csproj (in 84 ms).
Restore succeeded.
```

Next, we'll change to the directory created, and add `Wasi.Sdk` to the project.

<!-- @selectiveCpy -->

```shell
$ cd dotnet-wasi

$ dotnet add package Wasi.Sdk
Determining projects to restore...
...
log  : Restored /Users/me/code/temp/dotnet-wasi/dotnet-wasi.csproj (in 95 ms).
```

Adding the `Wasi.Sdk` package ensures that we'll be building a WebAssembly, so let's go ahead and do so:

<!-- @selectiveCpy -->

```shell
$ dotnet build
MSBuild version 17.8.3+195e7f5a3 for .NET
  Determining projects to restore...
  All projects are up-to-date for restore.
  dotnet-wasi -> /Users/me/code/temp/dotnet-wasi/bin/Debug/net8.0/dotnet-wasi.dll
  1/10 Bundling dotnet-wasi.dll...
  2/10 Bundling System.Memory.dll...
  ...
  10/10 Bundling System.Private.Uri.dll...
  dotnet-wasi -> /Users/me/code/temp/dotnet-wasi/bin/Debug/net8.0/dotnet-wasi.wasm

Build succeeded.
    0 Warning(s)
    0 Error(s)
```

And let's use Wasmtime to run the WebAssembly:

<!-- @selectiveCpy -->

```shell
$ wasmtime run bin/Debug/net8.0/dotnet-wasi.wasm
Hello, World!
```

## Learn More

Here are some great resources:

- [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor)
- Steven Sanderson from Microsoft has release a few videos with some great experiments with dotnet and Wasm. Check out his [YouTube channel](https://www.youtube.com/@stevensandersonuk).