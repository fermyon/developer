title = "Dynamic and Runtime Application Configuration"
template = "spin_main"
date = "2022-03-14T00:22:56Z"
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/spin/dynamic-configuration.md"

---
- [Custom Config Variables](#custom-config-variables)
- [Component Custom Config](#component-custom-config)
- [Custom Config Providers](#custom-config-providers)
  - [Environment Variable Provider](#environment-variable-provider)
  - [Vault Config Provider](#vault-config-provider)
    - [Vault Config Provider Example](#vault-config-provider-example)
- [Runtime Configuration](#runtime-configuration)
   - [Key Value Store Runtime Configuration](#key-value-store-runtime-configuration)

Spin applications may define custom configuration which can be looked up by
component code via the [spin-config interface](https://github.com/fermyon/spin/blob/main/wit/ephemeral/spin-config.wit).

### Custom Config Variables

Application-global custom config variables are defined in the top-level `[variables]`
section. These entries aren't accessed directly by components but are referenced
by [component config](#component-custom-config) value templates. Each entry must
either have a `default` value or be marked as `required = true`. "Required" entries
must be [provided](#custom-config-providers) with a value.

Configuration keys may only contain lowercase letters and underscores between letters:

<!-- @nocpy -->

```toml
[variables]
api_host = { default = "api.example.com" }
api_key = { required = true }
```

### Component Custom Config

The configuration entries available to a component are listed in its
`[component.config]` section. Configuration values may reference
[config variables](#custom-config-variables) with simple
[mustache](https://mustache.github.io/)-inspired string templates:

<!-- @nocpy -->

```toml
[[component]]
# ...
[component.config]
api_base_url = "https://{{ api_host }}/v1"
api_key = "{{ api_key }}"
```

### Custom Config Providers

[Custom config variables](#custom-config-variables) values may be set at runtime by
config "providers". Currently, there are two providers: the environment
variable provider and vault config provider.

#### Environment Variable Provider

The environment variable provider which gets config values from the `spin` process's
environment (_not_ the component `environment`). Config keys are translated
to environment variables by upper-casing and prepending with `SPIN_CONFIG_`:

<!-- @selectiveCpy -->

```bash
$ export SPIN_CONFIG_API_KEY = "1234"  # Sets the `api_key` value.
$ spin up
```

#### Vault Config Provider

The Vault config provider gets secret values from [HashiCorp Vault](https://www.vaultproject.io/).
Currently, only [KV Secrets Engine - Version 2](https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v2) is supported.
You can set up v2 kv secret engine at any mount point and give Vault information in the [runtime configuration](#runtime-configuration) file:

<!-- @nocpy -->

```toml
[[config_provider]]
type = "vault"
url = "http://127.0.0.1:8200"
token = "root"
mount = "secret"
```

##### Vault Config Provider Example

1. [Install Vault](https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-install).
2. Start Vault:

<!-- @selectiveCpy -->

```bash
$ vault server -dev -dev-root-token-id root
```

3. Set a password:

<!-- @selectiveCpy -->

```bash
$ export VAULT_TOKEN=root
$ export VAULT_ADDR=http://127.0.0.1:8200
$ vault kv put secret/password value="test_password"
$ vault kv get secret/password
```

4. Go to the [spin/tests/http/vault-config-test](https://github.com/fermyon/spin/tree/main/tests/http/vault-config-test) folder.
5. Build and run the `vault-config-test` app:

<!-- @selectiveCpy -->

```bash
$ spin build
$ spin up --runtime-config-file runtime_config.toml
```

6. Test the app:

<!-- @selectiveCpy -->

```bash
$ curl -i http://127.0.0.1:3000
HTTP/1.1 200 OK
content-length: 26
date: Tue, 18 Oct 2022 12:34:40 GMT

Got password test_password
```

## Runtime Configuration

Runtime configuration contains information for the selected config provider, such as the [Vault config provider](#vault-config-provider).
You can supply runtime configuration by providing a value for the `--runtime-config-file` flag when invoking the `spin up` command.

### Key Value Store Runtime Configuration

Spin provides built-in key-value storage. This storage is backed by an SQLite database embedded in Spin by default. However, the Spin runtime configuration file (runtime-config.toml) can be updated to not only modify the SQLite configuration but also choose to use a different backing store. The available store options are the embedded SQLite database, an external Redis database or Azure CosmosDB.

The following is an example of how an application's `runtime-config.toml` file can be configured to use Redis instead. Note the `type` and `url` values, which are set to `redis` and the URL of the Redis host, respectively:

```toml
[key_value_store.default]
type = "redis"
url = "redis://localhost"
```

Similarly, to implement Azure CosmosDB as a backend for Spin's key/value store, change the type to `azure_cosmos` and specify your database account details:

```toml
[key_value_store.default]
type = "azure_cosmos"
key = "<key>"
account = "<cosmos-account>"
database = "<cosmos-database>"
container = "<cosmos-container>"
```

> Note: The CosmosDB container must be created with the default partition key, `/id`.

Whilst a single default store may be sufficient for certain application use cases, each Spin application can be configured to support multiple stores of any `type`, as shown in the `runtime-config.toml` file below:

> **Note:** At present, when deploying an application to Fermyon Cloud only the single "default" key-value store is supported. To see more about Spin support on Fermyon Cloud, visit the [limitations documentation](/cloud/faq#spin-limitations):

```toml
# This defines a new store named user_data
[key_value_store.user_data]
type = "spin" 
path = ".spin/user_data.db"

# This defines a new store named other_data backed by a Redis database
[key_value_store.other_data]
type = "redis"
url = "redis://localhost"
```

You must individually grant each component access to the stores that it needs to use. To do this, use the `component.key_value_stores` entry in the component manifest within `spin.toml`. See [Spin Key Value Store](kv-store-api-guide.md) for more details. 
