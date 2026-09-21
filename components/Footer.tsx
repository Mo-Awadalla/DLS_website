import { publishedEvent } from "@/data/published-event";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-contact">
        <div><p className="eyebrow">Stay in touch</p><h2>Questions about the symposium?</h2><p>{publishedEvent.announcement}</p></div>
        <a className="text-link contact-link" href={`mailto:${publishedEvent.contact.email}`}>{publishedEvent.contact.email} <span aria-hidden="true">↗</span></a>
      </div>
      <div className="page-shell footer-bottom">
        <span>{publishedEvent.organization}</span>
        <span>© {publishedEvent.date.iso.slice(0, 4)} City of New York</span>
      </div>
    </footer>
  );
}
