title = "Quotas, Limitations, and Technical FAQ"
template = "functions_main"
date = "2023-04-18T00:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/wasm-functions/faq.md"

---

- [Quota Limits](#quota-limits)
- [Known Limitations](#known-limitations)
  - [Spin Limitations](#spin-limitations)
  - [Other Limitations](#other-limitations)
- [Technical Frequently Asked Questions](#technical-frequently-asked-questions)
- [Next Steps](#next-steps)

## Quota Limits

> > If you're interested in higher limits, please [contact us](https://www.fermyon.com/contact) for assistance.

| All limits can be increased on request | Default Limit |
| -------------------------------------- | ------------- |
| Memory (MiB)                           | 128           |
| App Size (MiB)                         | 50            |
| Request handler duration (seconds)     | 30            |
| Request/response size (MiB)            | 10            |

## Known Limitations

### Spin Limitations

Fermyon Wasm Functions supports Spin CLI v0.6.0 or newer. That being said, there are certain Spin SDK triggers and APIs that are not yet supported on Fermyon Wasm Functions. Please review the table below to see what is supported today on Fermyon Wasm Functions:

| Feature                                                                                                         | Supported in Fermyon Wasm Functions?                           |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Triggers**                                                                                                    |
| [HTTP](https://spinframework.dev/http-trigger)                                                         | Supported                                                      |
| [Redis](https://spinframework.dev/redis-trigger)                                                       | Not supported                                                  |
| **APIs**                                                                                                        |
| [Outbound HTTP](https://spinframework.dev/v3/rust-components#sending-outbound-http-requests)           | Supported                                                      |
| [Configuration Variables](https://spinframework.dev/v3/variables)                                      | Supported                                                      |
| [Key Value Storage](https://spinframework.dev/v3/kv-store-api-guide)                                   | Supported                                                      |
| [SQLite Storage](https://spinframework.dev/sqlite-api-guide)                                           | Not supported                                                  |
| [Serverless AI](https://spinframework.dev/serverless-ai-api-guide)                                     | [Limited Access](https://fibsu0jcu2g.typeform.com/to/dOFZ338a) |
| [Service Chaining](https://spinframework.dev/http-outbound#local-service-chaining)                     | Supported                                                      |
| [MySQL](https://spinframework.dev/rdbms-storage#using-mysql-and-postgresql-from-applications)          | Supported                                                      |
| [PostgreSQL](https://spinframework.dev/rdbms-storage#using-mysql-and-postgresql-from-applications)     | Supported                                                      |
| [Outbound Redis](https://spinframework.dev/rust-components#storing-data-in-redis-from-rust-components) | Supported                                                      |
| [wasi-blobstore](https://github.com/WebAssembly/wasi-blobstore)                                                 | Not supported in Spin                                          |
| [wasi-config](https://github.com/WebAssembly/wasi-config)                                                       | Supported (2024-09-27 snapshot)                                |
| [wasi-keyvalue](https://github.com/WebAssembly/wasi-keyvalue)                                                   | `wasi:keyvalue/store` and `wasi:keyvalue/batch` interfaces supported (2024-10-17 snapshot) |
| [wasi-messaging](https://github.com/WebAssembly/wasi-messaging)                                                 | Not supported in Spin                                          |
| **Features**                                                                                                    |
| [Component dependencies](https://spinframework.dev/v3/writing-apps#using-component-dependencies)       | Supported                                                      |
| **Extensibility**                                                                                               |
| [Custom Triggers](https://spinframework.dev/extending-and-embedding)                                   | Not supported                                                  |

To learn more about what feature support looks like for various programming languages, visit the [Spin Language Support Guide](https://spinframework.dev/v3/language-support-overview).

### Other Limitations

- You cannot communicate between Spin applications using local name resolution
- [Runtime configuration](https://spinframework.dev/dynamic-configuration#runtime-configuration) is not supported at this time

## Technical Frequently Asked Questions

- **Q: Where is Fermyon Wasm Functions available today?**
  - Currently Fermyon Wasm Functions are deployed throughout North America and Europe, with larger geographic coverage coming soon.
- **Q: How is user data structured in Fermyon Wasm Functions?**
  - Each user has an associated account (created implicitly with `spin aka login`), which serves as the primary entity for managing their resources. An account is linked to zero or more Spin applications, allowing flexibility in how users develop and deploy their workloads.
- **Q: How are Spin applications managed within a Fermyon Wasm Functions account?**
  - Each Spin application belongs to a specific account and operates independently, ensuring modularity and security. Applications include metadata, dependencies, and deployment configurations, allowing for scalable and efficient management. If you have additional questions or need further clarification, please reach out to [support](./support.md).
- **Q: How long does a login session last with Fermyon Wasm Functions? Will my Spin applications persist after I’ve been logged out?**
  - Your login session (started by `spin aka login` is persisted until 30 days without activity. To learn more about the `spin aka` plugin, please visit the [reference documentation](/wasm-functions/aka-command-reference).
- **Q: How do I get help with Fermyon Wasm Functions?**
  - We’re here to help! Checkout the [“How Do I get Help” page](/wasm-functions/support) in the developer documentation for next steps.

## Next Steps

- Learn how to engage with Fermyon to get [support](support)
