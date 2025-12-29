"""Job-Shop Scheduling greedy baseline."""
from __future__ import annotations

from typing import Any, Dict, Optional, Tuple


def create_model(instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> Any:
    """Create and return solver-specific model artifacts."""
    return {
        "instance": instance,
        "solver": solver_config or {},
    }


def _build_greedy_schedule(instance: Dict[str, Any]) -> Tuple[list[list[dict]], float]:
    machines = instance["machines"]
    jobs = instance["jobs"]

    machine_available = {machine: 0 for machine in machines}
    job_available = [0 for _ in jobs]
    routes: list[list[dict]] = []

    for job_index, job in enumerate(jobs):
        job_route: list[dict] = []
        for op_index, operation in enumerate(job["operations"]):
            machine = operation["machine"]
            duration = operation["duration"]

            start_time = max(job_available[job_index], machine_available[machine])
            end_time = start_time + duration

            job_route.append(
                {
                    "job": job_index,
                    "operation": op_index,
                    "machine": machine,
                    "start": start_time,
                    "end": end_time,
                    "duration": duration,
                }
            )

            job_available[job_index] = end_time
            machine_available[machine] = end_time
        routes.append(job_route)

    makespan = float(max(job_available)) if job_available else 0.0
    return routes, makespan


def solve(
    model: Any, instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Solve the JSSP instance via greedy list scheduling."""
    routes, makespan = _build_greedy_schedule(instance)
    return {
        "status": "feasible",
        "solution": {"routes": routes},
        "objective": makespan,
        "metrics": {},
        "runtime_seconds": 0.0,
    }
