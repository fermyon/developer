title = "Building Spin Components in Python"
template = "spin_main"
date = "2023-03-01T02:00:00Z"

---
- [Spin's Python Plugin](#spins-python-plugin)
- [Spin's Python HTTP Request Handler Template](#spins-python-http-request-handler-template)
- [Structure of a Python Component](#structure-of-a-python-component)
- [A Simple HTTP Components Example](#a-simple-http-components-example)
  - [Building and Running the Application](#building-and-running-the-application)
- [An Outbound HTTP Example](#an-outbound-http-example)
- [An Outbound Redis Example](#an-outbound-redis-example)
  - [Configuration](#configuration)

With <a href="https://www.python.org/" target="_blank">Python</a> being a very popular language, Spin provides support for building components with Python; [using an experimental SDK](https://github.com/fermyon/spin-python-sdk). The development of the Python SDK is continually being worked on to improve user experience and also add new features. 

> This guide assumes you are familiar with the Python programming language, but if you are just getting started, be sure to check out <a href="https://docs.python.org/3/" target="_blank">the official Python documentation</a> and comprehensive <a href="https://docs.python.org/3/reference/" target="_blank">language reference</a>.

**Please note:** There is a blog article [introducing the release of this Spin Python SDK](https://www.fermyon.com/blog/spin-python-sdk) if you are interested in some further reading; in addition to this technical documentation.

## Spin's Python Plugin

To compile Python programs to Spin components, you need to install a Spin plugin called `py2wasm`. The following commands will ensure that you have the latest version of the plugin installed:

<!-- @selectiveCpy -->

```bash
# Fetch all of the latest Spin plugins from the spin-plugins repository
$ spin plugin update
# Install py2wasm plugin
$ spin plugin install py2wasm
```

**Please note:** For more information about managing `spin plugins`, see the [plugins section](https://developer.fermyon.com/common/cli-reference#plugins) in the Spin Command Line Interface (CLI) documentation.

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

**Please note:** For more information about managing `spin templates`, see the [templates section](https://developer.fermyon.com/common/cli-reference#templates) in the Spin Command Line Interface (CLI) documentation.

## Structure of a Python Component

A new Python component can be created using the following command:

<!-- @selectiveCpy -->

```bash
$ spin new http-py hello-world --accept-defaults
```

This creates a directory of the following structure:

<!-- @nocpy -->

```text
hello-world/
├── app.py
├── Pipfile
└── spin.toml
```

The `spin.toml` file will look similar to the following:

<!-- @nocpy -->

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = ""
name = "hello-world"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-world"
source = "app.wasm"
[component.trigger]
route = "/..."
[component.build]
command = "spin py2wasm app -o app.wasm"
```

## A Simple HTTP Components Example

In Spin, HTTP components are triggered by the occurrence of an HTTP request and must return an HTTP response at the end of their execution. Components can be built in any language that compiles to WASI. If you would like additional information about building HTTP applications you may find [the HTTP trigger page](./http-trigger.md) useful.

Building a Spin HTTP component using the Python SDK means writing a single function that takes an HTTP request as a parameter, and returns an HTTP response. Here is an example of the default Python code which the previous `spin new` created for us; a simple example of a request/response:

<!-- @nocpy -->

```
from spin_http import Response

def handle_request(request):
    return Response(200,
                    [("content-type", "text/plain")],
                    bytes(f"Hello from the Python SDK", "utf-8"))
```

The important things to note in the implementation above:

- the `handle_request` function is the entry point for the Spin component.
- the component returns `HttpResponse`.

The source code for this Python HTTP component example is in the `app.py` file. The `app.py` file is compiled into a `.wasm` module thanks to the `py2wasm` plugin. This all happens behind the scenes. 

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

Hello from the Python SDK
```

> **Please note:** All examples from this documentation page can be found in [the Python SDK repository on GitHub](https://github.com/fermyon/spin-python-sdk/tree/main/examples). If you are following along with these examples and don't get the desired result perhaps compare your own code with our previously built examples (mentioned above). Also please feel free to reach out on [Discord](https://discord.gg/AAFNfS7NGf) if you have any questions or need any additional support. 

## An Outbound HTTP Example

This next example will create an outbound request, to obtain a random fact about dogs, which will be returned to the calling code. If you would like to try this out, you can go ahead and update your existing `app.py` file from the previous step; using the following source code:

<!-- @nocpy -->

```
from spin_http import Request, Response, http_send
from os import environ


def handle_request(request):

    response = http_send(
        Request("GET", "https://some-random-api.ml/facts/dog", [], None))

    return Response(200,
                    [("content-type", "text/plain")],
                    bytes(f"Here is a dog fact: {str(response.body, 'utf-8')}, the environment: {environ}", "utf-8"))
```

The Spin framework protects your code from making outbound requests to just any URL. For example, if we try to run the above code **without any additional configuration**, we will correctly get the following error `AssertionError: HttpError::DestinationNotAllowed`. To allow our component to request the `some-random-api.ml` domain, all we have to do is add that domain to the specific component of the application that is making the request. Here is an example of an updated `spin.toml` file where we have added `allowed_http_hosts`:

```
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = ""
name = "hello-world"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-world"
source = "app.wasm"
allowed_http_hosts = ["https://some-random-api.ml"]
[component.trigger]
route = "/..."
[component.build]
command = "spin py2wasm app -o app.wasm"
```

If we re-build the application with this new configuration and re-run, we will get our new dog fact:

<!-- @selectiveCpy -->

```bash
$ spin build
$ spin up
```

A new request now correctly returns a dog fact from the some-random API endpoint.

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000/hello

HTTP/1.1 200 OK
content-type: text/plain
content-length: 130

Here is a dog fact: {"fact":"Dogs and wolves split from a common ancestor around 34,000 years ago."}    
```

## An Outbound Redis Example

In this final example, we talk to an existing Redis instance. You can find the official [instructions on how to install Redis here](https://redis.io/docs/getting-started/installation/). We also gave a quick run-through on setting up Redis with Spin in our previous article called [Persistent Storage in Webassembly Applications](https://www.fermyon.com/blog/persistent-storage-in-webassembly-applications), so please take a look at that blog if you need a hand.

### Configuration

After installing Redis on localhost, we simply add the `config = { redis_address = "redis://127.0.0.1:6379" }` to the `spin.toml` file, as shown below:

<!-- @nocpy -->

```toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
description = ""
name = "hello-world"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "hello-world"
source = "app.wasm"
config = { redis_address = "redis://127.0.0.1:6379" }
[component.trigger]
route = "/..."
[component.build]
command = "spin py2wasm app -o app.wasm"
```

If you are still following along, please go ahead and update your `app.py` file one more time, as follows:

<!-- @nocpy -->

```
from spin_http import Response
from spin_redis import redis_del, redis_get, redis_incr, redis_set, redis_sadd, redis_srem, redis_smembers
from spin_config import config_get


def handle_request(request):

    redis_address = config_get("redis_address")
    redis_set(redis_address, "foo", b"bar")
    value = redis_get(redis_address, "foo")
    redis_del(redis_address, ["testIncr"])
    redis_incr(redis_address, "testIncr")

    redis_sadd(redis_address, "testSets", ["hello", "world"])
    content = redis_smembers(redis_address, "testSets")
    redis_srem(redis_address, "testSets", ["hello"])

    assert value == b"bar", f"expected \"bar\", got \"{str(value, 'utf-8')}\""

    return Response(200,
                    [("content-type", "text/plain")],
                    bytes(f"Executed outbound Redis commands: {request.uri}", "utf-8"))
```

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
date: Mon, 27 Feb 2023 05:16:03 GMT

Executed outbound Redis commands: /hello
```

If we go into our Redis CLI on locahost we can see that the value `foo` which was set in the Python source code ( `redis_set(redis_address, "foo", b"bar")` ) is now correctly set to the value of `bar`:

<!-- @nocpy -->

```bash
redis-cli
127.0.0.1:6379> get foo
"bar"
```