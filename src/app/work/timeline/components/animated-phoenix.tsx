"use client";

import { useEffect, useRef, useState } from "react";
import { PhoenixIconSmall } from "@/components/icons/phoenix-icon-small";
import { cn } from "@/lib/utils";

type AnimatedPhoenixProps = {
  targetPosition: { x: number; y: number };
  isActive: boolean;
  className?: string;
};

export const AnimatedPhoenix = ({
  targetPosition,
  isActive,
  className,
}: AnimatedPhoenixProps) => {
  const previousPositionRef = useRef(targetPosition);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Calculate rotation based on direction of movement
    const dx = targetPosition.x - previousPositionRef.current.x;
    const dy = targetPosition.y - previousPositionRef.current.y;

    // Calculate angle in degrees (0 = right, 90 = down, -90 = up)
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Add slight rotation for visual interest (limit to ±15 degrees)
    const rotationAdjustment = Math.max(-15, Math.min(15, angle * 0.2));
    setRotation(rotationAdjustment);

    previousPositionRef.current = targetPosition;
  }, [targetPosition]);

  return (
    <div
      className={cn(
        "animated-phoenix pointer-events-none absolute z-20 transition-transform duration-800 ease-in-out",
        isActive && "animate-phoenix-glow",
        className,
      )}
      style={{
        transform: `translate(${targetPosition.x}px, ${targetPosition.y}px) translate(-50%, -50%) rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      <PhoenixIconSmall className="h-16 w-16 drop-shadow-[0_0_20px_rgba(234,88,12,0.6)] md:h-24 md:w-24" />
    </div>
  );
};
