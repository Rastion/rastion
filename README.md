# Rastion

## What is Rastion?

Rastion is a Python CLI tool for running Decision Model Packages (DMP v0.1), a standardized format for optimization and decision models. It provides a reproducible execution contract so model code, inputs, and solver configuration can be validated and run consistently.

The goal is to make optimization runs portable and auditable: the package declares the model entry points, schema for instances, solver settings, and evaluation logic, and the CLI executes them with structured JSON output.

## What is a Decision Model Package (DMP)?

A Decision Model Package is a self-contained directory that bundles an optimization model implementation with its input schema, solver configuration, and evaluation logic. DMP v0.1 defines the minimum files and entry points needed to validate and run a model end-to-end.

Required files in a DMP v0.1 package:

- `model.py`
- `instance_schema.json`
- `solver.yaml`
- `evaluate.py`
- `decision_card.md`

## Installation

```sh
pip install rastion

# or, for development / examples:
git clone https://github.com/Rastion/rastion.git
cd rastion
pip install -e .
```

Python requirement: 3.10+

## Quick Start

Run the included Knapsack example with the `decisionhub` CLI:

```sh
decisionhub run core/rastion/decision_model_package/examples/knapsack_basic \
  --instance core/rastion/decision_model_package/examples/knapsack_basic/instance.json
```

## Output Format

`decisionhub run` emits a structured JSON document with consistent fields. The top-level output includes:

- `status` and `feasible` to indicate solution feasibility
- `objective` and `runtime_seconds` for performance metrics
- `metadata` for solver and evaluation details (including timings and solver-reported metrics)

## Included Examples

- VRPTW (routing): `core/rastion/decision_model_package/examples/vrptw_or_tools_basic`
- Knapsack (selection): `core/rastion/decision_model_package/examples/knapsack_basic`

## Project Status

Rastion v0.1.0. The Decision Model Package (DMP v0.1) execution contract is frozen; new features will be additive.

## License

Apache-2.0
