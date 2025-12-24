#!/usr/bin/env python3
"""Lightweight static validator for Decision Model Package (DMP) v0.1.

This script performs structural and schema validation only.
It does not execute the model, solver, or evaluation logic.

Usage:
  python validate_dmp.py /path/to/dmp
"""

from __future__ import annotations

import argparse
import ast
import json
import re
from pathlib import Path

import jsonschema
import yaml

REQUIRED_FILES = [
    "model.py",
    "instance_schema.json",
    "solver.yaml",
    "evaluate.py",
    "decision_card.md",
]

SEMVER_PATTERN = re.compile(r"^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$")

SUPPORTED_SCHEMA_DIALECTS = {
    "draft-07": jsonschema.Draft7Validator,
    "2020-12": jsonschema.Draft202012Validator,
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate a DMP v0.1 package.")
    parser.add_argument("package_root", help="Path to the DMP package root")
    return parser.parse_args()


def list_top_level_functions(path: Path) -> set[str]:
    try:
        source = path.read_text(encoding="utf-8")
    except OSError as exc:
        raise RuntimeError(f"Failed to read {path.name}: {exc}") from exc

    try:
        tree = ast.parse(source, filename=str(path))
    except SyntaxError as exc:
        raise RuntimeError(f"Syntax error in {path.name}: {exc.msg} (line {exc.lineno})") from exc

    return {node.name for node in tree.body if isinstance(node, ast.FunctionDef)}


def validate_required_files(package_root: Path, errors: list[str]) -> None:
    for filename in REQUIRED_FILES:
        path = package_root / filename
        if not path.exists():
            errors.append(f"Missing required file: {filename}")


def detect_schema_dialect(schema_uri: str) -> str | None:
    for key in SUPPORTED_SCHEMA_DIALECTS:
        if key in schema_uri:
            return key
    return None


def validate_instance_schema(package_root: Path, errors: list[str]) -> None:
    schema_path = package_root / "instance_schema.json"
    if not schema_path.exists():
        return

    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        errors.append(f"instance_schema.json is not valid JSON: {exc.msg} (line {exc.lineno})")
        return
    except OSError as exc:
        errors.append(f"Failed to read instance_schema.json: {exc}")
        return

    if not isinstance(schema, dict):
        errors.append("instance_schema.json must be a JSON object")
        return

    schema_uri = schema.get("$schema")
    if not isinstance(schema_uri, str):
        errors.append("instance_schema.json must declare a $schema string")
        return

    dialect_key = detect_schema_dialect(schema_uri)
    if not dialect_key:
        errors.append(
            "instance_schema.json declares an unsupported $schema; supported: draft-07, draft 2020-12"
        )
        return

    validator_cls = SUPPORTED_SCHEMA_DIALECTS[dialect_key]
    try:
        validator_cls.check_schema(schema)
    except jsonschema.exceptions.SchemaError as exc:
        errors.append(f"instance_schema.json is not valid JSON Schema: {exc.message}")


def validate_model_functions(package_root: Path, errors: list[str]) -> None:
    model_path = package_root / "model.py"
    if not model_path.exists():
        return

    try:
        functions = list_top_level_functions(model_path)
    except RuntimeError as exc:
        errors.append(str(exc))
        return

    for required in ("create_model", "solve"):
        if required not in functions:
            errors.append(f"model.py must define top-level function: {required}()")


def validate_evaluate_functions(package_root: Path, errors: list[str]) -> None:
    evaluate_path = package_root / "evaluate.py"
    if not evaluate_path.exists():
        return

    try:
        functions = list_top_level_functions(evaluate_path)
    except RuntimeError as exc:
        errors.append(str(exc))
        return

    for required in ("evaluate", "check_feasibility"):
        if required not in functions:
            errors.append(f"evaluate.py must define top-level function: {required}()")


def parse_front_matter(content: str) -> tuple[dict | None, str | None]:
    lines = content.splitlines()
    if not lines or lines[0].strip() != "---":
        return None, "decision_card.md must start with YAML front matter (---)"

    end_index = None
    for index, line in enumerate(lines[1:], start=1):
        if line.strip() in {"---", "..."}:
            end_index = index
            break

    if end_index is None:
        return None, "decision_card.md front matter is not terminated with ---"

    front_matter = "\n".join(lines[1:end_index])
    try:
        data = yaml.safe_load(front_matter)
    except yaml.YAMLError as exc:
        return None, f"decision_card.md front matter is invalid YAML: {exc}"

    return data, None


def validate_decision_card(package_root: Path, errors: list[str]) -> None:
    card_path = package_root / "decision_card.md"
    if not card_path.exists():
        return

    try:
        content = card_path.read_text(encoding="utf-8")
    except OSError as exc:
        errors.append(f"Failed to read decision_card.md: {exc}")
        return

    data, error = parse_front_matter(content)
    if error:
        errors.append(error)
        return

    if not isinstance(data, dict):
        errors.append("decision_card.md front matter must be a YAML mapping")
        return

    required_fields = [
        "name",
        "version",
        "decision_model_package_version",
        "problem_class",
        "license",
        "authors",
        "tags",
    ]

    for field in required_fields:
        if field not in data:
            errors.append(f"decision_card.md front matter missing required field: {field}")

    dmp_version = data.get("decision_model_package_version")
    if dmp_version is not None and dmp_version != "0.1":
        errors.append("decision_model_package_version must be '0.1'")

    version = data.get("version")
    if version is not None:
        if not isinstance(version, str) or not SEMVER_PATTERN.match(version):
            errors.append(
                "version must be a SemVer-like string (e.g. 1.2.3 or 1.2.3-alpha)"
            )

    authors = data.get("authors")
    if authors is not None:
        if not isinstance(authors, list) or not authors:
            errors.append("authors must be a non-empty list")
        else:
            for index, author in enumerate(authors, start=1):
                if not isinstance(author, dict):
                    errors.append(f"authors[{index}] must be a mapping")
                    continue
                name = author.get("name")
                if not isinstance(name, str) or not name.strip():
                    errors.append(f"authors[{index}].name must be a non-empty string")

    tags = data.get("tags")
    if tags is not None:
        if not isinstance(tags, list) or not tags:
            errors.append("tags must be a non-empty list of strings")
        else:
            for index, tag in enumerate(tags, start=1):
                if not isinstance(tag, str) or not tag.strip():
                    errors.append(f"tags[{index}] must be a non-empty string")


def validate_package(package_root: Path) -> list[str]:
    errors: list[str] = []
    if not package_root.exists():
        return [f"Package root does not exist: {package_root}"]
    if not package_root.is_dir():
        return [f"Package root is not a directory: {package_root}"]

    validate_required_files(package_root, errors)
    validate_instance_schema(package_root, errors)
    validate_model_functions(package_root, errors)
    validate_evaluate_functions(package_root, errors)
    validate_decision_card(package_root, errors)

    return errors


def main() -> int:
    args = parse_args()
    package_root = Path(args.package_root).resolve()
    errors = validate_package(package_root)

    if errors:
        print("DMP validation failed with the following issues:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("DMP validation passed: package appears compliant with v0.1 requirements.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
