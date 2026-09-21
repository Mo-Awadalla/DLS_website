import { PreviewBar } from "~/components/PreviewBar";
import { TopicsSection } from "~/components/TopicsSection";
import Image from "next/image";
import { overview } from "@/data/overview";

export default function HomePage() {
  return (
    <>
      <PreviewBar />
      <section className="signal-hero" id="overview" aria-labelledby="hero-title">
        <Image className="signal-skyline" src="/assets/nyc-skyline.jpg" alt="" fill priority sizes="100vw" />
        <div className="signal-scrim" aria-hidden="true" />
        <div className="page-shell hero-content">
          <p className="eyebrow">{overview.title}</p>
          <h1 id="hero-title">Law at the<br /><span>Crossroads.</span></h1>
          <p className="hero-tagline">{overview.tagline}</p>
          <dl className="event-facts">
            <div><dt>Date</dt><dd><time dateTime={overview.date.iso}>{overview.date.label}</time></dd></div>
            <div><dt>Venue</dt><dd>{overview.venue.name}</dd></div>
          </dl>
          <a className="button" href={overview.calendarPath} download="disaster-law-symposium-2026.ics">
            Save the date <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <TopicsSection />
    </>
  );
}
