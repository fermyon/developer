title = "Manage Accounts"
template = "functions_main"
date = "2025-01-16T00:22:56Z"
enable_shortcodes = true

---
- [View Your Personal Account Information](#view-your-personal-account-information)
- [Request a Team Account](#request-a-team-account)
- [View Applications In Team Accounts](#view-applications-in-team-accounts)
- [Run Create, Upgrade, and Delete Operations on Team Accounts](#run-create-upgrade-and-delete-operations-on-team-accounts)

When you sign up for Fermyon Wasm Functions, you're automatically assigned a personal account. All actions run in the context of your personal account unless you create a team account for collaboration with other Fermyon Wasm Functions users. With a personal account, you're the only one who can view and interact with your Spin applications running on Fermyon Wasm Functions. 

## View Your Personal Account Information

Your personal account name matches the username you used to sign up for Fermyon Wasm Functions. To view your account ID and account name, run the `spin aka info` command using plugin version v0.4 or higher:

<!-- @selectiveCpy -->

```console
# returns account_name (id: account_id)
$ spin aka info
```

<!-- @nocpy -->

```console
Auth Info
  Accounts:
    - my_username (id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
```

## Request a Team Account

To collaborate on Spin applications with other Fermyon Wasm Functions users, create a team account by filling out this [short form](https://fibsu0jcu2g.typeform.com/to/coitknMl). You'll need to provide: (i) a name for the team account and (ii) a complete list of usernames you'd like to have access to the account. To add or remove individuals later, use the same form and select "Modify existing account" on question 2.

> There is currently no limit to the number of team accounts or users per team account on Fermyon Wasm Functions today. 

 Once you have received email confirmation that the team account has been created or modified, you can verify by having any user of the team account run the `spin aka info` command: 

 <!-- @selectiveCpy -->

```console
# returns account_name (id: account_id)
$ spin aka info
```

<!-- @nocpy -->

```console
Auth Info
  Accounts:
    - my_username (id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    - dev_team_1 (id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    - dev_team_2 (id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
```

## View Applications In Team Accounts

To see which applications are running within a given account, provide the `--account-id` or `account-name` flag. Otherwise the default will be your personal account.

 <!-- @selectiveCpy -->

```console
# Personal account apps
$ spin aka app list 
```

<!-- @nocpy -->

```console
my-test-app 
hello-kv-store 
```

 <!-- @selectiveCpy -->

```console
# Team account apps
$ spin aka app list --account-name dev_team_1
```

<!-- @nocpy -->

```console
graphql 
pw_checker 
```

## Run Create, Upgrade, and Delete Operations on Team Accounts

If you would like to deploy, upgrade, or delete an application running in a team account, you must provide the account-id or account-name, otherwise the default will be your personal account. 

<!-- @nocpy -->

```console
# Deploy into a team account
spin aka deploy --account-name dev_team_1
```

<!-- @nocpy -->

```console
# Delete an app from a team account
spin aka delete app --app-name graphql --account-name dev_team_1
```

To upgrade your application, please follow our [upgrade tutorial](./upgrade.md) and pass along the `account-name` or `account-id` on the final spin aka deploy step to target a specific account.

## Next Steps

- Make sure to check the [FAQ and Known Limitations](faq) article
