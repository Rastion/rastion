# DMP v0.1 — Executable & Auditable

This document defines a purely declarative, self-asserted badge for Decision Model Packages (DMP) that target the frozen DMP v0.1 execution contract.

## Badge name (canonical)

**DMP v0.1 — Executable & Auditable**

## What the badge asserts

A package that displays this badge asserts all of the following:

- **Structural validity**: The package structure conforms to the DMP v0.1 specification.
- **Schema-validated inputs**: Input files validate against the declared JSON Schemas.
- **Explicit solver configuration**: Solver configuration is declared and fixed by the package.
- **Stable execution surface**: The package defines a stable entrypoint and expected output schema per DMP v0.1.
- **Third-party executability**: The package can be executed by a third party using the public Rastion runner without modification.

## What the badge does not assert

- **No claims about correctness**: The badge does not imply that outputs are correct or verified.
- **No claims about optimality**: The badge does not assert optimal or near-optimal solutions.
- **No claims about performance**: The badge does not guarantee runtime, memory, or resource characteristics.
- **No endorsement or approval**: The badge does not indicate review, certification, or approval by Rastion or any third party.

## Badge levels (self-declared)

Two self-declared levels are defined, without governance or approval flows:

1. **Self-declared DMP v0.1**
   - The package asserts all badge assertions above.
2. **Anchor-compatible**
   - The package asserts all badge assertions above and runs alongside the anchor proof without modification.

## Permitted usage

The badge may be used in:

- README files
- Benchmark artifacts
- Academic appendices
- Websites

## Rationale (non-marketing)

A symbolic badge still matters because it makes the execution contract explicit and checkable without implying quality. It focuses attention on the minimal properties required for reproducibility, comparability, and auditability. DMP v0.1 is frozen, so a stable declaration allows readers to distinguish conformance from claims about results. The badge is self-asserted to avoid introducing governance or approval mechanisms. Rastion does not issue or approve badges to preserve the neutrality of the execution contract.
