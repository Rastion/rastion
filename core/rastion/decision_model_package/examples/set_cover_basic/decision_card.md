---
name: "set-cover-basic"
version: "0.1.0"
decision_model_package_version: "0.1"
problem_class: "set-cover"
license: "MIT"
authors:
  - name: "External Contributor"
tags:
  - "set-cover"
  - "greedy"
---

Greedy baseline for the set cover problem using cost per newly covered element.

## Assumptions
- Universe elements are unique strings.
- Set IDs are unique and costs are non-negative.
- Instances are small enough for in-memory greedy evaluation.

## Limitations
- Greedy selection is not optimal and can be arbitrarily worse than the optimum.
- Ties are broken deterministically by ratio, cost, then set id.
- No post-processing or local improvement is applied.

## Notes
- The instance `suboptimal_greedy.json` demonstrates a case where greedy performs poorly.
