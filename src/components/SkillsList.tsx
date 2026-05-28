import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { SkillGroup } from "../types/portfolio";
import { SkillCircle } from "./SkillCircle";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { Icon } from "@iconify/react";

// Robust mapper function to fetch standard high-resolution developer logos from Iconify
const getIconifyName = (iconName: string | undefined, skillName: string): string => {
  const name = skillName.toLowerCase();
  const icon = (iconName ?? "").toLowerCase();

  // Explicit mappings based on skill name
  if (name.includes("react")) return "logos:react";
  if (name.includes("typescript") || name.includes("ts")) return "logos:typescript-icon";
  if (name.includes("javascript") || name.includes("js")) return "logos:javascript";
  if (name.includes("html5") || name === "html") return "logos:html-5";
  if (name.includes("css3") || name === "css") return "logos:css-3";
  if (name.includes("tailwind")) return "logos:tailwindcss-icon";
  if (name.includes("material-ui") || name === "mui" || name.includes("material ui")) return "logos:material-ui";
  if (name.includes("php")) return "logos:php";
  if (name.includes("fastapi")) return "logos:fastapi";
  if (name.includes("node")) return "logos:nodejs-icon";
  if (name.includes("express")) return "skill-icons:expressjs-dark";
  if (name.includes("java") && !name.includes("script")) return "logos:java";
  if (name.includes("aws") || name.includes("amazon")) return "logos:aws";
  if (name.includes("docker")) return "logos:docker-icon";
  if (name.includes("postgres")) return "logos:postgresql";
  if (name.includes("mysql")) return "logos:mysql-icon";
  if (name.includes("mongodb") || name.includes("mongo")) return "logos:mongodb-icon";
  if (name.includes("github")) return "logos:github-icon";
  if (name.includes("git")) return "logos:git-icon";
  if (name.includes("jira")) return "logos:jira";
  if (name.includes("vscode") || name.includes("vs code") || name.includes("visual studio")) return "logos:visual-studio-code";

  // Fallbacks based on original icon string
  if (icon.includes("react")) return "logos:react";
  if (icon.includes("typescript")) return "logos:typescript-icon";
  if (icon.includes("javascript")) return "logos:javascript";
  if (icon.includes("html5")) return "logos:html-5";
  if (icon.includes("css3")) return "logos:css-3";
  if (icon.includes("tailwind")) return "logos:tailwindcss-icon";
  if (icon.includes("materialui")) return "logos:material-ui";
  if (icon.includes("fastapi")) return "logos:fastapi";
  if (icon.includes("nodedotjs")) return "logos:nodejs-icon";
  if (icon.includes("express")) return "skill-icons:expressjs-dark";
  if (icon.includes("java")) return "logos:java";
  if (icon.includes("aws") || icon.includes("amazonaws")) return "logos:aws";
  if (icon.includes("docker")) return "logos:docker-icon";
  if (icon.includes("postgres")) return "logos:postgresql";
  if (icon.includes("mysql")) return "logos:mysql-icon";
  if (icon.includes("mongodb")) return "logos:mongodb-icon";
  if (icon.includes("github")) return "logos:github-icon";
  if (icon.includes("git")) return "logos:git-icon";
  if (icon.includes("jira")) return "logos:jira";
  if (icon.includes("visualstudiocode")) return "logos:visual-studio-code";

  // General fallback icon
  return "lucide:cpu";
};

