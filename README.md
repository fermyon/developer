# The Fermyon developer website

Prerequisites to run the website locally:

- [npm and node](https://docs.npmjs.com/cli/v8/configuring-npm/install)
- [Spin](https://spinframework.dev/spin/quickstart)

Build and run the website locally:

1. Run the following commands:

```bash
cd spin-up-hub
npm ci
cd ../
npm ci
spin build
spin watch # Uses spin watch to run the website and reload when content changes.
```

2. View the website at `http://localhost:3000`.
