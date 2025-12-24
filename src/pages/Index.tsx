import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";
import { 
  Terminal, 
  Github,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="container relative py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 animate-fade-in">
                Rastion
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in">
                A Python CLI for running Decision Model Packages.
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
                Rastion provides a reproducible execution contract for optimization and decision models. 
                Package your model code, inputs, solver configuration, and evaluation logic—then run it consistently anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
                <a
                  href="https://github.com/Rastion/rastion"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <Link to="/get-started">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                    <Terminal className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* CLI Demo */}
            <div className="mt-16 max-w-3xl mx-auto animate-fade-in-up">
              <CodeBlock
                filename="terminal"
                code={`$ decisionhub run core/rastion/decision_model_package/examples/knapsack_basic \\
    --instance core/rastion/decision_model_package/examples/knapsack_basic/instance.json

✓ Loading instance...
✓ Solver: OR-Tools
✓ Status: Feasible
✓ Objective: 220
✓ Runtime: 0.02s`}
              />
            </div>
          </div>
        </section>

        {/* What is a Decision Model Package? */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                What is a Decision Model Package?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                A Decision Model Package (DMP v0.1) is a self-contained directory that bundles an 
                optimization model with its input schema, solver configuration, and evaluation logic. 
                It defines the minimum files and entry points needed to validate and run a model end-to-end.
              </p>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Required files in a DMP v0.1 package:</h3>
                <ul className="space-y-3">
                  {[
                    { file: "model.py", desc: "Optimization model implementation" },
                    { file: "instance_schema.json", desc: "Data contract with units" },
                    { file: "solver.yaml", desc: "Solver and parameter configuration" },
                    { file: "evaluate.py", desc: "Feasibility, objective, and runtime checks" },
                    { file: "decision_card.md", desc: "Assumptions, constraints, and license" },
                  ].map(({ file, desc }) => (
                    <li key={file} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{file}</code>
                        <span className="text-muted-foreground ml-2">— {desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="text-lg font-semibold mb-4">Why reproducible execution matters</h3>
              <p className="text-muted-foreground">
                Optimization models are notoriously hard to reproduce. Solver versions, parameter settings, 
                and input formats all affect results. Rastion enforces a standard structure so that anyone 
                can run your model and get consistent, auditable outcomes—whether for benchmarking, 
                collaboration, or deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Output Format */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Output Format
              </h2>
              <p className="text-muted-foreground mb-6">
                <code className="bg-muted px-1.5 py-0.5 rounded">decisionhub run</code> emits a structured JSON document with consistent fields:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• <code className="bg-muted px-1.5 py-0.5 rounded">status</code> and <code className="bg-muted px-1.5 py-0.5 rounded">feasible</code> to indicate solution feasibility</li>
                <li>• <code className="bg-muted px-1.5 py-0.5 rounded">objective</code> and <code className="bg-muted px-1.5 py-0.5 rounded">runtime_seconds</code> for performance metrics</li>
                <li>• <code className="bg-muted px-1.5 py-0.5 rounded">metadata</code> for solver and evaluation details (including timings and solver-reported metrics)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Included Examples */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Included Examples
              </h2>
              <p className="text-muted-foreground mb-6">
                Rastion ships with example Decision Model Packages to help you get started:
              </p>
              
              <div className="space-y-6">
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-semibold mb-2">VRPTW (Vehicle Routing Problem with Time Windows)</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    A classic routing problem that schedules vehicle routes to serve customers within time windows.
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    core/rastion/decision_model_package/examples/vrptw_or_tools_basic
                  </code>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-semibold mb-2">Knapsack</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    A selection problem: choose items to maximize value while staying within a weight limit.
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    core/rastion/decision_model_package/examples/knapsack_basic
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Status */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Project Status
              </h2>
              <p className="text-muted-foreground mb-6">
                Rastion v0.1.0. The Decision Model Package (DMP v0.1) execution contract is frozen; 
                new features will be additive.
              </p>
              <p className="text-sm text-muted-foreground">
                License: Apache-2.0
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
