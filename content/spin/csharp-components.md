title = "Building Spin Components in C#"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]

---


## Building Spin Components in C#

C# is one of the most widely used programming languages. Therefore, Spin provides support for building WebAssembly (Wasm) components in C# through an experimental .NET SDK. This allows you to build web applications, send HTTP requests and read/update databases. 

This guide assumes you are familiar with the C# programming language and the concept of WebAssembly. If you are interested in reading more about .NET and Wasm please also see our blog article [WebAssembly for .NET Developers: Introducing the Spin .NET SDK](https://www.fermyon.com/blog/webassembly-for-dotnet-developers-spin-sdk-intro).

### Prerequisites

To create a new .NET application, you’ll first need to install .NET 7 Preview 5 or above, Wizer and the Spin http-csharp template. Ensure Wizer is on your place or install it using `cargo install wizer --all-features`. Additionally, ensure you have the latest version of spin installed.

Install the http-csharp templates as follows:

```bash
spin templates install --git https://github.com/fermyon/spin-dotnet-sdk --branch main --update
```

If you already have this template installed, you can upgrade it with `spin templates upgrade`. 

Then to create an application based on this template, input the following into your chosen repository:

```bash
spin new http-csharp
```

After following resulting prompts, you should now have an application repository which includes a `spin.toml, handler.cs, Project.csproj` file and more.

To ensure everything is set up correctly, run `spin build --up`. 

### C# HTTP Handler

In Spin, a trigger handler - such as an HTTP request handler - is a function which receives event data as a structured argument. In traditional C# terms, it’s a public method in a DLL.

To tell Spin which function in the DLL is the handler entry point, the SDK provides the `HttpHandler`attribute. So an HTTP handler function looks like this:

```csharp
using System.Net;
using Fermyon.Spin.Sdk;

namespace Microservice;

public static class Handler
{
    [HttpHandler]
    public static HttpResponse HandleHttpRequest(HttpRequest request)
    {
        return new HttpResponse
        {
            StatusCode = HttpStatusCode.OK,
            BodyAsString = "Hello from .NET",
        };
    }
}
```

Within this function, any .NET code can be written (subject to current WASI limitations). Here’s an example that echoes some of the request information:

```csharp
using System.Net;
using System.Text;
using Fermyon.Spin.Sdk;

namespace EchoService;

public static class Handler
{
    [HttpHandler]
    public static HttpResponse HandleHttpRequest(HttpRequest request)
    {
        var responseText = new StringBuilder();

        responseText.AppendLine($"Called with method {request.Method} on {request.Url}");
        foreach (var h in request.Headers)
        {
            responseText.AppendLine($"Header '{h.Key}' had value '{h.Value}'");
        }

        var bodyInfo = request.Body.HasContent() ?
            $"The body was: {request.Body.AsString()}\n" :
            "The body was empty\n";
        responseText.AppendLine(bodyInfo);

        return new HttpResponse
        {
            StatusCode = HttpStatusCode.OK,
            Headers = new Dictionary<string, string>
            {
                { "Content-Type", "text/plain" },
            },
            BodyAsString = responseText.ToString(),
        };
    }
}
```