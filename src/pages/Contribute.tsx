import SiteLayout from "@/components/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const Contribute = () => {
  return (
    <SiteLayout>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">How to Contribute</h1>
          <p className="text-muted-foreground max-w-2xl">
            Contributions are evaluated against the frozen DMP v0.1 contract and current CI behavior.
          </p>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contribute a DMP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-1">
                <li>Fork the repository.</li>
                <li>Add a new DMP under core/rastion/decision_model_package/examples/.</li>
                <li>Ensure validate_dmp.py and decisionhub run-all pass.</li>
                <li>Open a pull request.</li>
              </ul>
              <p className="text-sm text-foreground">
                PRs that modify the frozen DMP v0.1 contract will not be accepted.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Break Rastion Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-1">
                <li>Goal: find ambiguities or failures in reproducibility.</li>
                <li>Failures are treated as contract bugs.</li>
              </ul>
              <a
                href="https://github.com/Rastion/rastion/blob/main/docs/BREAK_RASTION.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                Read BREAK_RASTION.md <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What Contributions Are Welcome</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-1">
                <li>New DMPs.</li>
                <li>Better documentation.</li>
                <li>Reproducibility reports.</li>
                <li>Contract clarifications (without breaking v0.1).</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </SiteLayout>
  );
};

export default Contribute;
