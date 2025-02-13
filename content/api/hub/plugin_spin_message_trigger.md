title = "Spin Message Trigger"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/plain"
tags = ["trigger", "rust"]

[extra]
author = "Lee-Orr "
type = "hub_document"
category = "Plugin"
language = "Rust"
created_at = "2022-10-15T00:22:56Z"
last_updated = "2022-10-15T00:22:56Z"
spin_version = ">v1.4"
summary = "A generic messaging trigger for Fermyon Spin"
url = "https://github.com/lee-orr/spin-message-trigger"
keywrods = "trigger, message, NATS"

---


A generiuc messaging trigger for [Fermyon Spin](https://github.com/spinframework/spin). Note this is an experimental/work-in-progress repo, and is not production ready at this point. Also - if you have suggestions for improvements, feel free to make them in the Issues tab.

## Features

- Use multipe message brokers, including (currently):
    - a simple in memory broker (with * based wildcard support)
    - redis pubsub
    - NATS
    - MQTT
- Named brokers - allowing multiple brokers of the same or different types in a single application
    - this is designed to support usecases such as separating the publishing of internal domain events & public events meant for others to consume
- an HTTP gateway server for publishing messages to the broker, as well as some request/response support
- a WebSocket server allowing subscribing to single subjects (with wildcard support, as available for the broker), as well as bi-directional socket communication
- Trigger a Spin component from a message on a subscribed channel
- Publish messages from the Spin component - defaulting to the same broker & subject, but optionally setting other defaults or manually setting the broker & subject for each message
- Run the HTTP gateway server independently of the main spin app (doesn't really work for the in memory broker, but works for others)
- Multiple message paradigms - Pub/Sub, Request/Response & Queues

## Installation
To install the plugin, run the following command on the system running your spin deployment (or any development machine):
```bash
spin plugin install --url https://github.com/lee-orr/spin-message-trigger/releases/download/canary/trigger-message.json --yes
```

## Quick Start
Once you've installed the plugin, you can get started quickly installing the templates and using them:

```bash
spin templates install --git https://github.com/lee-orr/spin-message-trigger --upgrade
```

You can then set up a new project using:
```bash
spin new message-app
```

Once you have that, you can use `spin add` to set up components, brokers and gateways. Importantly **Components must be manually added to the Cargo.toml workspace** once they are created.
The available templates are:
| Template Name | Description |
| --- | --- |
| message-component | This creates a component that gets triggered by a subscription. |
| request-response-message-component | This creates a component that gets triggered by a request-response message, with an HTTP method & path. |
| queue-component | This creates a component that gets subscribes to a queue - meaning only one member of the queue group will get triggered for each message. Most useful if you have multiple instances of the spin application running. |
|  |  |
| redis-broker | This connects to a redis pub-sub on the provided server |
| mqtt-broker |  This connects to an Mqtt server |
| nats-broker |  This connects to a Nats server or cluster |
|  |  |
| broker-gateway | This sets up an Http gateway that publishes to one of the brokers in your project |


For detailed usage checkout out the [github repository](https://github.com/lee-orr/spin-message-trigger)