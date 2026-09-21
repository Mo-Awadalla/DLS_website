import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link className="brand-lockup" href="/" aria-label="Disaster Law Symposium home">
          <Image className="nycem-logo" src="/assets/nycem-logo.png" alt="New York City Emergency Management" width={164} height={60} priority />
          <span className="brand-context">2026<br /><em>Symposium</em></span>
        </Link>
      </div>
    </header>
  );
}
