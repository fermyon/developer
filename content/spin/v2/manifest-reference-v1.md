title = "Spin Application Manifest (Version 1) Reference"
template = "spin_main"
date = "2023-11-03T01:00:00Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/manifest-reference-v1.md"

---
- [Format](#format)
- [Manifest Fields](#manifest-fields)
- [The `trigger` Table](#the-trigger-table)
  - [The `trigger` Table for HTTP Applications](#the-trigger-table-for-http-applications)
  - [The `trigger` Table for Redis Applications](#the-trigger-table-for-redis-applications)
- [The `variables` Table](#the-variables-table)
- [The `component` Tables](#the-component-tables)
  - [The `component.trigger` Table for HTTP Applications](#the-componenttrigger-table-for-http-applications)
  - [The `component.trigger` Table for Redis Applications](#the-componenttrigger-table-for-redis-applications)
  - [The `component.build` Table](#the-componentbuild-table)
- [Next Steps](#next-steps)

This page describes version 1 of the Spin manifest file, typically called `spin.toml`.

> There are two versions of the manifest format. The manifest format described here (version 1) is used for Spin 1.x, and is supported for backward in Spin 2.x and above. New applications targeting Spin 2 should use the [version 2 manifest format](manifest-reference.md).

## Format

The manifest is a TOML file, and follows standard TOML syntax.  See the [TOML documentation](https://toml.io/) for information about the TOML syntax.

## Manifest Fields

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `spin_manifest_version` | Required   | String      | The version of the file format that the rest of the manifest follows. Currently, this value must be `"1"`. | `"1"` |
| `name`                  | Required   | String      | The name of the application. This may be any string of alphanumeric characters, hyphens and underscores. | `"hello-world"` |
| `version`               | Required   | String      | The version of the application. The must be a string of the form `major.minor.patch`, where each element is a number. | `"1.0.5"` |
| `description`           | Optional   | String      | A human-readable description of the application. | `"The best app for all your world-greeting needs"` |
| `authors`               | Optional   | Array of strings | The authors of the applications. If present, this must ba an array, even if it has only one entry. | `["Jane Q Hacker (<dev@example.com>)"]` |
| `trigger`               | Required   | Table       | The trigger for the application - that is, the kind of event that the application responds to. The table must contain the `type` field, and may contain others depending on the value of `type`. See [The `trigger` Table](#the-trigger-table) for details. | `{ type = "http", base = "/" }` |
| `variables`             | Optional   | Table       | Dynamic configuration variables which the user can set when they run the application. See [The `variables` Table](#the-variables-table) below. | `[variables]`<br />`message = { default = "hello" }` |
| `component`             | Required   | Table array | A manifest must contain at least one `component` table. `component` is always an array, even if there is only one component, so always use double square brackets.  See [The `component` Tables](#the-component-tables) below. | `[[component]]`<br />`id = "hello"` |

## The `trigger` Table

The `trigger` table specifies the events that the application responds to.  The `type` field is always required, but the other fields depend on the `type`.  This section describes the built-in `http` and `redis` trigger types.

> Because the `trigger` table usually contains only a few simple fields, you will usually see it written inline using brace notation, rather than written out using square-brackets table syntax.  For example:
>
> ```toml
> trigger = { type = "http", base = "/" }
> ```

### The `trigger` Table for HTTP Applications

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `type`                  | Required   | String      | Always `"http"` for HTTP applications. | `"http"` |
| `base`                  | Required   | String      | The base path of the application. All component routes are relative to this. It allows multiple applications to be mounted under the same host. | `"/"` |

### The `trigger` Table for Redis Applications

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `type`                  | Required   | String      | Always `"redis"` for Redis applications. | `"redis"` |
| `address`               | Required   | String      | The address of the Redis instance the components are using the message subscriptions. Use the `redis:` URL scheme. | `"redis://localhost:6379"` |

## The `variables` Table

The keys of `variables` table are user-defined.  The value of each key is another table with the fields shown in the following table.

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

## The `component` Tables

`component` is a table array, meaning each component is introduced with double-bracket syntax.  Subtables are written using single-bracket syntax or inline JSON syntax.  For example:

```toml
[[component]]
id = "hello"
source = "hello.wasm"
[component.trigger]
route = "/hello"
```

Each table in the `component` array contains the following fields:

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `id`                    | Required   | String      | An identifier for this component, unique within the application. This may be any string of alphanumeric characters, hyphens and underscores. | `"cart-api"` |
| `description`           | Optional   | String      | A human-readable description of the component. | `"The shopping cart API"` |
| `source`                | Required   | String or table | The Wasm module which should handle the component. This must be built to work with the application trigger. It can be in one of the following formats: | |
|                         |            | String      | * The path to a Wasm file (relative to the manifest file) | `dist/cart.wasm` |
|                         |            | Table       | * The URL of a Wasm file downloadable over HTTP. This must be a table containing a `url` field for the Wasm file, and a `digest` field contains a SHA256 hex digest, used to check integrity. | `{ url = "https://example.com/example.wasm", digest = "sha256:6503...2375" }` |
| `files`                 | Optional   | Array of strings and/or tables | The files to be made available to the Wasm module at runtime. This is an array, and each element of the array is either: | `[ "images/*.jpg", { source = "assets/images", destination = "/pictures" } ]` |
|                         |            | String      | * A file path or glob pattern, relative to the manifest file. The matching file or files will be available in the Wasm module at the same relative paths. | `"images/*.jpg"` |
|                         |            | Table       | * A directory to be made available to the Wasm module at a specific path. This must be a table containing a `source` field for the directory relative to the manifest file, and a `destination` field containing the absolute path at which to make it available. | `{ source = "assets/images", destination = "/pictures" }` |
| `exclude_files`         | Optional   | Array of strings | Any files or glob patterns that should _not_ be available to the Wasm module at runtime, even though they match a `files` entry. | `[assets/images/test/**/*.*]` |
| `allowed_http_hosts`    | Optional   | Array of strings | The host names or addresses to which the Wasm module is allowed to send HTTP requests. If the name includes a port, the Wasm module can send requests only to that port; otherwise, the Wasm module can send requests only to the default port for the scheme it uses. The special string `insecure:allow-all` permits the module to send HTTP requests to _any_ host, but is intended for development use only; some deployment environments may decline to honour it. | `["example.com", "localhost:8081"]` |
| `allowed_outbound_hosts` | Optional  | Array of strings | The addresses to which the Wasm component is allowed to send network requests. This applies to the outbound HTTP, outbound Redis, MySQL and PostgreSQL APIs. (It does not apply to built-in storage services such as key-value and SQLite.) Each entry must contain both a scheme, a name (or IP address) and a port in `scheme://name:port` format. For known schemes, you may omit the port if it is the default for the scheme. Use `*` for wildcards. If this field is omitted, no outbound access is permitted, _except_ that, for backward compatibility, a Spin 1 component may use Redis, MySQL or PostgreSQL to _any_ host. If this field is present and empty, however, no outbound access if permitted, regardless of the component's Spin version. | `["mysql://db.example.com", "*://example.com:4567", "http://127.0.0.1:*"]` |
| `key_value_stores`      | Optional   | Array of strings | An array of key-value stores that the Wasm module is allowed to read or write. A store named `default` is provided by the Spin runtime, though modules must still be permitted to access it. In current versions of Spin, `"default"` is the only store allowed. | `["default"]` |
| `environment`           | Optional   | Table       | Environment variables to be set for the Wasm module. This is a table. The table keys are user-defined; the values must be strings. | `{ DB_URL = "mysql://spin:spin@localhost/dev" }` |
| `trigger`               | Required   | Table       | Specifies how this component is triggered. This is a table, whose contents of are trigger-specific; see below. | `[component.trigger]`<br />`route = "/..."` |
| `build`                 | Optional   | Table       | The command that `spin build` uses to build this component. See [The `component.build` Table](#the-componentbuild-table) below. | `[component.build]`<br />`command = "npm run build"` |
| `config`                | Optional   | Table       | Dynamic configuration values to be made available to this component. The table keys are user-defined; the values must be strings, and may use template notation as described under [Dynamic Configuration](dynamic-configuration). | `[component.config]`<br />`api_base_url = "https://{{ api_host }}/v1"` |

### The `component.trigger` Table for HTTP Applications

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `route`                 | Required   | String      | The route which this component handles. Requests to the route will cause the component to execute. This may be an exact route (`/example`), which matches on the given path, or a wildcard route indicated by the suffix `/...` (`/example/...`), which matches any route under this prefix. If two routes overlap, requests are directed to the matching route with the longest prefix - see [the HTTP trigger documentation](http-trigger) for details and examples. | `"/api/cart/..."` |
| `executor`              | Optional   | Table       | How Spin should invoke the component. If present, this is a table.  The `type` key is required and may have the values `"spin"` or `"wagi"`. If omitted. the default is `{ type = "spin"}`. See [the HTTP trigger documentation](http-trigger) for details. | `{ type = "wagi" }` |
|                         |            |             | If `type = "spin"` there are no other keys defined. In this case, Spin calls the component using a standard Wasm component interface. Components built using Spin SDKs or Spin interface files use this convention. | `{ type = "spin" }` |
|                         |            |             | If `type = "wagi"`, Spin calls the component's "main" (`_start`) function using [a CGI-like interface](https://github.com/deislabs/wagi). Components built using languages or toolchains that do not support Wasm interfaces will need to be called in this way. In this case, the following additional keys may be set:<br/><br/>* `argv` (optional): The string representation of the `argv` list that should be passed into the handler. `${SCRIPT_NAME}` will be replaced with the script name, and `${ARGS}` will be replaced with the query parameters of the request, formatted as arguments. The default is to follow the CGI specification, and pass `${SCRIPT_NAME} ${ARGS}`<br/><br/>* `entrypoint` (optional): The name of the function to call as the entry point to this handler. By default, it is `_start` (which in most languages translates to `main` in the source code).<br/><br/>See [the HTTP trigger documentation](http-trigger) for details. | `{ type = "wagi" }` |

### The `component.trigger` Table for Redis Applications

| Name                    | Required?  | Type        | Value    | Example   |
|-------------------------|------------|-------------|----------|-----------|
| `channel`               | Required   | String      | The Redis channel which this component handles. Messages on this channel will cause the component to execute. | `"purchases"` |

### The `component.build` Table

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
