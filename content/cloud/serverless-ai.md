title = "Serverless AI"
template = "cloud_main"
date = "2023-09-05T09:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/serverless-ai.md"

---
- [Accessing Private Beta](#accessing-private-beta)
- [Quotas And Service Limitations For Fermyon Serverless AI](#quotas-and-service-limitations-for-fermyon-serverless-ai)
- [FAQ](#faq)
- [Next Steps](#next-steps)

## Accessing Private Beta

The Fermyon Serverless AI is currently in private beta. To request access to the private beta, please fill out this short [sign-up form](https://fibsu0jcu2g.typeform.com/to/mNzgXRvB).
 
> Please note that the private beta is limited in space, and all requests cannot be guaranteed. 

Once you have access to the private beta, please ensure you have the `canary` version of Spin installed:

<!-- @selectiveCpy -->

```bash
$ curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash -s -- -v canary
```

Also, for TypeScript/JavaScript examples, please ensure you have the latest TypeScript/JavaScript SDK installed:

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin-js-sdk --upgrade
```

## Quotas And Service Limitations For Fermyon Serverless AI

*Quotas* 
* You can have up to 75 inferencing requests per hour, 200 embedding requests per hour.
* You can have a maximum of 1,024 tokens per request (The 1,024 limit is just the response. It does not include the prompt.)

>> If you have questions about increasing these limits, please reach out to [support@fermyon.com](mailto://support@fermyon.com)

*Service Limitations*
* Fermyon Serverless AI currently supports `Code Llama Instruct` and `Llama2 Chat` as well as `all-MiniLm-L6-v2` for generating embeddings.

## FAQ

- **How does Fermyon Serverless AI compare to OpenAI? In what situations am I better off using Fermyon Serverless AI?**
With Fermyon Serverless AI, you don’t need to be worried about vendor lock-in. With Fermyon Serverless AI you can run your inferencing workloads locally with Spin or on your infrastructure of choice with Spin install. In fact, Fermyon Serverless AI is built using open source models that can be used completely outside the context of Spin in case you decide to host your own infrastructure end to end. 

- **Which specific model(s) is Fermyon Serverless AI using for inferencing? [i.e. 7B, 13B, 70B] Why was this model chosen?**
Fermyon Serverless AI is using the 13B model for inferencing, both for `llama2-chat` and `codellama-instruct`, as it strikes an excellent balance of performance and accuracy. If you’re interested in another model, please share this feedback at [github.com/fermyon/feedback](https://github.com/fermyon/feedback).

- **How do I choose which model I’m using?**
`llama2-chat` is trained for chat use cases, although it can be used for general language model tasks as well. `code llama` is meant for generating code based on instructions. However, these are just high-level guideposts. Please visit [Meta AI’s documentation](https://ai.meta.com/resources/models-and-libraries/llama/) for more specific instructions and to learn more about the tradeoffs between llama2 and Code Llama

- **Do you support Fine Tuning? Bring your own Model? Any models other than LLaMa2 and CodeLlama? Vector Databases?**
At this time, we do not support Fine Tuning or bringing your own model. Fermyon Serverless AI supports llama2 and CodeLlama. If you’re interested in another model, please share that feedback with our team by raising an issue [here](https://github.com/fermyon/feedback/issues/new/choose). Vector databases, backed by our NoOps SQL DB, are supported today in private beta.

- **I read somewhere that I’ll receive data about my AI inferencing usage — where can I find that data? Where can I find a reference as to the definition(s) of each of those data elements?**
In the request response body, you will see the number of prompt tokens and the number of generated tokens for inferencing requests. For embedding requests, you'll be presented with the number of prompt tokens. 

- **What programming languages / SDKs can I use to invoke Serverless AI?**
Please visit the [API Guide](/spin/serverless-ai-api-guide.md) for this information.

## Next Steps

* For support or feature feedback, please join our [Discord channel #serverless-ai-beta](https://www.fermyon.com/discord). This is where you can provide feedback and ask for assistance from the Fermyon team on all things Fermyon Serverless AI. 
