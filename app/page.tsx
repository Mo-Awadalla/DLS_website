import { AgendaTimeline } from "@/components/AgendaTimeline";
import { RegistrationCTA } from "@/components/RegistrationCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { sessions } from "@/data/sessions";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const landingSessions = sessions.filter((session) => session.type !== "keynote").slice(0, 7);

  return (
    <>
      <section className="hero hero-institutional">
        <div className="page-shell hero-institutional-inner">
          <div className="hero-institutional-copy">
            <p className="kicker">Disaster Law Symposium 2026</p>
            <h1>Law at the<br /><em>Crossroads.</em></h1>
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
          <SectionHeading eyebrow="The 2026 thesis" title="Disasters expose the seams in our systems." body="The law sits at every intersection: between public safety and privacy, speed and due process, transparency and operational security, individual rights and collective resilience." />
          <div className="thesis-points">
            <div><span className="point-number">01</span><h3>See the whole system</h3><p>Bring emergency managers, counsel, technologists, reporters, and advocates into the same room.</p></div>
            <div><span className="point-number">02</span><h3>Practice under pressure</h3><p>Translate legal principles into decisions that hold up when infrastructure, funding, and certainty are strained.</p></div>
            <div><span className="point-number">03</span><h3>Build what lasts</h3><p>Leave with sharper questions and stronger relationships for the next disaster landscape.</p></div>
          </div>
        </div>
      </section>

      <section className="program-preview section-pad section-tint">
        <div className="page-shell">
          <div className="section-heading-row"><SectionHeading eyebrow="A day in sequence" title="The program" body="Four CLE courses and the conversations between them." /></div>
          <AgendaTimeline sessions={landingSessions} compact />
        </div>
      </section>
    </>
  );
}
