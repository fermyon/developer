title = "Contributing to Docs"
template = "common_main"
date = "2022-01-01T00:00:01Z"
[extra]

---

To contribute to the Fermyon Cloud Documentation, please follow these steps.

- [1. Fork the Repository](#1-fork-the-repository)
- [2. Clone the Fork](#2-clone-the-fork)
- [3. Create New Branch](#3-create-new-branch)
- [4. Add Upstream](#4-add-upstream)
- [5. Code Blocks and Annotations](#5-code-blocks-and-annotations)
- [6. Check Content](#6-check-content)
- [7. Add Changes](#7-add-changes)
- [8. Commit Changes](#8-commit-changes)
- [9. Push Changes](#9-push-changes)
- [10. Create a Pull Request](#10-create-a-pull-request)

## 1. Fork the Repository

The first step is to fork the [developer repository](https://github.com/fermyon/developer), from Fermyon's GitHub, to your own GitHub account.

![Fork the repository](/static/image/fork_developer_repo.png)

Ensure that you are forking the developer repository **to your own** GitHub account; where you have full editing privileges.

## 2. Clone the Fork

Copy the URL from the UI in readiness for running the `git clone` command.

![Fork the repository](/static/image/clone_developer_repo.png)

Go ahead and clone the new fork that you just created (the one which resides in your own GitHub account):

<!-- @selectiveCpy -->

```bash
$ cd ~
$ git clone git@github.com:yourusername/developer.git
$ cd developer
```

## 3. Create New Branch

Create a new branch that will house all of your changes for this specific contribution:

<!-- @selectiveCpy -->

```bash
$ git checkout -b my_new_branch
```

## 4. Add Upstream

Create a new remote for the upstream (a pointer to the original repository to which you are contributing):

<!-- @selectiveCpy -->

```bash
$ git remote add upstream https://github.com/fermyon/developer
```

## 5. Code Blocks and Annotations

It is highly recommended that you use either the `<!-- @selectiveCpy -->` or the `<!-- @nocpy -->` annotation before each of your code blocks, and that each code block defines the appropriate [syntax highlighting](https://rdmd.readme.io/docs/code-blocks#language-support). The annotation can be skipped for code blocks with example code snippets i.e. non-terminal or generic output examples.

The selective copy annotation (`<!-- @selectiveCpy -->`) is intended for use when communicating code and/or CLI commands for the reader to copy and paste. The selective copy annotation allows the reader to see the entire code block (both commands and results) but only copies the lines that start with `$` into the readers clipboard (minus the `$`) when the user clicks the copy button. For example, copying the following code block will only copy `echo "hello"` into your clipboard, for pasting.

```bash
$ echo "hello"
hello
```

> Note: If the command, that starts with `$`, is deliberately spread over two lines (by escaping the newline character), then the copy mechanism will still copy the second line which is technically still part of that single command.

The no copy annotation (`<!-- @nocpy -->`) preceeds a code block where no copy and pasting of code is intended. If using the no copy attribute please still be sure to add the appropriate syntax highliting to your code block (for display purposes).

## 6. Check Content

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

## 7. Add Changes

Once your changes have been checked, go ahead and add your changes by moving to a top-level directory, under which your changes exist i.e. `cd ~/developer`.

Add your changes by running the following command, from the root of the developer repository:

<!-- @selectiveCpy -->

```bash
$ git add
```

## 8. Commit Changes

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

## 9. Push Changes

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

## 10. Create a Pull Request

If you return to your GitHub repository in your browser, you will notice that a PR has automatically been generated for you.

Clicking on the green “Compare and pull request” button will allow you to add a title and description as part of the PR. 

![Compare and pull request](/static/image/compare_and_pull_request.png)

You can also add any information in the textbox provided below the title. For example, screen captures and/or code/console/terminal snippets of your contribution working correctly and/or tests passing etc.

Once you have finished creating your PR, please keep an eye on the PR; answering any questions as part of the collaboration process.

**Thank You**

Thanks for contributing.