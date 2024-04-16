title = "Aggregate Pattern"
template = "render_hub_content_body"
date = "2024-04-11T06:50:00Z"
content-type = "text/plain"
tags = ["Patterns", "Service Chaining", "Polyglot"]

[extra]
author = "Thorsten Hans"
type = "hub_document"
category = "Pattern"
language = "Polyglot"
created_at = "2024-04-11T06:50:00Z"
last_updated = "2024-04-11T06:50:00Z"
spin_version = ">=v2.4.2"
summary = "Polyglot implementation of the Aggregate Pattern using Service Chaining capabilities provided by Spin"
url = "https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/aggregate-pattern"
keywords = "Patterns, Service Chaining, Polyglot"

---

This folder contains an implementation of the Aggregate Pattern. The sample consists of two backend services (written in Go and TypeScript) and an aggregate (written in Rust).

### What Is the Aggregate Pattern?

In the context of a microservices architecture, the Aggregate Design Pattern refers to a strategy for composing multiple microservices to fulfill a single business operation or query. Instead of relying on a single microservice to handle complex operations, aggregates distribute the workload across multiple services, each responsible for managing a specific aspect of the operation. This pattern helps in achieving scalability, fault isolation, and autonomy among microservices. By decomposing large operations into smaller, manageable tasks distributed across microservices, the Aggregate Design Pattern enables more efficient and resilient systems in microservices architecture.

## Sample Scenario

For demonstration purposes, take the two backend services [`customers-service`](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/aggregate-pattern/customers-service) and [`incidents-service`](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/aggregate-pattern/incidents-service) as given. Although they expose necessary data directly, developers must issue many requests to create a dashboard displaying information provided by those backend services. 

Instead, an **aggregate** is implemented ([`aggregates-service](https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/aggregate-pattern/aggregates-service)) which is responsible for loading data from backend services (via service chaining) and composing a uniform representation for data that should be visualized on the dashboard. 

In addition to calling into backend services using service chaining, the *Aggregates Service* is responsible to transform data according to the use-case.
