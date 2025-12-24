from __future__ import annotations

from typing import Any


def create_model(instance: dict, solver_config: dict | None = None) -> dict:
    return {
        "capacity": instance["capacity"],
        "items": instance["items"],
    }


def solve(model: dict, instance: dict | None = None, solver_config: dict | None = None) -> dict:
    items = model["items"]
    capacity = model["capacity"]

    def sort_key(item: dict[str, Any]) -> tuple[float, str]:
        return (-item["value"] / item["weight"], item["id"])

    selected_ids: list[str] = []
    total_weight = 0.0
    total_value = 0.0

    for item in sorted(items, key=sort_key):
        if total_weight + item["weight"] <= capacity:
            selected_ids.append(item["id"])
            total_weight += item["weight"]
            total_value += item["value"]

    return {
        "status": "feasible",
        "objective": total_value,
        "solution": {
            "selected_item_ids": selected_ids,
        },
    }
