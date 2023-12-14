title = "SQLite Storage"
template = "spin_main"
date = "2023-11-04T00:00:01Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v2/sqlite-api-guide.md"

---
- [Granting SQLite Database Permissions to Components](#granting-sqlite-database-permissions-to-components)
- [Using SQLite Storage From Applications](#using-sqlite-storage-from-applications)
- [Preparing an SQLite Database](#preparing-an-sqlite-database)
- [Custom SQLite Databases](#custom-sqlite-databases)
  - [Granting Access to Custom SQLite Databases](#granting-access-to-custom-sqlite-databases)

Spin provides an interface for you to persist data in an SQLite Database managed by Spin. This database allows Spin developers to persist relational data across application invocations.

{{ details "Why do I need a Spin interface? Why can't I just use my own external database?" "You can absolutely still use your own external database either with the [MySQL or Postgres APIs](./rdbms-storage). However, if you're interested in quick, local relational storage without any infrastructure set-up then Spin's SQLite Database is a great option." }}

## Granting SQLite Database Permissions to Components

By default, a given component of an app will not have access to any SQLite Databases. Access must be granted specifically to each component via the component manifest.  For example, a component could be given access to the default store using:

```toml
[component.example]
sqlite_databases = ["default"]
```

> Note: To deploy your Database application to Fermyon Cloud using `spin cloud deploy`, see the [SQLite Database](/cloud/noops-sql-db#accessing-private-beta) section in the documentation. It covers signing up for the private beta and setting up your Cloud database tables and initial data.

## Using SQLite Storage From Applications

The Spin SDK surfaces the Spin SQLite Database interface to your language.

The set of operations is common across all SDKs:

| Operation  | Parameters | Returns | Behavior |
|------------|------------|---------|----------|
| `open`  | name | connection  | Open the database with the specified name. If `name` is the string "default", the default database is opened, provided that the component that was granted access in the component manifest from `spin.toml`. Otherwise, `name` must refer to a store defined and configured in a [runtime configuration file](./dynamic-configuration.md#sqlite-storage-runtime-configuration) supplied with the application.|
| `execute` | connection, sql, parameters | database records | Executes the SQL statement and returns the results of the statement. SELECT statements typically return records or scalars. INSERT, UPDATE, and DELETE statements typically return empty result sets, but may return values in some cases. The `execute` operation recognizes the [SQLite dialect of SQL](https://www.sqlite.org/lang.html). |
| `close` | connection | - | Close the specified `connection`. |

The exact detail of calling these operations from your application depends on your language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

Please note, we use `serde` in this Rust example, so please add `serde` as a dependency in your application's `Cargo.toml` file:

```toml
[dependencies]
serde = {version = "1.0", features = ["derive"]}
serde_json = "1.0"
```

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/rust-docs/spin/main/spin_sdk/sqlite/index.html)

SQLite functions are available in the `spin_sdk::sqlite` module. The function names match the operations above. For example:

```rust
use anyhow::Result;
use serde::Serialize;
use spin_sdk::{
    http::{Request, Response, IntoResponse},
    http_component,
    sqlite::{Connection, Value},
};

#[http_component]
fn handle_request(req: Request) -> Result<impl IntoResponse> {
    let connection = Connection::open_default()?;

    let execute_params = [
        Value::Text("Try out Spin SQLite".to_owned()),
        Value::Text("Friday".to_owned()),
    ];
    connection.execute(
        "INSERT INTO todos (description, due) VALUES (?, ?)",
        execute_params.as_slice(),
    )?;

    let rowset = connection.execute(
        "SELECT id, description, due FROM todos",
        &[]
    )?;

    let todos: Vec<_> = rowset.rows().map(|row|
        ToDo {
            id: row.get::<u32>("id").unwrap(),
            description: row.get::<&str>("description").unwrap().to_owned(),
            due: row.get::<&str>("due").unwrap().to_owned(),
        }
    ).collect();

    let body = serde_json::to_vec(&todos)?;
    Ok(Response::builder()
        .status(200)
        .header("content-type", "text/plain")
        .body(body)
        .build())
}

// Helper for returning the query results as JSON
#[derive(Serialize)]
struct ToDo {
    id: u32,
    description: String,
    due: String,
}
```

**General Notes** 
* All functions are on the `spin_sdk::sqlite::Connection` type.
* Parameters are instances of the `Value` enum; you must wrap raw values in this type.
* The `execute` function returns a `QueryResult`. To iterate over the rows use the `rows()` function. This returns an iterator; use `collect()` if you want to load it all into a collection.
* The values in rows are instances of the `Value` enum.  However, you can use `row.get(column_name)` to extract a specific column from a row.  `get` casts the database value to the target Rust type. If the compiler can't infer the target type, write `row.get::<&str>(column_name)` (or whatever the desired type is).
* All functions wrap the return in `Result`, with the error type being `spin_sdk::sqlite::Error`.

{{ blockEnd }}

{{ startTab "Typescript"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/spin-js-sdk/variables/Sqlite.html)

To use SQLite functions, use [the `Sqlite.open` or `Sqlite.openDefault` function](https://fermyon.github.io/spin-js-sdk/variables/Sqlite.html) to obtain [a `SqliteStore` object](https://fermyon.github.io/spin-js-sdk/interfaces/_internal_.SqliteStore.html). `SqliteStore` provides the `execute` method as described above. For example:

```javascript
import {Sqlite} from "@fermyon/spin-sdk"

const conn = Sqlite.openDefault();
const result = conn.execute("SELECT * FROM todos WHERE id > (?);", [1]);
const json = JSON.stringify(result.rows);
```

**General Notes**
* The `spinSdk` object is always available at runtime. Code checking and completion are available in TypeScript at design time if the module imports anything from the `@fermyon/spin-sdk` package.
* Parameters are JavaScript values (numbers, strings, byte arrays, or nulls). Spin infers the underlying SQL type.
* The `execute` function returns an object with `rows` and `columns` properties. `columns` is an array of strings representing column names. `rows` is an array of rows, each of which is an array of JavaScript values (as above) in the same order as `columns`.
* The `SqliteStore` object doesn't surface the `close` function.
* If a Spin SDK function fails, it throws an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

{{ blockEnd }}

{{ startTab "Python"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://fermyon.github.io/spin-python-sdk/spin_sqlite.html)

To use SQLite functions, use the `spin_sqlite` module in the Python SDK. The [`sqlite_open`](https://fermyon.github.io/spin-python-sdk/spin_sqlite.html#spin_sdk.spin_sqlite.sqlite_open) and [`sqlite_open_default`](https://fermyon.github.io/spin-python-sdk/spin_sqlite.html#spin_sdk.spin_sqlite.sqlite_open_default) functions return a [connection object](https://fermyon.github.io/spin-python-sdk/spin_sqlite.html#spin_sdk.spin_sqlite.SqliteConnection). The connection object provides the [`execute` method](https://fermyon.github.io/spin-python-sdk/spin_sqlite.html#spin_sdk.spin_sqlite.SqliteConnection.execute) as described above. For example:

```python
from spin_http import Response
from spin_sqlite import sqlite_open_default

def handle_request(request):
    conn = sqlite_open_default()
    result = conn.execute("SELECT * FROM todos WHERE id > (?);", [1])
    rows = result.rows()
    return Response(200,
                    {"content-type": "application/json"},
                    bytes(str(rows), "utf-8"))
```

**General Notes**
* Parameters are Python values (numbers, strings, and lists). Spin infers the underlying SQL type.
* The `execute` method returns [a `QueryResult` object](https://fermyon.github.io/spin-python-sdk/spin_sqlite.html#spin_sdk.spin_sqlite.QueryResult) with `rows` and `columns` methods. `columns` returns a list of strings representing column names. `rows` is an array of rows, each of which is an array of Python values (as above) in the same order as `columns`.
* The connection object doesn't surface the `close` function.
* Errors are surfaced as exceptions.

{{ blockEnd }}

{{ startTab "TinyGo"}}

> [**Want to go straight to the reference documentation?**  Find it here.](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/v2@v2.0.0/sqlite)

The Go SDK is implemented as a driver for the standard library's [database/sql](https://pkg.go.dev/database/sql) interface.

```go
package main

import (
	"encoding/json"
	"net/http"

	spinhttp "github.com/fermyon/spin/sdk/go/v2/http"
	"github.com/fermyon/spin/sdk/go/v2/sqlite"
)

type Todo struct {
	ID          string
	Description string
	Due         string
}

func init() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
		db := sqlite.Open("default")
		defer db.Close()

		_, err := db.Exec("INSERT INTO todos (description, due) VALUES (?, ?)", "Try out Spin SQLite", "Friday")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		rows, err := db.Query("SELECT id, description, due FROM todos")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var todos []*Todo
		for rows.Next() {
			var todo Todo
			if err := rows.Scan(&todo.ID, &todo.Description, &todo.Due); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			todos = append(todos, &todo)
		}
		json.NewEncoder(w).Encode(todos)
	})
}

func main() {}
```

**General Notes**

A convenience function `sqlite.Open()` is provided to create a database connection. Because the `http.Handle` function is inside the `init()` function the Spin SQLite driver cannot be initialized the same way as other drivers using [sql.Open](https://pkg.go.dev/database/sql#Open).

{{ blockEnd }}

{{ blockEnd }}

## Preparing an SQLite Database

Although Spin provides SQLite as a built-in database, SQLite still needs you to create its tables.  In most cases, the most convenient way to do this is to use the `spin up --sqlite` option to run whatever SQL statements you need before your application starts.  This is typically used to create or alter tables, but can be used for whatever other maintenance or troubleshooting tasks you need.

You can run a SQL script from a file using the `@filename` syntax:

<!-- @nocpy -->

```bash
spin up --sqlite @migration.sql
```

Or you can pass SQL statements directly on the command line as a (quoted) string:

<!-- @nocpy -->

```bash
spin up --sqlite "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, due TEXT NOT NULL)"
```

As with runtime operations, this flag uses the [SQLite dialect of SQL](https://www.sqlite.org/lang.html).

You can provide the `--sqlite` flag more than once; Spin runs the statements (or files) in the order you provide them, and waits for each to complete before running the next.

> It's also possible to create tables from your Wasm components using the usual `execute` function. That can end up mingling your "hot path" application logic with database maintenance code; decide which approach is best based on your application's needs.

## Custom SQLite Databases

Spin defines a database named `"default"` and provides automatic backing storage.  If you need to customize Spin with additional databases, or to change the backing storage for the default database, you can do so via the `--runtime-config-file` flag and the `runtime-config.toml` file.  See [SQLite Database Runtime Configuration](./dynamic-configuration#sqlite-storage-runtime-configuration) for details.

### Granting Access to Custom SQLite Databases

As mentioned above, by default, a given component of an app will not have access to any SQLite Databases. Access must be granted specifically to each component via the component manifest, using the `component.sqlite_databases` field in the manifest.

Components can be given access to different databases, and may be granted access to more than one database. For example:

```toml
# c1 has no access to any databases
[component.example]
name = "c1"

# c2 can use the default database, but no custom databases
[component.example]
name = "c2"
sqlite_databases = ["default"]

# c3 can use the custom databases "marketing" and "sales", which must be
# defined in the runtime config file, but cannot use the default database
[component.example]
name = "c3"
sqlite_databases = ["marketing", "sales"]
```
