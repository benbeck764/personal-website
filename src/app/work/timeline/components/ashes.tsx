"use client";

import { useEffect, useState } from "react";

type AshParticle = {
  id: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
};

export const Ashes = () => {
  const [particles, setParticles] = useState<AshParticle[]>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const count = Math.floor(Math.random() * 4) + 12;
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: `ash-${i}-${Date.now()}`,
      x: Math.random() * 60 - 30, // Spread -30px to +30px from center
      delay: Math.random() * 3, // 0-3s delay
      duration: Math.random() * 2 + 3, // 3-5s duration
      size: Math.random() * 3 + 2, // 2-5px size
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="-bottom-5 -translate-x-1/2 pointer-events-none absolute left-5.5 h-25 w-40 md:left-5">
      {/* Ash pile base */}
      <div className="-translate-x-1/2 absolute bottom-0 left-1/2">
        <svg
          width="160"
          height="40"
          viewBox="0 0 160 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="ash-pile-title"
        >
          <title id="ash-pile-title">Smoldering ash pile</title>
          {/* Ash pile shape - layered ellipses with darker gray colors */}
          <ellipse
            cx="80"
            cy="32"
            rx="72"
            ry="8"
            fill="#3a3a3a"
            opacity="0.8"
          />
          <ellipse
            cx="80"
            cy="27"
            rx="60"
            ry="6"
            fill="#444444"
            opacity="0.85"
          />
          <ellipse
            cx="80"
            cy="22"
            rx="48"
            ry="5"
            fill="#4a4a4a"
            opacity="0.9"
          />
          <ellipse
            cx="80"
            cy="18"
            rx="36"
            ry="4"
            fill="#505050"
            opacity="0.95"
          />
          {/* Add some texture/detail */}
          <ellipse cx="80" cy="15" rx="24" ry="3" fill="#555555" opacity="1" />
        </svg>
      </div>

      {/* Floating ash particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bottom-2 left-1/2 rounded-full bg-accent-ember"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: "0 0 4px rgba(var(--accent-rgb), 0.6)",
            animation: `ash-float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            // @ts-expect-error - CSS custom properties
            "--ash-x": `${particle.x}px`,
          }}
        />
      ))}

      {/* Subtle glow at base */}
      <div
        className="-translate-x-1/2 absolute bottom-0 left-1/2 h-8 w-8 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)",
          animation: "ash-glow 3s ease-in-out infinite",
        }}
      />
    </div>
  );
};
