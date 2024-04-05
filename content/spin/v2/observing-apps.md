title = "Observing Applications"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/observing-apps.md"

---

- [Logs](#logs)
- [OpenTelemetry (OTEL)](#opentelemetry-otel)

## Logs

Spin handles application logs by default, storing output and error messages from file system-run applications in the `.spin/logs` directory alongside the manifest file's location. You can direct logs to a specific folder using the `--log-dir` flag of the `spin up` command. Additionally, if you wish to prevent `stdout` and `stderr` from being written to disk, you can specify an empty string for the `--log-dir` flag, i.e. `spin up --log-dir ""` - effectively disabling log storage. See the [persistent logs](./running-apps#persistent-logs) section for more details.

## OpenTelemetry (OTEL)

Spin has experimental support for the [OpenTelemetry (OTEL)](https://opentelemetry.io/) observability standard. When configured, Spin will emit traces of your Spin App as an OTEL [signal](https://opentelemetry.io/docs/concepts/signals/). Here is a teaser of how to configure it.

> OpenTelemetry support requires Spin 2.4 or above.

First, run an OTEL compliant [collector](https://opentelemetry.io/docs/collector/) to collect the traces. [Jaeger](https://www.jaegertracing.io/) is an open source distributed tracing platform that can act as an OTEL collector and enables viewing taces. You can run Jaeger using Docker:

```bash
docker run -d -p16686:16686 -p4317:4317 -p4318:4318 -e COLLECTOR_OTLP_ENABLED=true jaegertracing/all-in-one:latest
```

Now, you can start your Spin app, setting the endpoint of the OTEL collector in the **`OTEL_EXPORTER_OTLP_ENDPOINT`** environment variable:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 spin up
```

After sending some requests to your Spin app, navigate to Jaeger `http://localhost:16686` to view the traces.

![Traces from app](/static/image/jaeger-traces.png)

Spin supports both inbound and outbound [trace context propagation](https://opentelemetry.io/docs/concepts/context-propagation/). This allows you to include Spin in your distributed traces that span all your services.

This observability support in Spin is still experimental. Only the HTTP trigger, the LLM host component, and outbound HTTP requests are implemented at this time. Going forward, we will be adding tracing to the remainder of Spin triggers and host components. We also hope to add support for the OTEL metrics signal in the future. Try it out, let us know what you think and help us improve the observability experience in Spin!