import SiteLayout from "@/components/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeBlock from "@/components/ui/CodeBlock";
import { ExternalLink } from "lucide-react";
import DmpBadge from "@/components/DmpBadge";

const CreateDmp = () => {
  return (
    <SiteLayout>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">How to Create a DMP</h1>
          <p className="text-muted-foreground max-w-2xl">
            Minimal, procedural steps grounded in the current repository tooling.
          </p>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Step 1 — Scaffold</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeBlock code="./scripts/new_dmp.sh <target_dir> <problem_class> <package_name>" />
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Creates a valid DMP skeleton.</li>
                <li>No internal knowledge required.</li>
              </ul>
              <a
                href="https://github.com/Rastion/rastion/blob/main/docs/create-your-first-dmp.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                Read create-your-first-dmp.md <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Step 2 — Implement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Define the instance schema.</li>
                <li>Implement create_model and solve.</li>
                <li>Add evaluate and check_feasibility.</li>
                <li>Write decision_card.md.</li>
              </ul>
              <a
                href="https://github.com/Rastion/rastion/blob/main/docs/authoring_a_dmp.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                Read authoring_a_dmp.md <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Step 3 — Validate &amp; Run</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeBlock code="python validate_dmp.py <dmp>\ndecisionhub run-all <dmp> --instances <instances_dir> --output <out_dir>" />
              <div className="text-xs text-muted-foreground">
                Fallback runner:
              </div>
              <CodeBlock code="PYTHONPATH=core python -m rastion.cli run-all <dmp> --instances <instances_dir> --output <out_dir>" />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Step 4 — Claim the Badge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DmpBadge />
                <span>Badge is self-declared.</span>
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Requires passing validation and execution under v0.1.</li>
                <li>No submission or approval process.</li>
              </ul>
              <a
                href="https://github.com/Rastion/rastion/blob/main/docs/DMP_BADGE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                Read DMP_BADGE.md <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </section>
      </main>
    </SiteLayout>
  );
};

export default CreateDmp;
