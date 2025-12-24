# Rastion Benchmarking Convention (Non-DMP)

This proposal defines a minimal, out-of-band benchmarking convention for running multiple instances of Decision Model Packages (DMPs) with the existing Rastion CLI. It introduces no changes to the DMP v0.1 specification, adds no new output fields, and keeps results as per-run JSON files.

## Goals

- Enable multi-instance benchmarking for a single DMP.
- Keep the DMP execution contract and output schema unchanged.
- Use only existing CLI functionality plus light orchestration (shell scripts, Makefiles, CI jobs).

## Recommended directory structure

```
benchmarks/
  <benchmark-name>/
    README.md
    instances/
      <instance-name>/
        input.json
        metadata.json        # optional, non-DMP metadata
    results/
      <run-id>/
        <instance-name>.json
    scripts/
      run.sh                 # optional, orchestrates CLI calls
```

**Notes**
- `benchmarks/` sits alongside existing repo content; it is not part of the DMP spec.
- `input.json` is the DMP input per instance (unchanged format).
- `metadata.json` is optional and used only for human/benchmark context (e.g., tags, size, source).

## Instance discovery

Instances are discovered by scanning the benchmark’s `instances/` directory for subdirectories containing `input.json`.

Example discovery rule (pseudo):

1. Look in `benchmarks/<benchmark-name>/instances/*/input.json`.
2. Each parent directory name becomes the `instance-name`.

This allows new instances to be added without changing any CLI contract. Orchestrators can use `find`/`glob` patterns to gather instances.

## Running benchmarks (orchestration only)

A thin script or CI step can loop over discovered instances and invoke the existing CLI exactly once per instance. For example:

```
for instance_dir in benchmarks/<benchmark-name>/instances/*; do
  instance_name=$(basename "$instance_dir")
  rastion run \
    --input "$instance_dir/input.json" \
    --output "benchmarks/<benchmark-name>/results/<run-id>/$instance_name.json"
done
```

- The CLI invocation is unchanged.
- `--output` remains a single per-run JSON file.
- `run-id` can be a timestamp, git SHA, or any external identifier.

## Result storage

Each run produces per-instance JSON outputs in a run-scoped folder:

```
benchmarks/<benchmark-name>/results/<run-id>/<instance-name>.json
```

This preserves the per-run JSON file requirement and makes it easy to compare runs over time by directory diffing or external tooling.

## Explicitly out of scope

- Any changes to DMP v0.1 input or output schema.
- Any new CLI flags or output fields.
- Standardized aggregation formats (CSV summaries, dashboards, or metrics schemas).
- Benchmark execution scheduling, parallelization, or distributed orchestration.
- Result validation or scoring rules.

## Rationale

This convention is deliberately minimal: it leverages directory layout and simple scripting rather than new APIs or schema changes. It remains compatible with the existing Rastion CLI and keeps benchmark data external to the DMP specification.
