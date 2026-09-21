import Image from "next/image";
import { sessions } from "@/data/sessions";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Redesign directions staging",
  description: "Five full-page redesign directions for the Disaster Law Symposium 2026 homepage.",
};

const programSessions = sessions.filter((session) => session.type === "course");
const signalSessions = sessions.filter((session) => ["course", "keynote", "reception"].includes(session.type));
const archiveIssues = ["Automation", "Equity", "Continuity", "Cascading risk"];

function DirectionLabel({ number, name, note }: { number: string; name: string; note: string }) {
  return (
    <div className="redesign-direction-label">
      <span>{number}</span>
      <strong>{name}</strong>
      <p>{note}</p>
    </div>
  );
}

function CityDesk() {
  return (
    <article className="redesign-direction redesign-city-desk" id="city-desk">
      <DirectionLabel number="01" name="City Desk / Broadsheet" note="Editorial · grounded · specific" />
      <div className="city-desk-shell">
        <header className="city-desk-masthead">
          <Image className="staging-logo city-desk-logo" src="/assets/nycem-logo.png" alt="New York City Emergency Management" width={164} height={60} />
          <span>Disaster Law Symposium 2026</span>
          <span>Issue 01 · October 29</span>
        </header>

        <section className="city-desk-hero">
          <div className="city-desk-date" aria-label="October 29, 2026">
            <strong>29</strong>
            <span>OCT<br />2026</span>
          </div>
          <div className="city-desk-title">
            <p className="redesign-kicker">A one-day legal symposium</p>
            <h2>Law at the <span>Crossroads.</span></h2>
            <p>Strengthening systems for a new era of disasters.</p>
          </div>
          <div className="city-desk-fact">
            <span>At a glance</span>
            <strong>Four CLE courses</strong>
            <strong>John Jay College</strong>
            <strong>8:30 a.m. — 5 p.m.</strong>
          </div>
        </section>

        <figure className="city-desk-image">
          <Image src="/assets/nyc-skyline.jpg" alt="New York City skyline" fill sizes="(max-width: 700px) 100vw, 1100px" />
          <figcaption>New York City · the setting for a day about systems under pressure</figcaption>
        </figure>

        <section className="city-desk-program">
          <div>
            <p className="redesign-kicker">The day in brief</p>
            <h3>Questions worth bringing into the room.</h3>
            <p>Four CLE courses move from algorithmic decision-making to rights, continuity, and the cascading risks ahead.</p>
          </div>
          <div className="city-desk-schedule">
            {programSessions.map((session) => (
              <div className="city-desk-row" key={session.id}>
                <span>{session.time}</span>
                <strong>{session.title}</strong>
              </div>
            ))}
          </div>
        </section>

        <footer className="city-desk-footer">
          <span>{siteConfig.venueLabel}</span>
          <a href="#registration-updates">Registration updates <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </article>
  );
}

