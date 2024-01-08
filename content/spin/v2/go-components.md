title = "Building Spin components in Go"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/go-components.md"

---

- [Versions](#versions)
- [HTTP Components](#http-components)
- [Sending Outbound HTTP Requests](#sending-outbound-http-requests)
- [Redis Components](#redis-components)
- [Storing Data in Redis From Go Components](#storing-data-in-redis-from-go-components)
- [Using Go Packages in Spin Components](#using-go-packages-in-spin-components)
- [Storing Data in the Spin Key-Value Store](#storing-data-in-the-spin-key-value-store)
- [Storing Data in SQLite](#storing-data-in-sqlite)
- [AI Inferencing From Go Components](#ai-inferencing-from-go-components)

> This guide assumes you have Spin installed. If this is your first encounter with Spin, please see the [Quick Start](quickstart), which includes information about installing Spin with the Go templates, installing required tools, and creating Go applications.

> This guide assumes you are familiar with the Go programming language, and that
> you have
> [configured the TinyGo toolchain locally](https://tinygo.org/getting-started/install/).
Using TinyGo to compile components for Spin is currently required, as the
[Go compiler doesn't currently have support for compiling to WASI](https://github.com/golang/go/issues/31105).

> All examples from this page can be found in [the Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples).

[**Want to go straight to the Spin SDK reference documentation?**  Find it here.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2)

## Versions

TinyGo `0.30.0` is recommended, which requires Go `v1.19+`.

## HTTP Components

In Spin, HTTP components are triggered by the occurrence of an HTTP request, and
must return an HTTP response at the end of their execution. Components can be
built in any language that compiles to WASI, and Go has improved support for
writing applications, through its SDK.

Building a Spin HTTP component using the Go SDK means writing a single function,
`init` — below is a complete implementation for such a component:

<!-- @nocpy -->

```go
// A Spin component written in Go that returns "Hello, Fermyon!"
package main

import (
 "fmt"
 "net/http"

 spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
)

func init() {
 spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "text/plain")
  fmt.Fprintln(w, "Hello Fermyon!")
 })
}

func main() {}
```

The Spin HTTP component (written in Go) can be built using the `tingygo` toolchain:

<!-- @selectiveCpy -->

```bash
$ tinygo build -o main.wasm -target=wasi main.go
```

Once built, we can run our Spin HTTP component (written in Go) using the Spin up command:

<!-- @selectiveCpy -->

```bash
$ spin up
```

The Spin HTTP component (written in Go) can now receive and process incoming requests:

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000
HTTP/1.1 200 OK
content-type: text/plain
content-length: 15

Hello Fermyon!
```

The important things to note in the implementation above:

- the entry point to the component is the standard `func init()` for Go programs
- handling the request is done by calling the `spinhttp.Handle` function,
which takes a `func(w http.ResponseWriter, r *http.Request)` as parameter — these
contain the HTTP request and response writer you can use to handle the request
- the HTTP objects (`*http.Request`, `http.Response`, and `http.ResponseWriter`)
are the Go objects from the standard library, so working with them should feel
familiar if you are a Go developer

## Sending Outbound HTTP Requests

If allowed, Spin components can send outbound requests to HTTP endpoints. Let's
see an example of a component that makes a request to
[an API that returns random animal facts](https://random-data-api.fermyon.app/animals/json) and
inserts a custom header into the response before returning:

<!-- @nocpy -->

```go
// A Spin component written in Go that sends a request to an API
// with random animal facts.

package main

import (
 "fmt"
 "net/http"
 "os"

 spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
)

func init() {
 spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
    resp, _ := spinhttp.Get("https://random-data-api.fermyon.app/animals/json")

  fmt.Fprintln(w, resp.Body)
  fmt.Fprintln(w, resp.Header.Get("content-type"))

  // `spin.toml` is not configured to allow outbound HTTP requests to this host,
  // so this request will fail.
  if _, err := spinhttp.Get("https://fermyon.com"); err != nil {
   fmt.Fprintf(os.Stderr, "Cannot send HTTP request: %v", err)
  }
 })
}

func main() {}
```

The Outbound HTTP Request example above can be built using the `tingygo` toolchain:

<!-- @selectiveCpy -->

```bash
$ tinygo build -o main.wasm -target=wasi main.go
```

Before we can execute this component, we need to add the
`random-data-api.fermyon.app` domain to the application manifest `allowed_outbound_hosts`
list containing the list of domains the component is allowed to make HTTP
requests to:

<!-- @nocpy -->

```toml
# spin.toml
spin_manifest_version = 2

[application]
name = "spin-hello-tinygo"
version = "1.0.0"

[[trigger.http]]
route = "/hello"
component = "tinygo-hello"

[component.tinygo-hello]
source = "main.wasm"
allowed_outbound_hosts = [ "https://random-data-api.fermyon.app" ]
```

Running the application using `spin up` will start the HTTP
listener locally (by default on `localhost:3000`), and our component can
now receive requests in route `/hello`:

<!-- @selectiveCpy -->

```bash
$ curl -i localhost:3000
HTTP/1.1 200 OK
content-length: 93

{"timestamp":1684299253331,"fact":"Reindeer grow new antlers every year"}
```

> Without the `allowed_outbound_hosts` field populated properly in `spin.toml`,
> the component would not be allowed to send HTTP requests, and sending the
> request would generate in a "Destination not allowed" error.

> You can set `allowed_outbound_hosts = ["https://*:*"]` if you want to allow
> the component to make requests to any HTTP host. This is not recommended
> unless you have a specific need to contact arbitrary servers and perform your own safety checks.

## Redis Components

Besides the HTTP trigger, Spin has built-in support for a Redis trigger, which
will connect to a Redis instance and will execute components for new messages
on the configured channels.

> See the [Redis trigger](./redis-trigger.md) for details about the Redis trigger.

Writing a Redis component in Go also takes advantage of the SDK:

<!-- @nocpy -->

```go
package main

import (
 "fmt"

 "github.com/fermyon/spin/sdk/go/v2/redis"
)

func init() {
 // redis.Handle() must be called in the init() function.
 redis.Handle(func(payload []byte) error {
  fmt.Println("Payload::::")
  fmt.Println(string(payload))
  return nil
 })
}

// main function must be included for the compiler but is not executed.
func main() {}
```

The manifest for a Redis application must contain the address of the Redis instance. This is set at the application level:

<!-- @nocpy -->

```toml
spin_manifest_version = 2

[application]
name = "spin-redis"
trigger = { type = "redis",  }
version = "0.1.0"

[application.trigger.redis]
address = "redis://localhost:6379"

[[trigger.redis]]
channel = "messages"
component = "echo-message"

[component.echo-message]
source = "main.wasm"
[component.echo-message.build]
command = "tinygo build -target=wasi -gc=leaking -no-debug -o main.wasm main.go"
```

The application will connect to `redis://localhost:6379`, and for every new message
on the `messages` channel, the `echo-message` component will be executed:

<!-- @selectiveCpy -->

```bash
# first, start redis-server on the default port 6379
$ redis-server --port 6379
# then, start the Spin application
$ spin build --up
INFO spin_redis_engine: Connecting to Redis server at redis://localhost:6379
INFO spin_redis_engine: Subscribed component 0 (echo-message) to channel: messages
```

For every new message on the `messages` channel:

<!-- @selectiveCpy -->

```bash
$ redis-cli
127.0.0.1:6379> publish messages "Hello, there!"
```

Spin will instantiate and execute the component:

<!-- @nocpy -->

```bash
INFO spin_redis_engine: Received message on channel "messages"
Payload::::
Hello, there!
```

## Storing Data in Redis From Go Components

Using the Spin's Go SDK, you can use the Redis key/value store to publish
messages to Redis channels. This can be used from both HTTP and Redis triggered
components.

Let's see how we can use the Go SDK to connect to Redis. This HTTP component demonstrates fetching a value from Redis by key, setting a
key with a value, and publishing a message to a Redis channel:

<!-- @nocpy -->

```go
package main

import (
 "net/http"
 "os"

 spin_http "github.com/fermyon/spin/sdk/go/v2/http"
 "github.com/fermyon/spin/sdk/go/v2/redis"
)

func init() {
 // handler for the http trigger
 spin_http.Handle(func(w http.ResponseWriter, r *http.Request) {

  // addr is the environment variable set in `spin.toml` that points to the
  // address of the Redis server.
  addr := os.Getenv("REDIS_ADDRESS")

  // channel is the environment variable set in `spin.toml` that specifies
  // the Redis channel that the component will publish to.
  channel := os.Getenv("REDIS_CHANNEL")

  // payload is the data publish to the redis channel.
  payload := []byte(`Hello redis from tinygo!`)

  // create a new redis client.
  rdb := redis.NewClient(addr)

  if err := rdb.Publish(channel, payload); err != nil {
   http.Error(w, err.Error(), http.StatusInternalServerError)
   return
  }

  // set redis `mykey` = `myvalue`
  if err := rdb.Set("mykey", []byte("myvalue")); err != nil {
   http.Error(w, err.Error(), http.StatusInternalServerError)
   return
  }

  // get redis payload for `mykey`
  if payload, err := rdb.Get("mykey"); err != nil {
   http.Error(w, err.Error(), http.StatusInternalServerError)
  } else {
   w.Write([]byte("mykey value was: "))
   w.Write(payload)
  }
 })
}

func main() {}
```

As with all networking APIs, you must grant access to Redis hosts via the `allowed_outbound_hosts` field in the application manifest:

<!-- @nocpy -->

```toml
[component.storage-demo]
environment = { REDIS_ADDRESS = "redis://127.0.0.1:6379", REDIS_CHANNEL = "messages" }
allowed_outbound_hosts = ["redis://127.0.0.1:6379"]
```

This HTTP component can be paired with a Redis component, triggered on new messages on the `messages` Redis channel, to build an asynchronous messaging application, where the HTTP front-end queues work for a Redis-triggered back-end to execute as capacity is available.

> You can find a complete example for using outbound Redis from an HTTP component
> in the [Spin repository on GitHub](https://github.com/fermyon/spin/tree/main/examples/tinygo-outbound-redis).

## Using Go Packages in Spin Components

Any [package from the Go standard library](https://tinygo.org/docs/reference/lang-support/stdlib/) that can be imported in TinyGo and that compiles to
WASI can be used when implementing a Spin component.

> Make sure to read [the page describing the HTTP trigger](./http-trigger.md) for more
> details about building HTTP applications.

## Storing Data in the Spin Key-Value Store

Spin has a key-value store built in. For information about using it from TinyGo, see [the key-value store tutorial](key-value-store-tutorial).

## Storing Data in SQLite

For more information about using SQLite from TinyGo, see [SQLite storage](sqlite-api-guide).

## AI Inferencing From Go Components

For more information about using Serverless AI from TinyGo, see the [Serverless AI](serverless-ai-api-guide) API guide.
