# Why Decision Model Packages?

## Purpose and scope

Decision Model Packages (DMPs) and Rastion exist to address practical friction observed in real optimization work: models are difficult to run outside the original environment, results are hard to compare across teams, and audits often require reassembling missing assumptions. The design focuses on a minimal execution contract that makes models **reproducible**, **comparable**, and **auditable** without dictating how the model is written.

## Pain points in day-to-day optimization workflows

Practitioners repeatedly encounter the same failure modes when trying to share or reuse models:

* **Environment-coupled scripts**: model code is bundled with data loading, preprocessing, solver setup, and reporting. A small difference in runtime versions, file layout, or data shape breaks execution or silently changes results.
* **Ambiguous inputs**: instance schemas are implicit or described in prose. Downstream users re-encode data and unknowingly change the meaning of constraints or objectives.
* **Hidden solver knobs**: time limits, tolerances, and heuristics live in code or CLI flags. Two teams “run the same model” but get different feasibility or objective values.
* **Unverifiable outputs**: post-processing and feasibility checks are custom, inconsistent, or undocumented, which makes audits and comparisons unreliable.

These are not documentation issues; they stem from a lack of a stable, machine-readable contract for how a model should be executed and evaluated.

## Design rationale: a stable execution contract

A DMP standardizes the *interface* of a decision model rather than its formulation. It specifies:

* **Model entry points**: explicit, callable interfaces for running a model on a given instance.
* **Instance schemas**: machine-readable definitions of inputs, so encoding is consistent across environments.
* **Solver configuration**: declared parameters and limits that materially affect results.
* **Evaluation and feasibility checks**: deterministic post-run logic to verify constraints and compute metrics.

This contract makes it possible to reproduce results across environments, compare models on shared instances, and audit outcomes without reverse-engineering the original codebase.

## Implicit comparisons (without replacing existing tools)

DMPs are designed to complement existing practices rather than compete with them:

* **Solver-specific scripts** remain useful for rapid iteration, but they tend to intertwine data handling, solver setup, and evaluation. DMPs separate these concerns so results survive changes in environment or tooling.
* **Modeling languages** provide expressive formulations, yet they do not standardize instance schemas, execution parameters, or evaluation logic. DMPs add a reproducible wrapper around whatever formulation you choose.
* **ML model packaging practices** improved reproducibility by moving from ad‑hoc scripts to explicit artifacts with declared inputs, configs, and evaluation hooks. DMPs apply the same packaging discipline to optimization models.

## What Rastion is NOT

Rastion is intentionally narrow in scope:

* **Not a solver**: it does not implement optimization algorithms.
* **Not a modeling language**: it does not replace modeling libraries or mathematical formulations.
* **Not a hosted platform**: it defines a package format and contract, not a deployment service.
* **Not an auto-optimizer**: it does not tune or improve models on its own.

## Why reproducibility, comparability, and auditability matter

Real-world optimization systems are often evaluated over long periods, across teams, and under regulatory or internal audit constraints. A frozen execution contract makes it possible to:

* **Reproduce** past runs with the same inputs and declared settings.
* **Compare** models fairly by controlling for data interpretation and solver configuration.
* **Audit** outcomes by tracing how inputs, constraints, and evaluation rules produced a result.

DMPs and Rastion focus on these operational guarantees, providing a consistent way to run, evaluate, and verify decision models without prescribing how they are built.
