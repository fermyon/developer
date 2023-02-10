title = "Contributing to Docs"
template = "common_main"
date = "2022-01-01T00:00:01Z"
[extra]

---

- [Technical Documentation Types](#technical-documentation-types)
  - [1. Tutorials](#1-tutorials)
  - [2. How-To Guides](#2-how-to-guides)
  - [3. Reference](#3-reference)
  - [4. Explanation](#4-explanation)
- [Technical Documentation Procedure](#technical-documentation-procedure)
  - [1. Fork the Repository](#1-fork-the-repository)
  - [2. Clone the Fork](#2-clone-the-fork)
  - [3. Create New Branch](#3-create-new-branch)
  - [4. Add Upstream](#4-add-upstream)
  - [5. Code Blocks, Annotations and Table of Contents (ToC)](#5-code-blocks-annotations-and-table-of-contents-toc)
  - [6. Check Content](#6-check-content)
  - [7. Add Changes](#7-add-changes)
  - [8. Commit Changes](#8-commit-changes)
  - [9. Push Changes](#9-push-changes)
  - [10. Create a Pull Request](#10-create-a-pull-request)

Thank you for your interest in contributing to the Fermyon documentation. Below are a few pointers designed to help you contribute.

## Technical Documentation Types

The following points will help guide your contribution from a resource-type perspective; essentially we would really appreciate you creating and contributing any of the following 4 resource types. 

### 1. Tutorials

Tutorials are oriented toward learning. Tutorials are designed to get a user started on something new (that they have not tried before). You can think of a tutorial as a lesson i.e. teaching a Spin user [how to use Redis to persist data](../cloud/data-redis). The tutorial may contain many logically ordered steps i.e. installing Spin, installing Redis, using Spin templates, configuring a Spin application and so forth. The desired outcome for a tutorial is for the user to have a working deployment or application. Think of it as a lesson in how to bake a cake.

### 2. How-To Guides

How-to guides are oriented towards showing a user how to solve a problem, which leads them to be able to achieve their own goal. The how-to guide will follow a series of logical steps. Think of it as providing a recipe for the user's creativity. For example, you can show a user how to [develop a Spin application](../cloud/develop) without telling them what the application must do; that is up to the user's imagination.

### 3. Reference

Reference resources are merely a dry description; describing the feature in its simplest form. A great example of a reference resource is the [Spin CLI Reference page](../common/cli-reference). You will notice that the CLI Reference page simply lists all of the commands and available options.

### 4. Explanation

An explanation resource is written using a deep-dive approach i.e. providing a deep explanation with the view to impart a deep understanding of a particular concept, feature or product. You may find your contribution is so in-depth that it becomes a long form article like a blog post. If that is the case, please get in touch and we can discuss options around getting your content published on another platform; like the [Fermyon Blog](https://www.fermyon.com/blog/index).

**Tying It All Together**

You will notice that the menu system is organized in terms of "Tutorial", "How-To", "Reference" and so forth. When you write your contribution please decide which product (Cloud, Spin, Bartholomew) category it falls into and also which resource type it aligns with. Armed with that information you can go ahead and create your new file. For example, your "how-to" resource on "developing a Spin application" in Fermyon cloud would be saved to the `content/cloud/` folder; specifically, `content/cloud/develop.md` and the menu item (for the left-hand-side menu) would be added to the `templates/cloud_sidebar.hbs` file, as shown below.

![cloud develop example](../static/image/docs/cloud-develop-example.png)

The resulting output would be as follows.

![cloud develop example](../static/image/docs/cloud-develop-example-2.png)

## Technical Documentation Procedure

The following steps will assist you to contribute from a technical standpoint.

### 1. Fork the Repository

The first step is to fork the [developer repository](https://github.com/fermyon/developer), from Fermyon's GitHub, to your own GitHub account.

![Fork the repository](/static/image/fork_developer_repo.png)

Ensure that you are forking the developer repository **to your own** GitHub account; where you have full editing privileges.

### 2. Clone the Fork

Copy the URL from the UI in readiness for running the `git clone` command.

![Fork the repository](/static/image/clone_developer_repo.png)

Go ahead and clone the new fork that you just created (the one which resides in your own GitHub account):

<!-- @selectiveCpy -->

```bash
$ cd ~
$ git clone git@github.com:yourusername/developer.git
$ cd developer
```

### 3. Create New Branch

Create a new branch that will house all of your changes for this specific contribution:

<!-- @selectiveCpy -->

```bash
$ git checkout -b my_new_branch
```

### 4. Add Upstream

Create a new remote for the upstream (a pointer to the original repository to which you are contributing):

<!-- @selectiveCpy -->

```bash
$ git remote add upstream https://github.com/fermyon/developer
```

### 5. Code Blocks, Annotations and Table of Contents (ToC)

It is highly recommended that you use either the `<!-- @selectiveCpy -->` or the `<!-- @nocpy -->` annotation before each of your code blocks, and that each code block defines the appropriate [syntax highlighting](https://rdmd.readme.io/docs/code-blocks#language-support). The annotation can be skipped for code blocks with example code snippets i.e. non-terminal or generic output examples.

The selective copy annotation (`<!-- @selectiveCpy -->`) is intended for use when communicating code and/or CLI commands for the reader to copy and paste. The selective copy annotation allows the reader to see the entire code block (both commands and results) but only copies the lines that start with `$` into the reader's clipboard (minus the `$`) when the user clicks the copy button. For example, copying the following code block will only copy `echo "hello"` into your clipboard, for pasting.

<!-- @selectiveCpy -->

```bash
$ echo "hello"
hello
```

> Note: If the command, that starts with `$`, is deliberately spread over two lines (by escaping the newline character), then the copy mechanism will still copy the second line which is technically still part of that single command.

The no copy annotation (`<!-- @nocpy -->`) precedes a code block where no copy and pasting of code is intended. If using the no copy attribute please still be sure to add the appropriate syntax highlighting to your code block (for display purposes). For example:

`<!-- @nocpy -->`

```bash
Some generic code not intended for copying/pasting
```

**Table of Contents (ToC)**

If you create content with many headings it is highly recommended to place a ToC in your markdown file. There are excellent extensions (such as this Visual Studio Code Extension called [markdown-all-in-one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) which will automatically generate your ToC).

### 6. Check Content

Once you are satisfied with your contribution, you can programmatically check your content.

If you have not done so already, please go ahead and perform the `npm install` command; to enable Node dependencies such as `markdownlint-cli2`. Simply run the following command, from the root of the developer repository:

<!-- @selectiveCpy -->

```bash
$ npm install
```

With all Node dependencies installed, you can now check for broken links and also lint your markdown files. Simply run the following command, from the root of the developer repository:

<!-- @selectiveCpy -->

```bash
$ npm test
```

### 7. Add Changes

Once your changes have been checked, go ahead and add your changes by moving to a top-level directory, under which your changes exist i.e. `cd ~/developer`.

Add your changes by running the following command, from the root of the developer repository:

<!-- @selectiveCpy -->

```bash
$ git add
```

### 8. Commit Changes

Before committing, please ensure that your GitHub installation is configured sufficiently so that you can `--signoff` as part of the `git commit` command. For example, please ensure that the `user.name` and `user.email` are configured in your terminal. You can check if these are set by typing `git config --list`.

If you need to set these values please use the following commands:

<!-- @selectiveCpy -->

```bash
$ git config user.name "yourusername"
```
<!-- @selectiveCpy -->

```bash
$ git config user.email "youremail@somemail.com"
```

More information can be found at this GitHub documentation page called [signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

Type the following commit command to ensure that you sign off (--signoff), sign the data (-S) - recommended, and also leave a short message (-m):

<!-- @selectiveCpy -->

```bash
$ git commit -S --signoff -m "Updating documentation"
```

> Note: the `--signoff` option will only add a Signed-off-by trailer by the committer at the end of the commit log message. In addition to this, it is recommended that you use the `-S` option which will GPG-sign your commits. For more information about using GPG in GitHub see [this GitHub documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).

### 9. Push Changes

At this stage, it is a good idea to just quickly check what GitHub thinks the origin is. For example, if we type `git remote -v` we can see that the origin is our repo; which we a) forked the original repo into and b) which we then cloned to our local disk so that we could edit:

<!-- @selectiveCpy -->

```bash
$ git remote -v
```

The above command will return output similar to the following:

```bash
origin	git@github.com:yourusername/developer.git (fetch)
origin	git@github.com:yourusername/developer.git (push)
upstream	https://github.com/fermyon/developer (fetch)
upstream	https://github.com/fermyon/developer (push)
```

Once you are satisfied go ahead and push your changes:

<!-- @selectiveCpy -->

```bash
$ git push -u origin my_new_branch
```

### 10. Create a Pull Request

If you return to your GitHub repository in your browser, you will notice that a PR has automatically been generated for you.

Clicking on the green “Compare and pull request” button will allow you to add a title and description as part of the PR. 

![Compare and pull request](/static/image/compare_and_pull_request.png)

You can also add any information in the textbox provided below the title. For example, screen captures and/or code/console/terminal snippets of your contribution working correctly and/or tests passing etc.

Once you have finished creating your PR, please keep an eye on the PR; answering any questions as part of the collaboration process.

**Thank You**

Thanks for contributing.
