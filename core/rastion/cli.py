#!/usr/bin/env python3
"""Rastion command-line interface."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from importlib.util import find_spec


def run_command(args: argparse.Namespace) -> int:
    missing = [name for name in ("jsonschema", "yaml") if find_spec(name) is None]
    if missing:
        print("Missing required dependencies: jsonschema, PyYAML")
        print("Install with: pip install jsonschema PyYAML")
        return 1

    from .decision_model_package.runner import run_package

    result = run_package(Path(args.package_dir), Path(args.instance))
    payload = json.dumps(result, indent=2, sort_keys=True)

    if args.output:
        Path(args.output).write_text(payload + "\n", encoding="utf-8")
    else:
        print(payload)

    return 0 if result.get("status") != "error" else 1


def run_all_command(args: argparse.Namespace) -> int:
    missing = [name for name in ("jsonschema", "yaml") if find_spec(name) is None]
    if missing:
        print("Missing required dependencies: jsonschema, PyYAML")
        print("Install with: pip install jsonschema PyYAML")
        return 1

    from .decision_model_package.runner import run_package

    package_dir = Path(args.package_dir)
    instances_dir = Path(args.instances)
    output_dir = Path(args.output)
    if not instances_dir.is_dir():
        print(f"Instances directory not found: {instances_dir}")
        return 1
    instance_paths = sorted(instances_dir.glob("*.json"))

    if not instance_paths:
        print(f"No instance JSON files found in {instances_dir}")
        return 1

    output_dir.mkdir(parents=True, exist_ok=True)

    for instance_path in instance_paths:
        result = run_package(package_dir, instance_path)
        payload = json.dumps(result, indent=2, sort_keys=True)
        output_path = output_dir / instance_path.name
        output_path.write_text(payload + "\n", encoding="utf-8")
        if result.get("status") == "error":
            return 1

    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Rastion CLI (Decision Model Package v0.1 runner)")
    subparsers = parser.add_subparsers(dest="command", required=True)

    run_parser = subparsers.add_parser("run", help="Run a Decision Model Package v0.1")
    run_parser.add_argument("package_dir", help="Path to package root")
    run_parser.add_argument("--instance", required=True, help="Path to instance.json")
    run_parser.add_argument("--output", help="Optional output path for result JSON")
    run_parser.set_defaults(func=run_command)

    run_all_parser = subparsers.add_parser(
        "run-all", help="Run a Decision Model Package v0.1 across multiple instances"
    )
    run_all_parser.add_argument("package_dir", help="Path to package root")
    run_all_parser.add_argument("--instances", required=True, help="Path to instances directory")
    run_all_parser.add_argument("--output", required=True, help="Output directory for result JSON files")
    run_all_parser.set_defaults(func=run_all_command)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
