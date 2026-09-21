import Image from "next/image";
import { sitePath } from "@/lib/site-path";
import { overview } from "@/data/overview";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.homeLink} href={sitePath("/")} aria-label={`${overview.title} home`}>
        <Image className={styles.logo} src={sitePath("/assets/nycem-logo-transparent.png")} alt={overview.organization} width={2500} height={834} priority />
      </a>
    </header>
  );
}
