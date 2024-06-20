title = "The User Settings Screen"
template = "cloud_main"
date = "2023-02-28T00:00:00Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/user-settings.md"

---
- [Fermyon Cloud Account Settings](#fermyon-cloud-account-settings)
  - [Create and Manage a Personal Access Token](#create-and-manage-a-personal-access-token)
    - [Create a PAT](#create-a-pat)
    - [Delete a PAT](#delete-a-pat)
  - [Delete Your Fermyon Cloud Account](#delete-your-fermyon-cloud-account)
- [Next Steps](#next-steps)

## Fermyon Cloud Account Settings

User settings empower you to take control of your Fermyon Cloud experience. Today, you can:
- create and manage a Personal Access Token (PAT).
- delete your Fermyon Cloud account.

See the relevant sections below, for instructions on how to perform these actions.

### Create and Manage a Personal Access Token

#### Create a PAT

A Personal Access Tokens (PAT) enable continuous integration workflows by providing an alternative to the standard login procedure, which requires you to go through Fermyon Cloud to activate the device code.

Examples of this include deploying your Spin applications to Fermyon Cloud using the [`fermyon/action/spin/deploy` GitHub Action](https://github.com/fermyon/actions#fermyonactionspindeploy). Let's walk through the steps required to create a PAT.

First, [log into](/cloud/quickstart#log-in-to-the-fermyon-cloud) Fermyon Cloud. Hover over your username in the top right corner and select 'User Settings' from the down options.

![User settings](/static/image/user-setting.png)

Now select the "Add a Token" button under the Personal Access Tokens heading. 

![User settings view](/static/image/user-setting-view.png)

Enter your preferred token name. We recommend that you use a descriptive name to help you can recall its purpose later. 

![Create token view](/static/image/create-token.png)

Be sure to, take the time to, copy your token name and store it in a safe location for later.

![Create token confirmation](/static/image/create-token-confirmation.png)

Exit out of the panel. Congratulations on creating your first PAT with Fermyon Cloud. 

![User Settings with Fermyon Cloud](/static/image/user-settings-with-token.png)

#### Delete a PAT

To delete a PAT, click on the `x` to the right of the desired token name. This will bring up the following prompt.

![Delete token confirmation](/static/image/delete-token-confirmation.png)

Type out the complete token name and hit delete to permanently delete your PAT. After performing the following step, the token will no longer work!

![Delete token confirmation final warning](/static/image/delete-token-confirmation-2.png)

You should no longer see the PAT in your User Settings view.

![User settings view](/static/image/user-setting-view.png)

### Delete Your Fermyon Cloud Account

You may wish to delete your Fermyon Cloud account. This is a permanent action that will delete your Fermyon account **along with any running applications** associated with the account.

First, [log into the Cloud](/cloud/quickstart#log-in-to-the-fermyon-cloud). Hover on your username in the top right corner and select 'User Settings' from the down options.

![User settings](/static/image/user-setting.png)

Click the "Delete account" button in the _Danger Zone_ box.

![User settings view](/static/image/user-setting-view.png)

Select all three checkboxes and select "Delete account" to proceed with account deletion. 

> **Note: as mentioned above, this is a permanent action that will result in the deletion of any running applications in Fermyon Cloud.**

![User settings view](/static/image/delete-account-confirmation.png)

## Next Steps

- Learn how to engage with Fermyon to get [support](/cloud/support).
