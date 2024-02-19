date = "2023-10-26T00:23:27Z"
title = "Prolog in WebAssembly"
description = "Prolog can be compiled to WebAssembly, and there are many supporting projects."
tags = ["language", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [Prolog in WebAssembly](#prolog-in-webassembly)
	- [Available Implementations](#available-implementations)
	- [Usage](#usage)
	- [Pros and Cons](#pros-and-cons)
	- [Example](#example)
	- [Learn More](#learn-more)

# Prolog in WebAssembly

<!--
A sentence or two about the language. Make sure to say whether it is scripting, compiled, etc.

The idea here should be to help a newcomer understand that, for example, Rust is a compiled systems language
while Python is a general purpose scripting language.
-->

[Prolog](https://prolog.readthedocs.io/) is a logic programming language with several different implementations.
Trealla Prolog is the one most frequently associated with WebAssembly.

## Available Implementations

<!--
List official implementations first, and other implementations as well.

Make sure to link to the website or repository
-->

* [Trealla Prolog](https://github.com/trealla-prolog/trealla) has Wasm and WASI support
* [Guregu's Trealla Prolog](https://github.com/guregu/trealla) was (I believe) the origin of Trealla's support
* [Trealla Spin](https://github.com/guregu/trealla-spin), also by [Guregu](https://github.com/guregu), adds a Spin SDK for Prolog

## Usage

<!--
This section should just talk about how this project is to be used.

For example, TinyGo might show how to compile to WASI
-->

The easiest way to use Trealla Prolog is with the Spin plugin. It will manage the Prolog runtime for you.

Install the Spin plugin:

```console
$ spin templates install --git https://github.com/guregu/trealla-spin --update
```

Otherwise, you can follow the installation and build instructions on the [Trealla Prolog](https://github.com/trealla-prolog/trealla) GitHub page.

## Pros and Cons

<!-- List out some pros and cons of this language vs others WHEN IT COMES TO WASM 

For example, might point out that the Swift runtime requires large binaries or that
an unofficial implementation lags behind the core language's feature set. Or might
point out really good tooling or performance.

-->
Things we like:

- It is super easy to use
- [A Spin SDK!](https://github.com/guregu/trealla-spin)

## Example

 Create a new app:

```console
$ spin new http-prolog hello-prolog --accept-defaults
```

Run the app:

```
$ cd hello-prolog
$ spin up

Logging component stdio to ".spin/logs/"
Storing default key-value data to ".spin/sqlite_key_value.db"

Serving http://127.0.0.1:3000
Available Routes:
  hello-prolog: http://127.0.0.1:3000 (wildcard)
```

Doing `spin up` fetches the prolog interpreter, so there is no `spin build` step.

The scaffolded code looks like this:

```prolog
:- use_module(library(spin)).

% See library/spin.pl for all the predicates built-in
% https://github.com/guregu/trealla/blob/main/library/spin.pl

%% http_handler(+Spec, +Headers, +Body, -Status)

http_handler(get("/", _QueryParams), _RequestHeaders, _RequestBody, 200) :-
	html_content,
	setup_call_cleanup(
		store_open(default, Store),
		(
			(  store_get(Store, counter, N0)
			-> true
			;  N0 = 0
			),
			succ(N0, N),
			store_set(Store, counter, N)
		),
		store_close(Store)
	),
	http_header_set("x-powered-by", "memes"),
	current_prolog_flag(dialect, Dialect),
	% stream alias http_body is the response body
	write(http_body, '<!doctype html><html>'),
	format(http_body, "<h1>Hello, ~a prolog!</h1>", [Dialect]),
	format(http_body, "Welcome, visitor #<b>~d!</b>", [N]),
	write(http_body, '</html>').

http_handler(get("/json", _), _, _, 200) :-
	wall_time(Time),
	% json_content({"time": Time}) works too
	json_content(pairs([string("time")-number(Time)])).
```

## Learn More

Here are some great resources:

<!-- 
Bullet list to things like blogs, projects, etc.
-->
- Using [Trella Prolog in Spin](https://github.com/guregu/trealla-spin)
- Also fun: Check out the PHP ([Prolog Home Page](https://github.com/guregu/php)) project!