function FieldManual() {
  return (
    <article className="redesign-direction redesign-field-manual" id="field-manual">
      <DirectionLabel number="02" name="Civic Field Manual" note="Clear · official · operational" />
      <div className="field-manual-shell">
        <header className="field-manual-header">
          <div className="field-manual-brand">
            <Image className="staging-logo field-manual-logo" src="/assets/nycem-logo.png" alt="New York City Emergency Management" width={164} height={60} />
            <span>Legal preparedness<br />2026 symposium</span>
          </div>
          <span className="field-manual-code">DLS / 2026 / 01</span>
        </header>

        <section className="field-manual-hero">
          <div className="field-manual-hero-copy">
            <p className="redesign-kicker">Disaster Law Symposium 2026</p>
            <h2>Law at the<br /><span>Crossroads.</span></h2>
            <p>Legal decisions under emergency conditions.</p>
            <a className="redesign-button redesign-button-blue" href="#field-program">Read the program <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="field-manual-facts" aria-label="Event details">
            <div><span>Date</span><strong>October 29, 2026</strong></div>
            <div><span>Venue</span><strong>John Jay College of Criminal Justice</strong></div>
            <div><span>Format</span><strong>In person · Four CLE courses</strong></div>
            <div><span>Hours</span><strong>8:30 a.m. — 5 p.m.</strong></div>
          </aside>
        </section>

        <section className="field-manual-program" id="field-program">
          <div className="field-manual-program-intro">
            <p className="redesign-kicker">Program / October 29</p>
            <h3>A working agenda for a day when normal systems are not enough.</h3>
          </div>
          <div className="field-manual-session-list">
            {programSessions.map((session, index) => (
              <div className="field-manual-session" key={session.id}>
                <span className="field-manual-index">0{index + 1}</span>
                <div><span>{session.time}</span><h4>{session.title}</h4></div>
                <span className="field-manual-arrow" aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="field-manual-footer">
          <p>Registration opening soon · John Jay College of Criminal Justice</p>
          <a className="redesign-button redesign-button-dark" href="#registration-updates">Request updates</a>
        </footer>
      </div>
    </article>
  );
}

function UrbanSignal() {
  return (
    <article className="redesign-direction redesign-urban-signal" id="urban-signal">
      <DirectionLabel number="03" name="Urban Signal" note="Atmospheric · urgent · contemporary" />
      <div className="urban-signal-shell">
        <section className="urban-signal-hero">
          <Image className="urban-signal-image" src="/assets/nyc-skyline.jpg" alt="New York City skyline at a distance" fill sizes="(max-width: 700px) 100vw, 1100px" />
          <div className="urban-signal-scrim" />
          <header className="urban-signal-header">
            <Image className="staging-logo urban-signal-logo" src="/assets/nycem-logo.png" alt="New York City Emergency Management" width={164} height={60} />
            <span>John Jay College</span>
          </header>
          <div className="urban-signal-hero-copy">
            <p className="redesign-kicker">October 29, 2026 · New York City</p>
            <h2>Law at the<br /><span>Crossroads.</span></h2>
            <p>Strengthening systems for a new era of disasters.</p>
            <div className="urban-signal-actions">
              <a className="redesign-button redesign-button-orange" href="#signal-program">Explore the program <span aria-hidden="true">↘</span></a>
              <span>One day · four courses · one city</span>
            </div>
          </div>
          <div className="urban-signal-date" aria-hidden="true"><strong>29</strong><span>OCT<br />26</span></div>
        </section>

        <section className="urban-signal-program" id="signal-program">
          <div className="urban-signal-program-head">
            <p className="redesign-kicker">Signal / program</p>
            <h3>What changes when the system is under pressure?</h3>
            <p>Four rooms, one continuous conversation about law, technology, rights, and resilience.</p>
          </div>
          <div className="urban-signal-list">
            {signalSessions.slice(0, 4).map((session, index) => (
              <div className="urban-signal-row" key={session.id}>
                <span className="urban-signal-time">{session.shortTime}<small>{session.time.includes("p.m.") ? "PM" : "AM"}</small></span>
                <div><span>{session.type === "course" ? "CLE course" : session.type}</span><h4>{session.title}</h4></div>
                <strong>0{index + 1}</strong>
              </div>
            ))}
          </div>
        </section>

        <footer className="urban-signal-footer">
          <div><span className="redesign-kicker">Disaster Law Symposium 2026</span><h3>Be in the room.</h3></div>
          <a className="redesign-button redesign-button-orange" href="#registration-updates">Registration updates <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </article>
  );
}

function EmergencyOperationsRoom() {
  const boards = [
    ["Current situation", "Four CLE courses", "Open"],
    ["Location", "John Jay College", "Confirmed"],
    ["Operational window", "8:30 a.m.—5 p.m.", "Scheduled"],
    ["Registration", "Opening soon", "Pending"],
  ];

  return (
    <article className="redesign-direction redesign-eoc" id="emergency-operations">
      <DirectionLabel number="04" name="Emergency Operations Room" note="Status-led · coordinated · live" />
      <div className="eoc-shell">
        <header className="eoc-header">
          <div><span className="eoc-live-dot" aria-hidden="true" /> Common operating picture</div>
          <span>As of October 29, 2026 · 08:30 ET</span>
        </header>
        <section className="eoc-hero">
          <div className="eoc-hero-copy">
            <p className="redesign-kicker">Disaster Law Symposium 2026</p>
            <h2>Law at the<br /><span>Crossroads.</span></h2>
            <p>Strengthening systems for a new era of disasters.</p>
          </div>
          <div className="eoc-hero-status"><span>System state</span><strong>Ready for the next question.</strong><p>One day of legal education for the people who govern, protect, and repair emergency systems.</p></div>
        </section>
        <section className="eoc-board-grid" aria-label="Event status boards">
          {boards.map(([label, value, status], index) => (
            <article className={`eoc-board eoc-board-${status.toLowerCase()}`} key={label}>
              <div><span>{label}</span><strong>{String(index + 1).padStart(2, "0")}</strong></div>
              <h3>{value}</h3>
              <p><i aria-hidden="true" /> {status} · updated now</p>
            </article>
          ))}
        </section>
        <section className="eoc-program">
          <div className="eoc-program-head"><p className="redesign-kicker">Mission boards</p><h3>What the room is tracking.</h3><p>Four sessions, organized as live questions rather than a passive list.</p></div>
          <div className="eoc-session-list">
            {programSessions.map((session, index) => <div className="eoc-session" key={session.id}><span>{session.time}</span><div><span>Board 0{index + 1} · {archiveIssues[index]}</span><h4>{session.title}</h4></div><strong>OPEN</strong></div>)}
          </div>
        </section>
        <footer className="eoc-footer"><span>John Jay College · New York City Emergency Management</span><a href="#registration-updates">Request registration updates <span aria-hidden="true">↗</span></a></footer>
      </div>
    </article>
  );
}

function TransitDepartures() {
  return (
    <article className="redesign-direction redesign-transit" id="transit-route">
      <DirectionLabel number="05" name="Airport / Rail Departures" note="Directional · sequential · navigable" />
      <div className="transit-shell">
        <header className="transit-header"><span>Disaster Law Symposium / Line DLS</span><span>Service map · October 29, 2026</span></header>
        <section className="transit-hero">
          <div className="transit-hero-title"><p className="redesign-kicker">Next departure</p><h2>Law at the<br /><span>Crossroads.</span></h2><p>Strengthening systems for a new era of disasters.</p></div>
          <div className="transit-departure"><span>Destination</span><strong>John Jay College</strong><span>Boarding</span><b>8:30 <small>AM</small></b><span>October 29 · New York City</span></div>
        </section>
        <section className="transit-route-map" aria-label="Symposium route">
          <div className="transit-route-line" aria-hidden="true" />
          <div className="transit-station transit-station-start"><span className="transit-station-dot" /><div><small>08:30</small><strong>Arrival</strong><p>Morning reception</p></div></div>
          {programSessions.map((session, index) => <div className={`transit-station transit-station-${index + 1}`} key={session.id}><span className="transit-station-dot" /><div><small>{session.shortTime}</small><strong>Track {String.fromCharCode(65 + index)} · {archiveIssues[index]}</strong><p>{session.title}</p></div><span className="transit-station-arrow" aria-hidden="true">→</span></div>)}
          <div className="transit-station transit-station-end"><span className="transit-station-dot" /><div><small>16:00</small><strong>Final stop</strong><p>Networking reception</p></div></div>
        </section>
        <footer className="transit-footer"><span>Transfers: breaks · keynote lunch · cocktail hour</span><a href="#registration-updates">Check service updates <span aria-hidden="true">↗</span></a></footer>
      </div>
    </article>
  );
}

function AtlasEvidence() {
  return (
    <article className="redesign-direction redesign-atlas" id="atlas-evidence">
      <DirectionLabel number="06" name="Atlas / Evidence Interface" note="Layered · explanatory · queryable" />
      <div className="atlas-shell">
        <header className="atlas-header"><span>Disaster Law Symposium 2026</span><span>Evidence interface / v1.0</span></header>
        <section className="atlas-hero"><div><p className="redesign-kicker">A legal risk atlas</p><h2>Law at the<br /><span>Crossroads.</span></h2><p>Strengthening systems for a new era of disasters.</p></div><div className="atlas-hero-map" aria-label="Abstract layered risk diagram"><span>RISK</span><i /><i /><i /><b>LAW</b></div></section>
        <div className="atlas-control-rail"><span>Explore the program</span><button type="button" aria-label="Current program filter">All sessions <span>⌄</span></button><button type="button" aria-label="Current day filter">October 29 <span>⌄</span></button><button type="button" aria-label="Current format filter">CLE courses <span>⌄</span></button></div>
        <section className="atlas-evidence-grid">
          <div className="atlas-evidence-intro"><p className="redesign-kicker">Evidence layers</p><h3>Four pressure points shape the day.</h3><p>Start with the schedule, then open the layer that matters to your work.</p><div className="atlas-legend"><span><i className="atlas-dot atlas-dot-one" /> Technology</span><span><i className="atlas-dot atlas-dot-two" /> Rights</span><span><i className="atlas-dot atlas-dot-three" /> Continuity</span><span><i className="atlas-dot atlas-dot-four" /> Risk</span></div></div>
          <div className="atlas-session-list">{programSessions.map((session, index) => <div className="atlas-session" key={session.id}><span className="atlas-session-time">{session.shortTime}</span><div><span>{archiveIssues[index]}</span><h4>{session.title}</h4><p>{session.description.slice(0, 116)}…</p></div><strong>+</strong></div>)}</div>
        </section>
        <footer className="atlas-footer"><span>John Jay College · 8:30 a.m.—5 p.m.</span><a href="#registration-updates">Save the event details <span aria-hidden="true">↗</span></a></footer>
      </div>
    </article>
  );
}

function SignalBoard() {
  return (
    <article className="redesign-direction redesign-signal-board" id="signal-board">
      <DirectionLabel number="07" name="Signal Board / Evidence Wall" note="Data-led · modular · urgent" />
      <div className="signal-board-shell">
        <header className="signal-board-header">
          <span>NYCEM / DLS 2026</span>
          <span>Event intelligence / 01</span>
        </header>

        <section className="signal-board-hero">
          <div className="signal-board-title">
            <p className="redesign-kicker">October 29, 2026 · John Jay College</p>
            <h2>Law at the<br /><span>Crossroads.</span></h2>
            <p>One day. Four courses. The legal architecture of resilience.</p>
          </div>
          <div className="signal-board-metrics" aria-label="Event metrics">
            <div className="signal-board-metric signal-board-metric-large"><strong>29</strong><span>OCT<br />2026</span></div>
            <div className="signal-board-metric"><strong>04</strong><span>CLE<br />courses</span></div>
            <div className="signal-board-metric"><strong>08:30</strong><span>start<br />time</span></div>
            <div className="signal-board-metric"><strong>01</strong><span>city<br />room</span></div>
          </div>
        </section>

        <div className="signal-board-rail"><span>Program signal</span><span>Scroll to inspect the day <strong>↓</strong></span></div>

        <section className="signal-board-grid">
          {programSessions.map((session, index) => (
            <article className={`signal-board-card signal-board-card-${index + 1}`} key={session.id}>
              <div className="signal-board-card-top"><span>0{index + 1}</span><span>{session.time}</span></div>
              <div><span className="signal-board-card-tag">{archiveIssues[index]}</span><h3>{session.title}</h3></div>
              <span className="signal-board-card-arrow" aria-hidden="true">↘</span>
            </article>
          ))}
        </section>

        <footer className="signal-board-footer">
          <div><span className="redesign-kicker">Disaster Law Symposium 2026</span><h3>Keep the system accountable.</h3></div>
          <a className="redesign-button signal-board-button" href="#registration-updates">Request updates <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </article>
  );
}

export default function RedesignStagingPage() {
  return (
    <div className="redesign-staging">
      <section className="redesign-staging-intro page-shell">
        <div>
          <p className="redesign-staging-overline">Internal staging · seven full-page directions</p>
          <h1>Choose the world<br />the symposium lives in.</h1>
          <p>Same event, same content, seven different ways to make the page feel like New York City Emergency Management—not a generic conference template.</p>
        </div>
        <nav className="redesign-staging-nav" aria-label="Redesign directions">
          <a href="#city-desk"><span>01</span> City Desk / Broadsheet</a>
          <a href="#field-manual"><span>02</span> Civic Field Manual</a>
          <a href="#urban-signal"><span>03</span> Urban Signal</a>
          <a href="#emergency-operations"><span>04</span> Emergency Operations Room</a>
          <a href="#transit-route"><span>05</span> Airport / Rail Departures</a>
          <a href="#atlas-evidence"><span>06</span> Atlas / Evidence Interface</a>
          <a href="#signal-board"><span>07</span> Signal Board / Evidence Wall</a>
        </nav>
      </section>

      <div className="redesign-staging-stack page-shell">
        <CityDesk />
        <FieldManual />
        <UrbanSignal />
        <EmergencyOperationsRoom />
        <TransitDepartures />
        <AtlasEvidence />
        <SignalBoard />
      </div>
    </div>
  );
}
