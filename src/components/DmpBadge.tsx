import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DMP_BADGE_TOOLTIP } from "@/lib/dmp-examples";

type DmpBadgeProps = {
  className?: string;
};

const DmpBadge = ({ className }: DmpBadgeProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[0.7rem] font-mono uppercase tracking-wide text-muted-foreground",
            className,
          )}
        >
          DMP v0.1
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">
        {DMP_BADGE_TOOLTIP}
      </TooltipContent>
    </Tooltip>
  );
};

export default DmpBadge;
