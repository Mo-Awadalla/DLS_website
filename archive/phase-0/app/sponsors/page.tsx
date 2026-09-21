import type { Metadata } from "next";
import Image from "next/image";
import { HomeOnlyNotice } from "@/components/HomeOnlyNotice";
import { RegistrationCTA } from "@/components/RegistrationCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";
import { sponsors } from "@/data/sponsors";

export const metadata: Metadata = { title: "Sponsors", description: "Partner with Disaster Law Symposium 2026.", alternates: { canonical: "/sponsors" } };

const tierLabels = { presenting: "Presenting partners", supporting: "Supporting partners", community: "Community partners" } as const;

export default function SponsorsPage() {
  if (siteConfig.landingOnly) return <HomeOnlyNotice />;

  return (
    <>
      <section className="page-hero page-hero-sponsors"><div className="page-shell page-hero-inner"><p className="kicker">Build the bridge with us</p><h1>Partnership is<br /><em>infrastructure.</em></h1><p>Support an independent space for the people responsible for making public systems more resilient.</p></div></section>
      <section className="section-pad sponsors-page"><div className="page-shell"><SectionHeading eyebrow="2026 partners" title="Make the work possible." body="Partner visibility should feel like participation in the conversation — thoughtful, useful, and grounded in public purpose." />{(["presenting", "supporting", "community"] as const).map((tier) => <div className="sponsor-tier" key={tier}><div className="tier-heading"><p className="eyebrow"><span className="eyebrow-line" />{tierLabels[tier]}</p><span>{sponsors.filter((sponsor) => sponsor.tier === tier).length} position{ sponsors.filter((sponsor) => sponsor.tier === tier).length === 1 ? "" : "s"}</span></div><div className={`sponsor-grid sponsor-grid-${tier}`}>{sponsors.filter((sponsor) => sponsor.tier === tier).map((sponsor) => <article className={`sponsor-card ${sponsor.status === "available" ? "sponsor-available" : ""}`} key={sponsor.id}>{sponsor.logo ? <Image src={sponsor.logo} alt={`${sponsor.name} logo`} width={250} height={92} /> : <span className="sponsor-placeholder">{sponsor.name}</span>}<div><h3>{sponsor.name}</h3><p>{sponsor.description}</p>{sponsor.status === "available" ? <span className="availability">Available for 2026</span> : <span className="availability confirmed-label">Confirmed</span>}</div></article>)}</div></div>)}</div></section>
      <section className="sponsor-cta"><div className="page-shell sponsor-cta-inner"><div><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />Partner with DLS26</p><h2>Bring your organization to the table.</h2><p>Tell us what kind of partnership is right for your team.</p></div><a className="button button-amber" href={`mailto:${siteConfig.contactEmail}?subject=Disaster Law Symposium 2026 partnership`}>Start a conversation <span aria-hidden="true">↗</span></a></div></section>
    </>
  );
}
