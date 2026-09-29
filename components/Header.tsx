"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { sitePath } from "@/lib/site-path";
import { publishedEvent } from "@/data/published-event";
import styles from "./Header.module.css";

const navLinks = [
  { href: sitePath("/"), path: "/", label: "Home" },
  { href: sitePath("/venue/"), path: "/venue", label: "Venue" },
] as const;

function MainNavigation({ pathname, mobile = false, onNavigate }: { pathname: string; mobile?: boolean; onNavigate?: () => void }) {
  return (
    <NavigationMenu aria-label="Main" viewport={false} className={cn(!mobile && styles.nav, mobile && styles.mobileNavMenu)}>
      <NavigationMenuList className={cn(!mobile && styles.navList, mobile && styles.mobileNavList)}>
        {navLinks.map((link) => {
          const isCurrentPage = pathname === link.path;

          return (
            <NavigationMenuItem key={link.href} className={cn(!mobile && styles.navItem, mobile && styles.mobileNavItem)}>
              <NavigationMenuLink
                href={link.href}
                className={cn(!mobile && styles.navLink, mobile && styles.mobileNavLink)}
                active={isCurrentPage}
                aria-current={isCurrentPage ? "page" : undefined}
                onClick={onNavigate}
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().replace(/\/$/, "") || "/";

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.homeLink} href={sitePath("/")} aria-label={`${publishedEvent.title} home`}>
          <Image className={styles.logo} src={sitePath("/assets/nycem-logo-transparent.png")} alt={publishedEvent.organization} width={2500} height={834} priority />
        </a>
        <MainNavigation pathname={pathname} />
        <button
          className={styles.menuToggle}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`} aria-hidden="true" />
        </button>
      </div>
      <div id="mobile-nav" className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`} aria-hidden={!open}>
        <MainNavigation pathname={pathname} mobile onNavigate={() => setOpen(false)} />
      </div>
    </header>
  );
}
