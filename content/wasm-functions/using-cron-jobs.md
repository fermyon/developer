title = "Scheduling Tasks with Cron Jobs in Spin"
template = "functions_main"
date = "2025-03-25T00:00:01Z"
enable_shortcodes = true

---
- [Prerequisites](#prerequisites)
- [Introduction to Cron Jobs](#introduction-to-cron-jobs)
  - [What Are Cron Jobs?](#what-are-cron-jobs)
- [Create a Spin Application](#create-a-spin-application)
  - [Deploy Spin Application to Fermyon Wasm Functions](#deploy-spin-application-to-fermyon-wasm-functions)
- [Scheduling a Cron Job for Your Spin Application](#scheduling-a-cron-job-for-your-spin-application)
- [Managing Cron Jobs](#managing-cron-jobs)
- [Delete Cron Job](#delete-cron-job)
- [Next Steps](#next-steps)
  
This tutorial guides you through the process of scheduling HTTP requests in a Spin application running on Fermyon Wasm Functions using cron jobs. The `spin aka crons` command allows applications to receive scheduled HTTP triggers without relying on external services. In this tutorial, you'll learn how to define and manage cron jobs using the `spin aka crons` command.

# Prerequisites
Before proceeding, ensure you have the following:

- Spin and the `spin aka` plugin installed on your machine ([Installation Guide](./quickstart.md))
- A [Fermyon Wasm Functions account](https://fibsu0jcu2g.typeform.com/fwf-preview)  

# Introduction to Cron Jobs

## What Are Cron Jobs?

Cron jobs are scheduled tasks that run at specified intervals. They are commonly used for automating repetitive tasks such as data processing, report generation, and background maintenance. Other potential use cases include: 

* Automated data backups
* Periodic API polling
* Log file rotation
* Scheduled notifications

# Create a Spin Application 

You must have a Spin application deployed to Fermyon Wasm Functions to associate a cron job. We'll create a new Spin application using the `http-js` template, which we will then invoke on a schedule using a cron job in later steps:

<!-- @selectiveCpy -->

```console
$ spin new -t http-js --accept-defaults hello-world

$ cd hello-world

$ npm install
```

Let’s update the event handler to confirm that our Spin application runs at the expected interval. To keep things simple, we’ll add a log statement that prints the time the application is triggered. This will help us verify that the cron job is working correctly. In a real-world scenario, you might query a database for stale records, call an API to sync data, or trigger a more complex workflow like sending a report or cleaning up expired sessions. 

To apply the simple log changes, navigate to the `hello-world` directory, open `src/index.js`, and add the following code snippet:

<!-- @selectiveCpy -->

```javascript 
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';

// Initialize the router
let router = AutoRouter();

// Define a route that responds to GET requests 
router.get("/", (request) => {
    // Parse the request URL to access query parameters
    const url = new URL(request.url);

    // Capture the current timestamp
    const now = new Date().toISOString();

    // Log every time the route is triggered, including the message (if any)
    console.log(`Cron job triggered at ${now}"`);

    // Return a generic success response
    return new Response("Cron job executed", {
        status: 200,
    });
});

// Attach the router to the fetch event
addEventListener('fetch', (event) => {
    event.respondWith(router.fetch(event.request));
});
```

To build and run the application locally, run the following command:

<!-- @selectiveCpy -->

```console
spin build --up
```

Let's curl the application's endpoint to test if it is working as expected:

<!-- @selectiveCpy -->

```console
curl localhost:3000
```

 You should see the following output in response:

<!-- @nocpy -->

```console
Cron job executed
```

## Deploy Spin Application to Fermyon Wasm Functions

Before scheduling our cron job, we must deploy our Spin application to the Fermyon Wasm Functions platform with the following command:

<!-- @selectiveCpy -->

```console
spin aka deploy
```

Upon successful deployment, you should see output along the lines of:

<!-- @nocpy -->

```console
Name of new app: hello-world
Creating new app hello-world in account your-account
Note: If you would instead like to deploy to an existing app, cancel this deploy and link this workspace to the app with `spin aka app link`
OK to continue? yes
Workspace linked to app hello-world
Waiting for app to be ready... ready

App Routes:
- hello-world: https://ec8a19d8-6d10-4056-bb69-cc864306b489.aka.fermyon.tech (wildcard)
```

You can use the domain name provided to you by Fermyon Wasm Functions to test that the Spin application is working as expected by curling the new endpoint:

<!-- @selectiveCpy -->

```console
curl https://af30f3b0-ed52-4c5b-b2dd-b261945ff696.aka.fermyon.tech/
```

You should receive the same message as you did during local testing:

<!-- @nocpy -->

```console
Cron job executed
```

# Scheduling a Cron Job for Your Spin Application

Now we’ll use the `spin aka crons` command to invoke the Spin application's HTTP endpoint on a scheduled basis. The schedule uses standard crontab syntax.

> `spin aka crons` supports multiple digits in each cron field, as well as intervals in any position (e.g., `* */12 * * *` to run every 12 hours). You can also use comma-separated lists and ranges. If your schedule includes a specific time of day, be sure to use UTC—you may need to [convert your local time to UTC](https://www.worldtimebuddy.com/?pl=1&lid=100&h=100&hf=1) to ensure correct execution.

Let’s create a cron job that triggers your Spin application every 5 minutes with the `spin aka crons create` subcommand. The cron job you generate with this subcommand will be associated with the Spin application in your current working directory that you deployed to Fermyon Wasm Functions. The `spin aka crons create` subcommand takes three arguments:

* **Schedule** – How often the job runs, in standard cron syntax
* **Path and query** – The HTTP path and (optional) query parameters to invoke.   
* **Name** – A name for your cron job

> Note that you can have multiple cron jobs per Spin application as long as the combination of **schedule** and **path and query*** is unique. You might want multiple cron jobs in a single Spin application when different tasks need to run on separate schedules or require different logic. For example, you may want your Spin appliation to fetch different types of data, perform distinct maintenance routines, or sync with multiple external services independently.

In this example, we’ll schedule a job to hit the `/*` path with a msg query parameter set to "fwf" every 5 minutes, for a Spin app named hello-world.

<!-- @selectiveCpy -->

```console
spin aka crons create "*/5 * * * *" "/" "cron-job-1"
```

You should see output similar to:

<!-- @nocpy -->

```console
Created cron which will next run at 2025-04-02 04:00:00 UTC
```

If we wait 5 minutes and check our application logs with the `spin aka logs` subcommand, we will see that our cron job invoked the application every five minutes as expected. 

<!-- @nocpy -->

```console
spin aka logs -a hello-world
2025-04-02 04:00:00 [hello-world]  Cron job triggered at 2025-04-12T04:00:00Z
```

# Managing Cron Jobs

You can view all of your running cron jobs with:

<!-- @selectiveCpy -->

```console
spin aka crons list
```

<!-- @nocpy -->

```console
+----------------+--------------+-------------------------+
| Name           | Schedule     | Next Run                |
+=========================================================+
| cron-job-1     |  */5 * * * * | 2025-04-02 04:00:00 UTC |
+----------------+--------------+-------------------------+
```

# Delete Cron Job

To delete a cron job, use:

<!-- @selectiveCpy -->

```console
spin aka crons delete cron-job-1
```

<!-- @nocpy -->

```console
Deleted cron job 'cron-job-1' with schedule '*/5 * * * *'
```

Your application will persist unless you explicitly run the `spin aka apps delete` command. 

# Next Steps

* Visit [FAQ](faq.md) for frequently asked questions.
