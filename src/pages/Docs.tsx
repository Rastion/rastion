import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Rocket, 
  Box, 
  FileCode, 
  Settings, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Docs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* Header */}
          <div className="mb-10">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="h-3.5 w-3.5 mr-1.5" />
              Documentation
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Getting Started</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Learn how to create, share, and benchmark decision model packages with Rastion.
            </p>
          </div>

          <Tabs defaultValue="quickstart" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 gap-1">
              <TabsTrigger value="quickstart" className="gap-2">
                <Rocket className="h-4 w-4" />
                <span className="hidden sm:inline">Quickstart</span>
              </TabsTrigger>
              <TabsTrigger value="format" className="gap-2">
                <Box className="h-4 w-4" />
                <span className="hidden sm:inline">Format</span>
              </TabsTrigger>
              <TabsTrigger value="schema" className="gap-2">
                <FileCode className="h-4 w-4" />
                <span className="hidden sm:inline">Schema</span>
              </TabsTrigger>
              <TabsTrigger value="docker" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Docker</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quickstart">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>1. Install Rastion CLI</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CodeBlock code="pip install rastion" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2. Create a New Package</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CodeBlock code="rastion init my-optimization-model --template vrptw" />
                    <p className="text-muted-foreground">
                      This creates a new package with the standard structure, including example files.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>3. Implement Your Model</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Edit <code className="bg-muted px-1.5 py-0.5 rounded">model.py</code> to implement your optimization logic:
                    </p>
                    <CodeBlock
                      filename="model.py"
                      showLineNumbers
                      code={`from ortools.constraint_solver import pywrapcp
from typing import Dict, Any

def create_model(data: Dict[str, Any]):
    """Create your optimization model here."""
    manager = pywrapcp.RoutingIndexManager(
        len(data['locations']),
        data['num_vehicles'],
        data['depot']
    )
    routing = pywrapcp.RoutingModel(manager)
    
    # Add your constraints and objectives
    # ...
    
    return routing, manager

def solve(routing, manager, params=None):
    """Solve the model and return solution."""
    solution = routing.SolveWithParameters(params)
    return solution`}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>4. Run Your Model</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CodeBlock code="rastion run . --instance instances/example.json" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>5. Benchmark</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CodeBlock code="rastion benchmark ." />
                    <p className="text-muted-foreground">
                      This runs all instances in your <code className="bg-muted px-1.5 py-0.5 rounded">instances/</code> folder and generates a benchmark report.
                    </p>
                  </CardContent>
                </Card>

                <div className="flex justify-center pt-4">
                  <Link to="/cli">
                    <Button className="gap-2">
                      View Full CLI Reference
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="format">
              <Card>
                <CardHeader>
                  <CardTitle>Decision Model Package Format</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Every Rastion package follows a standardized structure:
                  </p>

                  <CodeBlock
                    code={`my-optimization-model/
├── model.py              # Core optimization model
├── instance_schema.json  # JSON Schema for input data
├── instances/            # Benchmark instances
│   ├── small.json
│   ├── medium.json
│   └── large.json
├── solver.yaml           # Solver configuration
├── evaluate.py           # Solution evaluation
├── decision_card.md      # Documentation
└── requirements.txt      # Python dependencies`}
                  />

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">File Descriptions</h3>
                    
                    {[
                      {
                        file: "model.py",
                        desc: "Contains the optimization model implementation. Must export create_model() and solve() functions."
                      },
                      {
                        file: "instance_schema.json",
                        desc: "JSON Schema defining the structure and constraints of input instances."
                      },
                      {
                        file: "instances/",
                        desc: "Directory containing benchmark instances in JSON format."
                      },
                      {
                        file: "solver.yaml",
                        desc: "Configuration for solver backend, parameters, and output format."
                      },
                      {
                        file: "evaluate.py",
                        desc: "Functions to check feasibility and compute objective value."
                      },
                      {
                        file: "decision_card.md",
                        desc: "Human-readable documentation including assumptions, constraints, and citations."
                      }
                    ].map(({ file, desc }) => (
                      <div key={file} className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <div>
                          <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{file}</code>
                          <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schema">
              <Card>
                <CardHeader>
                  <CardTitle>Instance Schema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Instance schemas define the data contract for your optimization model using JSON Schema.
                  </p>

                  <CodeBlock
                    filename="instance_schema.json"
                    showLineNumbers
                    code={`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "VRPTW Instance",
  "type": "object",
  "required": [
    "distance_matrix",
    "time_windows",
    "demands",
    "vehicle_capacities",
    "depot",
    "num_vehicles"
  ],
  "properties": {
    "distance_matrix": {
      "type": "array",
      "description": "NxN matrix of travel times (seconds)",
      "items": {
        "type": "array",
        "items": { "type": "integer" }
      }
    },
    "time_windows": {
      "type": "array",
      "description": "Time windows [earliest, latest] per location",
      "items": {
        "type": "array",
        "items": { "type": "integer" },
        "minItems": 2,
        "maxItems": 2
      }
    },
    "demands": {
      "type": "array",
      "description": "Demand at each location",
      "items": { "type": "integer" }
    },
    "vehicle_capacities": {
      "type": "array",
      "description": "Capacity per vehicle",
      "items": { "type": "integer" }
    },
    "depot": {
      "type": "integer",
      "description": "Depot location index"
    },
    "num_vehicles": {
      "type": "integer",
      "description": "Number of vehicles"
    }
  }
}`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docker">
              <Card>
                <CardHeader>
                  <CardTitle>Docker Runner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    For reproducible execution, Rastion provides Docker-based runners with pinned dependencies.
                  </p>

                  <h3 className="text-lg font-semibold">Running in Docker</h3>
                  <CodeBlock
                    code={`# Run a package in Docker
docker run --rm -v $(pwd):/workspace rastion/runner \\
  run my-model --instance /workspace/instance.json

# Benchmark in Docker
docker run --rm -v $(pwd):/workspace rastion/runner \\
  benchmark my-model --output /workspace/results.json`}
                  />

                  <h3 className="text-lg font-semibold mt-6">Custom Dockerfile</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a <code className="bg-muted px-1.5 py-0.5 rounded">Dockerfile</code> in your package for custom environments:
                  </p>
                  <CodeBlock
                    filename="Dockerfile"
                    showLineNumbers
                    code={`FROM rastion/base:python3.11

WORKDIR /package

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy package files
COPY . .

# Entry point
ENTRYPOINT ["rastion", "run", "."]`}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;