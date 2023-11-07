title = "AI-assisted News Summarizer"
template = "render_hub_content_body"
date = "2023-09-05T09:00:00Z"
content-type = "text/html"
tags = ["typescript", "javascript", "ai"]

[extra]
author = "technosophos"
type = "hub_document"
category = "Sample"
language = "JS/TS"
created_at = "2023-09-05T00:00:00Z"
last_updated = "2023-09-05T00:00:00Z"
spin_version = ">v1.5"
summary =  "Read an RSS feed and have AI summarize it for you"
url = "https://github.com/fermyon/ai-examples/tree/main/newsfeeder-ts"
artifact_source = "ghcr.io/fermyon/newsfeeder-ts:v0.0.1"
keywords = "typescript, javascript, ai"

---

This fetches an RSS feed over HTTP, parses the feed and extracts some data. The data is then used to assemble a prompt that is sent into Fermyon Serverless AI.

The result is that the AI summarizes the content of recent stories on the news feed.
