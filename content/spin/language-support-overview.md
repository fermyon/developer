title = "Language Support Overview"
template = "spin_main"
date = "2022-01-01T00:00:01Z"
enable_shortcodes = true
[extra]

---

This page contains information about language support for Spin features:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](https://developer.fermyon.com/spin/http-trigger) | Supported |
| [Redis](https://developer.fermyon.com/spin/redis-trigger) | Supported |
| **APIs** |
| [Outbound HTTP](https://developer.fermyon.com/spin/rust-components.md#sending-outbound-http-requests) | Supported |
| [Key Value Storage](https://developer.fermyon.com/spin/kv-store-api-guide) | Supported |
| [MySQL](https://developer.fermyon.com/spin/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [PostgreSQL](https://developer.fermyon.com/spin/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [Outbound Redis](https://developer.fermyon.com/spin/rust-components.md#storing-data-in-redis-from-rust-components) | Supported |
| **Extensibility** |
| [Authoring Custom Triggers](https://developer.fermyon.com/spin/extending-and-embedding) | Supported |

{{ blockEnd }}

{{ startTab "TypeScript"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](https://developer.fermyon.com/spin/javascript-components#http-components) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](https://developer.fermyon.com/spin/javascript-components#sending-outbound-http-requests) | Supported |
| [Key Value Storage](https://developer.fermyon.com/spin/kv-store-tutorial) | Supported |
| MySQL | Not Supported |
| PostgreSQL| Not Supported |
| [Outbound Redis](https://developer.fermyon.com/spin/javascript-components#storing-data-in-redis-from-jsts-components) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "Python"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](https://developer.fermyon.com/spin/python-components#a-simple-http-components-example) | Supported |
| Redis | Not Supported |
| **APIs** |
| [Outbound HTTP](https://developer.fermyon.com/spin/python-components#an-outbound-http-example) | Supported |
| [Key Value Storage](https://developer.fermyon.com/spin/kv-store-tutorial) | Supported |
| MySQL | Not Supported |
| PostgreSQL | Not Supported |
| [Outbound Redis](https://developer.fermyon.com/spin/python-components#an-outbound-redis-example) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ startTab "TinyGo"}}

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](https://developer.fermyon.com/spin/go-components#http-components) | Supported |
| [Redis](https://developer.fermyon.com/spin/go-components#redis-components) | Supported |
| **APIs** |
| [Outbound HTTP](https://developer.fermyon.com/spin/go-components#sending-outbound-http-requests) | Supported |
| [Key Value Storage](https://developer.fermyon.com/spin/kv-store-tutorial) | Supported |
| MySQL | Not Supported |
| PostgreSQL | Not Supported |
| [Outbound Redis](https://developer.fermyon.com/spin/go-components#storing-data-in-redis-from-go-components) | Supported |
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
| Key Value Storage | Not Supported |
| MySQL | Not Supported |
| [PostgreSQL](https://github.com/fermyon/spin-dotnet-sdk#working-with-postgres) | Supported |
| [Outbound Redis](https://github.com/fermyon/spin-dotnet-sdk#making-redis-requests) | Supported |
| **Extensibility** |
| Authoring Custom Triggers | Not Supported |

{{ blockEnd }}

{{ blockEnd }}