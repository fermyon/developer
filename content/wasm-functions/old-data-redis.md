title = "Persistent Data: Redis"
template = "functions_main"
date = "2024-12-10T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/wasm-functions/data-redis.md"

---
- [Redis](#redis)
- [Spin and Fermyon Wasm Functions](#spin-and-fermyon-on-akamai)
- [Using Spin Application Templates](#using-spin-application-templates)
- [Creating Our New Spin Application](#creating-our-new-spin-application)
- [Redis](#redis-1)
- [Configuration](#configuration)
- [Spin SDK's Redis Implementation](#spin-sdks-redis-implementation)
- [Rust](#rust)
- [Log Into Fermyon Wasm Functions](#log-into-fermyon-on-akamai)
- [Spin Build](#spin-build)
- [Spin Deploy](#spin-deploy)

## Redis

[Redis](https://redis.io/), is an open-source data store used by millions of developers as a database, cache, streaming engine, and message broker. This tutorial will implement a persistent storage solution for Fermyon Wasm Functions, using Redis. In this tutorial, we will be using [Redis Labs](https://redis.com/)' free Redis service.

## Spin and Fermyon Wasm Functions

First, you need to have Spin installed on your computer. Please use the official Fermyon Wasm Functions Quickstart to both [install](/wasm-functions/quickstart#install-spin) Spin and also [log in](/wasm-functions/quickstart#log-in-to-fermyon-on-akamai) to Fermyon Wasm Functions.

## Using Spin Application Templates

The Spin CLI facilitates the creation of new Spin applications through the use of application templates. You can install Spin application templates using the [official Spin CLI documentation](/wasm-functions/cli-reference#templates). For example:

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

The official Spin CLI documentation also has instructions on how to [create a new Spin application](/wasm-functions/cli-reference#new). Let's go ahead and create a new `http-rust` application:

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
 
Once you have logged in to Redislabs click on the `Data Access Control` and `Databases` menus (in the left sidebar) to create roles/users and a new Redis database. Be sure to acknowledge the usernames, passwords and database URLs (provided during setup) as we will be using these to configure our Spin application. Please see the [Redis docs](https://developer.redis.com/howtos/quick-start/?s=redis%20cloud) for additional information.

## Configuration

Open the Spin application's `spin.toml` file and add an environment configuration value, within the `[component.redis-rust-application]` section. For example:

<!-- @nocpy -->

```toml
environment = { REDIS_ADDRESS = "redis://username:password@redis-1234.redislabs.com:15730" }
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
use anyhow::anyhow;
use spin_sdk::http::{IntoResponse, Request, ResponseBuilder};
use spin_sdk::http_component;
use spin_sdk::redis;

const REDIS_ADDRESS_ENV: &str = "REDIS_ADDRESS";

#[http_component]
fn handle_redis_persistence(_req: Request) -> anyhow::Result<impl IntoResponse> {
    let address = std::env::var(REDIS_ADDRESS_ENV)?;
    let conn = redis::Connection::open(&address)?;
    let key = "spin-example";

    // Set the Redis key "spin-example" to value "Eureka Fermyon Wasm Functions!"
    conn.set(key, &b"Eureka Fermyon Wasm Functions!"[..].to_vec())
        .map_err(|_| anyhow!("Error executing Redis set command"))?;

    // Get the value from the Redis key "spin-example"
    let payload = conn.get(key).map_err(|_| anyhow!("Error querying Redis"))?;

    // Return the permanently stored value to the user's browser body
    Ok(ResponseBuilder::new(200)
        .header("Content-Type", "text/plain")
        .header("x-key", key)
        .body(payload)
        .build())
}
```

## Log Into Fermyon Wasm Functions

We need to log into Fermyon Wasm Functions, so that we can build/deploy our application. For example:

<!-- @selectiveCpy -->

```bash
$ spin neutrino login
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
$ spin neutrino deploy
```

The above deploy command will produce similar output to the following:

<!-- @nocpy -->

```text
Waiting for application to be ready... 
Application deployed to https://redisrustapplication-8270f183.aka.fermyon.tech/

View application:   
https://redisrustapplication-8270f183.aka.fermyon.tech/  
```

Visiting the URL, which is provided by the spin deploy command's output will show the `Eureka Fermyon Wasm Functions!` value for the `spin-example` key which is stored in Redis.
