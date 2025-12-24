"""Knapsack Dynamic Programming baseline."""
from __future__ import annotations

from typing import Any, Dict, Optional


def create_model(instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> Any:
    """Create and return solver-specific model artifacts."""
    return {
        "instance": instance,
        "solver": solver_config or {},
    }


def solve(
    model: Any, instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Solve the knapsack instance via dynamic programming."""
    weights = instance["weights"]
    values = instance["values"]
    capacity = instance["capacity"]
    item_count = len(weights)

    table = [[0 for _ in range(capacity + 1)] for _ in range(item_count + 1)]

    for i in range(1, item_count + 1):
        weight = weights[i - 1]
        value = values[i - 1]
        for cap in range(capacity + 1):
            if weight <= cap:
                take = value + table[i - 1][cap - weight]
                skip = table[i - 1][cap]
                table[i][cap] = max(take, skip)
            else:
                table[i][cap] = table[i - 1][cap]

    selected_items: list[int] = []
    remaining_capacity = capacity
    for i in range(item_count, 0, -1):
        if table[i][remaining_capacity] != table[i - 1][remaining_capacity]:
            selected_items.append(i - 1)
            remaining_capacity -= weights[i - 1]

    selected_items.reverse()
    total_value = sum(values[i] for i in selected_items)

    return {
        "status": "optimal",
        "solution": {"routes": [selected_items]},
        "objective": float(total_value),
        "metrics": {},
        "runtime_seconds": 0.0,
    }
