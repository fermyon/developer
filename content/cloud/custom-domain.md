title = "Custom Domains"
template = "cloud_main"
date = "2023-07-26T16:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/custom-domain.md"

---
- [Setting Up Custom Domains](#setting-up-custom-domains)
  - [Relationship Between Custom Domains and Spin Applications](#relationship-between-custom-domains-and-spin-applications)
  - [Next Steps](#next-steps)
  - [Terminology](#terminology)

Every Fermyon Cloud application has a default domain name in the format `<app-name>-<random-string>.fermyon.app`. The Fermyon Cloud Custom Domains feature provides a way for you to use your own domain names; providing your users with human-friendly access to your Fermyon Cloud applications. Another advantage of using Fermyon Cloud Custom Domains is that your Spin application can have a stronger sense of branding and identity. For example, for [Finicky Whiskers: The World's Most Adorable Manual Load Generator](https://www.fermyon.com/blog/finicky-whiskers-part-1-intro) we have moved away from using the default domain name `finicky-whiskers-6cavavfh.fermyon.app`, and we much prefer using the custom domain `finickywhiskers.com`. 

If you do not own a domain (and are **not** interested in purchasing one) but would like to customize your Spin application's domain name within the `fermyon.app` apex domain, then Custom Fermyon Subdomains may be a good option for you. Check out the [Custom Fermyon Subdomains tutorial](./custom-fermyon-subdomain.md) for more instructions. 

If you do not own a domain and you **are** interested in purchasing one, you can purchase one through a domain registrar like [Namecheap](https://www.namecheap.com/) or [GoDaddy](https://www.godaddy.com/). Fermyon Cloud is not a domain registrar meaning you'll have to use an external registrar.

>> If you are unsure what some of the terms on this page mean, please see the section called [Terminology](#terminology) at the bottom of this page.

## Setting Up Custom Domains

To take advantage of Fermyon Cloud Custom Domain, you must delegate your domain to Fermyon Cloud. For a full set of instructions, please follow the [Ferymon Cloud Custom Domains tutorial](./custom-domains-tutorial.md). 

### Relationship Between Custom Domains and Spin Applications

Currently, you can apply a maximum of one custom domain to your Spin application, and a custom domain cannot be shared between multiple Spin applications. If you apply a custom domain to a Spin application and you wish to reassign it, you must first remove the custom domain from the current Spin application and then apply it to your desired Spin application. The Fermyon Cloud Custom Domain feature will generate 4 nameserver records. You must share these with your domain registrar and wait for DNS propagation (the mapping of IP address and DNS record information across nameservers on the internet).

Note that this propagation is generally performed in a reasonable time frame (minutes/hours). However, in some cases, propagation can take up to 72 hours. You can check the DNS record types for your domain name using the [Google Public DNS](https://dns.google/) service.

Be aware that updating your domain's nameserver records will cause any additional records you've set through you registrar to no longer take effect. This includes, for example, TXT or MX records for services like Google Workspace. You can work around this by connecting your Fermyon Cloud app to a subdomain. But if you need to use the apex domain (example.com rather than app.example.com) and you also need to set additional DNS records, you should choose a different hosting service for the time being.

### Next Steps

* Follow the [Ferymon Cloud Custom Domains tutorial](./custom-domains-tutorial.md) to add your custom domain.
* Visit [Technical FAQ](./faq.md) for troubleshooting assistance.
* Check out [Pricing](./pricing-and-billing.md) for billing-related questions.

### Terminology

* Apex Domain: the `finickywhiskers.com` part in `www.finickywhiskers.com`.
* Custom Domain: a personalized and unique address that individuals, businesses, or organizations can register and use for their workloads. In the context of Fermyon Cloud, this is the domain name you provide.
* Custom Fermyon Subdomain: a customized name you select following the pattern  `<custom-name>.fermyon.app`.
* Domain Name: human-readable address to identify a workload on the internet. For example, `finicky-whiskers-6cavavfh.fermyon.app` or `finickywhiskers.com`.
* Domain Name Service (DNS) provider: a service that manages and maintains a database of domain names and their corresponding IP addresses.
* Domain Registrar: a company or organization accredited by domain name registries to allow individuals and businesses to register and manage domain names for their websites. For example, [Namecheap](https://www.namecheap.com/) or [GoDaddy](https://www.godaddy.com/) are domain registrars.
* Fermyon Domain Name: the default domain a Spin application gets allocated at creation time, which is a combination of the application's name and a random string. For example, `finicky-whiskers-6cavavfh.fermyon.app`.
* Subdomain: a hierarchical part of a larger domain name. It is added to the left of the primary domain name, separated by a dot (period). For example, `finicky-whiskers.fermyon.app` is a subdomain of `fermyon.app`.
