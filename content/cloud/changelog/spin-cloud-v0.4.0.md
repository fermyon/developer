title = "Spin Cloud v0.3 & 0.4 Updates"
template = "changelog_item"
date = "2023-10-13T09:00:00Z"
enable_shortcodes = true
tags = ["spin_cloud_plugin"]
[extra]
type= "changelog_post"
twitter_card_type = "summary_large_image" 
image = "/static/image/changelog/spin-cloud-0.4.0.jpg" 

---

In the past month, we've released two minor versions of the [`spin cloud` plugin](https://github.com/fermyon/cloud-plugin). Let's take a look at what's new!

### As of spin cloud v0.3.0

As of [spin cloud v0.3.0](https://github.com/fermyon/cloud-plugin/releases/tag/v0.3.0), Fermyon Cloud has removed its dependency on bindle and is now using OCI as the default registry. No action is needed on your part to modify your Spin applications. If you run into any issues, please reach out to us on [Discord](https://discord.gg/AAFNfS7NGf) for assistance.

### As of spin cloud v0.4.0

With [`spin cloud` plugin v0.4.0](https://github.com/fermyon/cloud-plugin), we've new functionality to help you manage your Spin application and NoOps SQL Database amoung other exciting changes. 

Some highlights include:

* `spin cloud link sqlite` will connect your NoOps SQL DB to your Spin application of choice
* `spin cloud unlink sqlite` will disconnect your NoOps SQL DB to your Spin application of choice
* `spin cloud sqlite create` will create a NoOps SQL database on Fermyon Cloud
* `spin cloud sqlite rename` will rename your NoOps SQL database

> Note that NoOps SQL Database is currently in private beta. You can request access using this [short form](https://fibsu0jcu2g.typeform.com/to/Brv12FI0#hubspot_utk=xxxxx&hubspot_page_name=xxxxx&hubspot_page_url=xxxxx).


<!-- break -->

References:

- [Spin Cloud Plugin v0.4.0 Release Notes](https://github.com/fermyon/cloud-plugin/releases/tag/v0.4.0)
- [Spin Cloud Plugin Reference Documentation](./cloud/cloud-command-reference)
- [Linking Applications To Resources Using Labels](./cloud/linking-applications-to-resources-using-labels)
