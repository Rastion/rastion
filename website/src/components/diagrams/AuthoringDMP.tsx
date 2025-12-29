import { Lightbulb, FileJson, FileCode, CheckSquare, BookOpen, Terminal } from "lucide-react";
import {
  DiagramBlock,
  DiagramArrow,
  DiagramTitle,
  DiagramContainer,
} from "./DiagramStyles";

const AuthoringDMP = () => {
  return (
    <DiagramContainer>
      <DiagramTitle>Authoring a Decision Model Package</DiagramTitle>
      
      <div className="flex flex-col items-center max-w-sm mx-auto">
        <DiagramBlock
          label="Decision / Optimization Problem"
          subtext="Your modeling choices"
          icon={<Lightbulb className="h-4 w-4" />}
        />

        <DiagramArrow />

        <DiagramBlock
          label="instance_schema.json"
          subtext="Valid inputs, explicitly defined"
          icon={<FileJson className="h-4 w-4" />}
        />

        <DiagramArrow />

        <DiagramBlock
          label="model.py"
          subtext={"create_model()\nsolve()"}
          annotation="Any solver, any technique"
          icon={<FileCode className="h-4 w-4" />}
        />

        <DiagramArrow />

        <DiagramBlock
          label="evaluate.py"
          subtext={"check_feasibility()\nevaluate()"}
          annotation="Feasibility & metrics are explicit"
          icon={<CheckSquare className="h-4 w-4" />}
        />

        <DiagramArrow />

        <DiagramBlock
          label="decision_card.md"
          subtext="Human-readable context"
          annotation="Assumptions · intent · metadata"
          icon={<BookOpen className="h-4 w-4" />}
        />

        <DiagramArrow />

        <DiagramBlock
          label="decisionhub validate / run"
          subtext="One-command verification"
          variant="highlight"
          icon={<Terminal className="h-4 w-4" />}
        />
      </div>
    </DiagramContainer>
  );
};

export default AuthoringDMP;
