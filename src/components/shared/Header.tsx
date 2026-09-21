// Header.tsx
import React, { useRef, useState, useEffect } from "react";
import { PORTFOLIO_INFO } from "../../config/portfolioData";
import { useLenis } from "lenis/react";
import { Icon } from "@iconify/react";
import { useTheme } from "../../context/ThemeContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NavLink = { href: string; label: string };

export const Header: React.FC<{ links?: NavLink[] }> = ({
  links = [],
}) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  const PERSONAL = PORTFOLIO_INFO.personal;
  const firstName = PERSONAL.name.split(" ")[0].toUpperCase();

  const [active, setActive] = useState<string>(links[0]?.href ?? "#about");
  
  useEffect(() => {
    const sections = links
      .map((l) =>
        (l.href.startsWith("#") && !l.href.startsWith("#/")) ? document.querySelector(l.href) : null
      )
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [links]);

  useGSAP(() => {
    if (!headerRef.current) return;
    
    // Auto-hide navbar on scroll down, show on scroll up
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play(); // scrolling up
        } else if (self.direction === 1 && self.scrollY > 100) {
          showAnim.reverse(); // scrolling down
        }
      }
    });
  }, { scope: headerRef });

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // normal navigation for external links or router routes
    if (href.startsWith("#/")) {
      setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    setMobileMenuOpen(false);

    // If we are on the resume page, we need to go back to the homepage first
    const isHomePage = window.location.hash === "#/" || window.location.hash === "" || !window.location.hash.includes("/resume");
    if (!isHomePage) {
      sessionStorage.setItem("scroll-to-section", href);
      window.location.href = window.location.origin + window.location.pathname + "#/";
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const headerEl = headerRef.current ?? document.querySelector("header");
    const headerH = headerEl?.offsetHeight ?? 0;
    
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -headerH, duration: 1.2 });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const BASE = import.meta.env.BASE_URL || "/";

  // Split links for Desktop
  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300"
    >
      <div className="max-w-[1800px] mx-auto w-full px-6 py-4 flex items-center justify-between">
        
        {/* ================= DESKTOP LAYOUT ================= */}
        
        {/* Left Links */}
        <nav className="hidden sm:flex flex-1 justify-start items-center gap-8">
          {leftLinks.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Center Logo */}
        <div className="flex-shrink-0 flex justify-center group cursor-pointer">
          <a
            href={BASE}
            className="flex items-center gap-2 text-2xl font-black text-white tracking-[0.2em] group-hover:scale-105 transition-transform duration-300"
          >
            {/* You can replace this with an actual SVG logo if you have one */}
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              {firstName}
            </span>
          </a>
        </div>

        {/* Right Links */}
        <nav className="hidden sm:flex flex-1 justify-end items-center gap-8">
          {rightLinks.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggle}
            className="text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            <Icon icon={dark ? "lucide:sun" : "lucide:moon"} className="w-4 h-4" />
          </button>
        </nav>

        {/* ================= MOBILE LAYOUT (HAMBURGER) ================= */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            <Icon
              icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950/95 border-b border-white/10 backdrop-blur-2xl flex flex-col p-4 gap-4 shadow-2xl sm:hidden">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className={`px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 flex items-center justify-between ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <button
            onClick={toggle}
            className="px-4 py-3 text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2"
          >
            <Icon icon={dark ? "lucide:sun" : "lucide:moon"} className="w-4 h-4" />
            Toggle Theme
          </button>
        </div>
      )}
    </header>
  );
};
