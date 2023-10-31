title = "API Support Overview"
template = "spin_main"
date = "2023-11-02T01:00:00Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/api-guides-overview.md"

---

The following table shows the status of the interfaces Spin provides to applications.

| Host Capabilities/Interfaces                 | Stability    | Cloud   |
|----------------------------------------------|--------------|---------|
| [HTTP Trigger](./http-trigger)               | Stable       | Yes |
| [Redis Trigger](./redis-trigger)             | Stable       | No  |
| [Outbound HTTP](./http-outbound)             | Stable       | Yes |
| [Outbound Redis](./redis-outbound)           | Stable       | Yes |
| [Configuration Variables](./variables)       | Stable       | Yes |
| [PostgreSQL](./rdbms-storage)                | Experimental | Yes |
| [MySQL](./rdbms-storage)                     | Experimental | Yes |
| [Key-value Storage](./kv-store-api-guide)    | Stabilizing  | Yes |
| [Serverless AI](./serverless-ai-api-guide)   | Experimental | [Private Beta](/cloud/serverless-ai.md) |
| [SQLite Storage](./sqlite-api-guide)         | Experimental | Yes |

For more information about what is possible in the programming language of your choice, please see our [Language Support Overview](./language-support-overview).
