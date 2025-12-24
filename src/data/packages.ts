export interface BenchmarkResult {
  instance: string;
  feasible: boolean;
  objective: number | null;
  runtime: number;
  solver: string;
  gap?: number;
}

export interface DecisionPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  author: string;
  version: string;
  problemClass: string;
  backend: string;
  solver: string;
  license: string;
  downloads: number;
  stars: number;
  lastUpdated: string;
  tags: string[];
  benchmarks: BenchmarkResult[];
  files: {
    name: string;
    content: string;
  }[];
  decisionCard: string;
}

export const packages: DecisionPackage[] = [
  {
    id: "vrptw-ortools-basic",
    name: "VRPTW OR-Tools Basic",
    slug: "vrptw-ortools-basic",
    description: "Vehicle Routing Problem with Time Windows using Google OR-Tools constraint programming solver. Supports capacity constraints and service times.",
    author: "rastion",
    version: "1.0.0",
    problemClass: "VRPTW",
    backend: "OR-Tools",
    solver: "CP-SAT",
    license: "Apache-2.0",
    downloads: 2847,
    stars: 156,
    lastUpdated: "2024-12-20",
    tags: ["routing", "time-windows", "capacitated", "or-tools"],
    benchmarks: [
      { instance: "solomon_c101", feasible: true, objective: 828.94, runtime: 1.24, solver: "CP-SAT" },
      { instance: "solomon_c102", feasible: true, objective: 828.94, runtime: 3.45, solver: "CP-SAT" },
      { instance: "solomon_r101", feasible: true, objective: 1650.80, runtime: 2.18, solver: "CP-SAT" },
      { instance: "solomon_r102", feasible: true, objective: 1486.12, runtime: 8.92, solver: "CP-SAT" },
      { instance: "solomon_rc101", feasible: true, objective: 1696.94, runtime: 4.56, solver: "CP-SAT" },
    ],
    files: [
      {
        name: "model.py",
        content: `"""VRPTW Model using Google OR-Tools."""
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
from typing import Dict, List, Any

def create_model(data: Dict[str, Any]) -> pywrapcp.RoutingModel:
    """Create VRPTW routing model."""
    manager = pywrapcp.RoutingIndexManager(
        len(data['distance_matrix']),
        data['num_vehicles'],
        data['depot']
    )
    routing = pywrapcp.RoutingModel(manager)
    
    # Distance callback
    def distance_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]
    
    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    
    # Capacity constraint
    def demand_callback(from_index):
        from_node = manager.IndexToNode(from_index)
        return data['demands'][from_node]
    
    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities'],
        True,  # start cumul to zero
        'Capacity'
    )
    
    # Time windows constraint
    routing.AddDimension(
        transit_callback_index,
        30,  # allow waiting time
        3000,  # maximum time per vehicle
        False,
        'Time'
    )
    time_dimension = routing.GetDimensionOrDie('Time')
    
    for location_idx, time_window in enumerate(data['time_windows']):
        if location_idx == data['depot']:
            continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetRange(
            time_window[0], time_window[1]
        )
    
    return routing, manager

def solve(routing, manager, search_params=None):
    """Solve the VRPTW model."""
    if search_params is None:
        search_params = pywrapcp.DefaultRoutingSearchParameters()
        search_params.first_solution_strategy = (
            routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
        )
    
    return routing.SolveWithParameters(search_params)
`
      },
      {
        name: "instance_schema.json",
        content: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "VRPTW Instance",
  "type": "object",
  "required": ["distance_matrix", "time_windows", "demands", "vehicle_capacities", "depot", "num_vehicles"],
  "properties": {
    "distance_matrix": {
      "type": "array",
      "description": "NxN matrix of travel times (integer, seconds)",
      "items": { "type": "array", "items": { "type": "integer" } }
    },
    "time_windows": {
      "type": "array",
      "description": "Time windows [earliest, latest] for each location",
      "items": { "type": "array", "items": { "type": "integer" }, "minItems": 2, "maxItems": 2 }
    },
    "demands": {
      "type": "array",
      "description": "Demand at each location",
      "items": { "type": "integer" }
    },
    "vehicle_capacities": {
      "type": "array",
      "description": "Capacity of each vehicle",
      "items": { "type": "integer" }
    },
    "depot": {
      "type": "integer",
      "description": "Index of depot location"
    },
    "num_vehicles": {
      "type": "integer",
      "description": "Number of available vehicles"
    }
  }
}`
      },
      {
        name: "solver.yaml",
        content: `solver:
  name: CP-SAT
  backend: ortools
  version: "9.8"
  
parameters:
  first_solution_strategy: PATH_CHEAPEST_ARC
  local_search_metaheuristic: GUIDED_LOCAL_SEARCH
  time_limit_seconds: 300
  log_search: false
  
output:
  format: json
  include_routes: true
  include_timing: true`
      },
      {
        name: "evaluate.py",
        content: `"""Evaluate VRPTW solution quality."""
import json
import time
from typing import Dict, Any, Tuple

def check_feasibility(solution: Dict, data: Dict) -> Tuple[bool, list]:
    """Check if solution satisfies all constraints."""
    violations = []
    
    # Check capacity constraints
    for vehicle_id, route in enumerate(solution.get('routes', [])):
        total_demand = sum(data['demands'][node] for node in route)
        if total_demand > data['vehicle_capacities'][vehicle_id]:
            violations.append(f"Vehicle {vehicle_id}: capacity exceeded")
    
    # Check time window constraints
    for vehicle_id, route in enumerate(solution.get('routes', [])):
        current_time = 0
        for i, node in enumerate(route):
            tw_start, tw_end = data['time_windows'][node]
            if current_time > tw_end:
                violations.append(f"Vehicle {vehicle_id}: late arrival at node {node}")
            if i < len(route) - 1:
                next_node = route[i + 1]
                current_time = max(current_time, tw_start)
                current_time += data['distance_matrix'][node][next_node]
    
    return len(violations) == 0, violations

def compute_objective(solution: Dict, data: Dict) -> float:
    """Compute total distance traveled."""
    total_distance = 0.0
    for route in solution.get('routes', []):
        if len(route) < 2:
            continue
        for i in range(len(route) - 1):
            total_distance += data['distance_matrix'][route[i]][route[i + 1]]
    return total_distance

def evaluate(solution: Dict, data: Dict, runtime: float) -> Dict[str, Any]:
    """Full evaluation of solution."""
    feasible, violations = check_feasibility(solution, data)
    objective = compute_objective(solution, data) if feasible else None
    
    return {
        "feasible": feasible,
        "objective": objective,
        "runtime": runtime,
        "violations": violations,
        "num_routes": len(solution.get('routes', [])),
        "total_customers": sum(len(r) - 2 for r in solution.get('routes', []))
    }`
      }
    ],
    decisionCard: `# VRPTW OR-Tools Basic

## Overview
This package provides a basic implementation of the Vehicle Routing Problem with Time Windows (VRPTW) using Google OR-Tools constraint programming solver.

## Problem Description
Given a fleet of vehicles and a set of customers with:
- **Demands**: Each customer has a demand that must be satisfied
- **Time Windows**: Each customer must be served within their time window
- **Capacity**: Each vehicle has a maximum capacity

**Objective**: Minimize total travel distance while satisfying all constraints.

## Constraints
- Each customer is visited exactly once
- Vehicle capacity cannot be exceeded
- Time windows must be respected
- All routes start and end at the depot

## Assumptions
- Symmetric travel times
- Single depot
- Homogeneous fleet (same capacity for all vehicles)
- No service time (can be added via time matrix)

## Solver Configuration
- **Backend**: Google OR-Tools v9.8
- **Algorithm**: CP-SAT with Guided Local Search
- **Time Limit**: 300 seconds (configurable)

## Benchmark Instances
This package includes Solomon benchmark instances:
- C1, C2: Clustered customers
- R1, R2: Random customer locations  
- RC1, RC2: Mixed clustered and random

## License
Apache-2.0

## Citation
\`\`\`bibtex
@software{rastion_vrptw,
  title = {VRPTW OR-Tools Basic},
  author = {Rastion},
  year = {2024},
  url = {https://rastion.dev/packages/vrptw-ortools-basic}
}
\`\`\`
`
  },
  {
    id: "vrptw-pyomo-highs",
    name: "VRPTW Pyomo HiGHS",
    slug: "vrptw-pyomo-highs",
    description: "Mixed-integer programming formulation of VRPTW using Pyomo and HiGHS solver. Optimal for small instances.",
    author: "optimization-lab",
    version: "0.9.2",
    problemClass: "VRPTW",
    backend: "Pyomo",
    solver: "HiGHS",
    license: "MIT",
    downloads: 1203,
    stars: 89,
    lastUpdated: "2024-12-18",
    tags: ["routing", "time-windows", "mip", "pyomo", "highs"],
    benchmarks: [
      { instance: "solomon_c101_25", feasible: true, objective: 191.30, runtime: 12.45, solver: "HiGHS", gap: 0.0 },
      { instance: "solomon_c102_25", feasible: true, objective: 190.59, runtime: 45.23, solver: "HiGHS", gap: 0.0 },
      { instance: "solomon_r101_25", feasible: true, objective: 617.10, runtime: 28.91, solver: "HiGHS", gap: 0.02 },
      { instance: "solomon_r102_25", feasible: true, objective: 547.10, runtime: 89.12, solver: "HiGHS", gap: 0.05 },
    ],
    files: [],
    decisionCard: `# VRPTW Pyomo HiGHS

## Overview
Exact MIP formulation for VRPTW using Pyomo algebraic modeling language and HiGHS open-source solver.

## Formulation
Uses a three-index vehicle flow formulation with:
- Binary decision variables for arc usage
- Continuous variables for arrival times
- Big-M constraints for time window propagation

## Best For
- Small to medium instances (up to ~50 customers)
- When optimality guarantee is required
- Academic benchmarking

## License
MIT
`
  },
  {
    id: "tsp-ortools-basic",
    name: "TSP OR-Tools",
    slug: "tsp-ortools-basic",
    description: "Classic Traveling Salesman Problem solver using OR-Tools. Supports symmetric and asymmetric instances.",
    author: "rastion",
    version: "1.2.0",
    problemClass: "TSP",
    backend: "OR-Tools",
    solver: "CP-SAT",
    license: "Apache-2.0",
    downloads: 5621,
    stars: 234,
    lastUpdated: "2024-12-22",
    tags: ["routing", "tsp", "or-tools", "classic"],
    benchmarks: [
      { instance: "tsplib_berlin52", feasible: true, objective: 7542, runtime: 0.12, solver: "CP-SAT" },
      { instance: "tsplib_kroA100", feasible: true, objective: 21282, runtime: 0.45, solver: "CP-SAT" },
      { instance: "tsplib_ch150", feasible: true, objective: 6528, runtime: 1.23, solver: "CP-SAT" },
    ],
    files: [],
    decisionCard: `# TSP OR-Tools

## Overview
Efficient TSP solver using Google OR-Tools routing library.

## License
Apache-2.0
`
  },
  {
    id: "knapsack-pyomo-cbc",
    name: "Knapsack Pyomo CBC",
    slug: "knapsack-pyomo-cbc",
    description: "0-1 Knapsack problem with Pyomo and CBC solver. Includes multi-dimensional variant.",
    author: "math-opt",
    version: "2.0.1",
    problemClass: "Knapsack",
    backend: "Pyomo",
    solver: "CBC",
    license: "GPL-3.0",
    downloads: 892,
    stars: 45,
    lastUpdated: "2024-12-15",
    tags: ["knapsack", "combinatorial", "pyomo", "cbc"],
    benchmarks: [
      { instance: "pisinger_100", feasible: true, objective: 9147, runtime: 0.02, solver: "CBC" },
      { instance: "pisinger_500", feasible: true, objective: 28857, runtime: 0.18, solver: "CBC" },
      { instance: "pisinger_1000", feasible: true, objective: 54503, runtime: 0.89, solver: "CBC" },
    ],
    files: [],
    decisionCard: `# Knapsack Pyomo CBC

## Overview
Classic 0-1 knapsack implementation using Pyomo and CBC solver.

## License
GPL-3.0
`
  },
  {
    id: "bin-packing-ortools",
    name: "Bin Packing OR-Tools",
    slug: "bin-packing-ortools",
    description: "First-fit decreasing and optimal bin packing using OR-Tools. Supports 1D and 2D variants.",
    author: "packing-experts",
    version: "1.1.0",
    problemClass: "Bin Packing",
    backend: "OR-Tools",
    solver: "CP-SAT",
    license: "MIT",
    downloads: 1567,
    stars: 78,
    lastUpdated: "2024-12-19",
    tags: ["packing", "bin-packing", "or-tools", "combinatorial"],
    benchmarks: [
      { instance: "bpp_N1C1W1_A", feasible: true, objective: 25, runtime: 0.34, solver: "CP-SAT" },
      { instance: "bpp_N2C2W2_B", feasible: true, objective: 48, runtime: 1.56, solver: "CP-SAT" },
      { instance: "bpp_N3C3W3_C", feasible: true, objective: 135, runtime: 5.23, solver: "CP-SAT" },
    ],
    files: [],
    decisionCard: `# Bin Packing OR-Tools

## Overview
Bin packing with exact and heuristic methods using OR-Tools CP-SAT solver.

## License
MIT
`
  }
];

export const problemClasses = ["VRPTW", "TSP", "Knapsack", "Bin Packing", "Job Shop", "Flow Shop"];
export const backends = ["OR-Tools", "Pyomo", "PuLP", "CVXPY"];
export const solvers = ["CP-SAT", "HiGHS", "CBC", "GLPK", "SCIP"];