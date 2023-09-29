title = "Labels"
template = "cloud_main"
date = "2023-10-30T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/labels.md"

---
- [Labels Overview](#labels-overview)

# Labels Overview

Fermyon Cloud `labels` allow developers to manage their application and other cloud resources lifecycles separately while still establishing a relationship between the two objects for the duration of the application's runtime. 

> At this time, only NoOps SQL DB supports `labels`. However, in the future other Fermyon Cloud resources such as Key Value Store will support `labels` as well. 

Labels are created either within the component manifest in `spin.toml` or via `spin cloud` plugin when a developer would like their Spin application to access another Fermyon Cloud resource such as a NoOps SQL Database. 

![TODO - this is a rough PM diagram, needs design polish](../../static/image/labels-diagram.png)

## Benefits of Labels

Benefits of the Fermyon Clould `labels` include:

* **Easy Sharing**: Share your storage resource across applications effortlessly.
* **Resource Creation Control**: You decide when to create and delete storage resources.
* **Flexible Lifecycle Management**: Manage storage objects independently of your Spin application.
* **Seamless Cloud Integration**: Cloud experience smoothly integrates with local Spin development.
* **Component Model Alignment**: Change the data resource your application points to without rebuilding it.



## Next Steps

