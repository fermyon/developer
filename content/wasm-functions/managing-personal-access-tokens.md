title = "Managing Personal Access Tokens (PATs)"
template = "functions_main"
date = "2025-09-18T00:22:56Z"
enable_shortcodes = true

---
- [Inspecting Your Workspace](#inspecting-your-workspace)
- [Linking Your Workspace](#linking-your-workspace)
- [Running Commands](#running-commands)
- [Unlinking Your Workspace](#unlinking-your-workspace)
- [Next Steps](#next-steps)

There are several scenarios - like for example, automated deployments from CI/CD systems like GitHub Actions - in which you might want to authenticate against *Fermyon Wasm Functions* using Personal Access Tokens (PATs) instead of authenticating manually using the OAuth 2.0 Device Code flow. 

A personal access token (PAT) is a secure, time-bound string used as an alternative to a password for authenticating API requests or command-line operations against a *Fermyon Wasm Functions* with fine-grained permission control.

> NOTE: In contrast to the default authentication flow, PATs aren't authorized to delete applications from your _Fermyon Wasm Functions_ account.

PATs for FWF are managed using the sub-commands of `spin aka auth token`. You must be authenticated to use those commands (`spin aka login`). (See the ["Log in to Fermyon Wasm Functions" section of the quickstart](quickstart#log-in-to-the-fermyon-wasm-functions) for further instructions on how to log in.)

## Generating a PAT

To generate a new PAT, use the `spin aka auth token create` command. At least, you have to specify a name for your PAT. Without further ado, the PAT will expire after `30` days. You can customize the expiration using the `--expiration-days` (or `-e`) option. Also, an optional description could be provided using `--description` (or `-d`): 

<!-- @selectiveCpy -->

```console
$ spin aka auth token create --name docs-token \
  --description "PAT created for the documentation" \
  --expiration-days 90
```
Store the PAT which will be printed to `stdout` in a safe place (e.g. password manager), it won't be shown again:

<!-- @nocpy -->

```console
A personal access token has been created! The token will expire 90 days from now.
Please store this token in a safe place, as it will not be shown again.
Here is your access token: pat_**************************
```

## Listing all your PATs

Once you've generated at least one PAT, you can print a list of all tokens using the `spin aka auth token list` command. This won't show the actual PATs, but you'll see essential metadata for every PAT created.

<!-- @selectiveCpy -->

```console
$ spin aka auth token list --format yaml
```

For the sake of this article, will tell the command to produce the output as `YAML` instead of using the standard table layout to increase readability.

<!-- @nocpy -->

```console
- id: 00000000-0000-0000-000000000000
  name: docs-token
  description: PAT created for the documentation
  expires_at: 2025-12-17T13:54:11+00:00
  last_authenticated_at: 2025-09-17T14:31:21+00:00
```
## Regenerating a PAT

If a previously generated PAT is about to expire, you can use the `spin aka auth token regenerate` command for regenerating a particular token using its identifier. You can find the identifier by [listing all your PATs](#listing-all-your-pats). 

Expiration in days can't be overwritten when regenerating a PAT. Instead, the value specified when creating the PAT will be used. 

<!-- @selectiveCpy -->

```console
$ spin aka auth token regenerate --id 00000000-0000-0000-000000000000
```
Again, the PAT is shown only once as part of the `spin aka auth token regenerate` command, store it in a safe place (e.g. password manager).

<!-- @nocpy -->

```console
A personal access token has been regenerated! The token will expire on 2025-12-17T13:54:11+00:00
Please store this token in a safe place, as it will not be shown again.
Here is your access token: pat_**************************
```

## Removing a PAT

If you wish to remove a PAT from your account, use the `spin aka auth token delete` command. Again, you have to provide the identifier of your PAT using the `--id` option:

<!-- @selectiveCpy -->

```console
$ spin aka auth token delete --id 00000000-0000-0000-000000000000
```

Once you've confirmed that you really want to delete the PAT, the command will report back that the PAT has been deleted successfully:
<!-- @nocpy -->

```console
Deleted personal access token successfully.
```

## Next Steps

- [Delete an application](delete)