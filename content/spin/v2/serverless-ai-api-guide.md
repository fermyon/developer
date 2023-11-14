title = "Serverless AI API"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/serverless-ai-api-guide.md"

---
- [Using Serverless AI From Applications](#using-serverless-ai-from-applications)
  - [Configuration](#configuration)
  - [File Structure](#file-structure)
- [Serverless AI Interface](#serverless-ai-interface)

The nature of AI and LLM workloads on already trained models lends itself very naturally to a serverless-style architecture. As a framework for building and deploying serverless applications, Spin provides an interface for you to perform AI inference within Spin applications. 

## Using Serverless AI From Applications 

### Configuration

By default, a given component of a Spin application will not have access to any Serverless AI models. Access must be provided explicitly via the Spin application's manifest (the `spin.toml` file).  For example, an individual component in a Spin application could be given access to the llama2-chat model by adding the following `ai_models` configuration inside the specific `[component.(name)]` section:

<!-- @nocpy -->

```toml
// -- snip --

[component.please-send-the-codes]
ai_models = ["codellama-instruct"]

// -- snip --
```

> Spin supports "llama2-chat" and "codellama-instruct" for inferencing and "all-minilm-l6-v2" for generating embeddings.

### File Structure

By default, the Spin framework will expect any already trained model files (which are configured as per the previous section) to be downloaded by the user and made available inside a `.spin/ai_models/` file path of a given application. For example:

```bash
code-generator-rs/.spin/ai_models/codellama-instruct
```

See the [serverless AI Tutorial](./ai-sentiment-analysis-api-tutorial) documentation for more concrete examples of implementing the Fermyon Serverless AI API, in your favorite language.

> Embeddings models are slightly more complicated; it is expected that both a `tokenizer.json` and a `model.safetensors` are located in the directory named after the model. For example, for the `foo-bar-baz` model, Spin will look in the `.spin/ai-models/foo-bar-baz` directory for `tokenizer.json` and a `model.safetensors`.

## Serverless AI Interface

The Spin SDK surfaces the Serverless AI interface to a variety of different languages. See the [Language Support Overview](./language-support-overview) to see if your specific language is supported.

The set of operations is common across all supporting language SDKs:

| Operation | Parameters | Returns | Behavior |
|:-----|:----------------|:-------|:----------------|
| `infer`  | model`string`<br /> prompt`string`| `string`  | The `infer` is performed on a specific model.<br /> <br />The name of the model is the first parameter provided (i.e. `llama2-chat`, `codellama-instruct`, or other; passed in as a `string`).<br /> <br />The second parameter is a prompt; passed in as a `string`.<br />|
| `infer_with_options`  | model`string`<br /> prompt`string`<br /> params`list` | `string`  | The `infer_with_options` is performed on a specific model.<br /> <br />The name of the model is the first parameter provided (i.e. `llama2-chat`, `codellama-instruct`, or other; passed in as a `string`).<br /><br /> The second parameter is a prompt; passed in as a `string`.<br /><br /> The third parameter is a mix of float and unsigned integers relating to inferencing parameters in this order: <br /><br />- `max-tokens` (unsigned 32 integer) Note: the backing implementation may return less tokens. <br /> Default is 100<br /><br /> - `repeat-penalty` (float 32) The amount the model should avoid repeating tokens. <br /> Default is 1.1<br /><br /> - `repeat-penalty-last-n-token-count` (unsigned 32 integer) The number of tokens the model should apply the repeat penalty to. <br /> Default is 64<br /><br /> - `temperature` (float 32) The randomness with which the next token is selected. <br /> Default is 0.8<br /><br /> - `top-k` (unsigned 32 integer) The number of possible next tokens the model will choose from. <br /> Default is 40<br /><br /> - `top-p` (float 32) The probability total of next tokens the model will choose from. <br /> Default is 0.9<br /><br /> The result from `infer_with_options` is a `string` |
| `generate-embeddings`  | model`string`<br /> prompt`list<string>`| `string`  | The `generate-embeddings` is performed on a specific model.<br /> <br />The name of the model is the first parameter provided (i.e. `all-minilm-l6-v2`, passed in as a `string`).<br /> <br />The second parameter is a prompt; passed in as a `list` of `string`s.<br /><br /> The result from `generate-embeddings` is a two-dimension array containing float32 type values only |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/llm/index.html)

To use Serverless AI functions, the `llm` module from the Spin SDK provides the methods. The following snippet is from the [Rust code generation example](https://github.com/fermyon/ai-examples/tree/main/code-generator-rs):

<!-- @nocpy -->

```rust
use spin_sdk::{
    http::{Request, Response},
    llm,
};

// -- snip --

fn handle_code(req: Request) -> Result<Response> {
    // -- snip --

    let result = llm::infer_with_options(
        llm::InferencingModel::CodellamaInstruct,
        &prompt,
        llm::InferencingParams {
            max_tokens: 400,
            repeat_penalty: 1.1,
            repeat_penalty_last_n_token_count: 64,
            temperature: 0.8,
            top_k: 40,
            top_p: 0.9,
        },
    )?;

    // -- snip --	
}

```

**General Notes**

The `infer_with_options` examples, operation:

- The above example takes the model name `llm::InferencingModel::CodellamaInstruct` as input. From an interface point of view, the model name is technically an alias for a string (to maximize future compatibility as users want to support more and different types of models).
- The second parameter is a prompt (string) from whoever/whatever is making the request to the `handle_code()` function.
- A third, optional, parameter which is an interface allows you to specify parameters such as `max_tokens`, `repeat_penalty`, `repeat_penalty_last_n_token_count`, `temperature`, `top_k` and `top_p`.  
- The return value (the `inferencing-result` record) contains a text field of type `string`. Ideally, this would be a `stream` that would allow streaming inferencing results back to the user, but alas streaming support is not yet ready for use so we leave that as a possible future backward incompatible change.

{{ blockEnd }}

{{ startTab "Typescript"}}

[**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/spin-js-sdk/variables/Llm.html)

To use Serverless AI functions, [the `Llm` module](https://fermyon.github.io/spin-js-sdk/variables/Llm.html) from the Spin SDK provides two methods: `infer` and `generateEmbeddings`. For example: 

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
- The model name is a string. There are enums for the inbuilt models (llama2-chat and codellama) in [`InferencingModels`](https://fermyon.github.io/spin-js-sdk/enums/InferencingModels.html).
- The optional third parameter which is an [InferencingOptions](https://fermyon.github.io/spin-js-sdk/interfaces/InferencingOptions.html) interface allows you to specify parameters such as `maxTokens`, `repeatPenalty`, `repeatPenaltyLastNTokenCount`, `temperature`, `topK`, `topP`.  
- The return value is an [`InferenceResult`](https://fermyon.github.io/spin-js-sdk/interfaces/_internal_.InferenceResult.html).

`generateEmbeddings` operation:

- It takes two arguments - model name and list of strings to generate the embeddings for. 
- The model name is a string. There are enums for the inbuilt models (AllMiniLmL6V2) in [`EmbeddingModels`](https://fermyon.github.io/spin-js-sdk/enums/EmbeddingModels.html).
- The return value is an [`EmbeddingResult`](https://fermyon.github.io/spin-js-sdk/interfaces/_internal_.EmbeddingResult.html)

{{ blockEnd }}

{{ startTab "Python"}}

```python
from spin_http import Response
from spin_llm import llm_infer


def handle_request(request):
    prompt="You are a stand up comedy writer. Tell me a joke."
    result=llm_infer("llama2-chat", prompt)
    return Response(200,
                    {"content-type": "text/plain"},
                    bytes(result.text, "utf-8"))
```

**General Notes**

`llm_infer` operation:

- It takes in the following arguments - model name and `prompt`. 
- The model name is passed in as a string (as shown above; `"llama2-chat"`).
- The return value is a `string`.

{{ blockEnd }}

{{ startTab "TinyGo"}}

> [**Want to go straight to the Spin SDK reference documentation?**  Find it here.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2@v2.0.0/llm)

Serverless AI functions are available in the `github.com/fermyon/spin/sdk/go/v2/llm` package. See [Go Packages](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2/llm) for reference documentation. For example:

```go
package main

import (
	"fmt"
	"net/http"

	spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
	"github.com/fermyon/spin/sdk/go/v2/llm"
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
- The model name is a string: `all-minilm-l6-v2`
- It returns a result struct with an `Embeddings` field that contains the `[][]float32` embeddings and a `Usage` field that contains metadata about the operation.

{{ blockEnd }}

{{ blockEnd }}
