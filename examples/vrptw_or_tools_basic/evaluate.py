"""Evaluate VRPTW solution quality (mock)."""
from __future__ import annotations

from typing import Any, Dict, List, Tuple


def check_feasibility(solution: Dict[str, Any], instance: Dict[str, Any]) -> Tuple[bool, List[str]]:
    return True, []


def evaluate(
    solution: Dict[str, Any], instance: Dict[str, Any], runtime: float | None = None
) -> Dict[str, Any]:
    feasible, violations = check_feasibility(solution, instance)
    return {
        "feasible": feasible,
        "objective": None,
        "runtime": runtime,
        "violations": violations,
    }
