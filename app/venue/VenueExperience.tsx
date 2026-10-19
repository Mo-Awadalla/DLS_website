"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceNotice } from "@/components/EventNotices";
import { publishedEvent as event } from "@/data/published-event";
import styles from "./VenuePage.module.css";

const directionsUrl = (name: string, address: string, cityState: string, zip: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${address}, ${cityState} ${zip}`)}`;
const venueMapUrl = directionsUrl(event.venue.name, event.venue.address, event.venue.cityState, event.venue.zip);
const accessibilityMapUrl = directionsUrl(event.venue.name, event.venue.accessibilityEntranceAddress, event.venue.cityState, event.venue.zip);
const hotelMapUrl = directionsUrl(event.hotel.name, event.hotel.address, event.hotel.cityState, event.hotel.zip);
const venueEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${event.venue.name}, ${event.venue.address}, ${event.venue.cityState} ${event.venue.zip}`)}&output=embed`;
const hotelEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${event.hotel.name}, ${event.hotel.address}, ${event.hotel.cityState} ${event.hotel.zip}`)}&output=embed`;
const destinations = [
  { id: "venue", label: "Venue", name: event.venue.name, address: event.venue.address, mapUrl: venueMapUrl, embedUrl: venueEmbedUrl },
  { id: "hotel", label: "Hotel", name: event.hotel.name, address: event.hotel.address, mapUrl: hotelMapUrl, embedUrl: hotelEmbedUrl },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <><path d="M7 7h10v10" /><path d="M17 7 7 17" /></> : <><path d="M4 12h16" /><path d="m14 6 6 6-6 6" /></>}
    </svg>
  );
}

function ExternalLink({ href, children, className = styles.link, label }: { href: string; children: ReactNode; className?: string; label: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>{children}<Arrow diagonal /></a>;
}

function DestinationMap({ destination, fadeIn }: { destination: (typeof destinations)[number]; fadeIn: boolean }) {
  // The first map renders visible so a failed script never hides it; later swaps fade in once loaded.
  const [loaded, setLoaded] = useState(!fadeIn);
  useEffect(() => {
    if (loaded) return;
    const fallback = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(fallback);
  }, [loaded]);
  return (
    <>
      <div className={styles.mapFrame}>
        <iframe
          className={styles.mapEmbed}
          data-loaded={loaded}
          onLoad={() => setLoaded(true)}
          src={destination.embedUrl}
          title={`Map showing ${destination.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className={styles.mapCaption}><span>{destination.address}</span><ExternalLink href={destination.mapUrl} label={`Get directions to ${destination.name}`}>Get directions</ExternalLink></div>
    </>
  );
}

export function VenueExperience() {
  const [destination, setDestination] = useState("venue");
  const [switched, setSwitched] = useState(false);
  return (
    <div className={styles.page}>
      <div className={styles.masthead} aria-hidden="true" />
      <section className={`page-shell ${styles.sheet}`} aria-labelledby="venue-title">
        <div className={styles.introduction}>
          <h1 id="venue-title"><span>Venue</span>{" "}<span className={styles.ampersand}>&amp;</span>{" "}<span>Travel</span></h1>
          <AttendanceNotice />
          <div className={styles.mobileActions}><ExternalLink href={venueMapUrl} label="Get venue directions">Directions</ExternalLink><ExternalLink href={event.hotel.bookingUrl} label="Book the attendee hotel">Book a room</ExternalLink></div>
        </div>
        <section className={styles.venue} id="venue" aria-labelledby="location-title">
          <h2 id="location-title">{event.venue.name}</h2><p className={styles.role}>Symposium venue</p>
          <address className={styles.address}>{event.venue.address}<br />{event.venue.cityState} {event.venue.zip}</address>
          <ExternalLink href={venueMapUrl} label="Get directions to John Jay College">Venue directions</ExternalLink>
          <div className={styles.arrival}>
            <h3>Accessibility Entrance</h3>
            <address className={styles.address}>{event.venue.accessibilityEntranceAddress}<br />{event.venue.cityState} {event.venue.zip}</address>
            <ExternalLink href={accessibilityMapUrl} label="Get directions to the John Jay College accessibility entrance">Accessibility entrance directions</ExternalLink>
          </div>
          <div className={styles.arrival} id="accommodations">
            <h3>Accommodations</h3>
            <p>{event.venue.accommodations.availability}</p>
            <p>
              {event.venue.accommodations.instruction}{" "}
              <a className={styles.accommodationsLink} href={`mailto:${event.venue.accommodations.email}`}>{event.venue.accommodations.email}</a>
            </p>
          </div>
          <div className={styles.arrival}><h3>On arrival</h3><p>Room and other arrival details will be shared closer to the event.</p></div>
        </section>
        <section className={styles.travel} id="travel" aria-labelledby="travel-title">
          <h2 id="travel-title">Find your way.</h2>
          <Tabs value={destination} onValueChange={value => { setSwitched(true); setDestination(value); }} className={styles.destinationTabs}>
            <TabsList aria-label="Map destination" className={styles.tabsList}>
              {destinations.map(item => <TabsTrigger key={item.id} value={item.id} className={styles.tabsTrigger}>{item.label}</TabsTrigger>)}
              <span className={`${styles.tabIndicator} ${destination === "hotel" ? styles.hotelSelected : ""}`} aria-hidden="true" />
            </TabsList>
            {destinations.map(item => <TabsContent key={item.id} value={item.id} className={styles.tabContent}><DestinationMap destination={item} fadeIn={switched} /></TabsContent>)}
          </Tabs>
        </section>
        <section className={styles.hotel} id="hotel" aria-labelledby="hotel-title">
          <div>
          <h2 id="hotel-title">{event.hotel.name}</h2><p className={styles.role}>Attendee hotel</p>
          </div>
          <div>
          <address className={styles.address}>{event.hotel.address}<br />{event.hotel.cityState} {event.hotel.zip}</address>
          <p className={styles.walk}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="4" r="2" /><path d="m7 21 4-7m5 7-3-8 1-6m-7 6 3-4 4-2 3 5 4 1" /></svg>{event.hotel.walkingDistance}</p>
          </div>
          <div className={styles.bookingBand} aria-labelledby="booking-title">
            <div className={styles.bookingLayout}>
              <div>
                <h3 id="booking-title">Reserve directly with Hilton</h3>
                <p>A group rate is available for symposium attendees.</p>
                <dl className={styles.bookingDeadline}><dt>Book by</dt><dd><time dateTime={event.hotel.bookingDeadlineIso}>{event.hotel.bookingDeadline}</time></dd></dl>
              </div>
              <div className={styles.bookingAction}>
                <ExternalLink href={event.hotel.bookingUrl} className={styles.bookingButton} label="Book your room with Hilton">Book your room</ExternalLink>
                <a className={styles.hotelPhone} href={`tel:${event.hotel.phone.replace(/\s/g, "")}`}>{event.hotel.phone}</a>
              </div>
            </div>
          </div>
        </section>
      </section>
      <div className={`page-shell ${styles.closingRule}`} />
    </div>
  );
}
