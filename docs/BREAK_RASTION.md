# Break Rastion: DMP v0.1

## Challenge statement

The DMP v0.1 execution contract promises reproducibility, comparability, and auditability for compliant packages. If you can break any of those properties without modifying the runner or the specification, that is a bug in the contract. This challenge invites external users to find such breaks and document them publicly.

## What counts as a valid break

A valid break demonstrates one or more of the following within the DMP v0.1 contract:

- **Hidden nondeterminism**: materially different outputs across runs with the same declared inputs and configuration.
- **Undeclared configuration**: behavior depends on settings or parameters not declared in the package.
- **Environment-dependent behavior**: outputs vary due to environment differences that the contract is supposed to abstract away.
- **Output ambiguity**: the contract allows multiple incompatible interpretations of required outputs.
- **Validation loopholes**: inputs pass schema validation but violate the intent of the execution contract in a way that changes results.

## What does not count

The following are not considered breaks of the execution contract:

- Poor modeling choices
- Solver slowness or inefficiency
- Bad objectives or problem formulations
- Disagreement with modeling or domain assumptions

## Rules

- **No runner modification**: use the public Rastion runner as-is.
- **No spec modification**: DMP v0.1 is frozen.
- **Public reproduction steps**: provide a complete, reproducible sequence of commands and environment details.
- **Minimal example preferred**: the smallest package that demonstrates the issue is best.

## Outcome of a successful break

A successful break results in:

- **Acknowledgment**: the issue is recognized and tracked.
- **Regression documentation**: the break is documented as a known limitation or resolved with clarifications.
- **Contract clarification if needed**: clarifications may be added to documentation without changing the execution contract.

## Tone and intent

This challenge is calm and inviting by design. It is not adversarial toward participants and does not presume the contract is perfect. The goal is to improve the clarity and testability of the DMP v0.1 execution contract while keeping the core spec unchanged.
