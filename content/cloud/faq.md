title = "FAQ and Known Limitations"
template = "cloud_main"
date = "2022-10-05T00:00:00Z"
enable_shortcodes = true

---

This document contains:

- [Service Limits](#service-limits)
- [Known Limitations](#known-limitations)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Next Steps](#next-steps)

## Service Limits

The following are the limits of the Fermyon Cloud

- A user account can have a maximum of five Spin applications deployed at any time
- A Spin application can have no more than 1.000 executions (inbound HTTP requests) per hour
- A Spin application can have no more than 500 outbound requests per hour
- A user account can execute a maximum of 10 deployments in a minute
- A user account can execute a maximum of 100 deployments in an hour
- A user can execute a maximum of 3,000 requests per hour toward the API. This includes API requests from the CLI (`spin`) and navigating the Fermyon Cloud website.
- The device and browser token lifetime is 7 days

## Known Limitations

The following are known limitations of the Fermyon Cloud

- You cannot use WAGI as an executor in a Spin application
- You cannot use Redis triggers
- You cannot communicate between Spin applications using local name resolution
- You cannot use a Spin SDK before v0.6.0

## Frequently Asked Questions

- **Why do I see mixed replies from my service during an upgrade?**
  - When doing an upgrade of an application, there is a gradual roll-out happening. This means that requests will hit both the existing and new modules, as the upgrade completes. You will see a pattern like the one below, showing the body reply from an HTTP request:

```console
11:08:13 : Hello from Rust
11:08:18 : Hello from Rust - updated
11:08:19 : Hello from Rust
11:08:23 : Hello from Rust - updated
11:08:24 : Bad Gateway
11:08:26 : Hello from Rust - updated
11:08:27 : Bad Gateway
11:08:29 : Hello from Rust - updated
```

## Next Steps

- Learn how to engage with Fermyon to get [support](support)
