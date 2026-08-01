export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="2"
          y="2"
          width="12"
          height="12"
          rx="2"
          transform="rotate(15 8 8)"
          fill="var(--color-ink-black)"
        />
        <rect
          x="10"
          y="10"
          width="12"
          height="12"
          rx="2"
          transform="rotate(15 16 16)"
          fill="var(--color-ink-black)"
        />
      </svg>
      <span
        className="text-[20px]"
        style={{ color: "var(--color-ink-black)", letterSpacing: "-0.03em" }}
      >
        Mila Patramanska
      </span>
    </span>
  );
}
