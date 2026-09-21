import Image from "next/image";
import { sitePath } from "@/lib/site-path";
import { TopicsSection } from "@/components/TopicsSection";
import { publishedEvent } from "@/data/published-event";

export default function HomePage() {
  return (
    <>
      <section className="signal-hero" id="overview" aria-labelledby="hero-title">
        <Image className="signal-skyline" src={sitePath("/assets/nyc-skyline.jpg")} alt="" fill priority sizes="100vw" />
        <div className="signal-scrim" aria-hidden="true" />
        <div className="page-shell hero-content">
          <p className="eyebrow">{publishedEvent.title}</p>
          <h1 id="hero-title">{publishedEvent.themeDisplay[0]}<br /><span>{publishedEvent.themeDisplay[1]}</span></h1>
          <p className="hero-tagline">{publishedEvent.tagline}</p>
          <dl className="event-facts">
            <div><dt>Date</dt><dd><time dateTime={publishedEvent.date.iso}>{publishedEvent.date.label}</time></dd></div>
            <div><dt>Venue</dt><dd>{publishedEvent.venue.name}</dd></div>
          </dl>
          <a className="button" href={publishedEvent.calendarPath} download={publishedEvent.calendarPath.split("/").pop()}>
            Save the date <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <TopicsSection introduction={publishedEvent.introduction} topics={publishedEvent.topics} />
    </>
  );
}
