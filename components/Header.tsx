import Image from "next/image";
import { sitePath } from "@/lib/site-path";
import { publishedEvent } from "@/data/published-event";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.homeLink} href={sitePath("/")} aria-label={`${publishedEvent.title} home`}>
        <Image className={styles.logo} src={sitePath("/assets/nycem-logo-transparent.png")} alt={publishedEvent.organization} width={2500} height={834} priority />
      </a>
    </header>
  );
}
