"""Minimal DMP v0.1 model wrapper.

This file exists only to expose the required top-level functions.
Keep it small and deterministic.
"""


def create_model(instance, solver_config):
    """Build the in-memory model from the validated instance.

    The runner may pass only the keyword arguments you declare.
    """
    # This example just forwards the input value.
    return {"value": instance["value"]}


def solve(model, instance, solver_config):
    """Solve the model and return a JSON-serializable dictionary.

    The runner requires a dict. If you return anything else,
    the run becomes status="error".
    """
    # Deterministic, trivial "solution": echo the input.
    return {
        "solution": {"value": model["value"]},
        "status": "feasible",
        "objective": model["value"],
    }
