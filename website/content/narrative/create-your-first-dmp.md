# Create your first DMP (v0.1)

## Who this is for

This walkthrough is for engineers who already have a decision model and want to package it as a valid DMP v0.1 for the Rastion runner. You are expected to bring your own model logic. This document only shows how to wrap it in the required contract.

## What a DMP is (mental model, thin wrapper)

A DMP is a small, fixed set of files at a package root that the runner validates and executes in a fixed order. It is a thin wrapper around your existing model code and evaluation logic. The runner does not interpret your internal data structures or solver logic; it only calls the required entry points and enforces the contract.

## What you are NOT doing

- You are not changing the runner.
- You are not extending the DMP v0.1 spec.
- You are not adding new files or schemas the runner depends on.
- You are not auto-generating code or relying on hidden defaults.
- You are not expected to build a full application, CLI, or deployment setup.

## Directory structure (annotated)

```
<package-root>/
  model.py              # Required: wraps your model in create_model/solve
  evaluate.py           # Required: post-solve evaluation and feasibility
  instance_schema.json  # Required: JSON Schema for inputs supplied via --instance
  solver.yaml           # Required: declarative solver configuration
  decision_card.md      # Required: metadata front matter
```

Only these files are required. Extra files are allowed, but the runner ignores them.
Instance files are supplied externally via `--instance`; they are not required at the package root.

## Step-by-step authoring

### 1) Freeze inputs (schema)

Define the instance shape you will accept. This is the contract for inputs supplied via `--instance` (the file name can vary and does not live in the package root).

Minimal example:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["value"],
  "properties": {
    "value": { "type": "number" }
  },
  "additionalProperties": false
}
```

Why this file exists: the runner validates every instance against this schema before any code executes.

### 2) Wrap the model (model.py)

Provide the two required functions. Keep them thin. Use only supported keyword arguments.

Minimal shape:

```python
# model.py

def create_model(instance, solver_config):
    # Build your model from validated inputs.
    return {"value": instance["value"]}


def solve(model, instance, solver_config):
    # Run your solver and return a JSON-serializable dict.
    return {"solution": {"value": model["value"]}, "status": "feasible"}
```

Why this file exists: the runner calls these functions to build and solve your model.

### 3) Declare solver config (solver.yaml)

State solver metadata and parameters explicitly. This is a declarative file, not executable code.

Minimal shape:

```yaml
solver:
  name: "example-solver"
  backend: "manual"
```

The full solver schema is defined in `core/rastion/decision_model_package/schemas/solver.schema.yaml`.

Example with parameters:

```yaml
solver:
  name: "or-tools"
  backend: "ortools"
  version: "9.7"
parameters:
  time_limit_seconds: 10
  threads: 4
```

Why this file exists: the runner loads and includes this configuration in the run output.

### 4) Separate evaluation (evaluate.py)

Evaluation is always separate from solving. It returns a dictionary with feasibility and metrics.

Minimal shape:

```python
# evaluate.py

def evaluate(solution, instance, runtime):
    return {"feasible": True, "objective": solution.get("value")}


def check_feasibility(solution, instance):
    return []
```

check_feasibility must exist and be callable for contract completeness and future tooling, but its return value is not interpreted by the runner in v0.1. A recommended convention is to return a list of violation strings (empty list if feasible).

Why this file exists: the runner uses it to compute feasibility and objective metrics after solve.

### 5) Write decision_card.md

Add required metadata as YAML front matter at the start of the file.

Minimal shape:

```yaml
---
name: "example-model"
version: "0.1.0"
decision_model_package_version: "0.1"
problem_class: "example"
license: "MIT"
authors:
  - name: "Your Name"
tags:
  - "example"
---
```

Why this file exists: the runner validates the metadata and uses it for package identification.

## Validation and execution commands

Validate structure and schemas:

```sh
python -m rastion.decision_model_package.validate_package /path/to/package
```

Run the package (after validation):

```sh
./decisionhub run /path/to/package --instance /path/to/instance.json --output result.json
```

## Common mistakes and how the validator helps

- **Missing required files** → validator stops before execution and reports the missing file.
- **Wrong function names or non-top-level functions** → validator reports missing `create_model`, `solve`, `evaluate`, or `check_feasibility`.
- **Invalid JSON Schema** → validator reports schema errors and the unsupported `$schema` value.
- **Invalid decision card front matter** → validator reports missing fields or invalid structure.
- **Returning non-dictionary results** from `solve` or `evaluate` → runner returns an error status.

If your package validates successfully, the runner will not change its behavior.
DMP v0.1 is a fixed contract.
