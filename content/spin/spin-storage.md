title = "Persistent Data: Spin"
template = "spin_main"
date = "2023-03-14T00:22:56Z"
enable_shortcodes = true

---
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