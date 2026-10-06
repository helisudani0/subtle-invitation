import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import monogramAsset from "../assets/monogram.asset.json";
import moonSkyAsset from "../assets/moon-sky.asset.json";

const monogram = monogramAsset.url;
const moonSky = moonSkyAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Megha & Akash — Save the Date" },
      {
        name: "description",
        content: "Save the date for Megha and Akash, 5–6 December 2026 at Shreenath Party Plot.",
      },
      { property: "og:title", content: "Megha & Akash — Save the Date" },
      {
        property: "og:description",
        content: "5–6 December 2026 · Shreenath Party Plot",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: moonSky },
      { name: "twitter:image", content: moonSky },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const events = [
  { day: "05", month: "DEC", time: "2:00 PM", name: "Mandap Muhurt" },
  { day: "05", month: "DEC", time: "4:00 PM", name: "Haldi" },
  { day: "05", month: "DEC", time: "8:00 PM", name: "Ras Garba" },
  { day: "06", month: "DEC", time: "7:00 PM", name: "Wedding" },
];

function Index() {
  const sceneRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      scene.style.setProperty("--pointer-x", x.toFixed(3));
      scene.style.setProperty("--pointer-y", y.toFixed(3));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <main className="invitation-shell">
      <section ref={sceneRef} className="sky-scene" aria-label="Megha and Akash save the date">
        <img
          src={moonSky}
          width={1280}
          height={1920}
          alt="A full moon rising through clouds over an Ontario lake"
          className="sky-backdrop"
        />
        <div className="sky-vignette" />
        <div className="cloud-veil cloud-veil-left" aria-hidden="true" />
        <div className="cloud-veil cloud-veil-right" aria-hidden="true" />

        <div className="hero-copy">
          <img
            src={monogram}
            width={1024}
            height={1024}
            alt="Megha and Akash monogram"
            className="monogram"
          />
          <p className="save-label">SAVE THE DATE</p>
          <h1>
            <span>Megha</span>
            <em>&amp;</em>
            <span>Akash</span>
          </h1>
          <div className="date-line" aria-label="6 December 2026">
            <span>06</span><i /> <span>12</span><i /> <span>2026</span>
          </div>
        </div>

        <a href="#celebrations" className="descend-cue" aria-label="View celebrations">
          <span>THE CELEBRATIONS</span>
          <i />
        </a>
      </section>

      <section id="celebrations" className="celebrations-section">
        <div className="invitation-paper">
          <img
            src={monogram}
            width={1024}
            height={1024}
            alt=""
            className="paper-monogram"
            loading="lazy"
          />
          <header className="section-heading">
            <p className="invite-line">Together with our families, we invite you to celebrate with us</p>
            <h2>The Celebrations</h2>
          </header>

          <div className="event-list">
            {events.map((event) => (
              <article className="event-row" key={`${event.name}-${event.time}`}>
                <div className="event-date">
                  <strong>{event.day}</strong>
                  <span>{event.month}</span>
                </div>
                <h3>{event.name}</h3>
                <time>{event.time}</time>
              </article>
            ))}
          </div>

          <div className="venue-copy">
            <p>ALL CELEBRATIONS AT</p>
            <h3>Shreenath Party Plot</h3>
          </div>
          <div className="venue-actions">
            <a
              className="venue-link"
              href="https://maps.app.goo.gl/RGcXbTwc7zkrWHt38"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} /> View location
            </a>
            <a
              className="calendar-link"
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Megha%20%26%20Akash%20Wedding&dates=20261206T133000Z/20261206T153000Z&location=Shreenath%20Party%20Plot"
              target="_blank"
              rel="noreferrer"
            >
              <CalendarDays size={18} /> Add to calendar
            </a>
          </div>
          <p className="paper-signoff">Megha &amp; Akash</p>
        </div>
      </section>

      <footer className="invitation-footer">
        <span>06 · 12 · 2026</span><i /> <span>MEGHA &amp; AKASH</span>
      </footer>
    </main>
  );
}
