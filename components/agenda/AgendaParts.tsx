import { speakersPath, type AgendaEntry } from "@/data/agenda";
import { courseNumberLabel, formatCredit, plural } from "@/lib/agenda-time";
import styles from "./Agenda.module.css";

export function hasDetails(entry: AgendaEntry) {
  return Boolean(entry.moderators?.length || entry.instructors?.length || entry.speakersPanel);
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
  const moderators = entry.moderators ?? [];
  const instructors = entry.instructors ?? [];
  if (moderators.length === 0 && instructors.length === 0) return null;
  return (
    <dl className={styles.people}>
      {moderators.length > 0 ? <NameGroup label={plural(moderators.length, "Moderator", "Moderators")} names={moderators} /> : null}
      {instructors.length > 0 ? <NameGroup label="Panelists" names={instructors} /> : null}
    </dl>
  );
}

/** Link to this course's tab on the speakers page; SpeakerCourses opens the tab named by the hash. */
export function ViewSpeakersLink({ entry }: { entry: AgendaEntry }) {
  if (!entry.speakersPanel) return null;
  return (
    <a className={styles.speakersLink} href={`${speakersPath}#${entry.speakersPanel}`}>
      View speakers
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    </a>
  );
}
