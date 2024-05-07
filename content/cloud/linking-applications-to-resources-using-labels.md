title = "Linking Applications to Resources Using Labels"
template = "cloud_main"
date = "2023-09-30T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/linking-applications-to-resources-using-labels.md"

---

- [Features of Links and Labels](#features-of-links-and-labels)
- [Working With Links and Labels](#working-with-links-and-labels)
  - [Linking Resources Between Applications](#linking-resources-between-applications)
  - [Unlinking](#unlinking)
- [Next Steps](#next-steps)

Many Spin applications require data storage between invocations. Fermyon Cloud offers two methods for this: Key Value storage and SQLite databases. However, the relationship between applications and databases isn't strictly one-to-one. A single database might be used by multiple applications, while an application could utilize several databases. There might even be a need to maintain a database that isn't utilized by any applications, perhaps for analytics or compliance reasons. All of these scenarios can occur as applications are independently deployed, upgraded, and retired, without any particular application needing to be aware of how others might be using the same databases.

To facilitate the seamless transition of applications between different environments, such as from a local development environment to Fermyon Cloud, Spin applications don't reference databases by their physical location, like a connection string. Instead, they use a label. A label is an abstract identifier, such as "default," "user-accounts," or "transactions." The environment determines how this label is mapped to a physical database.

In the Spin development environment, that mapping is handled by the [runtime configuration file](/spin/dynamic-configuration#runtime-configuration).  In Fermyon Cloud, it's managed through _links_.

> Link management is currently available for SQLite Databases and Key Value Stores. In this article, we will showcase SQLite Databases, although you can apply the same concepts to Key Value Stores as well. 

This may sound abstract, so let's walk through a specific example:

```toml
// --snip--
name = "todo-app"
[component.todo-app]
id = "todo"
sqlite_databases = ["data"]
// --snip--
```

The string "data" is the **label** that the Spin application uses to reference the SQLite Database. At application deployment time, we have to make a decision about how to map that label to an actual database.  The `spin cloud deploy` command gives us a couple of choices:
- Use an existing database and link app to it
- Create a new database and link the app to it

In this example below, we are going to **link** the app to an existing SQLite Database instance using the label. To do this, we choose the first option (that `spin deploy` gives us). We make our selection by using the up/down arrow keys and then `return` to continue:

```bash
spin deploy
Uploading todo-app version 0.1.0-r234fe5a4 to Fermyon Cloud...
Deploying...
App "todo-app" accesses a database labeled "data"
Would you like to link an existing database or create a new database?:
> Use an existing database and link app to it
  Create a new database and link the app to it
```

Since we chose to link to an existing database, `spin deploy` asks us which database we would like to link this app's "data" label to:

```bash
Which database would you like to link to todo-app using the label "data":
  finance
> projects
```

> Note: When Fermyon Cloud creates a new databases, it gives it an arbitrary name such as `inspiring-otter`. You can rename databases to give them more memorable names. In the example above, our databases have been renamed for `finance` and `projects`.

From this point, we see that our app is deploying and once finished we receive our deployed application's URL endpoint:

```bash
Waiting for application to become ready...... ready
Available Routes:
  todo-app: https://todo-app-ylnmlqmr.fermyon.app (wildcard)
```

Let's kick things up a notch and deploy a second Spin application (`todo-app-v2`) that will also use the same Cloud database:

```toml
// --snip--
name = "todo-app-v2"
[component.todo-app-v2]
id = "todo"
sqlite_databases = ["default"]
// --snip--
```

When deploying the second Spin application (`todo-app-v2`) we are again asked if we would like to use an existing database and link our application (in this case `todo-app-v2`) to it:

```bash
spin deploy       
Uploading todo-app-v2 version 0.1.0-r6e577b18 to Fermyon Cloud...
Deploying...
App "todo-app-v2" accesses a database labeled "default"
Would you like to link an existing database or create a new database?:
> Use an existing database and link app to it
  Create a new database and link the app to it
```

We again use the up/down arrow keys to make our selection and hit `return` to continue:

```bash
Which database would you like to link to todo-app-v2 using the label "default":
  finance
> projects
```

In the example here we have chosen to link `todo-app-v2` to our pre-existing `projects` Cloud database using via the "default" label, that we added to our `todo-app-v2` application manifest (`spin.toml`) file.

Now we have two separate Spin applications (`todo-app` and `todo-app-v2`) using their own labels to link to the same database. 

Links and labels are application scoped. Whenever a specific Spin application (say `todo-app`) needs to access the database resource (`projects`), it will do so via the label "data".

The Spin application does not need to know the true name of the Cloud resource (`projects` database) that it is interacting with. 

A label is understood by all the components within a single application, but the labels applied do not hold any significance to other Spin applications. 

## Features of Links and Labels

The benefits of using labels and Fermyon Cloud links include:

* **Easy Sharing**: Share your Fermyon Cloud resource across applications effortlessly.
* **Resource Creation Control**: You decide when to create and delete Fermyon Cloud resources.
* **Decoupled Resource Lifecycle**: Allow Fermyon Cloud resources to have lifecycles independent of your Spin application's lifecycle.
* **Seamless Cloud Integration**: Cloud experience smoothly integrates with local Spin development, no runtime configuration changes required. 
* **Dynamic App Resource Configuration**: Change the data resource your application points to without rebuilding it.

## Working With Links and Labels

Whenever you add a string to your SQLite Database or Key Value Store entry in the component manifest, you're creating a label. When you deploy your Spin application to Fermyon Cloud, you will be prompted to link the label to a specific SQLite Database instance or Key Value Store instance depending on what you provisioned. Later on, if you'd like to update the link you can do so via the `spin cloud link` command. 

To see your existing labels, run the `spin cloud <resource-type> list` command, where `<resource-type>` is the subcommand for the resource whose links you want to see. For example, if you want to see how your applications and your SQLite Databases are linked, run the following command:

```bash
$ spin cloud sqlite list
+--------------------------------------------------------+
| App                          Label     Database        |
+========================================================+
| todo-app                     data      projects        |
| todo-app-v2                  default   projects        |
+--------------------------------------------------------+
```

If you'd like to see how your applications and your Key Value Stores are linked, run the following command: 

```bash
$ spin cloud kv list
+--------------------------------------------------------+
| App                          Label     Key Value Store |
+========================================================+
| order-processor              orders    test-data       |
+--------------------------------------------------------+
```

Now using these commands you can see your Spin applications, their respective labels and their connected databases and stores.

### Linking Resources Between Applications

Linking SQLite and Key Value resources between applications in Fermyon Cloud is possible. Here is an example of how you would link (share) a Key Value resource between two applications in Fermyon Cloud. Let's start by creating a new Key Value resource:

<!-- @selectiveCpy -->

```bash
$ spin cloud key-value create my-shared-kv
Key value store  "my-shared-kv" created
```

Let's now link one application to this shared resource:

<!-- @selectiveCpy -->

```bash
$ spin cloud link key-value --app todo-app --store my-shared-kv shared
Key value store "my-shared-kv" is now linked to app "todo-app" with the label "shared"
```

And then link another application to that same resource:

<!-- @selectiveCpy -->

```bash
$ spin cloud link key-value --app todo-app-v2 --store my-shared-kv shared
Key value store "my-shared-kv" is now linked to app "todo-app-v2" with the label "shared"
```

If we run the `spin cloud kv list` command again, we can see that the Key Value resource called `my-shared-kv` is now shared between `todo-app` and `todo-app-v2` under the label `shared`:

<!-- @selectiveCpy -->

```bash
$ spin cloud kv list
+--------------------------------------------------------+
| App                          Label     Key Value Store |
+========================================================+
| order-processor              orders    test-data       |
| todo-app                     shared    my-shared-kv    |
| todo-app-v2                  shared    my-shared-kv    |
+--------------------------------------------------------+
```

### Unlinking

Though not recommended, if you'd like to unlink your resource while your Spin application is running, you can do so with the following command:

```bash
spin cloud unlink sqlite --app todo-app data
```

```bash
spin cloud unlink kv --app order-processor test-data
```

Now we've successfully unlinked our `todo-app` from the `projects` database, and unlinked our `order-processor` app from the `test-data` database. 

If you delete a Fermyon Cloud application, it removes any links associated with the application, but does not delete the linked database or key value store. 

## Next Steps

* Review the [SQLite Database Tutorial](noops-sql-db.md) to learn how to use links and labels with your SQLite Database
* Review the [Key Value Store Tutorial](../spin/v2/key-value-store-tutorial.md)
* Visit the [Spin Cloud Plugin](cloud-command-reference.md) reference article to learn more about the `spin cloud link sqlite` commands
