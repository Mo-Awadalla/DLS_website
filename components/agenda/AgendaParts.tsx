import { confirmedSpeakers, speakersPath, type AgendaEntry } from "@/data/agenda";
import { courseNumberLabel, formatCredit, plural } from "@/lib/agenda-time";
import styles from "./Agenda.module.css";

export function hasDetails(entry: AgendaEntry) {
  return Boolean(
    entry.moderators?.length || entry.instructors?.length || entry.speakersPanel ||
    (entry.kind === "remarks" && entry.speakers?.some(speaker => speaker.confirmed)),
  );
}

export function CourseLabel({ entry }: { entry: AgendaEntry }) {
  if (entry.courseNumber === undefined) return null;
  return <span className={styles.courseLabel}>Course {courseNumberLabel(entry.courseNumber)}</span>;
}

export function CreditLine({ entry }: { entry: AgendaEntry }) {
  if (!entry.credit) return null;
  return <span className={styles.credit}>{formatCredit(entry.credit.hours)} · {entry.credit.category}</span>;
}

function NameGroup({ label, names }: { label: string; names: readonly string[] }) {
  return (
    <div className={styles.nameGroup}>
      <dt>{label}</dt>
      <dd>
        <ul>
          {names.map(name => <li key={name}>{name}</li>)}
        </ul>
      </dd>
    </div>
  );
}

export function People({ entry }: { entry: AgendaEntry }) {
  const speakers = confirmedSpeakers(entry);
  const moderators = entry.moderators ?? [];
  const instructors = entry.instructors ?? [];
  if (speakers.length === 0 && moderators.length === 0 && instructors.length === 0) return null;
  return (
    <>
      {speakers.length > 0 ? (
        <ul className={styles.speakers} aria-label={`${entry.title} speakers`}>
          {speakers.map(speaker => (
            <li key={speaker.name}>
              <span className={styles.speakerName}>{speaker.name}</span>
              {speaker.role ? <span className={styles.speakerRole}>{speaker.role}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {moderators.length > 0 || instructors.length > 0 ? (
        <dl className={styles.people}>
          {moderators.length > 0 ? <NameGroup label={plural(moderators.length, "Moderator", "Moderators")} names={moderators} /> : null}
          {instructors.length > 0 ? <NameGroup label="Panelists" names={instructors} /> : null}
        </dl>
      ) : null}
    </>
  );
}

/** Course links open the matching tab; remarks link to the featured speakers at the top of the page. */
export function ViewSpeakersLink({ entry }: { entry: AgendaEntry }) {
  if (!entry.speakersPanel && entry.kind !== "remarks") return null;
  return (
    <a className={styles.speakersLink} href={entry.speakersPanel ? `${speakersPath}#${entry.speakersPanel}` : speakersPath}>
      View speakers
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    </a>
  );
}
