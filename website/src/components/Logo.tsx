interface Props {
  size?: number;
  withWordmark?: boolean;
  dark?: boolean;
}

/** Emergence mark — four agents linking into one system. */
export function Logo({ size = 30, withWordmark = false, dark = false }: Props) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-label="Emergence logo">
        <rect width="64" height="64" rx="15" fill="#0c0f14" />
        <rect width="64" height="64" rx="15" fill="url(#logo-sheen)" opacity="0.35" />
        <path
          d="M22 24 L42 20 M42 20 L38 42 M38 42 L18 44 M18 44 L22 24 M22 24 L38 42"
          stroke="url(#logo-link)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="22" cy="24" r="5" fill="#d97706" />
        <circle cx="42" cy="20" r="4" fill="#f59e0b" />
        <circle cx="38" cy="42" r="6.5" fill="#fbbf24" />
        <circle cx="38" cy="42" r="2.4" fill="#0c0f14" opacity="0.55" />
        <circle cx="18" cy="44" r="3.5" fill="#b45309" />
        <defs>
          <linearGradient id="logo-link" x1="0" y1="0" x2="64" y2="64">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
          <radialGradient id="logo-sheen" cx="0.25" cy="0.1" r="1">
            <stop stopColor="#2d4a6f" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {withWordmark && (
        <span
          className={`font-display text-lg font-medium tracking-tight ${
            dark ? 'text-white' : 'text-[var(--color-ink)]'
          }`}
        >
          Emergence
        </span>
      )}
    </span>
  );
}
