title = "Publishing and Distribution"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical = "https://developer.fermyon.com/spin/v2/distributing-apps"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/distributing-apps.md"

---
- [Logging Into a Registry](#logging-into-a-registry)
  - [Logging In Using a Token](#logging-in-using-a-token)
  - [Fallback Credentials](#fallback-credentials)
- [Publishing a Spin Application to a Registry](#publishing-a-spin-application-to-a-registry)
- [Running Published Applications](#running-published-applications)
  - [Running Published Applications by Digest](#running-published-applications-by-digest)
  - [Pulling a Published Application](#pulling-a-published-application)
- [Signing Spin Applications and Verifying Signatures](#signing-spin-applications-and-verifying-signatures)

If you would like to publish a Spin application, so that other users can run it, you can do so using a _container registry_.

{{ details "What's all this about containers?" "The registry protocol was originally created to publish and distribute Docker containers. Over time, registries have evolved to host other kinds of artifact - see [the OCI registry artifacts project](https://github.com/opencontainers/artifacts) for more information. However, the term remains, in services such as GitHub Container Registry or AWS Elastic Container Registry, and in the generic description _OCI (Open Container Initiative) registries_. When you use a 'container' registry to publish and distribute Spin applications, there are no actual containers involved at all!" }}

Many cloud services offer public registries.  Examples include GitHub Container Registry, Docker Hub, or Amazon Elastic Container Registry.  These support both public and private distribution.  You can also run your own registry using open source software.

## Logging Into a Registry

Before you can publish to a registry, or run applications whose registry artifacts are private, you must log in to the registry.  This example shows logging into the GitHub Container Registry, `ghcr.io`:

<!-- @selectiveCpy -->

```bash
$ spin registry login ghcr.io
```

If you don't provide any options to `spin registry login`, it prompts you for a username and password.

### Logging In Using a Token

In a non-interactive environment such as GitHub Actions, you will typically log in using a token configured in the environment settings, rather than a password.  To do this, use the `--password-stdin` flag, and `echo` the token value to the login command's standard input.  This example shows logging into GHCR from a GitHub action:

<!-- @noCpy -->

```bash
$ echo "$\{{ secrets.GITHUB_TOKEN }}" | spin registry login ghcr.io --username $\{{ github.actor }} --password-stdin
```

Other environments will have different ways of referring to the token and user but the pattern remains the same.

### Fallback Credentials

If you have logged into a registry using `docker login`, but not using `spin registry login`, Spin will fall back to your Docker credentials.

## Publishing a Spin Application to a Registry

To publish an application to a registry, use the `spin registry push` command.  You must provide a _reference_ for the published application.  This is a string whose format is defined by the registry standard, and generally consists of `<registry>/<username>/<application-name>:<version>`.  (In specific circumstances you may be able to omit the username and/or the version.  If you want more detail on references, see the OCI documentation.)

> Remember you will (usually) need to be logged in to publish to a registry.

Here is an example of pushing an application to GHCR:

<!-- @nocpy -->

```bash
$ spin registry push ghcr.io/alyssa-p-hacker/hello-world:v1
Pushed with digest sha256:06b19
```

Notice that the username is part of the reference; the registry does not infer it from the login.  Also notice that the version is specified explicitly; Spin does not infer it from the `spin.toml` file.

> Whether newly uploaded artifacts are private or public depends on the registry.  See your registry documentation.  This will also tell you how to change the visibility if the default is not what you want.

## Running Published Applications

To run a published application from a registry, use `spin up -f` and pass the registry reference:

<!-- @nocpy -->

```bash
$ spin up -f ghcr.io/alyssa-p-hacker/hello-world:v1
```

> Remember that if the artifact is private you will need to be logged in, with permission to access it.

> Spin optimizes downloads using a local [registry cache](./cache). When running an application from a remote registry, Spin always tries to check the registry for updates, even if the application has already been pulled. However, content files that are already pulled will not be re-downloaded. This applies even if they were downloaded as part of a different application.

### Running Published Applications by Digest

Registry versions are mutable; that is, the owner of an application can change which build the `:v1` label points to at any time.  If you want to run a specific build of the package, you can refer to it by _digest_.  This is similar to a Git commit hash: it is immutable, meaning the same digest always gets the exact same data, no matter what the package owner does.  To do this, use the `@sha256:...` syntax instead of the `:v...` syntax:

<!-- @nocpy -->

```bash
$ spin up -f ghcr.io/alyssa-p-hacker/hello-world@sha256:06b19
```

### Pulling a Published Application

`spin up` automatically downloads the application from the registry. If you want to manually download the application, without running it, use the `spin registry pull` command:

<!-- @nocpy -->

```bash
$ spin registry pull ghcr.io/alyssa-p-hacker/hello-world:v1
$ spin registry pull ghcr.io/alyssa-p-hacker/hello-world@sha256:06b19
```

> Downloaded applications are cached. When run, or pulled again, Spin checks to see if they have changed from the cached copy, and downloads only the changes if any.

## Signing Spin Applications and Verifying Signatures

Because Spin uses the container registry standards to distribute applications, it can also take advantage of tooling built around those standards.  Here is an example of using [Cosign and Sigstore](https://docs.sigstore.dev/) to sign and verify a Spin application:

<!-- @nocpy -->

```bash
# Push your Spin application to any registry that supports the OCI registry artifacts,
# such as the GitHub Container Registry, Docker Hub, Azure ACR, or AWS ECR.
$ spin registry push ghcr.io/alyssa-p-hacker/hello-world:v1

# You can now sign your Spin app using Cosign (or any other tool that can sign
# OCI registry objects).
$ cosign sign ghcr.io/alyssa-p-hacker/hello-world@sha256:06b19
Generating ephemeral keys...
Retrieving signed certificate...
tlog entry created with index: 12519542
Pushing signature to: ghcr.io/alyssa-p-hacker/hello-world

# Someone interested in your application can now use Cosign to verify the signature
# before running the application.
$ cosign verify ghcr.io/alyssa-p-hacker/hello-world@sha256:06b19
Verification for ghcr.io/alyssa-p-hacker/hello-world@sha256:06b19 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - Any certificates were verified against the Fulcio roots.

# The consumer of your app can now run it from the registry.
$ spin up -f ghcr.io/alyssa-p-hacker/hello-world@sha256:06b19
```

> You'll need Cosign 2.0 or above to verify Spin artifacts.
