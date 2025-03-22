title = "Documentation"
template = "functions_home"
date = "2025-01-01T00:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/a3000-docs/blob/main/content/wasm-functions/index.md"

---

Fermyon Wasm Functions is a globally distributed PaaS (Platform-as-a-Service) running edge native applications with [Spin](/spin) on top of Akamai's Connected Cloud. It offers fast and resilient hosting for Spin applications. This means that Fermyon Wasm Functions is tailored towards hosting applications, which need fast execution, and availability in multiple regions across the World.

Fermyon Wasm Functions does not require any operational effort on infrastructure from you as a user of the platform. Upon deploying a Spin application to the platform, the application is automatically distributed and made available in multiple regions within the service. A URL is provided for the application, which will persist across deployments.

![Architecture](/static/image/fwf-marketechture-sm.png)

In this documentation you can find resources that will help you [get started](./quickstart), showcase different types of applications and features you can take advantage of, explain core concepts, and provide help. If you are looking for information about building your first Spin application, start with the [Spin documentation](/spin).

- [Application Deployment](#application-deployment)
- [Traffic Routing](#traffic-routing)
- [Integration With Other Akamai Services](#integrations-with-other-akamai-services)

In this article we describe the core concepts of Fermyon Wasm Functions.

## Application Deployment

You can deploy Spin applications to Fermyon Wasm Functions with a single command using the [`spin aka`](aka-command-reference) plugin. Check out the [deployment guide and the `spin aka deploy` command](deploy) for more details.

## Traffic Routing

Fermyon Wasm Functions uses Akamai's Connected Cloud infrastructure and services to ensure requests from a client is always forwarded to the fastest responding region, where your application is available.

## Integration With Other Akamai Services

Any of Akamai's CDN, Security and Cloud services can easily be used with your Fermyon Wasm Functions Spin applications. Whether you want to use Akamai's API Acceleration to secure and cache requests and responses to and from your application, secure your application with App & API Protector, or integrate with Akamai's managed databases, this is all possible, and fast, as your Fermyon Wasm Functions runs within Akamai's Connected Cloud.

If you are in need of a self-hosted, isolated environment for executing Spin applications, talk to your Akamai sales team about [Fermyon Platform for Kubernetes](https://www.fermyon.com/platform). This platform runs atop Kubernetes inside of the Akamai Connected Cloud, and puts you in control of the environment.


<nav class="pagination is-clearfix mt-4" role="navigation" aria-label="pagination" style="display: block; width: 100%;">
  <a href="./quickstart" class="pagination-next is-pulled-right has-text-left has-background-white " style="height: 3rem;">
    <p class="m-0">Next page: &nbsp;</p>
    <p class="m-0 is-black">Quickstart Guide</p>
  </a>
</nav>