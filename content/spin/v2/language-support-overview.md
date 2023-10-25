title = "Language Support Overview"
template = "spin_main"
date = "2023-11-02T16:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/v2/language-support-overview.md"

---

This page contains information about language support for Spin features:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/v2/v2/http-trigger) | Supported |
| [Redis](/spin/v2/v2/redis-trigger) | Supported |
| **APIs** |
| [Outbound HTTP](/spin/v2/v2/rust-components.md#sending-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/v2/v2/variables) | Supported |
| [Key Value Storage](/spin/v2/v2/kv-store-api-guide) | Supported |
| [SQLite Storage](/spin/v2/v2/sqlite-api-guide) | Supported |
| [MySQL](/spin/v2/v2/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [PostgreSQL](/spin/v2/v2/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [Outbound Redis](/spin/v2/v2/rust-components.md#storing-data-in-redis-from-rust-components) | Supported |
| [Serverless AI](/spin/v2/v2/rust-components.md#ai-inferencing-from-rust-components) | Supported |
| **Extensibility** |
| [Authoring Custom Triggers](/spin/v2/v2/extending-and-embedding) | Supported |

{{ blockEnd }}

{{ startTab "TypeScript"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/v2/v2/javascript-components#http-components) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](/spin/v2/v2/javascript-components#sending-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/v2/v2/dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](/spin/v2/v2/kv-store-api-guide) | Supported |
| [SQLite Storage](/spin/v2/v2/sqlite-api-guide) | Supported |
| MySQL | Not Supported |
| PostgreSQL| Not Supported |
| [Outbound Redis](/spin/v2/v2/javascript-components#storing-data-in-redis-from-jsts-components) | Supported |
| [Serverless AI](/spin/v2/v2/javascript-components#ai-inferencing-from-jsts-components) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "Python"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/v2/v2/python-components#a-simple-http-components-example) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](/spin/v2/v2/python-components#an-outbound-http-example) | Supported |
| [Configuration Variables](/spin/v2/v2/dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](/spin/v2/v2/kv-store-api-guide) | Supported |
| [SQLite Storage](/spin/v2/v2/sqlite-api-guide) | Supported |
| MySQL | Not Supported |
| PostgreSQL | Not Supported |
| [Outbound Redis](/spin/v2/v2/python-components#an-outbound-redis-example) | Supported |
| [Serverless AI](/spin/v2/v2/python-components#ai-inferencing-from-python-components) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "TinyGo"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/v2/v2/go-components#http-components) | Supported |
| [Redis](/spin/v2/v2/go-components#redis-components) | Supported |
| **APIs** |
| [Outbound HTTP](/spin/v2/v2/go-components#sending-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/v2/v2/dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](/spin/v2/v2/kv-store-api-guide) | Supported |
| [SQLite Storage](/spin/v2/v2/sqlite-api-guide) | Supported |
| MySQL | Not Supported |
| PostgreSQL | Not Supported |
| [Outbound Redis](/spin/v2/v2/go-components#storing-data-in-redis-from-go-components) | Supported |
| Serverless AI | Not Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "C#"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](https://github.com/fermyon/spin-dotnet-sdk#handling-http-requests) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](https://github.com/fermyon/spin-dotnet-sdk#making-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/v2/v2/dynamic-configuration#custom-config-variables) | Supported |
| Key Value Storage | Not Supported |
| SQLite Storage | Not supported |
| MySQL | Not Supported |
| [PostgreSQL](https://github.com/fermyon/spin-dotnet-sdk#working-with-postgres) | Supported |
| [Outbound Redis](https://github.com/fermyon/spin-dotnet-sdk#making-redis-requests) | Supported |
| Serverless AI | Not Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ blockEnd }}
