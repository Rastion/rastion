# Decision Model Package Specification v0.1

**Status:** Draft

This specification defines the **Decision Model Package (DMP) v0.1** format for optimization models. A DMP is a self-contained directory containing a model implementation, input schema, solver configuration, evaluation utilities, and a decision card. The format is designed to remain extensible beyond VRPTW to any decision/optimization problem class.

## 1. Required Files

Each package root **MUST** contain the following files:

```
model.py
instance_schema.json
solver.yaml
evaluate.py
decision_card.md
```

### 1.1 Directory Layout (Minimal)

```
my-decision-package/
├── model.py
├── instance_schema.json
├── solver.yaml
├── evaluate.py
└── decision_card.md
```

Additional files (data, notebooks, assets, tests) are allowed but not required.

## 2. File Specifications

### 2.1 `model.py`

**Purpose:** Define how the optimization model is created and solved.

**Required functions:**

```python
from typing import Any, Dict, Optional, Tuple

ModelArtifacts = Any

def create_model(instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> ModelArtifacts:
    """Build and return a model (or model artifacts) from the instance data."""

def solve(model: ModelArtifacts, instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Solve the model and return a JSON-serializable solution object."""
```

**Expected inputs:**
- `instance`: A JSON object validated against `instance_schema.json`.
- `solver_config`: Parsed content of `solver.yaml` (optional, may be `None`).

**Expected outputs:**
- `create_model` returns a model artifact (solver-specific object or a tuple of artifacts).
- `solve` returns a JSON-serializable dict with:
  - `status` (string, e.g., `"optimal"`, `"feasible"`, `"infeasible"`, `"error"`)
  - `solution` (object; problem-specific payload)
  - `objective` (number or `null`)
  - `metrics` (object; optional)
  - `runtime_seconds` (number; optional)

### 2.2 `instance_schema.json`

**Purpose:** JSON Schema that defines the instance (input) format for the problem.

**Requirements:**
- MUST be a valid JSON Schema.
- MUST define a top-level object schema.
- MUST include `required` for mandatory instance fields.

> See **Section 5.1** for the JSON Schema that validates `instance_schema.json` itself.

### 2.3 `solver.yaml`

**Purpose:** Describe solver configuration, parameters, and output hints.

**Requirements:**
- MUST include a `solver` mapping with `name` and `backend`.
- MAY include `parameters`, `output`, and `metadata`.

> See **Section 5.2** for the YAML Schema that validates `solver.yaml`.

### 2.4 `evaluate.py`

**Purpose:** Evaluate feasibility and objective quality of a proposed solution.

**Required functions:**

```python
from typing import Any, Dict, List, Tuple

def check_feasibility(solution: Dict[str, Any], instance: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """Return (is_feasible, violations)."""

def evaluate(solution: Dict[str, Any], instance: Dict[str, Any], runtime: float | None = None) -> Dict[str, Any]:
    """Return evaluation results with feasibility, objective, runtime, and violations."""
```

**Expected inputs:**
- `solution`: The JSON-serializable dict produced by `solve`.
- `instance`: Validated instance data.
- `runtime`: Optional elapsed solve time in seconds.

**Expected outputs (`evaluate`):**
- `feasible` (boolean)
- `objective` (number or `null`)
- `runtime` (number or `null`)
- `violations` (list of strings)
- `metrics` (object; optional)

### 2.5 `decision_card.md`

**Purpose:** Human-readable description of the package, including usage and assumptions.

**Required YAML front matter:**

```yaml
---
name: "Package Name"
version: "1.0.0"
problem_class: "VRPTW"
decision_model_package_version: "0.1"
license: "Apache-2.0"
---
```

**Required sections in the Markdown body:**
- Overview
- Problem Description
- Constraints
- Assumptions
- Solver Configuration
- License

## 3. Error Handling Conventions

- `create_model`, `solve`, and `evaluate` MUST raise exceptions (e.g., `ValueError`) for invalid input or internal failures.
- Error messages SHOULD be structured with a short code prefix, e.g. `"DMP_INPUT_INVALID: ..."`.
- When returning structured results, `solve` and `evaluate` SHOULD include a top-level `errors` list containing objects:
  - `code` (string)
  - `message` (string)
  - `details` (object; optional)

## 4. Versioning Strategy

