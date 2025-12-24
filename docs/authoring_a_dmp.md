# Authoring a DMP v0.1: Quick Compliance Checklist

This checklist summarizes the **MUST**-level invariants of the DMP v0.1 spec and highlights the failure modes seen in early implementations. It is intentionally concise—use it to validate that your package will run under the Rastion runner without custom changes.

## 1) Package layout (runner only inspects the root)

- [ ] Package root contains **all required files**:
  - [ ] `model.py`
  - [ ] `evaluate.py`
  - [ ] `instance_schema.json`
  - [ ] `solver.yaml`
  - [ ] `decision_card.md`
- [ ] You did **not** place these files in a subdirectory (runner ignores subfolders).
- [ ] Extra files/subdirectories are fine (runner ignores them).

**Common pitfall:** putting `model.py` or `decision_card.md` under `src/` or `package/` → runner fails validation.

## 2) Required functions and signatures

### `model.py`
- [ ] Top-level `create_model` exists.
- [ ] Top-level `solve` exists.
- [ ] Both functions are importable at module load time (no side-effect failures).
- [ ] You accept only the runner-supported keyword args you need:
  - `create_model(instance, solver_config)`
  - `solve(model, instance, solver_config)`
  - Extra params are okay; the runner passes only those in your signature.
- [ ] `solve` **MUST return a JSON-serializable dictionary**.
  - If you return anything else, the run becomes `status="error"`.

**Common pitfalls:**
- Returning a custom object or tuple from `solve`.
- Defining `create_model` / `solve` inside a class or under `if __name__ == "__main__":`.

### `evaluate.py`
- [ ] Top-level `evaluate` **and** `check_feasibility` exist.
- [ ] Runner calls only `evaluate` (it ignores `check_feasibility`).
- [ ] `evaluate` accepts only supported keyword args you need:
  - `evaluate(solution, instance, runtime)`
- [ ] `evaluate` **MUST return a JSON-serializable dictionary**.

**Common pitfall:** returning a list/number from `evaluate` (runner emits `DMP_EVALUATE_INVALID`).

## 3) Schemas and validation

### `instance_schema.json`
- [ ] Valid JSON Schema document.
- [ ] Contains `$schema` declaring **Draft-07** or **Draft 2020-12**.
- [ ] Validates against the DMP meta-schema (runner enforces this).

**Common pitfalls:**
- Missing `$schema`, or using an unsupported dialect (validation fails before execution).

### `solver.yaml`
- [ ] Valid YAML mapping.
- [ ] Validates against the DMP v0.1 solver schema.

**Common pitfall:** providing a list at the root instead of a mapping.

## 4) Decision card front matter

- [ ] `decision_card.md` **starts** with YAML front matter (must be at file start).
- [ ] YAML front matter is a **mapping** and includes all required fields:
  - `name`, `version`, `decision_model_package_version`, `problem_class`, `license`, `authors`, `tags`
- [ ] `decision_model_package_version` is exactly `"0.1"`.
- [ ] `version` matches SemVer-like format (e.g., `1.2.3` or `1.2.3-beta`).
- [ ] `authors` is a **non-empty list** of mappings, each with a string `name`.
- [ ] `tags` is a **non-empty list** of strings.

**Common pitfall:** front matter is present but not at the beginning of the file.

## 5) Runner assumptions vs. ignored content

**Runner assumes:**
- The required files are at the package root and importable.
- `solve` and `evaluate` return dictionaries that can be JSON-serialized.
- Instance and solver inputs validate against their schemas.

**Runner ignores:**
- Any extra files/subdirectories.
- `check_feasibility` output (it is never called).
- The internal structure of your `solution` object.

**Common pitfall:** placing critical runtime code in ignored files or expecting the runner to read custom configs.

## 6) Output expectations (what the runner normalizes)

- [ ] If `solve` returns `{ "solution": ... }`, the runner uses the value of `solution` as the payload; otherwise it uses the entire dict.
- [ ] If the chosen solution payload is **not a dictionary**, the runner wraps it as `{ "value": <payload> }`.
- [ ] `solve.status` is only recognized if it is one of: `feasible`, `optimal`, `infeasible`, `error`.
  - Otherwise, the runner infers status from `evaluation.feasible`.

**Common pitfall:** using non-standard status strings (e.g., `"ok"`, `"success"`) and expecting them to be preserved.

## 7) Debugging a failing DMP

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| `status: "error"` with validation errors before execution | Missing required file(s), invalid decision card, schema issues | Package root contents; `decision_card.md` front matter; `$schema` value in `instance_schema.json` |
| `DMP_SOLVE_INVALID` | `solve` did not return a dictionary | `solve` return type (must be JSON-serializable dict) |
| `DMP_EVALUATE_INVALID` | `evaluate` did not return a dictionary | `evaluate` return type |
| `DMP_INPUT_INVALID` | Instance failed JSON Schema validation | Instance values vs. `instance_schema.json` |
| `DMP_RUNTIME_ERROR` | Unhandled exception during import/solve/evaluate | Exceptions in `model.py` or `evaluate.py` (including top-level import code) |
| Status unexpectedly `infeasible` | `evaluation.feasible` false or missing + status normalization | `evaluate` output, especially `feasible` field |

---

If you satisfy every checkbox above, the Rastion runner should be able to execute your DMP without modification.
