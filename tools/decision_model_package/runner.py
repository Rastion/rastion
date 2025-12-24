#!/usr/bin/env python3
"""Reference execution runner for Decision Model Package v0.1."""
from __future__ import annotations

import argparse
import importlib.util
import inspect
import json
import sys
import time
import traceback
from pathlib import Path
from typing import Any, Callable, Dict

import jsonschema
import yaml

PACKAGE_ROOT = Path(__file__).resolve().parent
if str(PACKAGE_ROOT.parent) not in sys.path:
    sys.path.insert(0, str(PACKAGE_ROOT.parent))

from decision_model_package.validate_package import validate_package

ALLOWED_STATUSES = {"feasible", "optimal", "infeasible", "error"}


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def load_yaml(path: Path) -> dict:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def import_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise ImportError(f"Unable to import module from {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def call_with_supported_args(func: Callable[..., Any], **kwargs: Any) -> Any:
    signature = inspect.signature(func)
    if any(param.kind == param.VAR_KEYWORD for param in signature.parameters.values()):
        return func(**kwargs)
    filtered = {name: value for name, value in kwargs.items() if name in signature.parameters}
    return func(**filtered)


def validate_instance(instance: dict, schema_path: Path) -> list[str]:
    schema = load_json(schema_path)
    validator = jsonschema.Draft202012Validator(schema)
    errors = sorted(validator.iter_errors(instance), key=lambda err: err.path)
    return [f"instance.json: {error.message}" for error in errors]


def normalize_status(solve_status: Any, feasible: Any) -> str:
    if isinstance(solve_status, str) and solve_status in ALLOWED_STATUSES:
        if feasible is False and solve_status in {"feasible", "optimal"}:
            return "infeasible"
        return solve_status
    if feasible is True:
        return "feasible"
    if feasible is False:
        return "infeasible"
    return "error"


def build_result(
    *,
    status: str,
    feasible: bool,
    objective: float | None,
    runtime_seconds: float,
    violations: list[str],
    solution: dict,
    solver: dict,
    metadata: dict,
) -> dict:
    return {
        "status": status,
        "feasible": feasible,
        "objective": objective,
        "runtime_seconds": runtime_seconds,
        "violations": violations,
        "solution": solution,
        "solver": solver,
        "metadata": metadata,
    }


def build_error_result(
    errors: list[str],
    runtime_seconds: float,
    solver: dict | None = None,
    metadata: dict | None = None,
) -> dict:
    return build_result(
        status="error",
        feasible=False,
        objective=None,
        runtime_seconds=runtime_seconds,
        violations=errors,
        solution={},
        solver=solver or {},
        metadata=metadata or {},
    )


def run_package(package_dir: Path, instance_path: Path) -> dict:
    start_time = time.perf_counter()
    solver_config: dict = {}

    try:
        validation_errors = validate_package(package_dir)
        if validation_errors:
            runtime = time.perf_counter() - start_time
            return build_error_result(validation_errors, runtime)

        solver_config = load_yaml(package_dir / "solver.yaml")
        instance = load_json(instance_path)
        instance_errors = validate_instance(instance, package_dir / "instance_schema.json")
        if instance_errors:
            runtime = time.perf_counter() - start_time
            return build_error_result(
                instance_errors,
                runtime,
                solver=solver_config,
                metadata={"error_type": "DMP_INPUT_INVALID"},
            )

        model_module = import_module(package_dir / "model.py", "dmp_model")
        evaluate_module = import_module(package_dir / "evaluate.py", "dmp_evaluate")

        model = call_with_supported_args(
            model_module.create_model, instance=instance, solver_config=solver_config
        )

        solve_start = time.perf_counter()
        solve_result = call_with_supported_args(
            model_module.solve,
            model=model,
            instance=instance,
            solver_config=solver_config,
        )
        solve_runtime = time.perf_counter() - solve_start

        if not isinstance(solve_result, dict):
            runtime = time.perf_counter() - start_time
            return build_error_result(
                ["DMP_SOLVE_INVALID: solve() must return a JSON-serializable object"],
                runtime,
                solver=solver_config,
            )

        solution_payload = solve_result.get("solution", solve_result)
        evaluate_start = time.perf_counter()
        evaluation = call_with_supported_args(
            evaluate_module.evaluate,
            solution=solution_payload,
            instance=instance,
            runtime=solve_runtime,
        )
        evaluate_runtime = time.perf_counter() - evaluate_start

        if not isinstance(evaluation, dict):
            runtime = time.perf_counter() - start_time
            return build_error_result(
                ["DMP_EVALUATE_INVALID: evaluate() must return a JSON-serializable object"],
                runtime,
                solver=solver_config,
            )

        feasible = evaluation.get("feasible")
        status = normalize_status(solve_result.get("status"), feasible)
        objective = evaluation.get("objective", solve_result.get("objective"))
        violations = evaluation.get("violations", [])
        runtime = time.perf_counter() - start_time

        metadata = {
            "runner": {
                "solve_seconds": solve_runtime,
                "evaluate_seconds": evaluate_runtime,
            },
            "solve": {
                "status": solve_result.get("status"),
                "objective": solve_result.get("objective"),
                "metrics": solve_result.get("metrics"),
                "runtime_seconds": solve_result.get("runtime_seconds"),
            },
            "evaluation": {
                "runtime": evaluation.get("runtime"),
                "metrics": evaluation.get("metrics"),
            },
        }

        return build_result(
            status=status,
            feasible=bool(feasible) if feasible is not None else status in {"feasible", "optimal"},
            objective=objective,
            runtime_seconds=runtime,
            violations=list(violations),
            solution=solution_payload if isinstance(solution_payload, dict) else {"value": solution_payload},
            solver=solver_config,
            metadata=metadata,
        )
    except Exception as exc:
        runtime = time.perf_counter() - start_time
        diagnostics = {
            "error_type": type(exc).__name__,
            "message": str(exc),
            "traceback": traceback.format_exc(),
        }
        return build_error_result(
            ["DMP_RUNTIME_ERROR: unexpected failure during execution"],
            runtime,
            solver=solver_config,
            metadata=diagnostics,
        )


def main() -> int:
    parser = argparse.ArgumentParser(description="Run a Decision Model Package v0.1")
    parser.add_argument("package_dir", type=Path, help="Path to package root")
    parser.add_argument("--instance", required=True, type=Path, help="Path to instance.json")
    parser.add_argument("--output", type=Path, help="Optional output path for result JSON")
    args = parser.parse_args()

    result = run_package(args.package_dir, args.instance)
    payload = json.dumps(result, indent=2, sort_keys=True)

    if args.output:
        args.output.write_text(payload + "\n", encoding="utf-8")
    else:
        print(payload)

    return 0 if result.get("status") != "error" else 1


if __name__ == "__main__":
    raise SystemExit(main())
