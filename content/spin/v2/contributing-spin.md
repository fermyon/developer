title = "Contributing to Spin"
template = "spin_main"
date = "2023-11-04T01:00:00Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/contributing-spin.md"

---
- [Making Code Contributions to Spin](#making-code-contributions-to-spin)
- [Before You Commit](#before-you-commit)
- [Committing and Pushing Your Changes](#committing-and-pushing-your-changes)

We are delighted that you are interested in making Spin better! Thank you! This
document will guide you through making your first contribution to the project.
We welcome and appreciate contributions of all types — opening issues, fixing
typos, adding examples, one-liner code fixes, tests, or complete features.

First, any contribution and interaction on any Fermyon project MUST follow our
[code of conduct](https://www.fermyon.com/code-of-conduct). Thank you for being
part of an inclusive and open community!

If you plan on contributing anything complex, please go through the issue and PR
queues first to make sure someone else has not started working on it. If it
doesn't exist already, please open an issue so you have a chance to get feedback
from the community and the maintainers before you start working on your feature.

## Making Code Contributions to Spin

The following guide is intended to make sure your contribution can get merged as
soon as possible. First, make sure you have the following prerequisites
configured:

- [Rust](https://www.rust-lang.org/) at
  [1.68+](https://www.rust-lang.org/tools/install) with the `wasm32-wasi` and
  `wasm32-unknown-unknown` targets configured
  (`rustup target add wasm32-wasi && rustup target add wasm32-unknown-unknown`)
- [`rustfmt`](https://github.com/rust-lang/rustfmt) and
  [`clippy`](https://github.com/rust-lang/rust-clippy) configured for your Rust
  installation
- `make`
- if you are a VS Code user, we recommend the [`rust-analyzer`](https://rust-analyzer.github.io/) extension.
- please ensure you
  [configure adding a GPG signature to your commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)
  as well as appending a sign-off message (`git commit -S -s`)

Once you have set up the prerequisites and identified the contribution you want
to make to Spin, make sure you can correctly build the project:

<!-- @selectiveCpy -->

```bash
# clone the repository
$ git clone https://github.com/fermyon/spin && cd spin
# add a new remote pointing to your fork of the project
$ git remote add fork https://github.com/<your-username>/spin
# create a new branch for your work
$ git checkout -b <your-branch>

# build the Spin CLI
$ cargo build

# make sure compilation is successful
$ ./target/debug/spin --help

# run the tests and make sure they pass
$ make test
```

Now you should be ready to start making your contribution. To familiarize
yourself with the Spin project, please read the
[document about extending Spin](./extending-and-embedding.md). Since most of Spin is implemented in
Rust, we try to follow the common Rust coding conventions (keep an eye on the
recommendations from Clippy!). If applicable, add unit or integration tests to
ensure your contribution is correct.

## Before You Commit

* Format the code (`cargo fmt`)
* Run Clippy (`cargo clippy`)
* Run the `lint` task (`make lint`)
* Build the project and run the tests (`make test`)

Spin enforces lints and tests as part of continuous integration - running them locally will save you a round-trip to your pull request!

If everything works locally, you're ready to commit your changes.

## Committing and Pushing Your Changes

We require commits to be signed both with an email address and with a GPG signature.

> Because of the way GitHub runs enforcement, the GPG signature isn't checked until _after_ all tests have run.  Be sure to GPG sign up front, as it can be a bit frustrating to wait for all the tests and _then_ get blocked on the signature!

<!-- @selectiveCpy -->

```bash
$ git commit -S -s -m "<your commit message>"
```

> Some contributors like to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention for commit messages.

We try to only keep useful changes as separate commits — if you prefer to commit
often, please
[cleanup the commit history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
before opening a pull request.

Once you are happy with your changes you can push the branch to your fork:

<!-- @selectiveCpy -->

```bash
# "fork" is the name of the git remote pointing to your fork
$ git push fork
```

Now you are ready to create a pull request. Thank you for your contribution!
