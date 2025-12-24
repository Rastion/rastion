"""VRPTW OR-Tools Basic (mock)."""
from __future__ import annotations

from typing import Any, Dict, Optional


def create_model(instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> Any:
    """Create and return solver-specific model artifacts."""
    return {"instance": instance, "solver": solver_config or {}}


def solve(
    model: Any, instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Return a placeholder solution payload."""
    return {
        "status": "feasible",
        "solution": {"routes": []},
        "objective": None,
        "metrics": {},
        "runtime_seconds": 0.0,
    }
