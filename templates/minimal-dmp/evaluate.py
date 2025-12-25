"""Minimal DMP v0.1 evaluation.

The runner calls evaluate() only. check_feasibility() must exist
but is not called directly by the runner.
"""


def evaluate(solution, instance, runtime):
    """Return evaluation metrics as a JSON-serializable dict."""
    # Keep evaluation deterministic and transparent.
    expected = instance["value"]
    actual = solution.get("value")
    violations = check_feasibility(solution, instance)
    return {
        "feasible": len(violations) == 0,
        "objective": actual,
        "violations": violations,
        "runtime": runtime,
    }


def check_feasibility(solution, instance):
    """Return a list of human-readable violation strings."""
    expected = instance["value"]
    actual = solution.get("value")
    if actual != expected:
        return ["solution.value must equal instance.value"]
    return []
