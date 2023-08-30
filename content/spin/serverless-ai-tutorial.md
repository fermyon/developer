title = "Serverless AI Tutorial"
template = "spin_main"
date = "2023-09-05T09:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/serverless-ai-tutorial.md"

---

## Serverless AI With Spin Applications

TODO create page based on Karthik's JS example here https://www.notion.so/fermyon/Spin-AI-Inferencing-Setup-e86964bf27fe48bdaf68d374d23b0e51

* Create a Spin application with `spin new`
* Use the Serverless AI SDK to perform inferencing

## Tutorial Prerequisites

First, follow [this guide](./install.md) to install Spin or [this guide](./upgrade.md) to upgrade to the latest version. You can check your Spin version using the following command:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

## Creating a New Spin Application

Let's create a Spin application that TODO:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

```bash
$ spin new http-rust spin-serverless-ai

```

{{ blockEnd }}

{{ startTab "TypeScript" }}

<!-- @selectiveCpy -->

```bash
$ spin new http-ts spin-serverless-ai

```

{{ blockEnd }}


## Write Code to Perform Inferencing

In this section, we use the Spin SDK to TODO


### The Spin SDK Version

If you have an existing application and would like to try out the Serverless AI feature, please check the Spin SDK reference in your existing application's configuration. For example, if using Rust please check your application's `Cargo.toml` file. If it refers to version TODO or earlier then update the Spin SDK reference to match your upgraded version of Spin:

<!-- @nocpy -->

```toml
# The Spin SDK.
spin-sdk = { git = "https://github.com/fermyon/spin", tag = "v0.10.0" }
```

## Source Code

Now let's use the Spin SDK to:
- TODO

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @nocpy -->

```rust
TODO
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

<!-- @nocpy -->

```typescript
TODO
```

{{ blockEnd }}


{{ blockEnd }}

## Building and Deploying Your Spin Application

Now let's build and deploy our Spin Application locally. Run the following command to build your application: 

<!-- @selectiveCpy -->

```bash
$ spin build --up
```

## TODO Deploy to Fermyon Cloud

<!-- @selectiveCpy -->

```bash
$ spin cloud deploy TODO
```

## TODO Testing 

<!-- @selectiveCpy -->

```bash
# Create a new POST request TODO
$ curl -X POST localhost:3000/test -H 'Content-Type: application/json' -d '{"todo":"todo"}' -v

TODO
```

## Conclusion

We want to get feedback on the Serverless AI API. We are curious about what models you would like to use and what applications you are building using Serverless AI.

## Next Steps

TODO Please feel free to ask questions and also share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf).
