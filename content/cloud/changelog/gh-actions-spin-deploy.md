title = "GitHub Action support for spin/deploy"
template = "changelog_item"
date = "2022-03-30T00:22:56Z"
enable_shortcodes = true
tags = ["CI/CD"]
[extra]
type= "changelog_post"
---

Fermyon has recently released a collection of [GitHub Actions](https://github.com/fermyon/actions) for working with Spin that will empower you to pick up your development speed: 

- `fermyon/actions/spin/setup` - installs the Spin CLI and necessary plugins
- `fermyon/actions/spin/push` - pushes a Spin application to a registry
- `fermyon/actions/spin/deploy` - deploys a Spin application to Fermyon Cloud

Using `spin/deploy`, you can now set up a Continuous Deployment pipeline on Fermyon Cloud. Whenever you merge a pull request into your GitHub repository of choice, `spin/deploy` will trigger a new Spin application deployment. You can learn more about the set-up for this process with our [GitHub Actions tutorial](https://developer.fermyon.com/cloud/github-actions).

<img src="/static/image/changelog/spin-gh-actions.png" alt="GitHub Actions">

<!-- break -->

 References:

- Blog post: [https://www.fermyon.com/blog/github-actions-and-metrics-fermyon-cloud](https://www.fermyon.com/blog/github-actions-and-metrics-fermyon-cloud)
- Twitter: [https://twitter.com/fermyontech/status/1641537393818738710](https://twitter.com/fermyontech/status/1641537393818738710)