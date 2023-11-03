title = "Managing Templates"
template = "spin_main"
date = "2023-11-04T01:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/managing-templates.md"

---
- [Installing Templates](#installing-templates)
  - [Installing From the Spin Git Repository](#installing-from-the-spin-git-repository)
  - [Installing From a Specific Branch](#installing-from-a-specific-branch)
  - [Installing From a Local Directory](#installing-from-a-local-directory)
- [Viewing Your Installed Templates](#viewing-your-installed-templates)
- [Uninstalling Templates](#uninstalling-templates)
- [Upgrading Templates](#upgrading-templates)
  - [Upgrading Templates From a Local Directory](#upgrading-templates-from-a-local-directory)
- [Next Steps](#next-steps)

Templates are a Spin tool for scaffolding new applications and components. You can use them via the `spin new` and `spin add` commands. For more information about creating applications with templates, see [Writing Spin Applications](writing-apps).

## Installing Templates

> This section covers general principles for installing templates. For information about installing templates for specific languages, see [Writing Spin Applications](writing-apps).

To install templates, use the `spin templates install` command. You can install templates from a Git repository, or while [authoring templates](template-authoring) you can install them from a local directory.

### Installing From the Spin Git Repository

To install templates from the Spin Git repository, run `spin templates install --git`.

<!-- @selectiveCpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin
```

The above command installs _all_ templates in the repository.

> Language SDKs often ship templates in their repositories; see the relevant language guide to find out where to get its templates.

### Installing From a Specific Branch

By default, if you install templates from a Git repository, Spin tries to find a repo tag that matches the version of Spin, and installs from that tag.  Failing this, it installs from `HEAD`.  If you would like to install from a specific tag or branch, pass the `--branch` option:

<!-- @nocpy -->

```bash
$ spin templates install --git https://github.com/fermyon/spin --branch spin/templates/v0.8
```

### Installing From a Local Directory

To install templates from your local file system, run `spin templates install --dir`.

> The directory you pass must be one that _contains_ a `templates` directory.  Don't pass the `templates` directory itself!

<!-- @nocpy -->

```bash
# Expects to find a directory ~/dev/spin-befunge-sdk/templates
$ spin templates install --dir ~/dev/spin-befunge-sdk
```

See [Template Authoring](template-authoring) for more details on this layout.

## Viewing Your Installed Templates

To see what templates you have installed, run `spin templates list`.

You can use the `--verbose` option to see additional information such as where they were installed from.

## Uninstalling Templates

You can uninstall templates using `spin templates uninstall` with the template name:

<!-- @nocpy -->

```bash
$ spin templates uninstall redis-befunge
```

> Spin doesn't currently support uninstalling a whole repo-worth of templates, only individual templates.

## Upgrading Templates

When you upgrade Spin, you will typically want to upgrade your templates to match.  This means new applications and components will get dependencies that match the Spin version you are using.  To do this, run `spin templates upgrade`:

<!-- @selectiveCpy -->

```bash
$ spin templates upgrade
Select repos to upgrade. Use Space to select/deselect and Enter to confirm selection.
  [x] https://github.com/fermyon/spin-python-sdk
  [ ] https://github.com/fermyon/spin (at spin/templates/v1.0)
> [x] https://github.com/fermyon/spin-js-sdk
```

Use the cursor keys and the space bar to select the repositories you want to upgrade, then hit Enter to upgrade the selected repositories.

> Upgrading happens at the repo level, not the individual template level.  If you've uninstalled templates, upgrading the repo they came from will bring them back.

If you want to upgrade _all_ repositories without being prompted, run `spin templates upgrade --all`.

As mentioned above, if you want to check which templates come from which repositories use `--verbose` i.e. `spin templates list --verbose`.

### Upgrading Templates From a Local Directory

`spin templates upgrade` only upgrades from Git repositories.  If you want to upgrade and your templates are in a local directory, run the `spin templates install` command with the `--upgrade` flag:

<!-- @nocpy -->

```bash
$ spin templates install --dir ~/dev/spin-befunge-sdk --upgrade
```

## Next Steps

- [Install the templates for your language](quickstart)
- [Use your language templates to create an application](writing-apps)