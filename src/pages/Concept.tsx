import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";
import { CheckCircle2 } from "lucide-react";

const Concept = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Decision Model Package (DMP)
            </h1>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">What is a Decision Model Package?</h2>
              <p className="text-muted-foreground mb-4">
                A Decision Model Package is a self-contained directory that bundles an optimization model 
                implementation with its input schema, solver configuration, and evaluation logic. DMP v0.1 
                defines the minimum files and entry points needed to validate and run a model end-to-end.
              </p>
              <p className="text-muted-foreground">
                Think of it as a standardized contract: the package declares what it expects as input, 
                how it will solve the problem, and how results should be evaluated. The CLI then executes 
                this contract consistently.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Required Files</h2>
              <p className="text-muted-foreground mb-6">
                Every DMP v0.1 package must include these files:
              </p>

              <div className="space-y-4">
                {[
                  {
                    file: "model.py",
                    desc: "The optimization model implementation. Contains the logic to construct and solve the model given instance data."
                  },
                  {
                    file: "instance_schema.json",
                    desc: "A JSON Schema defining the structure of input instances. Includes data types, constraints, and units for validation."
                  },
                  {
                    file: "solver.yaml",
                    desc: "Solver configuration specifying which solver to use, backend settings, time limits, and other parameters."
                  },
                  {
                    file: "evaluate.py",
                    desc: "Evaluation logic to check solution feasibility, compute objective values, and report metrics."
                  },
                  {
                    file: "decision_card.md",
                    desc: "Human-readable documentation covering assumptions, constraints, citations, and licensing."
                  },
                ].map(({ file, desc }) => (
                  <div key={file} className="flex gap-3 p-4 border border-border rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{file}</code>
                      <p className="text-sm text-muted-foreground mt-2">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Why Reproducibility Matters</h2>
              <p className="text-muted-foreground mb-4">
                Optimization models are notoriously difficult to reproduce. Small differences in solver 
                versions, parameter settings, random seeds, or input formats can lead to different results. 
                This makes it hard to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Compare models objectively</li>
                <li>Debug unexpected behavior</li>
                <li>Share work with collaborators</li>
                <li>Deploy models reliably</li>
              </ul>
              <p className="text-muted-foreground">
                Rastion addresses this by enforcing a standard structure. When you package a model as a DMP, 
                anyone can run it with the CLI and expect consistent, auditable results. The execution 
                contract—inputs, solver, evaluation—is explicit and versioned.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Package Structure</h2>
              <CodeBlock
                code={`my-optimization-model/
├── model.py              # Optimization model
├── instance_schema.json  # Input data contract
├── solver.yaml           # Solver configuration
├── evaluate.py           # Solution evaluation
├── decision_card.md      # Documentation
└── instance.json         # Example instance (optional)`}
              />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Execution Contract</h2>
              <p className="text-muted-foreground mb-4">
                When you run <code className="bg-muted px-1.5 py-0.5 rounded">decisionhub run</code>, the CLI:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Validates the instance against <code className="bg-muted px-1.5 py-0.5 rounded">instance_schema.json</code></li>
                <li>Loads solver configuration from <code className="bg-muted px-1.5 py-0.5 rounded">solver.yaml</code></li>
                <li>Executes the model in <code className="bg-muted px-1.5 py-0.5 rounded">model.py</code></li>
                <li>Evaluates the solution using <code className="bg-muted px-1.5 py-0.5 rounded">evaluate.py</code></li>
                <li>Outputs structured JSON with status, objective, runtime, and metadata</li>
              </ol>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Concept;
