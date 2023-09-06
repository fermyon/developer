title = "Serverless AI Tutorial"
template = "spin_main"
date = "2023-09-05T09:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/serverless-ai-tutorial.md"

---
- [Tutorial Prerequisites](#tutorial-prerequisites)
  - [Spin](#spin)
  - [Dependencies](#dependencies)
- [Serverless AI Inferencing With Spin Applications](#serverless-ai-inferencing-with-spin-applications)
  - [Creating a New Spin Application](#creating-a-new-spin-application)
  - [Fetch AI Model](#fetch-ai-model)
  - [Application Configuration](#application-configuration)
  - [Source Code](#source-code)
  - [Additional Functionality](#additional-functionality)
  - [Static Fileserver Component For The UI](#static-fileserver-component-for-the-ui)
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

AI Inferencing performs well on GPUs. However, GPU infrastructure is both scarce and expensive. This tutorial will show you how to use Fermyon Serverless AI to quickly build advanced AI-enabled serverless applications that can run on Fermyon Cloud. Your applications will benefit from 50 millisecond cold start times and operate 100x faster than other on-demand AI infrastructure services. Take a quick look at the video below, and make sure you sign up here to be one of the first to access the Fermyon [Serverless AI private beta](https://developer.fermyon.com/cloud/serverless-ai).

<iframe width="854" height="480" src="https://www.youtube.com/embed/01oOh3D9cVQ?si=wORKmuOkeFMGYBsQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In this tutorial we will:

* Update Spin (and dependencies) on your local machine
* Create a Serverless AI application
* Learn about the Serverless AI SDK (in Rust and TypeScript)

## Tutorial Prerequisites

### Spin 

You will need the `canary` version of Spin, the easiest way to do that is via Spin's installation script (passing in the `-v` option):

<!-- @selectiveCpy -->

```bash
$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v canary
```

> Once you have run the installer script, adding the `spin` file to a folder already in your `$PATH` system variable is highly recommended, i.e. `sudo mv spin /usr/local/bin/`.

### Dependencies

The above installation script automatically installs the latest SDKs for Rust (which will enable us to write Serverless AI applications in Rust). However, some of the Serverless AI examples are written using TypeScript/Javascript. To enable Serverless AI functionality via TypeScript/Javascript, you will need to upgrade the TypeScript SDK as follows:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-js-sdk --upgrade
```

## Serverless AI Inferencing With Spin Applications 

Now, let's dive deep into a comprehensive tutorial and unlock your potential to use Fermyon Serverless AI.

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
$ spin new http-js
Enter a name for your new application: sentiment-analysis
Description: A sentiment analysis API that demonstrates using LLM inferencing and KV stores together
HTTP base: /
HTTP path: /api/...
```

{{ blockEnd }}
{{ blockEnd }}

### Fetch AI Model

Next, we create a folder and fetch a pre-trained AI model for our application:

> Please note: this step can take a few minutes.

<!-- @selectiveCpy -->

```bash
$ cd sentiment-analysis
$ mkdir -p .spin/ai-models
$ wget https://huggingface.co/TheBloke/Llama-2-13B-chat-GGML/resolve/main/llama-2-13b-chat.ggmlv3.q3_K_L.bin
$ mv llama-2-13b-chat.ggmlv3.q3_K_L.bin .spin/ai-models/llama2-chat
```

### Application Configuration

Place the following lines into the application's manifest (the `spin.toml` file) within the `[[component]]` section:

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

<!-- @selectiveCpy -->

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

<!-- @selectiveCpy -->

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

{{ blockEnd }}

### Additional Functionality

This application also includes two more components, a key/value explorer and static-fileserver component. Let's quickly go ahead and create those (letting Spin do all of the scaffolding for us).

### Static Fileserver Component For The UI

We use the `spin add` command to add the new `static-fileserver` that we will name `ui`:

<!-- @selectiveCpy -->

```bash
$ spin add static-fileserver
Enter a name for your new component: ui
HTTP path: /static/...
Directory containing the files to serve: assets
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
mkdir assets
```

### Application Manifest

As shown below, the Spin framework has done all of the scaffolding for us:

```toml
spin_manifest_version = "1"
authors = ["tpmccallum <tim.mccallum@fermyon.com>"]
description = "A sentiment analysis API that demonstrates using LLM inference and KV stores together"
name = "sentiment-analysis"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[[component]]
id = "sentiment-analysis"
source = "target/sentiment-analysis.wasm"
exclude_files = ["**/node_modules"]
[component.trigger]
route = "/api/..."
[component.build]
command = "npm run build"

[[component]]
source = { url = "https://github.com/fermyon/spin-fileserver/releases/download/v0.0.3/spin_static_fs.wasm", digest = "sha256:38bf971900228222f7f6b2ccee5051f399adca58d71692cdfdea98997965fd0d" }
id = "ui"
files = [ { source = "assets", destination = "/" } ]
[component.trigger]
route = "/static/..."

[[component]]
source = { url = "https://github.com/radu-matei/spin-kv-explorer/releases/download/v0.9.0/spin-kv-explorer.wasm", digest = "sha256:07f5f0b8514c14ae5830af0f21674fd28befee33cd7ca58bc0a68103829f2f9c" }
id = "kv-explorer"
# add or remove stores you want to explore here
key_value_stores = ["default"]
[component.trigger]
route = "/internal/kv-explorer/..."
```

### Building and Deploying Your Spin Application

Now let's build and deploy our Spin Application locally. Run the following command to build your application: 

<!-- @selectiveCpy -->

```bash
$ npm install
$ spin build --up
```

### Test Locally

```bash
# Create a new POST request to localhost
$ curl -vXPOST 'localhost:3000/api/sentiment-analysis' -H'Content-Type: application/json' -d "{\"sentence\": \"Well this is very nice indeed\" }"

{"sentiment":"positive"}
```

### Deploy to Fermyon Cloud

To deploy your Serverless AI to Fermyon Cloud, you will first need to sign up for Fermyon's [Serverless AI private beta](https://developer.fermyon.com/cloud/serverless-ai).

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

The groundbreaking Fermyon Serverless AI introduces a revolutionary addition to the full-stack developer's arsenal. You can now seamlessly integrate the Fermyon [NoOps SQL Database](https://www.fermyon.com/blog/announcing-noops-sql-db), [Key-Value Storage](https://www.fermyon.com/blog/introducing-fermyon-cloud-key-value-store), and even your [Fermyon Cloud Custom Domains](https://www.fermyon.com/blog/announcing-custom-domains) with the launch of your very own advanced AI-enabled serverless applications.

## Conclusion

We want to get feedback on the Serverless AI API. We are curious about what models you would like to use and what applications you are building using Serverless AI. Let us know what you need, and how Fermyon's Serverless AI could potentially help solve a problem for you. We would love to help you write your new Serverless AI application.

## Next Steps

- Try the numerous Serverless AI examples in our GitHub repository called [ai-examples](https://github.com/fermyon/ai-examples).
- [Contribute](https://developer.fermyon.com/hub/contributing) your Serverless AI app to our [Spin Up Hub](https://developer.fermyon.com/hub).
- Ask questions and share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf).