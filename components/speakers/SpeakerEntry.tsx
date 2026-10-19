"use client";

import type { ReactNode } from "react";
import type { Speaker } from "@/data/speakers";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Portrait } from "./Portrait";
import styles from "./Speakers.module.css";

interface EntryProps {
  speaker: Speaker;
  /** Replaces the speaker's `role` above the name, e.g. "Opening Remarks". */
  eyebrow?: string;
  /** Keynote feature, opening-remarks roster, or the default course-grid entry. */
  layout?: "default" | "keynote" | "opening";
}

interface SummaryProps {
  speaker: Speaker;
  label?: string;
  tagClassName: string;
  layout: NonNullable<EntryProps["layout"]>;
  action?: ReactNode;
}

function Summary({ speaker, label, tagClassName, layout, action }: SummaryProps) {
  return (
    <span className={layout === "default" ? styles.summary : `${styles.summary} ${styles[layout]}`}>
      <Portrait speaker={speaker} />
      <span className={styles.text}>
        {label && layout === "default" ? <span className={tagClassName}>{label}</span> : null}
        <span className={styles.name}>{speaker.name}</span>
        {speaker.title ? <span className={styles.detail}>{speaker.title}</span> : null}
        {speaker.organization ? <span className={`${styles.detail} ${styles.organization}`}>{speaker.organization}</span> : null}
        {action}
      </span>
    </span>
  );
}

export function SpeakerEntry({ speaker, eyebrow, layout = "default" }: EntryProps) {
  const label = eyebrow ?? speaker.role;
  const tagClassName = label === "Keynote" ? styles.roleLabel : styles.tag;
  if (!speaker.bio.length) return <Summary speaker={speaker} label={label} tagClassName={tagClassName} layout={layout} />;
  const readBio = (
    <span className={styles.readBio}>
      Read bio
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
    </span>
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={styles.entry}>
          <Summary speaker={speaker} label={label} tagClassName={tagClassName} layout={layout} action={layout !== "default" ? readBio : undefined} />
          {layout === "default" ? readBio : null}
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className={styles.overlay} />
        <DialogContent className={styles.dialog}>
          <div className={styles.dialogBody}>
            <div className={styles.dialogHeader}>
              <Portrait speaker={speaker} />
              <div className={styles.dialogIntro}>
                {label ? <p className={tagClassName}>{label}</p> : null}
                <DialogTitle className={styles.dialogName}>{speaker.name}</DialogTitle>
                <DialogDescription className={styles.dialogRole}>
                  {speaker.title ? <span className={styles.dialogPosition}>{speaker.title}</span> : null}
                  {speaker.organization ? <span>{speaker.organization}</span> : null}
                </DialogDescription>
              </div>
            </div>
            <div className={styles.bio}>
              {speaker.bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </div>
          <DialogClose className={styles.close} aria-label="Close">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
