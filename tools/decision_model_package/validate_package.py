#!/usr/bin/env python3
"""Validation utilities for Decision Model Package v0.1."""
from __future__ import annotations

import argparse
import ast
import json
from pathlib import Path
from typing import Iterable, Sequence

import jsonschema
import yaml

SCHEMA_DIR = Path(__file__).parent / "schemas"
INSTANCE_SCHEMA_SPEC = SCHEMA_DIR / "instance_schema.schema.json"
SOLVER_SCHEMA_SPEC = SCHEMA_DIR / "solver.schema.yaml"

REQUIRED_FILES = (
    "model.py",
    "instance_schema.json",
    "solver.yaml",
    "evaluate.py",
    "decision_card.md",
)

REQUIRED_MODEL_FUNCTIONS = {"create_model", "solve"}
REQUIRED_EVALUATE_FUNCTIONS = {"evaluate", "check_feasibility"}


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def load_yaml(path: Path) -> dict:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def iter_missing_files(root: Path, required: Sequence[str]) -> Iterable[str]:
    for name in required:
        if not (root / name).exists():
            yield name


def parse_functions(path: Path) -> set[str]:
    tree = ast.parse(path.read_text(encoding="utf-8"))
    return {node.name for node in tree.body if isinstance(node, ast.FunctionDef)}


def validate_functions(path: Path, required: set[str]) -> list[str]:
    available = parse_functions(path)
    missing = sorted(required - available)
    return [f"{path.name} missing function: {name}" for name in missing]


def validate_instance_schema(path: Path) -> list[str]:
    instance_schema = load_json(path)
    meta_schema = load_json(INSTANCE_SCHEMA_SPEC)
    validator = jsonschema.Draft202012Validator(meta_schema)
    errors = sorted(validator.iter_errors(instance_schema), key=lambda err: err.path)
    return [f"instance_schema.json: {error.message}" for error in errors]


def validate_solver_yaml(path: Path) -> list[str]:
    solver_config = load_yaml(path)
    schema = load_yaml(SOLVER_SCHEMA_SPEC)
    validator = jsonschema.Draft202012Validator(schema)
    errors = sorted(validator.iter_errors(solver_config), key=lambda err: err.path)
    return [f"solver.yaml: {error.message}" for error in errors]


def validate_decision_card(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    if not text.lstrip().startswith("---"):
        return ["decision_card.md: missing YAML front matter"]
    parts = text.split("---", 2)
    if len(parts) < 3:
        return ["decision_card.md: incomplete YAML front matter"]
    front_matter = yaml.safe_load(parts[1])
    if not isinstance(front_matter, dict):
        return ["decision_card.md: YAML front matter must be a mapping"]
    if front_matter.get("decision_model_package_version") != "0.1":
        return ["decision_card.md: decision_model_package_version must be '0.1'"]
    return []


def validate_package(root: Path) -> list[str]:
    errors: list[str] = []
    missing = list(iter_missing_files(root, REQUIRED_FILES))
    if missing:
        errors.append(f"Missing required files: {', '.join(missing)}")
        return errors

    errors.extend(validate_functions(root / "model.py", REQUIRED_MODEL_FUNCTIONS))
    errors.extend(validate_functions(root / "evaluate.py", REQUIRED_EVALUATE_FUNCTIONS))
    errors.extend(validate_instance_schema(root / "instance_schema.json"))
    errors.extend(validate_solver_yaml(root / "solver.yaml"))
    errors.extend(validate_decision_card(root / "decision_card.md"))
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate a Decision Model Package v0.1")
    parser.add_argument("package_dir", type=Path, help="Path to package root")
    args = parser.parse_args()

    errors = validate_package(args.package_dir)
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("Decision Model Package v0.1 validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
