#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: ./scripts/new_dmp.sh <target_dir> <problem_class> <package_name>" >&2
}

if [[ $# -ne 3 ]]; then
  usage
  exit 1
fi

target_dir=$1
problem_class=$2
package_name=$3

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
repo_root=$(cd "${script_dir}/.." && pwd)
template_dir="${repo_root}/templates/minimal-dmp"

if [[ ! -d "${template_dir}" ]]; then
  echo "Template directory not found: ${template_dir}" >&2
  exit 1
fi

if [[ -e "${target_dir}" ]]; then
  echo "Target already exists: ${target_dir}" >&2
  exit 1
fi

mkdir -p "$(dirname "${target_dir}")"
cp -R "${template_dir}" "${target_dir}"
mkdir -p "${target_dir}/instances"

export TARGET_DIR="${target_dir}"
export PROBLEM_CLASS="${problem_class}"
export PACKAGE_NAME="${package_name}"

python - <<'PY'
from pathlib import Path
import json
import re
import os

from_path = Path(os.environ["TARGET_DIR"])
problem_class = os.environ["PROBLEM_CLASS"]
package_name = os.environ["PACKAGE_NAME"]

decision_card = from_path / "decision_card.md"
text = decision_card.read_text()
parts = text.split("---")
if len(parts) < 3:
    raise SystemExit("decision_card.md missing front matter")
body = "---".join(parts[2:]).lstrip("\n")
front_matter = f"""---\nname: \"{package_name}\"\nversion: \"0.1.0\"\ndecision_model_package_version: \"0.1\"\nproblem_class: \"{problem_class}\"\nlicense: \"MIT\"\nauthors:\n  - name: \"Your Name\"\ntags:\n  - \"{problem_class}\"\n  - \"{package_name}\"\n---\n"""

decision_card.write_text(front_matter + "\n" + body)

instance_schema = from_path / "instance_schema.json"
instance_data = json.loads(instance_schema.read_text())
instance_data["$id"] = f"https://example.com/dmps/{package_name}/instance.schema.json"
instance_schema.write_text(json.dumps(instance_data, indent=2) + "\n")

model_file = from_path / "model.py"
model_text = model_file.read_text()
if "TODO:" not in model_text:
    model_text = re.sub(
        r'(\"\"\".*?\"\"\"\n)',
        r"\1\n# TODO: Replace the minimal model with your own data structures.\n# TODO: Implement solver logic that returns a solution dict for your problem.\n",
        model_text,
        count=1,
        flags=re.S,
    )
    model_file.write_text(model_text)

eval_file = from_path / "evaluate.py"
eval_text = eval_file.read_text()
if "TODO:" not in eval_text:
    eval_text = re.sub(
        r'(\"\"\".*?\"\"\"\n)',
        r"\1\n# TODO: Define evaluation metrics and feasibility checks for your solution.\n# TODO: Ensure evaluation remains deterministic and returns JSON-serializable data.\n",
        eval_text,
        count=1,
        flags=re.S,
    )
    eval_file.write_text(eval_text)
PY

echo "Scaffolded new DMP at ${target_dir}"
echo
echo "Next steps:"
echo "  1. Add instance JSON files under ${target_dir}/instances/"
echo "  2. python validate_dmp.py ${target_dir}"
echo "  3. decisionhub run-all ${target_dir} --instances ${target_dir}/instances --output ${target_dir}/output"
