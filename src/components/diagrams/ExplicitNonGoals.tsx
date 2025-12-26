import { Cpu, Code, Cloud, XCircle } from "lucide-react";
import {
  DiagramTitle,
  DiagramContainer,
} from "./DiagramStyles";

const ExplicitNonGoals = () => {
  return (
    <DiagramContainer>
      <DiagramTitle>Explicit Non-Goals</DiagramTitle>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Not a Solver */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3 text-muted-foreground">
            <div className="relative">
              <Cpu className="h-6 w-6" />
              <XCircle className="h-3 w-3 absolute -top-1 -right-1 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm font-medium font-mono mb-3">Not a Solver</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• No optimization logic</li>
            <li>• No algorithm selection</li>
            <li>• No performance claims</li>
          </ul>
        </div>

        {/* Not a Modeling Language */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3 text-muted-foreground">
            <div className="relative">
              <Code className="h-6 w-6" />
              <XCircle className="h-3 w-3 absolute -top-1 -right-1 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm font-medium font-mono mb-3">Not a Modeling Language</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• No DSL</li>
            <li>• No syntax rules</li>
            <li>• No abstractions imposed</li>
          </ul>
        </div>

        {/* Not a Platform */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3 text-muted-foreground">
            <div className="relative">
              <Cloud className="h-6 w-6" />
              <XCircle className="h-3 w-3 absolute -top-1 -right-1 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm font-medium font-mono mb-3">Not a Platform</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• No accounts</li>
            <li>• No governance</li>
            <li>• No leaderboards</li>
          </ul>
        </div>
      </div>
    </DiagramContainer>
  );
};

export default ExplicitNonGoals;
