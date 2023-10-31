title = "Application Variables"
template = "spin_main"
date = "2022-06-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/v1/variables.md"

---
- [Adding Variables to Your Applications](#adding-variables-to-your-applications)
- [Using Variables From Applications](#using-variables-from-applications)

Spin supports dynamic application variables. Instead of being static, their values can be updated without modifying the application, creating a simpler experience for rotating secrets, updating API endpoints, and more. 

These variables are defined in a Spin application manifest (in the `[variables]` section), and their values can be set or overridden at runtime by an [application variables provider](./dynamic-configuration.md#application-variables-runtime-configuration). When running Spin locally, the variables provider can be Hashicorp Vault for secrets, or host environment variables.

For information about configuring application variables providers, refer to the [dynamic configuration documentation](./dynamic-configuration.md#application-variables-runtime-configuration).

## Adding Variables to Your Applications

Variables are added to an application under the top-level `[variables]` section of an application manifest (`spin.toml`). Each entry must either have a default value or be marked as `required = true`. “Required” entries must be [provided](./dynamic-configuration#application-variables-runtime-configuration) with a value. 

For example, say an application needs to access a secret. A `[variables]` section could be added to an application's manifest with one entry for a variable named `secret`. Since there is no reasonable default value for a secret, the variable is set as required with `required = true`:

<!-- @nocpy -->

```toml
# Add this above the [component] section
[variables]
secret = { required = true }
```

Variables are surfaced to a specific component by adding a `[component.config]` section to the component and referencing them within it. The `[component.config]` section contains a mapping of component variables and values. Entries can be static (like `api_host` below) or reference an updatable application variable (like `password` below) using [mustache](https://mustache.github.io/)-inspired string templates. Only components that explicitly use variables in their configuration section will get access to them. This enables only exposing variables (such as secrets) to the desired components of an application.

<!-- @nocpy -->

```toml
# Add this below the [component.build] section
[component.config]
password = "\{{ secret }}"
api_host = "https://my-api.com"
```

When a component configuration variable references an application variable, it's value will dynamically update as the application variable changes. For example, if the `secret` variable is provided using the [Spin Vault provider](./dynamic-configuration.md#vault-application-variable-provider), it can be updated by changing the value in HashiCorp Vault. The next time the component gets the value of `password`, the latest value of `secret` will be returned by the provider. See the [next section](#using-variables-from-applications) to learn how to use Spin's configuration SDKs to get configuration variables within applications.

A complete application manifest with a `secret` variable and a component that uses it would look similar to the following, with the `[component.build]` section varying depending on the language used to build the `password_checker` component:

<!-- @nocpy -->

```toml
spin_manifest_version = "1"
description = "A Spin app with a dynamically updatable secret"
name = "password_checker"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[variables]
secret = { required = true }

[[component]]
id = "password_checker"
source = "app.wasm"
[component.trigger]
route = "/..."
[component.build]
command = "spin py2wasm app -o app.wasm"
[component.config]
password = "\{{ secret }}"
api_host = "https://my-api.com"
```

## Using Variables From Applications

The Spin SDK surfaces the Spin configuration interface to your language. The [interface](https://github.com/fermyon/spin/blob/main/wit/ephemeral/spin-config.wit) consists of one operation:

| Operation  | Parameters                          | Returns             | Behavior |
|------------|-------------------------------------|---------------------|----------|
| `get-config`    | Variable name  | Variable value    | Gets the value of the variable from the configured provider |

To illustrate the config API, each of the following examples receives a password via the HTTP request body, compares it to the value stored in the application variable, and returns a JSON response indicating whether the submitted password matched or not. The application manifest associated with the examples would look similar to the one described [in the previous section](#adding-variables-to-your-applications). 

The exact details of calling the config SDK from a Spin application depends on the language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

The config function is available in the `spin_sdk::config` module and is named `get`.

```rust
use anyhow::Result;
use spin_sdk::{
    config,
    http::{Request, Response},
    http_component,
};

#[http_component]
fn handle_spin_example(req: Request) -> Result<Response> {
    let password = std::str::from_utf8(req.body().as_ref().unwrap()).unwrap();
    let expected = config::get("password").expect("could not get variable");
    let response = if expected == password {
        "accepted"
    } else {
        "denied"
    };
    let response_json = format!("\{{\"authentication\": \"{}\"}}", response);
    Ok(http::Response::builder()
        .status(200)
        .header("Content-Type", "application/json")
        .body(Some(response_json.into()))?)
}

```

{{ blockEnd }}

{{ startTab "TypeScript"}}

The config function is available in the `Config` package and is named `get`.

```ts
import { HandleRequest, HttpRequest, HttpResponse, Config } from "@fermyon/spin-sdk"

const decoder = new TextDecoder("utf-8")

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  const expected = decoder.decode(request.body)
  let password = Config.get("password")
  let access = "denied"
  if (expected === password) {
      access = "accepted"
  }
  let responseJson = `{\"authentication\": \"${access}\"}`;

  return {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: responseJson
  }
}

```

{{ blockEnd }}

{{ startTab "Python"}}

The config function is available in the `spin_config` package and is named `config_get`.

```py
from spin_http import Response
from spin_config import config_get

def handle_request(request):
    password = request.body.decode("utf-8")
    expected = config_get("password")
    access = "denied"
    if expected == password:
        access = "accepted"
    response = f'\{{"authentication": "{access}"}}'
    return Response(200,
                    {"content-type": "application/json"},
                    bytes(response, "utf-8"))
```

{{ blockEnd }}

{{ startTab "TinyGo"}}

The config function is available in the `github.com/fermyon/spin/sdk/go/config` package and is named `Get`. See [Go package](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/config) for reference documentation.

```go
import (
	"fmt"
	"io"
	"net/http"

	spinconfig "github.com/fermyon/spin/sdk/go/config"
	spinhttp "github.com/fermyon/spin/sdk/go/http"
)

spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
    access := "denied"
    password, err := io.ReadAll(r.Body)
    if err == nil {
        expected, err := spinconfig.Get("password")
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        if expected == string(password) {
            access = "accepted"
        }
    }
    response := fmt.Sprintf("{\"authentication\": \"%s\"}", access)
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintln(w, response)
})
```

{{ blockEnd }}

{{ blockEnd }}
