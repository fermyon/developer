title = "Contributing to the Spin Hub"
template = "render_hub_content_body"
date = "2023-07-20T12:00:00Z"
enable_shortcodes = true
[extra]
type = "contributing"
url = "https://github.com/fermyon/developer/blob/main/content/api/hub/contributing.md"

---

- [Contribution Procedure](#contribution-procedure)
  - [Fork the Repository](#fork-the-repository)
  - [Clone the Fork](#clone-the-fork)
  - [Create New Branch](#create-new-branch)
  - [Add Upstream](#add-upstream)
  - [Creating Markdown](#creating-markdown)
  - [Valid Metadata](#valid-metadata)
  - [Valid Content Types](#valid-content-types)
  - [Testing Locally](#testing-locally)
  - [Add Changes](#add-changes)
  - [Commit Changes](#commit-changes)
  - [Push Changes](#push-changes)
  - [Create a Pull Request](#create-a-pull-request)

We are delighted that you are interested in making Spin Hub better! Thank you! This
document will guide you through making your first contribution to the project.

First, any contribution and interaction on any Fermyon project MUST follow our
[code of conduct](https://www.fermyon.com/code-of-conduct). Thank you for being
part of an inclusive and open community!

## Contribution Procedure

### Fork the Repository

The first step is to fork the [developer repository](https://github.com/fermyon/developer), from Fermyon's GitHub, to your own GitHub account.

![Fork the repository](/static/image/fork_developer_repo.png)

Ensure that you are forking the developer repository **to your own** GitHub account; where you have full editing privileges.

### Clone the Fork

Copy the URL from the UI in readiness for running the `git clone` command.

![Fork the repository](/static/image/clone_developer_repo.png)

Go ahead and clone the new fork that you just created (the one which resides in your own GitHub account):

<!-- @nocpy -->

```bash
$ cd ~
$ git clone git@github.com:yourusername/developer.git
$ cd developer
```

### Create New Branch

Create a new branch that will house all of your changes for this specific contribution:

<!-- @nocpy -->

```bash
$ git checkout -b my_new_branch
```

### Add Upstream

Create a new remote for the upstream (a pointer to the original repository to which you are contributing):

<!-- @nocpy -->

```bash
$ git remote add upstream https://github.com/fermyon/developer
```

### Creating Markdown

Create a **`.md`** Markdown file in the **`content/api/hub`** folder in your fork. (Adhering to the naming convention of other files helps keep things tidy and manageable.)

Below is a copyable example to get you started:

<!-- @nocpy -->

```toml
title = "Rust HTTP trigger template"
template = "render_hub_content_body"
date = "2022-10-15T00:22:56Z"
content-type = "text/html"
tags = ["rust", "http"]

[extra]
author = "fermyon"
type = "hub_document"
category = "Template"
language = "Rust"
created_at = "2022-10-15T00:22:56Z"
last_updated = "2022-10-15T00:22:56Z"
spin_version = ">v0.2"
summary =  "A template to create an HTTP handler in Rust"
url = "https://github.com/spinframework/spin/tree/main/templates/http-rust"

---

```

Be sure to make a description of the hub item in the body (below the **`---`** line). The content that you write below the **`---`** line will be the content shown when the card is expanded in a modal view. For example:

```md
This is the default HTTP trigger template for Rust. It installs by default with the [Spin install script](../../spin/install#installing-spin).

This guide walks you through how to use it: [HTTP Components](../../spin/rust-components#http-components)
```

### Valid Metadata

Please see the following table for valid metadata fields to use in your contribution (complete with descriptions, examples and comments for each):

| Metadata | Description | Example | Comment |
| --- | --- | --- | --- |
| Submitter | The GitHub handle of the person submitting the content. | karthik2804 (as link to GitHub profile). |  |
| Date created | The data the submission was made. |  | This can never be changed. The data can be shown in the modal. |
| Content Type | Drop-down of categories (see below). |  | These will be the hardcoded filters in the UI overview. |
| Link | Link to where to find the source. |  | If this is a release of something from GitHub, would the link be to the release, or the repo? |
| Date Updated | Last date the content was updated. |  | This is potentially a filterable value, to be show on the card. |
| Programming Language | The programming language used to produce the content. |  | Used for filtering and search.
Should be shown on the card. |
| Description | The description of the content. |  | This is not metadata, but the body text in the md file.
Will be shown in the modal. |
| Key Words / Tags | Words to help indexing. |  | Will we do manual consolidation? i.e., person adds key-value and another adds key-values  |
| Spin Version Compatibility | Versions of Spin supporting this artifact. |  | e.g., >1.0.0 |
| Summary | A summary of the description, to be shown on the card. |  | Could be used as a hover-over context. |

### Valid Content Types

The following is a list of the types of content that a user can submit to the Spin Hub.

- **Examples**
    - Spin Application examples
    - Code snippets
- **(Spin) Templates**
    - Complete components such as the [Spin static-fileserver](https://github.com/fermyon/spin-fileserver)
- **(Spin) Plugins**
    - Triggers and tools
    - See Lee-Orr’s Message trigger: [https://github.com/lee-orr/spin-message-trigger](https://github.com/lee-orr/spin-message-trigger)
- **Libraries**
    - Spin SDKs i.e. [https://github.com/spinframework/spin-python-sdk](https://github.com/spinframework/spin-python-sdk)
    - See the following example of a library by Thorsten Hans: [https://github.com/ThorstenHans/spin-contrib-http](https://github.com/ThorstenHans/spin-contrib-http)

### Testing Locally

After your file has been created, you can test it on localhost before committing.

<!-- @nocpy -->

```console
$ npm install
$ cd spin-up-hub
$ npm install
$ cd ..
$ spin build
$ npm run spin
```

### Add Changes

Once your changes have been checked, go ahead and add your changes by moving to a top-level directory, under which your changes exist i.e. `cd ~/developer`.

Add your changes by running the following command, from the root of the developer repository:

<!-- @nocpy -->

```bash
$ git add .
```

### Commit Changes

Before committing, please ensure that your GitHub installation is configured sufficiently so that you can `--signoff` as part of the `git commit` command. For example, please ensure that the `user.name` and `user.email` are configured in your terminal. You can check if these are set by typing `git config --list`.

If you need to set these values please use the following commands:

<!-- @nocpy -->

```bash
$ git config user.name "yourusername"
```
<!-- @nocpy -->

```bash
$ git config user.email "youremail@somemail.com"
```

More information can be found at this GitHub documentation page called [signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

Type the following commit command to ensure that you sign off (--signoff), sign the data (-S) - recommended, and also leave a short message (-m):

<!-- @nocpy -->

```bash
$ git commit -S --signoff -m "Updating Spin Hub"
```

> Note: the `--signoff` option will only add a Signed-off-by trailer by the committer at the end of the commit log message. In addition to this, it is recommended that you use the `-S` option which will GPG-sign your commits. For more information about using GPG in GitHub see [this GitHub documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).

### Push Changes

At this stage, it is a good idea to just quickly check what GitHub thinks the origin is. For example, if we type `git remote -v` we can see that the origin is our repo; which we a) forked the original repo into and b) which we then cloned to our local disk so that we could edit:

<!-- @nocpy -->

```bash
$ git remote -v
```

The above command will return output similar to the following:

<!-- @nocpy -->

```bash
origin	git@github.com:yourusername/developer.git (fetch)
origin	git@github.com:yourusername/developer.git (push)
upstream	https://github.com/fermyon/developer (fetch)
upstream	https://github.com/fermyon/developer (push)
```

Once you are satisfied go ahead and push your changes:

<!-- @nocpy -->

```bash
$ git push -u origin my_new_branch
```

### Create a Pull Request

If you return to your GitHub repository in your browser, you will notice that a PR has automatically been generated for you.

Clicking on the green “Compare and pull request” button will allow you to add a title and description as part of the PR. 

![Compare and pull request](/static/image/compare_and_pull_request.png)

You can also add any information in the textbox provided below the title. For example, screen captures and/or code/console/terminal snippets of your contribution working correctly and/or tests passing etc.

Once you have finished creating your PR, please keep an eye on the PR; answering any questions as part of the collaboration process.

**Thank You**

Thanks for contributing.
