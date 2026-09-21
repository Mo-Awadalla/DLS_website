import type { Metadata } from "next";
import { HomeOnlyNotice } from "@/components/HomeOnlyNotice";
import { SectionHeading } from "@/components/SectionHeading";
import { SpeakerDirectory } from "@/components/SpeakerDirectory";
import { siteConfig } from "@/data/site";
import { publicSpeakers } from "@/data/speakers";

export const metadata: Metadata = { title: "Speakers", description: "Confirmed speakers for Disaster Law Symposium 2026.", alternates: { canonical: "/speakers" } };

export default function SpeakersPage() {
  if (siteConfig.landingOnly) return <HomeOnlyNotice />;

  return (
    <>
      <section className="page-hero page-hero-short"><div className="page-shell page-hero-inner"><p className="kicker">People at the crossroads</p><h1>Confirmed<br /><em>speakers.</em></h1><p>The first name is in. More voices will be added as the 2026 program is confirmed.</p></div></section>
      <section className="section-pad speakers-page"><div className="page-shell"><SectionHeading eyebrow="The keynote" title="One confirmed voice. More to come." body="Every published speaker will bring practical experience from the places where law, public systems, and disaster response meet." /><SpeakerDirectory speakers={publicSpeakers} /><div className="coming-speakers"><span className="point-number">+</span><div><h3>Additional speakers are being confirmed.</h3><p>Opening remarks and course panels remain in editorial review. Check back for the full directory.</p></div></div></div></section>
    </>
  );
}
