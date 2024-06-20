title = "Fermyon Cloud Variables Configuration"
template = "changelog_item"
date = "2023-06-13T07:00:00Z"
enable_shortcodes = true
tags = ["variable"]
[extra]
type= "changelog_post"
---

Fermyon Cloud now supports setting application variables through the API. Spin supports dynamic application variables. Instead of being static, their values can be updated without modifying the application, creating a simpler experience for rotating secrets, updating API endpoints, and more. These variables are defined in a Spin application manifest (in the `[variables]` section) and are provided by a configuration provider.

Now, when your application is deployed to Fermyon Cloud you can set and update variables for it using the `spin cloud variables` command. You can also set the variables when you initially deploy the application using `spin cloud deploy --variables`. The `spin cloud variables` command can also be used to list variables that have been set for an application. For a full explanation of how to configure variables and secrets in Spin applications, read the new [tutorial](../variables).

<!-- break -->

References:

- [Dynamic and Runtime Application Configuration](../../spin/dynamic-configuration)
- [Configuring Spin Application Variables and Secrets Tutorial](../variables)
- [cloud-plugin](https://github.com/fermyon/cloud-plugin)