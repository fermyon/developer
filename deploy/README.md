# Deployments

The [Developer](https://developer.fermyon.com) website is deployed via the [deploy.yml](../.github/workflows/deploy.yml) GitHub workflow.

## Publishing

In advance of deployment, the Spin app for this website is [published]((../.github/workflows/publish.yml)) to an OCI registry.

In the case of publishing from the `main` branch, both a mutable tag and an immutable tag is pushed: `latest` and `main-<commit sha>` respectively.

## Auto Deploys

The production version of the website is deployed whenever commits are pushed to the `main` branch.

## Manual Deploys

Deployments may also be [triggered manually](https://github.com/fermyon/developer/actions/workflows/deploy.yml), providing a choice of OCI
reference name and tag (`oci_ref_name`, `oci_ref_tag`) and `environment` (eg canary or prod).

## Nomad job

We currently deploy the website via its Nomad job directly. (In the future, we envision running the website as a Fermyon Cloud app.)

The [fermyon-developer](./fermyon-developer.nomad) Nomad job contains configuration for the running website, including the OCI reference to run from.