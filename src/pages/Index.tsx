import CodeBlock from "@/components/ui/CodeBlock";
import { Github, ExternalLink } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">Rastion</h1>
          <p className="text-muted-foreground mt-1">
            A reproducible execution standard for decision models
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-16">
        {/* Section 1: The Problem */}
        <section>
          <h2 className="text-xl font-semibold mb-4">The Problem</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Decision models are easy to write but hard to reproduce, compare, and audit.
            </p>
            <p>
              Models are shared as scripts, notebooks, or papers. Data assumptions, solver 
              configurations, and evaluation logic get mixed together. Even the original 
              author often cannot reproduce results months later.
            </p>
            <p>
              There is no standard way to package a decision model so that someone else 
              can run it and get the same answer.
            </p>
          </div>
        </section>

        {/* Section 2: The Core Idea */}
        <section>
          <h2 className="text-xl font-semibold mb-4">The Core Idea</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Decision models need a machine-checkable execution contract. Similar to how 
              machine learning moved from ad-hoc scripts to reproducible artifacts (containers, 
              model cards, standardized formats), optimization models need the same discipline.
            </p>
            <p>
              This leads to the concept of a <strong className="text-foreground">Decision Model Package (DMP)</strong>—a 
              self-contained directory that bundles model code, input schema, solver 
              configuration, and evaluation logic into a single, validatable unit.
            </p>
            <div className="border-l-2 border-border pl-4 mt-6 space-y-2">
              <p className="text-foreground font-medium">Rastion is not a solver.</p>
              <p className="text-foreground font-medium">Rastion is not a modeling language.</p>
              <p>Rastion sits above existing tools. It defines a frozen execution contract 
                so that independent parties can run the same model, compare results, and 
                audit assumptions—without re-implementing glue code or trusting undocumented defaults.</p>
            </div>
          </div>
        </section>

        {/* Section 3: What Exists Today */}
        <section>
          <h2 className="text-xl font-semibold mb-4">What Exists Today</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium shrink-0">DMP v0.1:</span>
              <span>A frozen package specification defining required files and interfaces</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium shrink-0">Rastion CLI:</span>
              <span>Validates a DMP, executes it, and emits structured JSON output</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium shrink-0">Offline validation:</span>
              <span>Schema checking without executing solver code</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground font-medium shrink-0">Stable output schema:</span>
              <span>Consistent fields: status, feasible, objective, runtime_seconds</span>
            </li>
          </ul>
        </section>

        {/* Section 4: The Anchor Proof */}
        <section className="border border-border rounded-md p-6 bg-muted/30">
          <h2 className="text-xl font-semibold mb-4">The Anchor Proof</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The <code className="text-sm bg-muted px-1.5 py-0.5 rounded">anchor-proof/</code> directory 
              contains a third-party Decision Model Package, written independently, validated and 
              executed using only public tooling.
            </p>
            <ul className="space-y-2 ml-4">
              <li>• No changes to the runner</li>
              <li>• No changes to the spec</li>
              <li>• Batch execution works</li>
            </ul>
            <p className="text-foreground font-medium mt-4">
              This is not a demo. This is a witness.
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/Rastion/rastion/tree/main/anchor-proof"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:underline"
              >
                View anchor-proof on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Section 5: What Rastion Does NOT Do */}
        <section>
          <h2 className="text-xl font-semibold mb-4">What Rastion Does NOT Do</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Does not host models</li>
            <li>• Does not benchmark solvers</li>
            <li>• Does not tune or optimize models</li>
            <li>• Does not provide dashboards or registries</li>
            <li>• Does not abstract optimization itself</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            This restraint is intentional. Rastion is a contract, not a platform.
          </p>
        </section>

        {/* Section 6: Try It in 10 Minutes */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Try It in 10 Minutes</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">1. Clone the repository</p>
              <CodeBlock code="git clone https://github.com/Rastion/rastion.git
cd rastion" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">2. Install Rastion</p>
              <CodeBlock code="pip install -e ." />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">3. Validate a minimal DMP</p>
              <CodeBlock code="decisionhub validate core/rastion/decision_model_package/examples/knapsack_basic" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">4. Run it</p>
              <CodeBlock code="decisionhub run core/rastion/decision_model_package/examples/knapsack_basic \
    --instance core/rastion/decision_model_package/examples/knapsack_basic/instance.json" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">5. Inspect the JSON output</p>
              <CodeBlock code={`{
  "status": "optimal",
  "feasible": true,
  "objective": 220,
  "runtime_seconds": 0.02
}`} />
            </div>
          </div>
        </section>

        {/* Section 7: Who This Is For */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Who This Is For</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Optimization researchers needing reproducible baselines</li>
            <li>• Applied operations research teams sharing models across environments</li>
            <li>• Benchmark authors publishing comparable results</li>
            <li>• Auditors and reviewers verifying model behavior</li>
            <li>• Anyone comparing decision models across environments</li>
          </ul>
        </section>

        {/* Section 8: Contribution Philosophy */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Contribution Philosophy</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Contributions are welcome. The primary goal is strengthening the execution contract.
            </p>
            <p>
              If someone can break reproducibility, that is a bug, not a failure.
            </p>
            <p className="font-medium text-foreground">Issues that help most:</p>
            <ul className="space-y-2 ml-4">
              <li>• Finding ambiguities in the spec</li>
              <li>• Exposing nondeterminism in execution</li>
              <li>• Challenging edge cases in the contract</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8">
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
            </div>
            <span>Apache-2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
