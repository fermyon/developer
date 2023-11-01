title = "Creating Spin templates"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/template-authoring"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/template-authoring.md"

---
- [Authoring the Content](#authoring-the-content)
- [Authoring the Manifest](#authoring-the-manifest)
- [Supporting `spin add`](#supporting-spin-add)
- [Hosting Templates in Git](#hosting-templates-in-git)

Spin templates allow a Spin developer to quickly create the skeleton of an
application or component, ready for the application logic to be filled in.

A template consists of two directories, `content` and `metadata`.

* The `content` directory contains all the files you'd like to be copied into
  the Spin application directory, such as source code, the `spin.toml` file,
  standard assets, precompiled modules, etc.  These files can contain placeholders
  so the user of the template can customise the end result.
* The `metadata` directory contains the files the control how the template is
  instantiated.  In this version of Spin, the only file in this directory
  should be the _template manifest_.

For examples of the directory contents, see the `templates` directory in the
[Spin GitHub repository](https://github.com/fermyon/spin).

Templates must always be shared in a `templates` directory.  This allows the
installer to locate them in repos that contain other content.

## Authoring the Content

Copy all the files that you want to be copied as part of the template into
the `content` directory. If you do nothing more, they will be copied
verbatim. Often, though, you'll want to allow the user to put their own
values in - for example, a project name, or an HTTP route.

To do this, replace the text you want the user to be able to substitute
with an expression of the form `{{parameter-name}}`, where `parameter-name`
is an identifier of your choice.  **You will need to add an entry to
the manifest matching this name** - see below.

You can reuse a parameter in more than one place - it will be prompted only once and will get the same value in each place.

You can also transform the user value by specifying a filter after a bar:
`{{parameter-name | filter-name}}`.  This is particularly useful when you
want to conform to specific language conventions. The following filters
are supported:

| Name          | Effect |
|---------------|--------|
| `kebab_case`  | Transforms input into kebab case, e.g. `My Application` to `my-application` |
| `snake_case`  | Transforms input into snake case, e.g. `My Application` to `my_application` |
| `pascal_case` | Transforms input into Pascal case, e.g. `my appplication` to `MyApplication` |

## Authoring the Manifest

The template manifest is a TOML file. It must be named `spin-template.toml`:

<!-- @nocpy -->

```toml
manifest_version = "1"
id = "my-application"
description = "An application"
tags = ["my-tag"]

[parameters]
# Example parameter
project-name = { type = "string", prompt = "Project name" }
```

* `manifest_version` specifies the format this manifest follows. It must be `"1"`.
* `id` is however you want users to refer to your template in `spin new`.
  It may contain letters, digits, hypens and underscores.
* `description` is optional. It is shown when displaying the template.
* `tags` is optional. These are used to enable discoverability via the Spin CLI.
  For example, `spin new --tag my-tag` will prompt selection for a template containing `"my-tag"`.

The `parameters` table is where you list the placeholders that you edited
into your content for the user to substitute. You should include an entry
for each parameter. The key is the parameter name, and the value a JSON
document that contains at minimum a `type` and `prompt`.  `type` must
currently be `string`.  `prompt` is displayed when prompting the user
for the value to substitute.

The document may also have a `default`, which will be displayed to the user
and can be accepted by pressing Enter. It may also specify constraints
on what the user is allowed to enter. The following constraints are
supported:

| Key           | Value and usage |
|---------------|-----------------|
| `pattern`     | A regular expression. The user input must match the regular expression to be accepted. |

## Supporting `spin add`

The `spin add` command lets users add your template as a new component in
an existing application. If you'd like to support this, you'll need to
add a few items to your metadata.

* In the `metadata` directory, create a folder named `snippets`. In that
  folder, create a file containing the (templated) manifest _just_ for the
  component to be added.
  * Don't include any application-level entries, just the component section.
  * If your template contains component files, remember they will be copied
    into a subdirectory, and make sure any paths reflect that.
* In the `spin-template.toml` file, add a table called `add_component`, with
  the following entries:

| Key             | Value and usage |
|-----------------|-----------------|
| `snippets`      | A subtable with an entry named `component`, whose value is the name of the file containing the component manifest template. (Don't include the `snippets` directory prefix - Spin knows to look in the `snippets` directory.) |
| `skip_files`    | Optional array of content files that should _not_ be copied when running in "add component" mode. For example, if your template contains a `spin.toml` file, you should use this setting to exclude that, because you want to add a new entry to the existing file, not overwrite it. |
| `skip_parameters` | Optional array of parameters that Spin should _not_ prompt for when running in "add component" mode. For example, the HTTP templates don't prompt for the base path, because that's defined at the application level, not set on an individual component. |

Here is an example `add_component` table from a HTTP template:

<!-- @nocpy -->

```toml
[add_component]
skip_files = ["spin.toml"]
skip_parameters = ["http-base"]
[add_component.snippets]
component = "component.txt"
```

> For examples from the Spin project, see `http-rust` (can be used in both`spin new` and `spin add`) and `static-fileserver` (`spin add` only).

## Hosting Templates in Git

You can publish templates in a Git repo.  The templates must be in the `/templates`
directory, with a subdirectory per template.

When a user installs templates from your repo, by default Spin looks for a tag
to identify a compatible version of the templates.  This tag is of the
form `spin/templates/vX.Y`, where X is the major version, and Y the minor
version, of the user's copy of Spin. For example, if the user is on
Spin 0.3.1, templates will be installed from `spin/templates/v0.3`.  If this
tag does not exist, Spin installs templates from `HEAD`.
