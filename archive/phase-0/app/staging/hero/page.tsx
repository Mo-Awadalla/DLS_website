import type { Metadata } from "next";
import Link from "next/link";
import { HomeOnlyNotice } from "@/components/HomeOnlyNotice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { sessions } from "@/data/sessions";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Hero directions staging",
  description: "Internal staging page for three Disaster Law Symposium 2026 homepage hero directions.",
  robots: { index: false, follow: false },
};

const facts = [
  ["When", siteConfig.dateLabel],
  ["Where", siteConfig.venueLabel],
  ["Format", "In-person · CLE eligible"],
] as const;

const pulseSessions = sessions.filter((session) => ["algorithmic-response", "justice-under-pressure", "keynote-lunch"].includes(session.id));

function HeroActions({ light = false }: { light?: boolean }) {
  return (
    <div className="staging-actions">
      <Button variant="secondary" disabled>Registration opening soon</Button>
      <Button asChild variant={light ? "outline" : "ghost"} className={light ? "staging-button-light" : ""}>
        <Link href="/program">Explore the program <span aria-hidden="true">↓</span></Link>
      </Button>
    </div>
  );
}

export default function HeroDirectionsStagingPage() {
  if (siteConfig.landingOnly) return <HomeOnlyNotice />;

  return (
    <div className="hero-staging-page">
      <section className="hero-staging-intro page-shell">
        <div>
          <p className="hero-staging-label">Homepage hero · staging</p>
          <h1>Three ways to open the day.</h1>
          <p>Compare the same symposium story through three different compositions. Nothing on this page changes the live homepage.</p>
        </div>
        <nav className="hero-staging-nav" aria-label="Hero directions">
          <a href="#briefing"><Badge variant="outline">01</Badge><span>Editorial briefing</span></a>
          <a href="#institutional"><Badge variant="outline">02</Badge><span>Institutional fact panel</span></a>
          <a href="#agenda-pulse"><Badge variant="outline">03</Badge><span>Agenda pulse</span></a>
        </nav>
      </section>

      <main className="hero-staging-stack page-shell">
        <article className="hero-staging-option" id="briefing">
          <div className="hero-staging-option-head"><Badge variant="outline">Direction 01</Badge><span>Editorial briefing</span></div>
          <section className="hero-staging-artboard staging-briefing">
            <div className="staging-briefing-copy">
              <p className="staging-micro">NYC Emergency Management · 2026</p>
              <h2>Law at the<br /><em>Crossroads.</em></h2>
              <p className="staging-lede">Strengthening systems for a new era of disasters.</p>
              <Separator className="staging-rule" />
              <p className="staging-description">A one-day symposium for the attorneys, public servants, technologists, and advocates who keep emergency systems accountable when the stakes are highest.</p>
              <HeroActions />
            </div>
            <aside className="staging-briefing-facts" aria-label="Event facts">
              {facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </aside>
            <div className="staging-artboard-index" aria-hidden="true"><span>01</span><span>11 sessions</span></div>
          </section>
          <p className="hero-staging-note">The closest evolution of the current homepage: quiet, editorial, and led by the headline.</p>
        </article>

        <article className="hero-staging-option" id="institutional">
          <div className="hero-staging-option-head"><Badge variant="outline">Direction 02</Badge><span>Institutional fact panel</span></div>
          <section className="hero-staging-artboard staging-institutional">
            <div className="staging-institutional-copy">
              <p className="staging-micro">Disaster Law Symposium 2026</p>
              <h2>Law at the<br /><em>Crossroads.</em></h2>
              <p className="staging-lede">A working session for the people who keep emergency systems accountable.</p>
              <HeroActions light />
            </div>
            <aside className="staging-fact-panel">
              <Badge>At a glance</Badge>
              <h3>Strengthening systems for a new era of disasters.</h3>
              <Separator className="staging-panel-rule" />
              {facts.map(([label, value]) => <div className="staging-fact-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
              <p className="staging-panel-foot">Four CLE courses · one keynote · one day in sequence</p>
            </aside>
          </section>
          <p className="hero-staging-note">More structured and institutional: the facts become a visible anchor instead of a secondary rail.</p>
        </article>

        <article className="hero-staging-option" id="agenda-pulse">
          <div className="hero-staging-option-head"><Badge variant="outline">Direction 03</Badge><span>Agenda pulse</span></div>
          <section className="hero-staging-artboard staging-agenda-pulse">
            <div className="staging-agenda-copy">
              <p className="staging-micro">A day in sequence · 2026</p>
              <h2>The questions<br /><em>start here.</em></h2>
              <p className="staging-lede">Law, technology, rights, and resilience—brought into the same room.</p>
              <HeroActions />
            </div>
            <div className="staging-pulse-list" aria-label="Program preview">
              <div className="staging-pulse-intro"><span>Next on the program</span><strong>11 sessions</strong></div>
              {pulseSessions.map((session, index) => <div className="staging-pulse-item" key={session.id}><div><span className="staging-pulse-time">{session.shortTime}</span><span className="staging-pulse-period">{session.time.replace(`${session.shortTime}–`, "")}</span></div><div><span className="staging-pulse-type">{session.type === "course" ? "CLE course" : "Keynote"}</span><h3>{session.title}</h3></div><span className="staging-pulse-number">0{index + 1}</span></div>)}
            </div>
          </section>
          <p className="hero-staging-note">Most useful for a program-led homepage: the visitor sees the event’s substance before they scroll.</p>
        </article>
      </main>
    </div>
  );
}
