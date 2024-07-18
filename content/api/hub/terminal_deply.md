title = "terminal Deployment"
template = "render_hub_content_body"
date = "2023-07-20T12:00:00Z"
enable_shortcodes = true
[extra]
type = "deployment"

---

Before You Deploy

You’ll need to install [Spin](https://developer.fermyon.com/spin/v2/install) - our open source developer tool - and have a Fermyon Cloud account (free) to deploy the application to.

Clone the Repo

```bash
git clone https://github.com/<username>/<project-name>.git && cd <project-name>
```

Deploy

```bash
spin cloud deploy
```