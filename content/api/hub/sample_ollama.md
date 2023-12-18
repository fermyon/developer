title = "Ollama Using Spin"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/html"
tags = ["rust", "ollama", "llm", "ai"]

[extra]
author = "Devashish Lal"
type = "hub_document"
category = "Sample"
language = "Rust"
created_at = "2023-12-12T02:00:00Z"
last_updated = "2022-10-15T02:00:0Z"
spin_version = ">v2.0"
summary =  "Ollama api implementation using spin"
url = "https://github.com/BLaZeKiLL/Spin-O-Llama"
keywords = "rust, ollama, llm, ai"

---

This sample demonstrates how spin can be used to implement the [Ollama api](https://github.com/jmorganca/ollama/blob/main/docs/api.md), which when deployed can be used as any other Ollama instance. LLM orchestration frameworks like LangChain and semantic kernel can use this instance as a Ollama backend.

## Quick Start
- [Install spin](https://developer.fermyon.com/spin/v2/install)
- login to fermeyon cloud
    ```
    spin login
    ```
- clone this repository
    ```
    git clone https://github.com/BLaZeKiLL/Spin-O-Llama.git
    cd Spin-O-Llama
    ```
- build
    ```
    spin build
    ```
- deploy
    ```
    spin deploy
    ```

Routes implemented
- POST [/api/generate](https://github.com/jmorganca/ollama/blob/main/docs/api.md#generate-a-completion)

    supported request body
    ```json
    {
        "model": "<supported-model>",
        "prompt": "<input prompt>",
        "stream": false // streaming not supported, has no impact
        "options": { // options are optional
            "num_predict": 128,
            "temperature": 0.8,
            "top_p": 0.9,
            "repeat_penalty": 1.1
        } // default values provided above
    }
    ```

    response body
    ```json
    {
        "model": "<model-id>",
        "response": "<output>",
        "done": true
    }
    ```
- POST [/api/embeddings](https://github.com/jmorganca/ollama/blob/main/docs/api.md#generate-embeddings)

    supported request body
    ```json
    {
        "model": "<model-id>", // doesn't matter for now will always use all-minilm-l6-v2
        "prompt": "<input>"
    }
    ```

    response body
    ```json
    {
        "embedding": [<float array>]
    }
    ```

Model compatibility
- generate - llama2-chat, codellama-instruct
- embeddings - all-minilm-l6-v2