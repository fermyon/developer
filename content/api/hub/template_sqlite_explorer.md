title = "SQLite explorer template"
template = "render_hub_content_body"
date = "2023-10-22T00:22:56Z"
content-type = "text/html"
tags = ["db", "sqlite", "observability"]

[extra]
author = "karthik2804"
type = "hub_document"
category = "Template"
language = "Go"
created_at = "2023-10-22T00:22:56Z"
last_updated = "2023-10-22T00:22:56Z"
spin_version = ">=v1.4"
summary =  "A Spin component for exploring the contents  and running a shell for SQLite stores."
url = "https://github.com/karthik2804/spin-sqlite-web-cli"
template_id = "spin-sqlite-explorer"
repo_url = "https://github.com/karthik2804/spin-sqlite-web-cli"
keywords = "sqlite, explorer"

---

The explorer will use Spin's variable config to securely store a username and password for the sqlite-explorer, which provides Sqlite users with a shell experience for their local and cloud based Spin applications. Sqlite-explorer supports both `default` and `custom` SQLite stores. 

Basic support for dot commands like .tables, .schema, .dump, .database and .format. The .dump command is highly experimental. Output in the form of JSON or a table.

## Installation

```bash
spin templates install --upgrade --git https://github.com/karthik2804/spin-sqlite-web-cli/
```

Visit the [GitHub repo](https://github.com/karthik2804/spin-sqlite-web-cli) for complete configuration instructions. 

*Known limitations* 
* When running the spin add, the component will try add its config variables to the spin.toml, if you already have a [variables] section, consolidate the values.
* It is a work in progress, so there definitely might be bugs. If you find one please open an [issue](https://github.com/karthik2804/spin-sqlite-web-cli/issues/new)
