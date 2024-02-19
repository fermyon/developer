date = "2022-01-12T00:23:27Z"
title = "Python in WebAssembly"
description = "Python can almost be compiled to WebAssembly. The implementations are now stable."
tags = ["python", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
last_modified = "2023-10-26T00:50:50Z"

---

- [Python in WebAssembly](#python-in-webassembly)
  - [Available Implementations](#available-implementations)
  - [Usage](#usage)
  - [Example](#example)
  - [Learn More](#learn-more)

# Python in WebAssembly

Python is one of the most popular programming languages in the world, and its WebAssembly implementation seems to be coming along quickly.
While it is not yet ready for use, we anticipate it will be functional in the first half of 2022.

The most momentum is in the CPython community, which is approaching both Emscripten-based and WASI-based implementations.

## Available Implementations

WebAssembly support is officially available in CPython 3.11 and after. The [GitHub CPython repo](https://github.com/python/cpython) has all of the code.

There is also a [Spin SDK for Python](https://github.com/fermyon/spin-python-sdk) that uses CPython, but reduces startup time by preloading and initializing the scripts. There's a [detailed blog post about Python on Fermyon.com](https://www.fermyon.com/blog/spin-python-sdk) that explains this.

## Usage

The Spin SDK makes it very easy to build Python-based Wasm applications simply by using a Spin template that handles all of the heavy lifting.

## Example

Create a new project:

```console
$ spin new http-py python-example --accept-defaults
```

Take a look at the scaffolded program in `app.py`:

```python
from spin_http import Response

def handle_request(request):

    return Response(200,
                    {"content-type": "text/plain"},
                    bytes(f"Hello from the Python SDK", "utf-8"))
```

Compile a Wasm binary with the scripts preloaded, and then start up a local server:

```console
$ spin build --up
Building component python-example with `spin py2wasm app -o app.wasm`
Spin-compatible module built successfully
Finished building all Spin components
Logging component stdio to ".spin/logs/"

Serving http://127.0.0.1:3000
Available Routes:
  python-example: http://127.0.0.1:3000 (wildcard)
```

Test it with `curl`:

```console
$ curl localhost:3000/
Hello from the Python SDK
```

The file `app.wasm` contains both the interpreter (in an initialized state) and all of the userland code:

```console
$ ls -lah app.wasm
-rw-r--r--  1 technosophos  staff    24M Oct 26 18:22 app.wasm
```

## Learn More

Joel's video on Spin, Python, and Components:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PkAO17lmqsI?si=mO2rY-u06IvWB-gv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Here are some great resources:
- A tutorial for building [Python Wasm apps with Spin](https://dev.to/technosophos/building-a-serverless-webassembly-app-with-spin-5dh9)
- A tutorial doing [AI inferencing with Python and Spin](https://www.wasm.builders/technosophos/serverless-ai-inferencing-with-python-and-wasm-3lkd)
- The [Spin Python SDK](https://github.com/fermyon/spin-python-sdk)
- The [Spin Developer Docs](https://developer.fermyon.com/spin) fully document the Python SDKs
- [Python Wasm examples](https://developer.fermyon.com/hub) at Spin Up Hub
- The [Componentize-Py](https://pypi.org/project/componentize-py/) tooling
- VMware has a [distribution of CPython as Wasm](https://github.com/vmware-labs/webassembly-language-runtimes/tree/main/python) based on official CPython
- A detailed document about  [the (once) current state and features of Wasm](https://pythondev.readthedocs.io/wasm.html) in the latest CPython version (Now outdated)
- Fermyon.com published a slightly more [in-depth Python and Wasm tutorial](https://www.fermyon.com/blog/python-wagi)
- An in-browser [Python shell in Wasm](https://github.com/ethanhs/python-wasm) (Not the preferred path)
- One version of [CPython + Wasm](https://github.com/ethanhs/python-wasm), where they are working on [WASI support](https://github.com/ethanhs/python-wasm/issues/18)
- [SingleStore's wasi-python project](https://github.com/singlestore-labs/python-wasi) is another approach
