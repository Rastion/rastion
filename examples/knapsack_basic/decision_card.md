---
name: "Knapsack Basic"
version: "1.0.0"
problem_class: "Knapsack"
decision_model_package_version: "0.1"
license: "Apache-2.0"
authors:
  - name: "Rastion"
tags:
  - "knapsack"
  - "selection"
---

# Knapsack Basic

## Overview
Simple 0/1 knapsack package to validate DMP generality beyond routing problems.

## Problem Description
Select a subset of items with weights and values to maximize total value without exceeding capacity.

## Constraints
- Total selected weight must not exceed capacity.
- Each item can be selected at most once.

## Assumptions
- Non-negative integer weights and values.
- Single knapsack with a single capacity limit.

## Solver Configuration
Dynamic programming baseline implemented in pure Python.

## License
Apache-2.0
