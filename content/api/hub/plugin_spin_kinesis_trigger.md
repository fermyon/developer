title = "Kinesis Trigger"
template = "render_hub_content_body"
date = "2024-10-04T00:22:56Z"
content-type = "text/plain"
tags = ["trigger", "rust", "plugins"]

[extra]
author = "ogghead"
type = "hub_document"
category = "Plugin"
language = "Rust"
created_at = "2024-08-31T00:22:56Z"
last_updated = "2024-10-04T00:22:56Z"
spin_version = ">=v2.6.0"
summary = "An experimental Kinesis trigger for Spin apps"
url = "https://github.com/ogghead/spin-trigger-kinesis"
keywords = "trigger, kinesis"

---

An experimental plugin that enables AWS Kinesis trigger for Spin applications.

## Installing Plugin

You can install the plugin using the following command:

```sh
spin plugins install --url https://github.com/ogghead/spin-trigger-kinesis/releases/download/canary/trigger-kinesis.json
```

## Installing Template

You can install the template using the following command:

```sh
spin templates install --update --git https://github.com/ogghead/spin-trigger-kinesis
```

Once the template is installed, you can create a new application using:

```sh
spin new -t kinesis-rust hello_kinesis --accept-defaults
```

Note that you will need to provide a valid ARN (Amazon Resource Name) for your stream.

To run the newly created app:

```bash
cd hello_kinesis
spin build --up
```

### Configuring the Kinesis Trigger

The trigger type is `kinesis` and there are no application-level configuration options.

The following options are available to set in the [[trigger.kinesis]] section:

| Name                        | Type             | Required? | Description |
|-----------------------------|------------------|-----------|-------------|
| `stream_arn`                | string           | required  | The stream to which this trigger listens and responds. |
| `batch_size`                | number           | optional  | The maximum number of records to fetch per Kinesis shard on each poll. The default is 10. This directly affects the amount of records that your component is invoked with. |
| `shard_idle_wait_millis`    | number           | optional  | How long (in milliseconds) to wait between checks when the stream is idle (i.e. when no messages were received on the last check). The default is 1000. If the stream is _not_ idle, there is no wait between checks. The idle wait is also applied if an error occurs. Note that this number should _not_ exceed 300,000 milliseconds (5 minutes), as shard iterators time out after this period |
| `detector_poll_millis`      | number           | optional  | How long (in milliseconds) to wait between checks for new shards. The default is 30,000 (30 seconds). |
| `shard_iterator_type`       | enum             | optional  | See <https://docs.aws.amazon.com/cli/latest/reference/kinesis/get-shard-iterator.html#options> for possible options. Defaults to LATEST. |
| `component`                 | string or table  | required  | The component to run when a stream record is received. This is the standard Spin trigger component field. |

```toml
[[trigger.kinesis]]
component = "test"
stream_arn = "arn:aws:kinesis:us-east-1:1234567890:stream/TestStream"
batch_size = 1000
shard_idle_wait_millis = 250
detector_poll_millis = 30000
shard_iterator_type = "TRIM_HORIZON"
```
