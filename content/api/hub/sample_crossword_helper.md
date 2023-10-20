title = "AI-assisted Crossword Helper"
template = "render_hub_content_body"
date = "2023-10-17T09:00:00Z"
content-type = "text/html"
tags = ["typescript", "javascript", "ai"]

[extra]
author = "technosophos"
type = "hub_document"
category = "Sample"
language = "JS/TS"
created_at = "2023-10-17T09:00:00Z"
last_updated = "2023-10-17T09:00:00Z"
spin_version = ">v1.5"
summary =  "Assist solving crossword puzzles"
url = "https://github.com/technosophos/crossword-helper"
keywords = "typescript, javascript, ai"

---

This app is a helper for solving crossword puzzles. It uses LLaMa2-Chat to provide one or more candidate answers for those too-tough crossword puzzle clues.

The app is written in TypeScript and uses the `static-fileserver` to serve the frontend, and a simple REST-based JSON service to answer questions. There is a small amount of client-side JavaScript to handle making the requests.
