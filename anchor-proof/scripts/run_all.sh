#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python "${ROOT_DIR}/../validate_dmp.py" "${ROOT_DIR}/dmp/"

decisionhub run "${ROOT_DIR}/dmp/" \
  --instance "${ROOT_DIR}/instances/instance_01.json" \
  --output "${ROOT_DIR}/benchmarks/results/instance_01.json"

decisionhub run-all "${ROOT_DIR}/dmp/" \
  --instances "${ROOT_DIR}/instances/" \
  --output "${ROOT_DIR}/benchmarks/results/"
