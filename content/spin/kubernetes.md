title = "Spin on Kubernetes"
template = "spin_main"
date = "2023-03-01T00:01:01Z"
enable_shortcodes = true

---

## Why Use Spin with Kubernetes?

In addition to `spin up` Fermyon also offers Fermyon Cloud to deploy spin apps into production, so why use Spin with Kubernetes? For users that have made existing investments into Kubernetes or have requirements that their applications stay within certain clouds, not be on shared infrastructure, or run on-premise, Kubernetes provides a robust solution.

## How does it work?

For Kubernetes to run Spin workloads, it needs to be taught about a new runtime class. To do this, there is a shim for containerd. This compiles to a binary which must be places on the Kubernetes nodes which will host Shim pods. That binary then needs to be registered with Kubernetes as a new RuntimeClass. After that, wasm containers can be deployed to Kubernetes using spin k8s plugin.

## Next Steps

- Use the appropriate guide below to configure Kubernetes cluster for Spin Apps
- Follow the instructions in the “Run a Spin Workload in Kubernetes” guide below

{{ tabs "platforms" }}

{{ startTab "Azure AKS"}}

## Setup Azure AKS for Spin

### Introduction

Azure AKS provides a straightforward and officially [documented](https://learn.microsoft.com/en-us/azure/aks/use-wasi-node-pools) way to use Spin with AKS.

### Known Limitations

- Node pools default to 100 max pods. When a node pool is configured it can be increased up to 250 pods.
- Each Pod will be constantly running it’s own HTTP listener which adds overhead vs Fermyon Cloud.
- You can run containers and wasm modules on the same node, but you can't run containers and wasm modules on the same pod.
- The WASM/WASI node pools can't be used for system node pool.
- The *os-type* for WASM/WASI node pools must be Linux.
- You can't use the Azure portal to create WASM/WASI node pools.

### Setup

To get spin working on an AKS cluster, a few setup steps are required. First Add the aks-preview extension

```bash
az extension add --name aks-preview
```

Next update to the latest version:

```bash
az extension update --name aks-preview
```

Register the WasmNodePoolPreview feature

```bash
az feature register --namespace "Microsoft.ContainerService" --name "WasmNodePoolPreview"
```

This will take a few minutes to complete. You can verify it’s done when this command returns *Registered*

```bash
az feature show --namespace "Microsoft.ContainerService" --name "WasmNodePoolPreview"
```

Finally refresh the registration of the ContainerService

```bash
az provider register --namespace Microsoft.ContainerService
```

Once the service is registered, the next step is to add a Wasm/WASI nodepool to an existing AKS cluster. If a cluster doesn’t already exist, follow Azure’s [documentation](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli) to create a new cluster.

```bash
az aks nodepool add \
    --resource-group myResourceGroup \
    --cluster-name myAKSCluster \
    --name mywasipool \
    --node-count 1 \
    --workload-runtime WasmWasi
```

You can verify the workloadRuntime using the following command

```bash
az aks nodepool show -g myResourceGroup --cluster-name myAKSCluster -n mywasipool --query workloadRuntime
```

The next set of commands uses kubectl to create the necessary runtimeClass. If you don’t already have kubectl configured with the appropriate credentials, you can retrieve them with this command

```bash
az aks get-credentials -n myakscluster -g myresourcegroup
```

Find the name of the nodepool

```bash
kubectl get nodes -o wide
```

Then retrieve detailed information on the appropriate nodepool and verify among it’s labels is “kubernetes.azure.com/wasmtime-spin-v1=true”

```bash
kubectl describe node aks-mywasipool-12456878-vmss000000
```

Create a file wasm-runtimeclass.yml and populate with the following information

```yaml
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: "wasmtime-spin-v1"
handler: "spin"
scheduling:
  nodeSelector:
    "kubernetes.azure.com/wasmtime-spin-v1": "true"
```

Then register the runtime class with the cluster

```yaml
kubectl apply -f wasm-runtimeclass.yaml
```

{{ blockEnd }}

{{ startTab "K3s"}}

## Setup K8s for Spin

### Introduction

[K3s](https://k3s.io/) is a lightweight Kubernetes installation.

### Known Limitations

- ?

### Setup

Ensure both Docker and k3s are installed. Then [enable Containerd](https://docs.docker.com/desktop/containerd/) for Docker in Settings → Experimental → Use containerd for pulling and storing images.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b572381-09cc-4baf-b210-88c6e88cbc5f/Untitled.png)

Deis Labs provides a preconfigured K3s environment that can be run using this command

```bash
k3d cluster create wasm-cluster --image ghcr.io/deislabs/containerd-wasm-shims/examples/k3d:v0.3.3 -p "8081:80@loadbalancer" --agents 2 --registry-create mycluster-registry:12345
```

Create a file wasm-runtimeclass.yml and populate with the following information

```yaml
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: "wasmtime-spin-v1"
handler: "spin"
scheduling:
  nodeSelector:
    "kubernetes.azure.com/wasmtime-spin-v1": "true"
```

Then register the runtime class with the cluster
```yaml
kubectl apply -f wasm-runtimeclass.yaml
```

{{ blockEnd }}

{{ startTab "Generic Kubernetes"}}

## Setup Generic Kubernetes for Spin

### Introduction

Docker Desktop 

### Known Limitations

- ?

### Setup

Clone containerd shim repository. Cd into the directory and run make

```bash
git clone [https://github.com/deislabs/containerd-wasm-shims](https://github.com/deislabs/containerd-wasm-shims)
cd containerd-wasm-shims
make
```

Copy the `containerd-shim-spin-v1` to the `/bin` directory of kubernetes node image. Then add the following lines to the config.toml for containerd.

```
  [plugins.cri.containerd.runtimes.spin]
    runtime_type = "io.containerd.spin.v1"
```

Create a file wasm-runtimeclass.yml and populate with the following information

```yaml
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: "wasmtime-spin-v1"
handler: "spin"
scheduling:
  nodeSelector:
    "kubernetes.azure.com/wasmtime-spin-v1": "true"
```

Then register the runtime class with the cluster
```yaml
kubectl apply -f wasm-runtimeclass.yaml
```

{{ blockEnd }}

{{ startTab "Docker Desktop"}}

## Setup Docker Desktop for Spin

### Introduction

Docker Desktop 

### Known Limitations

- ?

### Setup

Ensure both Docker is installed. Then [enable Containerd](https://docs.docker.com/desktop/containerd/) for Docker in Settings → Experimental → Use containerd for pulling and storing images.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b572381-09cc-4baf-b210-88c6e88cbc5f/Untitled.png)

Next Enable Kubernetes under Settings → Experimental → Enable Kubernetes, then hit “Apply & Restart”

![Screenshot 2023-02-28 at 3.52.34 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96406f4b-7df0-4e00-8c08-03696e6f0347/Screenshot_2023-02-28_at_3.52.34_PM.png)

Apply the kwasm installer daemon set
```bash
kubectl apply -f https://raw.githubusercontent.com/KWasm/kwasm-node-installer/docker-desktop/example/daemonset.yaml
```
{{ blockEnd }}

## Run a Spin workload on Kubernetes
### Introduction

This guide demonstrates the commands to run a Spin workload in Kubernetes. It should apply to all Kubernetes varients which have been properly configured using one of the Setup guides.

### Concepts

Spin apps are bundled using either Bindle or OCI (as of Spin 0.8). These packages include the spin.toml file, and the wasm and static files which it references. While Kubernetes also uses OCI repositories, it expects the package to be in a container format.

The containerd shim for Spin allows Kubernetes to appropriately schedule Spin applications as long as they have been wrapped in a lightweight “scratch” container.

Once the Spin App Container has been created, it can be pushed to an OCI repository, and then deployed to an appropriately configured kubernetes cluster.

### Requirements

The current Spin k8s plugin relies on Docker and Kubectl under the hood. It’s important that both of these tools be installed, the Docker service be running, and KUBECONFIG environment variable be configured to point to a kubeconfig file for the desired Kubernetes cluster.

### Install Plugin

To install this plugin, simply run:

```yaml
spin plugin install -u https://raw.githubusercontent.com/chrismatteson/spin-plugin-k8s/main/k8s.json
```

### Workflow

The workflow is very similar to the workflow for Fermyon Cloud. 

The k8s plugin handles all of the tasks necessary to build the docker container, push it to a repository and deploy it into production.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1f9e936-c805-40e5-871d-af5cc0f69a1e/Untitled.png)

Just like with Fermyon Cloud, when something changes with the application, the workflow is to iterate the version in the spin.toml file, and restart the sequence from spin build.

### Detailed Explanation of Steps

#### spin new

Optional step to use a template to create a new Spin App

#### spin build

Builds spin app

#### spin k8s scaffold

This step creates two files necessary for a Spin app to run on Kubernetes. A Dockerfile and deploy.yaml. Scaffold takes in a namespace as a mandatory argument. This can either be a username if using the Docker hub, or can be the entire address if using a separate repository such as ghcr.

An example Dockerfile is below. The only things which end up in the final image are wasm and other files mentioned as sources in the spin.toml. 

Dockerfile

```yaml
FROM scratch AS build
WORKDIR /tmp/test
COPY . .

FROM scratch
COPY --from=build /tmp/test/spin.toml .
COPY --from=build /tmp/test/target/wasm32-wasi/release/test.wasm ./target/wasm32-wasi/release/test.wasm
COPY --from=build /tmp/test/spin_static_fs.wasm ./spin_static_fs.wasm
COPY --from=build /tmp/test/static ./static
```

The deploy.yaml file defines the deployment to the Kubernetes server. By default the replicas is configured as 3, however this can be edited after the scaffolding stage and before the deployment stage. Additionally, the runtimeClassName is defined as wasmtime-spin-v1. It’s critical that that is the exact name used when setting up the Kubernetes service to support Spin, or that the deployment be edited to the appropriate name.

deploy.yaml

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
      runtimeClassName: wasmtime-spin-v1
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
apiVersion: [networking.k8s.io/v1](http://networking.k8s.io/v1)
kind: Ingress
metadata:
  name: test
  annotations:
    [ingress.kubernetes.io/ssl-redirect:](http://ingress.kubernetes.io/ssl-redirect:) "false"
    [kubernetes.io/ingress.class:](http://kubernetes.io/ingress.class:) traefik
spec:
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

#### spin k8s build

This uses the Dockerfile to locally build a Spin Docker Container. The container is tagged as latest and with the version from the spin.toml.

#### spin k8s push

This pushes the Dockerfile to the appropriate repository.

#### spin k8s deploy

This deploys the application to Kubernetes

#### spin k8s getsvc

This retrieves information about the service that gets deployed (such as it’s external IP)