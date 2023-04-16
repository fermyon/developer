variable "region" {
  type    = string
}

variable "git_ref" {
  type        = string
  default     = "refs/heads/main"
  description = "Git ref to use for the fermyon/developer repo clone. Default: refs/heads/main"
}

variable "commit_sha" {
  type        = string
  default     = ""
  description = "Specific commit SHA to check out. Default: empty/none"
}

job "publish-fermyon-developer" {
  type        = "batch"
  datacenters = [
    "${var.region}a",
    "${var.region}b",
    "${var.region}c",
    "${var.region}d",
    "${var.region}e",
    "${var.region}f"
  ]

  group "publish-fermyon-developer" {
    count = 1

    task "publish-fermyon-developer" {
      driver = "exec"

      artifact {
        source = "https://github.com/fermyon/spin/releases/download/v0.10.1/spin-v0.10.1-linux-amd64.tar.gz"
        options {
          checksum = "sha256:105054335fd76b3d2a1b76a705dbdb3b83d7e4093b302a7816ce7f922893f29d"
        }
      }

      env {
        BINDLE_URL = "http://bindle.service.consul:3030/v1"
      }

      template {
        data = <<-EOF
        #!/bin/bash
        set -euo pipefail

        readonly repo_dir="${NOMAD_ALLOC_DIR}/fermyon-developer"

        # Capture branch/tag name from full ref
        readonly branch="$(echo ${var.git_ref} | cut -d'/' -f3-)"
        
        # Directory and contents may be non-empty if this job is retrying while the
        # bindle server is still coming up. (git clone will complain)
        rm -rf ${repo_dir}
        git clone -b ${branch} https://github.com/fermyon/developer.git ${repo_dir}
        cd ${repo_dir}

        # Check out commit if provided
        [[ "${var.commit_sha}" == "" ]] || git checkout ${var.commit_sha}

        ${NOMAD_TASK_DIR}/spin bindle push \
          -f spin.toml \
          -d ./staging_dir \
          --buildinfo "g$(git rev-parse HEAD)-$(date '+%Y%m%d%M%H%M%S')"
        EOF
        destination = "${NOMAD_TASK_DIR}/publish.bash"
        perms       = "700"
      }

      config {
        command = "${NOMAD_TASK_DIR}/publish.bash"
      }
    }
  }
}