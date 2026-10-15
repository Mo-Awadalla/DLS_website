import type { Metadata } from "next";
import { SpeakerCourses } from "@/components/speakers/SpeakerCourses";
import { SpeakerEntry } from "@/components/speakers/SpeakerEntry";
import { publishedEvent } from "@/data/published-event";
import { speakerGroups, speakers } from "@/data/speakers";
import styles from "./SpeakersPage.module.css";

export const metadata: Metadata = {
  title: "Speakers",
  description: `Meet the speakers and moderators of ${publishedEvent.title}, ${publishedEvent.date.label} at ${publishedEvent.venue.name}.`,
};

export default function SpeakersPage() {
  const keynote = speakers.find(speaker => speaker.featured && speaker.featuredLabel === "Keynote");
  const opening = speakers.filter(speaker => speaker.featured && speaker.featuredLabel === "Opening Remarks");
  return (
    <div className={styles.page}>
      <div className={styles.masthead} aria-hidden="true" />
      <section className={`page-shell ${styles.sheet}`} aria-labelledby="speakers-title">
        <div className={styles.introduction}>
          <h1 id="speakers-title">Speakers.</h1>
        </div>
        <section className={styles.featuredSplit} aria-label="Featured speakers">
          {keynote ? (
            <section className={styles.keynote} aria-labelledby="keynote-title">
              <h2 id="keynote-title" className={styles.featuredTitle}>Keynote</h2>
              <div className={styles.keynoteCard}>
                <SpeakerEntry speaker={keynote} eyebrow={keynote.featuredLabel} layout="keynote" />
              </div>
            </section>
          ) : null}
          <section className={styles.opening} aria-labelledby="opening-remarks-title">
            <h2 id="opening-remarks-title" className={styles.featuredTitle}>Opening remarks</h2>
            <ul className={styles.openingRoster}>
              {opening.map(speaker => (
                <li key={speaker.id}>
                  <SpeakerEntry speaker={speaker} eyebrow={speaker.featuredLabel} layout="opening" />
                </li>
              ))}
            </ul>
          </section>
        </section>
        <SpeakerCourses speakers={speakers} groups={speakerGroups} />
      </section>
    </div>
  );
}
