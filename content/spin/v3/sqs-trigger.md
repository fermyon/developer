title = "The Spin SQS Trigger"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/sqs-trigger.md"

---

- [Installing the AWS Kinesis Trigger](#installing-the-aws-kinesis-trigger)
  - [Installing the AWS Kinesis Trigger Plugin](#installing-the-aws-kinesis-trigger-plugin)
  - [Installing the AWS Kinesis Trigger Template](#installing-the-aws-kinesis-trigger-template)
- [Creating the Application](#creating-the-application)
  - [Inspecting the Source Code](#inspecting-the-source-code)
- [Building and Running the Application](#building-and-running-the-application)


Spin has experimental support for creating and running components for messages appearing in [Amazon Simple Queue Service (SQS)](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) queues. Please note that there are only working Kinesis Trigger app samples written in [Rust](https://github.com/ogghead/spin-trigger-kinesis).

> Please note: You can not `spin deploy` an application to Fermyon Cloud if it uses `sqs` because non-HTTP triggers are not supported in Fermyon Cloud.

TBD

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