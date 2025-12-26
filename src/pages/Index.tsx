import CodeBlock from "@/components/ui/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, CheckCircle2, XCircle, FileText, FolderTree, Terminal, FileJson, FileCode, BookOpen } from "lucide-react";

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
                <p className="text-xl text-foreground mt-3 font-medium leading-snug">
                  A frozen execution contract for decision models.
                </p>
              </div>
              <p className="text-muted-foreground">
                Executable. Auditable. Reproducible by design.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/Rastion/rastion/blob/main/docs/DMP_v0.1.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Read the spec
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/Rastion/rastion/tree/main/core/rastion/decision_model_package/examples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <FolderTree className="h-4 w-4" />
                    View examples
                  </a>
                </Button>
              </div>
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
        
        {/* What Problem Rastion Solves */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">What Problem Rastion Solves</h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground">
            <p>
              Decision models are hard to reproduce, audit, and compare. Results depend on undocumented 
              assumptions and hidden execution choices—solver defaults, data preprocessing, evaluation logic 
              scattered across scripts.
            </p>
            <p>
              Rastion defines a minimal, inspectable execution boundary. Given a Decision Model Package and 
              an instance, anyone can independently validate, execute, and audit the result under a stable, 
              documented contract.
            </p>
          </div>
        </section>

        {/* What a Decision Model Package Is */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">What a Decision Model Package Is</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                A DMP is a self-contained directory that bundles everything needed for deterministic execution:
              </p>
              <Card className="font-mono text-sm">
                <CardContent className="pt-4 pb-4 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FolderTree className="h-4 w-4 shrink-0" />
                    <span className="text-foreground font-medium">my-dmp/</span>
                  </div>
                  <div className="pl-6 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>model.py</span>
                      <span className="text-muted-foreground">— create_model(), solve()</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileJson className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>instance_schema.json</span>
                      <span className="text-muted-foreground">— JSON Schema</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>solver.yaml</span>
                      <span className="text-muted-foreground">— solver config</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>evaluate.py</span>
                      <span className="text-muted-foreground">— evaluate(), check_feasibility()</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>decision_card.md</span>
                      <span className="text-muted-foreground">— human-readable</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Separation of Concerns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="pb-3 border-b border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">User-defined (modeling choices)</p>
                    <p className="text-muted-foreground">Model logic, constraints, objectives, solver selection</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Rastion-defined (execution contract)</p>
                    <p className="text-muted-foreground">Package structure, entry points, validation, output schema</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Status: Where the Project Is Today */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Status: Where the Project Is Today</h2>
          <Card className="max-w-2xl">
            <CardContent className="pt-5 pb-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-foreground shrink-0" />
                  <span><span className="font-medium">DMP v0.1 specified and frozen</span> — stable package structure, execution semantics, output schema</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-foreground shrink-0" />
                  <span><span className="font-medium">Reference runner implemented</span> — Python CLI (<code className="font-mono text-xs bg-muted px-1 rounded">decisionhub</code>)</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-foreground shrink-0" />
                  <span><span className="font-medium">Validation and execution tooling</span> — structural checks, schema validation, JSON output</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-foreground shrink-0" />
                  <span><span className="font-medium">Example packages</span> — knapsack, JSSP, VRPTW</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-foreground shrink-0" />
                  <span><span className="font-medium">Third-party anchor proof</span> — independent validation of the contract</span>
                </li>
              </ul>
              <p className="mt-5 pt-4 border-t border-border text-sm text-muted-foreground">
                Rastion is early-stage, but the core contract is complete and stable.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* The Anchor Proof */}
        <section className="bg-muted border border-border rounded-lg p-8 md:p-10">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">The Anchor Proof</h2>
            <p className="text-muted-foreground mb-6">
              Third-party executability is proven. The anchor proof demonstrates:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                Validation without execution
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                Reproducible execution
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                Multi-instance runs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                No runner or spec changes required
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
          <h2 className="text-lg font-semibold text-muted-foreground">Execution Receipt</h2>
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

        {/* What Rastion Is Not Trying to Do */}
        <section>
          <Card className="border-dashed max-w-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">What Rastion Is Not Trying to Do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Feature creep
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Governance platforms
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Solver wars or rankings
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0" />
                  Benchmark scoreboards
                </li>
              </ul>
              <p className="mt-4 text-sm text-foreground">
                This restraint is intentional. The scope is deliberately narrow.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Who Rastion Is For */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Who Rastion Is For</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground max-w-xl">
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              Researchers publishing decision models
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              Engineers deploying optimization logic
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              Teams that need auditability
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              Anyone whose results must survive outside their own environment
            </li>
          </ul>
        </section>

        {/* Social Infrastructure */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-muted-foreground">Social Infrastructure</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Lightweight, opt-in mechanisms for signaling compliance and testing the contract:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <Card>
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">DMP v0.1 Badge</p>
                <p className="text-xs text-muted-foreground mb-3">Self-declared compliance signal for package authors.</p>
                <a
                  href="https://github.com/Rastion/rastion/blob/main/docs/DMP_BADGE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  View badge docs <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-4">
                <p className="text-sm font-medium mb-1">Break Rastion Challenge</p>
                <p className="text-xs text-muted-foreground mb-3">Adversarial testing framed as contract validation.</p>
                <a
                  href="https://github.com/Rastion/rastion/blob/main/docs/BREAK_RASTION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  View challenge <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Links & References */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-muted-foreground">Links & References</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://github.com/Rastion/rastion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Github className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">GitHub Repository</p>
                <p className="text-xs text-muted-foreground">Source code and examples</p>
              </div>
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/DMP_v0.1.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <FileText className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">DMP v0.1 Specification</p>
                <p className="text-xs text-muted-foreground">Frozen contract definition</p>
              </div>
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/dmp_v0.1_freeze_memo.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <FileText className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Freeze Memo</p>
                <p className="text-xs text-muted-foreground">Rationale and decisions</p>
              </div>
            </a>
            <a
              href="https://github.com/Rastion/rastion/tree/main/anchor-proof"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <FolderTree className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Anchor Proof</p>
                <p className="text-xs text-muted-foreground">Third-party validation</p>
              </div>
            </a>
            <a
              href="https://github.com/Rastion/rastion/tree/main/core/rastion/decision_model_package/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <FolderTree className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Examples Directory</p>
                <p className="text-xs text-muted-foreground">Knapsack, JSSP, VRPTW</p>
              </div>
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/BREAK_RASTION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Terminal className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Break Rastion Challenge</p>
                <p className="text-xs text-muted-foreground">Test the contract</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
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
