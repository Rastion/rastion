# Decision Model Package Tools

## Reference runner (v0.1)

Run a validated package end-to-end:

```sh
./decisionhub run /path/to/package --instance /path/to/instance.json --output result.json
```

The runner:

1. Validates the package.
2. Validates the instance against `instance_schema.json`.
3. Executes `create_model → solve → evaluate`.
4. Emits a structured JSON result.

All fields are stable in DMP v0.1. New fields may be added under metadata only.

### Example (mock VRPTW package)

```sh
./decisionhub run tools/decision_model_package/examples/vrptw_or_tools_basic \
  --instance tools/decision_model_package/examples/vrptw_or_tools_basic/instance.json \
  --output /tmp/result.json
```

## Validator

```sh
python tools/decision_model_package/validate_package.py /path/to/package
```
