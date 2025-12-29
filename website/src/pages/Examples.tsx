import SiteLayout from "@/components/SiteLayout";
import DmpBadge from "@/components/DmpBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, FileText, FolderTree } from "lucide-react";
import { dmpExamples } from "@/lib/dmp-examples";

const Examples = () => {
  const ciLink =
    "https://github.com/Rastion/rastion/blob/main/.github/workflows/ci.yml";

  return (
    <SiteLayout>
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Examples & Reference</h1>
          <p className="text-muted-foreground max-w-2xl">
            Auto-generated from the repository. Each entry is derived from its decision_card.md
            and kept in sync with the current examples directory.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold">Anchor Proof (Reference)</h2>
            <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
              Reference DMP (DMP v0.1)
            </span>
          </div>
          <Card className="border-dashed">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Anchor Proof</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    A maintained reference package demonstrating third-party executability and
                    auditability under the frozen DMP v0.1 contract.
                  </p>
                </div>
                <DmpBadge />
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/Rastion/rastion/tree/main/anchor-proof"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <FolderTree className="h-4 w-4" />
                anchor-proof/
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://github.com/Rastion/rastion/blob/main/anchor-proof/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <FileText className="h-4 w-4" />
                Documentation
                <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold">Example DMPs</h2>
            <span className="text-xs text-muted-foreground">
              Auto-discovered from examples
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {dmpExamples.map((example) => {
              const repoDirectory = `https://github.com/Rastion/rastion/tree/main${example.directoryPath}`;
              const decisionCard = `https://github.com/Rastion/rastion/blob/main${example.decisionCardPath}`;

              return (
                <Card key={example.directoryPath} className="flex flex-col">
                  <CardHeader className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <CardTitle className="text-base">{example.name}</CardTitle>
                      <DmpBadge />
                    </div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Problem class: {example.problemClass}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: Validated and executed in CI. See{" "}
                      <a
                        href={ciLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                      >
                        CI workflow
                      </a>
                      .
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <a
                        href={repoDirectory}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        <FolderTree className="h-4 w-4" />
                        GitHub directory
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a
                        href={decisionCard}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        decision_card.md
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
};

export default Examples;
