title = "Persistent Data: Spin"
template = "spin_main"
date = "2023-03-14T00:22:56Z"
enable_shortcodes = true

---
<<<<<<< HEAD
- [Key/Value Store](#keyvalue-store)
- [Other Persistent Storage Concepts in Webassembly Applications](#other-persistent-storage-concepts-in-webassembly-applications)

## Key/Value Store

The key/value store option is great for Spin users who would like to store non-relational, data pairs. Spin has a built-in key/value store mechanism that follows BASE consistency principles; a great fit for workloads such as value caching, session caching, counters, and also serializing an application's state.

When you configure your Spin application to use a default key/value store, you will get a 1:1 mapping of your Spin application to a key/value store. The key/value store, built using SQLite, will persist until you delete the directory in which your Spin application was created. SQLite is embedded in a way that is analogous to how one would imagine using a software library i.e. SQLite is designed to be used in this manner and therefore, for all intents and purposes, you could say that SQLite does not exist outside of Spin. When you run your Spin application using the [spin up](https://developer.fermyon.com/common/cli-reference#up) command SQLite is available to your application. When your application is no longer running, neither is SQLite. Your data will continue to persist at all times (including during restarts) and will support the running of your application up until you delete your application directory. 

If you would like to create a new application that utilizes Spin's key/value store option go ahead and try our [key/value storage tutorial](./kv-store.md). Also, please note that more information is available in the [Spin v0.9.0 blog post](https://www.fermyon.com/blog/spin-v09); where the key/value store option was initially introduced.

## Other Persistent Storage Concepts in Webassembly Applications

A while back, around the Spin v0.5.0 version, we published an article on [Persistent Storage in Webassembly Applications](https://www.fermyon.com/blog/persistent-storage-in-webassembly-applications). In that previous article, we showed the Spin framework's capabilities of providing WebAssembly executables with access to different levels of on-disk persistence. We demonstrated manually installing Redis from source, running our Redis server on localhost and then reading and writing from Redis via both the Redis CLI itself and also via the Spin SDK. Our current documentation also has examples of using both [Redis](https://developer.fermyon.com/cloud/data-redis) and [PostgreSQL](https://developer.fermyon.com/cloud/data-postgres), via [Redis Labs](https://redis.com/) and [ElephantSQL](https://www.elephantsql.com/plans.html) services respectively. 

In all of these previous examples, to persist data within your application, a separate data storage layer is a requirement. These methods of data persistence are perfectly fine and sound to use, as part of your application, if you choose to do so. However, from Spin v0.9.0 onwards, you are no longer required to install any on-disk persistence; outside of just installing Spin itself. SQLite exists inside Spin.

In the future, it may be possible to embed other database technologies into Spin. For example, future Spin SDK updates may target other databases such as Redis; which may allow you to build applications using Redis via minimal Spin configuration without the need to locally install and maintain your own Redis instance.
=======
- [Persist Data with Spin Explained](#persist-data-with-spin-explained)
    - [Redis](#redis)
    - [PostgresSQL](#postgresSQLs)
    - [Key/Value Store](#key/value-store)

## Persist Data with Spin Explained

This article will review the various options at your disposal for managing state alongside your Spin applications. Here is a broad overview of the options:

| Name | Type | Description |
| --- | ----------- |  ----------- |
| Redis | Uses HTTP trigger | Stores data in customer managed Redis using outbound HTTP |
| PostgresSQL | Uses HTTP trigger | Stores data in customer managed PostgresSQL using outbound HTTP | 
| Key/value store | Spin component construct | Stores data in Fermyon managed key/value store | 

### Redis

Use case: X, Y, Z 

Tutorial, How-To, and Blog references

### PostgresSQL

Use case: X, Y, Z 

Tutorial, How-To, and Blog references

### Key/Value Store

*Use case*: Key/value store is a great option for Spin users who would like to store non-relational, data pairs. Spin has built key/value store in a manner that follows BASE consistency principals, making it a great fit for workloads such as value caching, session caching, counters, and serialized application state. 

_How it works_: When you configure your Spin application to use a default key/value store, you will get a 1:1 mapping of Spin application to key/value store. The key/value store, built using SQLite, will persist until you delete the directory you created your Spin application in. SQLite is embedded in a way that is analogous to how one would imagine using a software library i.e. SQLite is designed to be used in this manner and therefore, for all intents and purposes, you could say that SQLite does not exist outside of Spin. When you run your Spin application using the [spin up](https://developer.fermyon.com/common/cli-reference#up) command SQLite is available to your application. When your application is no longer running, neither is SQLite. Your data will continue to persist at all times (including during restarts) and will support the running of your application up until you delete your application directory.

_References_:
* Learn about the basics with the [Spin v0.9.0 blog post](https://www.fermyon.com/blog/spin-v09) that introduces key/value support
* Get started with your first application using the [Key Value Storage: Spin tutorial](./kv-store.md)

---- 
**Original content**

A while back, around the Spin v0.5.0 version, we published an article on [Persistent Storage in Webassembly Applications](https://www.fermyon.com/blog/persistent-storage-in-webassembly-applications). In that previous article, we showed the Spin framework's capabilities of providing WebAssembly executables with access to different levels of on-disk persistence. We demonstrated manually installing Redis from source, running our Redis server on localhost and then reading and writing from Redis via both the Redis CLI itself and also via the Spin SDK. Our current documentation also has examples of using both [Redis](https://developer.fermyon.com/cloud/data-redis) and [PostgreSQL](https://developer.fermyon.com/cloud/data-postgres), via [Redis Labs](https://redis.com/) and [ElephantSQL](https://www.elephantsql.com/plans.html) services respectively. 

In all of these previous examples, to persist data within your application, a separate data storage layer is a requirement. These methods of data persistence are perfectly fine and sound to use, as part of your application, if you choose to do so.

However, from Spin v0.9.0 onwards, you are no longer required to install any on-disk persistence; outside of just installing Spin itself. SQLite exists inside Spin. SQLite is embedded in a way that is analogous to how one would imagine using a software library i.e. SQLite is designed to be used in this manner and therefore, for all intents and purposes, you could say that SQLite does not exist outside of Spin. When you run your Spin application using the [spin up](https://developer.fermyon.com/common/cli-reference#up) command SQLite is available to your application. When your application is no longer running, neither is SQLite. Your data will continue to persist at all times (including during restarts) and will support the running of your application.

In the future, it may be possible to embed other database technologies into Spin. For example, future Spin SDK updates may target other databases such as Redis; which may allow you to build applications using Redis via minimal Spin configuration without the need to locally install and maintain your own Redis instance.
>>>>>>> 12a551ca0d6ac384f84704b84f18dcd4a4bb3f41
