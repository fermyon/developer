title = "Spin on Kubernetes"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/kubernetes.md"

---
- [Why Use Spin With Kubernetes?](#why-use-spin-with-kubernetes)
- [How Does It Work?](#how-does-it-work)
- [Next Steps](#next-steps)
- [Setup Azure AKS for Spin](#setup-azure-aks-for-spin)
  - [Introduction](#introduction)
  - [Known Limitations](#known-limitations)
    - [Note for Rust](#note-for-rust)
  - [Setup](#setup)
- [Setup Docker Desktop for Spin](#setup-docker-desktop-for-spin)
  - [Introduction](#introduction-1)
  - [Known Limitations](#known-limitations-1)
  - [Setup](#setup-1)
  - [Using Docker Desktop With Spin](#using-docker-desktop-with-spin)
- [Setup K8s for Spin](#setup-k8s-for-spin)
  - [Introduction](#introduction-2)
  - [Known Limitations](#known-limitations-2)
  - [Setup](#setup-2)
- [Setup Generic Kubernetes for Spin](#setup-generic-kubernetes-for-spin)
  - [Introduction](#introduction-3)
  - [Known Limitations](#known-limitations-3)
  - [Setup](#setup-3)
- [Run a Spin Workload on Kubernetes](#run-a-spin-workload-on-kubernetes)
  - [Introduction](#introduction-4)
  - [Concepts](#concepts)
  - [Requirements](#requirements)
  - [Install Plugin](#install-plugin)
  - [Workflow](#workflow)
  - [Detailed Explanation of Steps](#detailed-explanation-of-steps)
    - [`spin new`](#spin-new)
    - [`spin build`](#spin-build)
    - [Create the Deployment Manifest](#create-the-deployment-manifest)
    - [`spin registry push`](#spin-registry-push)
    - [Deploy the Application](#deploy-the-application)
    - [`spin k8s getsvc`](#spin-k8s-getsvc)

## Why Use Spin With Kubernetes?

In addition to `spin up` Fermyon also offers Fermyon Cloud to deploy spin apps into production, so why use Spin with Kubernetes? For users that have made existing investments into Kubernetes or have requirements that their applications stay within certain clouds, not be on shared infrastructure, or run on-premise, Kubernetes provides a robust solution.

> Fermyon wants to know how we can build you the best Spin experience on Kubernetes. Let us know what you need to efficiently run Spin applications at scale on Kubernetes with this [short survey](https://fibsu0jcu2g.typeform.com/to/H8G8Nzgs?utm_campaign=thanks&utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-_IwqD36cFYu9skvZBobOVZjjdXtGO3Z126WweaeKBWZz8wM4G_LZG7L0esIOS4tcASX8LM).  

## How Does It Work?

For Kubernetes to run Spin workloads, it needs to be taught about a new runtime class. To do this, there is a shim for containerd. This compiles to a binary that must be placed on the Kubernetes nodes that host Shim pods. That binary then needs to be registered with Kubernetes as a new RuntimeClass. After that, wasm containers can be deployed to Kubernetes using the Spin k8s plugin.

## Next Steps

- Use the appropriate guide below to configure Kubernetes cluster for Spin Apps.
- Follow the instructions in the “Run a Spin Workload in Kubernetes” guide below.

{{ tabs "platforms" }}

{{ startTab "Azure AKS"}}

## Setup Azure AKS for Spin

### Introduction

Azure AKS provides a straightforward and officially [documented](https://learn.microsoft.com/en-us/azure/aks/use-wasi-node-pools) way to use Spin with AKS.

### Known Limitations

- Node pools default to 100 max pods. When a node pool is configured it can be increased up to 250 pods.
- Each Pod will constantly run its own HTTP listener, which adds overhead vs Fermyon Cloud.
- You can run containers and wasm modules on the same node, but you can't run containers and wasm modules on the same pod.
- The WASM/WASI node pools can't be used for system node pool.
- The *os-type* for WASM/WASI node pools must be Linux.
- You can't use the Azure portal to create WASM/WASI node pools.
- AKS uses an older version of Spin for the shim, so you will need to change `spin_manifest_version` to `spin_version` in `spin.toml` if you are using a template-generated project from the Spin CLI.
- The RuntimeClass `wasmtime-spin-v0-5-1` on Azure maps to spin v1.0.0, and the `wasmtime-spin-v1` RuntimeClass uses an older shim corresponding to v0.3.0 spin.

#### Note for Rust

In Cargo.toml, the `spin-sdk` dependency should be downgraded to `v1.0.0-rc.1` in order to match the lower version running on the AKS shim.

### Setup

To get spin working on an AKS cluster, a few setup steps are required. First Add the aks-preview extension:

<!-- @selectiveCpy -->

```console
$ az extension add --name aks-preview
```

Next update to the latest version:

<!-- @selectiveCpy -->

```console
$ az extension update --name aks-preview
```

Register the WasmNodePoolPreview feature:

<!-- @selectiveCpy -->

```console
$ az feature register --namespace "Microsoft.ContainerService" --name "WasmNodePoolPreview"
```

This will take a few minutes to complete. You can verify it’s done when this command returns *Registered*:

<!-- @selectiveCpy -->

```console
$ az feature show --namespace "Microsoft.ContainerService" --name "WasmNodePoolPreview"
```

Finally refresh the registration of the ContainerService:

<!-- @selectiveCpy -->

```console
$ az provider register --namespace Microsoft.ContainerService
```

Once the service is registered, the next step is to add a Wasm/WASI nodepool to an existing AKS cluster. If a cluster doesn’t already exist, follow Azure’s [documentation](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli) to create a new cluster:

<!-- @selectiveCpy -->

```console
$ az aks nodepool add \
    --resource-group myResourceGroup \
    --cluster-name myAKSCluster \
    --name mywasipool \
    --node-count 1 \
    --node-vm-size Standard_B2s \
    --workload-runtime WasmWasi
```

You can verify the workloadRuntime using the following command:

<!-- @selectiveCpy -->

```console
$ az aks nodepool show -g myResourceGroup --cluster-name myAKSCluster -n mywasipool --query workloadRuntime
```

The next set of commands uses kubectl to create the necessary runtimeClass. If you don’t already have kubectl configured with the appropriate credentials, you can retrieve them with this command:

<!-- @selectiveCpy -->

```console
$ az aks get-credentials -n myAKSCluster -g myResourceGroup
```

Find the name of the nodepool:

<!-- @selectiveCpy -->

```console
$ kubectl get nodes -o wide
```

Then retrieve detailed information on the appropriate nodepool and verify among it’s labels is “kubernetes.azure.com/wasmtime-spin-v1=true”:

<!-- @selectiveCpy -->

```console
kubectl describe node aks-mywasipool-12456878-vmss000000
```

Find the `wasmtime-spin-v1` RuntimeClass created by AKS:

<!-- @selectiveCopy -->

```console
$ kubectl describe runtimeclass wasmtime-spin-v1
```

{{ blockEnd }}

{{ startTab "Docker Desktop"}}

## Setup Docker Desktop for Spin

### Introduction

Docker Desktop provides both [an easy way to run Spin apps in containers](https://www.fermyon.com/blog/spin-in-docker) directly and its own Kubernetes option.

### Known Limitations

- Each Pod will be constantly running it’s own HTTP listener which adds overhead vs Fermyon Cloud.
- You can run containers and wasm modules on the same node, but you can't run containers and wasm modules on the same pod.
- The Kubernetes commands are only required if you want to use the Kubernetes instance included as Experimental with Docker Desktop. The instructions to use spin with Docker Desktop directly are available at the bottom of this section.

### Setup

Install approproiate Preview Version of Docker Desktop+Wasm Technical Preview 2 from [here](https://www.docker.com/blog/announcing-dockerwasm-technical-preview-2/). Then [enable Containerd](https://docs.docker.com/desktop/containerd/) for Docker in Settings → Experimental → Use containerd for pulling and storing images.

Next Enable Kubernetes under Settings → Experimental → Enable Kubernetes, then hit “Apply & Restart”.

Create a file wasm-runtimeclass.yml and populate with the following information:

```yaml
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: "wasmtime-spin-v1"
handler: "spin"
```

Then register the runtime class with the cluster:

<!-- @selectiveCpy -->

```console
$ kubectl apply -f wasm-runtimeclass.yaml
```

### Using Docker Desktop With Spin

Docker Desktop can be used with spin as a Kubernetes target per the instructions in the below in this document. However Docker can also run the containers directly with the following command:

<!-- @selectiveCpy -->

```console
$ docker run --runtime=io.containerd.spin.v1 --platform=wasi/wasm -p <port>:<port> <image>:<version>
```

If there is not command specified in the Dockerfile, one will need to be passed at the command line. Since Spin doesn't need this, "/" can be passed.

{{ blockEnd }}

{{ startTab "K3d"}}

## Setup K8s for Spin

### Introduction

[K3d](https://k3d.io/) is a lightweight Kubernetes installation.

### Known Limitations

- Each Pod will be constantly running it’s own HTTP listener which adds overhead vs Fermyon Cloud.
- You can run containers and wasm modules on the same node, but you can't run containers and wasm modules on the same pod.

### Setup

Ensure both Docker and k3d are installed. Then [enable Containerd](https://docs.docker.com/desktop/containerd/) for Docker in Settings → Experimental → Use containerd for pulling and storing images.

Deis Labs provides a preconfigured K3d environment that can be run using this command:

<!-- @selectiveCpy -->

```console
$ k3d cluster create wasm-cluster --image ghcr.io/deislabs/containerd-wasm-shims/examples/k3d:v0.10.0 -p "8081:80@loadbalancer" --agents 2 --registry-create mycluster-registry:12345
```

Create a file wasm-runtimeclass.yml and populate with the following information:

```yaml
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: "wasmtime-spin"
handler: "spin"
```

Then register the runtime class with the cluster:

<!-- @selectiveCpy -->

```console
$ kubectl apply -f wasm-runtimeclass.yaml
```

{{ blockEnd }}

{{ startTab "Generic Kubernetes"}}

## Setup Generic Kubernetes for Spin

### Introduction

These instructions are provided for a self-managed or other Kubernetes service that isn't documented elsewhere.

### Known Limitations

- Each Pod will be constantly running it’s own HTTP listener which adds overhead vs Fermyon Cloud.
- You can run containers and wasm modules on the same node, but you can't run containers and wasm modules on the same pod.

### Setup

We provide the [spin-containerd-shim-installer](https://github.com/fermyon/spin-containerd-shim-installer) Helm chart that provides an automated method to install and configure the containerd shim for Fermyon Spin in Kubernetes. Please see the [README](https://github.com/fermyon/spin-containerd-shim-installer/blob/main/README.md) in the installer repository for more information.

The version of the container image and Helm chart directly correlates to the version of the containerd shim. We recommend selecting the shim version that correlates the version of Spin that you use for your application(s). For simplicity, here is a table depicting the version matrix between Spin and the containerd shim.

| [Spin](https://github.com/fermyon/spin/releases)              | [containerd-shim-spin](https://github.com/deislabs/containerd-wasm-shims/releases) |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [v2.0.1](https://github.com/fermyon/spin/releases/tag/v2.0.1) | [v0.10.0](https://github.com/deislabs/containerd-wasm-shims/releases/tag/v0.10.0)       |
| [v1.4.1](https://github.com/fermyon/spin/releases/tag/v1.4.1) | [v0.9.0](https://github.com/deislabs/containerd-wasm-shims/releases/tag/v0.9.0)       |
| [v1.4.0](https://github.com/fermyon/spin/releases/tag/v1.4.0) | [v0.8.0](https://github.com/deislabs/containerd-wasm-shims/releases/tag/v0.8.0)       |
| [v1.3.0](https://github.com/fermyon/spin/releases/tag/v1.3.0) | [v0.7.0](https://github.com/deislabs/containerd-wasm-shims/releases/tag/v0.7.0)       |
| [v1.1.0](https://github.com/fermyon/spin/releases/tag/v1.1.0) | [v0.6.0](https://github.com/deislabs/containerd-wasm-shims/releases/tag/v0.6.0)       |
| [v1.0.0](https://github.com/fermyon/spin/releases/tag/v1.0.0) | [v0.5.1](https://github.com/deislabs/containerd-wasm-shims/releases/tag/v0.5.1)       |

There are several values you may need to configure based on your Kubernetes environment. The installer needs to add a binary to the node's PATH and edit containerd's config.toml. The defaults we set are the same defaults for containerd and should work for most Kubernetes environments but you may need to adjust them if your distribution uses non-default paths.

| Name                            | Default           | Description                                                              |
| ------------------------------- | ----------------- | ------------------------------------------------------------------------ |
| installer.hostEtcContainerdPath | `/etc/containerd` | Directory where containerd's config.toml is located                      |
| installer.hostBinPath           | `/usr/local/bin`  | Directory where the shim binary should be installed to (must be on PATH) |

> NOTE: Because it is difficult to cover all Kubernetes environments there are no default values for node selectors or tolerations but they are configurable through values. We recommend that you configure some sensible defaults for your environment:

```console
$ helm install fermyon-spin oci://ghcr.io/fermyon/charts/spin-containerd-shim-installer --version 0.8.0
```

{{ blockEnd }}

## Run a Spin Workload on Kubernetes

### Introduction

This guide demonstrates the commands to run a Spin workload in Kubernetes. It should apply to all Kubernetes varients which have been properly configured using one of the Setup guides.

### Concepts

Spin apps are bundled using the OCI format. These packages include the spin.toml file, and the wasm and static files which it references. While Kubernetes also uses OCI repositories, it expects the package to be in a container format.

The containerd shim for Spin allows Kubernetes to appropriately schedule Spin applications as long as they have been wrapped in a lightweight “scratch” container.

Once the Spin App Container has been created, it can be pushed to an OCI repository, and then deployed to an appropriately configured kubernetes cluster.

### Requirements

The current Spin k8s plugin relies on Docker and Kubectl under the hood. It’s important that both of these tools be installed, the Docker service be running, and KUBECONFIG environment variable be configured to point to a kubeconfig file for the desired Kubernetes cluster.

### Install Plugin

To install this plugin, run:

<!-- @selectiveCpy -->

```console
spin plugin install -u https://raw.githubusercontent.com/chrismatteson/spin-plugin-k8s/main/k8s.json
```

### Workflow

The workflow is very similar to the normal Kubernetes workflow: build and test your application locally, push to a registry, and update the deployment.

> If you are using Spin 1.x, or your shim uses Spin 1.x (shim version prior to 0.10.0), [follow the Spin 1.x Kubernetes documentation](../v1/kubernetes#workflow). The workflow here applies only to Spin 2 with shim 0.10.0 and above.

Please see the [shim documentation](https://github.com/deislabs/containerd-wasm-shims/blob/main/containerd-shim-spin/quickstart.md) for a full tutorial on deploying Spin 2 applications.

### Detailed Explanation of Steps

#### `spin new`

An optional command to use a template to create a new Spin app:

<!-- @selectiveCpy -->

```console
$ spin new
```

#### `spin build`

The following command builds a Spin app:

<!-- @selectiveCpy -->

```console
spin build
```

#### Create the Deployment Manifest

To create a deployment manifest (`deploy.yaml`), you can either:

1. Run `spin k8s scaffold`.
2. Copy and modify the deployment manifest below.

The `deploy.yaml` file defines the deployment to the Kubernetes server. As you iterate with new versions of the registry image, you'll need to update the deployment manifest to match.

In the `deploy.yaml`, the `runtimeClassName` _must_ be defined as `wasmtime-spin`. It’s critical that that is the exact name used when setting up the Kubernetes service. `spin k8s scaffold` does this, and the example manifest below contains the correct name.

**1. Creating a deployment manifest with the `k8s` plugin**

The following command creates a deployment manifest (`deploy.yaml`) for a Spin app to run on Kubernetes. Scaffold takes in a namespace as a mandatory argument. This can either be a username if using the Docker hub, or can be the entire address if using a separate repository such as `ghcr.io`:

<!-- @selectiveCpy -->

```console
spin k8s scaffold
```

> `spin k8s scaffold` also creates a Dockerfile. Spin 2.x users do not need the Dockerfile and can safely delete it. (The Dockerfile is created for [Spin 1.x deployments](../v1/kubernetes#workflow).)

**2. Copy and modify an existing deployment manifest**

You can find a sample manifest in the [shim documentation](https://github.com/deislabs/containerd-wasm-shims/blob/main/containerd-shim-spin/quickstart.md#deploy-the-application) or below.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test
spec:
  replicas: 3
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      runtimeClassName: wasmtime-spin
      containers:
        - name: test
          image: chrismatteson/test:0.1.5
          command: ["/"]
---
apiVersion: v1
kind: Service
metadata:
  name: test
  spec:
    type: LoadBalancer
    ports:
      - protocol: TCP
        port: 80
        targetPort: 80
    selector:
      app: test
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  ingressClassName: traefik
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: test
                port:
                  number: 80
```

#### `spin registry push`

The following command pushes the Spin application to the appropriate repository:

<!-- @selectiveCpy -->

```console
$ spin registry push chrismatteson/test:0.1.5
```

> This requires Spin 2 or above. Spin 1.x uses a slightly different registry format, which is not compatible with the Kubernetes shim. If you are on Spin 1.x, [follow the Spin 1.x Kubernetes documentation](../v1/kubernetes#workflow) instead.

#### Deploy the Application

The following command deploys the application to Kubernetes:

<!-- @selectiveCpy -->

```console
$ kubectl apply -f deploy.yaml
```

> If you are using the `k8s` plugin you can run `spin k8s deploy`.

It may take a few seconds for your application to be ready for use.

#### `spin k8s getsvc`

The following command retrieves information about the service that gets deployed (such as its external IP):

<!-- @selectiveCpy -->

```console
$ spin k8s getsvc
```
