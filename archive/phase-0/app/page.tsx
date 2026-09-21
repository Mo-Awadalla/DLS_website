import Image from "next/image";
import { AgendaTimeline } from "@/components/AgendaTimeline";
import { RegistrationCTA } from "@/components/RegistrationCTA";
import { sessions } from "@/data/sessions";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const landingSessions = sessions.filter((session) => session.type !== "keynote");

  return (
    <>
      <section className="hero hero-skyline">
        <div className="page-shell hero-skyline-inner">
          <div className="hero-institutional-copy">
            <p className="kicker">Disaster Law Symposium 2026</p>
            <h1>Law at the<br />Crossroads.</h1>
            <p className="hero-institutional-lede">Strengthening systems for a new era of disasters.</p>
            <div className="hero-actions">
              <RegistrationCTA />
            </div>
          </div>
          <figure className="hero-skyline-photo">
            <Image src="/assets/nyc-skyline.jpg" alt="Midtown Manhattan skyline beneath a blue sky" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
          </figure>
          <dl className="hero-event-details">
            <div><dt>Date</dt><dd>{siteConfig.dateLabel}</dd></div>
            <div><dt>Venue</dt><dd>{siteConfig.venueLabel}</dd></div>
            <div><dt>Program</dt><dd>In person · Four CLE courses</dd></div>
          </dl>
        </div>
      </section>

      <section className="thesis-section section-pad">
        <div className="page-shell thesis-grid">
          <h2>Legal decisions under emergency conditions.</h2>
          <p>At John Jay College of Criminal Justice, four courses will examine how lawyers oversee emergency AI tools, protect civil rights, maintain client representation during outages, and prepare for overlapping disasters. The day brings these questions into one program, with time for discussion and a closing networking reception.</p>
        </div>
      </section>

      <section className="program-preview section-pad section-tint">
        <div className="page-shell">
          <div className="section-heading-row"><div className="section-heading"><h2>The program</h2><p>October 29 · All times Eastern. CLE approval pending.</p></div></div>
          <AgendaTimeline sessions={landingSessions} compact />
        </div>
      </section>
    </>
  );
}
