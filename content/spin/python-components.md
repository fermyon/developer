title = "Building Spin Components in Python"
template = "spin_main"
date = "2023-03-01T02:00:00Z"

---
- [Spin's Python Plugin](#spins-python-plugin)
- [Spin's Python HTTP Request Handler Template](#spins-python-http-request-handler-template)
- [Structure of a Python Component](#structure-of-a-python-component)
- [A Simple HTTP Components Example](#a-simple-http-components-example)
- [Building and Running the Application](#building-and-running-the-application)

With <a href="https://www.python.org/" target="_blank">Python</a> being a very popular language, Spin provides support for building components with Python; [using an experimental SDK](https://github.com/fermyon/spin-python-sdk). The development of the Python SDK is continually being worked on to improve user experience and also add new features. 

> This guide assumes you are familiar with the Python programming language, but if you are just getting started, be sure to check out <a href="https://docs.python.org/3/" target="_blank">the official Python documentation</a> and comprehensive <a href="https://docs.python.org/3/reference/" target="_blank">language reference</a>.

**Please note:** All examples from this technical documentation page can be found in [the Python SDK repository on GitHub](https://github.com/fermyon/spin-python-sdk/tree/main/examples). There is also a blog article [introducing the release of this Spin Python SDK](https://www.fermyon.com/blog/spin-python-sdk) if you are interested in some further reading.

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

## A Simple HTTP Components Example

In Spin, HTTP components are triggered by the occurrence of an HTTP request and must return an HTTP response at the end of their execution. Components can be built in any language that compiles to WASI. If you would like additional information about building HTTP applications you may find [the HTTP trigger page](./http-trigger.md) useful.

Building a Spin HTTP component using the Python SDK means writing a single function that takes an HTTP request as a parameter, and returns an HTTP response. Here is a simple example of a request/response using Python:

<!-- @nocpy -->

```python
from spin_http import Response

def handle_request(request):

    return Response(200,
        [("content-type", "text/plain")],
        bytes(f"Hello from the Python SDK", "utf-8"))
```

The important things to note in the implementation above:

- the `handle_request` function is the entry point for the Spin component.
- the component returns `HttpResponse`.

The source code for this Python HTTP component example is in the `app.py` file. The `app.py` file is compiled into a `.wasm` module thanks to the `py2wasm` plugin. This all happens behind the scenes. All you need to do is run the `spin build` command from within the project's directory; as shown in the next section.

## Building and Running the Application

The following `spin build` command installs all of the necessary dependencies for the template and then bundles the application up into a single JavaScript file:

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
content-type: text/plain; charset=utf-8

Hello from the Python SDK
```