"use client";

import { Fragment, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { AgendaEntry } from "@/data/agenda";
import { clock, formatDuration, formatRange } from "@/lib/agenda-time";
import { CourseLabel, CreditLine, People, ViewSpeakersLink, hasDetails } from "./AgendaParts";
import styles from "./Agenda.module.css";

const desktopQuery = "(min-width: 901px)";

/** Wide screens show a detail panel beside the rail; narrow screens expand the entry in place. */
function useIsDesktop() {
  return useSyncExternalStore(
    notify => {
      const query = window.matchMedia(desktopQuery);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => true,
  );
}

/** Row height tracks duration through `--minutes`, so a 15-minute break looks like one. Heights are minimums: long content grows its own row. */
const minutesStyle = (minutes: number) => ({ "--minutes": minutes }) as CSSProperties;

function Start({ entry }: { entry: AgendaEntry }) {
  const { text, meridiem } = clock(entry.start);
  return (
    <span className={styles.start}>
      <span className={styles.clock}>{text}</span>
      <span className={styles.meridiem}>{meridiem}</span>
    </span>
  );
}

function Rail({ marker }: { marker?: "course" | "plain" }) {
  return (
    <span className={styles.rail} aria-hidden="true">
      {marker ? <span className={marker === "course" ? `${styles.marker} ${styles.markerCourse}` : styles.marker} /> : null}
    </span>
  );
}

function EntrySummary({ entry }: { entry: AgendaEntry }) {
  return (
    <span className={styles.summary}>
      <CourseLabel entry={entry} />
      <span className={styles.title}>{entry.title}</span>
      {entry.subtitle ? <span className={styles.subtitle}>{entry.subtitle}</span> : null}
      <CreditLine entry={entry} />
    </span>
  );
}

function PlainBlock({ entry }: { entry: AgendaEntry }) {
  return (
    <div className={`${styles.block} ${styles.blockPlain}`}>
      <span className={styles.title}>{entry.title}</span>
      {entry.kind === "keynote" ? <span className={styles.range}>{formatRange(entry.start, entry.end)}</span> : null}
      <People entry={entry} />
    </div>
  );
}

interface DetailsCellProps {
  entry: AgendaEntry;
  open: boolean;
  controlsId: string;
  onToggle: () => void;
}

/** Select an entry in the wide panel or expand its details beneath the row on narrow screens. */
function DetailsCell({ entry, open, controlsId, onToggle }: DetailsCellProps) {
  if (!hasDetails(entry)) {
    return (
      <div className={`${styles.block} ${styles.blockCourse}`}>
        <EntrySummary entry={entry} />
      </div>
    );
  }
  const detailsId = `agenda-details-${entry.id}`;
  return (
    <div className={styles.cell}>
      <button type="button" className={styles.courseButton} aria-expanded={open} aria-controls={controlsId} onClick={onToggle}>
        <span className={`${styles.block} ${styles.blockCourse}`}>
          <EntrySummary entry={entry} />
          <span className={styles.more}>
            Details
            <svg className={styles.chevron} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </span>
        </span>
      </button>
      <div id={detailsId} className={styles.inline} data-open={open || undefined}>
        <div className={styles.inlineClip}>
          <div className={styles.inlineBody}>
            <People entry={entry} />
            <ViewSpeakersLink entry={entry} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailsPanel({ entry, animate }: { entry: AgendaEntry; animate: boolean }) {
  return (
    <article className={styles.panelBody} data-switched={animate || undefined}>
      <header className={styles.panelHeader}>
        <p className={styles.panelMeta}>
          <CourseLabel entry={entry} />
          <span className={styles.range}>{formatRange(entry.start, entry.end)}</span>
        </p>
        <h3 className={styles.panelTitle}>{entry.title}</h3>
        {entry.subtitle ? <p className={styles.panelSubtitle}>{entry.subtitle}</p> : null}
        <CreditLine entry={entry} />
      </header>
      <People entry={entry} />
      <ViewSpeakersLink entry={entry} />
    </article>
  );
}

export function AgendaTimeline({ entries }: { entries: readonly AgendaEntry[] }) {
  const isDesktop = useIsDesktop();
  const detailEntries = entries.filter(hasDetails);
  // Preserve the initial course selection; remarks join the same panel when selected.
  const [selectedId, setSelectedId] = useState(() => detailEntries.find(entry => entry.kind === "course")?.id ?? detailEntries[0]?.id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // The panel fades only after the visitor switches entries, never on first paint.
  const [switched, setSwitched] = useState(false);
  const selected = detailEntries.find(entry => entry.id === selectedId);

  const isOpen = (id: string) => (isDesktop ? selectedId === id : expandedId === id);
  const toggle = (id: string) => {
    if (isDesktop) {
      setSelectedId(id);
      setSwitched(true);
    } else {
      setExpandedId(current => (current === id ? null : id));
    }
  };

  return (
    <div className={styles.board}>
      <ol className={styles.list} aria-label="Agenda">
        {entries.map((entry, index) => {
          const previous = entries[index - 1];
          const gap = previous?.end === undefined ? 0 : entry.start - previous.end;
          // A start-only announcement occupies the rail until the next slot; it does not claim an end time.
          const layoutEnd = entry.end ?? entries[index + 1]?.start ?? entry.start;
          return (
            <Fragment key={entry.id}>
              {gap > 0 ? (
                <li className={`${styles.row} ${styles.gap}`} style={minutesStyle(gap)} aria-hidden="true">
                  <span />
                  <Rail />
                  <span />
                </li>
              ) : null}
              <li className={styles.row} style={minutesStyle(layoutEnd - entry.start)}>
                <Start entry={entry} />
                <Rail marker={entry.kind === "break" ? undefined : entry.kind === "course" ? "course" : "plain"} />
                {entry.kind === "break" ? (
                  <div className={`${styles.block} ${styles.blockBreak}`}>
                    {entry.title}{entry.end === undefined ? null : ` · ${formatDuration(entry.end - entry.start)}`}
                  </div>
                ) : entry.kind === "course" || hasDetails(entry) ? (
                  <DetailsCell
                    entry={entry}
                    open={isOpen(entry.id)}
                    controlsId={isDesktop ? "agenda-selected-details" : `agenda-details-${entry.id}`}
                    onToggle={() => toggle(entry.id)}
                  />
                ) : (
                  <PlainBlock entry={entry} />
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
      {selected ? (
        <aside id="agenda-selected-details" className={styles.panel} aria-live="polite" aria-label="Agenda details">
          <DetailsPanel key={selected.id} entry={selected} animate={switched} />
        </aside>
      ) : null}
    </div>
  );
}
