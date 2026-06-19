import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import type { Project } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  projects: Project[];
  onOpen?: (p: Project) => void;
}

export const ArtisanoScrollShowcase: React.FC<Props> = ({ projects, onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Take top 5 featured projects
  const featuredProjects = projects.slice(0, 5);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    // Create GSAP ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const slides = gsap.utils.toArray<HTMLElement>(".artisano-slide");
    const bgImages = gsap.utils.toArray<HTMLElement>(".artisano-bg-image");
    const textBlocks = gsap.utils.toArray<HTMLElement>(".artisano-text-block");

    // Initialize initial states
    slides.forEach((_, index) => {
      if (index === 0) {
        gsap.set(bgImages[index], { opacity: 1, scale: 1 });
        gsap.set(textBlocks[index], { opacity: 1, y: 0 });
        gsap.set(`#indicator-fill-${index}`, { scaleY: 1, transformOrigin: "top" });
      } else {
        gsap.set(bgImages[index], { opacity: 0, scale: 0.95 });
        gsap.set(textBlocks[index], { opacity: 0, y: 50 });
        gsap.set(`#indicator-fill-${index}`, { scaleY: 0, transformOrigin: "top" });
      }
    });

    // Create animation transitions between slides
    slides.forEach((_, index) => {
      if (index === slides.length - 1) return;

      const nextIndex = index + 1;

      // Transition timeline block
      tl.to(
        textBlocks[index],
        {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: "power2.inOut",
        },
        `slide-${index}`
      )
      .to(
        bgImages[index],
        {
          opacity: 0,
          scale: 1.05,
          duration: 1,
          ease: "power2.inOut",
        },
        `slide-${index}`
      )
      .to(
        `#indicator-fill-${nextIndex}`,
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1,
          ease: "power2.inOut",
        },
        `slide-${index}`
      )
      .fromTo(
        bgImages[nextIndex],
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        `slide-${index}`
      )
      .fromTo(
        textBlocks[nextIndex],
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        `slide-${index}`
      );

      // Add a small spacer/delay in timeline to hold each slide in view
      tl.to({}, { duration: 0.5 });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [featuredProjects.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: `${featuredProjects.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Background Images */}
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
          {featuredProjects.map((project, idx) => (
            <div
              key={`bg-${project.id ?? idx}`}
              className="artisano-bg-image absolute inset-0 w-full h-full origin-center select-none pointer-events-none"
              style={{ willChange: "transform, opacity" }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-950/40 via-black to-slate-950/40" />
              )}
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
            </div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 h-full flex flex-col justify-center">
          {featuredProjects.map((project, idx) => {
            return (
              <div
                key={`slide-${project.id ?? idx}`}
                className="artisano-slide absolute inset-x-6 top-1/2 -translate-y-1/2 flex flex-col items-center text-center justify-center pointer-events-none"
              >
                <div
                  className="artisano-text-block w-full flex flex-col items-center pointer-events-auto"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Category / Project Index */}
                  <span className="text-xs md:text-sm font-mono font-bold tracking-widest text-[var(--brand)] uppercase mb-3 drop-shadow">
                    Featured Project {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h2>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-2xl">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full border border-white/5 bg-slate-900/40 text-slate-300 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mb-8 text-center filter drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                    {project.description}
                  </p>

                  {/* Action Links */}
                  <div className="flex flex-wrap justify-center gap-4">
                    {project.href && project.href !== "#" && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.03] transition-all cursor-pointer"
                      >
                        <Icon icon="lucide:external-link" className="text-base" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900/60 border border-slate-850 hover:border-purple-500/30 hover:bg-purple-500/5 text-sm font-semibold text-slate-200 hover:scale-[1.03] transition-all cursor-pointer"
                      >
                        <Icon icon="simple-icons:github" className="text-base text-purple-400" />
                        <span>{link.label}</span>
                      </a>
                    ))}
                    <button
                      type="button"
                      onClick={() => onOpen?.(project)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/5 text-sm font-semibold text-white hover:scale-[1.03] transition-all cursor-pointer"
                    >
                      <Icon icon="lucide:info" className="text-base" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vertical Progress Bar */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {featuredProjects.map((_, idx) => (
            <div
              key={`indicator-${idx}`}
              className="w-1 h-12 rounded-full bg-white/10 overflow-hidden"
            >
              <div
                id={`indicator-fill-${idx}`}
                className="w-full h-full bg-[var(--brand)] rounded-full origin-top"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
