export function HeroBackground() {
  // Small hex tile — SVG stroked at 8% opacity for the "extremely restrained" pattern.
  const hex = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="64" viewBox="0 0 56 64">
       <g fill="none" stroke="rgba(62,199,255,0.08)" stroke-width="1">
         <path d="M28 2 L54 17 L54 47 L28 62 L2 47 L2 17 Z"/>
       </g>
     </svg>`
  );
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[color:var(--color-bg-primary)]" />
      {/* hex pattern */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${hex}")`,
          backgroundSize: "56px 64px",
          maskImage:
            "radial-gradient(ellipse at 65% 40%, black 0%, black 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 65% 40%, black 0%, black 35%, transparent 75%)",
        }}
      />
      {/* cyan glow, upper-left */}
      <div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-cyan-soft), transparent 70%)" }}
      />
      {/* soft yellow illumination, behind book */}
      <div
        className="absolute right-[6%] top-[18%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-yellow-soft), transparent 70%)" }}
      />
      {/* vignette to keep type readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
