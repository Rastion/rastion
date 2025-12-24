import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { BenchmarkResult } from "@/data/packages";

interface BenchmarkTableProps {
  benchmarks: BenchmarkResult[];
}

const BenchmarkTable = ({ benchmarks }: BenchmarkTableProps) => {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Instance</TableHead>
            <TableHead className="font-semibold">Feasible</TableHead>
            <TableHead className="font-semibold text-right">Objective</TableHead>
            <TableHead className="font-semibold text-right">Runtime (s)</TableHead>
            <TableHead className="font-semibold">Solver</TableHead>
            <TableHead className="font-semibold text-right">Gap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {benchmarks.map((result, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono text-sm">{result.instance}</TableCell>
              <TableCell>
                {result.feasible ? (
                  <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                    <Check className="h-3 w-3 mr-1" />
                    Yes
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10">
                    <X className="h-3 w-3 mr-1" />
                    No
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right font-mono">
                {result.objective?.toFixed(2) ?? "—"}
              </TableCell>
              <TableCell className="text-right font-mono">
                {result.runtime.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{result.solver}</Badge>
              </TableCell>
              <TableCell className="text-right font-mono">
                {result.gap !== undefined ? `${(result.gap * 100).toFixed(1)}%` : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BenchmarkTable;