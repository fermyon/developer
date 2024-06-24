date = "2024-02-18T01:01:01Z"
title = "Python in WebAssembly"
description = "Python can almost be compiled to WebAssembly. The implementations are now stable."
tags = ["python", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"
url = "https://github.com/fermyon/developer/blob/main/content/wasm-languages/python.md"

---

Python is one of the most popular programming languages in the world, and its WebAssembly implementation seems to be coming along quickly.

## Available Implementations

WebAssembly support is officially available in CPython 3.11 and after. The [GitHub CPython repo](https://github.com/python/cpython) has all of the code.

There is also a [Spin SDK for Python](https://github.com/fermyon/spin-python-sdk) that uses CPython, but reduces startup time by preloading and initializing the scripts. There's a [detailed blog post about Python on Fermyon.com](https://www.fermyon.com/blog/spin-python-sdk) that explains this.

## Prerequisite

Ensure that you have Python 3.10 or later installed on your system. You can check your Python version by running:

```bash
python3 --version
```

If you do not have Python 3.10 or later, you can install it by following the instructions [here](https://www.python.org/downloads/).

## Usage

The Spin SDK makes it very easy to build Python-based Wasm applications simply by using a Spin template that handles all of the heavy lifting.

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

**Please note:** For more information about managing `spin templates`, see the [templates section](../spin/v2/cli-reference#spin-templates) in the Spin Command Line Interface (CLI) documentation.

## Example

Let's use Spin's Python HTTP request handler template, to create a new project:

```console
$ spin new python-example -t http-py --accept-defaults
```

## System Housekeeping (Use a Virtual Environment)

Once the app is created, we can change into the `python-example` directory, create and activate a virtual environment and then install the apps requirements:

<!-- @selectiveCpy -->

```console
$ cd python-example
```

Create a virtual environment directory (we are still inside the Spin app directory):

<!-- @selectiveCpy -->

```console
# python<version> -m venv <virtual-environment-name>
$ python3 -m venv venv-dir
```

Activate the virtual environment (this command depends on which operating system you are using):

<!-- @selectiveCpy -->

```console
# macOS command to activate
$ source venv-dir/bin/activate
```

The `(venv-dir)` will prefix your terminal prompt now:

<!-- @nocpy -->

```console
(venv-dir) user@123-456-7-8 python-example %
```

## Requirements

The `requirements.txt`, by default, contains the references to the `spin-sdk` and `componentize-py` packages. These can be installed right there in your virtual environment using:

<!-- @selectiveCpy -->

```bash
$ pip3 install -r requirements.txt
```

Take a look at the scaffolded program in `app.py`:

```python
from spin_sdk.http import IncomingHandler, Request, Response

class IncomingHandler(IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        return Response(
            200,
            {"content-type": "text/plain"},
            bytes("Hello from Python!", "utf-8")
        )
```

Change into the app directory and install the requirements:

```console
$ pip3 install -r requirements.txt
```

Compile a Wasm binary with the scripts preloaded, and then start up a local server:

```console
$ spin build --up
Building component python-example with `componentize-py -w spin-http componentize app -o app.wasm`
Component built successfully
Finished building all Spin components
Logging component stdio to ".spin/logs/"
Preparing Wasm modules is taking a few seconds...


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

Live Code Tuesday Video (Python & Wasm - Let's talk about componentize-py w/ Joel Dice, Streamed live on Mar 13, 2024)

<iframe width="854" height="480" src="https://www.youtube.com/embed/JeRyh-Jj7wk?si=Bzfm97YGaJmiPVHD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Joel's video on Spin, Python, and Components (Recorded at WasmCon on Sep 12, 2023):

<iframe width="854" height="480" src="https://www.youtube.com/embed/PkAO17lmqsI?si=mO2rY-u06IvWB-gv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Here are some great resources:
- A tutorial for building [Python Wasm apps with Spin](https://dev.to/technosophos/building-a-serverless-webassembly-app-with-spin-5dh9)
- A tutorial doing [AI inferencing with Python and Spin](https://www.wasm.builders/technosophos/serverless-ai-inferencing-with-python-and-wasm-3lkd)
- The [Spin Python SDK](https://github.com/fermyon/spin-python-sdk)
- The [Spin Developer Docs](../spin) fully document the Python SDKs
- [Python Wasm examples](../../hub) at Spin Up Hub
- The [Componentize-Py](https://pypi.org/project/componentize-py/) tooling
- VMware has a [distribution of CPython as Wasm](https://github.com/vmware-labs/webassembly-language-runtimes/tree/main/python) based on the official CPython
- A detailed document about  [the (once) current state and features of Wasm](https://pythondev.readthedocs.io/wasm.html) in the latest CPython version (Now outdated)
- Fermyon.com published a slightly more [in-depth Python and Wasm tutorial](https://www.fermyon.com/blog/python-wagi)
- An in-browser [Python shell in Wasm](https://github.com/ethanhs/python-wasm) (Not the preferred path)
- One version of [CPython + Wasm](https://github.com/ethanhs/python-wasm), where they are working on [WASI support](https://github.com/ethanhs/python-wasm/issues/18)
- [SingleStore's wasi-python project](https://github.com/singlestore-labs/python-wasi) is another approach

## Troubleshooting

If you bump into issues when installing the requirements.txt. For example:

```console
error: externally-managed-environment
× This environment is externally managed
```

Please note, this error is specific to Homebrew-installed Python installations and occurs because installing a **non-brew-packaged** Python package requires you to either:
- create a virtual environment using `python3 -m venv path/to/venv`, or
- use the `--break-system-packages` option in your `pip3 install` command i.e. `pip3 install -r requirements.txt --break-system-packages`

We recommend installing a virtual environment using `venv`, as shown in the [system housekeeping section](#system-housekeeping-use-a-virtual-environment) above.
