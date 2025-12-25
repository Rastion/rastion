import CodeBlock from "@/components/ui/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, CheckCircle2, XCircle, FileText, Scale } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero: Position, not pitch */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Rastion</h1>
                <p className="text-lg text-muted-foreground mt-1">
                  A reproducible execution standard for decision models
                </p>
              </div>
              <p className="text-foreground font-medium">
                Rastion exists to make optimization boring.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                It defines a frozen execution contract so independent parties can run the same model, 
                compare results, and audit assumptions—without re-implementing glue code.
              </p>
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
            <div className="space-y-3">
              <div className="font-mono text-xs text-muted-foreground mb-2">terminal</div>
              <CodeBlock 
                code="decisionhub run dmp/ --instance instance.json" 
              />
              <p className="text-xs text-muted-foreground text-center font-mono">
                Same input. Same output. Anywhere.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        
        {/* Why This Exists - Problem framing as card grid */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-muted-foreground">Why This Exists</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-card">
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Ad-hoc artifacts</p>
                <p className="text-xs text-muted-foreground">Models shared as scripts, notebooks, or papers.</p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Hidden defaults</p>
                <p className="text-xs text-muted-foreground">Solver configurations buried in code.</p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Non-comparable runs</p>
                <p className="text-xs text-muted-foreground">No standard way to validate equivalence.</p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Audits by reconstruction</p>
                <p className="text-xs text-muted-foreground">Reviewers must re-implement to verify.</p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Irreproducible history</p>
                <p className="text-xs text-muted-foreground">Even authors can't reproduce past results.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground">
            These failures are systemic, not user error.
          </p>
        </section>

        {/* The Core Idea - Two column layout */}
        <section className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">Principle</h2>
            <p className="text-foreground font-medium">
              Decision models need a machine-checkable execution contract.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Just as ML moved from ad-hoc scripts to reproducible artifacts with defined inputs, outputs, 
              and metadata—optimization needs the same discipline.
            </p>
          </div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Decision Model Package (DMP)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A self-contained directory bundling model logic, instance schema, solver configuration, and evaluation.
              </p>
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <XCircle className="h-3 w-3" />
                  Not a solver
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <XCircle className="h-3 w-3" />
                  Not a modeling language
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" />
                  Sits above existing tools
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What Exists Today - Evidence grid */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-muted-foreground">What Exists Today</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">DMP v0.1</p>
                <p className="text-xs text-muted-foreground">Frozen specification. Required files and interfaces defined.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Rastion CLI</p>
                <p className="text-xs text-muted-foreground">Validates, executes, emits structured JSON.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Offline Validation</p>
                <p className="text-xs text-muted-foreground">Structural + schema checks without solver execution.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Stable Output Schema</p>
                <p className="text-xs text-muted-foreground font-mono">status, feasible, objective, runtime_seconds</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Anchor Proof - Museum centerpiece */}
        <section className="bg-muted border border-border rounded-lg p-8 md:p-10">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">The Anchor Proof</h2>
            <p className="text-muted-foreground mb-6">
              A Decision Model Package written independently, validated and executed using only public tooling—without 
              modifying the runner or the specification.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                No runner changes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                No spec changes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                Batch execution works
              </li>
            </ul>
            <p className="text-foreground font-semibold text-lg mb-6">
              This is not a demo. This is a witness.
            </p>
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
        </section>

        {/* Decision Card - Execution receipt */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-muted-foreground">Decision Card</h2>
          <Card className="max-w-xl border-2">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Knapsack — Anchor Proof</CardTitle>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {anchorProofResult.solver.name} v{anchorProofResult.solver.version}
                  </p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-muted rounded border border-border">
                  {anchorProofResult.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Feasible</p>
                  <p className="font-mono text-sm font-medium">{anchorProofResult.feasible ? "true" : "false"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Objective</p>
                  <p className="font-mono text-sm font-medium">{anchorProofResult.objective}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Runtime</p>
                  <p className="font-mono text-sm font-medium">{anchorProofResult.runtime_seconds.toFixed(4)}s</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Weight</p>
                  <p className="font-mono text-sm font-medium">{anchorProofResult.metadata.total_weight}</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Selected Items</p>
                <div className="flex flex-wrap gap-2">
                  {anchorProofResult.solution.selected_item_ids.map((item) => (
                    <span key={item} className="text-xs font-mono bg-muted px-2 py-1 rounded border border-border">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="italic">Generated by Rastion CLI</span>
                <span className="text-border">|</span>
                <a
                  href="https://github.com/Rastion/rastion/blob/main/anchor-proof/benchmarks/results/instance_01.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  View JSON <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://github.com/Rastion/rastion/tree/main/anchor-proof/dmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  View DMP <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Explicit Non-Goals - Constraint box */}
        <section>
          <Card className="border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Scale className="h-4 w-4" />
                What Rastion Explicitly Does Not Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Host models
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Benchmark solvers
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Tune or optimize models
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Provide dashboards or registries
                </li>
                <li className="flex items-center gap-2 sm:col-span-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Abstract optimization itself
                </li>
              </ul>
              <p className="mt-4 text-sm text-foreground font-medium">
                Rastion is a contract, not a platform.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Try It - Mechanical, boring, correct */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-muted-foreground">Try It in 10 Minutes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-muted-foreground">Step 1</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm font-medium">Clone the repo</p>
                <CodeBlock code={`git clone https://github.com/Rastion/rastion.git
cd rastion`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-muted-foreground">Step 2</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm font-medium">Install in editable mode</p>
                <CodeBlock code="pip install -e ." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-muted-foreground">Step 3</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm font-medium">Validate a DMP</p>
                <CodeBlock code="decisionhub validate anchor-proof/dmp" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-muted-foreground">Step 4</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm font-medium">Run a DMP</p>
                <CodeBlock code={`decisionhub run anchor-proof/dmp \\
  --instance anchor-proof/instances/instance_01.json`} />
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-muted-foreground">Step 5</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm font-medium">Inspect JSON output</p>
                <CodeBlock code={`{
  "status": "feasible",
  "feasible": true,
  "objective": 17,
  "runtime_seconds": 0.0105,
  "solution": { "selected_item_ids": ["item-e", "item-c", "item-a"] }
}`} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Who This Is For / Contribution Philosophy - Two column */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">Who This Is For</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Optimization researchers</li>
              <li>Applied operations research teams</li>
              <li>Benchmark authors</li>
              <li>Auditors and reviewers</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-muted-foreground">Contribution Philosophy</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Strengthen the execution contract</li>
              <li>Break reproducibility → it's a bug</li>
              <li>Ambiguity → it's a spec issue</li>
            </ul>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Issues that challenge the spec, expose nondeterminism, or find edge cases are valuable.
            </p>
          </div>
        </section>
      </main>

      {/* Footer - Quiet */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/Rastion/rastion"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/DMP_v0.1.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
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
        </div>
      </footer>
    </div>
  );
};

export default Index;
