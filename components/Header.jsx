"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationLinks } from "@/lib/navigation";
import Icon from "./Icon";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 28);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav-inner">
          <Link className="wordmark" href="/"><span>Emily&apos;s</span> Blog</Link>
          <nav className="nav-links" aria-label="主导航">
            {navigationLinks.map((link) => (
              <Link className={`nav-link${isActive(link.href) ? " active" : ""}`} href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button className="menu-button" type="button" aria-label={open ? "关闭菜单" : "打开菜单"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <nav className={`mobile-menu${open ? " open" : ""}`} aria-label="移动端导航">
        {navigationLinks.map((link) => (
          <Link className={isActive(link.href) ? "active" : ""} href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
