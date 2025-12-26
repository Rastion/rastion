import CodeBlock from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/button";
import { FileText, FolderTree } from "lucide-react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";

const Index = () => {
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
                    Read the specification
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
              <CodeBlock
                code={`pip install rastion
decisionhub run dmp/ --instance instance.json`}
              />
              <p className="text-xs text-muted-foreground font-mono text-center">
                # or
                <br />
                PYTHONPATH=core python -m rastion.cli run dmp/ --instance instance.json
              </p>
              <p className="text-xs text-muted-foreground text-center font-mono">Same input. Same output. Anywhere.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        <section className="space-y-4 max-w-3xl text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">What is a Decision Model Package?</h2>
          <p>
            In Rastion, a Decision Model Package (DMP) is a minimal, versioned bundle that captures a model,
            its data interface, and executable logic under the frozen execution contract.
          </p>
          <p>
            This definition is formalized in the DMP v0.1 specification and enforced by the reference runner.
          </p>
          <Link
            to="/create-a-dmp"
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors"
          >
            → Learn how to create a DMP
          </Link>
        </section>

        {/* How to go deeper */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Learn more</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <Link
              to="/create-a-dmp"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Create a Decision Model Package
            </Link>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/DMP_BADGE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              DMP v0.1 Badge
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/BREAK_RASTION.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Break Rastion Challenge
            </a>
            <a
              href="https://github.com/Rastion/rastion/blob/main/docs/DMP_v0.1.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Specification
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
};

export default Index;
