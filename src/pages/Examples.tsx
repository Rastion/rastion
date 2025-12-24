import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";

const Examples = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Included Examples
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Rastion ships with example Decision Model Packages to demonstrate the format and execution flow.
            </p>

            {/* VRPTW */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                VRPTW (Vehicle Routing Problem with Time Windows)
              </h2>
              <p className="text-muted-foreground mb-4">
                The Vehicle Routing Problem with Time Windows is a classic combinatorial optimization 
                problem. Given a fleet of vehicles and a set of customers with delivery demands and 
                time windows, the goal is to find routes that minimize total travel distance while 
                satisfying all constraints.
              </p>
              <p className="text-muted-foreground mb-4">
                The included example uses OR-Tools as the solver backend.
              </p>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Location</h3>
                <CodeBlock 
                  code="core/rastion/decision_model_package/examples/vrptw_or_tools_basic" 
                />
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Run command</h3>
                <CodeBlock 
                  code={`decisionhub run core/rastion/decision_model_package/examples/vrptw_or_tools_basic \\
  --instance core/rastion/decision_model_package/examples/vrptw_or_tools_basic/instance.json`}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Key files</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">model.py</code> — OR-Tools CP-SAT model for VRPTW</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">instance.json</code> — Sample instance with locations, time windows, and demands</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">solver.yaml</code> — Solver configuration</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">evaluate.py</code> — Feasibility and objective evaluation</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">decision_card.md</code> — Problem description and assumptions</li>
                </ul>
              </div>
            </section>

            {/* Knapsack */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Knapsack
              </h2>
              <p className="text-muted-foreground mb-4">
                The 0/1 Knapsack Problem is a fundamental selection problem. Given a set of items, 
                each with a weight and value, and a knapsack with a weight capacity, the goal is to 
                select items that maximize total value without exceeding the capacity.
              </p>
              <p className="text-muted-foreground mb-4">
                The included example uses OR-Tools.
              </p>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Location</h3>
                <CodeBlock 
                  code="core/rastion/decision_model_package/examples/knapsack_basic" 
                />
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Run command</h3>
                <CodeBlock 
                  code={`decisionhub run core/rastion/decision_model_package/examples/knapsack_basic \\
  --instance core/rastion/decision_model_package/examples/knapsack_basic/instance.json`}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Key files</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">model.py</code> — Knapsack solver using OR-Tools</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">instance.json</code> — Sample items with weights and values</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">solver.yaml</code> — Solver configuration</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">evaluate.py</code> — Solution evaluation</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">decision_card.md</code> — Problem description</li>
                </ul>
              </div>
            </section>

            {/* Running Examples */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Running the Examples
              </h2>
              <p className="text-muted-foreground mb-4">
                After installing Rastion, you can run the examples directly from the repository:
              </p>
              <CodeBlock
                code={`# Clone the repository
git clone https://github.com/Rastion/rastion.git
cd rastion

# Install in development mode
pip install -e .

# Run the knapsack example
decisionhub run core/rastion/decision_model_package/examples/knapsack_basic \\
  --instance core/rastion/decision_model_package/examples/knapsack_basic/instance.json`}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Examples;
