import { Music2, Pause } from "lucide-react";
import { useMemo } from "react";

export function GoldSparkles({ count = 34 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2);
        return {
          left: `${r(1) * 100}%`,
          top: `${r(2) * 100}%`,
          size: 1.5 + r(3) * 3,
          delay: `${r(4) * 8}s`,
          duration: `${7 + r(5) * 8}s`,
        };
      }),
    [count],
  );
  return (
    <div className="gold-sparkles" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, animationDelay: d.delay, animationDuration: d.duration }}
        />
      ))}
    </div>
  );
}

export function EnvelopeIntro({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return (
    <div className={`envelope-intro ${opening ? "is-opening" : ""}`}>
      <button type="button" className="envelope" onClick={onOpen} aria-label="Open the invitation">
        <span className="envelope-flap" />
        <span className="envelope-body" />
        <span className="wax-seal">
          <em>M</em>
          <small>&amp;</small>
          <em>A</em>
        </span>
      </button>
      <p className="envelope-hint">Tap the seal to open</p>
    </div>
  );
}

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`music-toggle ${playing ? "is-playing" : ""}`}
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Pause size={16} /> : <Music2 size={16} />}
      <span className="music-ring" aria-hidden="true" />
    </button>
  );
}

export function JaliCorners() {
  const corner = (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <path d="M2 78 V30 Q2 2 30 2 H78" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M10 78 V34 Q10 10 34 10 H78" fill="none" stroke="currentColor" strokeWidth=".6" />
      <circle cx="22" cy="22" r="7" fill="none" stroke="currentColor" strokeWidth=".7" />
      <circle cx="22" cy="22" r="2.4" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} cx="22" cy="12" rx="1.6" ry="4" fill="none" stroke="currentColor" strokeWidth=".5" transform={`rotate(${a} 22 22)`} />
      ))}
    </svg>
  );
  return (
    <div className="jali-corners" aria-hidden="true">
      <span className="tl">{corner}</span>
      <span className="tr">{corner}</span>
      <span className="bl">{corner}</span>
      <span className="br">{corner}</span>
    </div>
  );
}

export function JharokhaArch() {
  return (
    <svg className="jharokha-arch" viewBox="0 0 200 40" aria-hidden="true">
      <path d="M10 38 Q40 38 55 24 Q72 6 100 4 Q128 6 145 24 Q160 38 190 38" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M30 38 Q55 36 66 26 Q80 13 100 12 Q120 13 134 26 Q145 36 170 38" fill="none" stroke="currentColor" strokeWidth=".6" />
      <circle cx="100" cy="4" r="2.5" fill="currentColor" />
    </svg>
  );
}
