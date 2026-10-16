import { publishedEvent } from "@/data/published-event";

export function AttendanceNotice() {
  return (
    <aside className="attendance-note" aria-label="Attendance information">
      <p>Please be reminded that this event is in-person only.</p>
    </aside>
  );
}

export function RegistrationDisclosure() {
  return (
    <p className="registration-disclosure">
      NYS Bar Association is the NYS Continuing Legal Education (CLE) Accredited Provider for this in-person event. By accessing{" "}
      <a href={publishedEvent.registrationUrl} target="_blank" rel="noopener noreferrer">this link</a>, you will be redirected to the NYS Bar Association website to register your attendance.
    </p>
  );
}
