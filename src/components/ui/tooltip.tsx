"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TooltipProps = PropsWithChildren<{
  content: ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  delay?: number;
  closeDelay?: number;
}>;

export const Tooltip = ({
  content,
  children,
  className,
  side = "top",
  sideOffset = 8,
  delay = 200,
  closeDelay = 0,
}: TooltipProps) => {
  return (
    <BaseTooltip.Provider delay={delay} closeDelay={closeDelay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={<span />}>{children}</BaseTooltip.Trigger>
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side={side}
            sideOffset={sideOffset}
            className="z-50"
          >
            <BaseTooltip.Popup
              className={cn(
                "rounded-md bg-surface px-3 py-1.5 font-medium text-foreground text-sm shadow-lg ring-1 ring-border",
                "fade-in-0 zoom-in-95 animate-in",
                "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out",
                className,
              )}
            >
              {content}
              <BaseTooltip.Arrow
                className="fill-surface"
                style={{
                  filter: "drop-shadow(0 -1px 0 var(--border))",
                }}
              />
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
};
