import { overview } from "@/data/overview";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-contact">
        <div><p className="eyebrow">Stay in touch</p><h2>Questions about the symposium?</h2><p>{overview.announcement}</p></div>
        <a className="text-link contact-link" href={`mailto:${overview.contactEmail}`}>{overview.contactEmail} <span aria-hidden="true">↗</span></a>
      </div>
      <div className="page-shell footer-bottom">
        <span>{overview.organization}</span>
        <span>© 2026 City of New York</span>
      </div>
    </footer>
  );
}
