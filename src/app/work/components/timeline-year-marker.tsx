import { cn } from "@/lib/utils";

type TimelineYearMarkerProps = {
  year: number;
  className?: string;
};

export const TimelineYearMarker = ({
  year,
  className,
}: TimelineYearMarkerProps) => {
  return (
    <div
      className={cn(
        "font-medium text-foreground/50 text-sm tabular-nums",
        className,
      )}
    >
      {year}
    </div>
  );
};
