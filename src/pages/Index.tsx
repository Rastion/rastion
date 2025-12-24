import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";
import PackageCard from "@/components/packages/PackageCard";
import { packages } from "@/data/packages";
import { 
  Package, 
  Terminal, 
  Box,
  GitBranch, 
  Gauge, 
  FileCode,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Layers
} from "lucide-react";

const Index = () => {
  const featuredPackages = packages.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="container relative py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Now in Public Beta
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
                The Open Platform for{" "}
                <span className="text-gradient">Decision Models</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
                Reproducible, benchmarkable, and portable optimization packages. 
                Share your decision models like you share code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
                <Link to="/packages">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <Package className="h-4 w-4" />
                    Explore Packages
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2">
                  <Terminal className="h-4 w-4" />
                  pip install rastion
                </Button>
              </div>
            </div>

            {/* CLI Demo */}
            <div className="mt-16 max-w-3xl mx-auto animate-fade-in-up">
              <CodeBlock
                filename="terminal"
                code={`$ rastion init my-vrptw-model
✓ Created decision model package

$ rastion run vrptw-ortools-basic --instance solomon_c101
✓ Loading instance: solomon_c101
✓ Solver: CP-SAT (OR-Tools)
✓ Objective: 828.94
✓ Runtime: 1.24s
✓ Status: Feasible

$ rastion benchmark vrptw-ortools-basic
Running 5 instances...
┌────────────────┬──────────┬───────────┬──────────┐
│ Instance       │ Feasible │ Objective │ Runtime  │
├────────────────┼──────────┼───────────┼──────────┤
│ solomon_c101   │ ✓        │ 828.94    │ 1.24s    │
│ solomon_c102   │ ✓        │ 828.94    │ 3.45s    │
│ solomon_r101   │ ✓        │ 1650.80   │ 2.18s    │
└────────────────┴──────────┴───────────┴──────────┘`}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built for Operations Research
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build, share, and benchmark decision models.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Standard Package Format</h3>
                  <p className="text-muted-foreground">
                    A consistent structure for models, instances, solvers, and evaluation—making sharing and reuse simple.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <GitBranch className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Reproducible Execution</h3>
                  <p className="text-muted-foreground">
                    Docker-based runners with pinned dependencies ensure your results are reproducible across environments.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
                    <Gauge className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Automated Benchmarking</h3>
                  <p className="text-muted-foreground">
                    Run your models against standard benchmark instances and compare results objectively.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                    <FileCode className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Multiple Backends</h3>
                  <p className="text-muted-foreground">
                    Support for OR-Tools, Pyomo, and more. Use open-source solvers like HiGHS and CBC.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Decision Cards</h3>
                  <p className="text-muted-foreground">
                    Document assumptions, constraints, and licenses clearly—like model cards for optimization.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instance Schemas</h3>
                  <p className="text-muted-foreground">
                    JSON Schema-based data contracts with units and validation for clean, consistent input data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Package Format */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Package Format</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  A Standard for Decision Models
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Every Rastion package follows a consistent structure that makes it easy to understand, use, and extend.
                </p>
                <ul className="space-y-3">
                  {[
                    { file: "model.py", desc: "Optimization model implementation" },
                    { file: "instance_schema.json", desc: "Data contract with units" },
                    { file: "instances/", desc: "Benchmark instances or generators" },
                    { file: "solver.yaml", desc: "Solver configuration" },
                    { file: "evaluate.py", desc: "Feasibility and objective checks" },
                    { file: "decision_card.md", desc: "Documentation and metadata" },
                  ].map(({ file, desc }) => (
                    <li key={file} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                      <code className="text-sm bg-muted px-2 py-1 rounded">{file}</code>
                      <span className="text-muted-foreground">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CodeBlock
                  filename="vrptw-ortools-basic/solver.yaml"
                  showLineNumbers
                  code={`solver:
  name: CP-SAT
  backend: ortools
  version: "9.8"
  
parameters:
  first_solution_strategy: PATH_CHEAPEST_ARC
  local_search_metaheuristic: GUIDED_LOCAL_SEARCH
  time_limit_seconds: 300
  log_search: false
  
output:
  format: json
  include_routes: true
  include_timing: true`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Packages */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Packages</h2>
                <p className="text-muted-foreground">Popular decision model packages from the community.</p>
              </div>
              <Link to="/packages">
                <Button variant="outline" className="gap-2 hidden sm:flex">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link to="/packages">
                <Button variant="outline" className="gap-2">
                  View All Packages
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Share Your Models?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start building reproducible decision model packages today. 
                Join the community and make your optimization work reusable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Link to="/docs">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                    Read the Docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;