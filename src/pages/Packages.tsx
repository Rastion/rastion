import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PackageCard from "@/components/packages/PackageCard";
import { packages, problemClasses, backends, solvers } from "@/data/packages";
import { Search, SlidersHorizontal, X } from "lucide-react";

const Packages = () => {
  const [search, setSearch] = useState("");
  const [problemClass, setProblemClass] = useState<string>("all");
  const [backend, setBackend] = useState<string>("all");
  const [solver, setSolver] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch =
        search === "" ||
        pkg.name.toLowerCase().includes(search.toLowerCase()) ||
        pkg.description.toLowerCase().includes(search.toLowerCase()) ||
        pkg.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesProblemClass =
        problemClass === "all" || pkg.problemClass === problemClass;

      const matchesBackend =
        backend === "all" || pkg.backend === backend;

      const matchesSolver =
        solver === "all" || pkg.solver === solver;

      return matchesSearch && matchesProblemClass && matchesBackend && matchesSolver;
    });
  }, [search, problemClass, backend, solver]);

  const hasActiveFilters =
    problemClass !== "all" || backend !== "all" || solver !== "all";

  const clearFilters = () => {
    setProblemClass("all");
    setBackend("all");
    setSolver("all");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Decision Packages</h1>
            <p className="text-lg text-muted-foreground">
              Browse and discover optimization models from the community.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search packages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 justify-center">
                    !
                  </Badge>
                )}
              </Button>
            </div>

            {/* Filter Row */}
            {showFilters && (
              <div className="flex flex-wrap gap-3 p-4 rounded-lg border border-border bg-card animate-fade-in">
                <Select value={problemClass} onValueChange={setProblemClass}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Problem Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {problemClasses.map((pc) => (
                      <SelectItem key={pc} value={pc}>
                        {pc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={backend} onValueChange={setBackend}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Backend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Backends</SelectItem>
                    {backends.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={solver} onValueChange={setSolver}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Solver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Solvers</SelectItem>
                    {solvers.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredPackages.length} package{filteredPackages.length !== 1 ? "s" : ""} found
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No packages found matching your criteria.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Packages;