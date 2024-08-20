title = "CRUD APIs with JavaScript and SQLite"
template = "render_hub_content_body"
date = "2024-04-03T13:50:00Z"
content-type = "text/plain"
tags = ["http", "JavaScript", "architecture"]

[extra]
author = "Thorsten Hans"
type = "hub_document"
category = "Architecture"
language = "JS/TS"
created_at = "2024-04-03T13:50:00Z"
last_updated = "2024-04-03T13:50:00Z"
spin_version = ">=v2.4.0"
summary = "A full-fledged CRUD API with SQLite backend written in JavaScript"
url = "https://github.com/fermyon/enterprise-architectures-and-patterns/tree/main/http-crud-js-sqlite"
keywords = "Architecture, HTTP, CRUD"

---

This is a sample implementation of CRUD (Create, Read, Update, Delete) in JavaScript. The sample is using SQLite for persistence and provides the following API endpoints via HTTP:

- `GET /items` - To retrieve a list of all items
- `GET /items/:id` - To retrieve a item using its identifier
- `POST /items` - To create a new item
- `PUT /items/:id` - To update an existing item using its identifier
- `DELETE /items` - To delete multiple items providing an array of identifiers as payload (`{ "ids": []}`)
- `DELETE /items/:id` - To delete an existing item using its identifier

Send data to `POST /items` and `PUT /items/:id` using the following structure:

```jsonc
{
    "name": "item name",
    // boolean (either true or false)
    "active": true
}
```