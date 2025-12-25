import CodeBlock from "@/components/ui/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const Index = () => {
  // Anchor proof data from anchor-proof/benchmarks/results/instance_01.json
  const anchorProofResult = {
    status: "feasible",
    feasible: true,
    objective: 17,
    runtime_seconds: 0.0105,
    solution: {
      selected_item_ids: ["item-e", "item-c", "item-a"]
    },
    solver: {
      name: "greedy-knapsack",
      version: "1.0",
      description: "Deterministic greedy selection by value-to-weight ratio."
    },
    metadata: {
      total_weight: 12,
      selected_count: 3
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Rastion</h1>
              <p className="text-lg text-muted-foreground mt-2">
                A reproducible execution standard for decision models
              </p>
              <p className="text-muted-foreground mt-4">
                Rastion defines a frozen execution contract so independent parties can run the same model, 
                compare results, and audit assumptions—without re-implementing glue code.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/Rastion/rastion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
            <div>
              <CodeBlock 
                code="decisionhub run dmp/ --instance instance.json" 
                filename="terminal"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Same input. Same output. Anywhere.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Problem vs Core Idea - Two Column Cards */}
        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">The Problem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Models shared as scripts, notebooks, papers</p>
              <p>• Hidden solver defaults and configurations</p>
              <p>• Non-reproducible runs across environments</p>
              <p>• Impossible audits without re-implementation</p>
              <p>• Original authors can't reproduce results months later</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">The Core Idea</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Decision models need a <span className="text-foreground font-medium">machine-checkable execution contract</span>.
              </p>
              <p>
                This leads to the <span className="text-foreground font-medium">Decision Model Package (DMP)</span>—a 
                self-contained directory bundling model, schema, solver config, and evaluation.
              </p>
              <div className="pt-2 border-t border-border mt-3 space-y-1">
                <p className="text-foreground text-xs font-medium">• Not a solver</p>
                <p className="text-foreground text-xs font-medium">• Not a modeling language</p>
                <p className="text-foreground text-xs font-medium">• Sits above existing tools</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What Exists Today - Grid of Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-6">What Exists Today</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">DMP v0.1</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Frozen specification. Required files and interfaces defined.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rastion CLI</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Validates, executes, emits structured JSON output.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Offline Validation</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Structural + schema checks. No solver execution required.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stable Output Schema</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                status, feasible, objective, runtime_seconds. Metadata is additive only.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Anchor Proof - Visually Dominant */}
        <section className="bg-muted/50 border border-border rounded-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">The Anchor Proof</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The <code className="text-sm bg-background px-1.5 py-0.5 rounded border border-border">anchor-proof/</code> directory 
                contains an independent Decision Model Package—written without modifying the runner or spec.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  No changes to the runner
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  No changes to the spec
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  Batch execution works
                </li>
              </ul>
              <p className="text-foreground font-medium text-lg pt-2">
                This is not a demo. This is a witness.
              </p>
              <div className="pt-4">
                <Button asChild>
                  <a
                    href="https://github.com/Rastion/rastion/tree/main/anchor-proof"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View anchor-proof on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Card - Real Data */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Decision Card</h2>
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle className="text-base">Knapsack — Anchor Proof</CardTitle>
              <p className="text-xs text-muted-foreground">
                {anchorProofResult.solver.name} v{anchorProofResult.solver.version}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-mono text-foreground">{anchorProofResult.status}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Feasible</p>
                  <p className="font-mono text-foreground">{anchorProofResult.feasible ? "true" : "false"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Objective</p>
                  <p className="font-mono text-foreground">{anchorProofResult.objective}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Runtime</p>
                  <p className="font-mono text-foreground">{anchorProofResult.runtime_seconds.toFixed(4)}s</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground mb-2">Selected Items</p>
                <div className="flex flex-wrap gap-2">
                  {anchorProofResult.solution.selected_item_ids.map((item) => (
                    <span key={item} className="text-xs font-mono bg-muted px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Total weight: {anchorProofResult.metadata.total_weight} | 
                  Count: {anchorProofResult.metadata.selected_count}
                </p>
              </div>

              <div className="border-t border-border pt-4 flex flex-wrap gap-4 text-xs">
                <span className="text-muted-foreground">Generated by Rastion CLI</span>
                <a
                  href="https://github.com/Rastion/rastion/blob/main/anchor-proof/benchmarks/results/instance_01.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline inline-flex items-center gap-1"
                >
                  View JSON <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://github.com/Rastion/rastion/tree/main/anchor-proof/dmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline inline-flex items-center gap-1"
                >
                  View DMP <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What Rastion Does NOT Do - Warning Panel */}
        <section>
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold mb-4">What Rastion Does NOT Do</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3.5 w-3.5" />
                    Does not host models
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3.5 w-3.5" />
                    Does not benchmark solvers
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3.5 w-3.5" />
                    Does not tune or optimize models
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3.5 w-3.5" />
                    Does not provide dashboards or registries
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-3.5 w-3.5" />
                    Does not abstract optimization itself
                  </li>
                </ul>
                <p className="mt-4 text-sm text-foreground font-medium">
                  Rastion is a contract, not a platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Try It in 10 Minutes - Step Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Try It in 10 Minutes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">1. Clone the repo</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`git clone https://github.com/Rastion/rastion.git
cd rastion`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">2. Install</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code="pip install -e ." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">3. Validate a DMP</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code="decisionhub validate anchor-proof/dmp" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">4. Run it</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`decisionhub run anchor-proof/dmp \\
  --instance anchor-proof/instances/instance_01.json`} />
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">5. Inspect JSON output</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`{
  "status": "feasible",
  "feasible": true,
  "objective": 17,
  "runtime_seconds": 0.0105,
  "solution": {
    "selected_item_ids": ["item-e", "item-c", "item-a"]
  }
}`} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Who This Is For / Contribution Philosophy - Two Column */}
        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Who This Is For</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Optimization researchers needing reproducible baselines</p>
              <p>• Applied operations research teams</p>
              <p>• Benchmark authors publishing comparable results</p>
              <p>• Auditors and reviewers verifying model behavior</p>
              <p>• Anyone comparing decision models across environments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contribution Philosophy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                The primary goal is <span className="text-foreground font-medium">strengthening the execution contract</span>.
              </p>
              <p>
                If someone can break reproducibility, that's a bug, not a failure.
              </p>
              <div className="pt-2">
                <p className="text-xs text-foreground font-medium mb-2">Issues that help most:</p>
                <p className="text-xs">• Finding ambiguities in the spec</p>
                <p className="text-xs">• Exposing nondeterminism</p>
                <p className="text-xs">• Challenging edge cases</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Rastion/rastion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://github.com/Rastion/rastion/blob/main/docs/DMP_v0.1.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                DMP v0.1 Spec
              </a>
              <a
                href="https://github.com/Rastion/rastion/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Apache-2.0
              </a>
            </div>
            <span>Rastion</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
