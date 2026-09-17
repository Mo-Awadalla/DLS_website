import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";
import { venue } from "@/data/venue";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Venue & travel", description: "Venue, travel, accessibility, and accommodation information for Disaster Law Symposium 2026.", alternates: { canonical: "/venue" } };

export default function VenuePage() {
  return (
    <>
      <section className="page-hero page-hero-venue"><div className="page-shell page-hero-inner"><p className="kicker">Find your way here</p><h1>Make the<br /><em>connection.</em></h1><p>John Jay College of Criminal Justice is confirmed as the 2026 venue. This page will become your practical field guide as travel details are finalized.</p></div></section>
      <section className="section-pad venue-page"><div className="page-shell"><div className="venue-status"><div><p className="eyebrow"><span className="eyebrow-line" />Location status</p><h2>{venue.name}</h2><p>{venue.address}</p></div><Badge variant="muted" className="status-pill">Confirmed</Badge></div><div className="venue-grid"><div className="venue-map-placeholder"><div className="map-grid" /><span className="map-pin" aria-hidden="true">+</span><p>John Jay College</p><small>Map and directions will be published before the symposium.</small></div><div className="venue-details"><section><h3>Travel</h3>{venue.transit.map((item) => <p key={item}>{item}</p>)}</section><section><h3>Accessibility</h3>{venue.accessibility.map((item) => <p key={item}>{item}</p>)}</section><section><h3>Stay nearby</h3><p>{venue.accommodations}</p></section></div></div></div></section>
      <section className="venue-callout"><div className="page-shell venue-callout-inner"><div><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />Questions or access needs?</p><h2>We want the day to work for you.</h2></div><a className="button button-ghost" href={`mailto:${siteConfig.contactEmail}`}>Contact the team <span aria-hidden="true">↗</span></a></div></section>
    </>
  );
}
