# Rastion

Rastion is an execution standard and Python CLI for Decision Model Packages as defined by the DMP v0.1 specification.

## What Rastion is

- A reproducible execution contract for decision/optimization models that validates inputs, runs model entry points, and emits structured JSON output.
- A reference runner and schema validator for DMP v0.1 packages (see the [DMP v0.1 specification](docs/DMP_v0.1.md)).
- A portability layer that makes model runs auditable and consistent across environments.

## What Rastion is not

- A modeling framework or solver; it executes packages built with your chosen tools.
- A proprietary package format; DMP v0.1 is an open, frozen spec.
- A benchmarking harness; any benchmarking conventions are optional add-ons.

## Decision Model Package (DMP)

A Decision Model Package is a self-contained directory that bundles model code, input schemas, solver configuration, and evaluation logic. For the required files and interfaces, see the [DMP v0.1 specification](docs/DMP_v0.1.md) and the [authoring checklist](docs/authoring_a_dmp.md).

## Documentation

- [DMP v0.1 — Executable & Auditable](docs/DMP_BADGE.md)
- [Break Rastion: DMP v0.1](docs/BREAK_RASTION.md)

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

Use the `decisionhub` CLI to run a DMP package. See [example packages](core/rastion/decision_model_package/examples) and the [runner reference](core/rastion/decision_model_package/README.md) for command details.

## Output Format

`decisionhub run` emits a structured JSON document with consistent fields such as `status`, `feasible`, `objective`, and `runtime_seconds`. The full output schema is defined in the [DMP v0.1 specification](docs/DMP_v0.1.md).

## Included Examples

- [VRPTW (routing)](core/rastion/decision_model_package/examples/vrptw_or_tools_basic)
- [Knapsack (selection)](core/rastion/decision_model_package/examples/knapsack_basic)

## Project Status

Rastion v0.1.0. The DMP v0.1 execution contract is frozen; new features will be additive.

## License

Apache-2.0
