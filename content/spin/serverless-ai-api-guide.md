title = "Serverless API"
template = "spin_main"
date = "2023-09-05T09:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/serverless-ai-api-guide.md"

---
- [How Fermyon Serverless AI Works](#how-fermyon-serverless-ai-works)
- [Using Fermyon Serverless AI From Applications](#using-fermyon-serverless-ai-from-applications)


Spin provides an interface for you to perform AI inference within Spin applications.

## How Fermyon Serverless AI Works

By default, TODO:

```toml
[[component]]
ai_models = ["llama2-chat"]
```

> Note: To deploy a Spin application that performs AI inferencing please visit the [Serverless AI](https://developer.fermyon.com/cloud/serverless-ai#accessing-private-beta) section in the documentation. It covers signing up for the private beta and setting up your Fermyon Serverless AI.

## Using Fermyon Serverless AI From Applications

The Spin SDK surfaces the Serverless AI interface to your language.

The set of operations is common across all SDKs:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| `infer`  | model `string`, prompt `string`, params `list` | `string`  | The `infer` is performed on a specific model. The name of the model is the first parameter provided (i.e. `llama2-v70b-chat`, `llama2-v13b-chat`, `llama2-v7b-chat` or other; passed in as a `string`). The second parameter is a prompt; passed in as a `string`. The third parameter is a mix of float and unsigned integers relating to inferencing parameters in this order: `max-tokens` (unsigned 32 integer), `repeat-penalty` (float 32), `repeat-penalty-last-n-token-count` (unsigned 32 integer), `temperature` (float 32), `top-k` (unsigned 32 integer) and `top-p` (float 32). The result from `infer` is a `string` |

TODO the above are still in flux so please check this reference to see the operations and parameters https://github.com/fermyon/spin/blob/llm-sdk/wit/preview2/llm.wit and then delete this line TODO

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

TODO. For example:

```rust
TODO
```

**General Notes** 
* TODO

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

TODO. For example:

```javascript
TODO
```

**General Notes**
* TODO

{{ blockEnd }}

{{ blockEnd }}