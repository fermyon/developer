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
- Access to Fermyon Wasm Functions preview ([Sign Up Form](https://fibsu0jcu2g.typeform.com/fwf-preview))

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
$ spin new -t http-js --accept-defaults hello-cron-job

$ cd hello-cron-job

$ npm install
```

We'll go ahead add a path that will be used our cron job in later steps:

```toml
[[trigger.http]]
route = "/cron-me"
component = "hello-cron-job"
```

> Note that you can have multiple cron jobs per Spin application as long as the combination of schedule and path_and_query is unique. We will review how to apply those values later in the tutorial.  

Let's modify the response body to validate that our Spin application is running on a specific interval, and determine whether it was triggered by our cron job or via a direct request. If the request includes query parameters, we can infer that it came from the cron job, which we will set up in future steps. We’ll use this identifier to log the cron event. To apply these changes, navigate to the `hello-cron-job` directory, go to `src/index.js`, and add the following code snippet:

<!-- @selectiveCpy -->

```javascript 
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';

// Initialize the router
let router = AutoRouter();

// Route ordering matters:
// - The first matching route is used
// - Routes can act as middleware if they don’t return a response
// - Unmatched routes return a 404
router
    .get("/cron-me", (request) => {
        // Parse the request URL to access query parameters
        const url = new URL(request.url);
        
        // Read the 'msg' query parameter, defaulting to an empty string if not provided
        const msg = url.searchParams.get("msg");

        // Capture current timestamp for logging and response
        const now = new Date().toISOString();

        // Log the trigger event, including the value of 'msg'
        if (msg) {
            console.log(`Hello, cron job triggered with msg: "${msg}" at ${now}`);
            // Return a success response with a status 200
            return new Response( {
                status: 200,
            });
        } else {
            // Return a direct ping response without logging
            return new Response(`Hello! This is a direct ping at ${now}`, {
                status: 200,
            });
        }
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
curl localhost:3000/cron-me
```

 You should see a message returned along the lines of (_but with an accurate datetime at the time of following this tutoral_):

<!-- @nocpy -->

```console
Hello! This is a direct ping at 2025-04-02T02:45:25.562Z
```

## Deploy Spin Application to Fermyon Wasm Functions

Before scheduling our cron job, we deploy our Spin application to the Fermyon Wasm Functions platform. Deploy the application with the following command:

<!-- @selectiveCpy -->

```console
spin aka deploy
```

Upon successful deployment, you should receive a domain name that you can use to test the application:

<!-- @nocpy -->

```console
curl https://ec8f3c23-b73d-4d51-aa69-aabd7ddc132a.aka.fermyon.tech/cron-me
Hello! This is a direct ping at 2025-04-02T03:16:14.212Z% 
```

# Scheduling a Cron Job for Your Spin Application

Now we will use the `spin aka crons` command to invoke the Spin app's HTTP endpoint on our desired schedule. The syntax for this request follows standard crontab format.

> `spin aka crons` supports multiple digits in each cron expression field and intervals in every position (e.g., `* */12 * * *` for every 12 hours). Syntax elements like comma-separated lists and ranges are currently supported. Scheduling follows UTC and you may need to [convert your local time to UTC](https://www.worldtimebuddy.com/?pl=1&lid=100&h=100&hf=1) to ensure correct execution during daylight savings time.

Let’s create a cron job that triggers your Spin application every 5 minutes. The `spin aka crons create` subcommand takes three arguments:

* **Schedule:** How often the job runs, using standard cron syntax
* **Path and query:** The HTTP path (and optional query parameters) to invoke
* **Name:** The Spin applciaton to apply the cron job to

In this example, we’ll schedule a job that hits the `/cron-me` path with a `msg` query parameter of "fwf" every 5 minutes for a Spin app named hello-cron-job.

<!-- @selectiveCpy -->

```console
spin aka crons create "*/5 * * * *" "/cron-me?msg=fwf" "hello-cron-job"
```

You should see output similar to:

<!-- @nocpy -->

```console
Created cron which will next run at 2025-04-02 04:00:00 UTC
```

If we wait 5 minutes and check our application logs with the `spin aka logs` subcommand, we will see that our cron job invoked the application at the top of the hour as expected. 

<!-- @nocpy -->

```console
spin aka logs -a hello-cron-job
2025-04-02 04:00:00 [hello-cron-job]  Hello, cron job triggered with msg: "fwf" at 2025-04-12T04:00:00Z
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
| hello-cron-job |  */5 * * * * | 2025-04-02 04:00:00 UTC |
+----------------+--------------+-------------------------+
```

# Delete Cron Job

To delete a cron job, use:

<!-- @selectiveCpy -->

```console
spin aka crons delete hello-cron-job
```

<!-- @nocpy -->

```console
Deleted cron job 'hello-cron-job' with schedule '*/5 * * * *'
```

Your application will persist unless you explicitly run the `spin aka apps delete` command. 

# Next Steps

* Visit [FAQ](faq.md) for frequently asked questions.