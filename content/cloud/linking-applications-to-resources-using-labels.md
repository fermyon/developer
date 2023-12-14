title = "Linking Applications to Resources Using Labels"
template = "cloud_main"
date = "2023-09-30T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/linking-applications-to-resources-using-labels.md"

---

- [Features of Links and Labels](#features-of-links-and-labels)
- [Working With Links and Labels](#working-with-links-and-labels)
- [Next Steps](#next-steps)

Many Spin applications require data storage between invocations. Fermyon Cloud offers two methods for this: key-value storage and SQLite databases. However, the relationship between applications and databases isn't strictly one-to-one. A single database might be used by multiple applications, while an application could utilize several databases. There might even be a need to maintain a database that isn't utilized by any applications, perhaps for analytics or compliance reasons. All of these scenarios can occur as applications are independently deployed, upgraded, and retired, without any particular application needing to be aware of how others might be using the same databases.

To facilitate the seamless transition of applications between different environments, such as from a local development environment to Fermyon Cloud, Spin applications don't reference databases by their physical location, like a connection string. Instead, they use a label. A label is an abstract identifier, such as "default," "user-accounts," or "transactions." The environment determines how this label is mapped to a physical database.

In the Spin development environment, that mapping is handled by the [runtime configuration file](/spin/dynamic-configuration#runtime-configuration).  In Fermyon Cloud, it's managed through _links_.

> Link management is currently available only for SQLite Databases. Fermyon Cloud currently allows applications only the "default" key-value store, which is private to the application and shares the application's lifespan. Key-value link management is planned for a future release of Fermyon Cloud.

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

> At this time, only SQLite Database supports labels. However, in the future other Fermyon Cloud resources such as Key Value Store will support links and labels as well. 

## Features of Links and Labels

The benefits of using labels and Fermyon Cloud links include:

* **Easy Sharing**: Share your Fermyon Cloud resource across applications effortlessly.
* **Resource Creation Control**: You decide when to create and delete Fermyon Cloud resources.
* **Decoupled Resource Lifecycle**: Allow Fermyon Cloud resources to have lifecycles independent of your Spin application's lifecycle.
* **Seamless Cloud Integration**: Cloud experience smoothly integrates with local Spin development, no runtime configuration changes required. 
* **Dynamic App Resource Configuration**: Change the data resource your application points to without rebuilding it.

## Working With Links and Labels

Whenever you add a string to your SQLite Database entry in the component manifest, you're creating a label. When you deploy your Spin application to Fermyon Cloud, you will be prompted to link the label to a specific SQLite Database instance. Later on, if you'd like to update the link you can do so via the `spin cloud link` command. 

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

Now you can see your Spin applications, their respective labels and their connected SQLite Databases.

Though not recommended, if you'd like to unlink your resource while your Spin application is running, you can do so with the following command:

```bash
spin cloud unlink sqlite --app todo-app data
```

Now we've successfully unlinked our `todo-app` from the `projects` database. 

If you delete a Fermyon Cloud application, it removes any links associated with the application, but does not delete the linked database.

## Next Steps

* Review the [SQLite Database Tutorial](noops-sql-db.md) to learn how to use links and labels with your SQLite Database
* Visit the [Spin Cloud Plugin](cloud-command-reference.md) reference article to learn more about the `spin cloud link sqlite` commands
