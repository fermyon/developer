title = "Sentiment Analysis With Serverless AI"
template = "spin_main"
date = "2023-09-05T09:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/ai-sentiment-analysis-api-tutorial.md"

---
- [Tutorial Prerequisites](#tutorial-prerequisites)
  - [Spin](#spin)
  - [Dependencies](#dependencies)
- [Licenses](#licenses)
- [Serverless AI Inferencing With Spin Applications](#serverless-ai-inferencing-with-spin-applications)
  - [Creating a New Spin Application](#creating-a-new-spin-application)
  - [Supported AI Models](#supported-ai-models)
  - [Model Optimization](#model-optimization)
  - [Application Structure](#application-structure)
  - [Application Configuration](#application-configuration)
  - [Source Code](#source-code)
  - [Additional Functionality](#additional-functionality)
  - [Static Fileserver Component For The UI](#static-fileserver-component-for-the-ui)
  - [Add the Front-End](#add-the-front-end)
  - [Key Value Explorer](#key-value-explorer)
  - [Application Manifest](#application-manifest)
  - [Building and Deploying Your Spin Application](#building-and-deploying-your-spin-application)
  - [Test Locally](#test-locally)
  - [Deploy to Fermyon Cloud](#deploy-to-fermyon-cloud)
  - [Testing in Fermyon Cloud](#testing-in-fermyon-cloud)
  - [Visit Fermyon Cloud UI](#visit-fermyon-cloud-ui)
- [Integrating Custom Domain and Storage](#integrating-custom-domain-and-storage)
- [Conclusion](#conclusion)
- [Next Steps](#next-steps)

Artificial Intelligence (AI) Inferencing performs well on GPUs. However, GPU infrastructure is both scarce and expensive. This tutorial will show you how to use Fermyon Serverless AI to quickly build advanced AI-enabled serverless applications that can run on Fermyon Cloud. Your applications will benefit from 50 millisecond cold start times and operate 100x faster than other on-demand AI infrastructure services. Take a quick look at the video below to learn about executing inferencing on LLMs with no extra setup.

<iframe width="854" height="480" src="https://www.youtube.com/embed/01oOh3D9cVQ?si=wORKmuOkeFMGYBsQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In this tutorial we will:

* Update Spin (and dependencies) on your local machine
* Create a Serverless AI application
* Learn about the Serverless AI SDK (in Rust, TypeScript and Python)

## Tutorial Prerequisites

### Spin 

You will need to [install the latest version of Spin](install#installing-spin). Serverless AI is supported on Spin versions 1.5 and above. 

If you already have Spin installed, [check what version you are on and upgrade](upgrade#are-you-on-the-latest-version) if required.

### Dependencies

The above installation script automatically installs the latest SDKs for Rust (which will enable us to write Serverless AI applications in Rust). However, some of the Serverless AI examples are written using TypeScript/Javascript and Python. To enable Serverless AI functionality via TypeScript/Javascript and Python, please ensure you have the latest TypeScript/JavaScript and Python template installed:

**TypeScript/Javascript**

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-js-sdk --upgrade
```

**Python**

Some of the Serverless AI examples are written using Python. To enable Serverless AI functionality via Python, please ensure you have the latest Python template installed:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-python-sdk --upgrade
```

## Licenses

> This tutorial uses [Meta AI](https://ai.meta.com/)'s Llama 2, Llama Chat and Code Llama models you will need to visit [Meta's Llama webpage](https://ai.meta.com/resources/models-and-libraries/llama-downloads/) and agree to Meta's License, Acceptable Use Policy, and to Meta’s privacy policy before fetching and using Llama models.

## Serverless AI Inferencing With Spin Applications 

Now, let's dive deep into a comprehensive tutorial and unlock your potential to use Fermyon Serverless AI.
**Note:** The full source code with other examples can be found in our [Github repo](https://github.com/fermyon/ai-examples/tree/main)

### Creating a New Spin Application

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

The Rust code snippets below are taken from the [Fermyon Serverless AI Examples](https://github.com/fermyon/ai-examples/tree/main/sentiment-analysis-rs)

> Note: please add `/api/...` when prompted for the path; this provides us with an API endpoint to query the sentiment analysis component.

<!-- @selectiveCpy -->

```bash
$ spin new http-rust
Enter a name for your new application: sentiment-analysis
Description: A sentiment analysis API that demonstrates using LLM inferencing and KV stores together
HTTP base: /
HTTP path: /api/...
```

{{ blockEnd }}

{{ startTab "TypeScript" }}

The TypeScript code snippets below are taken from the [Fermyon Serverless AI Examples](https://github.com/fermyon/ai-examples/tree/main/sentiment-analysis-ts)

> Note: please add `/api/...` when prompted for the path; this provides us with an API endpoint to query the sentiment analysis component.

<!-- @selectiveCpy -->

```bash
$ spin new http-ts
Enter a name for your new application: sentiment-analysis
Description: A sentiment analysis API that demonstrates using LLM inferencing and KV stores together
HTTP base: /
HTTP path: /api/...
```

{{ blockEnd }}

{{ startTab "Python" }}

The Python code snippets below are taken from the [Fermyon Serverless AI Examples](https://github.com/fermyon/ai-examples/tree/main/sentiment-analysis-py)

> Note: please add `/api/...` when prompted for the path; this provides us with an API endpoint to query the sentiment analysis component.
<!-- @selectiveCpy -->

```bash
$ spin new http-py
Enter a name for your new application: sentiment-analysis
Description: A sentiment analysis API that demonstrates using LLM inferencing and KV stores together
HTTP base: /
HTTP path: /api/...
```

{{ blockEnd }}

{{ blockEnd }}

### Supported AI Models

Fermyon's Spin and Serverless AI currently support:
- Meta's open source Large Language Models (LLMs) [Llama](https://ai.meta.com/llama/), specifically the `llama2-chat` and `codellama-instruct` models (see Meta [Licenses](#licenses) section above).
- SentenceTransformers' [embeddings](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) models, specifically the `all-minilm-l6-v2` model.

### Model Optimization

The models need to be in a particular format for Spin to be able to use them (quantized, which is a form of optimization). The official download links for the models (in non-quantized format) are listed in the previous section. However, for your convenience, the code examples below fetch models which are already in the special quantized format.

### Application Structure

Next, we need to create the appropriate folder structure from within the application directory (alongside our `spin.toml` file). The code below demonstrates the variations in folder structure depending on which model is being used. Once the folder structure is in place, we then fetch the pre-trained AI model for our application:

**llama2-chat example download**

> Ensure you have read the Meta [Licenses](#licenses) section before continuing to use Llama models.

<!-- @selectiveCpy -->

```bash
# llama2-chat
$ mkdir -p .spin/ai-models
$ cd .spin/ai-models
$ wget https://huggingface.co/TheBloke/Llama-2-13B-chat-GGML/resolve/a17885f653039bd07ed0f8ff4ecc373abf5425fd/llama-2-13b-chat.ggmlv3.q3_K_L.bin
$ mv llama-2-13b-chat.ggmlv3.q3_K_L.bin llama2-chat
```

<!-- @nocpy -->

```bash
tree .spin
.spin
└── ai-models
    └── llama2-chat
```

**codellama-instruct example download**

> Ensure you have read the Meta [Licenses](#licenses) section before continuing to use Llama models.

<!-- @selectiveCpy -->

```bash
# codellama-instruct
$ mkdir -p .spin/ai-models
$ cd .spin/ai-models
$ wget https://huggingface.co/TheBloke/CodeLlama-13B-Instruct-GGML/resolve/b3dc9d8df8b4143ee18407169f09bc12c0ae09ef/codellama-13b-instruct.ggmlv3.Q3_K_L.bin
$ mv codellama-13b-instruct.ggmlv3.Q3_K_L.bin codellama-instruct
```

<!-- @nocpy -->

```bash
tree .spin
.spin
└── ai-models
    └── codellama-instruct
```

**all-minilm-l6-v2 example download**

The following section fetches a specific version of the [sentence-transformers](https://www.sbert.net/index.html#) model:

<!-- @selectiveCpy -->

```bash
$ mkdir -p .spin/ai-models/all-minilm-l6-v2
$ cd .spin/ai-models/all-minilm-l6-v2
$ wget https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/7dbbc90392e2f80f3d3c277d6e90027e55de9125/tokenizer.json
$ wget https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/resolve/0b6dc4ef7c29dba0d2e99a5db0c855c3102310d8/model.safetensors
```

<!-- @nocpy -->

```bash
tree .spin
.spin
└── ai-models
    └── all-minilm-l6-v2
        ├── model.safetensors
        └── tokenizer.json
```

> Note: Rather than be limited to a 1:1 relationship between a Spin applications and a downloaded model, if you would like more than just one Spin application to access a specific model (that you have already downloaded) you can create an arbitrary directory (i.e. `~/my-ai-models/`) to house your models, and then create a symbolic link to a specific Spin application (i.e. `~/application-one/.spin/ai-models`):

<!-- @nocpy -->

```bash
ln -s ~/my-ai-models/ ~/application-one/.spin/ai-models
```

### Application Configuration

Then, we configure the `[[component]]` section of our application's manifest (the `spin.toml` file); explicitly naming our model of choice. For example, in the case of the sentiment analysis application, we specify the `llama2-chat` value for our `ai_models` configuration:

```toml
ai_models = ["llama2-chat"]
key_value_stores = ["default"]
```

Note the positioning, of the `ai_models` configuration, shown below:

```toml
[[component]]
id = "sentiment-analysis"
source = "target/spin-http-js.wasm"
exclude_files = ["**/node_modules"]
key_value_stores = ["default"]
ai_models = ["llama2-chat"]
[component.trigger]
route = "/api/..."
[component.build]
command = "npm run build"
watch = ["src/**/*", "package.json", "package-lock.json"]
```

### Source Code

Now let's use the Spin SDK to access the model from our app:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

The Rust source code for this sentiment analysis example uses serde. There are a couple of ways to add the required serde dependencies:
- Run `cargo add serde -F derive` and `cargo add serde_json` from your Rust application's home directory (which will automatically update your application's `Cargo.toml` file), or
- Manually, edit your Rust application's `Cargo.toml` file by adding the following lines beneath the `Cargo.toml` file's `[dependencies]` section:

```toml
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0.85"
```

Once you have added serde, as explained above, modify your `src/lib.rs` file to match the following content:

```rust
use std::str::FromStr;

use anyhow::Result;
use spin_sdk::{
    http::{Params, Request, Response, Router},
    http_component,
    key_value::Store,
    llm::{infer_with_options, InferencingModel::Llama2Chat},
};

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct SentimentAnalysisRequest {
    pub sentence: String,
}

#[derive(Serialize)]
pub struct SentimentAnalysisResponse {
    pub sentiment: String,
}

const PROMPT: &str = r#"\
<<SYS>>
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.
<</SYS>>
<INST>
Follow the pattern of the following examples:

User: Hi, my name is Bob
Bot: neutral

User: I am so happy today
Bot: positive

User: I am so sad today
Bot: negative
</INST>

User: {SENTENCE}
"#;

/// A Spin HTTP component that internally routes requests.
#[http_component]
fn handle_route(req: Request) -> Result<Response> {
    let mut router = Router::new();
    router.post("/api/sentiment-analysis", perform_sentiment_analysis);
    router.any("/api/*", not_found);
    router.handle(req)
}

fn not_found(_: Request, _: Params) -> Result<Response> {
    Ok(http::Response::builder()
        .status(404)
        .body(Some("Not found".into()))?)
}

fn perform_sentiment_analysis(req: Request, _params: Params) -> Result<Response> {
    let request = body_json_to_map(&req)?;
    // Do some basic clean up on the input
    let sentence = request.sentence.trim();
    println!("Performing sentiment analysis on: {}", sentence);

    // Prepare the KV store
    let kv = Store::open_default()?;

    // If the sentiment of the sentence is already in the KV store, return it
    if kv.exists(sentence).unwrap_or(false) {
        println!("Found sentence in KV store returning cached sentiment");
        let sentiment = kv.get(sentence)?;
        let resp = SentimentAnalysisResponse {
            sentiment: String::from_utf8(sentiment)?,
        };
        let resp_str = serde_json::to_string(&resp)?;

        return send_ok_response(200, resp_str)
    }
    println!("Sentence not found in KV store");

    // Otherwise, perform sentiment analysis
    println!("Running inference");
    let inferencing_result = infer_with_options(
        Llama2Chat,
        &PROMPT.replace("{SENTENCE}", sentence),
        spin_sdk::llm::InferencingParams {
            max_tokens: 6,
            ..Default::default()
        },
    )?;
    println!("Inference result {:?}", inferencing_result);
    let sentiment = inferencing_result
        .text
        .lines()
        .next()
        .unwrap_or_default()
        .strip_prefix("Bot:")
        .unwrap_or_default()
        .parse::<Sentiment>();
    println!("Got sentiment: {sentiment:?}");

    if let Ok(sentiment) = sentiment {
        println!("Caching sentiment in KV store");
        let _ = kv.set(sentence, sentiment);
    }
    // Cache the result in the KV store
    let resp = SentimentAnalysisResponse {
        sentiment: sentiment
            .as_ref()
            .map(ToString::to_string)
            .unwrap_or_default(),
    };

    let resp_str = serde_json::to_string(&resp)?;
    send_ok_response(200, resp_str)
}

fn send_ok_response(code: u16, resp_str: String) -> Result<Response> {
    Ok(http::Response::builder()
    .status(code)
    .body(Some(resp_str.into()))?)
}

fn body_json_to_map(req: &Request) -> Result<SentimentAnalysisRequest> {
    let body = match req.body().as_ref() {
        Some(bytes) => bytes,
        None => anyhow::bail!("Request body was unexpectedly empty"),
    };

    Ok(serde_json::from_slice(&body)?)
}

#[derive(Copy, Clone, Debug)]
enum Sentiment {
    Positive,
    Negative,
    Neutral,
}

impl Sentiment {
    fn as_str(&self) -> &str {
        match self {
            Self::Positive => "positive",
            Self::Negative => "negative",
            Self::Neutral => "neutral",
        }
    }
}

impl std::fmt::Display for Sentiment {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(self.as_str())
    }
}

impl AsRef<[u8]> for Sentiment {
    fn as_ref(&self) -> &[u8] {
        self.as_str().as_bytes()
    }
}

impl FromStr for Sentiment {
    type Err = String;

    fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
        let sentiment = match s.trim() {
            "positive" => Self::Positive,
            "negative" => Self::Negative,
            "neutral" => Self::Neutral,
            _ => return Err(s.into()),
        };
        Ok(sentiment)
    }
}
```

{{ blockEnd }}

{{ startTab "TypeScript"}}

```typescript
import {
  HandleRequest,
  HttpRequest,
  HttpResponse,
  Llm,
  InferencingModels,
  InferencingOptions,
  Router,
  Kv,
} from "@fermyon/spin-sdk";

interface SentimentAnalysisRequest {
  sentence: string;
}

interface SentimentAnalysisResponse {
  sentiment: "negative" | "neutral" | "positive";
}

const decoder = new TextDecoder();

const PROMPT = `\
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.

Hi, my name is Bob
neutral

I am so happy today
positive

I am so sad today
negative

<SENTENCE>
`;

async function performSentimentAnalysis(request: HttpRequest) {
  // Parse sentence out of request
  let data = request.json() as SentimentAnalysisRequest;
  let sentence = data.sentence;
  console.log("Performing sentiment analysis on: " + sentence);

  // Prepare the KV store
  let kv = Kv.openDefault();

  // If the sentiment of the sentence is already in the KV store, return it
  if (kv.exists(sentence)) {
    console.log("Found sentence in KV store returning cached sentiment");
    return {
      status: 200,
      body: JSON.stringify({
        sentiment: decoder.decode(kv.get(sentence)),
      } as SentimentAnalysisResponse),
    };
  }
  console.log("Sentence not found in KV store");

  // Otherwise, perform sentiment analysis
  console.log("Running inference");
  let options: InferencingOptions = { max_tokens: 10, temperature: 0.5 };
  let inferenceResult = Llm.infer(
    InferencingModels.Llama2Chat,
    PROMPT.replace("<SENTENCE>", sentence),
    options
  );
  console.log(
    `Inference result (${inferenceResult.usage.generatedTokenCount} tokens): ${inferenceResult.text}`
  );
  let sentiment = inferenceResult.text.split(/\s+/)[0]?.trim();

  // Clean up result from inference
  if (
    sentiment === undefined ||
    !["negative", "neutral", "positive"].includes(sentiment)
  ) {
    sentiment = "neutral";
    console.log("Invalid sentiment, marking it as neutral");
  }

  // Cache the result in the KV store
  console.log("Caching sentiment in KV store");
  kv.set(sentence, sentiment);

  return {
    status: 200,
    body: JSON.stringify({
      sentiment,
    } as SentimentAnalysisResponse),
  };
}

let router = Router();

// Map the route to the handler
router.post("/api/sentiment-analysis", async (_, req) => {
  console.log(`${new Date().toISOString()} POST /sentiment-analysis`);
  return await performSentimentAnalysis(req);
});

// Catch all 404 handler
router.all("/api/*", async (_, req) => {
  return {
    status: 404,
    body: "Not found",
  };
});

// Entry point to the Spin handler
export const handleRequest: HandleRequest = async function (
  request: HttpRequest
): Promise<HttpResponse> {
  return await router.handleRequest(request, request);
};
```

{{ blockEnd }}

{{ startTab "Python"}}

```python
from spin_http import Response
from spin_llm import llm_infer
import json
import re

PROMPT="""<<SYS>>
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.
<</SYS>>
[INST]
Follow the pattern of the following examples:
User: Hi, my name is Bob
Bot: neutral
User: I am so happy today
Bot: positive
User: I am so sad today
Bot: negative
[/INST]
User: """

def handle_request(request):
    request_body=json.loads(request.body)
    sentence=request_body["sentence"].strip()
    result=llm_infer("llama2-chat", PROMPT+sentence)
    response_body=json.dumps({"sentence": re.sub("\\nBot\: ", "", result.text)})
    return Response(200,
                    {"content-type": "application/json"},
                    bytes(response_body, "utf-8"))
```

{{ blockEnd }}

{{ blockEnd }}

### Additional Functionality

This application also includes two more components, a key/value explorer and static-fileserver component. Let's quickly go ahead and create those (letting Spin do all of the scaffolding for us).

### Static Fileserver Component For The UI

We use the `spin add` command to add the new `static-fileserver` that we will name `ui`:

<!-- @selectiveCpy -->

```bash
$ spin add static-fileserver
Enter a name for your new component: ui
HTTP path: /...
Directory containing the files to serve: assets

```

We create an `assets` directory where we can store files to serve statically (see the `spin.toml` file for more configuration information):

<!-- @selectiveCpy -->

```bash
$ mkdir assets
```

### Add the Front-End 

We can add a webpage that asks the user for some text and does the sentiment analysis on it. In your assets folder, create two files `dynamic.js` and `index.html`. 

Here's the code snippet for `index.html`

```html
<!DOCTYPE html>
<html data-theme="cupcake">
  <head>
    <title>Sentiment Analyzer</title>
    <meta name="description" content="Perform sentiment analysis" />

    <!-- Tailwind and Daisy UI -->
    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@3.2.1/dist/full.css"
      rel="stylesheet"
      type="text/css"
    />
    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>

    <!-- Import script to make page dynamic -->
    <script src="dynamic.js"></script>
  </head>

  <body class="bg-base-200">
    <div id="alert" class="fixed top-20 inset-x-0 w-1/2 mx-auto"></div>
    <div class="flex flex-col min-h-screen">
      <div
        class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-md"
      >
        <nav class="navbar w-full">
          <div class="flex-1">
            <a href="/" class="btn btn-ghost text-4xl font-bold"
              >Sentiment Analyzer</a
            >
          </div>
          <div class="flex-none">
            <a href="" class="btn btn-warning">Restart</a>
          </div>
        </nav>
      </div>
      <main class="mx-auto my-10 prose">
        <p>
          This Sentiment Analyzer is a demonstration of how you can use Fermyon
          Serverless AI to easily make an AI-powered API. When you type in a
          sentence it is sent to a Spin app running in the Fermyon Cloud,
          inferencing is performed using the Fermyon serverless AI feature, and
          the response is cached in a Fermyon key/value store.
        </p>
        <p>
          Note that LLM's are not perfect and the sentiment analysis performed
          by this application is not guaranteed to be perfect.
        </p>
        <p>
          To get started type a sentence below and press
          <kbd class="kbd kbd-sm">enter</kbd>.
        </p>

        <div class="flex flex-col gap-8 w-full">
          <input
            id="sentence-input"
            type="text"
            placeholder="Type the sentence you want to analyze here"
            class="input w-full"
          />
          <div>
            <button class="btn btn-primary" onclick="newCard()">Analyze</button>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>
```

Here's the code snippet for `dynamic.js` 

```javascript
// Listen for the Enter key being pressed
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    newCard();
  }
});

var globalCardCount = 0;
var runningInference = false;

function newCard() {
  if (runningInference) {
    console.log("Already running inference, please wait...");
    setAlert("Already running inference, please wait...");
    return;
  }
  var inputElement = document.getElementById("sentence-input");
  var sentence = inputElement.value;
  if (sentence === "") {
    console.log("Please enter a sentence to analyze");
    setAlert("Please enter a sentence to analyze");
    return;
  }
  inputElement.value = "";

  var cardIndex = globalCardCount;
  globalCardCount++;
  var newCard = document.createElement("div");
  newCard.id = "card-" + cardIndex;
  newCard.innerHTML = `
    <div class="card bg-base-100 shadow-xl w-full">
        <div class="m-4 flex flex-col gap-2">
            <div>${sentence}</div>
            <div class="flex flex-row justify-end">
                <span class="loading loading-dots loading-sm"></span>
            </div>
        </div>
    </div>
    `;
  document.getElementById("sentence-input").before(newCard);

  console.log("Running inference on sentence: " + sentence);
  runningInference = true;
  fetch("/api/sentiment-analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentence: sentence }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateCard(cardIndex, sentence, data.sentiment);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateCard(cardIndex, sentence, sentiment) {
  badge = "";
  if (sentiment === "positive") {
    badge = `<span class="badge badge-success">Positive</span>`;
  } else if (sentiment === "negative") {
    badge = `<span class="badge badge-error">Negative</span>`;
  } else if (sentiment === "neutral") {
    badge = `<span class="badge badge-ghost">Neutral</span>`;
  } else {
    badge = `<span class="badge badge-ghost">Unsure</span>`;
  }
  var cardElement = document.getElementById("card-" + cardIndex);
  cardElement.innerHTML = `
    <div class="card bg-base-100 shadow-xl w-full">
        <div class="m-4 flex flex-col gap-2">
            <div>${sentence}</div>
            <div class="flex flex-row justify-end">
                ${badge}
            </div>
        </div>
    </div>
    `;
  runningInference = false;
}

function setAlert(msg) {
  var alertElement = document.getElementById("alert");
  alertElement.innerHTML = `
    <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="text-error-content">${msg}</span>
    </div>
    `;
  setTimeout(function () {
    alertElement.innerHTML = "";
  }, 3000);
}
```

### Key Value Explorer

For this, we install use a pre-made template by pointing to the templates GitHub repository:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/radu-matei/spin-kv-explorer
```

Then, we again use `spin add` to add the new component. We will name the component  `kv-explorer`):

<!-- @selectiveCpy -->

```bash
$ spin add kv-explorer --accept-defaults
Enter a name for your new application: kv-explorer
```

We create an `assets` directory where we can store files to serve statically (see the `spin.toml` file for more configuration information):

<!-- @selectiveCpy -->

```bash
$ mkdir assets
```

### Application Manifest

As shown below, the Spin framework has done all of the scaffolding for us:

<!-- @nocpy -->

```toml
spin_manifest_version = "1"
authors = ["Your Name<your-name@example.com>"]
description = "A sentiment analysis API that demonstrates using LLM inference and KV stores together"
name = "sentiment-analysis"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "sentiment-analysis"
source = "target/sentiment-analysis.wasm"
exclude_files = ["**/node_modules"]
ai_models = ["llama2-chat"]
key_value_stores = ["default"]
[component.trigger]
route = "/api/..."
[component.build]
command = "npm run build"

[[component]]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.3/spin_static_fs.wasm", digest = "sha256:38bf971900228222f7f6b2ccee5051f399adca58d71692cdfdea98997965fd0d" }
id = "ui"
files = [ { source = "assets", destination = "/" } ]
[component.trigger]
route = "/..."

[[component]]
source = { url = "https://github.com/radu-matei/spin-kv-explorer/releases/download/v0.9.0/spin-kv-explorer.wasm", digest = "sha256:07f5f0b8514c14ae5830af0f21674fd28befee33cd7ca58bc0a68103829f2f9c" }
id = "kv-explorer"
# add or remove stores you want to explore here
key_value_stores = ["default"]
[component.trigger]
route = "/internal/kv-explorer/..."
```

### Building and Deploying Your Spin Application

**Note:** Running inferencing on localhost (your CPU) is not as optimal as deploying to Fermyon's Serverless AI (where inferencing is performed by high-powered GPUs). You can skip this `spin build --up` step and move straight to `spin cloud deploy` if you:

- a) are using one of the 3 supported models above,
- b) have configured your `spin.toml` file to explicitly configure the model (as shown above)

Now, let's build and run our Spin Application locally. (**Note:** If you are following along with the TypeScript/JavaScript example, you will first need to run `npm install`. Otherwise, please continue to the following `spin` command.)

<!-- @selectiveCpy -->

```bash
$ spin build --up
```

### Test Locally

<!-- @selectiveCpy -->

```bash
# Create a new POST request to localhost
$ curl -vXPOST 'localhost:3000/api/sentiment-analysis' -H'Content-Type: application/json' -d "{\"sentence\": \"Well this is very nice indeed\" }"

{"sentiment":"positive"}
```

### Deploy to Fermyon Cloud

Deploying to the Fermyon Cloud is one simple command. If you have not logged into your Fermyon Cloud account already, the CLI will prompt you to login. Follow the instructions to complete the authorization process.  

<!-- @selectiveCpy -->

```bash
$ spin cloud deploy
```

### Testing in Fermyon Cloud

<!-- @selectiveCpy -->

```bash
# Create a new POST request to your apps URL in Fermyon Cloud
$ curl -vXPOST 'https://abcxyz.fermyon.app/api/sentiment-analysis' -H'Content-Type: application/json' -d "{\"sentence\": \"Well this is very nice indeed\" }"

{"sentiment":"positive"}
```

### Visit Fermyon Cloud UI

Visiting your apps URL will produce a User Interface (UI) similar to the following.

![sentiment analysis ui blank](/static/image/docs/sentiment-analysis-ui-blank.png)

You can type in a sentence, and the UI will respond with the sentiment analysis.

![sentiment analysis ui positive](/static/image/docs/sentiment-analysis-ui-positive.png)

## Integrating Custom Domain and Storage

The groundbreaking Fermyon Serverless AI introduces a revolutionary addition to the full-stack developer's arsenal. You can now seamlessly integrate the Fermyon [SQLite Database](https://www.fermyon.com/blog/announcing-noops-sql-db), [Key-Value Storage](https://www.fermyon.com/blog/introducing-fermyon-cloud-key-value-store), and even your [Fermyon Cloud Custom Domains](https://www.fermyon.com/blog/announcing-custom-domains) with the launch of your very own advanced AI-enabled serverless applications.

## Conclusion

We want to get feedback on the Serverless AI API. We are curious about what models you would like to use and what applications you are building using Serverless AI. Let us know what you need, and how Fermyon's Serverless AI could potentially help solve a problem for you. We would love to help you write your new Serverless AI application.

## Next Steps

- Try the numerous Serverless AI examples in our GitHub repository called [ai-examples](https://github.com/fermyon/ai-examples).
- [Contribute](/hub/contributing) your Serverless AI app to our [Spin Up Hub](/hub).
- Ask questions and share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf).
