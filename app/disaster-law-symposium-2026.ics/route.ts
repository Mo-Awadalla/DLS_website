import { publishedEvent } from "@/data/published-event";
import { renderCalendar } from "@/lib/calendar";

export const dynamic = "force-static";

export function GET() {
  const calendar = renderCalendar(publishedEvent);
  const filename = publishedEvent.calendarPath.split("/").pop() || "event.ics";

  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
