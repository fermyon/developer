title = "Serverless AI API"
template = "spin_main"
date = "2023-09-05T09:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/serverless-ai-api-guide.md"

---
- [Using Serverless AI From Applications](#using-serverless-ai-from-applications)
  - [Configuration](#configuration)
  - [File Structure](#file-structure)
- [Serverless AI Interface](#serverless-ai-interface)

The nature of AI and LLM workloads on already trained models lends itself very naturally to a serverless-style architecture. As a framework for building and deploying serverless applications, Spin provides an interface for you to perform AI inference within Spin applications. 

## Using Serverless AI From Applications 

### Configuration

By default, a given component of a Spin application will not have access to any Serverless AI models. Access must be provided explicitly via the Spin application's manifest (the `spin.toml` file).  For example, an individual component in a Spin application could be given access to the llama2-chat model by adding the following `ai_models` configuration inside the specific `[[component]]` section:

<!-- @nocpy -->

```toml
// -- snip --

[[component]]
ai_models = ["codellama-instruct"]

// -- snip --
```

> Spin supports "llama2-chat" and "codellama-instruct" for inferencing and "all-minilm-l6-v2" for generating embeddings.

### File Structure

By default, the Spin framework will expect any already trained model files (which are configured as per the previous section) to be downloaded by the user and made available inside a `.spin/ai_models/` file path of a given application. For example:

```bash
code-generator-rs/.spin/ai_models/codellama-instruct
```

See the [serverless AI Tutorial](/spin/serverless-ai-tutorial) documentation for more concrete examples of implementing the Fermyon Server AI API, in your favorite language.

> Embeddings models are slightly more complicated; it is expected that both a `tokenizer.json` and a `model.safetensors` are located in the directory named after the model. For example, for the `foo-bar-baz` model, Spin will look in the `.spin/ai-models/foo-bar-baz` directory for `tokenizer.json` and a `model.safetensors`.

## Serverless AI Interface

The Spin SDK surfaces the Serverless AI interface to a variety of different languages. See the [Language Support Overview](/spin/language-support-overview) to see if your specific language is supported.

The set of operations is common across all supporting language SDKs:

| Operation | Parameters | Returns | Behavior |
|:-----|:----------------|:-------|:----------------|
| `infer`  | model`string`<br /> prompt`string`| `string`  | The `infer` is performed on a specific model.<br /> <br />The name of the model is the first parameter provided (i.e. `llama2-chat`, `codellama-instruct`, or other; passed in as a `string`).<br /> <br />The second parameter is a prompt; passed in as a `string`.<br />|
| `infer_with_options`  | model`string`<br /> prompt`string`<br /> params`list` | `string`  | The `infer_with_options` is performed on a specific model.<br /> <br />The name of the model is the first parameter provided (i.e. `llama2-chat`, `codellama-instruct`, or other; passed in as a `string`).<br /><br /> The second parameter is a prompt; passed in as a `string`.<br /><br /> The third parameter is a mix of float and unsigned integers relating to inferencing parameters in this order: <br />- `max-tokens` (unsigned 32 integer) Note: the backing implementation may return less tokens. <br /> - `repeat-penalty` (float 32) The amount the model should avoid repeating tokens. <br /> - `repeat-penalty-last-n-token-count` (unsigned 32 integer) The number of tokens the model should apply the repeat penalty to. <br /> - `temperature` (float 32) The randomness with which the next token is selected. <br /> - `top-k` (unsigned 32 integer) The number of possible next tokens the model will choose from. <br /> - `top-p` (float 32) The probability total of next tokens the model will choose from. <br /><br /> The result from `infer_with_options` is a `string` |
| `generate-embeddings`  | model`string`<br /> prompt`list<string>`| `string`  | The `generate-embeddings` is performed on a specific model.<br /> <br />The name of the model is the first parameter provided (i.e. `all-minilm-l6-v2`, passed in as a `string`).<br /> <br />The second parameter is a prompt; passed in as a `list` of `string`s.<br /><br /> The result from `generate-embeddings` is a two-dimension array containing float32 type values only |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

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

The TinyGo SDK doesn't currently surface the Serverless AI API. 

{{ blockEnd }}

{{ blockEnd }}
