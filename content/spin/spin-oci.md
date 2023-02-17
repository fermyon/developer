title = "Hosting Spin Apps in OCI registries"
template = "spin_main"
date = "2023-02-13T00:00:00Z"
enable_shortcodes = true
[extra]

---

- [Spin OCI Support](#spin-oci-support)
  - [Prerequisites](#prerequisites)
  - [Set Up Your GHCR Instance](#set-up-your-ghcr-instance)
  - [Push a Spin App to GHCR](#push-a-spin-app-to-ghcr)
  - [Pull a Spin App From GHCR](#pull-a-spin-app-from-ghcr)
  - [Run a Spin App From GHCR](#run-a-spin-app-from-ghcr)
  - [Conclusion](#conclusion)
  - [Next Steps](#next-steps)

# Spin OCI Support

In [Spin v0.8.0](https://www.fermyon.com/blog/spin-v08), we announced the ability to store and run Spin applications stored in an [OCI compatible](https://opencontainers.org/) registry. Spin developers now have a powerful workflow that enables them to use idiomatic infrastructure tooling, such as [GitHub Container Registry (GHCR)](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) or [DockerHub](https://hub.docker.com/), to store, deploy, and share their Spin applications. 

## Prerequisites

First, follow [this guide](./install.md) to install Spin v0.8.0 or later. To ensure you have the correct version, you can check with this command:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

If you're using version v0.9.0 or later, it is officially recommended that you use the command `spin registry`. However, please note that the command `spin oci` (whilst initially supported by v0.8.0) is now also an alias (`oci` and `registry` are interchangeable) in v0.9.0. 

## Set Up Your GHCR Instance

To use a GHCR instance, you need to set up authentication. In this tutorial, we will use a personal access token (classic). Follow [these steps](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic) to generate a personal access token and then use it to sign into your GHCR. You should see the following message to confirm your login attempt to GHCR was successful:

<!-- @nocpy -->

```bash
> Login Succeed
```

## Push a Spin App to GHCR

Let's use this full-stack [Typescript and ReactJS Spin app](https://github.com/radu-matei/spin-react-fullstack) to walk through this tutorial. If you have a Spin app already feel free to navigate to that directory and skip the step below. 

Fork and clone the app [GitHub repository](https://github.com/radu-matei/spin-react-fullstack.git):
 <!-- @selectiveCpy -->

 ```bash
git clone https://github.com/USERNAME/spin-react-fullstack.git
```

Now, switch to that directory and rebuild the application. 
 <!-- @selectiveCpy -->

 ```bash
 cd spin-react-fullstack
 spin build
```

Now we're ready to push the application. Run the `spin oci push` command to push your application to the registry. 

{{ tabs "spin-version" }}

{{ startTab "v0.8.0"}}

 <!-- @selectiveCpy -->

 ```bash
 spin oci push ghcr.io/USERNAME/spin-react-fullstack:v1
```

{{ blockEnd }}

{{ startTab "v0.9.0"}}

 <!-- @selectiveCpy -->

 ```bash
 spin registry push ghcr.io/USERNAME/spin-react-fullstack:v1
```

{{ blockEnd }}

{{ blockEnd }}

You now have a Spin application stored in your registry. You can see the artifact under packages in the [GitHub UI](https://docs.github.com/en/packages/learn-github-packages/viewing-packages#viewing-a-repositorys-packages).

## Pull a Spin App From GHCR

Now that we've successfully pushed a Spin app, let's see if we can pull it. To do so, run the following command: 

{{ tabs "spin-version" }}

{{ startTab "v0.8.0"}}

 <!-- @selectiveCpy -->
 
 ```bash
 spin oci pull ghcr.io/USERNAME/spin-react-fullstack
```

{{ blockEnd }}

{{ startTab "v0.9.0"}}

 <!-- @selectiveCpy -->
 
 ```bash
 spin registry pull ghcr.io/USERNAME/spin-react-fullstack
```

{{ blockEnd }}

{{ blockEnd }}

## Run a Spin App From GHCR

Lastly, let's run this Spin application. 

{{ tabs "spin-version" }}

{{ startTab "v0.8.0"}}

 <!-- @selectiveCpy -->

 ```bash
 # make sure you've built your application with `spin build` prior
 spin oci run ghcr.io/USERNAME/spin-react-fullstack
```

{{ blockEnd }}

{{ startTab "v0.9.0"}}

<!-- @selectiveCpy -->

 ```bash
 # make sure you've built your application with `spin build` prior
 spin up --from-registry ghcr.io/USERNAME/spin-react-fullstack
```

{{ blockEnd }}

{{ blockEnd }}

## Conclusion

Congratulations on completing this tutorial! You have now successfully built, pushed, pulled, and run a Spin app using GHCR. Behind the scenes, Spin uses [OCI Artifacts](https://github.com/opencontainers/artifacts) project to distribute Spin apps across container registries. To learn more about how this feature works, take a look at [our proposal](https://github.com/fermyon/spin/blob/main/docs/content/sips/008-using-oci-registries.md) and [the implementation](https://github.com/fermyon/spin/pull/1014). 

## Next Steps

- If you're interested in shaping how registry support will look in the next version, please share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf)