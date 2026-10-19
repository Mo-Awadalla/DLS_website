import { sitePath } from "@/lib/site-path";

/**
 * Agenda for the overview page. Sources: the organizers' day-of-event agenda and the four timed
 * course agendas submitted for CLE credit.
 *
 * Deliberate edits, each one reversible:
 *  - Omitted: the lengthy "CLE Description" paragraphs to keep the agenda focused, the credit
 *    boilerplate repeated in every PDF (shown once, see `agendaCredit`), "Esq."/"PhD" postnominals, and each
 *    course's timed outline (people only).
 *  - People marked "pending confirmation" carry `confirmed: false` and are never rendered. Christina Farrell,
 *    Nisha Agarwal, and Karol Mason are confirmed for Opening Remarks; the remaining names stay hidden.
 *  - Organizer corrections set keynote lunch to end at 1:15 p.m. and Closing Remarks to start at 3:45 p.m.
 *  - "Taa Graves" in the Justice Under Pressure PDF is written "Taa Grays" (agenda text and bio).
 *  - Course 4 uses the organizers' agenda title, which differs from the PDF and the speakers page's course title.
 */

export type EntryKind = "arrival" | "remarks" | "course" | "break" | "keynote" | "reception";

export interface Speaker {
  name: string;
  /** Role as supplied: "Commissioner", "President, John Jay College". */
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
  /** Omitted when only a start time is supplied, such as Closing Remarks. */
  end?: number;
  title: string;
  /** Text after the colon in a course title. */
  subtitle?: string;
  /** Approved course description shown in the agenda detail panel. */
  description?: string;
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

const FRIAS_COLON = "Justice Patria Frias-Colón";

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
        { name: "Christina Farrell", role: "Commissioner", confirmed: true },
        { name: "Karol Mason", role: "President, John Jay College", confirmed: true },
        { name: "Taa Grays", role: "President, New York State Bar Association", confirmed: true },
        { name: "Nisha Agarwal", role: "Commissioner", confirmed: true },
        { name: "Steve Banks", role: "Corporation Counsel, NYC Law Department", confirmed: true },
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
      description:
        "This course examines the expanding role of artificial intelligence and emerging technologies in emergency management and disaster legal practice. As jurisdictions adopt wider use and implementation of artificial intelligence and other emerging technologies, attorneys face new ethical and legal challenges. Panelists will assess how AI shapes public decision making, resource allocation, privacy considerations, and the legal rights of affected communities, particularly during moments of crisis when speed, accuracy, and bias mitigation are critical. The session explores risk governance, transparency, and accountability structures necessary to regulate AI tools used by governments, nonprofits, and private sector partners responding to disasters.",
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
      description:
        "This course explores the heightened vulnerability of civil liberties, due process, and equity during large scale disasters. When essential systems falter marginalized populations often experience disproportionate harm. Attorneys must navigate the tension between emergency operations and individual rights, ensuring legal protections remain intact even under extraordinary operational pressure. Panelists will analyze the ways disaster conditions can compound pre-existing inequities, discuss legal tools to safeguard rights, and examine strategies for advancing equitable outcomes through advocacy, planning and community partnership. One subject the panel will address is the Supreme Court’s 1999 decision in Olmstead v. L.C., interpreting Title II of the ADA’s integration mandate, including the potential impact of a recent opinion of the Federal Office of Legal Counsel’s (OLC), which adopts a narrow view of how the ADA’s integration mandate applies.",
      moderators: ["Dennis R. Boyd"],
      instructors: ["Michael Wasser", "Taa Grays", "Jason Rivera", "Jennifer Mathis"],
      credit: { hours: 1, category: "Diversity, Inclusion and Elimination of Bias" },
    },
    { id: "break-2", kind: "break", start: at(11, 45), end: at(12), title: "Break" },
    {
      id: "keynote-lunch",
      kind: "keynote",
      start: at(12),
      end: at(13, 15),
      title: "Keynote Address & Lunch",
      speakers: [{ name: "Jeh Johnson", role: "Former Secretary of the Department of Homeland Security", confirmed: true }],
    },
    {
      id: "firm-goes-dark",
      speakersPanel: "continuity",
      kind: "course",
      courseNumber: 3,
      start: at(13, 30),
      end: at(14, 30),
      title: "Ethical Duties When the Office Goes Dark: Continuity of Operations and Client Protection During Disasters",
      description:
        "Ethical Duties When the Office Goes Dark: Continuity of Operations and Client Protection During Disasters",
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
      description:
        "This course examines the emerging horizon of multifaceted and cascading disaster risks, focusing on the role of climate change as a key factor in (or catalyst of) those risks. Attorneys must be prepared for scenarios where multiple crises interact, amplify harm, and destabilize legal systems. Panelists will explore the climate change threats to New York City; anticipate challenges in insurance, landlord/tenant, and housing; consider lessons on preparedness for climate disasters from other regions; and assess frameworks for collaboration across different sectors, multi-hazard planning, and legal readiness. The session emphasizes forward looking strategies that equip lawyers to advise clients, institutions, and communities in an era of compounding risks and systemic volatility.",
      moderators: ["Robert DeVoogd", "Lucette Moran"],
      instructors: ["Brian Baer", "Timothy Fennell", "Alessandra Jerolleman", "Hilary Meltzer"],
      credit: { hours: 1, category: "Professional Practice" },
    },
    { id: "closing-remarks", kind: "remarks", start: at(15, 45), title: "Closing Remarks" },
    { id: "reception", kind: "reception", start: at(16), end: at(17), title: "Networking Reception" },
  ],
};

export function confirmedSpeakers(entry: AgendaEntry): readonly Speaker[] {
  return entry.speakers?.filter((speaker) => speaker.confirmed) ?? [];
}
