title = "Labels"
template = "cloud_main"
date = "2023-10-30T00:22:56Z"
enable_shortcodes = true
[extra]
url = "https://github.com/fermyon/developer/blob/main/content/cloud/labels.md"

---
- [Labels Overview](#labels-overview)
- [Benefits of labels](#benefits-of-labels)
- [How To Create A Label](#how-to-create-a-label)
- [How to Delete A Label](#how-to-delete-a-label)
- [Next Steps](#next-steps) 

# Labels Overview

Spin applications are inherently ephermal resources; therefore, you don't necessarily want other Fermyon Cloud resources (such as NoOps SQL Databases) to share the exact same lifecycle. Furthermore, as you build and prototype your Spin application you may want to connect to other resources without necessarily having to recompile your application, but you still need some construct to explain the relationship between your Spin application and the other resource you need it to connect with. 

This is where Fermyon Cloud `labels` are useful. `labels` are construct that allow developers to establish a relationship between a Spin application and it's dependent Fermyon Cloud resources while still preserving independent lifecycles for the respective resources. `Labels` are application scoped and an indirect reference to a named Fermyon Cloud resource that belongs to the user. Whenever that Spin application needs to access that resource, it will use the `label` as reference. The Spin application does not need to know the true name of the resource it's interacting with. This also means a `label` is well understood by all the components within it's respective application, but it doesn't hold any significance to other applications. 

> At this time, only NoOps SQL DB supports `labels`. However, in the future other Fermyon Cloud resources such as Key Value Store will support `labels` as well. 

## Benefits of Labels

Benefits of the Fermyon Clould `labels` include:

* **Easy Sharing**: Share your Fermyon Cloud resource across applications effortlessly.
* **Resource Creation Control**: You decide when to create and delete Fermyon Cloud resources.
* **Flexible Lifecycle Management**: Manage Fermyon Cloud resources independently of your Spin application.
* **Seamless Cloud Integration**: Cloud experience smoothly integrates with local Spin development, no runtime configuration changes required. 
* **Component Model Alignment**: Change the data resource your application points to without rebuilding it.

## How To Create A Label

Labels can be created in two different manners, either within the component manifest in `spin.toml` or via `spin cloud` plugin via the `spin cloud link` command. Both approaches are equally valid. The path you choose most likely depends on whether your Spin application needs to be linked to the resource immediately at deployment time. If you know the exact topology of your workload, you'll likely include the label in the component manifest in your `spin.toml` at deployment time.

On the other hand, if you're familiarizing yourself with Fermyon Cloud and interacting with these resources for the first time you may find yourself using `spin cloud link` instead. The `spin cloud link` command allows you to create a label once you already have a deployed Spin application and storage resource you'd like to connect to. 

![TODO - this is a rough PM diagram, needs design polish](../../static/image/labels-diagram.png)

## How to View Existing Labels

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

Now you can see your Spin applications, their respective labels and their connected NoOps SQL Databases. In the example above, we have two unique applications that are sharing the same NoOps SQL Database instance. 

## How To Delete A Label 

Unlike the Fermyon Cloud resources they're linked to, `labels` are tied to their applications' lifespan. The only way to remove a label currently is to delete the application its associated with. Deleting the application (and therefore implicitly deleting the label) has no impact on the storage resource itself. 

## Next Steps

* Review the [NoOps SQL DB Tutorial](noops-sql-db.md) to learn how to apply labels to your Spin applications that interact with storage objects
* Visit the [Spin Cloud Plugin](cloud-command-reference.md) reference article to learn more about the commands