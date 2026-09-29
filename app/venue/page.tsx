import type { Metadata } from "next";
import { publishedEvent } from "@/data/published-event";
import { VenueExperience } from "./VenueExperience";

export const metadata: Metadata = {
  title: "Venue & Travel",
  description: `${publishedEvent.title} takes place at ${publishedEvent.venue.name}, ${publishedEvent.venue.address}, ${publishedEvent.venue.cityState} ${publishedEvent.venue.zip}. Plan your visit and book attendee accommodations at ${publishedEvent.hotel.name}.`,
};

export default function VenuePage() {
  return <VenueExperience />;
}
