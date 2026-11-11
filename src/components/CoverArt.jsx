/**
 * Generated SVG cover art for each project (no external images needed).
 * Replace with real screenshots later by passing an <img> instead.
 */
export default function CoverArt({ variant = 'guardian', className = '' }) {
  const id = `cover-${variant}`;
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${variant} project cover illustration`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14112a" />
          <stop offset="1" stopColor="#0a0f24" />
        </linearGradient>
        <linearGradient id={`${id}-ac`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill={`url(#${id}-bg)`} />
      <rect width="800" height="450" fill={`url(#${id}-grid)`} />
      <circle cx="400" cy="225" r="230" fill={`url(#${id}-glow)`} />

      {variant === 'guardian' && (
        <g>
          {[
            [150, 110], [650, 100], [120, 300], [680, 320], [260, 390], [560, 390],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={y} x2="400" y2="225" stroke="rgba(167,139,250,0.35)" strokeWidth="1.5" strokeDasharray="4 6" />
              <circle cx={x} cy={y} r="9" fill="#0d0e14" stroke={`url(#${id}-ac)`} strokeWidth="2" />
              <circle cx={x} cy={y} r="3" fill="#a78bfa" />
            </g>
          ))}
          <path
            d="M400 110 L500 150 V240 C500 300 455 340 400 360 C345 340 300 300 300 240 V150 Z"
            fill="rgba(139,92,246,0.12)"
            stroke={`url(#${id}-ac)`}
            strokeWidth="3"
          />
          <path d="M355 235 l32 32 l62 -70" fill="none" stroke={`url(#${id}-ac)`} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {variant === 'careerflow' && (
        <g>
          <path
            d="M90 360 C200 360 220 280 320 280 S470 200 560 190 S690 110 720 90"
            fill="none"
            stroke={`url(#${id}-ac)`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {[[90, 360], [320, 280], [560, 190], [720, 90]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="22" fill="#0d0e14" stroke={`url(#${id}-ac)`} strokeWidth="3" />
              <circle cx={x} cy={y} r="7" fill="#a78bfa" />
            </g>
          ))}
          {[[200, 130, 150], [430, 90, 120], [120, 170, 90]].map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height="14" rx="7" fill="rgba(255,255,255,0.08)" />
          ))}
        </g>
      )}

      {variant === 'assistant' && (
        <g>
          {Array.from({ length: 33 }).map((_, i) => {
            const h = 30 + Math.abs(Math.sin(i * 0.55) * 120) + (i % 4) * 8;
            return (
              <rect
                key={i}
                x={110 + i * 18.5}
                y={225 - h / 2}
                width="8"
                height={h}
                rx="4"
                fill={`url(#${id}-ac)`}
                opacity={0.45 + (h / 220) * 0.55}
              />
            );
          })}
          <circle cx="400" cy="225" r="150" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1.5" strokeDasharray="3 8" />
        </g>
      )}
    </svg>
  );
}
