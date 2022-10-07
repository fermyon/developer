title = "FAQ and Known Limitations"
template = "cloud_main"
date = "2022-10-05T00:00:00Z"
enable_shortcodes=true

---

This document contains:

- [Service Limits](#service-limits)
- [Known Limitations](#known-limitations)
- [Frequently Asked Questions](#frequently-asked-questions)

## Service Limits

The following are the limits of the Fermyon Cloud

- A user account can have a maximum of five Spin applications deployed at any time
- A Spin application can have no more than 1.000 executions (requests) per hour when running in the Fermyon Cloud
- A user account can execute a maximum of 10 deployments in a minute
- A user account can execute a maximum of 100 deployments in an hour
- A user can execute a maximum of 3.000 requests per hour toward the API. This includes API requests from the CLI (`spin`) and navigating the Fermyon Cloud website.
- The device and browser token lifetime is 7 days

## Known Limitations

The following are known limitations of the Fermyon Cloud

- You cannot use WAGI as an executor in a Spin application
- You cannot use Redis triggers
- You cannot communicate between Spin applications using local name resolution
- You cannot use a Spin SDK before v0.6.0

## Frequently Asked Questions

- **I’m getting this error when deploying an upgrade `Error: Failed to push bindle to server. Bindle xyz/0.1.0+q49cbd59 already exists on the server`**
  - This will happen if you try to redeploy the same build of a Spin application. \n\nPlease rebuild the application before trying to redeploy." }}

- **Why do I see mixed replies from my service during an upgrade?**
  - When doing an upgrade of an application, there is a gradual roll-out happening. This means that requests will hit both the existing and new modules, as the upgrade completes. You will see a pattern like the one below, showing the body reply from an HTTP request:

```bash
11:08:13 : Hello from Rust
11:08:18 : Hello from Rust - updated
11:08:19 : Hello from Rust
11:08:23 : Hello from Rust - updated
11:08:24 : Bad Gateway
11:08:26 : Hello from Rust - updated
11:08:27 : Bad Gateway
11:08:29 : Hello from Rust - updated
```

- **I’m receiving this error when running `spin deploy` `Error: Unable to create Hippo app` `Caused by: {"type":"[https://tools.ietf.org/html/rfc7231#section-6.6.1","title":"An](https://tools.ietf.org/html/rfc7231#section-6.6.1%22,%22title%22:%22An) error occurred while processing your request.","status":500}`**
  - There are two reasons you may see this error:
    - You are deploying a Spin application using an unsupported executor (wagi).
      - You will be stuck with an empty application in the portal. Please reach out on Discord for us to help delete that application
    - You have reached the limit of running five application
      - Please delete an application

- **I’m seeing this message `https://bindle.traefik.prod.us-east-1.fermyon.link/v1 is responding slowly or not responding...` when I run `spin deploy`**
  - This can happen if you deploy a large Spin application to the service. If no other errors are reported, this is just a transient error message.

- **My application is stuck in the Pending state**
  - This can happen if you deploy a Redis-triggered Spin application, which is not yet supported.

- **When running `spin deploy` I see the following error** `Error: Hippo server [https://platform.fermyon.link/](https://platform.fermyon.link/) is unhealthy`**
  - Make sure you use Spin 0.5.0 (b9fedcc 2022-09-02) or a newer version
