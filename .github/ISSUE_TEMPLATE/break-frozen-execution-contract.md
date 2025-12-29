---
name: Break the frozen execution contract
about: Report a reproducible break in the frozen DMP v0.1 execution contract
labels: [contract]
---

## Challenge summary
We invite you to attempt to break the frozen DMP v0.1 execution contract without modifying the reference implementation. The goal is to surface unclear or incomplete parts of the contract through reproducible examples.

## What counts as a valid break
- **Nondeterminism**: the same compliant package and instance produce different outputs across runs without any declared source of variation.
- **Undeclared configuration dependencies**: outputs change based on environment or configuration that the contract does not declare or allow.
- **Ambiguous required outputs**: the contract allows multiple incompatible outputs for the same inputs.
- **Validation loopholes**: inputs pass contract validation but violate contract intent in a way that changes results.
- **Runner-observable mismatch**: behavior diverges from the frozen contract as written, without modifying the runner.

## What does NOT count as a break
- Changes to the runner, the spec, or any tooling used to execute the package.
- Issues caused by non-compliant packages or missing required files.
- Performance complaints, stylistic preferences, or missing features outside the frozen contract.
- Environment changes that the contract explicitly allows (e.g., user-provided model code choosing its own randomness and declaring it).
- Requests for enhancements to the contract rather than evidence of a breach.

## Rules for submissions
- **No runner changes**: use the published reference implementation as-is.
- **Reproducible steps required**: include exact steps, commands, and inputs.
- **Minimal example**: provide the smallest package/instance that triggers the break.
- **State your environment**: OS, runtime versions, and any relevant configuration.
- **No private disclosures**: do not include secrets or proprietary data.

## Intent
This challenge is intended to improve the clarity and testability of the frozen execution contract. It is not meant to prove correctness or discourage criticism. Critical attempts are explicitly welcome.

## Submission checklist
- [ ] I used the reference runner without modifications.
- [ ] I provided a minimal, reproducible example.
- [ ] I listed my environment details.
- [ ] I described the observed vs. expected behavior under the frozen contract.
