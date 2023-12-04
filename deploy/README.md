# Deployments

The [Developer](https://developer.fermyon.com) website is deployed via the [deploy.yml](../.github/workflows/deploy.yml) GitHub workflow.

## Auto Deploys

The production version of the website is deployed whenever commits are pushed to the `main` branch.

## Manual Deploys

Deployments may also be [triggered manually](https://github.com/fermyon/developer/actions/workflows/deploy.yml), providing a choice of git
`ref` and `commit`.

## Nomad job

We currently deploy the website via its Nomad job directly. (In the future, we envision running the website as a Fermyon Cloud app.)

The [fermyon-developer](./fermyon-developer.nomad) Nomad job contains configuration for the running website, including the OCI reference to run from.
