import { AgendaTimeline } from "@/components/AgendaTimeline";
import { RegistrationCTA } from "@/components/RegistrationCTA";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { sessions } from "@/data/sessions";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const landingSessions = sessions.filter((session) => session.type !== "keynote");

  return (
    <>
      <section className="hero hero-institutional">
        <div className="page-shell hero-institutional-inner">
          <div className="hero-institutional-copy">
            <p className="kicker">Disaster Law Symposium 2026</p>
            <h1>Law at the<br />Crossroads.</h1>
            <p className="hero-institutional-lede">A working session for the people who keep emergency systems accountable.</p>
            <div className="hero-actions">
              <RegistrationCTA />
            </div>
          </div>
          <aside className="hero-institutional-panel" aria-label="Event facts">
            <Badge>At a glance</Badge>
            <h2>Strengthening systems for a new era of disasters.</h2>
            <Separator className="hero-panel-rule" />
            <div className="hero-fact-row"><span>When</span><strong>{siteConfig.dateLabel}</strong></div>
            <div className="hero-fact-row"><span>Where</span><strong>{siteConfig.venueLabel}</strong></div>
            <div className="hero-fact-row"><span>Format</span><strong>In-person · CLE eligible</strong></div>
            <p className="hero-panel-foot">Four CLE courses · one day in sequence</p>
          </aside>
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
