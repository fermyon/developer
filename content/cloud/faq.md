title = "Quotas, Limitations, and Technical FAQ"
template = "cloud_main"
date = "2023-04-18T00:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/faq.md"

---
- [Quota Limits](#quota-limits)
- [Known Limitations](#known-limitations)
  - [Fermyon Cloud Limitations](#fermyon-cloud-limitations)
  - [Spin Limitations](#spin-limitations)
  - [Other Limitations](#other-limitations)
- [Technical Frequently Asked Questions](#technical-frequently-asked-questions)
- [Next Steps](#next-steps)

## Quota Limits

The following are the quota for users based, stratified by the three [Subscription Plans](./pricing-and-billing.md) offered by Fermyon Cloud:

> \* Signifies a resource that is not an explicit line item in the Fermyon Cloud [Subscription Plan](https://www.fermyon.com/pricing) but is eligible for a quota increase for Growth and Enterprise Plan users who can reach out to <a href="mailto:sales@fermyon.com">Fermyon team</a> for assistance.

| | Starter Plan | Growth Plan | Enterprise Plan
|-----|-----|-----|-----|
| **Application Quota** |
| Spin application count | 5 | 100 | Contact us 
| Spin application package size (MB)* | 100 | 100 | Contact us
| Spin application deployments per minute* | 10 | 10 | Contact us
| Request handler duration (seconds)* | 10  | 10  | Contact us
| **Rate Limiting Quota** |
| Request execution count | 100,000  | 1,000,000  | Contact us
| Request executions per second* | 1,000 | 1,000 | Contact us 
| Spin application deployments per hour* | 100 | 100 | Contact us
| Outbound requests per hour per Spin app* | 500 | 500 | Contact us
| **Networking** |
| Custom domains * | 5 | 100 | Contact us
| Custom Fermyon subdomain character count* | 62 | 62 | Contact us
| Bandwidth egress (GB) | 5 | 50 | Contact us
| **Storage** |
| Key value store key size (bytes)* | 255 | 255 | Contact us
| Key value store storage size (GB) | 1 | 2 | Contact us
| Key value maximum keys* | 1,024 | 1,024 | Contact us
| SQLite Storage | [See private beta documentation](/cloud/noops-sql-db.md) | [See private beta documentation](/cloud/noops-sql-db.md)  | [See private beta documentation](/cloud/noops-sql-db.md) 
| **Regions** |
| Region count| 1 | 1 | Contact us

## Known Limitations

### Fermyon Cloud Limitations

- A custom Fermyon subdomain must be unique
- A user can execute a maximum of 3,000 requests per hour toward the Cloud API. This includes API requests from the CLI (`spin`) and navigating the Fermyon Cloud website.
- The device and browser token lifetime for Fermyon Cloud Dashboard authentication is 7 days
- A Spin application can have a maximum of 1 key value store

### Spin Limitations

Fermyon Cloud supports Spin CLI v0.6.0 or newer. That being said, there are certain Spin SDK triggers and APIs that are not yet supported on Fermyon Cloud. Please review the table below to see what is supported today on Fermyon Cloud: 

| Feature | SDK Supported? |
|-----|-----|
| **Triggers** |
| [HTTP](/spin/http-trigger) | Supported |
| [Redis](/spin/redis-trigger) | Not supported |
| **APIs** |
| [Outbound HTTP](/spin/rust-components.md#sending-outbound-http-requests) | Supported |
| [Configuration Variables](/spin/variables) | Supported |
| [Key Value Storage](/spin/kv-store-api-guide) | Supported (only default store) |
| [SQLite Storage](/spin/sqlite-api-guide) | [Private Beta](/cloud/noops-sql-db.md) |
| [MySQL](/spin/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [PostgreSQL](/spin/rdbms-storage#using-mysql-and-postgresql-from-applications) | Supported |
| [Outbound Redis](/spin/rust-components.md#storing-data-in-redis-from-rust-components) | Supported |
| **Extensibility** |
| [Custom Triggers](/spin/extending-and-embedding) | Not supported |

To learn more about what feature support looks like for various programming languages, visit the [Spin Language Support Guide](/spin/language-support-overview.md).

### Other Limitations

- You cannot communicate between Spin applications using local name resolution
- [Runtime configuration and secrets](/spin/dynamic-configuration#runtime-configuration) are not supported at this time

## Technical Frequently Asked Questions

- **Why do I see mixed replies from my service during an upgrade?**
  - When doing an upgrade of an application, there is a gradual roll-out happening. This means that requests will hit both the existing and new modules, as the upgrade completes. You will see a pattern like the one below, showing the body reply from an HTTP request:

<!-- @nocpy -->

```text
11:08:13 : Hello from Rust
11:08:18 : Hello from Rust - updated
11:08:19 : Hello from Rust
11:08:23 : Hello from Rust - updated
11:08:24 : Bad Gateway
11:08:26 : Hello from Rust - updated
11:08:27 : Bad Gateway
11:08:29 : Hello from Rust - updated
```

- **Q: It’s been over 72 hours and my custom domain hasn’t successfully verified, now what?** 
  - If you're a Growth or Enterprise plan user, please reach out to [support@fermyon.com](mailto://support@fermyon.com). Otherwise, please go to [Discord's](https://discord.com/invite/AAFNfS7NGf) #cloud channel for assistance. 

- **Q: How do I add a new record?**
  - At this time, you can only add a maximum of 1 custom domain to your Spin application. We do not support additional records at this time. To file a feedback request, please visit [github.com/fermyon/feedback](https://github.com/fermyon/feedback).

- **Can I configure external DNS for my custom domain on Fermyon Cloud?**
  - Fermyon Cloud only supports Fermyon DNS at this time for custom domains. To file a feedback request, please visit [github.com/fermyon/feedback](https://github.com/fermyon/feedback).

## Next Steps

- Learn how to engage with Fermyon to get [support](support)
