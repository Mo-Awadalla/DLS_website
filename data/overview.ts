import { sitePath } from "@/lib/site-path";

/** Approved Phase 1 content. Keep independent of draft agenda and speaker data. */
type OverviewContent = {
  name: string;
  title: string;
  theme: string;
  tagline: string;
  date: { label: string; iso: string; calendarStart: string; calendarEnd: string };
  venue: { name: string; area: string; mapUrl: string };
  organization: string;
  contactEmail: string;
  canonicalUrl: string;
  description: string;
  calendarPath: string;
  announcement: string;
  introduction: string;
  topics: readonly { id: string; title: string; summary: string }[];
};

export const overview: OverviewContent = {
  name: "Disaster Law Symposium",
  title: "Disaster Law Symposium 2026",
  theme: "Law at the Crossroads",
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
    mapUrl: "https://www.google.com/maps/search/?api=1&query=John+Jay+College+of+Criminal+Justice+New+York+City",
  },
  organization: "New York City Emergency Management",
  contactEmail: "disasterlawsymposium@oem.nyc.gov",
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mo-awadalla.github.io/DLS_website",
  description:
    "Disaster Law Symposium 2026: Law at the Crossroads. October 29, 2026 at John Jay College of Criminal Justice in New York City. Explore AI governance, rights and equity, continuity of representation, and cascading disaster risks.",
  calendarPath: sitePath("/disaster-law-symposium-2026.ics"),
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
};
