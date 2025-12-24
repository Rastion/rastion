"""Evaluate Job-Shop Scheduling solutions."""
from __future__ import annotations

from typing import Any, Dict, List, Tuple


def check_feasibility(solution: Dict[str, Any], instance: Dict[str, Any]) -> Tuple[bool, List[str]]:
    violations: list[str] = []

    routes = solution.get("routes")
    if not isinstance(routes, list):
        return False, ["Missing or invalid routes list"]

    jobs = instance["jobs"]
    machines = instance["machines"]

    if len(routes) != len(jobs):
        violations.append("Route count does not match job count")

    machine_operations: dict[str, list[dict]] = {machine: [] for machine in machines}
    makespan = 0

    for job_index, job in enumerate(jobs):
        expected_ops = job["operations"]
        job_route = routes[job_index] if job_index < len(routes) else []

        if len(job_route) != len(expected_ops):
            violations.append(f"Job {job_index} operation count mismatch")

        previous_end = 0
        for op_index, expected in enumerate(expected_ops):
            if op_index >= len(job_route):
                break
            operation = job_route[op_index]

            machine = operation.get("machine")
            start = operation.get("start")
            end = operation.get("end")
            duration = operation.get("duration")

            if machine not in machines:
                violations.append(f"Job {job_index} operation {op_index} uses unknown machine")
                continue

            if machine != expected["machine"]:
                violations.append(f"Job {job_index} operation {op_index} machine mismatch")

            expected_duration = expected["duration"]
            if duration != expected_duration:
                violations.append(f"Job {job_index} operation {op_index} duration mismatch")

            if not isinstance(start, (int, float)) or not isinstance(end, (int, float)):
                violations.append(f"Job {job_index} operation {op_index} has invalid timing")
                continue

            if end - start != expected_duration:
                violations.append(f"Job {job_index} operation {op_index} timing does not match duration")

            if start < previous_end:
                violations.append(f"Job {job_index} operation {op_index} violates job order")

            previous_end = max(previous_end, end)
            makespan = max(makespan, end)
            machine_operations[machine].append(
                {
                    "job": job_index,
                    "operation": op_index,
                    "start": start,
                    "end": end,
                }
            )

    for machine, operations in machine_operations.items():
        operations_sorted = sorted(operations, key=lambda op: op["start"])
        previous_end = 0
        for operation in operations_sorted:
            if operation["start"] < previous_end:
                violations.append(
                    f"Machine {machine} has overlapping operations at job {operation['job']}"
                )
            previous_end = max(previous_end, operation["end"])

    return len(violations) == 0, violations


def evaluate(
    solution: Dict[str, Any], instance: Dict[str, Any], runtime: float | None = None
) -> Dict[str, Any]:
    feasible, violations = check_feasibility(solution, instance)
    objective = None

    if feasible:
        routes = solution.get("routes", [])
        objective = float(
            max((operation["end"] for route in routes for operation in route), default=0.0)
        )

    return {
        "feasible": feasible,
        "objective": objective,
        "runtime": runtime,
        "runtime_seconds": runtime,
        "violations": violations,
    }
