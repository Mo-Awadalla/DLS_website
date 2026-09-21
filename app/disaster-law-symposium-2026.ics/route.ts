import { overview } from "@/data/overview";

export const dynamic = "force-static";

// RFC 5545 TEXT escaping and CRLF folding at no more than 75 UTF-8 octets.
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

export function GET() {
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NYC Emergency Management//Disaster Law Symposium//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:disaster-law-symposium-2026@oem.nyc.gov",
    "DTSTAMP:20260921T000000Z",
    `DTSTART;VALUE=DATE:${overview.date.calendarStart}`,
    `DTEND;VALUE=DATE:${overview.date.calendarEnd}`,
    `SUMMARY:${calendarText(`${overview.title}: ${overview.theme}`)}`,
    `LOCATION:${calendarText(`${overview.venue.name}, New York City`)}`,
    `DESCRIPTION:${calendarText(`${overview.tagline} Timing and registration details will follow. Room and arrival details will follow. Contact: ${overview.contactEmail}`)}`,
    `URL:${overview.canonicalUrl}`,
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
    "END:VCALENDAR",
  ].map(foldLine).join("\r\n") + "\r\n";

  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="disaster-law-symposium-2026.ics"',
    },
  });
}
