"use client";

import { useEffect, useState } from "react";

type Ember = {
  id: string;
  angle: number;
  distance: number;
};

type EmberBurstProps = {
  x: number;
  y: number;
  onComplete?: () => void;
};

export const EmberBurst = ({ x, y, onComplete }: EmberBurstProps) => {
  const [embers] = useState<Ember[]>(() => {
    const count = Math.floor(Math.random() * 5) + 8; // 8-12 embers
    return Array.from({ length: count }, (_, i) => ({
      id: `ember-${i}-${Date.now()}`,
      angle: (360 / count) * i + Math.random() * 30 - 15, // Spread with randomness
      distance: Math.random() * 40 + 40, // 40-80px
    }));
  });

  useEffect(() => {
    // Cleanup after animation completes
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 1500); // Match animation duration

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {embers.map((ember) => {
        const radians = (ember.angle * Math.PI) / 180;
        const deltaX = Math.cos(radians) * ember.distance;
        const deltaY = Math.sin(radians) * ember.distance;

        return (
          <div
            key={ember.id}
            className="absolute h-2 w-2 rounded-full bg-accent-ember"
            style={{
              boxShadow: "0 0 8px rgba(234, 88, 12, 0.8), 0 0 12px rgba(245, 158, 11, 0.4)",
              animation: "ember-burst 1.5s ease-out forwards",
              // @ts-expect-error - CSS custom properties
              "--ember-x": `${deltaX}px`,
              "--ember-y": `${deltaY}px`,
            }}
          />
        );
      })}
    </div>
  );
};
