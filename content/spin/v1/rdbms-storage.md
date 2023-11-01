title = "Relational Database Storage"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
enable_shortcodes = true
[extra]
canonical_url = "https://developer.fermyon.com/spin/v2/rdbms-storage"
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/rdbms-storage.md"

---
- [Using MySQL and PostgreSQL From Applications](#using-mysql-and-postgresql-from-applications)

Spin provides two interfaces for relational (SQL) databases:

* A built-in [SQLite database](./sqlite-api-guide), which is always available and requires no management on your part.
* "Bring your own database" support for MySQL and PostgreSQL, where you host and manage the database outside of Spin.

This page covers the "bring your own database" scenario.  See [SQLite Storage](./sqlite-api-guide) for the built-in service.

{{ details "Why do I need a Spin interface? Why can't I just use my language's database libraries?" "The current version of the WebAssembly System Interface (WASI) doesn't provide a sockets interface, so database libraries that depend on sockets can't be built to Wasm. The Spin interface means Wasm modules can bypass this limitation by asking Spin to make the database connection on their behalf." }}

## Using MySQL and PostgreSQL From Applications

The Spin SDK surfaces the Spin MySQL and PostgreSQL interfaces to your language. The set of operations is the same across both databases:

| Operation  | Parameters                          | Returns             | Behavior |
|------------|-------------------------------------|---------------------|----------|
| `query`    | address, statement, SQL parameters  | database records    | Runs the specified statement against the database, returning the query results as a set of rows. |
| `execute`  | address, statement, SQL parameters  | integer (not MySQL) | Runs the specified statement against the database, returning the number of rows modified by the statement.  (MySQL does not return the modified row count.) |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

MySQL functions are available in the `spin_sdk::mysql` module, and PostgreSQL functions in the `spin_sdk::pg` module. The function names match the operations above. This example shows MySQL:

```rust
use spin_sdk::mysql::{self, Decode, ParameterValue};

let params = vec![ParameterValue::Int32(id)];
let rowset = mysql::query(&address, "SELECT id, name FROM pets WHERE id = ?", &params)?;

match rowset.rows.first() {
    None => /* no rows matched query */,
    Some(row) => {
        let name = String::decode(&row[1])?;
    }
}
```

**Notes**

* Parameters are instances of the `ParameterValue` enum; you must wrap raw values in this type.
* A row is a vector of the `DbValue` enum. Use the `Decode` trait to access conversions to common types.
* Using PostgreSQL works in the same way, except that you `use` the `spin_sdk::pg` module instead of `spin_sdk::mysql`.
* Modified row counts are returned as `u64`. (MySQL `execute` does not return the modified row count.)
* All functions wrap the return in `anyhow::Result`.

You can find complete examples for using relational databases in the Spin repository on GitHub ([MySQL](https://github.com/fermyon/spin/tree/main/examples/rust-outbound-mysql), [PostgreSQL](https://github.com/fermyon/spin/tree/main/examples/rust-outbound-pg)).

{{ blockEnd }}

{{ startTab "TypeScript"}}

The JavaScript/TypeScript SDK doesn't surface the MySQL or PostgreSQL APIs. However, you can use hosted relational database services that are accessible over HTTP. For an example, see the JavaScript SDK repository on GitHub ([TypeScript](https://github.com/fermyon/spin-js-sdk/tree/main/examples/typescript/planetscale), [JavaScript](https://github.com/fermyon/spin-js-sdk/tree/main/examples/javascript/planetscale)).

{{ blockEnd }}

{{ startTab "Python"}}

The Python SDK doesn't currently surface the MySQL or PostgreSQL APIs.

{{ blockEnd }}

{{ startTab "TinyGo"}}

The Go SDK doesn't currently surface the MySQL or PostgreSQL APIs.

{{ blockEnd }}

{{ blockEnd }}
