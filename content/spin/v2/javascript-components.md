title = "Building Spin Components in JavaScript"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/javascript-components.md"

---
- [Installing Templates](#installing-templates)
- [Structure of a JS/TS Component](#structure-of-a-jsts-component)
- [Building and Running the Template](#building-and-running-the-template)
  - [A Quick Note About the NPM Script and Windows](#a-quick-note-about-the-npm-script-and-windows)
- [HTTP Components](#http-components)
- [Sending Outbound HTTP Requests](#sending-outbound-http-requests)
- [Storing Data in Redis From JS/TS Components](#storing-data-in-redis-from-jsts-components)
- [Routing in a Component](#routing-in-a-component)
- [Storing Data in the Spin Key-Value Store](#storing-data-in-the-spin-key-value-store)
- [Storing Data in SQLite](#storing-data-in-sqlite)
- [Storing Data in MySQL and PostgreSQL Relational Databases](#storing-data-in-mysql-and-postgresql-relational-databases)
- [AI Inferencing From JS/TS Components](#ai-inferencing-from-jsts-components)
- [Using External NPM Libraries](#using-external-npm-libraries)
  - [Suggested Libraries for Common Tasks](#suggested-libraries-for-common-tasks)
- [Caveats](#caveats)

With JavaScript being a very popular language, Spin provides support for building components with it using the experimental SDK. The development of the JavaScript SDK is continually being worked on to improve user experience and add features. 

> This guide assumes you have Spin installed. If this is your first encounter with Spin, please see the [Quick Start](quickstart), which includes information about installing Spin with the JavaScript templates, installing required tools, and creating JavaScript and TypeScript applications.

> This guide assumes you are familiar with the JavaScript programming language,
> but if you are just getting started, be sure to check [the MDN guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide).

> All examples from this page can be found in [the JavaScript SDK repository on GitHub](https://github.com/fermyon/spin-js-sdk/tree/main/examples).

[**Want to go straight to the Spin SDK reference documentation?**  Find it here.](https://fermyon.github.io/spin-js-sdk/)

In order to compile JavaScript programs to Spin components, you also need to install a Spin plugin `js2wasm` using the following command:

<!-- @selectiveCpy -->

```bash
$ spin plugin update
$ spin plugin install js2wasm
```

## Installing Templates

The JavaScript/TypeScript templates can be installed from [spin-js-sdk repository](https://github.com/fermyon/spin-js-sdk/tree/main/) using the following command:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-js-sdk --update
```

which will install the `http-js` and `http-ts` templates:

<!-- @nocpy -->

```text
Copying remote template source
Installing template http-ts...
Installing template http-js...
Installed 2 template(s)

+-------------------------------------------------+
| Name      Description                           |
+=================================================+
| http-js   HTTP request handler using Javascript |
| http-ts   HTTP request handler using Typescript |
+-------------------------------------------------+
```

## Structure of a JS/TS Component

A new JS/TS component can be created using the following command:

<!-- @selectiveCpy -->

```bash
$ spin new -t http-ts hello-world --accept-defaults
```

This creates a directory of the following structure:

<!-- @nocpy -->

```text
hello-world/
├── package.json
├── README.md
├── spin.toml
├── src
│   └── index.ts
├── tsconfig.json
└── webpack.config.js
```

The source for the component is present in `src/index.ts`. [Webpack](https://webpack.js.org) is used to bundle the component into a single `.js` file which will then be compiled to a `.wasm` module using the `js2wasm` plugin.

## Building and Running the Template

First, the dependencies for the template need to be installed using the following commands:

<!-- @selectiveCpy -->

```bash
$ cd hello-world
$ npm install
```

Next step is to use the `spin build` command to run the build script for the component. Once a Spin compatible module is created, it can be run using `spin up`:

<!-- @selectiveCpy -->

```bash
$ spin build
$ spin up
```

`spin build` will execute the command in the `command` key under the `[component.<component-name>.build]` section from `spin.toml` for each component in your application. In this case an `npx` command will be run.

---

### A Quick Note About the NPM Script and Windows

Please note that using pre-built NPM scripts can have different effects on different Operating Systems (OSs). Let's take a look at the `build` script in the `package.json` file as an example:

<!-- @nocpy -->

```bash
"scripts": {
    "build": "npx webpack --mode=production && mkdir -p target && spin js2wasm -o target/spin-http-js.wasm dist/spin.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

The `build` script will work on Linux and macOS. However, on Windows it will create both a `-p` directory and a `target` directory.

On Linux/Unix systems, the `-p` option in the `mkdir` command is designed to prevent an error from occurring in the event that the `target` directory already exists. However, on Windows systems, npm (by default) uses cmd.exe which does not recognize the `-p` option, regarding its `mkdir` command.

If you run the script on Windows (more than once) the following error will be encountered:

<!-- @nocpy -->

```bash
A subdirectory or file -p already exists
A Subdirectory or file target already exists
```

If any errors, as described above, occur please consider one of the two following options:

a) Configure your instance of `npm` to use bash (by using the `script-shell` configuration setting): 

<!-- @selectiveCpy -->

```bash
$ npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

b) Run the separate parts of the `build` manually, to suite your needs (OS syntax requirements):

<!-- @selectiveCpy -->

```bash
$ npx webpack --mode=production
$ spin js2wasm -o target/spin-http-js.wasm dist/spin.js
```

---

## HTTP Components

In Spin, HTTP components are triggered by the occurrence of an HTTP request, and
must return an HTTP response at the end of their execution. Components can be
built in any language that compiles to WASI, and Javascript/TypeScript has improved support
for writing Spin components with the Spin JS/TS SDK.

> Make sure to read [the page describing the HTTP trigger](./http-trigger.md) for more
> details about building HTTP applications.

Building a Spin HTTP component using the JS/TS SDK means writing a single function
that takes an HTTP request as a parameter, and returns an HTTP response — below
is a complete implementation for such a component in TypeScript:

```javascript
import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
    return {
        status: 200,
        headers: {"content-type": "text/plain"},
        body: "Hello from TS-SDK"
    }
}
```

The important things to note in the implementation above:

- the `handleRequest` function is the entry point for the Spin component.
- the component returns `Promise<HttpResponse>`.


## Sending Outbound HTTP Requests

If allowed, Spin components can send outbound HTTP requests.
Let's see an example of a component that makes a request to [an API that returns random animal facts](https://random-data-api.fermyon.app/animals/json)

```javascript
import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

interface AnimalFact {
   timestamp: number;
   fact: string;
}

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
    const animalFactResponse = await fetch("https://random-data-api.fermyon.app/animals/json")
    const animalFact = await animalFactResponse.json() as AnimalFact

    const body = `Here's an animal fact: ${animalFact.fact}\n`

    return {
        status: 200,
        headers: {"content-type": "text/plain"},
        body: body
    }
}
```

Before we can execute this component, we need to add the `random-data-api.fermyon.app`
domain to the application manifest `allowed_outbound_hosts` list containing the list of
domains the component is allowed to make HTTP requests to:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
authors = ["Your Name <your-name@example.com>"]
description = ""
name = "hello-world"
version = "0.1.0"

[[trigger.http]]
route = "/..."
component = "hello-world"

[component.hello-world]
source = "target/hello-world.wasm"
exclude_files = ["**/node_modules"]
allowed_outbound_hosts = ["https://random-data-api.fermyon.app"]
[component.hello-world.build]
command = "npm run build"
```

The component can be built using the `spin build` command. Running the application using `spin up` will start the HTTP listener locally (by default on `localhost:3000`):

<!-- @selectiveCpy -->

```text
$ curl -i localhost:3000
HTTP/1.1 200 OK
date = "2023-11-04T00:00:01Z"
content-type: application/json; charset=utf-8
content-length: 185
server: spin/0.1.0

Here's an animal fact: Reindeer grow new antlers every year
```

> Without the `allowed_outbound_hosts` field populated properly in `spin.toml`,
> the component would not be allowed to send HTTP requests, and sending the
> request would result in a "Destination not allowed" error.

> You can set `allowed_outbound_hosts = ["https://*:*"]` if you want to allow
> the component to make requests to any HTTP host. This is not recommended
> unless you have a specific need to contact arbitrary servers and perform your own safety checks.

We just built a WebAssembly component that sends an HTTP request to another
service, manipulates that result, then responds to the original request.
This can be the basis for building components that communicate with external
databases or storage accounts, or even more specialized components like HTTP
proxies or URL shorteners.

---

## Storing Data in Redis From JS/TS Components

> You can find a complete example for using outbound Redis from an HTTP component
> in the [spin-js-sdk repository on GitHub](https://github.com/fermyon/spin-js-sdk/blob/main/examples/typescript/outbound_redis/src/index.ts).

Using the Spin's JS SDK, you can use the Redis key/value store and to publish messages to Redis channels.

Let's see how we can use the JS/TS SDK to connect to Redis:

```javascript
import { HandleRequest, HttpRequest, HttpResponse, Redis } from "@fermyon/spin-sdk"

const decoder = new TextDecoder()
const encoder = new TextEncoder()

const redisAddress = "redis://localhost:6379/"

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

    Redis.incr(redisAddress, "test")
    Redis.incr(redisAddress, "test")

    console.log(decoder.decode(new Uint8Array(Redis.get(redisAddress, "test"))))

    Redis.set(redisAddress, "test-set", encoder.encode("This is a test").buffer)

    console.log(decoder.decode(new Uint8Array(Redis.get(redisAddress, "test-set"))))

    Redis.publish(redisAddress, "test", encoder.encode("This is a test").buffer)

    return {
        status: 200,
        headers: { "content-type": "text/plain" },
        body: "Your data is stored!"
    }
}
```

This HTTP component demonstrates fetching a value from Redis by key, setting a key with a value, and publishing a message to a Redis channel.

> When using Redis databases hosted on the internet (i.e) not on localhost, the `redisAddress` must be of the format "redis://\<USERNAME\>:\<PASSWORD\>@\<REDIS_URL\>" (e.g) `redis://myUsername:myPassword@redis-database.com`

As with all networking APIs, you must grant access to Redis hosts via the `allowed_outbound_hosts` field in the application manifest:

<!-- @nocpy -->

```toml
[component.storage-demo]
allowed_outbound_hosts = ["redis://localhost:6379"]
```

## Routing in a Component

The JavaScript/TypeScript SDK provides a router that makes it easier to handle routing within a component. The router is based on [`itty-router`](https://www.npmjs.com/package/itty-router). An additional function `handleRequest` has been implemented in the router to allow passing in the Spin HTTP request directly. For a more complete documentation on the route, checkout the documentation at [itty-router](https://github.com/kwhitley/itty-router). An example usage of the router is given below:

```javascript
import { HandleRequest, HttpRequest, HttpResponse, Router} from "@fermyon/spin-sdk"

let router = Router()

function handleDefaultRoute() {
  return {
    status: 200,
    headers: { "content-type": "text/plain" },
    body: "Hello from Default Route"
  }
}

function handleHomeRoute(id: string) {
  return {
    status: 200,
    headers: { "content-type": "text/plain" },
    body: "Hello from Home Route with id:" + id
  }
}

router.get("/", handleDefaultRoute)
router.get("/home/:id", ({params}) => handleHomeRoute(params.id))

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
    return await router.handleRequest(request)
}
```

## Storing Data in the Spin Key-Value Store

Spin has a key-value store built in. For information about using it from TypeScript/JavaScript, see [the key-value store tutorial](key-value-store-tutorial).

## Storing Data in SQLite

For more information about using SQLite from TypeScript/Javascript, see [SQLite storage](sqlite-api-guide).

## Storing Data in MySQL and PostgreSQL Relational Databases

For more information about using relational databases from TypeScript/JavaScript, see [Relational Databases](rdbms-storage).

## AI Inferencing From JS/TS Components

For more information about using Serverless AI from JS/TS, see the [Serverless AI](serverless-ai-api-guide) API guide.

## Using External NPM Libraries

> Not all the NPM packages are guaranteed to work with the SDK as it is not fully compatible with the browser or `Node.js`. It implements only a subset of the API.

Some NPM packages can be installed and used in the component. If a popular library does not work, please open an issue/feature request in the [spin-js-sdk repository](https://github.com/fermyon/spin-js-sdk/issues).

### Suggested Libraries for Common Tasks

These are some of the suggested libraries that have been tested and confirmed to work with the SDK for common tasks.

{{ details "HTML parsers" "- [node-html-parser](https://www.npmjs.com/package/node-html-parser)" }}

{{ details "Parsing formdata" "- [parse-multipart-data](https://www.npmjs.com/package/parse-multipart-data)" }} 

{{ details "Runtime schema validation" "- [zod](https://www.npmjs.com/package/zod)" }} 

{{ details "Unique ID generator" "- [nanoid](https://www.npmjs.com/package/nanoid)\n- [ulidx](https://www.npmjs.com/package/ulidx)\n- [uuid](https://www.npmjs.com/package/uuid)" }} 

## Caveats

- All `spin-sdk` related functions and methods (like `Config`, `Redis`, `Mysql`, `Pg`, `Kv` and `Sqlite`) can be called only inside the `handleRequest` function. This includes the usage of `fetch`. Any attempts to use it outside the function will lead to an error. This is due to Wizer using only Wasmtime to execute the script at build time, which does not include any Spin SDK support.
- Only a subset of the browser and `Node.js` APIs are implemented.
- The support for Crypto  module is limited. The methods currently supported are `crypto.getRandomValues`, `crypto.subtle.digest`, `crypto.createHash` and `crypto.createHmac`
