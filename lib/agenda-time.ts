import type { Agenda } from "@/data/agenda";

const pluralRules = new Intl.PluralRules("en-US");
const hoursFormat = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

export function plural(count: number, one: string, other: string) {
  return pluralRules.select(count) === "one" ? one : other;
}

export function clock(minutes: number) {
  const hour24 = Math.floor(minutes / 60) % 24;
  const minute = minutes % 60;
  return {
    text: `${hour24 % 12 || 12}:${String(minute).padStart(2, "0")}`,
    meridiem: hour24 < 12 ? "a.m." : "p.m.",
  };
}

/** "9:30–10:30 a.m." or "11:45 a.m.–12:00 p.m."; the meridiem is stated once when both ends share it. */
export function formatRange(start: number, end: number) {
  const from = clock(start);
  const to = clock(end);
  return from.meridiem === to.meridiem
    ? `${from.text}\u2013${to.text} ${to.meridiem}`
    : `${from.text} ${from.meridiem}\u2013${to.text} ${to.meridiem}`;
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}

export function formatCredit(hours: number) {
  return `${hoursFormat.format(hours)} ${plural(hours, "credit", "credits")}`;
}

export function courseNumberLabel(number: number) {
  return String(number).padStart(2, "0");
}

export function summarize(agenda: Agenda) {
  const courses = agenda.entries.filter((entry) => entry.kind === "course");
  const hours = courses.reduce((total, entry) => total + (entry.credit?.hours ?? 0), 0);
  return { courseCount: courses.length, hours };
}

