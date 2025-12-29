# DMP v0.1 Conventions (Non-Normative)

This document collects optional, non-normative conventions that sit alongside the frozen DMP v0.1 specification. They do not change the execution contract.

## DMP v0.1 — Executable & Auditable badge

This section defines a purely declarative, self-asserted badge for Decision Model Packages (DMP) that target the frozen DMP v0.1 execution contract.

### Badge name (canonical)

**DMP v0.1 — Executable & Auditable**

### What the badge asserts

A package that displays this badge asserts all of the following:

- **Structural validity**: The package structure conforms to the DMP v0.1 specification.
- **Schema-validated inputs**: Input files validate against the declared JSON Schemas.
- **Explicit solver configuration**: Solver configuration is declared and fixed by the package.
- **Stable execution surface**: The package defines a stable entrypoint and expected output schema per DMP v0.1.
- **Third-party executability**: The package can be executed by a third party using the public Rastion runner without modification.

### What the badge does not assert

- **No claims about correctness**: The badge does not imply that outputs are correct or verified.
- **No claims about optimality**: The badge does not assert optimal or near-optimal solutions.
- **No claims about performance**: The badge does not guarantee runtime, memory, or resource characteristics.
- **No endorsement or approval**: The badge does not indicate review, certification, or approval by Rastion or any third party.

### Badge levels (self-declared)

Two self-declared levels are defined, without governance or approval flows:

1. **Self-declared DMP v0.1**
   - The package asserts all badge assertions above.
2. **Anchor-compatible**
   - The package asserts all badge assertions above and runs alongside the anchor proof without modification.

### Permitted usage

The badge may be used in:

- README files
- Benchmark artifacts
- Academic appendices
- Websites

### Rationale (non-marketing)

A symbolic badge still matters because it makes the execution contract explicit and checkable without implying quality. It focuses attention on the minimal properties required for reproducibility, comparability, and auditability. DMP v0.1 is frozen, so a stable declaration allows readers to distinguish conformance from claims about results. The badge is self-asserted to avoid introducing governance or approval mechanisms. Rastion does not issue or approve badges to preserve the neutrality of the execution contract.

## Rastion benchmarking convention (non-DMP)

This proposal defines a minimal, out-of-band benchmarking convention for running multiple instances of Decision Model Packages (DMPs) with the existing Rastion CLI. It introduces no changes to the DMP v0.1 specification, adds no new output fields, and keeps results as per-run JSON files.

### Goals

- Enable multi-instance benchmarking for a single DMP.
- Keep the DMP execution contract and output schema unchanged.
- Use only existing CLI functionality plus light orchestration (shell scripts, Makefiles, CI jobs).

### Recommended directory structure

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

### Instance discovery

Instances are discovered by scanning the benchmark’s `instances/` directory for subdirectories containing `input.json`.

Example discovery rule (pseudo):

1. Look in `benchmarks/<benchmark-name>/instances/*/input.json`.
2. Each parent directory name becomes the `instance-name`.

This allows new instances to be added without changing any CLI contract. Orchestrators can use `find`/`glob` patterns to gather instances.

### Running benchmarks (orchestration only)

A thin script or CI step can loop over discovered instances and invoke the existing CLI exactly once per instance. For example:

```
for instance_dir in benchmarks/<benchmark-name>/instances/*; do
  instance_name=$(basename "$instance_dir")
  decisionhub run /path/to/package \
    --instance "$instance_dir/input.json" \
    --output "benchmarks/<benchmark-name>/results/<run-id>/$instance_name.json"
done
```

Benchmark orchestration MUST NOT rely on shared state, inter-run communication, or any behavior other than invoking the existing CLI once per instance.

- The CLI invocation is unchanged.
- `--output` remains a single per-run JSON file.
- `run-id` can be a timestamp, git SHA, or any external identifier.

### Result storage

Each run produces per-instance JSON outputs in a run-scoped folder:

```
benchmarks/<benchmark-name>/results/<run-id>/<instance-name>.json
```

This preserves the per-run JSON file requirement and makes it easy to compare runs over time by directory diffing or external tooling.

### Explicitly out of scope

- Any changes to DMP v0.1 input or output schema.
- Any new CLI flags or output fields.
- Standardized aggregation formats (CSV summaries, dashboards, or metrics schemas).
- Benchmark execution scheduling, parallelization, or distributed orchestration.
- Result validation or scoring rules.

### Rationale

This convention is deliberately minimal: it leverages directory layout and simple scripting rather than new APIs or schema changes. It remains compatible with the existing Rastion CLI and keeps benchmark data external to the DMP specification.
