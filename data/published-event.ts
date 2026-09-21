import manifest from "@/release-manifest.json";
import { canonicalUrl, sitePath } from "@/lib/site-path";

export type PublishedTopic = Readonly<{
  id: string;
  title: string;
  summary: string;
}>;

export type PublishedEvent = Readonly<{
  name: string;
  title: string;
  theme: string;
  themeDisplay: readonly [string, string];
  tagline: string;
  date: Readonly<{
    label: string;
    iso: string;
    calendarStart: string;
    calendarEnd: string;
  }>;
  venue: Readonly<{
    name: string;
    area: string;
    city: string;
    mapUrl: string;
  }>;
  organization: string;
  contact: Readonly<{
    email: string;
  }>;
  canonicalUrl: string;
  description: string;
  calendarPath: string;
  announcement: string;
  introduction: string;
  topics: readonly PublishedTopic[];
}>;

/** The only active source for approved, published event facts and copy. */
export const publishedEvent = {
  name: "Disaster Law Symposium",
  title: "Disaster Law Symposium 2026",
  theme: "Law at the Crossroads",
  themeDisplay: ["Law at the", "Crossroads."] as const,
  tagline: "Strengthening systems for a new era of disasters.",
  date: {
    label: "October 29, 2026",
    iso: "2026-10-29",
    calendarStart: "20261029",
    calendarEnd: "20261030",
  },
  venue: {
    name: "John Jay College of Criminal Justice",
    area: "Manhattan / New York City",
    city: "New York City",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=John+Jay+College+of+Criminal+Justice+New+York+City",
  },
  organization: "New York City Emergency Management",
  contact: {
    email: "disasterlawsymposium@oem.nyc.gov",
  },
  canonicalUrl: canonicalUrl(),
  description:
    "Disaster Law Symposium 2026: Law at the Crossroads. October 29, 2026 at John Jay College of Criminal Justice in New York City. Explore AI governance, rights and equity, continuity of representation, and cascading disaster risks.",
  calendarPath: sitePath(manifest.routes.calendar),
  announcement: "Program, speaker, and registration details will be announced.",
  introduction:
    "Disasters test the systems people depend on—and the laws that hold them together. This symposium brings four connected questions into focus: how we govern emerging technology, protect rights, sustain legal representation, and prepare for overlapping crises.",
  topics: [
    {
      id: "ai-governance",
      title: "AI governance",
      summary: "Accountability, transparency, and privacy when artificial intelligence informs emergency decisions and the allocation of resources.",
    },
    {
      id: "rights-and-equity",
      title: "Rights and equity",
      summary: "Protecting civil liberties and due process, and addressing the unequal impacts of disasters on communities.",
    },
    {
      id: "continuity-of-representation",
      title: "Continuity of legal representation",
      summary: "Maintaining client communication, confidentiality, and representation when outages or displacement disrupt legal practice.",
    },
    {
      id: "cascading-risks",
      title: "Cascading disaster risks",
      summary: "Legal preparedness for climate events, infrastructure failures, cyber incidents, and other emergencies that compound one another.",
    },
  ],
} as const satisfies PublishedEvent;
