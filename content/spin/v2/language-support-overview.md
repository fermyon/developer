title = "Language Support Overview"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/language-support-overview.md"

---

This page contains information about language support for Spin features:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

**[📄 Visit the Rust Spin SDK reference documentation](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/index.html) to see specific modules, functions, variables and syntax relating to the following Rust features.**

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](./http-trigger) | Supported |
| [Redis](./redis-trigger) | Supported |
| **APIs** |
| [Outbound HTTP](./rust-components.md#sending-outbound-http-requests) | Supported |
| [Configuration Variables](./variables) | Supported |
| [Key Value Storage](./kv-store-api-guide) | Supported |
| [SQLite Storage](./sqlite-api-guide) | Supported |
| [MySQL](./rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [PostgreSQL](./rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [Outbound Redis](./rust-components.md#storing-data-in-redis-from-rust-components) | Supported |
| [Serverless AI](./serverless-ai-api-guide) | Supported |
| **Extensibility** |
| [Authoring Custom Triggers](./extending-and-embedding) | Supported |

{{ blockEnd }}

{{ startTab "TypeScript"}}

**[📄 Visit the JS/TS Spin SDK reference documentation](https://fermyon.github.io/spin-js-sdk/) to see specific modules, functions, variables and syntax relating to the following TS/JS features.**

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](./javascript-components#http-components) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](./javascript-components#sending-outbound-http-requests) | Supported |
| [Configuration Variables](./dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](./kv-store-api-guide) | Supported |
| [SQLite Storage](./sqlite-api-guide) | Supported |
| [MySQL](./rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [PostgreSQL](./rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [Outbound Redis](./javascript-components#storing-data-in-redis-from-jsts-components) | Supported |
| [Serverless AI](./serverless-ai-api-guide) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "Python"}}

**[📄 Visit the Python Spin SDK reference documentation](https://fermyon.github.io/spin-python-sdk/) to see specific modules, functions, variables and syntax relating to the following Python SDK.**

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](./python-components#a-simple-http-components-example) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](./python-components#an-outbound-http-example) | Supported |
| [Configuration Variables](./dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](./kv-store-api-guide) | Supported |
| [SQLite Storage](./sqlite-api-guide) | Supported |
| MySQL | Not Supported |
| PostgreSQL | Not Supported |
| [Outbound Redis](./python-components#an-outbound-redis-example) | Supported |
| [Serverless AI](./serverless-ai-api-guide) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "TinyGo"}}

**[📄 Visit the TinyGo Spin SDK reference documentation](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2) to see specific modules, functions, variables and syntax relating to the following TinyGo SDK.**

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](./go-components#http-components) | Supported |
| [Redis](./go-components#redis-components) | Supported |
| **APIs** |
| [Outbound HTTP](./go-components#sending-outbound-http-requests) | Supported |
| [Configuration Variables](./dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](./kv-store-api-guide) | Supported |
| [SQLite Storage](./sqlite-api-guide) | Supported |
| [MySQL](./rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [PostgreSQL](./rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [Outbound Redis](./go-components#storing-data-in-redis-from-go-components) | Supported |
| [Serverless AI](./serverless-ai-api-guide) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ blockEnd }}
