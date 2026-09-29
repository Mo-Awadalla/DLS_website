"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { publishedEvent as event } from "@/data/published-event";
import styles from "./VenuePage.module.css";

const directionsUrl = (name: string, address: string, cityState: string, zip: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${address}, ${cityState} ${zip}`)}`;
const venueMapUrl = directionsUrl(event.venue.name, event.venue.address, event.venue.cityState, event.venue.zip);
const hotelMapUrl = directionsUrl(event.hotel.name, event.hotel.address, event.hotel.cityState, event.hotel.zip);
const destinations = [
  { id: "venue", label: "Venue", name: event.venue.name, address: event.venue.address, mapUrl: venueMapUrl, street: "West 59th Street" },
  { id: "hotel", label: "Hotel", name: event.hotel.name, address: event.hotel.address, mapUrl: hotelMapUrl, street: "West 54th Street" },
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

function DestinationMap({ destination }: { destination: (typeof destinations)[number] }) {
  const targetY = destination.id === "venue" ? 142 : 230;
  const mapTitleId = `map-title-${destination.id}`;
  const mapDescriptionId = `map-description-${destination.id}`;

  return (
    <>
      <div className={styles.mapFrame}>
        <svg className={styles.mapArtwork} viewBox="0 0 720 340" role="img" aria-labelledby={`${mapTitleId} ${mapDescriptionId}`} preserveAspectRatio="xMinYMid slice">
          <title id={mapTitleId}>{destination.name}</title>
          <desc id={mapDescriptionId}>A simple street-grid schematic marking {destination.address}. It is not to scale and does not show a walking route.</desc>
          <rect className={styles.mapGround} width="720" height="340" />
          <g className={styles.mapRoads} aria-hidden="true">
            <path d="M0 56H720 M0 142H720 M0 230H720 M0 316H720" />
            <path d="M72 0V340 M192 0V340 M312 0V340 M432 0V340 M552 0V340 M672 0V340" />
          </g>
          <g className={styles.mapGridEdges} aria-hidden="true">
            <path d="M0 39H720 M0 73H720 M0 125H720 M0 159H720 M0 213H720 M0 247H720 M0 299H720 M0 333H720" />
            <path d="M55 0V340 M89 0V340 M175 0V340 M209 0V340 M295 0V340 M329 0V340 M415 0V340 M449 0V340 M535 0V340 M569 0V340 M655 0V340 M689 0V340" />
          </g>
          <path className={styles.mapTargetStreet} d={`M0 ${targetY}H720`} aria-hidden="true" />
          <text className={styles.mapStreetLabel} x="20" y={targetY - 13} aria-hidden="true">{destination.street.toUpperCase()}</text>
          <g className={styles.mapMarker} transform={`translate(310 ${targetY})`} aria-hidden="true">
            <circle className={styles.mapMarkerHalo} r="25" />
            <path className={styles.mapMarkerShape} d="M0-20c-10.5 0-19 8.3-19 18.6C-19 13 0 30 0 30S19 13 19-1.4C19-11.7 10.5-20 0-20Z" />
            <circle className={styles.mapMarkerCore} cy="-2" r="5.5" />
          </g>
        </svg>
        <span className={styles.mapScale}>Schematic · not to scale</span>
      </div>
      <div className={styles.mapCaption}><span>{destination.address}</span><ExternalLink href={destination.mapUrl} label={`Get directions to ${destination.name}`}>Get directions</ExternalLink></div>
      <p className={styles.mapFallback}>Open directions in Google Maps for a route to this location.</p>
    </>
  );
}

export function VenueExperience() {
  const [destination, setDestination] = useState("venue");
  return (
    <div className={styles.page}>
      <div className={styles.masthead} aria-hidden="true" />
      <section className={`page-shell ${styles.sheet}`} aria-labelledby="venue-title">
        <div className={styles.introduction}>
          <h1 id="venue-title"><span>Venue</span>{" "}<span className={styles.ampersand}>&amp;</span>{" "}<span>Travel</span></h1>
          <div className={styles.mobileActions}><ExternalLink href={venueMapUrl} label="Get venue directions">Directions</ExternalLink><ExternalLink href={event.hotel.bookingUrl} label="Book the attendee hotel">Book a room</ExternalLink></div>
        </div>
        <section className={styles.venue} id="venue" aria-labelledby="location-title">
          <h2 id="location-title">{event.venue.name}</h2><p className={styles.role}>Symposium venue</p>
          <address className={styles.address}>{event.venue.address}<br />{event.venue.cityState} {event.venue.zip}</address>
          <ExternalLink href={venueMapUrl} label="Get directions to John Jay College">Venue directions</ExternalLink>
          <div className={styles.arrival}><h3>On arrival</h3><p>Room, entrance, and arrival details will be shared closer to the event.</p></div>
        </section>
        <section className={styles.travel} id="travel" aria-labelledby="travel-title">
          <h2 id="travel-title">Find your way.</h2>
          <Tabs value={destination} onValueChange={setDestination} className={styles.destinationTabs}>
            <TabsList aria-label="Map destination" className={styles.tabsList}>
              {destinations.map(item => <TabsTrigger key={item.id} value={item.id} className={styles.tabsTrigger}>{item.label}</TabsTrigger>)}
              <span className={`${styles.tabIndicator} ${destination === "hotel" ? styles.hotelSelected : ""}`} aria-hidden="true" />
            </TabsList>
            {destinations.map(item => <TabsContent key={item.id} value={item.id} className={styles.tabContent}><DestinationMap destination={item} /></TabsContent>)}
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
        </section>
      </section>
      <section className={styles.bookingBand} aria-labelledby="booking-title">
        <div className={`page-shell ${styles.bookingLayout}`}>
          <div><h2 id="booking-title"><a href={`tel:${event.hotel.phone.replace(/\s/g, "")}`}>{event.hotel.phone}</a></h2><p>A group rate is available for symposium attendees.</p></div>
          <dl className={styles.bookingDeadline}><dt>Book by</dt><dd><time dateTime={event.hotel.bookingDeadlineIso}>{event.hotel.bookingDeadline}</time></dd></dl>
          <div className={styles.bookingAction}><ExternalLink href={event.hotel.bookingUrl} className={styles.bookingButton} label="Book your room with Hilton">Book your room</ExternalLink><p>Reserve directly with Hilton</p></div>
        </div>
      </section>
      <div className={`page-shell ${styles.closingRule}`} />
    </div>
  );
}
