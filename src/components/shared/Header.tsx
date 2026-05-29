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

type NavLink = { href: string; label: string };

export const Header: React.FC<{ links?: NavLink[]; onTryCLI?: () => void }> = ({
  links = [],
  onTryCLI,
}) => {
  const headerRef = useRef<HTMLElement | null>(null);

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
    if (!href.startsWith("#") || href.startsWith("#/")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const headerEl = headerRef.current ?? document.querySelector("header");
    const headerH = headerEl?.offsetHeight ?? 0;
    const y = target.getBoundingClientRect().top + window.scrollY - headerH;
    springScrollTo(y);
  };

  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 200], [8, 16]);
  const overlayOpacity = useTransform(scrollY, [0, 200], [0.08, 0.14]);
  const backdrop = useMotionTemplate`blur(${blurPx}px)`;

  const BASE = import.meta.env.BASE_URL || "/";

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 z-50 w-full border-b border-purple-950/20 bg-[#020617]/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4),0_1px_0px_rgba(168,85,247,0.05)]"
      style={{ backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
    >
      {/* animated overlay to add subtle tint regardless of theme */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-black/20"
        style={{
          opacity: overlayOpacity,
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: brand/home */}
        <a
          href={BASE}
          className="flex items-center gap-3 text-lg font-semibold text-white group"
        >
          
          <span className="sr-only">Home</span>
          <div className="hidden sm:block leading-tight">
            <div className="font-extrabold text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:text-purple-400 transition-colors duration-300">{PERSONAL.name}</div>
            <div className="text-[10px] text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.2)] font-semibold tracking-wider uppercase font-mono mt-0.5">{PERSONAL.title}</div>
          </div>
        </a>

        {/* Right: nav + theme + Try CLI */}
        <nav aria-label="Primary" className="relative flex items-center gap-3">
          <div className="relative hidden sm:flex gap-6 items-center">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  className={`relative px-1 py-0.5 text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.2)]" 
                      : "text-slate-200 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.15)] hover:text-purple-400 hover:scale-105"
                  }`}
                >
                  {l.label}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-1 h-[2.5px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </div>

          <button
            onClick={onTryCLI}
            className="rounded-full border border-purple-500/30 bg-purple-500/5 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.45)] cursor-pointer sm:inline-block hidden"
            aria-label="Try CLI"
          >
            Try CLI
          </button>

          
        </nav>
      </div>
    </motion.header>
  );
};
