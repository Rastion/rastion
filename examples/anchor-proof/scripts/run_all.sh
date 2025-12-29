#!/usr/bin/env bash
set -euo pipefail

# Directory containing this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Anchor-proof root (examples/anchor-proof)
ANCHOR_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Repo root
REPO_ROOT="$(cd "$ANCHOR_ROOT/../.." && pwd)"

python "$REPO_ROOT/validate_dmp.py" "$ANCHOR_ROOT/dmp/"

decisionhub run "$ANCHOR_ROOT/dmp/" \
  --instance "$ANCHOR_ROOT/instances/instance_01.json" \
  --output "$ANCHOR_ROOT/benchmarks/results/instance_01.json"

decisionhub run-all "$ANCHOR_ROOT/dmp/" \
  --instances "$ANCHOR_ROOT/instances/" \
  --output "$ANCHOR_ROOT/benchmarks/results/"
