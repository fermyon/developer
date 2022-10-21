title = "Persistent Data: Redis"
template = "cloud_main"
date = "2022-01-01T00:00:01Z"
[extra]

---

## Redis

[Redis](https://redis.io/), is an open-source data store used by millions of developers as a database, cache, streaming engine, and message broker. This tutorial will implement a persistent storage solution for Fermyon Cloud, using Redis. In this tutorial, we will be using [Redis Labs](https://redis.com/)' free Redis service.

## Spin and Fermyon Cloud

First, you need to have Spin installed on your computer. Please use the official Fermyon Cloud Quickstart to both [install](https://developer.fermyon.com/cloud/quickstart/#install-spin) Spin and also [log in](https://developer.fermyon.com/cloud/quickstart/#log-in-to-the-fermyon-cloud) to Fermyon Cloud.

## Using Spin Application Templates

The Spin CLI facilitates the creation of new Spin applications through the use of application templates. You can install Spin application templates using the [official Spin CLI documentation](https://developer.fermyon.com/cloud/cli-reference/#templates). For example:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin
```

The output from the command above will be similar to the following:

<!-- @nocpy -->

```console
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

The official Spin CLI documentation also has instructions on how to [create a new Spin application](https://developer.fermyon.com/cloud/cli-reference/#new). Let's go ahead and create a new `http-rust` application: 

<!-- @selectiveCpy -->

```bash
$ spin new redis-rust redisRustApplication
```

The above command will ask you to enter a `Project description`, `HTTP base` (default set to `/` which is fine) and `HTTP path`:

<!-- @nocpy -->

```bash
Project description: 
HTTP base: /
HTTP path: /...
```

You can fill out these values, when prompted, for example:

<!-- @nocpy -->

```console
Project description: A new redis-rust Spin Application.
Redis base: /
Redis channel: /data
```

> You can change these values later, in the project's `spin.toml` file.

## Redis 

To create your free database go to [app.redislabs.com](https://app.redislabs.com/). For this tutorial, we are signing up using GitHub authentication. 

> Note: Programmatic access to the Redis cloud console (Redis Rest API) requires a Redislabs paid plan, so we will just be using the free tier for this tutorial. 
 
Once you have logged in to Redislabs click on the `Data Access Control` and `Databases` menus (in the left sidebar) to create roles/users and a new Redis database. Be sure to acknowledge the usernames, passwords and database URLs (provided during setup) as we will be using these to configure our Spin application. Please see the  [Redis docs](https://developer.redis.com/create/rediscloud/) for additional information.

## Configuration

Open the Spin application's `spin.toml` file and add an environment configuration value, within the `[[component]]` section. For example:

```bash
environment = { REDIS_ADDRESS = "redis://username:password@redis.cloud.redislabs.com:16675" }
```

> Note: As shown above; the format for the `address` is the redis protocol (`redis://`, username, colon (`:`), password, then the at symbol (`@`), database name, colon (`:`) and finally the port number. You can obtain these values from the Redislabs site from the previous step.

## Spin SDK's Redis Implementation

In this tutorial we will create the code to store and retrieve data from a Redislabs database.

## Rust 

The following is the content which is required in the `src/lib.rs` file. Feel free to cut and paste the following, for convenience:

```rust
use anyhow::{anyhow, Result};
use spin_sdk::{
    http::{Request, Response},
    http_component, redis,
};

const REDIS_ADDRESS_ENV: &str = "REDIS_ADDRESS";

#[http_component]
fn publish(_req: Request) -> Result<Response> {
    let address = std::env::var(REDIS_ADDRESS_ENV)?;

    // Set the Redis key "spin-example" to value "Eureka Cloud!"
    redis::set(&address, "spin-example", &b"Eureka Cloud!"[..])
        .map_err(|_| anyhow!("Error executing Redis set command"))?;

    // Get the value from the Redis key "spin-example"
    let payload =
        redis::get(&address, "spin-example").map_err(|_| anyhow!("Error querying Redis"))?;

    // Return the permanently stored value to the user's browser body
    Ok(http::Response::builder()
        .status(200)
        .header("foo", "bar")
        .body(Some(payload.into()))?)
}
```

## Log into Fermyon Cloud

We need to log into Fermyon Cloud, so that we can build/deploy our application. For example:

<!-- @selectiveCpy -->

```console
$ spin login --url https://canary.cloud.fermyon.link
```

## Spin Build

We build this application by typing the following command:
<!-- @selectiveCpy -->

```console
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

```console
$ spin deploy
```

The above deploy command will produce similar output to the following:

```bash
Deployed redisRustApplication version 0.1.0+qa7a95e3
Application is running at redisrustapplication.canary.cloud.fermyon.link
```

Visiting the URL, which is provided by the spin deploy command's output will show the `Eureka Cloud!` value for the `spin-example` key which is stored in Redis.