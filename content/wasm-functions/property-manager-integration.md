title = "Integrating with Property Manager"
template = "functions_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true

---

- [Prerequisites](#prerequisites)
- [Build & Deploy the Spin App](#build-deploy-the-spin-app)
- [Route traffic to the Spin Application Through an Akamai Property](#route-traffic-to-the-spin-application-through-an-akamai-property)
  - [Activating the new Property version](#activating-the-new-property-version)
  - [Calling the Spin App Through the Akamai Property](#calling-the-spin-app-through-the-akamai-property)

This tutorial guides you through the process of integrating a Spin application - deployed to your _Fermyon Wasm Functions_ account - with an existing Akamai Property for routing requests through your property to the Spin application. 

The goal of this tutorial is to route a specific path on your existing property - e.g., `https://www.mydomain.com/hello` to the Spin application we'll deploy to _Fermyon Wasm Functions_.

As this guide does not provide an introduction to Akamai Properties and the Akamai Property Manager, you may want to consult the [Akamai TechDocs](https://techdocs.akamai.com/home) to learn more about the [Akamai Property Manager](https://techdocs.akamai.com/property-mgr/docs/welcome-prop-manager) - if necessary. 

## Prerequisites

This tutorial assumes that you have already accomplished the following:

- Created and Configured an Akamai Property within Akamai Property Manager
- Installed the `spin` CLI 
  - See [Install Spin](/wasm-functions/quickstart#install-spin)
  - See [Install the `aka` Plugin for Spin](/wasm-functions/quickstart#install-the-aka-plugin-for-spin)

## Build & Deploy the Spin App

We will use a pretty simple Spin application as part of this tutorial. Let's use the `spin` CLI to create a new application using the `http-js` template and move into the application directory:

<!-- @selectiveCpy -->

```console
$ spin new -t http-js -a hello-fermyon-wasm-functions

$ cd hello-fermyon-wasm-functions
```

With the Spin application created and all necessary dependencies installed, let's modify the implementation of the app. Go ahead and replace the contents of the `index.js` file (located in the `src` directory of your application) with the following lines of JavaScript code: 

```JavaScript
import { AutoRouter } from 'itty-router';

let router = AutoRouter();

router.get("/", () => new Response("Hello, Fermyon Wasm Functions"));

addEventListener('fetch', async (event) => {
    event.respondWith(router.fetch(event.request));
});
```

Once you've updated the `src/index.js` file, use the `spin build` command to compile your source code to WebAssembly and deploy the application to _Fermyon Wasm Functions_ using the `spin aka deploy`.

<!-- @selectiveCpy -->

```console
$ spin build

$ spin aka deploy
```

> **Hint**: You must be authenticated to use the `spin aka deploy` command. Use the `spin aka login` command to authenticate using your GitHub account.

The `spin aka deploy` command will generate an output similar to the one shown below:

<!-- @noCpy -->

```console
App 'hello-fermyon-wasm-functions' initialized successfully.
Waiting for application to be ready... ready

View application: https://27383f31-adbe-482f-a859-2ce9aad02c4f.aka.fermyon.tech/
```

Copy the URL from the output shown in your terminal, we'll need it in a second to configure the Akamai Property.

## Route Traffic to the Spin Application Through an Akamai Property

Next, we have to update the desired Property in Akamai. To do so, navigate to the [Akamai Control Center](https://control.akamai.com/apps/home-page/#/home), find your Akamai Property of choice and open its latest version, and press the _Edit New Version_ button (located in the top right corner).

From the _Property Configuration Settings_ click the _+ Rule_ button, select the _Blank Rule Template_ and provide a name for the new rule.

![Adding a new Rule using the Blank Rule Template](/static/image/akamai-property-new-rule.png)

Next, add a new match condition using the _+ Match_ button, from the _Criteria_ panel and configure it for `Path` to `matches one of` and add `/hello/*` as value:

![Rule Match Criteria](/static/image/akamai-property-match-criteria.png)

With the match condition in place, we can move on and take care of adding custom behaviors using the _Behaviors_ panel. 

Let's start by adding the _Origin Server_ behavior using the _Standard Property Behavior_ button from within the  _+ Behavior_ drop-down button. We'll leave the majority of properties unchanged. However, ensure to update the fields:

| Field Name             | Desired Value                        |
| ---------------------- | ------------------------------------ |
| Origin Server Hostname | `<origin* of your Spin application>` |
| Forward Host Header    | Origin Hostname                      |

> `*` You can get the origin of your Spin Application by removing the `https://` prefix and the trailing slash (`/`) from the end of its URL.

Next, we want to prevent the Akamai Property from sending our chosen the routing criteria (`/hello/`) as path to the Spin application running on _Fermyon Wasm Functions_. 

To do so, we add a _Modify Outgoing Request Path_ behavior to our rule. Again use the _Standard Property Behavior_ button from within the _+ Behaviors_ drop-down button. Update the following fields of the _Modify Outgoing Request Path_ behavior:

| Field Name                | Desired Value                     |
| ------------------------- | --------------------------------- |
| Action                    | Replace Part of the incoming path |
| Find what                 | `/hello/`                         |
| Replace with              | `/`                               |
| Occurrences               | First occurrence only             |
| Keep the query parameters | Yes                               |

With both behaviors configured, your rule should look similar to the rule shown in this picture:

![Property Behaviors](/static/image/akamai-property-behaviors.png)

Persist the changes by pressing the _Save_ button.

### Activating the New Property Version

At this point, the new rule isn't active, yet! We have to activate the latest version of our Akamai Property in order to make our changes take effect. Activate the latest version of your Akamai Property using the _Activate_ tab. 

> **Note**: We highly recommend activating and testing the property modifications using the Staging environment instead of going straight to production.

### Calling the Spin App Through the Akamai Property

To test the rule added as part of this tutorial, you can use a tool like `curl` tool and send a `GET` request to `https://engineerd.xyz/hello/` (replace `https://engineerd.xyz` with the domain associated to your Akamai Property).

If the rule is configured correctly, we should see the same response being printed to `stdout` as if we would send a `GET` request to the root route of our Spin application deployed to _Fermyon Wasm Functions_:

<!-- @selectiveCpy -->

```console
$ curl https://engineerd.xyz/hello/
```

At this point, you should see `Hello, Fermyon Wasm Functions` being printed to `stdout`, indicating that you've successfully integrated a Spin application running on _Fermyon Wasm Functions_ with an existing Akamai Property 🎉.
