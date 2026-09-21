import type { Metadata } from "next";
import { AgendaTimeline } from "@/components/AgendaTimeline";
import { HomeOnlyNotice } from "@/components/HomeOnlyNotice";
import { SectionHeading } from "@/components/SectionHeading";
import { courses, sessions } from "@/data/sessions";
import { siteConfig } from "@/data/site";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Program", description: "The complete Disaster Law Symposium 2026 agenda and CLE course details.", alternates: { canonical: "/program" } };

export default function ProgramPage() {
  if (siteConfig.landingOnly) return <HomeOnlyNotice />;

  return (
    <>
      <section className="page-hero"><div className="page-shell page-hero-inner"><p className="kicker">Disaster Law Symposium 2026</p><h1>A day built for<br /><em>the work ahead.</em></h1><p>Read the full sequence, from morning reception through the final conversation of the day.</p></div></section>
      <section className="section-pad program-page"><div className="page-shell program-layout"><div className="program-intro"><SectionHeading eyebrow="Complete agenda" title="One room. Eleven moments." body="Times are shown in local time. The date and final venue will be announced as planning is completed." /><div className="program-key"><span className="key-dot amber" />CLE course <Separator orientation="vertical" decorative={false} /><span className="key-dot blue" />Conversation / reception</div></div><AgendaTimeline sessions={sessions} /></div></section>
      <section className="cle-section section-pad section-tint"><div className="page-shell"><SectionHeading eyebrow="Continuing legal education" title="Four courses, designed for pressure." body="CLE credit categories and approvals are pending. Course descriptions below are editorial source copy and will be updated as details are finalized." /><div className="cle-grid">{courses.map((course) => <article className="cle-card" key={course.id}><p className="session-type">{course.shortTime} · {course.time}</p><h3>{course.title}</h3><p>{course.description}</p><div className="cle-card-foot"><span>{course.cle}</span><span>Details in agenda ↑</span></div></article>)}</div></div></section>
    </>
  );
}
