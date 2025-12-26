# Minimal DMP template (v0.1)

This folder is a copy-paste starting point for a valid DMP v0.1 package.

**Replace the contents, not the structure.**

What to do:
- Keep the required files at the package root.
- Replace the minimal example logic with your real model and evaluation.
- Keep the schema, solver config, and decision card aligned with your model.
- Use `instance.json` here only as a smoke-test input; instances are normally supplied externally via `--instance`.

What not to do:
- Do not add new required files or custom runner hooks.
- Do not move required files into subdirectories.

## One-command smoke test

```sh
python -m rastion.decision_model_package.validate_package templates/minimal-dmp \
  && decisionhub run templates/minimal-dmp --instance templates/minimal-dmp/instance.json --output /tmp/dmp-result.json \
  && cat /tmp/dmp-result.json
```
