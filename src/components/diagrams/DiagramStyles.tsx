import { cn } from "@/lib/utils";

// Shared diagram components for consistent visual language

interface DiagramBlockProps {
  label: string;
  subtext?: string;
  annotation?: string;
  variant?: "default" | "gate" | "muted" | "highlight";
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const DiagramBlock = ({
  label,
  subtext,
  annotation,
  variant = "default",
  icon,
  className,
  children,
}: DiagramBlockProps) => {
  const variants = {
    default: "bg-background border-border",
    gate: "bg-muted border-border border-dashed",
    muted: "bg-muted/50 border-border/50",
    highlight: "bg-background border-foreground border-2",
  };

  return (
    <div
      className={cn(
        "border rounded-md px-4 py-3 text-center",
        variants[variant],
        className
      )}
    >
      {icon && <div className="mb-2 flex justify-center text-muted-foreground">{icon}</div>}
      <p className="text-sm font-medium font-mono">{label}</p>
      {subtext && (
        <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{subtext}</p>
      )}
      {children}
      {annotation && (
        <p className="text-xs text-muted-foreground mt-2 italic">{annotation}</p>
      )}
    </div>
  );
};

export const DiagramArrow = ({ direction = "down" }: { direction?: "down" | "right" }) => {
  if (direction === "right") {
    return (
      <div className="flex items-center justify-center px-2">
        <span className="text-muted-foreground text-lg">→</span>
      </div>
    );
  }
  return (
    <div className="flex justify-center py-2">
      <span className="text-muted-foreground text-lg">↓</span>
    </div>
  );
};

export const DiagramLoopArrow = () => (
  <div className="flex justify-center py-2">
    <span className="text-muted-foreground text-lg">↺</span>
  </div>
);

export const DiagramTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center uppercase tracking-wide">
    {children}
  </h3>
);

export const DiagramContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("p-6 bg-muted/30 border border-border rounded-lg", className)}>
    {children}
  </div>
);
