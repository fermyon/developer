title = "Known Issues"
template = "spin_main"
date = "2023-11-20T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/kubernetes-known-issues.md"

---

To set up Spin on Kubernetes, we use the [Containerd-Shim for Spin](https://github.com/deislabs/containerd-wasm-shims), a great contribution from the community. While Spin mostly works as expected, there are a few important points to note.

The project is still evolving, and we anticipate enhancements with each new release of containerd-spin-shim.

- [Specific Configuration of `spin up`](#specific-configuration-of-spin-up)
- [Limitation in File Mounts for Components](#limitation-in-file-mounts-for-components)
- [Limited Volume Mounts](#limited-volume-mounts)

### Specific Configuration of `spin up`

Currently, the spin shim launches Spin with pre-defined settings and does not support custom configurations.

This means you cannot set environment variables or use certain `spin up` flags, like `--disable-cache`, `--direct-mounts`, or `--state-dir`.

The preset values include:

- `--listen: 0.0.0.0:80`
- `--runtime-config-file: /runtime-config.toml`

Additionally, `spin.toml` should be located at `/spin.toml` in the container. The same applies to `runtime-config.toml`, which should be at `/runtime-config.toml`. If there's no runtime-config file, the shim will ignore it.

For now, if you need a specific setup, your only option is to build your version of `containerd-spin-shim`.

Keep track of this [open issue](https://github.com/deislabs/containerd-wasm-shims/issues/166) for updates on configuration injection into the shim.

### Limitation in File Mounts for Components

In Kubernetes, file mounts do not function as they do locally. For instance, consider this segment from `spin.toml`:

spin.toml

```
[...]
[component.static-file-server]
source = "./spin_static_fs.wasm"
files = [{ source = "./", destination = "/" }]
[...]
```

A workaround is to mount specific files or directories that don't already exist in the container.

### Limited Volume Mounts

As of now, mounting `spin.toml` or `runtime-config.toml` to a container at runtime isn't possible.

Consider a container with these files:

- `spin.toml`
- `env-explorer.wasm`
- `runtime-config.toml`

The following Kubernetes deployment configuration:

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: spin-redis-not-working
  name: spin-redis-not-working
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spin-redis-not-working
  template:
    metadata:
      labels:
        app: spin-redis-not-working
    spec:
      runtimeClassName: wasmtime-spin
      containers:
      # This image does contain a runtime-config
      - image: ghcr.io/liquid-reply/k8s-spin/spin-redis:latest
        name: spin-env-explorer
        command: ["/"]
        volumeMounts:
        - name: redis-config
          mountPath: /runtime-config.toml   # overwrite existing runtime-config
        resources:
          limits:
            cpu: 100m
            memory: 100Mi
          requests:
            cpu: 100m
            memory: 100Mi
      volumes:
        - name: redis-config
          configMap:
            name: runtime-config
---
apiVersion: v1
data:
  runtime-config.toml: |
    [key_value_store.default]
    type = "redis"
    url = "redis://example-2-redis:6379"
kind: ConfigMap
metadata:
  name: runtime-config
```

Results in an error when starting the container:

```
$ kubectl describe pod <podname>
[...]
   Normal   Created    3m25s (x4 over 4m9s)   kubelet            Created container spin-env-explorer
   Warning  Failed     3m25s (x4 over 4m8s)   kubelet            Error: failed to create containerd task: failed to create shim task: Others("failed to receive. \"waiting for init ready\". BrokenChannel"): unknown
   Warning  BackOff    2m58s (x7 over 4m7s)   kubelet            Back-off restarting failed container spin-env-explorer in pod spin-redis-not-working-7bbf5644dc-6drbk_default(984d3623-a2cb-4760-b4e7-07caf59f617f)
[...]
```

The container fails to start properly. Similarly, if a `runtime-config.toml` is missing, the pod enters a crash loop with less informative error messages:

```
$ kubectl describe pod <podname>
  Normal   Scheduled  42s                default-scheduler  Successfully assigned default/spin-redis-not-working-79d57b6f5-zsxr7 to k3d-wasm-cluster-agent-0
  Normal   Pulled     26s (x3 over 42s)  kubelet            Container image "ghcr.io/liquid-reply/k8s-spin/spin-redis:noconf" already present on machine
  Normal   Created    26s (x3 over 42s)  kubelet            Created container spin-env-explorer
  Normal   Started    26s (x3 over 42s)  kubelet            Started container spin-env-explorer
  Warning  BackOff    12s (x3 over 41s)  kubelet            Back-off restarting failed container spin-env-explorer in pod spin-redis-not-working-79d57b6f5-zsxr7_default(b031a3db-6fa3-435b-ab2c-5cfe51ac67d8)
```

Mounting configuration files is crucial for Kubernetes applications and will be supported in future updates.

However, you can still use volume mounts in other contexts. For more details, see [Kubernetes Sidecars](/spin/v2/kubernetes-sidecars).
