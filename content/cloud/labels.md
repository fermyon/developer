title = "Linking Applications to Resources"
template = "cloud_main"
date = "2023-10-30T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/labels.md"

---
- [Linking Applications to Resources](#linking-applications-to-resources)
- [Benefits of Linking](#benefits-of-linking)
- [Working With Links](#working-with-links)
- [Next Steps](#next-steps) 

# Linking Applications to Resources

Spin applications are inherently ephemeral resources; therefore, state needs to be persisted in external stores such as NoOps SQL Databases. To do this, Spin applications need some way to refer to these external resources.  Furthermore, as you build and prototype your Spin application you may want to connect to other resources without necessarily having to recompile your application. As your workload grows into a large-scale distributed system, you will likely have multiple applications referring to the same logical resource via different names.

This is where Fermyon Cloud **labels** are useful. Labels are the construct that establishes a relationship between a Spin application and it's dependent Fermyon Cloud resources. Labels are application scoped and an indirect reference to a named Fermyon Cloud resource that belongs to the user. Whenever that Spin application needs to access that resource, it will use the label as reference. The Spin application does not need to know the true name of the resource it's interacting with. This also means a label is well understood by all the components within it's respective application, but it doesn't hold any significance to other applications. 

> At this time, only NoOps SQL DB supports labels. However, in the future other Fermyon Cloud resources such as Key Value Store will support labels as well. 

## Benefits of Linking

Benefits of the Fermyon Clould links include:

* **Easy Sharing**: Share your Fermyon Cloud resource across applications effortlessly.
* **Resource Creation Control**: You decide when to create and delete Fermyon Cloud resources.
* **Flexible Lifecycle Management**: Manage Fermyon Cloud resources independently of your Spin application.
* **Seamless Cloud Integration**: Cloud experience smoothly integrates with local Spin development, no runtime configuration changes required. 
* **Dynamic App Resource Configuration**: Change the data resource your application points to without rebuilding it.

## Working With Links

Labels can be created in two different manners, either within the component manifest in `spin.toml` or with the `spin cloud link` command. You'll likely include the label in the component manifest in your `spin.toml` at deployment time and be prompted to create the link during the deployment. Later, you can use `spin cloud link` to update which resource is linked to a Spin app.

![TODO - this is a rough PM diagram, needs design polish](../../static/image/labels-diagram.png)

To see your existing labels, you will need to use the `spin cloud` plugin along with the subcommand of the resource you've linked to your Spin application via a label. For example, if you'd like to see the labels you created for your NoOps SQL DB resources, you'd run the following command:

```bash
$ spin cloud sqlite list
+------+---------+--------------+
| App  | Label   | Database     |
+===============================+
| todo | default | amiable-kiwi |
|------+---------+--------------|
| api  | hello   | amiable-kiwi |
+------+---------+--------------+
```

Now you can see your Spin applications, their respective labels and their connected NoOps SQL Databases. In the example above, we have two unique Spin applications (todo and api) that are linked to the same NoOps SQL Database instance (amiable-kiwi) via their respective labels (default and hello). 

Unlike the Fermyon Cloud resources they're linked to, labels are tied to their applications' lifespan. The only way to remove a label currently is to delete the application its associated with. Deleting the application (and therefore implicitly deleting the label) has no impact on the storage resource itself. 

## Next Steps

* Review the [NoOps SQL DB Tutorial](noops-sql-db.md) to learn how to apply labels to your Spin applications that interact with storage objects
* Visit the [Spin Cloud Plugin](cloud-command-reference.md) reference article to learn more about the commands