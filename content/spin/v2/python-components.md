title = "Building Spin Components in Python"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/python-components.md"

---
- [Spin's Python HTTP Request Handler Template](#spins-python-http-request-handler-template)
- [Structure of a Python Component](#structure-of-a-python-component)
- [A Simple HTTP Components Example](#a-simple-http-components-example)
  - [Building and Running the Application](#building-and-running-the-application)
- [An Outbound HTTP Example](#an-outbound-http-example)
  - [Configuration](#configuration)
  - [Building and Running the Application](#building-and-running-the-application-1)
- [An Outbound Redis Example](#an-outbound-redis-example)
  - [Configuration](#configuration-1)
  - [Building and Running the Application](#building-and-running-the-application-2)
- [Storing Data in the Spin Key-Value Store](#storing-data-in-the-spin-key-value-store)
- [Storing Data in SQLite](#storing-data-in-sqlite)
- [AI Inferencing From Python Components](#ai-inferencing-from-python-components)

With <a href="https://www.python.org/" target="_blank">Python</a> being a very popular language, Spin provides support for building components with Python; [using an experimental SDK](https://github.com/fermyon/spin-python-sdk). The development of the Python SDK is continually being worked on to improve user experience and also add new features. 

> This guide assumes you have Spin installed. If this is your first encounter with Spin, please see the [Quick Start](quickstart), which includes information about installing Spin with the Python templates, installing required tools, and creating Python applications.

> This guide assumes you are familiar with the Python programming language, but if you are just getting started, be sure to check out <a href="https://docs.python.org/3/" target="_blank">the official Python documentation</a> and comprehensive <a href="https://docs.python.org/3/reference/" target="_blank">language reference</a>.

[**Want to go straight to the Spin SDK reference documentation?**  Find it here.](https://fermyon.github.io/spin-python-sdk/)

## Spin's Python HTTP Request Handler Template

Spin's Python HTTP Request Handler Template can be installed from [spin-python-sdk repository](https://github.com/fermyon/spin-python-sdk/tree/main/) using the following command:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-python-sdk --update
```

The above command will install the `http-py` template and produce an output similar to the following:

<!-- @nocpy -->

```text
Copying remote template source
Installing template http-py...
Installed 1 template(s)

+---------------------------------------------+
| Name      Description                       |
+=============================================+
| http-py   HTTP request handler using Python |
+---------------------------------------------+
```

**Please note:** For more information about managing `spin templates`, see the [templates section](./cli-reference#templates) in the Spin Command Line Interface (CLI) documentation.

## Structure of a Python Component

A new Python component can be created using the following command:

<!-- @selectiveCpy -->

```bash
$ spin new -t http-py hello-world --accept-defaults
```

This creates a directory of the following structure:

<!-- @nocpy -->

```text
hello-world/
├── app.py
└── spin.toml
└── requirements.txt
```

The `spin.toml` file will look similar to the following:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "hello-world"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = ""

[[trigger.http]]
route = "/..."
component = "hello-world"

[component.hello-world]
source = "app.wasm"
[component.hello-world.build]
command = "componentize-py -w spin-http componentize -p . -p ../../src app -o app.wasm"
```

The `requirements.txt` by default contains the references to the `spin-sdk` and `componentie-py` packages. 

## A Simple HTTP Components Example

In Spin, HTTP components are triggered by the occurrence of an HTTP request and must return an HTTP response at the end of their execution. Components can be built in any language that compiles to WASI. If you would like additional information about building HTTP applications you may find [the HTTP trigger page](./http-trigger.md) useful.

Building a Spin HTTP component using the Python SDK means implementing the [`IncomingHandler`](https://fermyon.github.io/spin-python-sdk/wit/exports/index.html#spin_sdk.wit.exports.IncomingHandler) class:

```python
from spin_sdk.http import simple
from spin_sdk.http.simple import Request, Response

class IncomingHandler(simple.IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        return Response(
            200,
            {"content-type": "text/plain"},
            bytes("Hello from the Python SDK!", "utf-8")
        )
```

The important things to note in the implementation above:

- the `handle_request` method is the entry point for the Spin component.
- the component returns a `spin_sdk.http.simple.Response`.

The following snippet shows how you can access parts of the request e.g. the `request.method` and the `request.body`:

```python
import json
from spin_sdk.http import simple
from spin_sdk.http.simple import Request, Response

class IncomingHandler(simple.IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        # Access the request.method
        if request.method == 'POST':
            # Read the request.body as a string
            json_str = request.body.decode('utf-8')
            # Create a JSON object representation of the request.body
            json_object = json.loads(json_str)
            # Access a value in the JSON object
            name = json_object['name']
            # Print the variable to console logs
            print(name)
            # Print the type of the variable to console logs
            print(type(name))
            # Print the available methods of the variable to the console logs
            print(dir(name))
        return Response(200,
                    {"content-type": "text/plain"},
                    bytes(f"Practicing reading the request object", "utf-8"))
```

### Building and Running the Application

All you need to do is run the `spin build` command from within the project's directory; as shown below:

<!-- @selectiveCpy -->

```bash
$ cd hello-world
$ spin build
```

Essentially, we have just created a new Spin compatible module which can now be run using the `spin up` command, as shown below:

<!-- @selectiveCpy -->

```bash
$ spin up
```

With Spin running our application in our terminal, we can now go ahead (grab a new terminal) and call the Spin application via an HTTP request:

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000/hello

HTTP/1.1 200 OK
content-type: text/plain
content-length: 25

Hello from the Python SDK!
```

> **Please note:** All examples from this documentation page can be found in [the Python SDK repository on GitHub](https://github.com/fermyon/spin-python-sdk/tree/main/examples). If you are following along with these examples and don't get the desired result perhaps compare your own code with our previously built examples (mentioned above). Also please feel free to reach out on [Discord](https://discord.gg/AAFNfS7NGf) if you have any questions or need any additional support. 

## An Outbound HTTP Example

This next example will create an outbound request, to obtain a random fact about animals, which will be returned to the calling code. If you would like to try this out, you can go ahead and update your existing `app.py` file from the previous step; using the following source code:

```python
from spin_sdk.http import simple
from spin_sdk.http.simple import Request, Response, send

class IncomingHandler(simple.IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        try:
            url = request.headers["url"]
        except KeyError:
            return Response(
                400,
                {"content-type": "text/plain"},
                bytes("Please specify `url` header", "utf-8")
            )

        return send(Request("GET", url, {}, None))
```

### Configuration

The Spin framework protects your code from making outbound requests to just any URL. For example, if we try to run the above code **without any additional configuration**, we will correctly get the following error `AssertionError: HttpError::DestinationNotAllowed`. To allow our component to request the `random-data-api.fermyon.app` domain, all we have to do is add that domain to the specific component of the application that is making the request. Here is an example of an updated `spin.toml` file where we have added `allowed_outbound_hosts`:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "hello-world"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = ""

[[trigger.http]]
route = "/..."
component = "hello-world"

[component.hello-world]
source = "app.wasm"
allowed_outbound_hosts = ["https://random-data-api.fermyon.app"]
[component.hello-world.build]
command = "spin py2wasm app -o app.wasm"
```

### Building and Running the Application

If we re-build the application with this new configuration and re-run, we will get our new animal fact:

<!-- @selectiveCpy -->

```bash
$ spin build
$ spin up
```

A new request now correctly returns an animal fact from the API endpoint.

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000/hello

HTTP/1.1 200 OK
content-type: text/plain
content-length: 130

Here is an animal fact: {"timestamp":1684299253331,"fact":"Reindeer grow new antlers every year"}   
```

## An Outbound Redis Example

In this final example, we talk to an existing Redis instance. You can find the official [instructions on how to install Redis here](https://redis.io/docs/getting-started/installation/). We also gave a quick run-through on setting up Redis with Spin in our previous article called [Persistent Storage in Webassembly Applications](https://www.fermyon.com/blog/persistent-storage-in-webassembly-applications), so please take a look at that blog if you need a hand.

### Configuration

After installing Redis on localhost, we add two entries to the `spin.toml` file:

* `variables = { redis_address = "redis://127.0.0.1:6379" }` externalizes the URL of the server to access
* `allowed_outbound_hosts = ["redis://127.0.0.1:6379"]` enables network access to the host and port where Redis is running

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "hello-world"
version = "0.1.0"
authors = ["Your Name <your-name@example.com>"]
description = ""

[[trigger.http]]
route = "/..."
component = "hello-world"

[component.hello-world]
id = "hello-world"
source = "app.wasm"
variables = { redis_address = "redis://127.0.0.1:6379" }
allowed_outbound_hosts = ["redis://127.0.0.1:6379"]
[component.hello-world.build]
command = "spin py2wasm app -o app.wasm"
```

If you are still following along, please go ahead and update your `app.py` file one more time, as follows:

```python
from spin_sdk.http import simple
from spin_sdk.http.simple import Request, Response
from spin_sdk import redis

class IncomingHandler(simple.IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        with redis.open(config_get("redis_address").decode) as db:
            db.set( "foo", b"bar")
            value = db.get( "foo")
            db.del( ["testIncr"])
            db.incr( "testIncr")

            db.sadd( "testSets", ["hello", "world"])
            content = db.smembers( "testSets")
            db.srem( "testSets", ["hello"])

            assert value == b"bar", f"expected \"bar\", got \"{str(value, 'utf-8')}\""

    return Response(200,
                    {"content-type": "text/plain"},
                    bytes(f"Executed outbound Redis commands: {request.uri}", "utf-8"))
```

### Building and Running the Application

After we re-build and re-run, again, we can make one final request to our Spin application:

<!-- @selectiveCpy -->

```bash
$ spin build
$ spin up
```

This latest request correctly returns the correct output, in accordance with our Python source code from above:

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000/hello

HTTP/1.1 200 OK
content-type: text/plain
content-length: 40
date = "2023-11-04T00:00:01Z"

Executed outbound Redis commands: /hello
```

If we go into our Redis CLI on localhost we can see that the value `foo` which was set in the Python source code ( `redis_set(redis_address, "foo", b"bar")` ) is now correctly set to the value of `bar`:

<!-- @nocpy -->

```bash
redis-cli
127.0.0.1:6379> get foo
"bar"
```

## Storing Data in the Spin Key-Value Store

Spin has a key-value store built in. For information about using it from Python, see [the key-value store API guide](kv-store-api-guide).

## Storing Data in SQLite

For more information about using SQLite from Python, see [SQLite storage](sqlite-api-guide).

## AI Inferencing From Python Components

For more information about using Serverless AI from Python, see the [Serverless AI](serverless-ai-api-guide) API guide.
