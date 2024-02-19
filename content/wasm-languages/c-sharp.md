date = "2022-01-12T00:23:27Z"
title = "C# (and .NET) in WebAssembly"
description = "C# (C-sharp) is backed by the .NET (dotnet) ecosystem, whose Wasm support is rapidly maturing."
tags = ["c#", "csharp", "dotnet", ".net", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2022-03-10T21:50:50Z"

---

- [C# and .NET in WebAssembly](#c-and-net-in-webassembly)
	- [Available Implementations](#available-implementations)
	- [Pros and Cons](#pros-and-cons)
	- [Example](#example)
	- [Learn More](#learn-more)

# C# and .NET in WebAssembly

The .NET (aka dotnet) ecosystem supports a variety of languages, including C# (C sharp) and ASP.NET. Programs that target .NET are compiled to an intermediary bytecode format that runs in the .NET Common Language Runtime (CLR). This makes .NET an example of a [virtual machine language](/blog/scripts-vs.compiled-wasm.md).

## Available Implementations

The .NET ecosystem has long had support for browser-side WebAssembly via the [Blazor toolkit](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor).

The team at Microsoft is rapidly building out a number of WebAssembly tools. In 2022, it seems reasonable to expect that Microsoft will have new tooling for WebAssembly. C# compiled using the .NET toolchain will have access to these WebAssembly features.

At the time of this writing, the closest we have seen to a full WASI runtime is Steve Sanderson's example [.NET WASI Runtime](https://github.com/SteveSandersonMS/dotnet-wasi-runtime).

In addition, browser-based support also seems to be available in the [Elements compiler](https://www.elementscompiler.com/elements/)

## Pros and Cons

Things we like:

- Blazor is enjoying a surge of popularity in the browser
- The .NET WASI Runtime looks excellent

For the most part, though, it is too early to speculate on the rest of the .NET tooling.

## Example

Our example uses the [.NET WASI Runtime](https://github.com/SteveSandersonMS/dotnet-wasi-runtime). This is a preview and requires the supporting tools and build steps described in that repository.

>> All of our examples follow [a documented pattern using common tools](/wasm-languages/about-examples).

The example requires a project file `ConsoleApp.csproj` that imports the .NET WASI SDK:

```xml
<Project Sdk="Microsoft.NET.Sdk">

    <!--
        As this is a preview, you will need to specify the path at which you
        checkout out the dotnet-wasi-runtime repo.
    -->
	<Import Project="path\to\Wasi.Sdk\build\Wasi.Sdk.props" />

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>

	<ItemGroup>
		<ProjectReference Include="path\to\src\Wasi.Sdk\Wasi.Sdk.csproj" ReferenceOutputAssembly="false" />
	</ItemGroup>

	<Import Project="path\to\Wasi.Sdk\build\Wasi.Sdk.targets" />

</Project>
```

Now we can write a simple C# program using WASI. Here is the text of `Program.cs`:

```csharp
Console.WriteLine("Content-Type: text/plain");
Console.WriteLine();
Console.WriteLine("Hello, World");
```

To compile this, run the .NET 7 command line:

```console
dotnet build
```

This produces a `ConsoleApp.wasm` file in the `bin/Debug/net7.0` directory. We can execute that with Wasmtime:

```
$ wasmtime ./bin/Debug/net7.0/ConsoleApp.wasm
Content-Type: text/plain

Hello, World
```

To run this using Wagi, we need to create a simple `modules.toml`:

```toml
[[module]]
route = "/"
module = "bin/Debug/net7.0/ConsoleApp.wasm"
```

Then we can run Wagi:

```console
$ wagi -c modules.toml
```

And using Curl or a web browser, we can hit `http://localhost:3000` and see the output:

```console
$ curl localhost:3000
Hello, World
```

## Learn More

Here are some great resources:

- [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor)
- The .NET community call [previewed](https://www.youtube.com/watch?v=8gwSU3oaMV8&list=PLdo4fOcmZ0oX-DBuRG4u58ZTAJgBAeQ-t&t=3670s) `wasm32-wasi` with ASP.NET