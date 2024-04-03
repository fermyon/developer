title = "Polyglot Publish-Subscribe"
template = "render_hub_content_body"
date = "2024-04-03T13:50:00Z"
content-type = "text/plain"
tags = ["publish-subscribe", "architecture", "polyglot"]

[extra]
author = "Thorsten Hans"
type = "hub_document"
category = "Architecture"
language = "Polyglot"
created_at = "2024-04-03T13:50:00Z"
last_updated = "2024-04-03T13:50:00Z"
spin_version = ">=v2.4.0"
summary = "Publish-Subscribe implementation using multiple programming languages (Rust, Go, JavaScript)"
url = "https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/pub-sub-polyglot"
keywords = "Architecture"

---
This sample contains a Publish-Subscribe (sometimes referred to as _pub/sub_) pattern implemented using different programming languages.

### What is Publish-Subscribe

The Publish-Subscribe pattern is a messaging pattern widely used in distributed systems to facilitate communication between multiple components or modules in a decoupled manner. In this pattern, publishers are responsible for producing messages containing data or events of interest, while subscribers express interest in specific types of messages by subscribing to relevant topics or channels. When a publisher generates a message, it is broadcasted to all subscribed subscribers without the publisher needing to have any knowledge of the subscribers' identities or how they process the messages. This decoupling enables loose coupling between components, making systems more flexible, scalable, and easier to maintain.

Subscribers can react to messages they are interested in by executing predefined actions or processing the data contained within the messages. This pattern is commonly implemented using message brokers or event buses, where publishers send messages to a centralized location and subscribers receive messages from this central hub. By leveraging Publish-Subscribe, you can design systems where components are highly modular and can be easily extended or modified without affecting other parts of the system. Additionally, this pattern supports asynchronous communication, enabling efficient handling of large volumes of messages and improving system responsiveness.