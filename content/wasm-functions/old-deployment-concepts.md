title = "Deployment Concepts"
template = "functions_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/wasm-functions/deployment-concepts.md"

---

- [Deployments in Fermyon Wasm Functions](#deployments-in-fermyon-wasm-functions)
- [OCI - the Open Container Initiative](#oci---the-open-container-initiative)
- [The Deployment Process Explained](#the-deployment-process-explained)

## Deployments in Fermyon Wasm Functions

Deploying applications to a cloud service should be simple. Even though there is complexity involved in operating a cloud with many servers across multiple regions, many applications, and an ever-changing number of workloads, the user's responsibility when deploying their applications should be minimal.

In this article, we describe the core technologies and concepts, which are part of the deployment process in the Fermyon Wasm Functions.

## OCI - the Open Container Initiative

The [`neutrino` Plugin for Spin](neutrino-command-reference) uses the [OCI Image](https://github.com/opencontainers/image-spec) and [OCI Distribution](https://github.com/opencontainers/distribution-spec) Specifications to move applications to Fermyon Wasm Functions. These specifications enables the use of existing infrastructure to distribute applications between Spin and Fermyon Wasm Functions.

It's important to note that Spin applications deployed using the `neutrino` Plugin, are not, however, compatible with being run by an [OCI runtime](https://github.com/opencontainers/runtime-spec) compatible runtime, like [runc](https://github.com/opencontainers/runc). If you want to explore running Spin applications using a container runtime, you can do so using [`containerd` and `runwasi`](https://github.com/containerd/runwasi).

## The Deployment Process Explained

When you run the `spin neutrino deploy` command, the following happens:

1. Packaging the application and uploading it to the Fermyon Wasm Functions
  - The first step in deploying an application is to package all the files using the OCI specification. 
  - Following packaging, the image will be uploaded to an OCI compatible registry in Fermyon Wasm Functions.
2. Creating or upgrading an application
  - An application is upgraded if the application identifier, as defined in `.neutrino/config.toml`, already exists in your Fermyon Wasm Functions account.
  - Before serving traffic to the application, the deployment process checks for the application health endpoint and finishes once the application is concluded to be healthy by the cloud. The application health point is an integral part of Fermyon Wasm Functions, which does reserve the HTTP route `.well-known/spin/info`, which will not be routed to your Spin components.
  - If an upgrade takes place, the failover from the old to the new deployment takes a short amount of time, during which you can observe replies from both deployments (version).
