export function PhoenixIconSmall({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Phoenix"
      shapeRendering="geometricPrecision"
    >
      <title>Phoenix</title>
      <defs>
        <linearGradient id="phoenixGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#dc2626", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#ea580c", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* Simplified flame base */}
      <path
        d="M30 85 Q35 70 35 60 Q40 68 45 55 Q50 65 50 50 Q55 65 60 55 Q60 68 65 60 Q65 70 70 85 Z"
        fill="url(#phoenixGrad)"
        opacity="0.6"
      />

      {/* Simplified body */}
      <ellipse cx="50" cy="50" rx="8" ry="16" fill="url(#phoenixGrad)" />

      {/* Wings - simplified */}
      <path
        d="M42 45 Q30 40 20 35 Q25 30 30 30 Q28 25 32 20 Q38 30 42 35 Z"
        fill="url(#phoenixGrad)"
        opacity="0.85"
      />
      <path
        d="M58 45 Q70 40 80 35 Q75 30 70 30 Q72 25 68 20 Q62 30 58 35 Z"
        fill="url(#phoenixGrad)"
        opacity="0.85"
      />

      {/* Head */}
      <circle cx="50" cy="30" r="6" fill="#f59e0b" />

      {/* Eye */}
      <circle cx="48" cy="29" r="1.5" fill="#0a0a0a" />

      {/* Crown feather */}
      <path
        d="M50 24 L50 15"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
