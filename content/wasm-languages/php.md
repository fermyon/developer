date = "2022-01-12T00:23:27Z"
title = "PHP in WebAssembly"
description = "PHP can be compiled to WebAssembly and run in the browser."
tags = ["PHP", "webassembly"]
template = "page_lang"
[extra]
author = "Fermyon Staff"

---

- [PHP in WebAssembly](#php-in-webassembly)
  - [Uses](#uses)
  - [Available Implementations](#available-implementations)
  - [Learn More](#learn-more)

# PHP in WebAssembly

PHP is a popular web scripting language.
So it is unsurprising that one PHP project attempts to make it possible to run PHP inside of the web browser.

There have been a few iterations of _PHP-in-Browser_ (PIB), but Sean Morris' [PHP-Wasm](https://github.com/seanmorris/php-wasm)
looks to be the most active.

## Uses

Right now, this is specific to the browser environment.
The implementation is impressive, as it contains a lot of PHP features such as
access to a database (SQLite) and file system access.

## Available Implementations

- [PHP-Wasm](https://github.com/seanmorris/php-wasm)
- The original version of PHP-In-Browser (PIB) was [Oraoto's version](https://oraoto.github.io/pib/)
- Another version of PIB is [Soyuka's fork](https://github.com/soyuka/php-wasm)
- [`wasm32-wasi` PHP releases](https://github.com/vmware-labs/webassembly-language-runtimes/releases?q=php&expanded=true) provided by the Wasm Labs team at VMware

## Learn More

Here are some great resources:

- Try it out [in-browser](https://seanmorris.github.io/php-wasm/)
- The [examples](https://github.com/seanmorris/php-wasm#examples) even include running Drupal 7!
- If you are looking for a way to run Wasm inside of PHP, [Wasmer has bindings](https://github.com/wasmerio/wasmer-php)
