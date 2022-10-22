title = "Persistent Data: PostgreSQL"
template = "cloud_main"
date = "2022-01-01T00:00:01Z"
[extra]

---

## PostgreSQL

[PostgreSQL](https://www.postgresql.org/), is a powerful, open-source object-relational database system that has earned a strong reputation for reliability, robustness and performance. This tutorial will implement a persistent storage solution for Fermyon Cloud, using PostgreSQL. In this tutorial, we will be using [ElephantSQL](https://www.elephantsql.com/plans.html)'s free PostgreSQL service.

## Spin and Fermyon Cloud

First, you need to have Spin installed on your computer. Please use the official Fermyon Cloud Quickstart to both [install](https://developer.fermyon.com/cloud/quickstart/#install-spin) Spin and also [log in](https://developer.fermyon.com/cloud/quickstart/#log-in-to-the-fermyon-cloud) to Fermyon Cloud.

## Using Spin Application Templates

The Spin CLI facilitates the creation of new Spin applications through the use of application templates. You can install Spin application templates using the [official Spin CLI documentation](https://developer.fermyon.com/cloud/cli-reference/#templates). The template we are interested in, for this tutorial, is the experimental `http-csharp` template. We can go ahead and install it using the following command:

```bash
spin templates install --git https://github.com/fermyon/spin-dotnet-sdk --branch main --update
```

The output from the command above will be similar to the following:

```bash
Copying remote template source
Installing template http-csharp...
Installed 1 template(s)

+------------------------------------------------------------+
| Name          Description                                  |
+============================================================+
| http-csharp   HTTP request handler using C# (EXPERIMENTAL) |
+------------------------------------------------------------+
```

## Creating Our New Spin Application

The official Spin CLI documentation also has instructions on how to [create a new Spin application](https://developer.fermyon.com/cloud/cli-reference/#new), from an existing template. Using the docs as a reference, we can perform the following:

```bash
spin new http-csharp httpCSharpApplication
Project description: A new http-csharp spin application
HTTP base: /
HTTP path: /data
```

## CSharp

```csharp
using Fermyon.Spin.Sdk;
using System.Net;
using System.Text;

namespace httpCSharpApplication;

public static class Handler {
  [HttpHandler]
  public static HttpResponse HandleHttpRequest(HttpRequest request) {
    if (request.Url == Warmup.DefaultWarmupUrl) {
      return new HttpResponse();
    }

    var connectionString = "user=username password=password dbname=databasename host=127.0.0.1";
    var result = PostgresOutbound.Query(connectionString, "SELECT * FROM myTable");

    var responseText = new StringBuilder();

    responseText.AppendLine($"Got {result.Rows.Count} row(s)");
    responseText.AppendLine($"COL: [{String.Join(" | ", result.Columns.Select(FmtCol))}]");

    string FmtEntry(DbValue v) {
      return v.Value() switch {
        null => "<DBNULL>",
          var val => val.ToString() ?? "<NULL>",
      };
    }

    foreach(var row in result.Rows) {
      responseText.AppendLine($"ROW: [{String.Join(" | ", row.Select(FmtEntry))}]");
    }

    return new HttpResponse {
      StatusCode = HttpStatusCode.OK,
        BodyAsString = responseText.ToString(),
    };
  }
  private static string FmtCol(PgColumn c) {
    return $ "{c.Name} ({c.DataType})";
  }
}
```

## Wizer

Wizer is required to successfully build this application. Please go ahead and install Wizer using the following command:

```bash
cargo install wizer --all-features
```

## Spin Build

To build the application, use the following command:

```bash
spin build
```

## Spin Deploy

To deploy the application, use the deploy command:

```bash
spin deploy
```

The above deploy command will produce similar output to the following:

```bash
Deployed httpCSharpApplication version 1.0.0+XXXXXXXX
Available Routes:
  http_c_sharp_application: https://httpcsharpapplication-XXXXXXXX.fermyon.app/data
```

Visiting the above URL will show your data in the browser's body.