# What this repository proves
This anchor proof demonstrates that a third-party author can validate, execute, and benchmark a Decision Model Package (DMP v0.1) using only the public interfaces.

# Validation without execution
The package structure and schemas validate without running any solver logic, proving structural compliance with the frozen DMP v0.1 contract.

# Execution under a frozen contract
The package runs end-to-end using the unchanged runner and unchanged output schema.

# Multi-instance benchmarking without schema changes
Multiple instances run through the same package, producing one JSON result per instance without any aggregation or schema modification.

# Validation
Exact command:

```bash
python validate_dmp.py dmp/
```

# Execution
Exact commands:

```bash
decisionhub run dmp/ --instance instances/instance_01.json --output benchmarks/results/instance_01.json
decisionhub run-all dmp/ --instances instances/ --output benchmarks/results/
```

# Benchmarking Convention
Benchmarking is directory-based: instances are stored in `instances/` and results are written to `benchmarks/results/` with matching filenames. Results remain per-run JSON outputs from the runner.

# Non-Goals
- No runner modification.
- No spec changes.
- No aggregation schema.
- No solver tuning or optimization.
