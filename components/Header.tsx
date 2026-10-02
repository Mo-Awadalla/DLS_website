"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

function MainNavigation({ pathname, mobile = false, visible = true, onNavigate }: { pathname: string; mobile?: boolean; visible?: boolean; onNavigate?: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLSpanElement>(null);

  const updateSelection = useCallback((animate: boolean) => {
    const track = trackRef.current;
    const selection = selectionRef.current;
    const current = track?.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
    if (!track || !selection) return;
    if (!current) {
      delete track.dataset.ready;
      return;
    }

    const bounds = track.getBoundingClientRect();
    const target = current.getBoundingClientRect();
    if (!bounds.width || !target.width) return;

    const left = target.left - bounds.left - track.clientLeft;
    const top = target.top - bounds.top - track.clientTop;
    track.dataset.animate = animate ? "true" : "false";
    selection.style.clipPath = `inset(${top}px ${track.clientWidth - left - target.width}px ${track.clientHeight - top - target.height}px ${left}px round 24px)`;
    track.dataset.ready = "true";
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => updateSelection(false));
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateSelection]);

  useLayoutEffect(() => {
    updateSelection(trackRef.current?.dataset.animate === "true");
  }, [pathname, visible, updateSelection]);

  return (
    <NavigationMenu aria-label="Main" viewport={false} className={cn(styles.nav, mobile && styles.mobileNavMenu)}>
      <div
        ref={trackRef}
        className={cn(styles.navTrack, mobile && styles.mobileNavTrack)}
        onPointerDownCapture={() => { if (trackRef.current) trackRef.current.dataset.animate = "true"; }}
        onKeyDownCapture={() => { if (trackRef.current) trackRef.current.dataset.animate = "false"; }}
      >
        <span ref={selectionRef} className={styles.selection} aria-hidden="true" />
        <NavigationMenuList className={cn(styles.navList, mobile && styles.mobileNavList)}>
          {navLinks.map((link) => {
            const isCurrentPage = pathname === link.path;

            return (
              <NavigationMenuItem key={link.href} className={styles.navItem}>
                <NavigationMenuLink asChild active={isCurrentPage}>
                  <Link
                    href={link.href}
                    className={cn(styles.navLink, mobile && styles.mobileNavLink)}
                    aria-current={isCurrentPage ? "page" : undefined}
                    onClick={(event) => {
                      if (trackRef.current) trackRef.current.dataset.animate = event.detail > 0 ? "true" : "false";
                      onNavigate?.();
                    }}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
          {mobile && pathname !== "/" && (
            <NavigationMenuItem className={styles.navItem}>
              <NavigationMenuLink asChild>
                <a
                  href={publishedEvent.registrationUrl}
                  className={cn(styles.navLink, styles.mobileNavLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Registration (opens in a new tab)"
                  onClick={onNavigate}
                >
                  Registration
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname().replace(/\/$/, "") || "/";

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const track = desktopRef.current?.querySelector<HTMLElement>(`.${styles.navTrack}`);
    const logo = inner?.querySelector<HTMLElement>(`.${styles.homeLink}`);
    const registration = inner?.querySelector<HTMLElement>(`.${styles.registrationStandalone}`);
    if (!inner || !track || !logo) return;

    const updateLayout = () => {
      const sideWidth = Math.max(logo.getBoundingClientRect().width, registration?.getBoundingClientRect().width ?? 0);
      const needsMenu = sideWidth * 2 + track.getBoundingClientRect().width + 48 > inner.clientWidth;
      setCollapsed(needsMenu);
      if (!needsMenu) setOpen(false);
    };
    const observer = new ResizeObserver(updateLayout);
    observer.observe(inner);
    observer.observe(track);
    observer.observe(logo);
    if (registration) observer.observe(registration);
    updateLayout();
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={styles.header}
      data-collapsed={collapsed}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          if (toggleRef.current) toggleRef.current.dataset.animate = "false";
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div ref={innerRef} className={styles.headerInner}>
        <a className={styles.homeLink} href={sitePath("/")} aria-label={`${publishedEvent.title} home`}>
          <Image className={styles.logo} src={sitePath("/assets/nycem-logo-transparent.png")} alt={publishedEvent.organization} width={2500} height={834} priority />
        </a>
        <div ref={desktopRef} className={styles.desktopNav}>
          <MainNavigation pathname={pathname} />
        </div>
        {pathname !== "/" && (
          <a
            href={publishedEvent.registrationUrl}
            className={cn(styles.navLink, styles.registrationStandalone)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Registration (opens in a new tab)"
          >
            Registration
          </a>
        )}
        <button
          ref={toggleRef}
          className={styles.menuToggle}
          onClick={(event) => {
            event.currentTarget.dataset.animate = event.detail > 0 ? "true" : "false";
            setOpen((value) => !value);
          }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuLabel} aria-hidden="true">{open ? "Close" : "Menu"}</span>
          <span className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`} aria-hidden="true" />
        </button>
      </div>
      <div id="mobile-nav" className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`} aria-hidden={!open}>
        <MainNavigation pathname={pathname} mobile visible={open} onNavigate={() => setOpen(false)} />
      </div>
    </header>
  );
}
