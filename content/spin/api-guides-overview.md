title = "API Support Overview"
template = "spin_main"
date = "2023-03-03T03:03:03Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/api-guides-overview.md"

---

The following table shows the status of the interfaces Spin provides to applications.

| Host Capabilities/Interfaces           | Stability  |    Cloud    |
|----------------------------------------|----------|-------|
| [HTTP Trigger](/spin/http-trigger)                          | Stable   | Yes   |
| [Redis Trigger](/spin/redis-trigger)                         | Stable   | No  |
| [Outbound HTTP](/spin/http-outbound)                          | Stable   | Yes   |
| [Outbound Redis](/spin/redis-outbound)                         | Stable  | Yes   |
| [Configuration Variables](/spin/variables)                      | Stable | Yes |
| [PostgreSQL](/spin/rdbms-storage)                             | Experimental | Yes |
| [MySQL](/spin/rdbms-storage)                                  | Experimental | Yes |
| [Key-value Storage](/spin/kv-store-api-guide)                      | Stabilizing | Yes |
| [SQLite Storage](/spin/sqlite-api-guide)                      | Experimental | [Private Beta](/cloud/noops-sql-db.md) |

For more information about what is possible in the programming language of your choice, please see our [Language Support Overview](/spin/language-support-overview).
