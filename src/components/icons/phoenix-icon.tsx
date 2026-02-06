export function PhoenixIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Phoenix rising from flames"
    >
      <title>Phoenix rising from flames</title>
      <defs>
        <linearGradient id="fireGrad" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#FF4500", stopOpacity: 1 }} />
          <stop offset="40%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#CC3300", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#FF6600", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FFB800", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* Flames base with animation */}
      <path
        d="M70 180 Q80 150 75 130 Q85 145 90 125 Q95 145 100 120 Q105 140 110 125 Q115 150 120 130 Q125 155 130 180 Z"
        fill="url(#fireGrad)"
        opacity="0.5"
      >
        <animate
          attributeName="d"
          dur="2s"
          repeatCount="indefinite"
          values="M70 180 Q80 150 75 130 Q85 145 90 125 Q95 145 100 120 Q105 140 110 125 Q115 150 120 130 Q125 155 130 180 Z;
                  M70 180 Q78 148 73 125 Q87 142 92 120 Q96 140 100 115 Q104 138 112 122 Q117 148 122 128 Q126 152 130 180 Z;
                  M70 180 Q80 150 75 130 Q85 145 90 125 Q95 145 100 120 Q105 140 110 125 Q115 150 120 130 Q125 155 130 180 Z"
        />
      </path>

      {/* Body */}
      <path
        d="M100 160 Q85 130 80 100 Q78 80 85 65 Q90 55 100 50 Q110 55 115 65 Q122 80 120 100 Q115 130 100 160 Z"
        fill="url(#bodyGrad)"
        opacity="0.9"
      />

      {/* Left wing */}
      <path
        d="M80 100 Q60 85 35 75 Q45 60 55 55 Q50 45 60 35 Q70 50 78 55 Q72 65 80 80 Z"
        fill="url(#bodyGrad)"
        opacity="0.8"
      />

      {/* Right wing */}
      <path
        d="M120 100 Q140 85 165 75 Q155 60 145 55 Q150 45 140 35 Q130 50 122 55 Q128 65 120 80 Z"
        fill="url(#bodyGrad)"
        opacity="0.8"
      />

      {/* Head */}
      <ellipse cx="100" cy="48" rx="12" ry="14" fill="#FFB800" />

      {/* Eye */}
      <circle cx="96" cy="45" r="2.5" fill="#0a0a0a" />
      <circle cx="96" cy="44.5" r="0.8" fill="#fff" />

      {/* Beak */}
      <path d="M108 47 L116 49 L108 51 Z" fill="#FF6600" />

      {/* Crown feathers */}
      <path
        d="M95 35 Q92 22 88 15"
        stroke="#FFD700"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M100 34 Q100 20 100 10"
        stroke="#FFB800"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M105 35 Q108 22 112 15"
        stroke="#FF8C00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tail feathers */}
      <path
        d="M95 155 Q80 170 65 185"
        stroke="url(#fireGrad)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M100 160 Q100 175 100 192"
        stroke="url(#fireGrad)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M105 155 Q120 170 135 185"
        stroke="url(#fireGrad)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
