# Why Decision Model Packages?

## The current state of optimization model sharing

Most optimization and decision models are shared as one of three artifacts: scripts and notebooks, academic papers, or solver-specific model files. Each of these is useful for a narrow purpose, but none provides a consistent, executable contract.

* **Scripts and notebooks** bundle data loading, model construction, solver calls, and evaluation logic into a single, often environment-specific workflow. Small changes in data shape or runtime environment can break execution.
* **Papers** describe models at a conceptual level, but rarely include the exact data contracts, preprocessing, and evaluation logic needed to run the model in another setting.
* **Solver-specific formats** can capture the mathematical model but typically omit instance schemas, configuration, and evaluation steps.

As a result, reproducing results or benchmarking across models requires re-implementing large parts of the workflow, making comparisons slow and error-prone.

## Why this is a structural problem

The core issue is not missing documentation but entanglement between model logic, data contracts, solver choice, and evaluation. A model’s “code” often includes assumptions about:

* **Input data schemas and preprocessing** (e.g., how instances are encoded, normalization, or filtering)
* **Solver configuration** (time limits, tolerances, heuristics, callbacks)
* **Evaluation and feasibility checks** (objective computation, constraint violations, post-processing)

When these elements are intertwined, results cannot be reliably compared across teams or environments. Even small differences in instance interpretation or solver settings can change feasibility and objective values, invalidating comparisons.

## What a Decision Model Package standardizes

A Decision Model Package (DMP v0.1) defines a minimal execution contract that captures the operational interface of a decision model without prescribing how the model is built. It standardizes:

* **Model entry points**: explicit, callable interfaces for running a model on a given instance.
* **Instance schemas**: machine-readable definitions of inputs, ensuring consistent data contracts.
* **Solver configuration**: declared parameters and limits that affect execution and reproducibility.
* **Evaluation and feasibility checks**: deterministic post-run logic to verify constraints and compute metrics.

This package-level contract is designed to be stable and portable, so a model can be executed and evaluated consistently across environments. DMP standardizes how a model is executed and evaluated, not how it is formulated or solved.

## What DMP explicitly does NOT try to solve

DMP is intentionally narrow in scope.

* It is **not a solver**. It does not implement optimization algorithms.
* It is **not a modeling language**. It does not replace existing modeling libraries or mathematical formulations.
* It is **not a hosted service**. It defines a package format, not a deployment platform.

## Why a frozen execution contract matters

A stable execution contract enables workflows that are difficult with ad-hoc artifacts:

* **Long-lived benchmarks**: models can be compared over time without re-implementing glue code.
* **Reproducible experiments**: results can be rerun with the same inputs and declared settings.
* **Stable downstream tooling**: evaluators, harnesses, and automated test suites can target a single contract.

## How this mirrors successful patterns in ML tooling

In machine learning, reproducibility and benchmarking improved when the community shifted from ad-hoc scripts to standardized artifacts and interfaces. The focus moved to portable, declarative packages with explicit inputs, configuration, and evaluation logic.

Decision Model Packages adopt the same principle: prioritize artifacts and execution contracts over platforms. This allows independent teams to build compatible tooling and compare models without tightly coupling to a specific environment.

## Example

In practice, this means that two teams can implement the same decision problem using different solvers or formulations, package them as DMPs, and obtain outputs that are directly comparable under a shared execution and evaluation contract.
