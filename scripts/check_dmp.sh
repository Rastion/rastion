#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: ./scripts/check_dmp.sh <dmp> <instances_dir> <out_dir>" >&2
}

if [[ $# -ne 3 ]]; then
  usage
  exit 1
fi

dmp="$1"
instances_dir="$2"
out_dir="$3"

if [[ ! -d "${instances_dir}" ]]; then
  echo "Instances directory not found: ${instances_dir}" >&2
  exit 1
fi

mkdir -p "${out_dir}"

python validate_dmp.py "${dmp}"
decisionhub run-all "${dmp}" --instances "${instances_dir}" --output "${out_dir}"
