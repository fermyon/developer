title = "Configuration Variables"
template = "spin_main"
date = "2022-06-14T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main//content/spin/variables.md"

---
- [Using the Config SDK to Get Variables](#using-the-config-sdk-to-get-variables)

Spin supports dynamic application variables. Instead of being static, their values can be updated without modifying the application, creating a simpler experience for rotating secrets, updating API endpoints, and more. 

These variables are defined in a Spin application manifest (in the `[variables]` section) and are provided by a [configuration provider](/spin/dynamic-configuration.md#custom-config-providers). When running Spin locally, the configuration provider can be Vault for secrets or host environment variables. Refer to the [dynamic configuration documentation](/spin/dynamic-configuration.md) to learn how to configure variables locally.

## Using the Config SDK to Get Variables

The Spin SDK surfaces the Spin Config interface to your language. The [interface](https://github.com/fermyon/spin/blob/main/wit/ephemeral/spin-config.wit) consists of one operation:

| Operation  | Parameters                          | Returns             | Behavior |
|------------|-------------------------------------|---------------------|----------|
| `get-config`    | Variable name  | Variable value    | Gets the value of the variable from the configured provider |

In order to get a variable, it must be declared in an application's manifest (`spin.toml`). For example, say an application needs to access a secret. A variable named `password` could be added to the manifest and set as required with `required = true` since there is no reasonable default value for a secret. To do this, add a top-level `[variables]` section to the application manifest (`spin.toml`) and declare the variable within it.

<!-- @selectiveCpy -->
```toml
# Add this above the [component] section
[variables]
password = { required = true }
```

To surface the variable to a component, add a `[component.config]` section in the component and specify the variable within it. Instead of statically assigning the value of the config variable, dynamically reference the variable with [mustache](https://mustache.github.io/)-inspired string templates. Only components that explicitly use the variables in their configuration section will get access to them. This enables only exposing variables and secrets to the desired components of an application.

```toml
# Add this below the [component.build] section
[component.config]
password = "\{{ password }}"
```

The resulting application manifest should look similar to the following, with the `[component.build]` section varying depending on the language used to build the `password_checker` component:

<!-- @selectiveCpy -->
```toml
spin_manifest_version = "1"
description = "A Spin app with a dynamically updatable variable"
name = "password_checker"
trigger = { type = "http", base = "/" }
version = "0.1.0"

[variables]
password = { required = true }

[[component]]
id = "password_checker"
source = "app.wasm"
[component.trigger]
route = "/..."
[component.build]
command = "spin py2wasm app -o app.wasm"
[component.config]
password = "\{{ password }}"
```

To illustrate the config API, each of the following examples receives a password via the HTTP request body, compares it to an expected password, and returns a JSON response indicating whether the submitted password matched or not. To use the [environment variable provider](/spin/dynamic-configuration.md#environment-variable-provider) to set the variable values locally, set the `password` variable's value in an environment variable prefixed with `SPIN_CONFIG_`. The provider gets the variable values from the `spin` process's environment:

<!-- @selectiveCpy -->
```bash
$ SPIN_CONFIG_PASSWORD="123" spin build --up

Serving http://127.0.0.1:3000
Available Routes:
  password-checker: http://127.0.0.1:3000 (wildcard)
```

Send a request to the application with the correct password in the body to authenticate successfully.

<!-- @selectiveCpy -->
```bash
$ curl -d "123" http://127.0.0.1:3000
{"authentication": "accepted"}
```

The exact details of calling the config SDK from a Spin application depends on the language:

{{ tabs "sdk-type" }}

{{ startTab "Rust"}}

The config function is available in the `spin_sdk::config` module.

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

The config function is available in the `spinSdk.config` package.

```ts
import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const decoder = new TextDecoder("utf-8")

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  const expected = decoder.decode(request.body)
  let password = spinSdk.config.get("openai_key")
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

The config function is available in the `spin_config` package.

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

The config function is available in the `github.com/fermyon/spin/sdk/go/config` package. See [Go package](https://pkg.go.dev/github.com/fermyon/spin/sdk/go/config) for reference documentation.

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
