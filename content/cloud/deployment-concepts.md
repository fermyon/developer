title = "Deployment Concepts"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/deployment-concepts.md"

---

- [Deployments in Fermyon Cloud](#deployments-in-fermyon-cloud)
- [OCI - the Open Container Initiative](#oci---the-open-container-initiative)
- [The Deployment Process Explained](#the-deployment-process-explained)
- [Deprecating Bindle - An Aggregate Object Storage System](#deprecating-bindle---an-aggregate-object-storage-system)

## Deployments in Fermyon Cloud

Deploying applications to a cloud service should be simple. Even though there is complexity involved in operating a cloud with many servers, many applications, and an ever-changing number of workloads, the user's responsibility when deploying their applications should be minimal.

In this article, we describe the core technologies and concepts, which are part of the deployment process in the Fermyon Cloud.

## OCI - the Open Container Initiative

The [Fermyon Cloud Plugin for Spin](https://developer.fermyon.com/cloud/cloud-command-reference) uses the [OCI Image](https://github.com/opencontainers/image-spec) and [OCI Distribution](https://github.com/opencontainers/distribution-spec) Specifications to move applications to the Cloud. These specifications enables the use of existing infrastructure to distribute applications between Spin and Fermyon Cloud.

It's important to note that Spin applications deployed using the Cloud Plugin, are not, however, compatible with being run by an [OCI runtime](https://github.com/opencontainers/runtime-spec) compatible runtime, like [runc](https://github.com/opencontainers/runc). If you want to explore running Spin applications using a container runtime, you can do so using [`containerd` and `runwasi`](https://github.com/containerd/runwasi).

> Note: The Fermyon Cloud Spin plugin supports upgrading an application which was deployed using an version older than 0.3.0. However, you cannot use a version prior to 0.3.0 to upgrade an application, which was already deployed using 0.3.0.

## The Deployment Process Explained

When you run the `spin cloud deploy` command, the following happens:

1. Packaging the application and uploading it to the Fermyon Cloud
  - The first step in deploying an application is to package all the files using the OCI specification. 
  - Following packaging, the image will be uploaded to an OCI compatible registry in the Fermyon Cloud.
2. Creating or upgrading an application
  - An application is upgraded if the application name, as defined in `spin.toml`, already exists in your Fermyon Cloud account.
  - Before serving traffic to the application, the deployment process checks for the application health endpoint and finishes once the application is concluded to be healthy by the cloud. The application health point is an integral part of the Fermyon Cloud, which does reserve the HTTP route `/.well-known/spin/health`, which will not be routed to your Spin components.
  - If an upgrade takes place, the failover from the old to the new deployment takes a short amount of time, during which you can observe replies from both deployments (version).

## Deprecating Bindle - An Aggregate Object Storage System

With the release of the [Spin Cloud Plugin](https://developer.fermyon.com/cloud/cloud-command-reference) [v0.3.0](https://github.com/fermyon/cloud-plugin/releases/tag/v0.3.0), the deployment mechanism is OCI, not Bindle. 

The Fermyon Cloud will soon stop supporting [Bindle](https://github.com/deislabs/bindle) for deploying Spin applications. It is highly recommended to start using OCI and the latest version of the Cloud Plugin.