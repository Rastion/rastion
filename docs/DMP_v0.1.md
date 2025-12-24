# Decision Model Package (DMP) v0.1 Specification

**Status:** Frozen (v0.1)

This document defines the **Decision Model Package (DMP) v0.1** execution contract used by the Rastion runner. It specifies what constitutes a compliant package and the required runtime behavior. This specification is normative and matches the current reference runner behavior.

## 1. Scope and Non-Goals

**Scope**
- This specification defines the required files, interfaces, validation rules, execution flow, and output schema for a DMP v0.1 package.
- DMP v0.1 is frozen; compliant packages MUST follow the requirements herein.
- A compliant DMP v0.1 package MUST be portable across environments that implement this specification, independent of solver backend.

**Non-Goals**
- This specification does not define how to build, train, or optimize models.
- This specification does not define CLI behavior, orchestration tooling, or deployment practices.
- This specification does not define future versions or extension mechanisms beyond v0.1.

## 2. Terminology

- **Package Root**: The directory that contains the required DMP files.
- **Instance**: The JSON object provided as `instance.json`, validated against `instance_schema.json`.
- **Solver Configuration**: The YAML mapping loaded from `solver.yaml`.
- **Runner**: The reference DMP v0.1 execution engine that validates and runs a package.
- **Result**: The JSON object emitted by the runner after execution.

Normative keywords **MUST**, **MUST NOT**, **SHOULD**, **MAY** are used as defined in RFC 2119.

## 3. Package Structure (required files)

A DMP v0.1 package **MUST** include the following files at the package root:

```
model.py
instance_schema.json
solver.yaml
evaluate.py
decision_card.md
```

Additional files or subdirectories **MAY** exist, but the runner ignores them.

## 4. Required Interfaces

### 4.1 `create_model()`

- `model.py` **MUST** define a top-level function named `create_model`.
- The runner **MAY** pass the following keyword arguments:
  - `instance`: the validated instance object.
  - `solver_config`: the parsed `solver.yaml` content.
- `create_model` **MAY** accept additional parameters. The runner passes only supported keyword arguments based on the function signature.
- The return value is not constrained by the runner, other than being usable by `solve`.

### 4.2 `solve()`

- `model.py` **MUST** define a top-level function named `solve`.
- The runner **MAY** pass the following keyword arguments:
  - `model`: the object returned by `create_model`.
  - `instance`: the validated instance object.
  - `solver_config`: the parsed `solver.yaml` content.
- `solve` **MAY** accept additional parameters. The runner passes only supported keyword arguments based on the function signature.
- `solve` **MUST** return a JSON-serializable object, and it **MUST** be a dictionary. If it does not, the runner **MUST** return an error result with `status = "error"`.
- If the returned dictionary contains a key named `solution`, its value is used as the solution payload; otherwise, the entire dictionary is treated as the solution payload.

### 4.3 `evaluate()`

- `evaluate.py` **MUST** define top-level functions named `evaluate` **and** `check_feasibility`.
- The runner **MUST** invoke `evaluate` and **MUST NOT** invoke `check_feasibility` directly.
- The runner **MAY** pass the following keyword arguments to `evaluate`:
  - `solution`: the solution payload derived from `solve`.
  - `instance`: the validated instance object.
  - `runtime`: the solve runtime in seconds.
- `evaluate` **MAY** accept additional parameters. The runner passes only supported keyword arguments based on the function signature.
- `evaluate` **MUST** return a JSON-serializable object, and it **MUST** be a dictionary. If it does not, the runner **MUST** return an error result with `status = "error"`.

## 5. Execution Flow (step-by-step, fixed order)

The runner **MUST** execute the following steps in order:

1. **Validate package** using the package validation rules (Section 6).
2. **Load solver configuration** by parsing `solver.yaml` as YAML.
3. **Load instance** by parsing `instance.json` as JSON.
4. **Validate instance** against `instance_schema.json` using JSON Schema draft 2020-12.
5. **Import** `model.py` and `evaluate.py` as modules.
6. **Call** `create_model(instance, solver_config)` with supported keyword arguments.
7. **Call** `solve(model, instance, solver_config)` with supported keyword arguments and record solve runtime.
8. **Call** `evaluate(solution, instance, runtime)` with supported keyword arguments and record evaluate runtime.
9. **Normalize status** and build the result object as specified in Section 7.

If any step raises an unhandled exception, the runner **MUST** return an error result as defined in Section 8.

## 6. Input Validation Rules

### 6.1 Package Validation

A package is valid only if all of the following are true:

- All required files listed in Section 3 exist at the package root.
- `model.py` defines both `create_model` and `solve` as top-level functions.
- `evaluate.py` defines both `evaluate` and `check_feasibility` as top-level functions.
- `instance_schema.json` validates against the DMP v0.1 **instance schema meta-schema** (JSON Schema draft 2020-12) located at `core/rastion/decision_model_package/schemas/instance_schema.schema.json`.
- `solver.yaml` validates against the DMP v0.1 **solver schema** located at `core/rastion/decision_model_package/schemas/solver.schema.yaml`.
- `decision_card.md` contains YAML front matter and satisfies the rules in Section 6.3.

If any package validation rule fails, the runner **MUST** return an error result with the validation errors and **MUST NOT** attempt to run the model.

### 6.2 Instance Validation

