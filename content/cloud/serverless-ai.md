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

The Fermyon Serverless AI is currently in private beta. To request access to the private beta, please fill out this short [sign-up form](https://fibsu0jcu2g.typeform.com/to/mNzgXRvB#hubspot_utk=xxxxx&hubspot_page_name=xxxxx&hubspot_page_url=xxxxx).
 
> Please note that the private beta is limited in space, and all requests cannot be guaranteed. 

Once you have access to the private beta, please ensure you have:
- TODO (what does a user need to install/upgrade) i.e. [Spin CLI](./cli-reference.md) version TODO or greater
- TODO (what does a user need to install/upgrade) i.e. [TODO plugin](TODO) version TODO or greater installed. 

## Quotas And Service Limitations For Fermyon Serverless AI

*Quotas* 
* You can have up to 75 inferencing requests per hour, 200 embedding requests per hour
* You can have a maximum of 1,024 tokens (prompt and response) per request

>> If you have questions about increasing these limits, please reach out to [support@fermyon.com](mailto://support@fermyon.com)

*Service Limitations*
* TODO any service limitations to run Fermyon Serverless AI (i.e. only supports TODO).

## FAQ

- **Can I TODO?**
At this time, Fermyon Serverless AI does not have TODO. We'd love to hear your thoughts on what an ideal experience would look like at [github.com/fermyon/feedback](https://github.com/fermyon/feedback)

- **How does Fermyon Serverless AI compare to OpenAI? OctoML? In what situations am I better off using Fermyon Serverless AI?**
With Fermyon Serverless AI, you don’t need to be worried about vendor lock-in. Unlike using OpenAI’s services, with Fermyon Serverless AI you can run your inferencing workloads locally with Spin or on your infrastructure of choice with Spin install. 

- **Which specific model(s) is Fermyon Serverless AI using? [i.e. 7B, 13B, 70B] Why was this model chosen?**
Fermyon Serverless AI is using the 13B model as it strikes an excellent balance of performance and accuracy. If you’re interested in another model, please share this feedback at [github.com/fermyon/feedback](github.com/fermyon/feedback).

- **How do I choose which model I’m using?**
Please visit [Meta AI’s documentation](https://ai.meta.com/resources/models-and-libraries/llama/) to learn morea bout the tradeoffs between llama2 and Code Llama

- **Do you support Fine Tuning? Bring your own Model? Any models other than LLaMa2 and CodeLlama? Vector Databases?**
At this time, we do not support Fine Tuning or bringing your own model. Fermyon Serverless AI supports llama2 and CodeLlama. If you’re interested in another model, please share that feedback with our team by raising an issue [here](https://github.com/fermyon/feedback/issues/new/choose). Vector databases, backed by our NoOps SQL DB, are supported today in private beta.

- **Does Fermyon Serverless AI come with any specific or special support services?**
Does Fermyon Serverless AI come with any specific or special support services?

- **I read somewhere that I’ll receive data about my AI inferencing usage — where can I find that data? Where can I find a reference as to the definition(s) of each of those data elements?**
In the request response body, you will see information about request time, predicted token account, etc. 

- **What programming languages / SDKs can I use to invoke Serverless AI?**
Please visit the [API Guide](/spin/serverless-ai-api-guide.md) for this information.

## Next Steps

* For support or feature feedback, please join our [Discord channel #serverless-ai](https://www.fermyon.com/discord). This is where you can provide feedback and ask for assistance from the Fermyon team on all things Fermyon Serverless AI. 