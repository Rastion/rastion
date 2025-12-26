import CodeBlock from "@/components/ui/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, CheckCircle2, FileText, FolderTree, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DMPExecutionContract,
  AuthoringDMP,
  DMPBadgeFlow,
  BreakRastionChallenge,
  ExplicitNonGoals,
} from "@/components/diagrams";
import SiteLayout from "@/components/SiteLayout";
import DmpBadge from "@/components/DmpBadge";

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
    },
    metadata: {
      total_weight: 12,
    }
  };

  return (
    <SiteLayout>
      {/* Hero */}
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
                  <Link to="/examples" className="inline-flex items-center gap-2">
                    <FolderTree className="h-4 w-4" />
                    View examples
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="font-mono text-xs text-muted-foreground mb-2">terminal</div>
              <CodeBlock code="decisionhub run dmp/ --instance instance.json" />
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

        {/* DMP Execution Contract - Core Diagram */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">The Execution Contract</h2>
          <DMPExecutionContract />
        </section>

        {/* What a Decision Model Package Is */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">How to Create a Decision Model Package</h2>
          <AuthoringDMP />
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
                  <span><span className="font-medium">Example packages</span> — validated and executed in CI</span>
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

        {/* DMP Badge Flow Diagram */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">DMP v0.1 Badge</h2>
          <DMPBadgeFlow />
          <p className="text-sm text-muted-foreground max-w-2xl">
            <span className="inline-flex items-center gap-2">
              <DmpBadge />
              <span>The badge is a self-declared compliance signal. Authors verify their own packages against DMP v0.1 requirements.</span>
            </span>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/DMP_BADGE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View badge docs <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </section>

        {/* Break Rastion Challenge Diagram */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Break Rastion Challenge</h2>
          <BreakRastionChallenge />
          <p className="text-sm text-muted-foreground max-w-2xl">
            Adversarial testing framed as contract validation. If you can break reproducibility, that's a bug in the spec.
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/BREAK_RASTION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View challenge <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </section>

        {/* Explicit Non-Goals Diagram */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">What Rastion Is Not Trying to Do</h2>
          <ExplicitNonGoals />
          <p className="text-sm text-muted-foreground text-center">
            This restraint is intentional. The scope is deliberately narrow.
          </p>
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
                <p className="text-xs text-muted-foreground">Auto-discovered DMP examples</p>
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
    </SiteLayout>
  );
};

export default Index;
