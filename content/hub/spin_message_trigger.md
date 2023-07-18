title = "Spin Message Trigger"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/plain"
tags = ["test", "rust"]

[extra]
author = "Lee-Orr "
type = "hub_document"
category = "Tutorial"
language = "Rust"
created_at = "2022-10-15T00:22:56Z"
last_updated = "2022-10-15T00:22:56Z"
spin_version = ">v1.4"
summary = "A generic messaging trigger for Fermyon Spin"
url = "https://github.com/lee-orr/spin-message-trigger"

---

# Spin Message Trigger

A generiuc messaging trigger for [Fermyon Spin](https://github.com/fermyon/spin). Note this is an experimental/work-in-progress repo, and is not production ready at this point. Also - if you have suggestions for improvements, feel free to make them in the Issues tab.

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

### Desired Features
- Additional broker support
- Support for basic event-sourcing structures
- actor style trigger options

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


## Detailed Usage
When setting up a spin application with this trigger, there are 3 parts:
- the spin application details, which are consistent with any other spin application
- the trigger definition
- the component definitions

### Trigger Definition
The trigger definition object contains two fields - the type, which must be "message", and a dictionary of broker configs. Each broker config contains a broker type - a value which changes based on the message broker type - and a gateway definition.

More info on the broker types & gateway definition is below.

In the example, this section looks like this:

```toml
# Here we define the trigger message type
[trigger]
type = "message"

# This sets up a broker called "test", with the "InMemoryBroker" type.
[trigger.brokers.test]
broker_type = "InMemoryBroker"

# This sets up an HTTP gateway for the test broker on port 3005, and allowing full request/response serialization using JSON.
[trigger.brokers.test.gateway.Http]
port = 3_005
request_response = "Json"

# This sets up a broker called "secondary", which connects to a NATs server at the address "nats" (this is handled by docker compose treating that as a domain name).
[trigger.brokers.secondary.broker_type.Nats]
addresses = ["nats"]

# This sets up an HTTP gateway for the secondary broker on port 3006, and allowing websockets to subscribe to topics published on that broker.
[trigger.brokers.secondary.gateway.Http]
port = 3_006
websockets = "TextBody"
```

### Broker Type Configuration
#### In Memory Broker
The in memory broker is a simple broker, primarily meant for use in single instance deployments and for testing purposes, with support for wildcard subscriptions.
It's configuration is simple:
```toml
[trigger.brokers.BROKER_NAME]
broker_type = "InMemoryBroker"
```

#### Redis Broker
The Redis broker provides support for Redis channels, similar to the spin built-in redis trigger, but with additional support for wildcard subscriptions.
It's configuration involves setting the redis address, like so
```toml
[trigger.brokers.BROKER_NAME]
broker_type = { Redis = "redis://redis:6379" }
```

#### NATs Broker
The NATs broker provides support for subscribing to topics on a NATs broker.
It's configuration is more complex than the previous ones:
```toml
[trigger.brokers.BROKER_NAME.broker_type.NATs]
# This is required, and contains a list of addresses for the nats servers
addresses = ["nats"]

# Optional - do the servers require tls. defaults to false
tls = true

# Optional - the interval for pings, in milliseconds.
pint_interval = 10_000

# Optional - path to root certificates
root_certificate = "/path/to/root/certificate"

# Optional - paths to client certificate files
client_certificate = { certificate = "/path/to/client/cert", key = "/path/to/client/key" }

# Optional - client name
client_name = "the client name"
```

In addition - there are multiple optional authentication options for NATs:
```toml
# Token based auth
[trigger.brokers.BROKER_NAME.broker_type.NATs.auth]
Token = "token string"

# Username & Password authentication
[trigger.brokers.BROKER_NAME.broker_type.NATs.auth]
User = { user = "username", password = "password" }

# NKey authentication
[trigger.brokers.BROKER_NAME.broker_type.NATs.auth]
NKey = "NKey String"

# JWT auth
[trigger.brokers.BROKER_NAME.broker_type.NATs.auth]
Jwt = { nkey_seed = "nkey seed", jwt = "jwt string" }

# Credentials File
[trigger.brokers.BROKER_NAME.broker_type.NATs.auth]
CredentialsFile = "/path/to/credentials/file"

# Credentials String
[trigger.brokers.BROKER_NAME.broker_type.NATs.auth]
CredentialsString = "credentials string"
```

#### MQTT Broker
The MQTT broker provides support for MQTT compatible message brokers. Note that it traslates the topic patterns to be consistent with the other brokers - so segments of the topic will be represented with `.` rather than `/` and wildcards with `*` rather than `+`.
For example, the MQTT topic `my/topic` would be translated into `my.topic`, and the subscription `my/+` would be `my.*`. 

It's configuration involves setting the redis address, like so
```toml
[trigger.brokers.BROKER_NAME.broker_type.Mqtt]
address = "mqtt://mqtt:1883"
# Optionally, you can also provide a client id. Otherwise one will be generated.
id = "my_id"
# Optionally, you can also provide the keep_alive duration, as a f32 in seconds
keep_alive = 5.0

# Optionally, you can also set up a username and password
[trigger.brokers.BROKER_NAME.broker_type.Mqtt.credentials]
username = "username"
password = "password"
```


### Gateway Definition
Each broker can have an HTTP gateway defined for accessing it. The gateways expose 3 routes, based on the config:
- `/publish/*subject*` - an HTTP post to this route will send the body of the request to the subject in the route.
- `/subscribe/*subject*` - this is a route for WebSocket's to subscribe for updates on the subject, with support for pattern matching as provided by the broker.
- `/request/*path*` - this route will serialize any request sent to it into a message, publish it to a specifically formatted subject, and then recieve a response from the first published message on another specifically formatted subject.
- `/ws` - this is a rout for supporting bi-directional, multi-subject websocket connections.

If you wish to enable a gateway, you can define the gateway like so:
```toml
[trigger.brokers.BROKER_NAME.gateway.Http]
# The port for the Http gateway
port = 3005

# An optional configuration for websockets - enabling their use for subscribing to subjects on the broker.
websockets = "BinaryBody"

# Possible Values:

# BinaryBody - will forward the message body directly as binary data
# TextBody - will transform the message body to a utf8 string, and forward the string to the client
# Messagepack - will serialize the input message object, containing the body (a vec of u8's), subject & broker name, to Messagepack 
# Json - will serialize the input message object, containing the body (a vec of u8's), subject & broker name, to Json 

# An optional configuration for enabling request/response patterns (with the /request/ route)
request_response = "Messagepack"

# Possible Values: 

# Messagepack - this will serialize the request into a Messagepack, publish it to the broker, and rely on messagepack for the response as well
# Json - this will serialize the request into Json, publish it to the broker, and rely on json for the response as well
```

For request/response processes - the trigger currently publish messages to special subject names. This is a process one I'd like to change, but haven't had a chance yet.
The subjects follow the following format: `request.*request_id*.*method*.*path*` and `response.*request_id*.*method*.*path*`. The request id is a Ulid generated per request.

### Component Definitions
The component definition contains a trigger secion, which contains information used to determine triggering & responses for this component.
Specifically - the `broker` field takes the name of the broker this compoment gets triggered by, and the `subscription` field, which takes an object configuring the subscription.

A component can either subscribe to a `Topic`, a `Request` or a `Queue`.

#### General Configuration
The main portion of the general configuration is setting the broker you wish to subscribe to, along with any other common spin component configuration options.

```toml
[[component]]
id = "hello"
source = "./target/wasm32-wasi/release/example_app.wasm"
allowed_http_hosts = []
[component.trigger]
# Here we set up the broker we want to subscribe to
broker = "test"
[component.build]
command = "cargo build --target wasm32-wasi --release -p example-app"
```


#### Topic Subscriptions

A `Topic` subscription takes a `topic` string representing the topic being subscribed to - based on the conventions of the specific broker, and an optional `result` field that allows setting up a defaults for published result messages, allowing them to target a different default broker and subject.

Here is one of the component definitions in the example:
```toml
[component.trigger.subscription.Topic]
# Here we set up the topic
topic = "hello.*"
# Here we set up alternative default publishing targets for this component - so by default it sends messages to the "good.bye" subject on the "secondary" broker
result = { default_broker = "secondary", default_subject = "good.bye" }
```

#### Request / Response

A `Request` requires a `path` & an optional `method`, similar to an HTTP router.

```toml
[component.trigger.subscription.Request]
path = "test/*/hello"
method = "POST"

```
Note that the path supports segment wildcards, but not variables at the moment.

#### Queues

A `Queue` requires a `topic` to subscribe to, and a `group` which names the queue for which only one subscriber will receive each message.
```toml

[component.trigger.subscription.Queue]
topic = "test"
group = "queue"
```


## Run the Gateway Independently
You can build the gateway independantly using `cargo build -b gateway` and run it uusing `cargo run -b gateway`. However, it cannot parse the gateway definitions from the spin toml, since it's built primarily for situations where you might host the gateway separately from the actual spin app.

As such - you configure it via the cli arguments. To get the up-to-date arguments, run `cargo run --bin gateway -- -h`. It's important to note that the broker is parsed as a query string. As such - a redis broker might be: `cargo run --bin gateway -- --broker Redis=redis://redis:6379` while a nats broker might be: `cargo run --bin gateway -- --broker Nats[addresses][0]="nats"`. It defaults to port `3015`.

## Bi-Directional Websockets
Bi-directional websockets rely on a simple protocol, encoded in either Json or Msgpack (based on whether websocket subscriptions rely on binary or text).

To subscribe to a topic, the client should send a message with the following structure:
```typescript
{
    "Subscribe": "good.*" 
}

```

The client will receive messages encoding the following structure:
```typescript
{
    message: Array<u8>, // an array representing the contents of the message
    subject: String, // the subject the message was published on
    broker: String, // the name of the broker in the config file
    response_subject: Option<String> // if it is a request/response, send the response to this subject
}

```

The client can also publish messages with the following structure:
```typescript
{
    "Publish": {
        "message": Array<u8>,
        "subject": "good.test",
        "response_subject": Option<String>
    }
}

```



## Development
This repository is set up to function as either a Dev Container (using VsCode). This means you can use Github workspaces to get it set up automatically, or use VSCodes "Clone Repository into Volume" option to clone the repo & build the dev environment for you.

Once you are running, you can use the "update-plugin.sh" script to build the plugin and install it on spin.
Then - run "spin build" & "spin up" in the workspace root to launch it

If you are using VS Code, you'll notice there are two extensions installed:
- Thunder client, which lets you make HTTP requests.
    - you should see, under "Collections" an example app collection with an example request
- WebSocket, which lets you connect to websockets.
    - you should be able to connect to "ws://localhost:3006/subscribe/good.*"
    - When you send the example request in thunder client, you should see a "Goodbye" message arrive in the websocket client

### Repo Structure
- The `trigger-message` crate contains the spin plugin, including the message broker interfaces
- The `spin-message-types` crate contains the `.wit` definition, some shared file types to allow for easy creation of messages, and a `#[message_component]` macro for setting up the trigger in your app
- The `example-app` create demonstrates simple use, and showcasing the use of multiple brokers within a single file
- the `request-response-demo` crate demonstrates creation of a json-based http request/response handler (the body is still a `vec<u8>`)


