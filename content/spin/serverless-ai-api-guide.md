title = "Serverless API"
template = "spin_main"
date = "2023-09-05T09:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/serverless-ai-api-guide.md"

---
- [Using Fermyon Serverless AI From Applications](#using-fermyon-serverless-ai-from-applications)


Spin provides an interface for you to perform AI inference within Spin applications. By default, a given component of an app will not have access to any Serverless AI models. Access must be provided explicitly via the component manifest.  For example, a component could be given access to the llama2-chat model using:

```toml
[[component]]
ai_models = ["llama2-chat"]
```

> Note: To deploy a Spin application (that performs AI inferencing) to Fermyon Cloud please visit the [Serverless AI](https://developer.fermyon.com/cloud/serverless-ai#accessing-private-beta) section in the documentation. It covers signing up for the private beta and setting up your Fermyon Serverless AI.

## Using Fermyon Serverless AI From Applications

The Spin SDK surfaces the Serverless AI interface to your language. The set of operations is common across all supporting SDKs:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| `infer`  | model `string`, prompt `string`, params `list` | `string`  | The `infer` is performed on a specific model. The name of the model is the first parameter provided (i.e. `llama2-v70b-chat`, `llama2-v13b-chat`, `llama2-v7b-chat` or other; passed in as a `string`). The second parameter is a prompt; passed in as a `string`. The third parameter is a mix of float and unsigned integers relating to inferencing parameters in this order: `max-tokens` (unsigned 32 integer), `repeat-penalty` (float 32), `repeat-penalty-last-n-token-count` (unsigned 32 integer), `temperature` (float 32), `top-k` (unsigned 32 integer) and `top-p` (float 32). The result from `infer` is a `string` |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

To use Serverless AI functions, the `llm` module from the Spin SDK provides the method: `infer`. The following snippet is from the [Rust sentiment analysis example](https://github.com/fermyon/ai-examples/sentiment-analysis-rust): 

```rust
use spin_sdk::{llm::{infer, InferencingModel::Llama2Chat}};

// -- snip --

let inferencing_result = infer(Llama2Chat, &PROMPT.clone().replace("<SENTENCE>", &request.sentence));
```

**General Notes**

`infer` operation:

- It takes in the following arguments - model name, prompt and ... 
- The model name is ...
- The optional third parameter which is an interface allows you to specify parameters such as `maxTokens`, `repeatPenalty`, `repeatPenaltyLastNTokenCount`, `temperature`, `topK`, `topP`.  
- The return value is ...

{{ blockEnd }}

{{ startTab "Typescript"}}

To use Serverless AI functions, the `Llm` module from the Spin SDK provides two methods: `infer` and `generateEmbeddings`. For example: 

```javascript
import { EmbeddingModels, HandleRequest, HttpRequest, HttpResponse, InferencingModels, Llm} from "@fermyon/spin-sdk"

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
    let embeddings = Llm.generateEmbeddings(EmbeddingModels.AllMiniLmL6V2, ["someString"])
    console.log(embeddings.embeddings)
    let result = Llm.infer(InferencingModels.Llama2Chat, prompt)
    return {
        status: 200,
        headers: {"content-type":"text/plain"},
        body: result.text
    }
}
```

**General Notes**

`infer` operation:

- It takes in the following arguments - model name, prompt and a optional third parameter for inferencing options. 
- The model name is a string. There are enums for the inbuilt models (llama2-chat and codellama) in `InferencingModels`.
- The optional third parameter which is an interface allows you to specify parameters such as `maxTokens`, `repeatPenalty`, `repeatPenaltyLastNTokenCount`, `temperature`, `topK`, `topP`.  
- The return value is a `string`.

`generateEmbeddings` operation:

- It takes two arguments - model name and list of strings to generate the embeddings for. 
- The model name is a string. There are enums for the inbuilt models (AllMiniLmL6V2) in `EmbeddingModels`.
- The return value is of the type `number[][] 

{{ blockEnd }}

{{ startTab "Python"}}

The Python SDK doesn't currently surface the Serverless AI API. 

{{ blockEnd }}

{{ startTab "TinyGo"}}

Serverless AI functions are available in the `github.com/fermyon/spin/sdk/go/llm` package. See [Go Packages](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/llm) for reference documentation. For example:

```go
package main

import (
	"fmt"
	"net/http"

	spinhttp "github.com/fermyon/spin/sdk/go/http"
	"github.com/fermyon/spin/sdk/go/llm"
)

func init() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
		result, err := llm.Infer("llama2-chat", "What is a good prompt?", nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Printf("Prompt tokens:    %d\n", result.Usage.PromptTokenCount)
		fmt.Printf("Generated tokens: %d\n", result.Usage.GeneratedTokenCount)
		fmt.Fprintf(w, "%s\n", result.Text)

		embeddings, err := llm.GenerateEmbeddings("all-minilm-l6-v2", []string{"Hello world"})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Printf("Prompt Tokens: %d\n", embeddings.Usage.PromptTokenCount)
		fmt.Printf("%v\n", embeddings.Embeddings)
	})
}
```

**General Notes**

`infer` operation:

- It takes in the following arguments - model name, prompt and an optional third parameter for inferencing options (pass `nil` if you don't want to specify it).
- The model name is a string.
- The params allows you to specify `MaxTokens`, `RepeatPenalty`, `RepeatPenaltyLastNTokenCount`, `Temperature`, `TopK`, `TopP`.
- It returns a result struct with a `Text` field that contains the answer and a `Usage` field that contains metadata about the operation.

`generateEmbeddings` operation:

- It takes two arguments - model name and list of strings to generate the embeddings for.
- The model name is a string.
- It returns a result struct with an `Embeddings` field that contains the `[][]float32` embeddings and a `Usage` field that contains metadata about the operation.

{{ blockEnd }}

{{ startTab "Swift"}}

* The inferencing parameters are optional and you can pass `nil` if you don't want to specify them

{{ blockEnd }}

{{ blockEnd }}