- The runner **MUST** validate `instance.json` against `instance_schema.json` using JSON Schema draft 2020-12.
- Each validation error **MUST** be reported as a string prefixed with `"instance.json: "` followed by the JSON Schema error message.
- If any validation errors are found, the runner **MUST** return an error result with `metadata.error_type = "DMP_INPUT_INVALID"`.

### 6.3 Decision Card Validation

`decision_card.md` **MUST** include YAML front matter starting at the beginning of the file. The front matter:

- **MUST** be a YAML mapping.
- **MUST** include the following fields:
  - `name`
  - `version`
  - `decision_model_package_version`
  - `problem_class`
  - `license`
  - `authors`
  - `tags`
- `decision_model_package_version` **MUST** equal the string `"0.1"`.
- `version` **MUST** be a SemVer-like string matching `^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$`.
- `authors` **MUST** be a non-empty list of mappings, and each mapping **MUST** include a string field `name`.
- `tags` **MUST** be a non-empty list of strings.

No additional requirements are imposed on the Markdown body.

## 7. Output Schema (normative, stable)

The runner **MUST** emit a JSON object with the following top-level fields:

| Field | Type | Description |
| --- | --- | --- |
| `status` | string | One of `"feasible"`, `"optimal"`, `"infeasible"`, `"error"`. |
| `feasible` | boolean | Feasibility flag derived from evaluation or status normalization. |
| `objective` | number or null | Objective value from evaluation or solve result. |
| `runtime_seconds` | number | Total runtime for the full execution in seconds. |
| `violations` | array of strings | Constraint violation messages, defaults to `[]`. |
| `solution` | object | Solution payload (see below). |
| `solver` | object | Parsed `solver.yaml` content. |
| `metadata` | object | Runner metadata (see below). |

The internal structure of the `solution` object is model-defined and not interpreted by the runner.

### 7.1 Status Normalization

The runner **MUST** normalize status as follows:

- If `solve.status` is one of `feasible`, `optimal`, `infeasible`, or `error`, then:
  - If `evaluation.feasible` is `false` and `solve.status` is `feasible` or `optimal`, the final `status` **MUST** be `infeasible`.
  - Otherwise, the final `status` **MUST** be `solve.status`.
- If `solve.status` is missing or not one of the allowed values:
  - If `evaluation.feasible` is `true`, `status` **MUST** be `feasible`.
  - If `evaluation.feasible` is `false`, `status` **MUST** be `infeasible`.
  - Otherwise, `status` **MUST** be `error`.

The `feasible` output field is determined as:
- If `evaluation.feasible` is present, `feasible` **MUST** be `bool(evaluation.feasible)`.
- Otherwise, `feasible` **MUST** be `true` if `status` is `feasible` or `optimal`, and `false` otherwise.

### 7.2 Solution Payload

- If `solve` returns a dictionary containing a `solution` key, `solution` **MUST** be that value.
- Otherwise, `solution` **MUST** be the `solve` return dictionary.
- If the selected solution payload is not a dictionary, the runner **MUST** wrap it as `{"value": <payload>}`.

### 7.3 Metadata Structure

The `metadata` field **MUST** be a JSON object with the following structure on successful runs:

```json
{
  "runner": {
    "solve_seconds": <number>,
    "evaluate_seconds": <number>
  },
  "solve": {
    "status": <string or null>,
    "objective": <number or null>,
    "metrics": <object or null>,
    "runtime_seconds": <number or null>
  },
  "evaluation": {
    "runtime": <number or null>,
    "metrics": <object or null>
  }
}
```

On error results, `metadata` is defined in Section 8.

## 8. Error and Failure Semantics

### 8.1 Package Validation Errors

If package validation fails, the runner **MUST** return:

- `status = "error"`
- `feasible = false`
- `objective = null`
- `solution = {}`
- `violations` containing the validation error messages
- `solver = {}`
- `metadata = {}`

### 8.2 Instance Validation Errors

If instance validation fails, the runner **MUST** return the same error structure as Section 8.1, but **MUST** set:

- `metadata.error_type = "DMP_INPUT_INVALID"`
- `solver` to the parsed `solver.yaml`

### 8.3 Interface Contract Errors

If `solve` does not return a dictionary, the runner **MUST** return an error result with:

- `violations = ["DMP_SOLVE_INVALID: solve() must return a JSON-serializable object"]`
- `solver` set to the parsed `solver.yaml`

If `evaluate` does not return a dictionary, the runner **MUST** return an error result with:

- `violations = ["DMP_EVALUATE_INVALID: evaluate() must return a JSON-serializable object"]`
- `solver` set to the parsed `solver.yaml`

### 8.4 Runtime Exceptions

If any unhandled exception occurs during execution, the runner **MUST** return an error result with:

- `violations = ["DMP_RUNTIME_ERROR: unexpected failure during execution"]`
- `solver` set to the parsed `solver.yaml` (or `{}` if unavailable)
- `metadata` containing:
  - `error_type`: exception class name
  - `message`: exception message
  - `traceback`: full formatted traceback string

## 9. Versioning and Compatibility Rules

- The package version declared in `decision_card.md` **MUST** be a SemVer-like string.
- The DMP specification version **MUST** be declared as `decision_model_package_version: "0.1"` in `decision_card.md`.
- DMP v0.1 is frozen; compliant packages **MUST NOT** rely on behavior outside this document.
- The runner **MUST** treat any package declaring a different `decision_model_package_version` as invalid.
