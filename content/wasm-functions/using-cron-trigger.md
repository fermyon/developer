title = "Scheduling Tasks with Cron Jobs in Spin"
template = "functions_main"
date = "2025-03-25T00:00:01Z"
enable_shortcodes = true

---
- [Prerequisites](#prerequisites)
- [Introduction to Cron Jobs](#introduction-to-cron-jobs)
  - [What Are Cron Jobs?](#what-are-cron-jobs)
- [Spin and Fermyon Wasm Functions](#spin-and-fermyon-wasm-functions)
  - [Create Spin application](#create-spin-application)
  - [Creating a Cron Job for your Spin application](#creating-a-cron-job-for-your-spin-application)
  - [Managing Cron Jobs](#managing-cron-jobs)
  
This tutorial guides you through the process of scheduling HTTP requests in a Spin application running on Fermyon Wasm Functions using cron jobs. The `spin aka cron` command allows applications to receive scheduled HTTP triggers without relying on external services. In this tutorial, you'll learn how to define and manage cron jobs using the `spin aka cron` command.

# Prerequisites
Before proceeding, ensure you have the following:

- Spin installed on your machine (Installation Guide)
- Access to Fermyon Wasm Functions preview (Sign Up Form)

# Introduction to Cron Jobs

## What Are Cron Jobs?

Cron jobs are scheduled tasks that run at specified intervals. They are commonly used for automating repetitive tasks such as data processing, report generation, and background maintenance.

Use Cases for Cron Jobs:
* Automated data backups
* Periodic API polling
* Log file rotation
* Scheduled notifications

# Spin and Fermyon Wasm Functions

Spin is a lightweight framework for building WebAssembly microservices and applications. It allows developers to define cron jobs that execute functions at scheduled intervals. To simplify development, Spin provides templates for various use cases, including scheduled tasks. 

## Create Spin application 

You must have a running Spin application on Fermyon Wasm Functions to apply the cron trigger to. We'll create a new Spin application for scheduling tasks using cron jobs:



## Creating a Cron Job for your Spin application

## Managing Cron Jobs
