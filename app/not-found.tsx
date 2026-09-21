import { sitePath } from "@/lib/site-path";

export default function NotFound() {
  return (
    <section className="page-shell not-found">
      <p className="eyebrow">404 / Page not found</p>
      <h1>This page is unavailable.</h1>
      <p>Visit the symposium overview for the date, venue, and topics.</p>
      <a className="button" href={sitePath("/")}>Go to the homepage <span aria-hidden="true">↗</span></a>
    </section>
  );
}
