title = "Contributing"
template = "cloud_main"
date = "2022-01-01T00:00:01Z"
[extra]

---

To contribute to the Fermyon Cloud Documentation, please follow these steps.

## Fork the Repository

The first step is to fork the [developer repository](https://github.com/fermyon/developer), from Fermyon's GitHub, to your own GitHub account.

![Fork the repository](/static/image/fork_developer_repo.png)

Ensure that you are forking the developer repository **to your own** GitHub account; where you have full editing privileges.

## Clone the Fork

Copy the URL from the UI in readiness for running the `git clone` command.

![Fork the repository](/static/image/clone_developer_repo.png)

Go ahead and clone the new fork that you just created (the one which resides in your own GitHub account).

```bash
# Change into home directory
cd ~
# Clone
git clone git@github.com:yourusername/developer.git
cd developer
```

Create a new branch that will house all of your changes for this specific contribution:

```bash
git checkout -b my_new_branch
```

Create a new remote for the upstream (a pointer to the original repository to which you are contributing):

```bash
git remote add upstream https://github.com/fermyon/developer
```

Make changes to the source code. Once you are satisfied with your contribution, please ensure that your GitHub installation is configured sufficiently so that you can `--signoff` as part of the `git commit` command. For example, please ensure that the `user.name` and `user.email` are configured in your terminal. You can check if these are set by typing `git config --list`.

If you need to set these values please use the following commands:

```bash
git config user.name "yourusername"
git config user.email "youremail@somemail.com"
```

More information can be found at this GitHub documentation page called [signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

## Add Changes

Move to a top-level directory, under which your changes exist i.e. `cd ~/developer`.

Add your changes using the following command:

```bash
git add
```

## Commit Changes

Type the following commit command to ensure that you sign off (--signoff), sign the data (-S) - recommended, and also leave a short message (-m):

```bash
git commit -S --signoff -m "Updating documentation"
```

> Note: the `--signoff` option will only add a Signed-off-by trailer by the committer at the end of the commit log message. In addition to this, it is recommended that you use the `-S` option which will GPG-sign your commits. For more information about using GPG in GitHub see [this GitHub documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).

## Push Changes

At this stage, it is a good idea to just quickly check what GitHub thinks the origin is. For example, if we type `git remote -v` we can see that the origin is our repo; which we a) forked the original repo into and b) which we then cloned to our local disk so that we could edit:

```bash
git remote -v
````

The above command will return output similar to the following:

```bash
origin	git@github.com:yourusername/developer.git (fetch)
origin	git@github.com:yourusername/developer.git (push)
upstream	https://github.com/fermyon/developer (fetch)
upstream	https://github.com/fermyon/developer (push)
```

Once you are satisfied go ahead and push your changes

```bash
git push -u origin my_new_branch
```

## Create a Pull Request

If you return to your GitHub repository in your browser, you will notice that a PR has automatically been generated for you.

Clicking on the green “Compare and pull request” button will allow you to add a title and description as part of the PR. 

![Compare and pull request](/static/image/compare_and_pull_request.png)

You can also add any information in the textbox provided below the title. For example, screen captures and/or code/console/terminal snippets of your contribution working correctly and/or tests passing etc.

Once you have finished creating your PR, please keep an eye on the PR; answering any questions as part of the collaboration process.

## Thank You

Thanks for contributing.