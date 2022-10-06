title = "Spin Command Line Interface (CLI) Reference"
template = "main"
date = "2022-01-01T00:00:01Z"
[extra]

---

## Spin Templates

Spin provides templates to bootstrap a new application.

### Install Templates (using GitHub URL)

Use `spin templates install --git <GitHubURL>` to install all available templates. For example:

```bash
spin templates install --git https://github.com/fermyon/spin
```

### Install Templates (Using a Local Spin Repository)

Use `spin templates install --dir <Repository>` to install all available templates. For example:

```bash
spin templates install --dir spin/
```

### List Templates

Use `spin templates list` to list all installed templates; returns output similar to the following:

```bash
+---------------------------------------------------+
| Name         Description                          |
+===================================================+
| http-go      HTTP request handler using (Tiny)Go  |
| http-grain   HTTP request handler using Grain     |
| http-rust    HTTP request handler using Rust      |
| http-swift   HTTP request handler using SwiftWasm |
| http-zig     HTTP request handler using Zig       |
| redis-go     Redis message handler using (Tiny)Go |
| redis-rust   Redis message handler using Rust     |
+---------------------------------------------------+
```

### Update Templates (using GitHub URL)

Use `spin templates install --update --git <GitHubURL>`  to update all of the already installed templates. For example:

```bash
spin templates install --update --git [https://github.com/fermyon/spin](https://github.com/fermyon/spin)
```

### Update Templates (Using a Local Spin Repository)

Use `spin templates install --update --dir <Repository>`  to update already installed templates. For example:

```bash
spin templates install --update --dir spin/
```

### Uninstall a Template

Use `spin templates uninstall <TemplateName>` to uninstall a specific template. For example:

```bash
spin templates uninstall http-c 
```

## Spin Applications

### Create a New Application

Use `spin new <TemplateName> <NewApplicationName>` to create a new application. For example:

```bash
	spin new http-rust hello-fermyon
```

### Build an Application

Use `spin build` from within the application’s main directory to build. For example:

```bash
cd hello-fermyon
spin build
```

### Deploy an Application

Use `spin deploy` to deploy it to Fermyon.