# Fermyon WebAssembly Language Guide
title = "Readme"
published = false

---

- [Fermyon WebAssembly Language Guide](#fermyon-webassembly-language-guide)
  - [Contributions](#contributions)
    - [Adding New Languages](#adding-new-languages)
      - [Examples](#examples)
    - [Updating Existing Entries](#updating-existing-entries)
  - [License](#license)

This repository contains the Wasm Language Guide from Fermyon.com. You can see the published version at [https://developer.fermyon.com/wasm-languages/webassembly-language-support](https://developer.fermyon.com/wasm-languages/webassembly-language-support).

The content in this repo (including this page) are formatted to be served directly from [Bartholomew](https://github.com/fermyon/bartholomew).

## Contributions

We welcome contributors. To make changes or additions, create new pull requests against this repository.

The [content template](tpl.md) provides the scaffolding for adding a new language. The [About Examples](about-examples.md) explains how an example should work. (Examples are not required. But when provided, we like to keep them consistent.)

All community members must abide by the [Code of Conduct](https://www.fermyon.com/code-of-conduct)

### Adding New Languages

The guide is arranged to break down languages into three categories:

- Top Languages: This section is reserved for only the languages that trend into the [top RedMonk rankings](https://redmonk.com/sogrady/2021/08/05/language-rankings-6-21/).
- WebAssembly Languages: These are languages specifically built for WebAssembly. While we love research languages, we do require that languages in this category have reached certain stability levels as well as a moderate amount of usage.
- Other Notable Languages: This section is the most permissive. Usually, we focus on historically important languages, languages that didn't quite make the top 20, or languages that seem to be gaining momentum.

To add a new language, open a PR that includes a new language page (see `tpl.md` for a template) and also adds the language to either the _WebAssembly Languages_ or _Other Notable Languages_ section of the `wasm-language-support.md` page. Please adhere to the format we have provided. Uniformity is an important quality of entries.

#### Examples

We have chosen a very specific example, which is explained in `about-examples.md`. Specifically, we want examples that can execute in `wasmtime` (the reference implementation of the Bytecode Alliance and WASI work), and that can run as [Wagi](https://github.com/deislabs/wagi) modules. Wagi is an important testbed for two reasons:

1. Wagi only requires core Wasm and WASI support, and does not require any non-standard host runtime features
2. Fermyon's goal is to articulate how WebAssembly can run on the cloud, and Wagi is the easiest way to do so

While we appreciate that other runtimes offer their own APIs and features, we do not accept examples that are based on those features.

### Updating Existing Entries

We are always interested in updates to the content on language pages. We do have a few brief guidelines:

- *The pros and cons.* The tone of pros/cons is objective, oriented toward the developer, and friendly in tone. We will request changes on (or close) PRs that take a negative tone or attempt to use the pros/cons to air grievances or get really nit-picky.
- *Learn More:* Include new references, tutorials, or discussions that focus on compiling the language to WebAssembly or using WebAssembly-specific features in the language.
    - For example, we would welcome the addition of a link to an article entitled "Compiling a C++ app to WebAssembly".
    - While the text on the page should focus on core WebAssembly and WASI features, we allow linking off to browser, cloud, and specialty projects that support the language on the page.
- *Examples:* Read the previous section and the [About Examples](about-examples.md) document.

There are some pieces of information that we are not interested in:

- Whether a language _has a runtime_ for WebAssembly. We are not interested in "embedding a Wasm runtime in C++", for example.
- Non-language projects (like tools or other runtimes). In the future we might add a section for these. But for now, the guide is focused exclusively on languages.

## License

The contents of this repository are licensed under the [Creative Commons 4.0 Attribution Share-Alike license](https://creativecommons.org/licenses/by-sa/4.0/legalcode), usually abbreviated _cc4.0-by-sa_.