title = "Building Spin Components in JavaScript"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
---

With JavaScript being a very popular language, Spin provides support for building components with it using the experimental SDK. The development of the JavaScript SDK is continually being worked on to improve user experience and add features. 

> This guide assumes you are familiar with the JavaScript programming language,
> but if you are just getting started, be sure to check [the MDN guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide).

> All examples from this page can be found in [the JavaScript SDK repository on GitHub](https://github.com/fermyon/spin-js-sdk/tree/main/examples).

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
$ spin templates install --git https://github.com/fermyon/spin-js-sdk
```

which will install the `http-js` and `http-ts` templates.

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
$ spin new http-ts hello-world --accept-defaults
```

This creates a directory of the following structure:

<!-- @nocpy -->

```text
hello-world/
├── package.json
├── package-lock.json
├── README.md
├── spin.toml
├── src
│   └── index.ts
├── tsconfig.json
└── webpack.config.js
```

The source for the component is present in `src/index.ts`. [Webpack](https://webpack.js.org) is used to bundle the component into a single `.js` file which will then be compiled to a `.wasm` module using the `js2wasm` plugin.

## Building and Running the Template

First, the dependencies for the template need to be installed and then bundled into a single JavaScript file using the following commands:

<!-- @selectiveCpy -->

```bash
$ cd hello-world
$ npm install
$ npm run build
```

Once a Spin compatible module is created, it can be run using 

<!-- @selectiveCpy -->

```bash
$ spin up
```

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

```Javascript
import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

    return {
        status: 200,
        headers: {"foo": "bar"},
        body: encoder.encode("Hello from JS-SDK").buffer
    }
}
```

The important things to note in the implementation above:

- the `handleRequest` function is the
  entry point for the Spin component.
- the component returns `HttpResponse`.

## Sending Outbound HTTP Requests

If allowed, Spin components can send outbound HTTP requests.
Let's see an example of a component that makes a request to
[an API that returns random dog facts](https://some-random-api.ml/facts/dog) and
inserts a custom header into the response before returning:

```javascript
import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

    const dogFact = await fetch("https://some-random-api.ml/facts/dog")

    const dogFactBody = await dogFact.text()

    const env = JSON.stringify(process.env)

    const body = `Here's a dog fact: ${dogFactBody}\n`

    return {
        status: 200,
        headers: { "foo": "bar" },
        body: encoder.encode(body).buffer
    }
}
```

Before we can execute this component, we need to add the `some-random-api.ml`
domain to the application manifest `allowed_http_hosts` list containing the list of
domains the component is allowed to make HTTP requests to:

```toml
# spin.toml
spin_version = "1"
authors = ["Fermyon Engineering <engineering@fermyon.com>"]
name = "spin-http-js"
trigger = { type = "http", base = "/" }
version = "1.0.0"

[variables]
object = { default = "teapot" }

[[component]]
id = "hello"
source = "target/spin-http-js.wasm"
allowed_http_hosts = ["https://some-random-api.ml"]
[component.trigger]
route = "/hello"
[component.build]
command = "npm run build"
```

The component can be built using the `spin build` command. Running the application using `spin up --file spin.toml` will start the HTTP
listener locally (by default on `localhost:3000`), and our component can
now receive requests in route `/hello`:

<!-- @selectiveCpy -->

```text
$ curl -i localhost:3000/hello
HTTP/1.1 200 OK
date: Fri, 18 Mar 2022 03:54:36 GMT
content-type: application/json; charset=utf-8
content-length: 185
server: spin/0.1.0

Here's a dog fact: {"fact":"It's a myth that dogs only see in black and white. In fact, it's believed that dogs see primarily in blue, greenish-yellow, yellow and various shades of gray."}
```

> Without the `allowed_http_hosts` field populated properly in `spin.toml`,
> the component would not be allowed to send HTTP requests, and sending the
> request would result in a "Destination not allowed" error.

> You can set `allowed_http_hosts = ["insecure:allow-all"]` if you want to allow
> the component to make requests to any HTTP host. This is **NOT** recommended
> for any production or publicly-accessible application.

We just built a WebAssembly component that sends an HTTP request to another
service, manipulates that result, then responds to the original request.
This can be the basis for building components that communicate with external
databases or storage accounts, or even more specialized components like HTTP
proxies or URL shorteners.

---

## Storing Data in Redis from JS/TS Components

> You can find a complete example for using outbound Redis from an HTTP component
> in the [spin-js-sdk repository on GitHub](https://github.com/fermyon/spin-js-sdk/blob/main/examples/typescript/outbound_redis/src/index.ts).

Using the Spin's JS SDK, you can use the Redis key/value store and to publish messages to Redis channels.

Let's see how we can use the JS/TS SDK to connect to Redis:

```javascript
import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const redisAddress = "redis://localhost:6379/"

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

    spinSdk.redis.incr(redisAddress, "test")
    spinSdk.redis.incr(redisAddress, "test")

    console.log(decoder.decode(spinSdk.redis.get(redisAddress, "test")))

    spinSdk.redis.set(redisAddress, "test-set", encoder.encode("This is a test").buffer)

    console.log(decoder.decode(spinSdk.redis.get(redisAddress, "test-set")))

    spinSdk.redis.publish(redisAddress, "test", encoder.encode("This is a test").buffer)

    return {
        status: 200,
        headers: {"foo": "bar"},
        body: encoder.encode("Hello from JS-SDK").buffer
    }
}
```

This HTTP component demonstrates fetching a value from Redis by key, setting a key with a value, and publishing a message to a Redis channel. The component is triggered by an HTTP request served on the route configured in the `spin.toml`:

> When using Redis databases hosted on the internet (i.e) not on localhost, the `redisAddress` must be of the format "redis://\<USERNAME\>:\<PASSWORD\>@\<REDIS_URL\>" (e.g) `redis://myUsername:myPassword@redis-database.com`

## Using External NPM Libraries

> Not all the NPM packages are guaranteed to work with the SDK as it is not fully compatible with the browser or `Node.js`. It implements only a subset of the API.

Some NPM packages can be installed and used in the component. If a popular library does not work, please open an issue/feature request in the [spin-js-sdk repository](https://github.com/fermyon/spin-js-sdk/issues).

### Suggested Libraries for Common Tasks

These are some of the suggested libraries that have been tested and confired to work with the SDK for common tasks.

{{ details "Parsing formdata" "- [parse-multipart-data](https://www.npmjs.com/package/parse-multipart-data)" }} 

## Caveats

- All `spinSdk` related functions and methods can be called only inside the `handleRequest` function. This includes the usage of `fetch`. Any attempts to use it outside the function will lead to an error. This is due to Wizer using only Wasmtime to execute the script at build time, which does not include any Spin SDK support.
- Only a subset of the browser and `Node.js` APIs are implemented.
- The support for `Crypto` module is currently limited to only `getRandomValues`. 