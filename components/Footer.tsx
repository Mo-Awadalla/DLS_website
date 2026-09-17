import Image from "next/image";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-contact">
        <div className="footer-contact-copy">
          <p className="eyebrow"><span className="eyebrow-line" />Questions?</p>
          <h2>Questions about the symposium?</h2>
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="page-shell footer-logo-row">
        <Image className="footer-logo" src="/assets/nycem-logo.png" alt="New York City Emergency Management" width={164} height={60} />
      </div>
      <div className="page-shell footer-bottom">
        <span>© 2026 New York City Emergency Management</span>
        <span>Content status: editorial draft</span>
      </div>
    </footer>
  );
}
