import type { CSSProperties } from "react";
import type { Speaker } from "@/data/speakers";
import { sitePath } from "@/lib/site-path";
import styles from "./Speakers.module.css";

function initials(name: string) {
  const words = name.split(",")[0].replace(/^(Dr|Prof|Hon)\.?\s+/i, "").split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

export function Portrait({ speaker }: { speaker: Speaker }) {
  const imageStyle: CSSProperties = {
    ...(speaker.headshotPosition ? { objectPosition: speaker.headshotPosition } : {}),
    ...(speaker.headshotFit ? { objectFit: speaker.headshotFit } : {}),
  };

  return (
    <span className={styles.portrait}>
      {speaker.headshot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.portraitImage} src={sitePath(speaker.headshot)} alt={`Headshot of ${speaker.name}`} style={imageStyle} />
      ) : (
        <span className={styles.initials} role="img" aria-label={`No headshot supplied for ${speaker.name}`}>{initials(speaker.name)}</span>
      )}
    </span>
  );
}
