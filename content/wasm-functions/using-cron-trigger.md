title = "Scheduling Tasks with Cron Jobs in Spin"
template = "functions_main"
date = "2025-03-25T00:00:01Z"
enable_shortcodes = true

---
- [Prerequisites](#prerequisites)
- [Introduction to Cron Jobs](#introduction-to-cron-jobs)
  - [What Are Cron Jobs?](#what-are-cron-jobs)
- [Create Spin application](#create-spin-application)
  - [Deploy Spin Application to Fermyon Wasm Functions](#deploy-spin-application-to-fermyon-wasm-functions)
- [Creating a Cron Job for Your Spin Application](#creating-a-cron-job-for-your-spin-application)
- [Managing Cron Jobs](#managing-cron-jobs)
- [Delete Cron Job](#delete-cron-job)
- [Next Steps](#next-steps)
  
This tutorial guides you through the process of scheduling HTTP requests in a Spin application running on Fermyon Wasm Functions using cron jobs. The `spin aka crons` command allows applications to receive scheduled HTTP triggers without relying on external services. In this tutorial, you'll learn how to define and manage cron jobs using the `spin aka crons` command.

# Prerequisites
Before proceeding, ensure you have the following:

- Spin and the `spin aka` plugin installed on your machine ([Installation Guide](./quickstart.md))
- Access to Fermyon Wasm Functions preview ([Sign Up Form](https://fibsu0jcu2g.typeform.com/fwf-preview))

# Introduction to Cron Jobs

## What Are Cron Jobs?

Cron jobs are scheduled tasks that run at specified intervals. They are commonly used for automating repetitive tasks such as data processing, report generation, and background maintenance.

Use Cases for Cron Jobs:
* Automated data backups
* Periodic API polling
* Log file rotation
* Scheduled notifications

# Create Spin application 

You must have a running Spin application on Fermyon Wasm Functions to apply the cron trigger to. We'll create a new Spin application for scheduling tasks using cron jobs using the `http-js` template:

<!-- @selectiveCpy -->

```console
$ spin new -t http-js --accept-defaults hello-cron-job

$ cd hello-cron-job

$ npm install
```

We'll go ahead add a specific path for our cron trigger in later steps:

```toml
[[trigger.http]]
route = "/hello"
component = "hello-cron-job"
```

Let's modify the response body so we can validate that our application is running on a specific interval. To do so, navigate to `src/index.js` and add the following snippet of code:

<!-- @selectiveCpy -->

```JavaScript
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';

let router = AutoRouter();

// Route ordering matters, the first route that matches will be used
// Any route that does not return will be treated as a middleware
// Any unmatched route will return a 404
router
    .get("/hello", () => {
    // Grab datetime
    const now = new Date().toISOString();
    // Return response with time of invocation
    return new Response(`Hello from a cron component at ${now}`, { status: 200 });
});


addEventListener('fetch', (event) => {
    event.respondWith(router.fetch(event.request));
});
```

To test locally, run the following command:

<!-- @selectiveCpy -->

```console
spin build --up
```

If it is working as expected, you should see a message returned along the lines of (but with an accurate datetime):

<!-- @selectiveCpy -->

```console
curl localhost:3000
```

<!-- @nocpy -->

```console
Hello from a cron component at 2025-03-31T21:45:25.562Z
```

## Deploy Spin Application to Fermyon Wasm Functions

Before applying our cron trigger, we must have our Spin application running on the Fermyon Wasm Functions platform. Deploy the application with:

<!-- @selectiveCpy -->

```console
spin aka deploy
```

Upon successful deployment, you should receive a domain name that you can use to test the application:

<!-- @nocpy -->

```console
curl https://ec8f3c23-b73d-4d51-aa69-aabd7ddc132a.aka.fermyon.tech/hello
Hello from a cron component at 2025-04-02T03:16:14.212Z% 
```

# Creating a Cron Job for Your Spin Application

Now we will use the `spin aka crons` command to invoke the Spin app's HTTP endpoint at our desired interval. The syntax for this request follows standard crontab format.

> `spin aka cron` supports single digits in each cron expression field and intervals in every position except the day of the week (e.g., `* */12 * * *` for every 12 hours). The smallest supported cron configuration is every 5 minutes (`*/5 * * * *`). Other syntax elements like comma-separated lists and ranges are not supported. Please feel free to[leave feedback](https://fibsu0jcu2g.typeform.com/to/G2u4tPcP) if your desired range is not supported. 

Let's create a cron job that runs every hour. Since scheduling is based on UTC, you may need to [convert your local time to UTC](https://www.worldtimebuddy.com/?pl=1&lid=100&h=100&hf=1) to ensure correct execution.

<!-- @selectiveCpy -->

```console
spin aka crons create "0 * * * *" "/hello" "hello-cron-job"
```

You should see output similar to:

<!-- @nocpy -->

```console
Created cron which will next run at 2025-04-02 04:00:00 UTC
```

# Managing Cron Jobs

You can view all of your running cron jobs with:

<!-- @selectiveCpy -->

```console
spin aka crons list
```

<!-- @nocpy -->

```console
+----------------+-----------+-------------------------+
| Name           | Schedule  | Next Run                |
+======================================================+
| hello-cron-job | 0 * * * * | 2025-04-02 04:00:00 UTC |
+----------------+-----------+-------------------------+
```

You can have multiple cron jobs per Spin application.

# Delete Cron Job

To delete a cron job, use:

<!-- @selectiveCpy -->

```console
spin aka crons delete hello-cron-job
```

<!-- @nocpy -->

```console
Deleted cron job 'hello-cron-job' with schedule '0 * * * *'
```

Your application will persist unless you explicitly run the `spin aka apps delete` command. 

# Next Steps

* Visit [FAQ](faq.md) for frequently asked questions.