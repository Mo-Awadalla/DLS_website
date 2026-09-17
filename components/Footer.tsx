import Image from "next/image";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-contact" id="registration-updates">
        <div className="footer-contact-copy">
          <h2>Registration updates</h2>
          <p>Ask the symposium team to email you when registration opens.</p>
          <a className="button button-amber" href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Registration updates — Disaster Law Symposium 2026")}&body=${encodeURIComponent("Please email me when registration opens for the October 29, 2026 Disaster Law Symposium. Thank you.")}`}>Request updates by email</a>
          <p className="notification-note">Opens your email app. Send the message to request an update; this does not register you for the event.</p>
          <h3>Questions about the symposium?</h3>
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
