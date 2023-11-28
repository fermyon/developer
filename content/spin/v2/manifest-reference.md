title = "Spin Application Manifest Reference"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/manifest-reference.md"

---
- [Format](#format)
- [Manifest Fields](#manifest-fields)
- [The `application` Table](#the-application-table)
- [The `application.trigger` Table](#the-applicationtrigger-table)
  - [The `application.trigger.http` Table](#the-applicationtriggerhttp-table)
  - [The `application.trigger.redis` Table](#the-applicationtriggerredis-table)
- [The `variables` Table](#the-variables-table)
- [The `trigger` Table](#the-trigger-table)
  - [Common Fields for All `trigger.(type)` Tables](#common-fields-for-all-triggertype-tables)
  - [Additional Fields for `trigger.http` Tables](#additional-fields-for-triggerhttp-tables)
  - [Additional Fields for `trigger.redis` Tables](#additional-fields-for-triggerredis-tables)
- [The `component` Table](#the-component-table)
- [The `component.(id).build` Table](#the-componentidbuild-table)
- [Next Steps](#next-steps)

This page describes the contents of the Spin manifest file, typically called `spin.toml`.

> There are two versions of the manifest format. The manifest format described here (version 2) is recommended if you're using Spin 2.0 and above. The [previous format (version 1)](manifest-reference-v1.md) is supported on Spin 2.x for backward compatibility, and is the only format supported by Spin 1.x.

## Format

The manifest is a TOML file, and follows standard TOML syntax.  See the [TOML documentation](https://toml.io/) for information about the TOML syntax.

## Manifest Fields

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `spin_manifest_version` | Required   | Number      | The version of the file format that the rest of the manifest follows. For manifests using this format, this value must be `2`. | `2` |
| `application`           | Required   | Table       | Information about the application and application-global options. See [The `application` Table](#the-application-table) below. | `[application]`<br />`name = "greetings"`<br />`version = "1.0.0"` |
| `variables`             | Optional   | Table       | Dynamic configuration variables which the user can set when they run the application. See [The `variables` Table](#the-variables-table) below. | `[variables]`<br />`message = { default = "hello" }` |
| `trigger`               | Required   | Table       | Associates triggers and conditions to the components that handle them - for example, mapping a HTTP route to a handling component. See [The `trigger` Table Array](#the-trigger-table-array) below. | `[[trigger.http]]`<br />`component = "greeter"`<br />`route = "/greet"` |
| `component`             | Required   | Table       | The WebAssembly components that make up the application, together with whatever configuration and resources they depend on, such as asset files or storage access. See [The `component` Table](#the-component-table) below. | `[component.greeter]`<br />`source = "greeting_manager.wasm"`<br />`files = ["confetti.jpg]"` |

> If you're familiar with manifest version 1, note that the way trigger parameters map to components - for example, which component handles a particular HTTP route - is now defined on the _trigger_, not on the component. In the version 2 manifest, a `component` section specifies _only_ the Wasm module and the resources it needs.

## The `application` Table

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `name`                  | Required   | String      | The name of the application. This may be any string of alphanumeric characters, hyphens and underscores. | `"hello-world"` |
| `version`               | Optional   | String      | The version of the application. The must be a string of the form `major.minor.patch`, where each element is a number. | `"1.0.5"` |
| `description`           | Optional   | String      | A human-readable description of the application. | `"The best app for all your world-greeting needs"` |
| `authors`               | Optional   | Array of strings | The authors of the applications. If present, this must ba an array, even if it has only one entry. | `["Jane Q Hacker (<dev@example.com>)"]` |
| `trigger`               | Optional   | Table       | Application-global trigger settings. See [The `application.trigger` Table](#the-applicationtrigger-table) below. | `[application.trigger.http]`<br />`base = "/"` |

## The `application.trigger` Table

The `application.trigger` should contain only one key, the trigger type whose settings you want to override. This is usually written inline as part of the TOML table header, e.g. `[application.trigger.http]`.

> In many cases, your trigger will have no settings, or the default ones will suffice. In this case, you can omit the `application.trigger` table.

> If you're familiar with manifest version 1, note that this is now optional. The trigger type to which the application responds is determined by the top-level `trigger` mappings; you only need to provide an `application.trigger` if you want to override the default global settings for the trigger type.

### The `application.trigger.http` Table

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `base`                  | Optional   | String      | The base path of the application. All component routes are relative to this. It allows multiple applications to be mounted under the same host. | `"/"` |

### The `application.trigger.redis` Table

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `address`               | Required   | String      | The address of the Redis instance the components are using the message subscriptions. Use the `redis:` URL scheme. | `"redis://localhost:6379"` |

## The `variables` Table

The keys of the `variables` table are user-defined.  The value of each key is another table with the fields shown in the following table.

> Because each `variables` value usually contains only a few simple fields, you will usually see the table entries written inline with the values written using brace notation, rather than fully written out using square-brackets table syntax for each variable.  For example:
>
> ```toml
> [variables]
> vessel = { default = "teapot" }
> token = { required = true, secret = true }
> ```

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `default`               | Optional   | String      | The value of the variable if no value is supplied at runtime. If specified, the value must be a string. If not specified, `required` must be `true`. | `"teapot"` |
| `required`              | Optional   | Boolean     | Whether a value must be supplied at runtime. If not specified, `required` defaults to `false`, and `default` must be provided | `false` |
| `secret`                | Optional   | Boolean     | If set, this variable should be treated as sensitive. | `false` |

## The `trigger` Table

The `trigger` table contains only one key, the trigger type to which your application responds. The value of this key is a table array. In practice, the `trigger` table is written using table array syntax with the trigger type inlined into each entry. For example:

```toml
[[trigger.http]]
route = "/users"
component = "user-manager"

[[trigger.http]]
route = "/reports"
component = "report"
```

Each array entry contains a mix of common fields and trigger-specific fields.

### Common Fields for All `trigger.(type)` Tables

| Name                    | Required?  | Type            | Value    | Example   |
|-------------------------|------------|-----------------|----------|-----------|
| `component`             | Required   | String or table | The component to run when a trigger event matching the trigger setting occurs (for example, when Spin receives an HTTP request matching the trigger's `route`). It can be in one of the following formats: |  |
|                         |            | String          | * A key in the `component` table | `"user-manager"` |
|                         |            | Table           | * Specifies an unnamed component to be associated with the trigger setting. This allows simple components to be written inline instead of needing a separate section. Such a table follows [the `component` table](#the-component-table) format. | { source = "reports.wasm" }` |

### Additional Fields for `trigger.http` Tables

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `route`                 | Required   | String      | The route which this component handles. Requests to the route will cause the component to execute. This may be an exact route (`/example`), which matches on the given path, or a wildcard route indicated by the suffix `/...` (`/example/...`), which matches any route under this prefix. If two routes overlap, requests are directed to the matching route with the longest prefix - see [the HTTP trigger documentation](http-trigger) for details and examples. | `"/api/cart/..."` |
| `executor`              | Optional   | Table       | How Spin should invoke the component. If present, this is a table.  The `type` key is required and may have the values `"spin"` or `"wagi"`. If omitted. the default is `{ type = "spin"}`. See [the HTTP trigger documentation](http-trigger) for details. | `{ type = "wagi" }` |
|                         |            |             | If `type = "spin"` there are no other keys defined. In this case, Spin calls the component using a standard Wasm component interface. Components built using Spin SDKs or Spin interface files use this convention. | `{ type = "spin" }` |
|                         |            |             | If `type = "wagi"`, Spin calls the component's "main" (`_start`) function using [a CGI-like interface](https://github.com/deislabs/wagi). Components built using languages or toolchains that do not support Wasm interfaces will need to be called in this way. In this case, the following additional keys may be set:<br/><br/>* `argv` (optional): The string representation of the `argv` list that should be passed into the handler. `${SCRIPT_NAME}` will be replaced with the script name, and `${ARGS}` will be replaced with the query parameters of the request, formatted as arguments. The default is to follow the CGI specification, and pass `${SCRIPT_NAME} ${ARGS}`<br/><br/>* `entrypoint` (optional): The name of the function to call as the entry point to this handler. By default, it is `_start` (which in most languages translates to `main` in the source code).<br/><br/>See [the HTTP trigger documentation](http-trigger) for details. | `{ type = "wagi" }` |

### Additional Fields for `trigger.redis` Tables

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `channel`               | Required   | String      | The Redis channel which this component handles. Messages on this channel will cause the component to execute. | `"purchases"` |

## The `component` Table

The keys of the `component` table, usually written as part of the table syntax e.g. `[component.my-component]`, are user-defined.  (In the preceding example, the key is `my-component`). Component names must be kebab-cased, i.e. the only permitted separator is a hyphen.

The value of each key is a table with the following fields.

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `description`           | Optional   | String      | A human-readable description of the component. | `"The shopping cart API"` |
| `source`                | Required   | String or table | The Wasm module which should handle the component. This must be built to work with the application trigger. It can be in one of the following formats: | |
|                         |            | String      | * The path to a Wasm file (relative to the manifest file) | `dist/cart.wasm` |
|                         |            | Table       | * The URL of a Wasm file downloadable over HTTP. This must be a table containing a `url` field for the Wasm file, and a `digest` field contains a SHA256 hex digest, used to check integrity. | `{ url = "https://example.com/example.wasm", digest = "sha256:6503...2375" }` |
| `files`                 | Optional   | Array of strings and/or tables | The files to be made available to the Wasm module at runtime. This is an array, and each element of the array is either: | `[ "images/*.jpg", { source = "assets/images", destination = "/pictures" } ]` |
|                         |            | String      | * A file path or glob pattern, relative to the manifest file. The matching file or files will be available in the Wasm module at the same relative paths. | `"images/*.jpg"` |
|                         |            | Table       | * A file or directory to be made available to the Wasm module at a specific path. This must be a table containing a `source` field for the file or directory relative to the manifest file, and a `destination` field containing the absolute path at which to make it available. | `{ source = "assets/images", destination = "/pictures" }` |
| `exclude_files`         | Optional   | Array of strings | Any files or glob patterns that should _not_ be available to the Wasm module at runtime, even though they match a `files` entry. | `[assets/images/test/**/*.*]` |
| `allowed_http_hosts`    | Optional   | Array of strings | The host names or addresses to which the Wasm component is allowed to send HTTP requests. This is retained to simplify transition from the [Version 1 manifest](./manifest-reference-v1.md); new applications should use `allow_outbound_hosts` instead. | `["example.com", "localhost:8081"]` |
| `allowed_outbound_hosts` | Optional  | Array of strings | The addresses to which the Wasm component is allowed to send network requests. This applies to the outbound HTTP, outbound Redis, MySQL and PostgreSQL APIs. (It does not apply to built-in storage services such as key-value and SQLite.) Each entry must contain both a scheme, a name (or IP address) and a port in `scheme://name:port` format. For known schemes, you may omit the port if it is the default for the scheme. Use `*` for wildcards. If this field is omitted or an empty list, no outbound access is permitted. | `["mysql://db.example.com", "*://example.com:4567", "http://127.0.0.1:*"]` |
| `key_value_stores`      | Optional   | Array of strings | An array of key-value stores that the Wasm module is allowed to read or write. A store named `default` is provided by the Spin runtime, though modules must still be permitted to access it. In current versions of Spin, `"default"` is the only store allowed. | `["default"]` |
| `environment`           | Optional   | Table       | Environment variables to be set for the Wasm module. This is a table. The table keys are user-defined; the values must be strings. | `{ DB_URL = "mysql://spin:spin@localhost/dev" }` |
| `build`                 | Optional   | Table       | The command that `spin build` uses to build this component. See [The `component.(id).build` Table](#the-componentidbuild-table) below. | `[component.cart.build]`<br />`command = "npm run build"` |
| `variables`             | Optional   | Table       | Dynamic configuration values to be made available to this component. The table keys are user-defined; the values must be strings, and may use template notation as described under [Dynamic Configuration](dynamic-configuration). | `[component.cart.variables]`<br />`api_base_url = "https://{{ api_host }}/v1"` |

> If you're familiar with manifest version 1, note that:
> * The component `id` is no longer a field within a `[[component]]`, but the key of the component in the table, written as part of the `[component.(id)]` header.
> * The trigger association is no longer a `[trigger]` sub-table but is written in the separate `trigger` table.
> * The `config` section is now named `variables`.

## The `component.(id).build` Table

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `command`               | Required   | String      | The command to execute on `spin build`. | `"cargo build --target wasm32-wasi --release"` |
| `workdir`               | Optional   | String      | The directory in which to execute `command`, relative to the manifest file. The default is the directory containing the manifest file. An example of where this is needed is a multi-component application where each component is its own source tree in its own directory. | `"my-project"` |
| `watch`                 | Optional   | Array of strings | The files or glob patterns which `spin watch` should monitor to determine if the component Wasm file needs to be rebuilt. These are relative to `workdir`, or to the directory containing the manifest file if `workdir` is not present. | `["src/**/*.rs", "Cargo.toml"]` |

## Next Steps

- Learn about [writing Spin applications and their manifests](writing-apps)
- Learn about [dynamic and runtime configuration](dynamic-configuration)
- See more information about the [HTTP trigger](http-trigger)
- See more information about the [Redis trigger](redis-trigger)
