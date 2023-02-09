title = "Packaging and Distributing Spin Applications"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]
url = "https://github.com/fermyon/spin/blob/main/docs/content/distributing-apps.md"

---

## Distributing Spin Applications Using Container Registry Services

Starting with [v0.8.0](https://github.com/fermyon/spin/releases/tag/v0.8.0), Spin supports distributing applications using existing container registry services such as GitHub Container Registry, Docker Hub, Azure ACR, or AWS ECR. This feature is experimental, and will continue to evolve in future versions of Spin.

While this feature is still in experimental phase, the CLI will reuse the container registry authentication used by the Docker CLI, so you first have to log in to the registry service using an existing tool (such as `docker login`, or using the instructions provided by the registry service). In a future version this will be improved using a Spin login command for the target registry.

Pushing an application to a registry:

```bash
$ spin oci push ghcr.io/radu-matei/spin-hello-world:v1
Pushed "https://ghcr.io/v2/radu-matei/spin-hello-world/manifests/sha256:06b19f4394c59fe943140c9b59f083aefd4b53c6b632758523a2800d819a1575"
```

Then running the application using the registry reference:

```bash
$ spin oci run ghcr.io/radu-matei/spin-hello-world:v1
```

This feature is built on top of the [OCI Artifacts project](https://github.com/opencontainers/artifacts).

### Signing Spin Applications and Verifying Signatures

Since Spin is now using existing container registries to distribute applications, it can also take advantage of the state of the art in terms of signing and verifying artifacts distributed using OCI registries. Here is an example of signing and verifying a Spin application using [Cosign and Sigstore](https://docs.sigstore.dev/cosign/overview/):

```
# Push your Spin application to any registry that supports OCI Artifacts,
# such as the GitHub Container Registry, Docker Hub, Azure ACR, or AWS ECR.
$ spin oci push ghcr.io/radu-matei/spin-hello-world:v1
Pushed "https://ghcr.io/v2/radu-matei/spin-hello-world/manifests/sha256:06b19"

# You can now sign your Spin app using Cosign (or any other tool that can sign OCI objects)
$ COSIGN_EXPERIMENTAL=1 cosign sign ghcr.io/radu-matei/spin-hello-world@sha256:06b19
Generating ephemeral keys...
Retrieving signed certificate...
tlog entry created with index: 12519542
Pushing signature to: ghcr.io/radu-matei/spin-hello-world

# You can use cosign to now verify the signature before running the application.
$ COSIGN_EXPERIMENTAL=1 cosign verify ghcr.io/radu-matei/spin-hello-world@sha256:06b19
Verification for ghcr.io/radu-matei/spin-hello-world@sha256:06b19 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - Any certificates were verified against the Fulcio roots.

# You can now point Spin to the application in the registry and run it.
$ spin oci run ghcr.io/radu-matei/spin-hello-world:v1
```

## Distributing Spin Applications Using Bindle

Packaging and distributing Spin applications can be done using [Bindle](https://github.com/deislabs/bindle), an open source aggregate object storage system. This allows the packaging of the application manifest, components, and static assets together, and takes advantage of the features of a modern object storage system.

To distribute applications, we first need a Bindle registry. You can [install Bindle v0.8 release](https://github.com/deislabs/bindle/tree/main/docs#from-the-binary-releases), or use the [`autobindle`](https://marketplace.visualstudio.com/items?itemName=fermyon.autobindle) VS Code extension (through the `Bindle: Start` command):

```bash
$ bindle-server --address 127.0.0.1:8000 --directory . --unauthenticated
```

Let's push the application from the [quickstart](./quickstart.md) to the registry:

<!-- @selectiveCpy -->

```bash
$ export BINDLE_URL=http://localhost:8000/v1
$ spin bindle push --file spin.toml
pushed: spin-hello-world/1.0.0
```

Now we can run the application using `spin up` directly from the registry:

<!-- @selectiveCpy -->

```bash
$ spin up --bindle spin-hello-world/1.0.0
```

> A known error when running an application (with a high number of static assets) from Bindle on macOS is around [too many open files](https://github.com/fermyon/spin/issues/180). This issue can be worked around by setting a higher `ulimit -n` for the current shell
> session.

The application can also be prepared in a local directory before pushing to the registry by running `spin bindle prepare`.
