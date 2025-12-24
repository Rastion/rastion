from __future__ import annotations


def check_feasibility(solution: dict, instance: dict) -> dict:
    items_by_id = {item["id"]: item for item in instance["items"]}
    selected_ids = solution.get("selected_item_ids", [])

    violations: list[str] = []
    unknown_ids = [item_id for item_id in selected_ids if item_id not in items_by_id]
    if unknown_ids:
        violations.append(f"Unknown item ids: {', '.join(sorted(unknown_ids))}")

    total_weight = sum(
        items_by_id[item_id]["weight"]
        for item_id in selected_ids
        if item_id in items_by_id
    )

    if total_weight > instance["capacity"]:
        violations.append("Total weight exceeds capacity")

    return {
        "feasible": not violations,
        "violations": violations,
        "metrics": {
            "total_weight": total_weight,
            "selected_count": len(selected_ids),
        },
    }


def evaluate(
    solution: dict,
    instance: dict,
    runtime: float | None = None,
) -> dict:
    feasibility = check_feasibility(solution, instance)
    items_by_id = {item["id"]: item for item in instance["items"]}
    total_value = sum(
        items_by_id[item_id]["value"]
        for item_id in solution.get("selected_item_ids", [])
        if item_id in items_by_id
    )

    metrics = dict(feasibility["metrics"])
    if runtime is not None:
        metrics["solve_runtime_seconds"] = runtime

    return {
        "feasible": feasibility["feasible"],
        "objective": total_value if feasibility["feasible"] else None,
        "violations": feasibility["violations"],
        "metrics": metrics,
    }
