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
- [Serverless AI Embedding With Spin Applications](#serverless-ai-embedding-with-spin-applications)
  - [Creating a New Spin Application](#creating-a-new-spin-application-1)
  - [Fetch AI Model](#fetch-ai-model-1)
  - [Application Configuration](#application-configuration-1)
  - [Source Code](#source-code-1)
  - [Building and Deploying Your Spin Application](#building-and-deploying-your-spin-application-1)
  - [TODO Deploy to Fermyon Cloud](#todo-deploy-to-fermyon-cloud)
  - [TODO Testing](#todo-testing)
- [Integrating Custom Domain and Storage](#integrating-custom-domain-and-storage)
- [Conclusion](#conclusion)
- [Next Steps](#next-steps)

AI Inferencing performs well on GPUs. However, GPU infrastructure is both scarce and expensive. This tutorial will show you how to use Fermyon Serverless AI to quickly build advanced AI-enabled serverless applications that can run on Fermyon Cloud. Your applications will benefit from 50 millisecond cold start times and operate 100x faster than other on-demand AI infrastructure services. Take a quick look at the video below, and make sure you sign up here to be one of the first to access the Fermyon [Serverless AI private beta](https://developer.fermyon.com/cloud/serverless-ai).

<iframe width="854" height="480" src="https://www.youtube.com/embed/01oOh3D9cVQ?si=wORKmuOkeFMGYBsQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

In this tutorial we will:

* Update Spin (and dependencies) on your local machine
* Create a Serverless AI application
* Learn about the Serverless AI SDK (in Rust, TypeScript and TinyGo)

## Tutorial Prerequisites

### Spin 

You will need the `canary` version of Spin, the easiest way to do that is via Spin's installation script (passing in the `-v` option):

<!-- @selectiveCpy -->

```bash
$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v canary
```

### Dependencies

The above installation script automatically installs the latest SDKs for Rust and TinyGo (which will enable us to write Serverless AI applications in Rust and TinyGo). However, some of the Serverless AI examples are written using TypeScript/Javascript. To enable Serverless AI functionality via TypeScript/Javascript, you will need to upgrade the TypeScript SDK as follows:

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

<!-- @selectiveCpy -->

```bash
$ spin new http-rust sentiment-analysis --accept-defaults

```

{{ blockEnd }}

{{ startTab "TypeScript" }}

The TypeScript code snippets below are taken from the [Fermyon Serverless AI Examples](https://github.com/fermyon/ai-examples/tree/main/sentiment-analysis-ts)

<!-- @selectiveCpy -->

```bash
$ spin new http-js
Enter a name for your new application: sentiment-analysis
Description: A sentiment analysis API that demonstrates using LLM inferencing and KV stores together
HTTP base: /
HTTP path: /...
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

The TinyGo code snippets below are taken from the [Fermyon Serverless AI Examples](https://github.com/fermyon/ai-examples/tree/main/sentiment-analysis-go)

<!-- @selectiveCpy -->

```bash
$ spin new http-go sentiment-analysis --accept-defaults

```

{{ blockEnd }}
{{ blockEnd }}

### Fetch AI Model

Next, we create a folder and fetch a pre-trained AI model for our application:

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

<!-- @nocpy -->

```rust
use anyhow::Result;
use spin_sdk::{
    http::{Params, Request, Response, Router},
    http_component,
    key_value::Store,
    llm::{infer, InferencingModel::Llama2Chat},
};

use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Default, Deserialize, Serialize)]
pub struct SentimentAnalysisRequest {
    pub sentence: String,
}

#[derive(Serialize)]
pub struct SentimentAnalysisResponse {
    pub sentiment: String,
}

const PROMPT: &str = r#"\
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.

Hi, my name is Bob
neutral

I am so happy today
positive

I am so sad today
negative

<SENTENCE>
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

fn perform_sentiment_analysis(req: Request, _: Params) -> Result<Response> {
    let request = body_json_to_map(&req).unwrap();
    println!("Performing sentiment analysis on: {}", &request.sentence);

    // Prepare the KV store
    let kv = Store::open_default()?;

    // If the sentiment of the sentence is already in the KV store, return it
    if kv.exists(&request.sentence).unwrap_or(false) {
        println!("Found sentence in KV store returning cached sentiment");
        let sentiment = kv.get(&request.sentence).unwrap();
        let resp = SentimentAnalysisResponse {
            sentiment: std::str::from_utf8(&sentiment).unwrap().to_string(),
        };
        let resp_str = serde_json::to_string(&resp).unwrap();

        return Ok(http::Response::builder()
            .status(200)
            .body(Some(resp_str.into()))?);
    }
    println!("Sentence not found in KV store");

    // Otherwise, perform sentiment analysis
    println!("Running inference");
    let inferencing_result = infer(
        Llama2Chat,
        &PROMPT.clone().replace("<SENTENCE>", &request.sentence),
    )
    .unwrap();
    println!("Inference result {:?}", inferencing_result);
    let sentiment = inferencing_result
        .text
        .split("\n")
        .next()
        .unwrap_or_default();

    // Cache the result in the KV store
    println!("Caching sentiment in KV store");
    kv.set(&request.sentence, sentiment.clone()).unwrap();

    let resp = SentimentAnalysisResponse {
        sentiment: sentiment.to_string(),
    };

    let resp_str = serde_json::to_string(&resp).unwrap();
    Ok(http::Response::builder()
        .status(200)
        .body(Some(resp_str.into()))?)
}

fn body_json_to_map(req: &Request) -> Result<SentimentAnalysisRequest> {
    let body = match req.body().as_ref() {
        Some(bytes) => bytes.slice(..),
        None => bytes::Bytes::default(),
    };

    Ok(serde_json::from_slice::<SentimentAnalysisRequest>(&body)?)
}

```

{{ blockEnd }}

{{ startTab "TypeScript"}}

<!-- @nocpy -->

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

{{ startTab "TinyGo"}}

<!-- @selectiveCpy -->

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	spinhttp "github.com/fermyon/spin/sdk/go/http"
	"github.com/fermyon/spin/sdk/go/key_value"
	"github.com/fermyon/spin/sdk/go/llm"
)

type sentimentAnalysisRequest struct {
	Sentence string
}

type sentimentAnalysisResponse struct {
	Sentiment string
}

const prompt = `\
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.

Hi, my name is Bob
neutral

I am so happy today
positive

I am so sad today
negative

<SENTENCE>
`

func init() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
		router := spinhttp.NewRouter()
		router.POST("/sentiment-analysis", performSentimentAnalysis)
		router.ServeHTTP(w, r)
	})
}

func performSentimentAnalysis(w http.ResponseWriter, r *http.Request, ps spinhttp.Params) {
	var req sentimentAnalysisRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Printf("Performing sentiment analysis on: %q\n", req.Sentence)

	// Open the KV store
	store, err := key_value.Open("default")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer key_value.Close(store)

	// If the sentiment of the sentence is already in the KV store, return it
	exists, err := key_value.Exists(store, req.Sentence)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if exists {
		fmt.Println("Found sentence in KV store returning cached sentiment")
		value, err := key_value.Get(store, req.Sentence)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		res := sentimentAnalysisResponse{
			Sentiment: string(value),
		}
		if err := json.NewEncoder(w).Encode(res); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		return
	}
	fmt.Println("Sentence not found in KV store")

	// Otherwise, perform sentiment analysis
	fmt.Println("Running inference")
	params := &llm.InferencingParams{
		MaxTokens:   10,
		Temperature: 0.5,
	}

	result, err := llm.Infer("llama2-chat", strings.Replace(prompt, "<SENTENCE>", req.Sentence, 1), params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Printf("Inference result (%d tokens): %s\n", result.Usage.GeneratedTokenCount, result.Text)

	var sentiment string
	if fields := strings.Fields(result.Text); len(fields) > 0 {
		sentiment = fields[0]
	}

	// Cache the result in the KV store
	fmt.Println("Caching sentiment in KV store")
	key_value.Set(store, req.Sentence, []byte(sentiment))

	res := &sentimentAnalysisResponse{
		Sentiment: sentiment,
	}
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func main() {}

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
route = "/..."
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

## Serverless AI Embedding With Spin Applications 

Now let's build an application using Fermyon Serverless AI embeddings, which are stored and retrieved from a Vector Database (backed by a [NoOps SQL Database](https://www.fermyon.com/blog/announcing-noops-sql-db)). 

### Creating a New Spin Application

Please make sure you've installed the correct version of Spin, the respective plugins, and templates outlined in previous sections. 

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

<!-- @selectiveCpy -->

```bash
$ spin new 

```

{{ blockEnd }}

{{ startTab "TypeScript" }}

<!-- @selectiveCpy -->

```bash
$ spin new http-js
Enter a name for your new application: embedding-component
Description: A simple component that stores embeddings in a vector DB
HTTP base: /
HTTP path: /...
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

<!-- @selectiveCpy -->

```bash
$ spin new http-go embedding-component --accept-defaults

```

{{ blockEnd }}
{{ blockEnd }}

### Fetch AI Model

Next, we create a folder and fetch a pre-trained AI model for our application:

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
allowed_http_hosts = [ "https://api.embaas.io" ]
sqlite_databases = ["default"]
```

Note the positioning, of the `ai_models` configuration, shown below:

```toml
[[component]]
id = "embeddings"
source = "embeddings/target/wasm32-wasi/release/embeddings.wasm"
allowed_http_hosts = [ "https://api.embaas.io" ]
sqlite_databases = ["default"]
[component.trigger]
route = "/embeddings/..."
[component.build]
command = "cargo build --target wasm32-wasi --release"
workdir = "embeddings"
watch = ["src/**/*.rs", "Cargo.toml"]
```

### Source Code

Now let's use the Spin SDK to access the model from our app:

```rust
use anyhow::{Context, Result};
use env_logger;
use log::info;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use spin_sdk::{
    http::{Params, Request, Response},
    http_component, http_router,
    sqlite::{self, Connection, ValueResult},
};

// A simple Spin HTTP component.
#[http_component]
fn handle_embeddings(req: Request) -> Result<Response> {
    env_logger::builder()
        .filter_level(log::LevelFilter::Trace)
        .init();

    info!(
        "Received {} request at {}",
        req.method().to_string(),
        req.uri().to_string()
    );

    let router = http_router! {
        GET "/embeddings" => get_embeddings,
        POST "/embeddings" => create_embeddings,
        DELETE "/embeddings/:id" => delete_embeddings,
        _ "/*" => |_req, _params| {
            Ok(http::Response::builder()
                .status(http::StatusCode::NOT_FOUND)
                .body(None)
                .unwrap())
        }
    };

    router.handle(req)
}

// Gets akk the embeddings from the NoOps SQL DB
fn get_embeddings(_req: Request, _params: Params) -> Result<Response> {
    let query = "SELECT * FROM embeddings";
    let conn = Connection::open_default()?;
    let embedding_records: Vec<Embedding> = conn
        .execute(query, &[])?
        .rows()
        .map(|row| -> anyhow::Result<Embedding> { row.try_into() })
        .collect::<anyhow::Result<Vec<Embedding>>>()?;

    info!("Rows: {:?}", embedding_records);

    Ok(http::Response::builder()
        .status(http::StatusCode::OK)
        .body(Some(serde_json::to_string(&embedding_records)?.into()))
        .unwrap())
}

// Generates all the embeddings and stores it in the DB
fn create_embeddings(_req: Request, _params: Params) -> Result<Response> {
    let my_embedding = Embedding {
        id: 0,
        reference: String::from("My ref"),
        text: String::from("My text"),
        embedding: Some(vec![1.23, 4.56, 7.89]),
    };
    let vec = json!(my_embedding.embedding);
    let blob = serde_json::to_vec(&vec)?;

    let query = "INSERT INTO embeddings (reference, text, embedding) VALUES(?, ?, ?) RETURNING id;";
    let query_params = [
        sqlite::ValueParam::Text(my_embedding.reference.as_str()),
        sqlite::ValueParam::Text(my_embedding.text.as_str()),
        sqlite::ValueParam::Blob(blob.as_slice()),
    ];
    let conn = Connection::open_default()?;
    let result = conn.execute(query, &query_params)?;
    info!("Result: {:?}", result.rows[0]);
    Ok(http::Response::builder()
        .status(http::StatusCode::CREATED)
        .body(None)
        .unwrap())
}

// Deletes all the embeddings and deletes it from the DB
fn delete_embeddings(_req: Request, _params: Params) -> Result<Response> {
    // Delete the record with id

    Ok(http::Response::builder()
        .status(http::StatusCode::OK)
        .body(None)
        .unwrap())
}

#[derive(Debug, Serialize, Deserialize)]
struct Embedding {
    id: u32,
    reference: String,
    text: String,
    embedding: Option<Vec<f32>>,
}

impl<'a> TryFrom<sqlite::Row<'a>> for Embedding {
    type Error = anyhow::Error;

    fn try_from(row: sqlite::Row<'a>) -> std::result::Result<Self, Self::Error> {
        let id = row.get::<u32>("id").unwrap();
        let reference = row
            .get::<&str>("reference")
            .context("reference column is empty")?;
        let text = row.get::<&str>("text").context("text column is empty")?;
        let embedding: Vec<f32>;
        match row.get::<&ValueResult>("embedding").unwrap() {
            ValueResult::Blob(b) => {
                embedding = serde_json::from_value(serde_json::from_slice(b.as_slice()).unwrap())?;
            },
            _ => todo!(),
        };        
        Ok(Self {
            id,
            reference: reference.to_owned(),
            text: text.to_owned(),
            embedding: Some(embedding),
        })
    }
}
```

### Building and Deploying Your Spin Application

Now let's build and deploy our Spin Application locally. Run the following command to build your application: 

<!-- @selectiveCpy -->

```bash
$ spin build --up
```

### TODO Deploy to Fermyon Cloud

<!-- @selectiveCpy -->

```bash
$ spin cloud deploy TODO
```

### TODO Testing 

<!-- @selectiveCpy -->

```bash
# Create a new POST request TODO
$ curl -X POST localhost:3000/test -H 'Content-Type: application/json' -d '{"todo":"todo"}' -v
```

## Integrating Custom Domain and Storage

The groundbreaking Fermyon Serverless AI introduces a revolutionary addition to the full-stack developer's arsenal. You can now seamlessly integrate the Fermyon [NoOps SQL Database](https://www.fermyon.com/blog/announcing-noops-sql-db), [Key-Value Storage](https://www.fermyon.com/blog/introducing-fermyon-cloud-key-value-store), and even your [Fermyon Cloud Custom Domains](https://www.fermyon.com/blog/announcing-custom-domains) with the launch of your very own advanced AI-enabled serverless applications.

## Conclusion

We want to get feedback on the Serverless AI API. We are curious about what models you would like to use and what applications you are building using Serverless AI. Let us know what you need, and how Fermyon's Serverless AI could potentially help solve a problem for you. We would love to help you write your new Serverless AI application.

## Next Steps

- Try the numerous Serverless AI examples in our GitHub repository called [ai-examples](https://github.com/fermyon/ai-examples).
- [Contribute](https://developer.fermyon.com/hub/contributing) your Serverless AI app to our [Spin Up Hub](https://developer.fermyon.com/hub).
- Ask questions and share your thoughts in [our Discord community](https://discord.gg/AAFNfS7NGf).
