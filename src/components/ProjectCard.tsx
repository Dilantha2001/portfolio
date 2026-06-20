// src/components/ProjectCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { Project } from "../types/portfolio";

export const ProjectCard: React.FC<{
  project: Project;
  onOpen?: (p: Project) => void;
}> = ({ project, onOpen }) => {
  const [showAll, setShowAll] = useState(false);

  // How many tags to show before "+x"
  const VISIBLE_COUNT = 3;

  const visibleTags = showAll
    ? project?.tags
    : project?.tags?.slice(0, VISIBLE_COUNT);
  const hiddenCount = (project?.tags?.length ?? 0) - VISIBLE_COUNT;

  // Dynamic link icon mapper
  const getLinkIcon = (iconName: string, label: string): string => {
    const lowerIcon = iconName.toLowerCase();
    const lowerLabel = label.toLowerCase();
    if (lowerIcon.includes("github") || lowerLabel.includes("github")) return "simple-icons:github";
    if (lowerIcon.includes("chrome") || lowerLabel.includes("demo") || lowerLabel.includes("live")) return "lucide:external-link";
    if (lowerIcon.includes("read") || lowerIcon.includes("doc") || lowerLabel.includes("paper")) return "lucide:file-text";
    return "lucide:link";
  };

  // High-end technology tag highlighting helper
  const getTagClass = (tag: string): string => {
    const highlightTags = ["react", "typescript", "node.js", "full stack", "yolov8", "ai", "postgresql"];
    const lower = tag.toLowerCase();
    if (highlightTags.some(t => lower.includes(t))) {
      return "bg-purple-500/5 border border-purple-500/15 text-purple-400 text-[10px] font-mono tracking-tight";
    }
    return "bg-slate-900/40 border border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition duration-300 text-[10px] font-mono tracking-tight";
  };

  return (
    <motion.article
      onClick={() => onOpen?.(project)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#070b1a] border border-slate-800/80 hover:border-purple-500/30 transition-[border-color,background-color,box-shadow] duration-300 p-5 h-full overflow-hidden hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.12)] w-full select-none cursor-pointer"
    >
      {/* View Details Hint Badge */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/20 text-purple-300 text-[9px] uppercase font-mono tracking-widest opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        Details
        <Icon icon="lucide:arrow-up-right" className="text-[10px] stroke-[2.5]" />
      </div>

      <div>
        {/* ── CINEMA WIDESCREEN IMAGE COVER ── */}
        {project.image && (
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-slate-900/80 bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Cinematic dark shield on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
              {/* Quick View Button (Signature Purple Gradient) */}
              <button
                type="button"
                onClick={() => onOpen?.(project)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-purple-500/20"
                title="Quick View Details"
              >
                <Icon icon="lucide:arrow-up-right" className="text-xl stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* ── UNDER DEVELOPMENT BADGE ── */}
        {project.isUnderDevelopment && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Development
          </div>
        )}

        {/* ── CONTENT (Title + Description) ── */}
        <h3 className="mb-2">
          <button
            title="Open project details"
            type="button"
            onClick={() => onOpen?.(project)}
            className="font-bold text-lg text-slate-100 hover:text-purple-400 transition-colors duration-300 text-left cursor-pointer leading-snug tracking-tight"
          >
            {project.title}
          </button>
        </h3>
        
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light line-clamp-3 mb-5">
          {project.description}
        </p>
      </div>

      {/* ── FOOTER ACTIONS & TAGS ── */}
      <div className="mt-auto space-y-4">
        {/* Interactive Capsule Links */}
        {(project.href || (project.links && project.links.length > 0)) && (
          <div className="flex flex-wrap gap-2">
            {/* Live Demo Link */}
            {project.href && project.href !== "#" && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-850 hover:border-purple-500/30 hover:bg-purple-500/5 hover:-translate-y-0.5 text-[11px] font-medium text-slate-300 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <Icon icon="lucide:external-link" className="text-sm text-purple-400 shrink-0" />
                <span>Live Demo</span>
              </a>
            )}

            {/* Custom Repository/Paper Links */}
            {project.links?.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-850 hover:border-purple-500/30 hover:bg-purple-500/5 hover:-translate-y-0.5 text-[11px] font-medium text-slate-300 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <Icon
                  icon={getLinkIcon(link.icon || "", link.label)}
                  className="text-sm text-purple-400 shrink-0"
                />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Clean Tech Capsules */}
        {visibleTags && visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-900/80 items-center">
            {visibleTags.map((t) => (
              <span key={t} className={`px-2 py-0.5 rounded-full ${getTagClass(t)}`}>
                {t}
              </span>
            ))}

            {/* Hidden tags indicator */}
            {!showAll && hiddenCount > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAll(true);
                }}
                className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-850 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition duration-300 cursor-pointer"
              >
                +{hiddenCount} More
              </button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
