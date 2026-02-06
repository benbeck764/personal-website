export function PhoenixIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Phoenix rising from flames"
      shapeRendering="geometricPrecision"
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
        <linearGradient id="wingGradL" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#FF6600", stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FFD700", stopOpacity: 0.8 }}
          />
        </linearGradient>
        <linearGradient id="wingGradR" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#FF6600", stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FFD700", stopOpacity: 0.8 }}
          />
        </linearGradient>
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Flame base - wide and fierce */}
      <path
        d="M65 195 Q75 165 68 140 Q80 155 85 135 Q92 155 95 130 Q100 150 105 125 Q108 148 115 130 Q120 152 125 140 Q130 158 135 145 Q140 168 145 195 Z"
        fill="url(#fireGrad)"
        opacity="0.45"
      >
        <animate
          attributeName="d"
          dur="1.8s"
          repeatCount="indefinite"
          values="M65 195 Q75 165 68 140 Q80 155 85 135 Q92 155 95 130 Q100 150 105 125 Q108 148 115 130 Q120 152 125 140 Q130 158 135 145 Q140 168 145 195 Z;
                  M65 195 Q73 162 66 135 Q82 150 87 128 Q93 148 96 122 Q101 145 106 118 Q110 143 117 126 Q122 148 127 136 Q132 155 137 140 Q142 165 145 195 Z;
                  M65 195 Q75 165 68 140 Q80 155 85 135 Q92 155 95 130 Q100 150 105 125 Q108 148 115 130 Q120 152 125 140 Q130 158 135 145 Q140 168 145 195 Z"
        />
      </path>

      {/* Left wing - dramatic, flowing, multi-layered */}
      {/* Wing base layer */}
      <path
        d="M85 108 Q65 98 45 88 Q28 78 15 65 Q8 52 5 38 Q3 25 8 15 Q20 20 28 28 Q22 18 25 8 Q35 12 42 20 Q40 10 48 5 Q55 15 58 25 Q62 12 70 8 Q75 20 78 32 Q80 42 82 52 Q84 68 85 85 Z"
        fill="url(#wingGradL)"
        opacity="0.95"
        filter="url(#innerGlow)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 85 108;-4 85 108;0 85 108"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </path>
      {/* Wing mid layer - individual feathers */}
      <path
        d="M82 90 Q62 82 42 72 Q25 62 12 48 Q18 58 28 65 Q20 52 15 42 Q22 48 32 55 Q28 45 25 35 Q32 42 40 50 Q38 38 38 28 Q45 36 52 45 Q52 32 55 22 Q60 32 65 42 Q68 28 72 20 Q75 32 78 45 Q80 60 82 75 Z"
        fill="#FFD700"
        opacity="0.4"
      />
      {/* Wing highlight layer */}
      <path
        d="M85 95 Q68 88 50 78 Q35 68 22 55 Q30 62 40 68 Q35 58 32 48 Q40 55 48 62 Q48 50 52 42 Q58 52 64 62 Q68 48 72 42 Q75 52 78 65 Q80 78 82 88 Z"
        fill="#FFCC00"
        opacity="0.25"
      />

      {/* Right wing - dramatic, flowing, multi-layered */}
      {/* Wing base layer */}
      <path
        d="M125 108 Q145 98 165 88 Q182 78 195 65 Q202 52 205 38 Q207 25 202 15 Q190 20 182 28 Q188 18 185 8 Q175 12 168 20 Q170 10 162 5 Q155 15 152 25 Q148 12 140 8 Q135 20 132 32 Q130 42 128 52 Q126 68 125 85 Z"
        fill="url(#wingGradR)"
        opacity="0.95"
        filter="url(#innerGlow)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 125 108;4 125 108;0 125 108"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </path>
      {/* Wing mid layer - individual feathers */}
      <path
        d="M128 90 Q148 82 168 72 Q185 62 198 48 Q192 58 182 65 Q190 52 195 42 Q188 48 178 55 Q182 45 185 35 Q178 42 170 50 Q172 38 172 28 Q165 36 158 45 Q158 32 155 22 Q150 32 145 42 Q142 28 138 20 Q135 32 132 45 Q130 60 128 75 Z"
        fill="#FFD700"
        opacity="0.4"
      />
      {/* Wing highlight layer */}
      <path
        d="M125 95 Q142 88 160 78 Q175 68 188 55 Q180 62 170 68 Q175 58 178 48 Q170 55 162 62 Q162 50 158 42 Q152 52 146 62 Q142 48 138 42 Q135 52 132 65 Q130 78 128 88 Z"
        fill="#FFCC00"
        opacity="0.25"
      />

      {/* Body - sleek and upright */}
      <path
        d="M105 170 Q90 140 86 112 Q84 92 90 75 Q95 65 105 58 Q115 65 120 75 Q126 92 124 112 Q120 140 105 170 Z"
        fill="url(#bodyGrad)"
        opacity="0.95"
      />
      {/* Body highlight */}
      <path
        d="M105 165 Q95 140 92 115 Q90 98 95 82 Q100 72 105 68 Q108 72 110 80 Q112 95 110 115 Q108 138 105 165 Z"
        fill="#FFD700"
        opacity="0.15"
      />

      {/* Head - slightly larger, confident tilt */}
      <ellipse
        cx="105"
        cy="55"
        rx="14"
        ry="16"
        fill="#FFB800"
        transform="rotate(-5 105 55)"
      />
      {/* Head shading */}
      <ellipse
        cx="103"
        cy="54"
        rx="10"
        ry="12"
        fill="#FFCC33"
        opacity="0.25"
        transform="rotate(-5 105 55)"
      />

      {/* Eye - determined, stylized */}
      <ellipse
        cx="99"
        cy="51"
        rx="3.5"
        ry="3"
        fill="#0a0a0a"
        transform="rotate(-5 99 51)"
      />
      <ellipse cx="98.5" cy="50" rx="1.2" ry="1" fill="#fff" />
      {/* Eyebrow line - gives fierce but cute look */}
      <path
        d="M94 47 Q99 45 103 47"
        stroke="#CC5500"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Beak - sharper, angled up confidently */}
      <path d="M113 52 L124 48 L113 54 Z" fill="#FF5500" />
      <path
        d="M113 52 L124 48 L120 50"
        stroke="#FFD700"
        strokeWidth="0.5"
        fill="none"
        opacity="0.5"
      />

      {/* Crown feathers - taller, more dramatic */}
      <path
        d="M96 40 Q90 22 84 8"
        stroke="#FFD700"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="2.5s"
          repeatCount="indefinite"
          values="M96 40 Q90 22 84 8;M96 40 Q89 20 82 5;M96 40 Q90 22 84 8"
        />
      </path>
      <path
        d="M102 38 Q101 18 100 3"
        stroke="#FFB800"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="2.5s"
          repeatCount="indefinite"
          values="M102 38 Q101 18 100 3;M102 38 Q102 16 102 0;M102 38 Q101 18 100 3"
        />
      </path>
      <path
        d="M108 40 Q113 22 118 8"
        stroke="#FF8C00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="2.5s"
          repeatCount="indefinite"
          values="M108 40 Q113 22 118 8;M108 40 Q114 20 120 5;M108 40 Q113 22 118 8"
        />
      </path>
      {/* Extra small crown wisps */}
      <path
        d="M99 40 Q95 28 90 18"
        stroke="#FFCC00"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M106 40 Q110 28 114 18"
        stroke="#FF9900"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Tail feathers - flowing, flame-like phoenix tail */}
      {/* Left outer tail flame */}
      <path
        d="M92 165 Q85 175 78 188 Q72 200 68 215 Q66 210 68 200 Q70 188 75 178 Q82 168 88 162 Z"
        fill="url(#fireGrad)"
        opacity="0.75"
      >
        <animate
          attributeName="d"
          dur="3.5s"
          repeatCount="indefinite"
          values="M92 165 Q85 175 78 188 Q72 200 68 215 Q66 210 68 200 Q70 188 75 178 Q82 168 88 162 Z;
                  M92 165 Q83 177 76 192 Q70 205 65 218 Q63 212 66 202 Q68 188 74 176 Q82 166 88 160 Z;
                  M92 165 Q85 175 78 188 Q72 200 68 215 Q66 210 68 200 Q70 188 75 178 Q82 168 88 162 Z"
        />
      </path>
      {/* Left mid tail flame */}
      <path
        d="M96 168 Q92 180 88 195 Q85 208 82 218 Q80 213 82 203 Q85 190 90 180 Q94 170 98 165 Z"
        fill="url(#fireGrad)"
        opacity="0.8"
      >
        <animate
          attributeName="d"
          dur="3.2s"
          repeatCount="indefinite"
          values="M96 168 Q92 180 88 195 Q85 208 82 218 Q80 213 82 203 Q85 190 90 180 Q94 170 98 165 Z;
                  M96 168 Q90 182 86 198 Q82 210 78 220 Q76 214 79 204 Q82 190 88 178 Q94 168 98 163 Z;
                  M96 168 Q92 180 88 195 Q85 208 82 218 Q80 213 82 203 Q85 190 90 180 Q94 170 98 165 Z"
        />
      </path>
      {/* Center tail flame - longest */}
      <path
        d="M105 170 Q103 185 102 200 Q101 215 100 228 Q98 222 99 210 Q100 195 102 182 Q104 172 106 167 Z"
        fill="url(#fireGrad)"
        opacity="0.85"
      >
        <animate
          attributeName="d"
          dur="3s"
          repeatCount="indefinite"
          values="M105 170 Q103 185 102 200 Q101 215 100 228 Q98 222 99 210 Q100 195 102 182 Q104 172 106 167 Z;
                  M105 170 Q102 188 101 203 Q99 218 97 232 Q95 225 97 212 Q99 196 102 180 Q104 170 106 165 Z;
                  M105 170 Q103 185 102 200 Q101 215 100 228 Q98 222 99 210 Q100 195 102 182 Q104 172 106 167 Z"
        />
      </path>
      {/* Right mid tail flame */}
      <path
        d="M114 168 Q118 180 122 195 Q125 208 128 218 Q130 213 128 203 Q125 190 120 180 Q116 170 112 165 Z"
        fill="url(#fireGrad)"
        opacity="0.8"
      >
        <animate
          attributeName="d"
          dur="3.2s"
          repeatCount="indefinite"
          values="M114 168 Q118 180 122 195 Q125 208 128 218 Q130 213 128 203 Q125 190 120 180 Q116 170 112 165 Z;
                  M114 168 Q120 182 124 198 Q128 210 132 220 Q134 214 131 204 Q128 190 122 178 Q116 168 112 163 Z;
                  M114 168 Q118 180 122 195 Q125 208 128 218 Q130 213 128 203 Q125 190 120 180 Q116 170 112 165 Z"
        />
      </path>
      {/* Right outer tail flame */}
      <path
        d="M118 165 Q125 175 132 188 Q138 200 142 215 Q144 210 142 200 Q140 188 135 178 Q128 168 122 162 Z"
        fill="url(#fireGrad)"
        opacity="0.75"
      >
        <animate
          attributeName="d"
          dur="3.5s"
          repeatCount="indefinite"
          values="M118 165 Q125 175 132 188 Q138 200 142 215 Q144 210 142 200 Q140 188 135 178 Q128 168 122 162 Z;
                  M118 165 Q127 177 134 192 Q140 205 145 218 Q147 212 144 202 Q142 188 136 176 Q128 166 122 160 Z;
                  M118 165 Q125 175 132 188 Q138 200 142 215 Q144 210 142 200 Q140 188 135 178 Q128 168 122 162 Z"
        />
      </path>
      {/* Additional wispy flame trails */}
      <path
        d="M88 168 Q82 182 75 198 Q70 210 65 220"
        stroke="#FFD700"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="3.8s"
          repeatCount="indefinite"
          values="M88 168 Q82 182 75 198 Q70 210 65 220;
                  M88 168 Q80 185 72 202 Q66 214 60 224;
                  M88 168 Q82 182 75 198 Q70 210 65 220"
        />
      </path>
      <path
        d="M122 168 Q128 182 135 198 Q140 210 145 220"
        stroke="#FFD700"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="3.8s"
          repeatCount="indefinite"
          values="M122 168 Q128 182 135 198 Q140 210 145 220;
                  M122 168 Q130 185 138 202 Q144 214 150 224;
                  M122 168 Q128 182 135 198 Q140 210 145 220"
        />
      </path>

      {/* Chest ember mark - small stylized flame icon on chest */}
      <path
        d="M105 95 Q102 88 105 82 Q108 88 105 95 Z"
        fill="#FFD700"
        opacity="0.5"
      />
    </svg>
  );
}
