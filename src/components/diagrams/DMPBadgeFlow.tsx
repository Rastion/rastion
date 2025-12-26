import { Package, CheckCircle2, Award } from "lucide-react";
import {
  DiagramBlock,
  DiagramArrow,
  DiagramTitle,
  DiagramContainer,
} from "./DiagramStyles";

const DMPBadgeFlow = () => {
  return (
    <DiagramContainer>
      <DiagramTitle>Claiming DMP v0.1 Compliance</DiagramTitle>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <DiagramBlock
          label="Decision Model Package"
          subtext="Author-created"
          icon={<Package className="h-4 w-4" />}
          className="w-48"
        />

        <DiagramArrow direction="right" />

        {/* Self-Check Gate */}
        <div className="border border-dashed border-border rounded-md p-4 bg-muted/50 w-56">
          <div className="flex items-center justify-center mb-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium font-mono text-center mb-3">DMP v0.1 Requirements</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-1">
              <span className="text-foreground">✓</span> Required files present
            </p>
            <p className="flex items-center gap-1">
              <span className="text-foreground">✓</span> Schema-valid inputs
            </p>
            <p className="flex items-center gap-1">
              <span className="text-foreground">✓</span> Required entry points
            </p>
            <p className="flex items-center gap-1">
              <span className="text-foreground">✓</span> Stable output fields
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic text-center">
            No registry. No approval.
          </p>
        </div>

        <DiagramArrow direction="right" />

        <DiagramBlock
          label="DMP v0.1 Badge"
          subtext="Executable & auditable"
          annotation="Self-declared, explicitly scoped"
          icon={<Award className="h-4 w-4" />}
          className="w-48"
        />
      </div>
    </DiagramContainer>
  );
};

export default DMPBadgeFlow;
