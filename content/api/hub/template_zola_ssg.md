title = "Zola SSG Template"
template = "render_hub_content_body"
date = "2023-09-08T00:00:00Z"
content-type = "text/html"
tags = ["rust", "SSG", "http"]

[extra]
author = "karthik2804"
type = "hub_document"
category = "Template"
language = "Rust"
created_at = "2023-11-02T00:00:00Z"
last_updated = "2023-11-02T00:00:00Z"
spin_version = ">v1.0"
summary = "A template to use Zola SSG with Spin"
url = "https://github.com/karthik2804/spin-zola"
keywords = "rust, SSG, website, framework"

---

This is a template for using [Zola framework](https://www.getzola.org/) to create a static webpage.

## Installation
Please first install [Zola](https://www.getzola.org/documentation/getting-started/installation/). 

Then install the template

```bash
$ spin templates install --upgrade --git https://github.com/karthik2804/spin-zola
```

## Creating and Running
You can create a new Spin app with `spin new` or add to an existing Spin app with `spin add` 

```bash
$ spin new zola-ssg my-blog
$ cd my-blog
$ spin build --up
```