import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/ui/CodeBlock";
import BenchmarkTable from "@/components/packages/BenchmarkTable";
import { packages } from "@/data/packages";
import {
  Download,
  Star,
  Calendar,
  Copy,
  Check,
  ArrowLeft,
  FileCode,
  BookOpen,
  BarChart3,
  Settings,
  GitFork,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const PackageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <Link to="/packages">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Packages
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const installCommand = `rastion install ${pkg.slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* Back link */}
          <Link to="/packages" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Link>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold">{pkg.name}</h1>
                <Badge variant="secondary">{pkg.version}</Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {pkg.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>
                  by <span className="text-foreground font-medium">{pkg.author}</span>
                </span>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  {pkg.downloads.toLocaleString()} downloads
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {pkg.stars} stars
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Updated {pkg.lastUpdated}
                </div>
              </div>
            </div>

            <div className="lg:w-80 space-y-4">
              {/* Install card */}
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Install</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-muted px-3 py-2 rounded font-mono">
                      {installCommand}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Meta */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Problem Class</span>
                    <Badge variant="outline">{pkg.problemClass}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Backend</span>
                    <Badge variant="outline">{pkg.backend}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Solver</span>
                    <Badge variant="outline">{pkg.solver}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">License</span>
                    <span className="font-mono">{pkg.license}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="icon">
                  <GitFork className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {pkg.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="decision-card" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 gap-1">
              <TabsTrigger value="decision-card" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Decision Card</span>
              </TabsTrigger>
              <TabsTrigger value="benchmarks" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Benchmarks</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="gap-2">
                <FileCode className="h-4 w-4" />
                <span className="hidden sm:inline">Files</span>
              </TabsTrigger>
              <TabsTrigger value="config" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Config</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="decision-card">
              <Card>
                <CardContent className="p-6 md:p-8 prose prose-neutral dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-sans">
                    {pkg.decisionCard.split('\n').map((line, i) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={i} className="text-2xl font-bold mt-0 mb-4">{line.slice(2)}</h1>;
                      }
                      if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
                      }
                      if (line.startsWith('- ')) {
                        return <li key={i} className="ml-4">{line.slice(2)}</li>;
                      }
                      if (line.startsWith('```')) {
                        return null;
                      }
                      if (line.startsWith('@')) {
                        return <code key={i} className="block bg-muted p-2 rounded text-sm font-mono">{line}</code>;
                      }
                      if (line.trim() === '') {
                        return <br key={i} />;
                      }
                      return <p key={i} className="my-2">{line}</p>;
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benchmarks">
              <Card>
                <CardHeader>
                  <CardTitle>Benchmark Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <BenchmarkTable benchmarks={pkg.benchmarks} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
              <div className="space-y-4">
                {pkg.files.length > 0 ? (
                  pkg.files.map((file) => (
                    <CodeBlock
                      key={file.name}
                      filename={file.name}
                      code={file.content}
                      showLineNumbers
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      File contents not available for this package.
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="config">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Run Command</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`rastion run ${pkg.slug} --instance solomon_c101`}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Benchmark Command</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`rastion benchmark ${pkg.slug} --output results.json`}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Docker Execution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`docker run --rm -v $(pwd)/instances:/data rastion/runner \\
  run ${pkg.slug} --instance /data/my_instance.json`}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PackageDetail;