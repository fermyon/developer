title = "Spin Apps in Registries"
template = "spin_main"
date = "2023-11-02T01:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/registry-tutorial.md"

---
- [Spin Registry Support](#spin-registry-support)
- [Prerequisites](#prerequisites)
- [Publishing and Running Spin Applications Using Registries (Video)](#publishing-and-running-spin-applications-using-registries-video)
- [Set Up Your GHCR Instance](#set-up-your-ghcr-instance)
- [Push a Spin App to GHCR](#push-a-spin-app-to-ghcr)
- [Pull a Spin App From GHCR](#pull-a-spin-app-from-ghcr)
- [Run a Spin App From GHCR](#run-a-spin-app-from-ghcr)
- [Conclusion](#conclusion)
- [Next Steps](#next-steps)

## Spin Registry Support

With Spin's registry support, you can package and save your Spin application as an artifact in a registry like [GitHub Container Registry (GHCR)](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) or [DockerHub](https://hub.docker.com/) and then run your Spin app from these registries.

## Prerequisites

First, follow [this guide](./install) to ensure you have the latest version of Spin installed (this tutorial refers to Spin 1.0 and above). You can check the Spin version using the following command:

<!-- @selectiveCpy -->

```bash
$ spin --version
```

## Publishing and Running Spin Applications Using Registries (Video)

The following video shows you how to push a Spin app to GHCR, and then run that artifact with Spin or with Docker. The video also contains additional information about signing and verifying your GHCR artifacts.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ijTEf8wDkqU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The rest of this page shows you how to use GHCR artifacts locally with Spin. 

## Set Up Your GHCR Instance

To use a GHCR instance, you need to set up authentication. Follow [these steps](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic) to generate a personal access token and then use it to sign into your GHCR. You should see the following message to confirm your login attempt to GHCR was successful:

<!-- @nocpy -->

```bash
> Login Succeed
```

## Push a Spin App to GHCR

Let's use this full-stack [TypeScript and ReactJS Spin app](https://github.com/radu-matei/spin-react-fullstack) to walk through this tutorial. If you have a Spin app already feel free to navigate to that directory and skip the step below. 

Fork and clone the app [GitHub repository](https://github.com/radu-matei/spin-react-fullstack.git):

 <!-- @selectiveCpy -->

 ```bash
$ git clone https://github.com/USERNAME/spin-react-fullstack.git
```

Now, switch to that directory and rebuild the application:

 <!-- @selectiveCpy -->

 ```bash
$ cd spin-react-fullstack
$ spin build
```

Now we're ready to push the application. Run the `spin registry push` command to push your application to the registry: 

 <!-- @selectiveCpy -->

 ```bash
$ spin registry push ghcr.io/USERNAME/spin-react-fullstack:v1
```

> **Note:** You can find more information on `spin registry` options and subcommands in the [Spin CLI Reference documentation](./cli-reference#oci-registry).

You now have a Spin application stored in your registry. You can see the artifact under packages in the [GitHub UI](https://docs.github.com/en/packages/learn-github-packages/viewing-packages#viewing-a-repositorys-packages).

## Pull a Spin App From GHCR

Now that we've successfully pushed a Spin app, let's see if we can pull it. To do so, run the following command: 

 <!-- @selectiveCpy -->
 
 ```bash
$ spin registry pull ghcr.io/USERNAME/spin-react-fullstack:v1
```

## Run a Spin App From GHCR

Lastly, let's run this Spin application:

<!-- @selectiveCpy -->

 ```bash
$ spin up -f ghcr.io/USERNAME/spin-react-fullstack:v1
```

## Conclusion

Congratulations on completing this tutorial! You have now successfully built, pushed, pulled, and run a Spin app using GHCR. Behind the scenes, Spin uses [OCI artifacts](https://github.com/opencontainers/artifacts) project to distribute Spin apps across container registries. To learn more about how this feature works, take a look at [our proposal](https://github.com/fermyon/spin/blob/main/docs/content/sips/008-using-oci-registries.md) and [the implementation](https://github.com/fermyon/spin/pull/1014). 

## Next Steps

- If you're interested in shaping how registry support will look in the next version, please share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf)

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Building & Running Spin Applications with Docker",
  "description": "Since Spin 1.0, you can build and share your Spin applications as fully compliant OCI images; even allowing Docker and Docker Compose to pull and run them.",
  "thumbnailUrl": "https://www.fermyon.com/static/image/twc-spin.png",
  "uploadDate": "2023-04-27T08:00:00+00:00",
  "duration": "PT8M07S",
  "contentUrl": "https://www.youtube.com/watch?v=ijTEf8wDkqU",
  "embedUrl": "https://www.youtube.com/embed/ijTEf8wDkqU"
}
</script>