export const SkillsList: React.FC<{
  skills?: SkillGroup[];
  isBar?: boolean;
}> = ({ skills = [], isBar = true }) => {
  const groupTitles = useMemo(
    () => skills.map((g) => g.title ?? "Other"),
    [skills]
  );

  const [selectedTitles, setSelectedTitles] = useState<string[]>(["all"]);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleTitle = (title: string) => {
    if (title === "all") {
      setSelectedTitles(["all"]);
      return;
    }
    setSelectedTitles((prev) => {
      const withoutAll = prev.filter((t) => t !== "all");
      if (withoutAll.includes(title)) {
        const next = withoutAll.filter((t) => t !== title);
        return next.length === 0 ? ["all"] : next;
      }
      return [...withoutAll, title];
    });
  };

  const filteredGroups = useMemo(() => {
    if (selectedTitles.includes("all")) return skills;
    return skills.filter((g) => selectedTitles.includes(g.title ?? "Other"));
  }, [skills, selectedTitles]);

  const getCount = (title: string) => {
    if (title === "all") return skills.flatMap((g) => g.skills ?? []).length;
    const found = skills.find((g) => g.title === title);
    return found ? (found.skills ?? []).length : 0;
  };

  // Collapse height target settings (approx 4 cards high or 3 rows on desktop grid)
  const rowHeight = 175;
  const maxRowsCollapsed = 3;
  const collapsedPx = rowHeight * maxRowsCollapsed;
  const maxHeight = `${collapsedPx}px`;
  const totalSkillCount = skills.flatMap((g) => g.skills ?? []).length;

  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) {
      setHasOverflow(false);
      return;
    }
    const check = () => {
      setHasOverflow(el.scrollHeight > collapsedPx);
    };
    check();
    const ro = new ResizeObserver(() => check());
    ro.observe(el);
    const onResize = () => check();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [filteredGroups, collapsedPx, selectedTitles, totalSkillCount, expanded]);

  useEffect(() => setExpanded(false), [selectedTitles]);

  // If no overflow, collapsedHeightTarget is "auto" (so no empty space).
  const collapsedHeightTarget = hasOverflow ? maxHeight : "auto";

  return (
    <div className="space-y-8">
      {/* Category Navigation Bar (Larger Text) */}
      <div className="flex flex-wrap gap-3 pb-2">
        <button
          onClick={() => toggleTitle("all")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleTitle("all");
            }
          }}
          aria-pressed={selectedTitles.includes("all")}
          className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border select-none cursor-pointer ${
            selectedTitles.includes("all")
              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.35)]"
              : "bg-slate-950/40 text-slate-300 border-slate-800/80 backdrop-blur-md hover:bg-slate-900/60 hover:text-white hover:border-purple-500/30"
          }`}
        >
          All <span className="opacity-70 ml-1">({getCount("all")})</span>
        </button>

        {groupTitles.map((t) => {
          const active = selectedTitles.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggleTitle(t)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleTitle(t);
                }
              }}
              aria-pressed={active}
              className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border select-none cursor-pointer ${
                active
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  : "bg-slate-950/40 text-slate-300 border-slate-800/80 backdrop-blur-md hover:bg-slate-900/60 hover:text-white hover:border-purple-500/30"
              }`}
            >
              {t} <span className="opacity-70 ml-1">({getCount(t)})</span>
            </button>
          );
        })}
      </div>

      {/* Skills Showcase Grid Container */}
      <motion.div
        animate={{ height: expanded ? "auto" : collapsedHeightTarget }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="overflow-hidden relative"
      >
        {/* Soft fading overlay at the bottom if collapsed and overflowed */}
        {!expanded && hasOverflow && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-20" />
        )}

        <motion.div
          key={selectedTitles.join("-")}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 pb-4"
          ref={contentRef}
        >
          {filteredGroups.map((group) => {
            const groupTitle = group.title ?? "Other";
            const groupSkills = group.skills ?? [];
            return (
              <section
                key={groupTitle}
                aria-labelledby={`skills-${groupTitle}`}
                className="space-y-4"
              >
                {/* Section Sub-Header (Larger Text) */}
                <h3
                  id={`skills-${groupTitle}`}
                  className="text-xs md:text-sm font-mono font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  {groupTitle}
                </h3>

                {/* Extremely Fluid Fluid Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {groupSkills.map((s) => {
                    return (
                      <motion.div
                        key={s.name}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative group overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-slate-950/70 to-slate-900/40 border border-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] cursor-default"
                      >
                        {/* Subtle interactive glow background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/0 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Top neon edge laser accent */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/40 transition-all duration-500" />

                        <div className="flex items-start justify-between gap-3 relative z-10">
                          <div className="flex-1 min-w-0">
                            {/* Skill Name (Larger Text: text-base) */}
                            <div className="font-bold text-slate-100 text-sm md:text-base tracking-tight group-hover:text-purple-300 transition-colors duration-200 truncate">
                              {s.name}
                            </div>
                            {/* Metadata/Duration (Larger Text: text-[11px] / text-xs) */}
                            <div className="text-[11px] md:text-xs text-slate-400 mt-1 font-mono tracking-wide flex flex-wrap gap-x-1.5 items-center">
                              {s.years ? (
                                <span className="text-purple-400 font-semibold">
                                  {s.years} yr{s.years > 1 ? "s" : ""}
                                </span>
                              ) : null}
                              {s.years && s.note ? (
                                <span className="opacity-40">•</span>
                              ) : null}
                              {s.note ? (
                                <span className="truncate max-w-[100px]" title={s.note}>
                                  {s.note}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          {/* Skill Icon container with soft inner shadow & subtle rotate on hover */}
                          <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-xl bg-slate-950/40 border border-slate-800/80 group-hover:border-purple-500/30 group-hover:bg-slate-950/60 transition-all duration-300 shadow-inner">
                            <Icon
                              icon={getIconifyName(s.icon, s.name)}
                              className="w-5.5 h-5.5 text-slate-300 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Premium Glow Progress Meters (Larger Text) */}
                        {s.level != null && isBar && (
                          <div className="mt-4 relative z-10">
                            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                              <span>Proficiency</span>
                              <span className="text-slate-200 font-bold group-hover:text-purple-400 transition-colors">
                                {s.level}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-950/80 border border-slate-900/60 h-2 rounded-full overflow-hidden shadow-inner relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${s.level}%` }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                              />
                            </div>
                          </div>
                        )}

                        {s.level != null && !isBar && (
                          <div className="mt-4 mx-auto w-24 h-24 relative z-10 flex items-center justify-center">
                            <SkillCircle level={s.level} />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Premium Collapse Trigger (Larger Text) */}
      {(hasOverflow || expanded) && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full cursor-pointer border border-slate-800 bg-slate-950/60 hover:bg-slate-900/40 text-slate-300 hover:text-white hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300"
            aria-expanded={expanded}
          >
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase font-bold">
              {expanded ? "Show less" : "Show more"}
            </span>
            <div className="text-purple-400 group-hover:translate-y-[-2px] group-hover:scale-110 transition-transform duration-300">
              {expanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
