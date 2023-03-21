title = "API Guides Overview"
template = "spin_main"
date = "2023-03-03T03:03:03Z"

---

### Spin's Hosting Capabilities and Interfaces

Spin is a multi-language framework for [writing server-like applications](https://developer.fermyon.com/spin/writing-apps) that compile into WebAssembly (Wasm). The Spin framework provides capabilities for your Wasm-powered application by offering a set of interfaces. For example, making sufficient HTTP functionality available to [send outbound HTTP requests](https://developer.fermyon.com/spin/http-outbound) and more.

The following table shows the status of capabilities/interfaces that you can use to build and run real-world applications with Wasm.

| Host Capabilities/Interfaces           | Stability  |    Cloud    |
|----------------------------------------|----------|-------|
| [HTTP](https://developer.fermyon.com/spin/http-trigger)                          | Stable   | Yes   |
| [Redis](https://developer.fermyon.com/spin/redis-trigger)                         | Stable   | No  |
| [Outbound HTTP](https://developer.fermyon.com/spin/rust-components.md#sending-outbound-http-requests)                          | Stable   | Yes   |
| [Outbound Redis](https://developer.fermyon.com/spin/rust-components.md#redis-components)                         | Stable  | Yes   |
| [Dynamic config](https://developer.fermyon.com/spin/dynamic-configuration)                         | Experimental | Coming soon |
| [PostgreSQL](https://developer.fermyon.com/spin/rdbms-storage)                             | Experimental | Yes |
| [MySQL](https://developer.fermyon.com/spin/rdbms-storage)                                  | Experimental | Yes |
| [Key-value storage](https://developer.fermyon.com/spin/kv-store.md)                      | Stabilizing | No |

For more information about what is possible in the programming language of your choice, please see our [Language Support Overview](https://developer.fermyon.com/spin/language-support-overview).