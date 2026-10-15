import { agenda, agendaCredit } from "@/data/agenda";
import { formatCredit, plural, summarize } from "@/lib/agenda-time";
import { publishedEvent } from "@/data/published-event";
import { AgendaTimeline } from "./AgendaTimeline";
import styles from "./Agenda.module.css";

export function AgendaSection() {
  const { courseCount, hours } = summarize(agenda);
  if (agenda.entries.length === 0) return null;
  return (
    <section className={styles.section} id="agenda" aria-labelledby="agenda-title">
      <div className={`page-shell ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Program · {publishedEvent.date.label}</p>
          <h2 id="agenda-title">Agenda</h2>
          {courseCount > 0 ? (
            <p>
              {courseCount} {plural(courseCount, "course", "courses")}
              {hours > 0 ? `, ${formatCredit(hours)} in all` : ""}. {agendaCredit}.
            </p>
          ) : null}
        </div>
        <AgendaTimeline entries={agenda.entries} />
      </div>
    </section>
  );
}
