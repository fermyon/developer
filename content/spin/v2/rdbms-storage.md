title = "Relational Database Storage"
template = "spin_main"
date = "2023-11-04T01:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/rdbms-storage.md"

---
- [Using MySQL and PostgreSQL From Applications](#using-mysql-and-postgresql-from-applications)
- [Granting Network Permissions to Components](#granting-network-permissions-to-components)

Spin provides two interfaces for relational (SQL) databases:

* A built-in [SQLite Database](./sqlite-api-guide), which is always available and requires no management on your part.
* "Bring your own database" support for MySQL and PostgreSQL, where you host and manage the database outside of Spin.

This page covers the "bring your own database" scenario.  See [SQLite Storage](./sqlite-api-guide) for the built-in service.

{{ details "Why do I need a Spin interface? Why can't I just use my language's database libraries?" "The current version of the WebAssembly System Interface (WASI) doesn't provide a sockets interface, so database libraries that depend on sockets can't be built to Wasm. The Spin interface means Wasm modules can bypass this limitation by asking Spin to make the database connection on their behalf." }}

## Using MySQL and PostgreSQL From Applications

The Spin SDK surfaces the Spin MySQL and PostgreSQL interfaces to your language. The set of operations is the same across both databases:

| Operation  | Parameters                 | Returns             | Behavior |
|------------|----------------------------|---------------------|----------|
| `open`     | address                    | connection resource | Opens a connection to the specified database. The host must be listed in `allowed_outbound_hosts`. Other operations must be called through a connection. |
| `query`    | statement, SQL parameters  | database records    | Runs the specified statement against the database, returning the query results as a set of rows. |
| `execute`  | statement, SQL parameters  | integer (not MySQL) | Runs the specified statement against the database, returning the number of rows modified by the statement.  (MySQL does not return the modified row count.) |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

MySQL functions are available in the `spin_sdk::mysql` module, and PostgreSQL functions in the `spin_sdk::pg` module. The function names match the operations above. This example shows MySQL:

```rust
use spin_sdk::mysql::{self, Connection, Decode, ParameterValue};

let connection = Connection::open(&address)?;

let params = vec![ParameterValue::Int32(id)];
let rowset = connection.query("SELECT id, name FROM pets WHERE id = ?", &params)?;

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

For full information about the MySQL and PostgreSQL APIs, see [the Spin SDK reference documentation](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/index.html).

{{ blockEnd }}

{{ startTab "TypeScript"}}

The JavaScript/TypeScript SDK doesn't surface the MySQL or PostgreSQL APIs. However, you can use hosted relational database services that are accessible over HTTP. For an example, see the JavaScript SDK repository on GitHub ([TypeScript](https://github.com/fermyon/spin-js-sdk/tree/main/examples/typescript/planetscale), [JavaScript](https://github.com/fermyon/spin-js-sdk/tree/main/examples/javascript/planetscale)).

{{ blockEnd }}

{{ startTab "Python"}}

The Python SDK doesn't currently surface the MySQL or PostgreSQL APIs.

{{ blockEnd }}

{{ startTab "TinyGo"}}

MySQL functions are available in the `github.com/fermyon/spin/sdk/go/v2/mysql` package, and PostgreSQL in `github.com/fermyon/spin/sdk/go/v2/pg`. [See Go Packages for reference documentation.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2)

The package follows the usual Go database API. Use `Open` to return a connection to the database of type `*sql.DB` - see the [Go standard library documentation](https://pkg.go.dev/database/sql#DB) for usage information.  For example:

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
	"github.com/fermyon/spin/sdk/go/v2/pg"
)

type Pet struct {
	ID        int64
	Name      string
	Prey      *string // nullable field must be a pointer
	IsFinicky bool
}

func init() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {

		// addr is the environment variable set in `spin.toml` that points to the
		// address of the Mysql server.
		addr := os.Getenv("DB_URL")

		db := pg.Open(addr)
		defer db.Close()

		_, err := db.Query("INSERT INTO pets VALUES ($1, 'Maya', $2, $3);", int32(4), "bananas", true)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		rows, err := db.Query("SELECT * FROM pets")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var pets []*Pet
		for rows.Next() {
			var pet Pet
			if err := rows.Scan(&pet.ID, &pet.Name, &pet.Prey, &pet.IsFinicky); err != nil {
				fmt.Println(err)
			}
			pets = append(pets, &pet)
		}
		json.NewEncoder(w).Encode(pets)
	})
}

func main() {}
```

{{ blockEnd }}

{{ blockEnd }}

## Granting Network Permissions to Components

By default, Spin components are not allowed to make outgoing network requests, including MySQL or PostgreSQL. This follows the general Wasm rule that modules must be explicitly granted capabilities, which is important to sandboxing. To grant a component permission to make network requests to a particular host, use the `allowed_outbound_hosts` field in the component manifest, specifying the host and allowed port:

```toml
[component.uses-db]
allowed_outbound_hosts = ["postgres://postgres.example.com:5432"]
```
