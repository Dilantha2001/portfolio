// ScrollingProjectShowcase.tsx
// Sticky scroll showcase: left panel scrolls through projects,
// right panel shows the active project demo (sticky).
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tagColors } from "../config/portfolioData";
import type { Project } from "../types/portfolio";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

interface Props {
  projects: Project[];
  onOpen?: (p: Project) => void;
}

export const ScrollingProjectShowcase: React.FC<Props> = ({ projects, onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to detect which project row is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        {
          root: null,
          // Trigger when the item crosses the middle of the viewport
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [projects]);

  const activeProject = projects[activeIndex];

  const VISIBLE_TAGS = 4;

  return (
    <div ref={containerRef} className="relative flex gap-8 lg:gap-16">
      {/* ── LEFT: scrollable project list ── */}
      <div className="w-full lg:w-1/2 flex flex-col gap-0">
        {projects.map((project, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={project.id ?? i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`
                py-10 px-6 border-l-2 transition-all duration-500 cursor-pointer
                ${isActive
                  ? "border-[var(--brand)] bg-[var(--surface)]/60 backdrop-blur-sm"
                  : "border-[var(--border)] hover:border-[var(--brand)]/40 hover:bg-[var(--surface)]/20"
                }
              `}
              onClick={() => onOpen?.(project)}
            >
              {/* Index number */}
              <span
                className={`text-xs font-mono font-bold tracking-widest mb-2 block transition-colors duration-300 ${
                  isActive ? "text-[var(--brand)]" : "text-white/30"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className={`text-lg font-bold leading-snug transition-colors duration-300 ${
                  isActive ? "text-[var(--brand)]" : "text-white/60"
                }`}
              >
                {project.title}
              </h3>

              {/* Description — only visible when active */}
              <motion.div
                initial={false}
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags?.slice(0, VISIBLE_TAGS).map((t) => (
                    <span
                      key={t}
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        tagColors[t] || "bg-white/10 text-white/80"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  {(project.tags?.length ?? 0) > VISIBLE_TAGS && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-white/60">
                      +{(project.tags?.length ?? 0) - VISIBLE_TAGS} more
                    </span>
                  )}
                </div>

                {/* Action links */}
                <div className="mt-4 flex items-center gap-4">
                  {project.links?.map((link) => {
                    const Icon =
                      SiIcons[link.icon as keyof typeof SiIcons] ??
                      FaIcons[link.icon as keyof typeof FaIcons];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand)] hover:underline hover:text-white transition-colors"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {link.label}
                      </a>
                    );
                  })}
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpen?.(project); }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <BsArrowUpRightCircleFill className="w-4 h-4" />
                    Details
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── RIGHT: sticky demo preview ── */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="sticky top-28 h-[calc(100vh-8rem)] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject?.id ?? activeIndex}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full"
            >
              {/* Browser-chrome mock wrapper */}
              <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-black/60 bg-[#0d1117]">
                {/* Browser top bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[var(--border)]">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex-1 h-5 rounded-md bg-[var(--border)]/40 flex items-center px-3 gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--brand)]/60" />
                    <span className="text-xs text-white/30 truncate">
                      {activeProject?.href && activeProject.href !== "#"
                        ? activeProject.href
                        : `dilantha.dev/projects/${activeProject?.id ?? ""}`}
                    </span>
                  </div>
                  {activeProject?.href && activeProject.href !== "#" && (
                    <a
                      href={activeProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors ml-2"
                      title="Open live demo"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Project screenshot */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-[#0f1724] to-[#1a1f2e] overflow-hidden">
                  {activeProject?.image ? (
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    /* Placeholder gradient if no image */
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl text-[var(--brand)]/30 font-bold">
                        {activeProject?.title?.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Glassy overlay gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Caption below screenshot */}
              <div className="mt-4 px-1 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base leading-tight">
                    {activeProject?.title}
                  </h4>
                  <p className="text-xs text-white/40 mt-1">
                    {activeProject?.tags?.join(" · ")}
                  </p>
                </div>
                <span className="text-xs font-mono text-white/20 mt-1 shrink-0">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* Progress dots */}
              <div className="mt-4 flex gap-1.5 px-1">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      itemRefs.current[i]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                      setActiveIndex(i);
                    }}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeIndex
                        ? "bg-[var(--brand)] w-6"
                        : "bg-white/20 w-2 hover:bg-white/40"
                    }`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
