import { Package, FlaskConical, AlertTriangle, FileText } from "lucide-react";
import {
  DiagramBlock,
  DiagramArrow,
  DiagramLoopArrow,
  DiagramTitle,
  DiagramContainer,
} from "./DiagramStyles";

const BreakRastionChallenge = () => {
  return (
    <DiagramContainer>
      <DiagramTitle>Break Rastion Challenge</DiagramTitle>
      
      <div className="flex flex-col items-center max-w-sm mx-auto">
        <DiagramBlock
          label="Published DMP v0.1"
          icon={<Package className="h-4 w-4" />}
          className="w-full"
        />

        <DiagramArrow />

        <DiagramBlock
          label="Adversarial Tests"
          subtext={"Run elsewhere\nDifferent environment\nDifferent assumptions"}
          annotation="Third-party execution"
          variant="gate"
          icon={<FlaskConical className="h-4 w-4" />}
          className="w-full"
        />

        <DiagramArrow />

        <DiagramBlock
          label="Observed Failure"
          subtext={"Unexpected result\nAmbiguity\nNon-determinism"}
          annotation="Treated as contract bugs"
          variant="muted"
          icon={<AlertTriangle className="h-4 w-4" />}
          className="w-full"
        />

        <DiagramArrow />

        <DiagramBlock
          label="Contract Clarified"
          subtext={"Spec clarified\nDocs updated"}
          annotation="Core remains frozen"
          icon={<FileText className="h-4 w-4" />}
          className="w-full"
        />

        <DiagramLoopArrow />

        <p className="text-xs text-muted-foreground italic text-center mt-2">
          Failures improve the contract—not punish users.
        </p>
      </div>
    </DiagramContainer>
  );
};

export default BreakRastionChallenge;
