title = "Language Support Overview"
template = "spin_main"
date = "2022-01-01T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/language-support-overview.md"

---

This page contains information about language support for Spin features:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/http-trigger) | Supported |
| [Redis](/spin/redis-trigger) | Supported |
| **APIs** |
| [Outbound HTTP](/spin/rust-components.md#sending-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/variables) | Supported |
| [Key Value Storage](/spin/kv-store-api-guide) | Supported |
| [SQLite Storage](/spin/sqlite-api-guide) | Supported |
| [MySQL](/spin/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [PostgreSQL](/spin/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [Outbound Redis](/spin/rust-components.md#storing-data-in-redis-from-rust-components) | Supported |
| **Extensibility** |
| [Authoring Custom Triggers](/spin/extending-and-embedding) | Supported |

{{ blockEnd }}

{{ startTab "TypeScript"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/javascript-components#http-components) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](/spin/javascript-components#sending-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](/spin/kv-store-api-guide) | Supported |
| SQLite Storage | Not supported |
| MySQL | Not Supported |
| PostgreSQL| Not Supported |
| [Outbound Redis](/spin/javascript-components#storing-data-in-redis-from-jsts-components) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "Python"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/python-components#a-simple-http-components-example) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](/spin/python-components#an-outbound-http-example) | Supported |
| [Configuration Variables](/spin/dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](/spin/kv-store-api-guide) | Supported |
| SQLite Storage | Not supported |
| MySQL | Not Supported |
| PostgreSQL | Not Supported |
| [Outbound Redis](/spin/python-components#an-outbound-redis-example) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "TinyGo"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/go-components#http-components) | Supported |
| [Redis](/spin/go-components#redis-components) | Supported |
| **APIs** |
| [Outbound HTTP](/spin/go-components#sending-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/dynamic-configuration#custom-config-variables) | Supported |
| [Key Value Storage](/spin/kv-store-api-guide) | Supported |
| SQLite Storage | Not supported |
| MySQL | Not Supported |
| PostgreSQL | Not Supported |
| [Outbound Redis](/spin/go-components#storing-data-in-redis-from-go-components) | Supported |
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
| [Configuration Variables](/spin/dynamic-configuration#custom-config-variables) | Supported |
| Key Value Storage | Not Supported |
| SQLite Storage | Not supported |
| MySQL | Not Supported |
| [PostgreSQL](https://github.com/fermyon/spin-dotnet-sdk#working-with-postgres) | Supported |
| [Outbound Redis](https://github.com/fermyon/spin-dotnet-sdk#making-redis-requests) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ blockEnd }}