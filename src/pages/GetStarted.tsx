import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GetStarted = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Install Rastion and run your first Decision Model Package.
            </p>

            <div className="space-y-8">
              {/* Installation */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Installation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Install Rastion via pip:
                  </p>
                  <CodeBlock code="pip install rastion" />
                  <p className="text-sm text-muted-foreground">
                    Or, for development with examples:
                  </p>
                  <CodeBlock 
                    code={`git clone https://github.com/Rastion/rastion.git
cd rastion
pip install -e .`}
                  />
                  <p className="text-sm text-muted-foreground">
                    Requires Python 3.10+
                  </p>
                </CardContent>
              </Card>

              {/* Quick Start */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Run an Example</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Run the included Knapsack example with the <code className="bg-muted px-1.5 py-0.5 rounded">decisionhub</code> CLI:
                  </p>
                  <CodeBlock 
                    code={`decisionhub run core/rastion/decision_model_package/examples/knapsack_basic \\
  --instance core/rastion/decision_model_package/examples/knapsack_basic/instance.json`}
                  />
                </CardContent>
              </Card>

              {/* Output Format */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Output Format</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <code className="bg-muted px-1.5 py-0.5 rounded">decisionhub run</code> emits a structured JSON document with consistent fields:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <code className="bg-muted px-1 py-0.5 rounded">status</code> and <code className="bg-muted px-1 py-0.5 rounded">feasible</code> — solution feasibility</li>
                    <li>• <code className="bg-muted px-1 py-0.5 rounded">objective</code> and <code className="bg-muted px-1 py-0.5 rounded">runtime_seconds</code> — performance metrics</li>
                    <li>• <code className="bg-muted px-1 py-0.5 rounded">metadata</code> — solver and evaluation details</li>
                  </ul>
                </CardContent>
              </Card>

              {/* CLI Commands */}
              <Card>
                <CardHeader>
                  <CardTitle>4. CLI Commands</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">decisionhub run</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Run a decision model package on a specific instance.
                    </p>
                    <CodeBlock code="decisionhub run <package_path> --instance <instance_path>" />
                  </div>
                </CardContent>
              </Card>

              {/* Package Format */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Package Format</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    A Decision Model Package (DMP v0.1) requires these files:
                  </p>
                  <CodeBlock
                    code={`my-model/
├── model.py              # Optimization model
├── instance_schema.json  # Input data contract
├── solver.yaml           # Solver configuration
├── evaluate.py           # Solution evaluation
└── decision_card.md      # Documentation`}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetStarted;
