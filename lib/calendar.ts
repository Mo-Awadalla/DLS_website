import type { PublishedEvent } from "@/data/published-event";

function calendarText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

function foldLine(line: string) {
  const lines: string[] = [];
  let current = "";
  for (const character of line) {
    if (Buffer.byteLength(current + character, "utf8") > 75) {
      lines.push(current);
      current = " ";
    }
    current += character;
  }
  return [...lines, current].join("\r\n");
}

/** Render an RFC 5545 calendar without reading process state or writing a response. */
export function renderCalendar(event: PublishedEvent) {
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NYC Emergency Management//Disaster Law Symposium//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:disaster-law-symposium-2026@oem.nyc.gov",
    "DTSTAMP:20260921T000000Z",
    `DTSTART;VALUE=DATE:${event.date.calendarStart}`,
    `DTEND;VALUE=DATE:${event.date.calendarEnd}`,
    `SUMMARY:${calendarText(`${event.title}: ${event.theme}`)}`,
    `LOCATION:${calendarText(`${event.venue.name}, ${event.venue.city}`)}`,
    `DESCRIPTION:${calendarText(`${event.tagline} Timing and registration details will follow. Room and arrival details will follow. Contact: ${event.contact.email}`)}`,
    `URL:${event.canonicalUrl}`,
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
    "END:VCALENDAR",
  ].map(foldLine).join("\r\n") + "\r\n";

  return calendar;
}
