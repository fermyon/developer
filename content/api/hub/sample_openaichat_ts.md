title = "OpenAI Chat API TS"
template = "render_hub_content_body"
date = "2023-07-24T02:00:00Z"
content-type = "text/html"
tags = ["openai", "chatgpt", "typescript"]

[extra]
author = "teknicus"
type = "hub_document"
category = "Sample"
language = "JS/TS"
created_at = "2023-07-24T02:00:00Z"
last_updated = "2023-07-24T02:00:00Z"
spin_version = ">v1.3"
summary =  "A sample demonstrating how to use the OpenAI Chat API with TypeScript"
url = "https://github.com/teknicus/spin-openaichat"
keywords = "config, api, AI, chatgpt, ts, http"

---

This is a sample demonstrating to use the [OpenAI Chat API](https://platform.openai.com/docs/api-reference/chat/create) with TypeScript.

The application exposes an endpoint to ask a question in the body of a POST request and get an answer in the response. Originally created for the [Spin Workshop](https://github.com/fermyon/workshops/blob/main/spin/02b-json-api-openai.md)

## Pre-requisites
- npm
- spin (>1.3)

## Getting Started

- Clone the repository
- In the repository folder, run `npm install`
- Generate an API key for OpenAI at [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) 
- Set an environment variable to hold the API key <br> 
`export SPIN_CONFIG_OPENAI_KEY="Your OpenAI Key"`
- Run Spin <br>
`spin build --up`  



## Running the Application with a Provided API Key
This example gets the OpenAI key from a Spin configuration variable. Pass the value of the key to Spin in an environment variable prefixed with SPIN_CONFIG. Spin's environment variable provider with parse the local process environment for these variables and expose them through the Spin config SDK.

```
$ export SPIN_CONFIG_OPENAI_KEY=$YOUR_OPENAI_KEY 
$ spin build --up
Serving http://127.0.0.1:3000
Available Routes:
  openai-chat-ts: http://127.0.0.1:3000/question
```

Now ask your question in the body of the request:

```
$ curl -d "Will I get a pet tortoise?" http://127.0.0.1:3000/question
{"answer": "Outlook is uncertain."}
```

## Notes
- A system prompt has been added to restrict the response to five words or less.
- No context preservation: This is a simple example that demonstrates how to use the OpenAI chat API in a Question-Answer pattern. <b>The conversation context is not preserved.</b>



## Code Overview

The HTTP request is handled by the `handleRequest` function. Following is an overview of the process flow:

- Retreive the question by decoding the response body
- Fetch the OpenAPI Key from the Spin Config [Reference](../../spin/dynamic-configuration#custom-config-providers)
- Structure the request to be sent to OpenAI 
- Decode the response
- Structure and return the response to the client.

Please refer to the code for the details of the implementation.

## References

- [Sending Outbound HTTP Requests](../../spin/javascript-components#sending-outbound-http-requests)

- [Spin Config](../../spin/dynamic-configuration#custom-config-providers)

- [Create chat completion](https://platform.openai.com/docs/api-reference/chat/create)
