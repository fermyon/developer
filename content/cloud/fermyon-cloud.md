title = "Fermyon Cloud"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/fermyon-cloud.md"
---

- [The Fermyon Cloud Explained](#the-fermyon-cloud-explained)
- [Core Components of the Fermyon Cloud](#core-components-of-the-fermyon-cloud)
  - [Orchestration](#orchestration)
  - [Service Resolution](#service-resolution)
  - [Traffic routing](#traffic-routing)
  - [Application Packaging and Distribution](#application-packaging-and-distribution)
  - [Web UI, API and CLI](#web-ui-api-and-cli)

## The Fermyon Cloud Explained

[The Fermyon Cloud](https://cloud.fermyon.com) is a cloud application platform for WebAssembly microservices. It enables you to run [Spin applications](/spin), at scale, in the cloud, without any infrastructure set up.

In this article, we describe the core technologies and concepts, which are part of the Fermyon Cloud.

## Core Components of the Fermyon Cloud

The Fermyon Cloud is an expansion of the [Fermyon Platform](https://github.com/fermyon/installer), and is a cloud platform, built to provide scaleable and resilient hosting for Spin applications. 

The following core components are, among others, needed in a cloud platform:

1. Orchestration - Ensures workloads can be distributed across multiple servers
2. Service Resolution - Ensures services can resolve other services endpoints
3. Traffic Routing - Ensure traffic flows to the services, for which it is intended
4. Application Packaging and Distribution - Ensures application can be retrieved by servers needing to run the workloads
5. Web UI and CLI

All of the above are cornerstones in ensuring the high dynamism of a cloud platform where applications and traffic come and go, in a non-predictable pattern.

### Orchestration

The core orchestration in the Fermyo Cloud is done using [HashiCorps Nomad](https://www.hahshicorp.com/nomad). Nomad enables the Fermyon Cloud to spread workloads across servers, and run an optimized highly resilient cloud. Nomad guarantees quick placement of Spin applications, at deployment, upgrade and failures in the underlaying infrastructer - which do happen, so we planed for it.

### Service Resolution

In order to successfully route traffic to your Spin applications, a service registry is needed to map application endpoints to sockets on servers. This is done using Consul, as an integrated part of Nomad. Consul helps ensure we can always find you application, as the orchestration engine may or may not move it around.

### Traffic routing

Traffic routing is done using Traefik, which ensures the data packet are send to the right places in the cloud.

### Application Packaging and Distribution

To package and distribute application to and within the cloud, we rely on Bindle. For more information about deployment concepts in the Fermyon Cloud, see [here](deployment-concept).

### Web UI, API and CLI

The Fermyon Cloud exposes a public [REST API](rest-api.md), whihc is used by the [web interface](https://cloud.fermyon.com), and the Spin CLI, when logging in and deploying applications.
