"""Evaluate knapsack solution quality."""
from __future__ import annotations

from typing import Any, Dict, List, Tuple


def check_feasibility(solution: Dict[str, Any], instance: Dict[str, Any]) -> Tuple[bool, List[str]]:
    violations: list[str] = []
    weights = instance["weights"]
    values = instance["values"]
    capacity = instance["capacity"]

    routes = solution.get("routes", [])
    selected_items = [item for route in routes for item in route]

    if len(selected_items) != len(set(selected_items)):
        violations.append("Duplicate item selected")

    invalid_items = [item for item in selected_items if item < 0 or item >= len(weights)]
    if invalid_items:
        violations.append("Selected item index out of range")

    total_weight = sum(weights[item] for item in selected_items if 0 <= item < len(weights))
    if total_weight > capacity:
        violations.append("Capacity exceeded")

    if len(weights) != len(values):
        violations.append("Weights and values length mismatch")

    return len(violations) == 0, violations


def evaluate(
    solution: Dict[str, Any], instance: Dict[str, Any], runtime: float | None = None
) -> Dict[str, Any]:
    feasible, violations = check_feasibility(solution, instance)
    objective = None
    if feasible:
        values = instance["values"]
        routes = solution.get("routes", [])
        selected_items = [item for route in routes for item in route]
        objective = float(sum(values[item] for item in selected_items))

    return {
        "feasible": feasible,
        "objective": objective,
        "runtime": runtime,
        "runtime_seconds": runtime,
        "violations": violations,
    }
