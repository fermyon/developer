title = "Contributing to Spin"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v3/contributing-spin.md"

---
- [Developer Community Calls](#developer-community-calls)
- [Code of Conduct](#code-of-conduct)
- [Making Code Contributions to Spin](#making-code-contributions-to-spin)
- [Before You Commit](#before-you-commit)
- [Committing and Pushing Your Changes](#committing-and-pushing-your-changes)

We are delighted that you are interested in making Spin better! Thank you!

This document will guide you through making your first contribution to the project.
We welcome and appreciate contributions of all types — opening issues, fixing
typos, adding examples, one-liner code fixes, tests, or complete features.


## Developer Community Calls

<div style="display: block" align="left">
  <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-recent-active-contributors/thumbnail.png?repo_id=423679664&limit=30&image_size=auto&color_scheme=dark" width="655" height="auto">
  <img alt="Active Contributors of fermyon/spin - Last 28 days" src="https://next.ossinsight.io/widgets/official/compose-recent-active-contributors/thumbnail.png?repo_id=423679664&limit=30&image_size=auto&color_scheme=light" width="655" height="auto">
</div>

>> _Recent contributors to Spin, past 30 days. Widget courtesy of <a href="https://next.ossinsight.io/widgets/official/compose-recent-active-contributors?repo_id=423679664&limit=30">OSSinsight.io</a>._

<strong>Each Monday</strong> at 2:30pm UTC and 9:00pm UTC (alternating), we meet to discuss Spin issues, roadmap, and ideas in our Spin Project Meetings. The Spin Project follows an [open planning process](https://www.fermyon.com/blog/moving-to-a-fully-open-planning-process-for-the-spin-project) - anyone who is interested is welcome to join the discussion. [Subscribe to this Google Calendar](https://calendar.google.com/calendar/u/1?cid=c3Bpbi5tYWludGFpbmVyc0BnbWFpbC5jb20) for meeting dates.

The [Spin Project Meeting Agenda is a public document](https://docs.google.com/document/d/1EG392gb8Eg-1ZEPDy18pgFZvMMrdAEybpCSufFXoe00/edit?usp=sharing). The document contains a rolling agenda with the date and time of each meeting, the Zoom link, and topics of discussion for the day. You will also find the meeting minutes for each meeting and the link to the recording. If you have something you would like to demo or discuss at the project meeting, we encourage you to add it to the agenda.

## Code of Conduct

First, any contribution and interaction on the Spin project MUST follow our
[code of conduct](https://github.com/fermyon/spin/blob/main/CODE_OF_CONDUCT.md). Thank you for being
part of an inclusive and open community!

If you plan on contributing anything complex, please go through the issue and PR
queues first to make sure someone else has not started working on it. If it
doesn't exist already, please open an issue so you have a chance to get feedback
from the community and the maintainers before you start working on your feature.

## Making Code Contributions to Spin

The following guide is intended to make sure your contribution can get merged as
soon as possible. First, make sure you have Rust installed.

![Rust Version](https://img.shields.io/badge/dynamic/toml?url=https%3A%2F%2Fraw.githubusercontent.com%2Ffermyon%2Fspin%2Fmain%2FCargo.toml&query=$[%27workspace%27][%27package%27][%27rust-version%27]&label=Rust%20Version&logo=Rust&color=orange)

After [installing Rust](https://www.rust-lang.org/tools/install) please ensure the `wasm32-wasip1` and
  `wasm32-unknown-unknown` targets are configured. For example:
  
```bash
rustup target add wasm32-wasip1 && rustup target add wasm32-unknown-unknown
```

In addition, make sure you have the following prerequisites configured:

- [`rustfmt`](https://github.com/rust-lang/rustfmt)
- [`clippy`](https://github.com/rust-lang/rust-clippy) 
- `make`
- [`rust-analyzer`](https://rust-analyzer.github.io/) extension (for Visual Studio Code users)
- [GPG signature verification for your GitHub commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) and remember to use a sign-off message (`git commit -S -s`) on each of your commits

Once you have set up the prerequisites and identified the contribution you want to make to Spin, make sure you can correctly build the project:

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

> Some contributors like to follow the [Conventional Commits](https://github.com/conventional-commits) convention for commit messages.

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
