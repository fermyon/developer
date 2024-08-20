title = "Serverless AI Embedding Component Sample"
template = "render_hub_content_body"
date = "2023-09-05T00:00:00Z"
content-type = "text/html"
tags = ["ai", "rust", "component"]

[extra]
author = "mikkelhegn"
type = "hub_document"
category = "Sample"
language = "Rust"
created_at = "2023-09-05T00:00:00Z"
last_updated = "2023-09-05T00:00:00Z"
spin_version = "v1.5-pre"
summary =  "A sample fo a Spin component for general embedding use-cases"
url = "https://github.com/mikkelhegn/embedding-demo/tree/main"
keywords = "AI, rust, api, http"

---

This is a sample for how to build a Spin component, which you can use to generate embeddings for texts, and compare against. The component is general-purpose in that it accepts text you want to store in the database. You can update and delete text in the database, e.g. from a web hook, or by different types of automation. You can also call the component to compare a given text string with what's in the database already. The component will return a sorted list of text already in the database.

This is built using the Serverless AI features in Spin and Fermyon Cloud.

Make sure to run the ./dev/db_scheme.sql to create the required schema in the database. I.e. spin up --sqlite @dev/db_scheme.sql

## Pre-requisites

- spin (1.5-pre)

## Getting Started

- Clone the repository
- Build and Run the app, while creating the DB Schema <br>
`spin build && spin up --sqlite @dev/db_scheme.sql`
- You can use the small front-end to play with the API.

More details are in the sample repo.
