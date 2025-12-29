"""Evaluate set cover solution quality."""
from __future__ import annotations

from typing import Any, Dict, List, Tuple


def check_feasibility(solution: Dict[str, Any], instance: Dict[str, Any]) -> Tuple[bool, List[str], Dict[str, Any]]:
    violations: list[str] = []
    universe = set(instance["universe"])
    available_sets = {set_data["id"]: set_data for set_data in instance["sets"]}

    selected_ids = solution.get("selected_set_ids", [])
    unknown_ids = [set_id for set_id in selected_ids if set_id not in available_sets]
    if unknown_ids:
        violations.append("Unknown set ids selected")

    covered_elements: set[str] = set()
    total_cost = 0.0
    for set_id in selected_ids:
        set_data = available_sets.get(set_id)
        if not set_data:
            continue
        covered_elements |= set(set_data["elements"])
        total_cost += set_data["cost"]

    if not universe.issubset(covered_elements):
        violations.append("Not all universe elements are covered")

    metrics = {
        "covered_count": len(covered_elements & universe),
        "selected_count": len(selected_ids),
        "total_cost": float(total_cost),
    }

    return len(violations) == 0, violations, metrics


def evaluate(solution: Dict[str, Any], instance: Dict[str, Any], runtime: float | None = None) -> Dict[str, Any]:
    feasible, violations, metrics = check_feasibility(solution, instance)
    objective = metrics["total_cost"] if feasible else None

    return {
        "feasible": feasible,
        "objective": objective,
        "runtime": runtime,
        "runtime_seconds": runtime,
        "violations": violations,
        "metrics": metrics,
    }
