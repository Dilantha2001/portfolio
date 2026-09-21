import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { Project } from "../types/portfolio";

export const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpen?: (p: Project) => void;
}> = ({ project, index, onOpen }) => {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 3;

  const visibleTags = showAll
    ? project?.tags
    : project?.tags?.slice(0, VISIBLE_COUNT);
  const hiddenCount = (project?.tags?.length ?? 0) - VISIBLE_COUNT;

  return (
    <motion.article
      onClick={() => onOpen?.(project)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-transparent border border-white/5 overflow-hidden w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[3/4.5] select-none cursor-pointer"
    >
      {/* Background Image */}
      {project.image ? (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-black" />
      )}
      
      {/* Dark Gradient Overlay for text readability (matches the image's dark bottom) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay group-hover:bg-purple-600/10 transition-colors duration-500" />

      {/* Top Header Section (Index + Tags) */}
      <div className="relative z-10 p-6 flex justify-between items-start w-full">
        {/* Index Circle */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
          <span className="text-white text-xs font-medium tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-end max-w-[70%]">
          {visibleTags?.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium tracking-wide whitespace-nowrap"
            >
              {t}
            </span>
          ))}
          {!showAll && hiddenCount > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAll(true);
              }}
              className="px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium tracking-wide whitespace-nowrap cursor-pointer hover:bg-white/10 transition-colors"
            >
              +{hiddenCount}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Content Section (Title, Desc, Link Button) */}
      <div className="relative z-10 p-6 flex items-end justify-between w-full mt-auto">
        <div className="flex flex-col max-w-[80%]">
          {/* Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed line-clamp-2 md:line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Yellow Action Button */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f4ff52] text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,255,82,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
          <Icon icon="lucide:arrow-up-right" className="text-xl sm:text-2xl stroke-[2.5]" />
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
