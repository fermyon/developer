title = "Deploy an application"
template = "cloud_main"
date = "2022-03-14T00:22:56Z"

---

This document will guide you through deploying a Spin Application with the Fermyon Cloud. You can deploy your Spin App or Bartholomew site in just a few steps. 

## Setup

Firstly, you need to have the latest Spin Version installed and locally available in your path. You can do that by using this command in your terminal:
```
bash curl https://developer.fermyon.dev/downloads/install.sh | bash
```
## Login to the Fermyon Cloud

Next, you can Log in to the Fermyon Cloud, and it requires your GitHub account to sign in:
```
./spin login
```

This command generates an authentication code for your device to be authorized on the Fermyon Cloud. 

## Deployment

After building the project and testing it, the next thing to do is deployment. As mentioned above, you need to have the spin binary in your path. Now let’s deploy.
```
./spin deploy
```

## Congratulations on Deploying your Spin Application! 🥳

You have now deployed your Spin Application to the Fermyon Cloud. You should also use these steps if you want to deploy a Bartholomew Site. It works just the same way. You should find something like this output after deploying your application:
```
curl -i <my url>
```

Next, we’ll take a look at [search logs](/search-logs).
