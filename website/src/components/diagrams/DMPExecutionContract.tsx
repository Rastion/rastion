import { FileJson, FileCode, Settings, Play, FileText } from "lucide-react";
import {
  DiagramBlock,
  DiagramArrow,
  DiagramTitle,
  DiagramContainer,
} from "./DiagramStyles";

const DMPExecutionContract = () => {
  return (
    <DiagramContainer>
      <DiagramTitle>DMP Execution Contract</DiagramTitle>
      
      <div className="flex flex-col items-center max-w-md mx-auto">
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <DiagramBlock
            label="Decision Model Package"
            subtext="model.py · evaluate.py · solver.yaml"
            icon={<FileCode className="h-4 w-4" />}
          />
          <DiagramBlock
            label="Instance"
            subtext="Valid against instance_schema.json"
            icon={<FileJson className="h-4 w-4" />}
          />
        </div>

        <DiagramArrow />

        {/* Runner */}
        <DiagramBlock
          label="decisionhub run"
          subtext="Reference runner"
          variant="highlight"
          icon={<Play className="h-4 w-4" />}
          className="w-full"
        />

        <DiagramArrow />

        {/* Execution Steps */}
        <div className="w-full border border-dashed border-border rounded-md p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-wide">Execution Sequence</p>
          <div className="space-y-2 font-mono text-xs text-center">
            <p>1. validate(package)</p>
            <p>2. create_model(instance)</p>
            <p>3. solve(model)</p>
            <p>4. evaluate(solution)</p>
          </div>
        </div>

        <DiagramArrow />

        {/* Output */}
        <DiagramBlock
          label="Structured JSON Output"
          icon={<FileText className="h-4 w-4" />}
          variant="default"
          className="w-full"
        >
          <div className="mt-2 text-xs font-mono text-muted-foreground text-left bg-background border border-border rounded p-2">
            <p>status: "feasible" | "infeasible" | "error"</p>
            <p>feasible: boolean</p>
            <p>objective: number</p>
            <p>runtime_seconds: number</p>
            <p>solution: {"{...}"}</p>
          </div>
        </DiagramBlock>

        {/* Boundary annotation */}
        <div className="mt-4 pt-4 border-t border-border w-full text-center">
          <p className="text-xs text-muted-foreground italic">
            Rastion defines the contract. You define the model.
          </p>
        </div>
      </div>
    </DiagramContainer>
  );
};

export default DMPExecutionContract;
