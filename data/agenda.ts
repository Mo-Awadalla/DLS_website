import { sitePath } from "@/lib/site-path";

/**
 * Agenda for the overview page. Sources: the owner's day-of-event agenda (October 2026) and the four timed
 * course agendas submitted for CLE credit. The owner approved publication with the production release.
 *
 * Deliberate edits, each one reversible by the owner:
 *  - Omitted: the lengthy "CLE Description" paragraphs to keep the agenda focused, the credit
 *    boilerplate repeated in every PDF (shown once, see `agendaCredit`), "Esq."/"PhD" postnominals, and each
 *    course's timed outline (people only).
 *  - People marked "pending confirmation" carry `confirmed: false` and are never rendered. Every Opening Remarks
 *    speaker is unconfirmed for now, so that entry shows no names; flip each flag when confirmed.
 *  - "12:00 p.m. and 1:30 p.m." is the keynote lunch, 12:00 p.m. to 1:30 p.m.
 *  - "Taa Graves" in the Justice Under Pressure PDF is written "Taa Grays" (agenda text and bio).
 *  - Course 4 uses the owner's agenda title, which differs from the PDF and the speakers page's course title.
 */

export type EntryKind = "arrival" | "remarks" | "course" | "break" | "keynote" | "reception";

export interface Speaker {
  name: string;
  /** Role as the owner wrote it: "Commissioner", "President, John Jay College". */
  role?: string;
  /** Unconfirmed people stay in the data but are never rendered. */
  confirmed: boolean;
}

export interface Credit {
  hours: number;
  category: string;
}

export interface AgendaEntry {
  id: string;
  kind: EntryKind;
  /** Minutes after midnight. */
  start: number;
  end: number;
  title: string;
  /** Text after the colon in a course title. */
  subtitle?: string;
  /** 1-based course order within the day's agenda. */
  courseNumber?: number;
  speakers?: readonly Speaker[];
  moderators?: readonly string[];
  instructors?: readonly string[];
  credit?: Credit;
  /** Course id on the speakers page (`speakerGroups` in data/speakers.ts); "View speakers" links to `/speakers/#<id>`. */
  speakersPanel?: string;
}

export interface Agenda {
  entries: readonly AgendaEntry[];
}

/** Credit terms shared by every course in the source PDFs. Shown once, not per course. */
export const agendaCredit = "Transitional and non-transitional credit";

/** Where "View speakers" links point. Each course adds `#<speakersPanel>`; the speakers page opens that course's tab. */
export const speakersPath = sitePath("/speakers/");

/** Minutes after midnight. */
export const at = (hour: number, minute = 0) => hour * 60 + minute;

const FRIAS_COLON = "Hon. Patria Frias-Colón";

export const agenda: Agenda = {
  entries: [
    { id: "registration", kind: "arrival", start: at(8, 30), end: at(9), title: "Registration and Morning Reception" },
    {
      id: "opening-remarks",
      kind: "remarks",
      start: at(9),
      end: at(9, 30),
      title: "Opening Remarks",
      speakers: [
        { name: "Christina Farrell", role: "Commissioner", confirmed: false },
        { name: "Nisha Agarwal", role: "Commissioner", confirmed: false },
        { name: "Karol Mason", role: "President, John Jay College", confirmed: false },
        { name: "Taa Grays", role: "President, New York State Bar Association", confirmed: false },
        { name: "Steve Banks", role: "Corporation Counsel, NYC Law Department", confirmed: false },
      ],
    },
    {
      id: "algorithmic-response",
      speakersPanel: "ai",
      kind: "course",
      courseNumber: 1,
      start: at(9, 30),
      end: at(10, 30),
      title: "Algorithmic Response",
      subtitle: "Governing Artificial Intelligence and Emerging Technologies in Emergencies",
      moderators: ["Traci Wheelwright"],
      instructors: [FRIAS_COLON, "Rebecca Lipman", "Marissa Moran", "Susan Garcia Nofi"],
      credit: { hours: 1, category: "Cybersecurity (General)" },
    },
    { id: "break-1", kind: "break", start: at(10, 30), end: at(10, 45), title: "Break" },
    {
      id: "justice-under-pressure",
      speakersPanel: "rights-equity",
      kind: "course",
      courseNumber: 2,
      start: at(10, 45),
      end: at(11, 45),
      title: "Justice Under Pressure",
      subtitle: "Protecting Rights and Advancing Equity During Disasters",
      moderators: ["Dennis R. Boyd"],
      instructors: ["Michael Wasser", "Taa Grays", "Jason Rivera", "Jennifer Mathis"],
      credit: { hours: 1, category: "Diversity, Inclusion and Elimination of Bias" },
    },
    { id: "break-2", kind: "break", start: at(11, 45), end: at(12), title: "Break" },
    {
      id: "keynote-lunch",
      kind: "keynote",
      start: at(12),
      end: at(13, 30),
      title: "Keynote Address & Lunch",
      speakers: [{ name: "Jeh Johnson", role: "Secretary", confirmed: true }],
    },
    {
      id: "firm-goes-dark",
      speakersPanel: "continuity",
      kind: "course",
      courseNumber: 3,
      start: at(13, 30),
      end: at(14, 30),
      title: "When the Firm Goes Dark",
      subtitle: "Ethical Duties, Continuity of Operations, and Client Protection During Disasters",
      moderators: ["Sonja Orgias"],
      instructors: ["Clay Garner", "Seth Rosner", FRIAS_COLON],
      credit: { hours: 1, category: "Ethics" },
    },
    { id: "break-3", kind: "break", start: at(14, 30), end: at(14, 45), title: "Break" },
    {
      id: "next-disaster-landscape",
      speakersPanel: "cascading-risks",
      kind: "course",
      courseNumber: 4,
      start: at(14, 45),
      end: at(15, 45),
      title: "The Next Disaster Landscape",
      subtitle: "Legal Preparedness for Cascading and Complex Risks",
      moderators: ["Robert DeVoogd", "Lucette Moran"],
      instructors: ["Brian Baer", "Timothy Fennell", "Alessandra Jerolleman", "Hilary Meltzer"],
      credit: { hours: 1, category: "Professional Practice" },
    },
    { id: "reception", kind: "reception", start: at(16), end: at(17), title: "Networking Reception" },
  ],
};

export function confirmedSpeakers(entry: AgendaEntry): readonly Speaker[] {
  return entry.speakers?.filter((speaker) => speaker.confirmed) ?? [];
}
