# Deployments

The [Developer](https://developer.fermyon.com) website is deployed via the [deploy.yaml](../.github/workflows/deploy.yml) GitHub workflow.

## Auto Deploys

The production version of the website is deployed whenever commits are pushed to the `main` branch.

## Manual Deploys

Deployments may also be [triggered manually](https://github.com/fermyon/developer/actions/workflows/deploy.yml), providing a choice of `ref`, `sha` and `environment` (eg canary or prod).

## Nomad jobs

We currently deploy the website via its Nomad job directly. (In the future, we envision running the website as a Fermyon Cloud app.)

The [publish-fermyon-developer](./publish-fermyon-developer.nomad) Nomad job checks out this repo's source code and publishes it to Bindle.

The [fermyon-developer](./fermyon-developer.nomad) Nomad job contains configuration for the running website, including the bindle ID to run from.