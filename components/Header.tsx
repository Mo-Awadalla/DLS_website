"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RegistrationCTA } from "./RegistrationCTA";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const links = [
  ["Program", "/program"],
  ["Speakers", "/speakers"],
  ["Venue", "/venue"],
  ["Sponsors", "/sponsors"],
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link className="brand-lockup" href="/" aria-label="Disaster Law Symposium home">
          <Image className="nycem-logo" src="/assets/nycem-logo.png" alt="New York City Emergency Management" width={164} height={60} priority />
          <span className="brand-context">2026<br /><em>Symposium</em></span>
        </Link>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger>
            <button className="menu-toggle" type="button" aria-label="Open navigation">
              <span className="sr-only">Open navigation</span>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="top">
            <nav id="primary-navigation" className="mobile-primary-nav is-open" aria-label="Mobile navigation">
              <h2 id="mobile-navigation-title" className="sr-only">Mobile navigation</h2>
              <div className="nav-links">
                {links.map(([label, href]) => (
                  <Link key={href} className={pathname === href ? "active" : ""} href={href} aria-current={pathname === href ? "page" : undefined}>
                    {label}
                  </Link>
                ))}
              </div>
              <Link className={`nav-register ${pathname === "/register" ? "active" : ""}`} href="/register">Registration</Link>
            </nav>
          </SheetContent>
        </Sheet>

        <nav id="desktop-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <div className="nav-links">
            {links.map(([label, href]) => (
              <Link key={href} className={pathname === href ? "active" : ""} href={href} aria-current={pathname === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </div>
          <Link className={`nav-register ${pathname === "/register" ? "active" : ""}`} href="/register">Registration</Link>
        </nav>
        <div className="header-action"><RegistrationCTA /></div>
      </div>
    </header>
  );
}
