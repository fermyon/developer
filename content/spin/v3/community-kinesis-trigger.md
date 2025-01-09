title = "The Spin Kinesis Trigger (Community)"
template = "spin_main"
date = "2025-01-09T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/community-kinesis-trigger.md"

---

- [Installing the AWS Kinesis Trigger](#installing-the-aws-kinesis-trigger)
  - [Installing the AWS Kinesis Trigger Plugin](#installing-the-aws-kinesis-trigger-plugin)
  - [Installing the AWS Kinesis Trigger Template](#installing-the-aws-kinesis-trigger-template)
- [Creating the Application](#creating-the-application)
  - [Inspecting the Source Code](#inspecting-the-source-code)
- [Building and Running the Application](#building-and-running-the-application)
- [Additional Spin Triggers](#additional-spin-triggers)
  - [Common Triggers](#common-triggers)
  - [Community Triggers](#community-triggers)


Spin has experimental support for creating and running components on real time data records streamed through [AWS Kinesis](https://docs.aws.amazon.com/streams/latest/dev/introduction.html). Please note that there are only working Kinesis Trigger app samples written in [Rust](https://github.com/ogghead/spin-trigger-kinesis).

> Please note: You can not `spin deploy` an application to Fermyon Cloud if it uses `kinesis` because non-HTTP triggers are not supported in Fermyon Cloud.

Let's look at how the [experimental Kinesis trigger for Spin](https://github.com/ogghead/spin-trigger-kinesis) allows you to deploy an application that runs based on real time data records streamed through AWS Kinesis. (Provisioning and configuring AWS Kinesis is out of scope for this article). The Kinesis trigger leverages AWS credentials from the standard AWS configuration environment variables and maps a AWS Kinesis stream to a specific component. For example:

<!-- @nocpy -->

```toml
[[trigger.kinesis]]
stream_arn = "arn:aws:kinesis:us-east-1:1234567890:stream/TestStream"
batch_size = 1000
shard_idle_wait_millis = 250
detector_poll_millis = 30000
shard_iterator_type = "TRIM_HORIZON"
component = "hello"
```

> Note: See [the list of all available configuration variables](https://github.com/ogghead/spin-trigger-kinesis?tab=readme-ov-file#spintoml) for the AWS Kinesis trigger.

## Installing the AWS Kinesis Trigger

### Installing the AWS Kinesis Trigger Plugin

First, we install the plugin:

```bash
spin plugins update
spin plugins install trigger-kinesis
```

### Installing the AWS Kinesis Trigger Template

Then, we install the template:

```bash
spin templates install --git https://github.com/ogghead/spin-trigger-kinesis
```

## Creating the Application

With the plugin and template installed, we create a new application:

```bash
spin new -t kinesis-rust hello --accept-defaults
```

As part of creating the new application, `spin` CLI will ask for the Amazon Resource Name (ARN). When asked, provide the ARN of your AWS Kinesis instance and confirm it with `[ENTER]`. 

### Inspecting the Source Code

The Rust source code for this application is as follows:

```Rust
use spin_kinesis_sdk::{kinesis_component, Error, KinesisRecord};

#[kinesis_component]
async fn handle_batch_records(records: Vec<KinesisRecord>) -> Result<(), Error> {
    for record in records {
        println!("I GOT A RECORD!  ID: {:?}", record.sequence_number);
        let data = String::from_utf8(record.data.inner).unwrap();
        println!("  ... DATA: {:?}", data);
    }

    Ok(())
}

```

## Building and Running the Application

We can immediately run this pre-written (template) application and observe the time-driven execution:

```bash
cd hello
spin build --up

Building component hello with `cargo build --target wasm32-wasi --release`

...

Finished building all Spin components
Logging component stdio to ".spin/logs/"
I GOT A RECORD!  ID: 101
  ... DATA: { "value" : "foo" }
I GOT A RECORD!  ID: 102
  ... DATA: { "value" : "bar" }
```

As we can see from the above output, our application is now running and executing the function for each data record sent through your individual AWS Kinesis instance.

If you would like to learn more about using the Spin Kinesis Trigger, please check out the ["How I wrote A Kinesis Trigger PLugin For Spin"](https://www.fermyon.com/blog/how-i-wrote-a-kinesis-trigger-plugin-for-spin) blog post and consult the [Spin Kinesis Trigger GitHub repository](https://github.com/ogghead/spin-trigger-kinesis/).

## Additional Spin Triggers

You can leverage different triggers as part of your Spin apps to address common requirements and build real-world, distributed applications with Spin.

### Common Triggers

- [HTTP Trigger](./http-trigger.md)
- [Redis Trigger](./redis-trigger.md)
- [Command Trigger](./command-trigger.md)
- [Cron Trigger](./cron-trigger.md)
- [SQS Trigger](./sqs-trigger.md)

### Community Triggers

The incredible Spin and [SpinKube](https://spinkube.dev) community, also provides the following, additional Spin triggers:

- [Kinesis Trigger](./community-kinesis-trigger.md)
- [MQTT Trigger](./community-mqtt-trigger.md)