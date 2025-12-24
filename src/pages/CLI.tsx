import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Download, Play, BarChart3, Settings, Box } from "lucide-react";

const CLI = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* Header */}
          <div className="mb-10">
            <Badge variant="secondary" className="mb-4">
              <Terminal className="h-3.5 w-3.5 mr-1.5" />
              Command Line Interface
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Rastion CLI</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The Rastion command-line interface for creating, running, and benchmarking decision model packages.
            </p>
          </div>

          {/* Installation */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Install Rastion CLI via pip:
              </p>
              <CodeBlock code="pip install rastion" />
              <p className="text-sm text-muted-foreground">
                Requires Python 3.9+ and pip.
              </p>
            </CardContent>
          </Card>

          {/* Commands */}
          <Tabs defaultValue="init" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-5 gap-1">
              <TabsTrigger value="init" className="gap-2">
                <Box className="h-4 w-4" />
                <span className="hidden sm:inline">init</span>
              </TabsTrigger>
              <TabsTrigger value="run" className="gap-2">
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">run</span>
              </TabsTrigger>
              <TabsTrigger value="benchmark" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">benchmark</span>
              </TabsTrigger>
              <TabsTrigger value="install" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">install</span>
              </TabsTrigger>
              <TabsTrigger value="config" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">config</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="init">
              <Card>
                <CardHeader>
                  <CardTitle>rastion init</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Initialize a new decision model package with the standard structure.
                  </p>
                  <CodeBlock
                    code={`$ rastion init my-vrptw-model

Creating decision model package: my-vrptw-model/
├── model.py
├── instance_schema.json
├── instances/
│   └── example.json
├── solver.yaml
├── evaluate.py
├── decision_card.md
└── requirements.txt

✓ Package initialized successfully!

Next steps:
  cd my-vrptw-model
  rastion run . --instance instances/example.json`}
                  />
                  <h4 className="font-semibold mt-6">Options</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--template</code>
                      <span className="text-muted-foreground">Use a predefined template (vrptw, tsp, knapsack)</span>
                    </div>
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--backend</code>
                      <span className="text-muted-foreground">Set default backend (ortools, pyomo)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="run">
              <Card>
                <CardHeader>
                  <CardTitle>rastion run</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Run a decision model package on a specific instance.
                  </p>
                  <CodeBlock
                    code={`$ rastion run vrptw-ortools-basic --instance solomon_c101

Loading package: vrptw-ortools-basic@1.0.0
Loading instance: solomon_c101
Solver: CP-SAT (OR-Tools 9.8)

Solving...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%

Results:
┌─────────────────────────────────────┐
│ Status:    Feasible                 │
│ Objective: 828.94                   │
│ Runtime:   1.24s                    │
│ Routes:    10                       │
│ Customers: 100                      │
└─────────────────────────────────────┘

Solution saved to: solution.json`}
                  />
                  <h4 className="font-semibold mt-6">Options</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--instance</code>
                      <span className="text-muted-foreground">Instance name or path (required)</span>
                    </div>
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--output</code>
                      <span className="text-muted-foreground">Output file path (default: solution.json)</span>
                    </div>
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--time-limit</code>
                      <span className="text-muted-foreground">Override solver time limit</span>
                    </div>
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--docker</code>
                      <span className="text-muted-foreground">Run in Docker container</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benchmark">
              <Card>
                <CardHeader>
                  <CardTitle>rastion benchmark</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Run all benchmark instances and generate a results report.
                  </p>
                  <CodeBlock
                    code={`$ rastion benchmark vrptw-ortools-basic

Running benchmarks for: vrptw-ortools-basic@1.0.0
Instances: 5 | Solver: CP-SAT

[1/5] solomon_c101   ✓ 828.94   1.24s
[2/5] solomon_c102   ✓ 828.94   3.45s
[3/5] solomon_r101   ✓ 1650.80  2.18s
[4/5] solomon_r102   ✓ 1486.12  8.92s
[5/5] solomon_rc101  ✓ 1696.94  4.56s

┌────────────────┬──────────┬───────────┬──────────┐
│ Instance       │ Feasible │ Objective │ Runtime  │
├────────────────┼──────────┼───────────┼──────────┤
│ solomon_c101   │ ✓        │ 828.94    │ 1.24s    │
│ solomon_c102   │ ✓        │ 828.94    │ 3.45s    │
│ solomon_r101   │ ✓        │ 1650.80   │ 2.18s    │
│ solomon_r102   │ ✓        │ 1486.12   │ 8.92s    │
│ solomon_rc101  │ ✓        │ 1696.94   │ 4.56s    │
├────────────────┼──────────┼───────────┼──────────┤
│ Average        │ 100%     │ 1298.35   │ 4.07s    │
└────────────────┴──────────┴───────────┴──────────┘

Results saved to: benchmark_results.json`}
                  />
                  <h4 className="font-semibold mt-6">Options</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--output</code>
                      <span className="text-muted-foreground">Output file (JSON or CSV)</span>
                    </div>
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--parallel</code>
                      <span className="text-muted-foreground">Number of parallel runs</span>
                    </div>
                    <div className="flex gap-4">
                      <code className="font-mono text-primary">--docker</code>
                      <span className="text-muted-foreground">Run in Docker containers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="install">
              <Card>
                <CardHeader>
                  <CardTitle>rastion install</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Install a decision model package from the Rastion registry.
                  </p>
                  <CodeBlock
                    code={`$ rastion install vrptw-ortools-basic

Fetching: vrptw-ortools-basic@1.0.0
Downloading... ━━━━━━━━━━━━━━━━━━━━ 100%
Installing dependencies...
  ✓ ortools==9.8.3296
  ✓ numpy>=1.21.0

Package installed to: ~/.rastion/packages/vrptw-ortools-basic/

Available instances:
  - solomon_c101
  - solomon_c102
  - solomon_r101
  - solomon_r102
  - solomon_rc101`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="config">
              <Card>
                <CardHeader>
                  <CardTitle>rastion config</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Configure global Rastion settings.
                  </p>
                  <CodeBlock
                    code={`$ rastion config --list

Global Configuration:
  packages_dir: ~/.rastion/packages
  docker_image: rastion/runner:latest
  default_time_limit: 300
  parallel_jobs: 4

$ rastion config set default_time_limit 600
✓ Updated default_time_limit to 600`}
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

export default CLI;