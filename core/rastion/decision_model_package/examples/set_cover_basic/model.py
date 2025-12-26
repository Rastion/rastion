"""Greedy set cover baseline."""
from __future__ import annotations

from typing import Any, Dict, List, Optional


def create_model(instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Pass through instance data for the solver."""
    return {
        "universe": list(instance["universe"]),
        "sets": list(instance["sets"]),
        "solver": solver_config or {},
    }


def solve(
    model: Dict[str, Any], instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Solve the set cover instance using a deterministic greedy heuristic."""
    universe = list(instance["universe"])
    available_sets = list(instance["sets"])
    uncovered = set(universe)
    selected_ids: List[str] = []

    while uncovered:
        best_choice = None
        for set_data in available_sets:
            set_elements = set(set_data["elements"])
            newly_covered = uncovered & set_elements
            if not newly_covered:
                continue
            ratio = set_data["cost"] / len(newly_covered)
            candidate = (
                ratio,
                set_data["cost"],
                set_data["id"],
                set_data,
            )
            if best_choice is None or candidate[:3] < best_choice[:3]:
                best_choice = candidate

        if best_choice is None:
            break

        chosen_set = best_choice[3]
        selected_ids.append(chosen_set["id"])
        uncovered -= set(chosen_set["elements"])

    total_cost = sum(
        set_data["cost"]
        for set_data in available_sets
        if set_data["id"] in set(selected_ids)
    )
    feasible = not uncovered

    return {
        "status": "feasible" if feasible else "infeasible",
        "solution": {"selected_set_ids": selected_ids},
        "objective": float(total_cost) if feasible else None,
        "metrics": {},
        "runtime_seconds": 0.0,
    }
