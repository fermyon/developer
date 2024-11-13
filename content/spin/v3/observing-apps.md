title = "Observing Applications"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/observing-apps.md"

---

- [Application Logs](#application-logs)
- [OpenTelemetry (OTel)](#opentelemetry-otel)
- [The `otel` Plugin for Spin](#the-otel-plugin-for-spin)
  - [Supported Observability Stacks](#supported-observability-stacks)
  - [Using the `otel` Plugin for Spin](#using-the-otel-plugin-for-spin)
- [Configuring your own observability stack](#configuring-your-own-observability-stack)
  - [Configure the Docker compose stack](#configure-the-docker-compose-stack)
  - [Configuring Spin](#configuring-spin)
  - [Traces](#traces)
  - [Metrics](#metrics)
  - [Logs](#logs)

## Application Logs

Spin handles application logs by default, storing output and error messages from file system-run applications in the `.spin/logs` directory alongside the manifest file's location. Users have the option to direct logs to a specific folder using the `--log-dir` flag of the `spin up` command. Additionally, if users wish to prevent `stdout` and `stderr` from being written to disk, they can specify an empty string for the `--log-dir` flag, i.e. `spin up --log-dir ""` - effectively disabling log storage. See the [persistent logs](./running-apps#persistent-logs) section for more details.

## OpenTelemetry (OTel)

Spin now has support for the [OpenTelemetry (OTel)](https://opentelemetry.io/) observability standard. You can learn more about observability [here](https://opentelemetry.io/docs/concepts/observability-primer/). When configured, Spin will emit telemetry about your Spin App in the form of OTel [signals](https://opentelemetry.io/docs/concepts/signals/): traces, metrics, and logs.

## The `otel` Plugin for Spin

We have a plugin that makes it easy to use OpenTelemetry with Spin. If you would like to examine the source code, you can visit the [GitHub repository](https://github.com/fermyon/otel-plugin). Otherwise, follow these instructions:

- To install the plugin, run the commands below:

  ```sh
  spin plugins update
  spin plugins install otel
  ```

### Supported Observability Stacks

The `otel` plugin for Spin currently supports the following observability stacks:

- **Default**: A multi-container observability stack based on Prometheus, Loki, Grafana and Jaeger
- **Aspire**: A single-container observability stack using .NET Aspire Standalone Dashboard

### Using the `otel` Plugin for Spin

Setting up an observability stack is as easy as executing either `spin otel setup` or `spin otel setup --aspire` in the folder where your Spin app remains. 

The `otel` plugin comes with a handy `spin otel up` command, which you can use to start a Spin app and instruct it to emit telemetry data to your observability stack of choice.

As your observability stack of choice is executed using traditional containers, you may want to stop them once you don't need them anymore. To do so, run `spin otel cleanup`.

To see all available commands of the `otel` plugin, you can run `spin otel --help`.

## Configuring your own observability stack

Follow this portion of the guide if you want to use Spin and OTel, but want to have more control than what the OTel plugin offers.

### Configure the Docker compose stack

In order to view the telemetry data you need to run an OTel compliant [collector](https://opentelemetry.io/docs/collector/) and the proper backends for each signal type. If you have Docker on your system you can easily start all the observability tools you need with the following commands:

```sh
cd  ~
git clone git@github.com:fermyon/spin.git
cd spin/hack/o11y-stack
docker compose up -d
```

This will start the following services:

- [OTel Collector](https://opentelemetry.io/docs/collector/): Collector to receive OTel signals from Spin and forward to the appropriate backends.
- [Jaeger](https://www.jaegertracing.io/): Backend for traces.
- [Tempo](https://grafana.com/oss/tempo/): Alternative backend for traces.
- [Loki](https://grafana.com/oss/loki/): Backend for logs.
- [Prometheus](https://prometheus.io/): Backend for metrics.
- [Grafana](https://grafana.com/oss/grafana/): Dashboard for viewing data stored in Tempo, Loki, and Prometheus.

### Configuring Spin

To have Spin export OTel telemetry to the collector you need to set the following environment variable:

```sh
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 spin up
```

This will enable all OTel signals. If you only want to enable specific signals you can set the following environment variables individually:

- Traces: `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`
- Metrics: `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
- Logs: `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`

For example this would enable exporting of traces and metrics:

```sh
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://localhost:4318/v1/traces OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://localhost:4318/v1/metrics spin up
```

Storing lots of trace data can get expensive. You may want to sample traces to reduce the amount of data stored. You can set the following environment variable to control the sampling rate:

```sh
OTEL_TRACES_SAMPLER=traceidratio OTEL_TRACES_SAMPLER_ARG={desired_ratio} OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 spin up
```

Under high request loads Spin will start dropping OTel data. If keeping all of this data is important to you there are [environment variables](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#batch-span-processor) you can set:

```sh
OTEL_BSP_MAX_CONCURRENT_EXPORTS=4 OTEL_BSP_MAX_QUEUE_SIZE=4096 OTEL_BSP_SCHEDULE_DELAY=1000 OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 spin up
```

Spin supports a wide array of OTel configuration options beyond what we've covered here. You can read more about them [here](https://opentelemetry.io/docs/specs/otel/protocol/exporter/) and [here](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#general-sdk-configuration).

### Traces

After sending some requests to your Spin app, navigate to Jaeger [http://localhost:16686](http://localhost:16686) to view the traces.

![Traces from app](/static/image/jaeger-traces.png)

Spin supports both inbound and outbound [trace context propagation](https://opentelemetry.io/docs/concepts/context-propagation/). This allows you to include Spin in your distributed traces that span all your services.

### Metrics

Navigate to [http://localhost:5050/explore](http://localhost:5050/explore) to view the metrics in Grafana. Make sure to choose the Prometheus data source from the top left dropdown menu.

### Logs

Navigate to [http://localhost:5050/explore](http://localhost:5050/explore) to view the logs in Grafana. Make sure to choose the Loki data source from the top left dropdown menu.

Spin will still emit application logs as described in the [Application Logs](#application-logs) section. However, it will also send the logs to the OTel collector.
