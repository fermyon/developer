title = "Persistent Data: Redis"
template = "cloud_main"
date = "2022-01-01T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/data-redis.md"

---
- [Redis](#redis)
- [Spin and Fermyon Cloud](#spin-and-fermyon-cloud)
- [Using Spin Application Templates](#using-spin-application-templates)
- [Creating Our New Spin Application](#creating-our-new-spin-application)
- [Redis](#redis-1)
- [Configuration](#configuration)
- [Spin SDK's Redis Implementation](#spin-sdks-redis-implementation)
- [Rust](#rust)
- [Log Into Fermyon Cloud](#log-into-fermyon-cloud)
- [Spin Build](#spin-build)
- [Spin Deploy](#spin-deploy)

## Redis

[Redis](https://redis.io/), is an open-source data store used by millions of developers as a database, cache, streaming engine, and message broker. This tutorial will implement a persistent storage solution for Fermyon Cloud, using Redis. In this tutorial, we will be using [Redis Labs](https://redis.com/)' free Redis service.

## Spin and Fermyon Cloud

First, you need to have Spin installed on your computer. Please use the official Fermyon Cloud Quickstart to both [install](/cloud/quickstart#install-spin) Spin and also [log in](/cloud/quickstart#log-in-to-the-fermyon-cloud) to Fermyon Cloud.

## Using Spin Application Templates

The Spin CLI facilitates the creation of new Spin applications through the use of application templates. You can install Spin application templates using the [official Spin CLI documentation](/cloud/cli-reference#templates). For example:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin --update
```

The output from the command above will be similar to the following:

<!-- @nocpy -->

```text
Copying remote template source
// --snip--
Installing template http-rust...
// --snip--

Installed 8 template(s)

+-----------------------------------------------------------------+
| Name         Description                                        |
+=================================================================+
| // --snip--                                                     |
| http-rust     HTTP request handler using Rust                   |
+-----------------------------------------------------------------+
```

The template we are interested in is `http-rust`.

## Creating Our New Spin Application

The official Spin CLI documentation also has instructions on how to [create a new Spin application](/cloud/cli-reference#new). Let's go ahead and create a new `http-rust` application:

<!-- @selectiveCpy -->

```bash
$ spin new -t http-rust
```

The above command will ask you to enter a `name`, `description` and `HTTP path` (hit enter to accept the default `/...` HTTP path value when presented):

<!-- @nocpy -->

```bash
Enter a name for your new application: redisRustApplication
Description []: A new Redis Spin Application.
HTTP path: /...
```

> You can change these values later, in the project's `spin.toml` file.

## Redis 

To create your free database go to [app.redislabs.com](https://app.redislabs.com/). For this tutorial, we are signing up using GitHub authentication. 

> Note: Programmatic access to the Redis cloud console (Redis Rest API) requires a Redislabs paid plan, so we will just be using the free tier for this tutorial. 
 
Once you have logged in to Redislabs click on the `Data Access Control` and `Databases` menus (in the left sidebar) to create roles/users and a new Redis database. Be sure to acknowledge the usernames, passwords and database URLs (provided during setup) as we will be using these to configure our Spin application. Please see the  [Redis docs](https://developer.redis.com/howtos/quick-start/?s=redis%20cloud) for additional information.

## Configuration

Open the Spin application's `spin.toml` file and add an environment configuration value, within the `[component.redis-rust-application]` section. For example:

<!-- @nocpy -->

```toml
environment = { REDIS_ADDRESS = "redis://username:password@redis.cloud.redislabs.com:15730" }
```

> Note: As shown above; the format for the `address` is the redis protocol (`redis://`, username, colon (`:`), password, then the at symbol (`@`), database name, colon (`:`) and finally the port number. You can obtain these values from the Redislabs site from the previous step.

You will also need explicitly add the addresses (your Redis database endpoint) to the manifest so that the Wasm component is allowed to send network requests to it. The following example that defines `allowed_outbound_hosts` needs to go within the `[component.redis-rust-application]` section, also.

<!-- @nocpy -->

```toml
allowed_outbound_hosts = ["redis://redis-1234.redislabs.com:15730"]
```

## Spin SDK's Redis Implementation

In this tutorial we will create the code to store and retrieve data from a Redislabs database.

## Rust 

The following is the content which is required in the `src/lib.rs` file. Feel free to cut and paste the following, for convenience:

<!-- @nocpy -->

```rust
use anyhow::{anyhow};
use spin_sdk::http::{IntoResponse, Request};
use spin_sdk::http_component;
use spin_sdk::redis;

const REDIS_ADDRESS_ENV: &str = "REDIS_ADDRESS";

#[http_component]
fn publish(_req: Request) -> anyhow::Result<impl IntoResponse> {

    let address = std::env::var(REDIS_ADDRESS_ENV)?;
    let conn = redis::Connection::open(&address)?;

    // Set the Redis key "spin-example" to value "Eureka Cloud!"
    conn.set("spin-example", &b"Eureka Cloud!"[..].to_vec())
        .map_err(|_| anyhow!("Error executing Redis set command"))?;

    // Get the value from the Redis key "spin-example"
    let payload =
        conn.get("spin-example").map_err(|_| anyhow!("Error querying Redis"))?;

    // Return the permanently stored value to the user's browser body
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(payload)?)
}
```

## Log Into Fermyon Cloud

We need to log into Fermyon Cloud, so that we can build/deploy our application. For example:

<!-- @selectiveCpy -->

```bash
$ spin login
```

## Spin Build

We build this application by typing the following command:

<!-- @selectiveCpy -->

```bash
$ spin build
```

The output from the above command will look similar to the following:

<!-- @nocpy -->

```bash
Executing the build command for component redis-rust-application: cargo build --target wasm32-wasi --release
    Finished release [optimized] target(s) in 0.09s
Successfully ran the build command for the Spin components.
```

## Spin Deploy

To deploy the application, use the deploy command:

<!-- @selectiveCpy -->

```bash
$ spin deploy
```

The above deploy command will produce similar output to the following:

<!-- @nocpy -->

```text
Deployed redisRustApplication version 0.1.0+XXXXXXXX
Application is running at redisRustApplication-XXXXXXXX.fermyon.app
```

Visiting the URL, which is provided by the spin deploy command's output will show the `Eureka Cloud!` value for the `spin-example` key which is stored in Redis.
