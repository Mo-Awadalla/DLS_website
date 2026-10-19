import Image from "next/image";
import { publishedEvent } from "@/data/published-event";
import { sitePath } from "@/lib/site-path";
import { RegistrationDisclosure } from "@/components/EventNotices";
import styles from "./Footer.module.css";

const links = [
  { label: "Overview", href: "/" },
  { label: "Speakers", href: "/speakers/" },
  { label: "Venue", href: "/venue/" },
  { label: "Sponsors", href: "/sponsors/" },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`page-shell ${styles.main}`}>
        <div className={styles.identity}>
          <a className={styles.brand} href={sitePath("/")} aria-label={`${publishedEvent.title} home`}>
            <Image className={styles.logo} src={sitePath("/assets/nycem-logo-transparent.png")} alt={publishedEvent.organization} width={2500} height={834} />
          </a>
          <div>
            <p className={styles.name}>{publishedEvent.title}</p>
            <p className={styles.tagline}>{publishedEvent.tagline}</p>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Footer">
          <p className={styles.label}>Explore</p>
          {links.map((link) => (
            <a key={link.href} className={styles.navLink} href={sitePath(link.href)}>{link.label}</a>
          ))}
        </nav>
        <div className={styles.contact}>
          <p className={styles.label}>Contact</p>
          <a className={styles.email} href={`mailto:${publishedEvent.contact.email}`}>{publishedEvent.contact.email}</a>
          <a className={styles.registration} href={publishedEvent.registrationUrl} target="_blank" rel="noopener noreferrer" aria-label="Registration (opens in a new tab)">Registration</a>
          <RegistrationDisclosure />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={`page-shell ${styles.bottom}`}>
          <span>{publishedEvent.organization}</span>
          <span>© {publishedEvent.date.iso.slice(0, 4)} City of New York</span>
        </div>
      </div>
    </footer>
  );
}
