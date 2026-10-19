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
    address: string;
    accessibilityEntranceAddress: string;
    accommodations: Readonly<{
      availability: string;
      instruction: string;
      email: string;
    }>;
    cityState: string;
    zip: string;
    area: string;
    city: string;
  }>;
  hotel: Readonly<{
    name: string;
    address: string;
    cityState: string;
    zip: string;
    phone: string;
    bookingUrl: string;
    bookingDeadline: string;
    bookingDeadlineIso: string;
    walkingDistance: string;
  }>;
  organization: string;
  contact: Readonly<{
    email: string;
  }>;
  canonicalUrl: string;
  description: string;
  calendarPath: string;
  registrationUrl: string;
  introduction: string;
  topics: readonly PublishedTopic[];
}>;

/** The only active source for approved, published event facts and copy. */
export const publishedEvent = {
  name: "Disaster Law Symposium",
  title: "Disaster Law Symposium 2026",
  theme: "Law at the Crossroads",
  themeDisplay: ["Law at the", "Crossroads."] as const,
  tagline: "Strengthening systems for a new era of disasters",
  date: {
    label: "October 29, 2026",
    iso: "2026-10-29",
    calendarStart: "20261029",
    calendarEnd: "20261030",
  },
  venue: {
    name: "John Jay College of Criminal Justice",
    address: "524 West 59th Street",
    // John Jay Public Safety: https://www.jjay.cuny.edu/about/senior-leadership/finance-administration/public-safety/public-safety-desk-locations-hours
    accessibilityEntranceAddress: "860 Eleventh Avenue",
    accommodations: {
      availability: "This event will include wheelchair-accessible entrances and restrooms, American Sign Language (ASL) interpretation, and CART (real-time captioning).",
      instruction: "To request additional accommodations or modifications, please email us at",
      email: "legalsymposiuminfo@oem.nyc.gov",
    },
    cityState: "New York, NY",
    zip: "10019",
    area: "Manhattan / New York City",
    city: "New York City",
  },
  hotel: {
    name: "Hilton Garden Inn New York/Central Park South-Midtown West",
    address: "237 West 54th Street",
    cityState: "New York, NY",
    zip: "10019",
    phone: "+1 212-253-6000",
    bookingUrl: "https://www.hilton.com/en/attend-my-event/disasterlawsymposiumoct2026/",
    bookingDeadline: "October 19, 2026",
    bookingDeadlineIso: "2026-10-19",
    walkingDistance: "10-minute walk from venue",
  },
  organization: "New York City Emergency Management",
  contact: {
    email: "disasterlawsymposium@oem.nyc.gov",
  },
  canonicalUrl: canonicalUrl(),
  description:
    "Disaster Law Symposium 2026: Law at the Crossroads. October 29, 2026 at John Jay College of Criminal Justice in New York City. Explore four courses: Algorithmic Response, Justice Under Pressure, When the Firm Goes Dark, and Climate Change, The Next Disaster Landscape.",
  calendarPath: sitePath(manifest.routes.calendar),
  registrationUrl: "https://nysba.org/events/2026-disaster-law-symposium/",
  introduction:
    "Disasters test the systems people depend on and the laws that hold them together. This symposium brings four connected questions into focus: how we govern emerging technology, protect rights, sustain legal operations, and prepare for overlapping crises.",
  topics: [
    {
      id: "algorithmic-response",
      title: "Algorithmic Response: Governing Artificial Intelligence and Emerging Technologies in Emergencies",
      summary: "Accountability, transparency, and privacy when artificial intelligence informs emergency decisions and the allocation of resources.",
    },
    {
      id: "justice-under-pressure",
      title: "Justice Under Pressure: Protecting Rights and Advancing Equity During Disasters",
      summary: "Protecting civil liberties and due process, and addressing the unequal impacts of disasters on communities.",
    },
    {
      id: "when-the-firm-goes-dark",
      title: "Ethical Duties When the Office Goes Dark: Continuity of Operations and Client Protection During Disasters",
      summary: "Addressing the ethical and operational challenges attorneys face when disaster conditions disrupt business operations, government offices, legal service organizations or the courts.",
    },
    {
      id: "climate-change-next-disaster-landscape",
      title: "Climate Change, The Next Disaster Landscape: Legal Preparedness for Cascading and Complex Risks",
      summary: "Legal preparedness for climate events, infrastructure failures, cyber incidents, and other emergencies that compound one another.",
    },
  ],
} as const satisfies PublishedEvent;
