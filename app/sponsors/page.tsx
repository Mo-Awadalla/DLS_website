import type { Metadata } from "next";
import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { publishedEvent } from "@/data/published-event";
import { sitePath } from "@/lib/site-path";
import styles from "./SponsorsPage.module.css";

export const metadata: Metadata = {
  title: "Sponsors",
  description: `Sponsors of ${publishedEvent.title}, ${publishedEvent.date.label} at ${publishedEvent.venue.name}.`,
};

export default function SponsorsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.masthead} aria-hidden="true" />
      <section className={`page-shell ${styles.sheet}`} aria-labelledby="sponsors-title">
        <div className={styles.introduction}>
          <h1 id="sponsors-title">Sponsors.</h1>
        </div>
        <ul className={styles.roster}>
          {sponsors.map(sponsor => (
            <li key={sponsor.id} className={styles.sponsor}>
              <Image
                className={styles.logo}
                src={sitePath(sponsor.logo)}
                alt={sponsor.name}
                width={sponsor.logoWidth}
                height={sponsor.logoHeight}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
