import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <div className="footer-lockup">DLS<span>26</span></div>
          <p className="footer-thesis">Law at the Crossroads</p>
          <p className="footer-note">A convening by {siteConfig.organization}.</p>
        </div>
        <div className="footer-nav">
          <p className="eyebrow">Explore</p>
          <Link href="/program">Program</Link>
          <Link href="/speakers">Speakers</Link>
          <Link href="/venue">Venue & travel</Link>
          <Link href="/sponsors">Sponsors</Link>
        </div>
        <div className="footer-contact">
          <p className="eyebrow">Stay in the loop</p>
          <p>Questions about the symposium?</p>
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© 2026 New York City Emergency Management</span>
        <span>Content status: editorial draft</span>
      </div>
    </footer>
  );
}
