#!/usr/bin/env python3
"""Decision Hub command-line interface."""
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

    from decision_model_package.runner import run_package

    result = run_package(Path(args.package_dir), Path(args.instance))
    payload = json.dumps(result, indent=2, sort_keys=True)

    if args.output:
        Path(args.output).write_text(payload + "\n", encoding="utf-8")
    else:
        print(payload)

    return 0 if result.get("status") != "error" else 1


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Decision Hub CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    run_parser = subparsers.add_parser("run", help="Run a Decision Model Package v0.1")
    run_parser.add_argument("package_dir", help="Path to package root")
    run_parser.add_argument("--instance", required=True, help="Path to instance.json")
    run_parser.add_argument("--output", help="Optional output path for result JSON")
    run_parser.set_defaults(func=run_command)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
