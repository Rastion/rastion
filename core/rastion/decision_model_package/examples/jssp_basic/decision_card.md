---
name: "Job-Shop Scheduling Basic"
version: "1.0.0"
problem_class: "JSSP"
decision_model_package_version: "0.1"
license: "Apache-2.0"
authors:
  - name: "Rastion"
tags:
  - "scheduling"
  - "job-shop"
---

# Job-Shop Scheduling Basic

## Overview
Baseline Decision Model Package for a Job-Shop Scheduling Problem (JSSP) using a greedy list schedule.

## Problem Description
Schedule ordered operations for each job on specific machines with fixed durations. Each machine can process at most one operation at a time. The objective is to minimize the makespan (overall completion time).

## Constraints
- Operations for each job must follow the given order.
- Each operation must run on its specified machine for its full duration.
- Machines process at most one operation at a time.

## Assumptions
- Non-preemptive operations with integer durations.
- All jobs are available at time 0.
- Instance uses a tiny 3x3 dataset inspired by the Fisher and Thompson FT06 benchmark (OR-Library), adapted for brevity.

## Solver Configuration
Greedy list scheduling baseline in pure Python.

## License
Apache-2.0
