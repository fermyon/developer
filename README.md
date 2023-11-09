# The Fermyon developer website

Prerequisites to run the website locally:

- [npm and node](https://docs.npmjs.com/cli/v8/configuring-npm/install)
- [Spin](https://developer.fermyon.com/spin/quickstart)

Build and run the website locally:

1. Run the following npm commands:

```bash
git clone https://github.com/fermyon/developer.git
cd developer
cd spin-up-hub
npm install
cd ../
npm install
spin build
spin watch # Uses spin watch to run the website and reload when content changes
```

1. View the website at `http://localhost:3000`

Editing the contents:

If you would like to edit the contents of the [developer.fermyon.com](https://developer.fermyon.com/) website, and contribute your changes, please visit the [Contributing to Docs](https://developer.fermyon.com/spin/contributing-docs) page.
