import type { Metadata } from "next";
import { HomeOnlyNotice } from "@/components/HomeOnlyNotice";
import { RegistrationCTA } from "@/components/RegistrationCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";
import { Alert, AlertIcon } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = { title: "Registration", description: "Registration updates for Disaster Law Symposium 2026.", alternates: { canonical: "/register" } };

const faqs = [
  ["When is the symposium?", "The symposium will take place in 2026. The date will be announced once the program and venue are finalized."],
  ["Where will it be held?", "A New York City venue is being finalized. Venue, travel, and accessibility details will be published here."],
  ["How much will registration cost?", "Pricing is still being developed. We will publish registration tiers and any available discounts when registration opens."],
  ["Will CLE credit be available?", "The four course categories are pending approval. Final credit details will be published with the registration information."],
];

export default function RegisterPage() {
  if (siteConfig.landingOnly) return <HomeOnlyNotice />;

  return (
    <>
      <section className="register-hero"><div className="page-shell register-hero-grid"><div><p className="kicker">Save your place</p><h1>Registration<br /><em>is coming.</em></h1><p>We are building a day worth stepping away from your desk for. Add your name when the doors open.</p><RegistrationCTA /></div><div className="register-facts"><div><span className="meta-label">Event</span><strong>Disaster Law Symposium 2026</strong></div><div><span className="meta-label">Date</span><strong>To be announced</strong></div><div><span className="meta-label">Venue</span><strong>New York City · TBA</strong></div></div></div></section>
      <section className="section-pad registration-page"><div className="page-shell registration-layout"><div><SectionHeading eyebrow="Registration details" title="Clear information, when it is ready." body="There are no placeholder prices or invented deadlines here. This page will update as the event moves from planning into registration." /><Alert variant="info" className="registration-note"><AlertIcon /><p>Registration is not open yet. For questions, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p></Alert></div><div className="faq-list"><p className="eyebrow"><span className="eyebrow-line" />Frequently asked</p><Accordion type="single" collapsible>{faqs.map(([question, answer]) => <AccordionItem key={question} value={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent><p>{answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></div></section>
    </>
  );
}