- The **Decision Model Package spec version** is declared in `decision_card.md` front matter as `decision_model_package_version`.
- **Package versioning** follows [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`.
- Backward-incompatible changes to the spec increment the **spec major** (e.g., `1.0`).
- Backward-compatible additions increment the **spec minor** (e.g., `0.2`).

## 5. Schemas

### 5.1 JSON Schema for `instance_schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Decision Model Package Instance Schema",
  "type": "object",
  "required": ["$schema", "title", "type", "properties", "required"],
  "properties": {
    "$schema": {
      "type": "string",
      "description": "JSON Schema dialect used by the instance schema."
    },
    "$id": {
      "type": "string",
      "description": "Stable identifier for the instance schema."
    },
    "title": {
      "type": "string",
      "description": "Human-readable name of the instance schema."
    },
    "description": {
      "type": "string",
      "description": "Human-readable description of the instance schema."
    },
    "type": {
      "const": "object",
      "description": "Instances must be JSON objects."
    },
    "properties": {
      "type": "object",
      "description": "Schema for each instance field.",
      "additionalProperties": {
        "$ref": "https://json-schema.org/draft/2020-12/schema"
      }
    },
    "required": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "additionalProperties": {
      "description": "Whether extra instance fields are allowed.",
      "anyOf": [{ "type": "boolean" }, { "type": "object" }]
    },
    "definitions": {
      "type": "object",
      "description": "Reusable schema definitions."
    },
    "allOf": { "type": "array" },
    "anyOf": { "type": "array" },
    "oneOf": { "type": "array" },
    "examples": { "type": "array" }
  },
  "additionalProperties": true
}
```

### 5.2 YAML Schema for `solver.yaml`

```yaml
$schema: "https://json-schema.org/draft/2020-12/schema"
title: "Decision Model Package Solver Configuration"
type: object
required:
  - solver
properties:
  solver:
    type: object
    required:
      - name
      - backend
    properties:
      name:
        type: string
        description: "Solver name or algorithm identifier."
      backend:
        type: string
        description: "Solver library or framework."
      version:
        type: string
        description: "Solver version string."
      class:
        type: string
        description: "Optional problem class tag (e.g., VRPTW, TSP)."
      description:
        type: string
    additionalProperties: true
  parameters:
    type: object
    description: "Solver-specific parameters."
    additionalProperties: true
  output:
    type: object
    description: "Output formatting hints."
    properties:
      format:
        type: string
        enum: [json, yaml, msgpack, text]
      include_routes:
        type: boolean
      include_timing:
        type: boolean
      metrics:
        type: array
        items:
          type: string
    additionalProperties: true
  metadata:
    type: object
    description: "Package-specific metadata."
    additionalProperties: true
additionalProperties: true
```

## 6. Minimal Examples (Mock VRPTW Package)

The UI mock data in `src/data/packages.ts` includes the **"VRPTW OR-Tools Basic"** package. Below are **minimal** skeletons aligned with the mock package naming, without optimization logic.

### 6.1 `model.py`

```python
"""VRPTW OR-Tools Basic (mock)."""
from typing import Any, Dict, Optional


def create_model(instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> Any:
    """Create and return solver-specific model artifacts."""
    return {"instance": instance, "solver": solver_config or {}}


def solve(model: Any, instance: Dict[str, Any], solver_config: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Return a placeholder solution payload."""
    return {
        "status": "feasible",
        "solution": {"routes": []},
        "objective": None,
        "metrics": {},
        "runtime_seconds": 0.0,
    }
```

### 6.2 `instance_schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "VRPTW Instance",
  "type": "object",
  "required": ["distance_matrix", "time_windows", "demands", "vehicle_capacities", "depot", "num_vehicles"],
  "properties": {
    "distance_matrix": { "type": "array", "items": { "type": "array", "items": { "type": "integer" } } },
    "time_windows": { "type": "array", "items": { "type": "array", "items": { "type": "integer" }, "minItems": 2, "maxItems": 2 } },
    "demands": { "type": "array", "items": { "type": "integer" } },
    "vehicle_capacities": { "type": "array", "items": { "type": "integer" } },
    "depot": { "type": "integer" },
    "num_vehicles": { "type": "integer" }
  }
}
```

### 6.3 `solver.yaml`

```yaml
solver:
  name: CP-SAT
  backend: ortools
  version: "9.8"
parameters:
  time_limit_seconds: 300
output:
  format: json
  include_routes: true
```

### 6.4 `evaluate.py`

```python
"""Evaluate VRPTW solution quality (mock)."""
from typing import Any, Dict, List, Tuple


def check_feasibility(solution: Dict[str, Any], instance: Dict[str, Any]) -> Tuple[bool, List[str]]:
    return True, []


def evaluate(solution: Dict[str, Any], instance: Dict[str, Any], runtime: float | None = None) -> Dict[str, Any]:
    feasible, violations = check_feasibility(solution, instance)
    return {
        "feasible": feasible,
        "objective": None,
        "runtime": runtime,
        "violations": violations,
    }
```

### 6.5 `decision_card.md`

```markdown
---
name: "VRPTW OR-Tools Basic"
version: "1.0.0"
problem_class: "VRPTW"
decision_model_package_version: "0.1"
license: "Apache-2.0"
---

# VRPTW OR-Tools Basic

## Overview
Mock decision model package for the VRPTW example in `src/data/packages.ts`.

## Problem Description
Vehicle Routing Problem with Time Windows (VRPTW).

## Constraints
- Capacity
- Time windows

## Assumptions
- Symmetric travel times

## Solver Configuration
CP-SAT via OR-Tools.

## License
Apache-2.0
```

## 7. Validation Utilities

A reference validator is provided in:

```
tools/decision_model_package/validate_package.py
```

Supporting schemas:

```
tools/decision_model_package/schemas/instance_schema.schema.json
tools/decision_model_package/schemas/solver.schema.yaml
```

Example usage:

```
python tools/decision_model_package/validate_package.py /path/to/package
```
