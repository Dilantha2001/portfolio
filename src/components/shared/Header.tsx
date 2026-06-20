// Header.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  animate,
  useMotionTemplate,
} from "framer-motion";
import { PORTFOLIO_INFO } from "../../config/portfolioData";
import { useLenis } from "lenis/react";
import { Icon } from "@iconify/react";

type NavLink = { href: string; label: string };

export const Header: React.FC<{ links?: NavLink[] }> = ({
  links = [],
}) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const PERSONAL = PORTFOLIO_INFO.personal;

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

  const springScrollTo = (y: number) => {
    const controls = animate(window.scrollY, y, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
    return () => controls.stop();
  };

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
      springScrollTo(y);
    }
  };

  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 200], [8, 16]);
  const overlayOpacity = useTransform(scrollY, [0, 200], [0.05, 0.12]);
  const backdrop = useMotionTemplate`blur(${blurPx}px)`;

  const BASE = import.meta.env.BASE_URL || "/";

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300"
      style={{ backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
    >
      {/* animated overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-black/10"
        style={{
          opacity: overlayOpacity,
        }}
      />
      <div className="relative w-full px-6 py-3 flex items-center justify-between">
        {/* Left: brand/home */}
        <a
          href={BASE}
          className="flex items-center gap-3 text-lg font-semibold text-white group"
        >
          <span className="sr-only">Home</span>
          <div className="leading-tight">
            <div className="font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-purple-400 transition-colors duration-300">
              {PERSONAL.name}
            </div>
            <div className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase font-mono mt-0.5 hidden sm:block">
              {PERSONAL.title}
            </div>
          </div>
        </a>

        {/* Right: nav menu */}
        <nav aria-label="Primary" className="relative flex items-center">
          {/* Desktop Links */}
          <div className="relative hidden sm:flex gap-1 items-center bg-white/5 border border-white/5 backdrop-blur-md rounded-full p-1">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-purple-400 transition-colors duration-200 focus:outline-none p-2 bg-white/5 border border-white/10 rounded-full flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <Icon
                icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"}
                className="w-4 h-4"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 p-3 bg-slate-950/95 border border-white/10 backdrop-blur-2xl rounded-2xl flex flex-col gap-2 shadow-2xl z-40"
            >
              {links.map((l) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      onNavClick(e, l.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center justify-between ${
                      isActive
                        ? "text-white bg-white/10 border border-white/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
