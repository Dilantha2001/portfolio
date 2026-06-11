import React, { useMemo, useState, useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../types/portfolio";
import { motion, useInView } from "framer-motion";

export const ProjectsGrid: React.FC<{
  projects?: Project[];
  onOpen?: (p: Project) => void;
  showFilters?: boolean;
}> = ({ projects = [], onOpen, showFilters = false }) => {
  const [filter, setFilter] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((p) => p.tags || []))),
    ],
    [projects]
  );
  const visible = projects.filter(
    (p) => filter === "All" || (p.tags || []).includes(filter)
  );

  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 14,
      },
    },
  };

  return (
    <section>
      {showFilters && (
        <div className="flex gap-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 cursor-pointer font-semibold rounded-full text-sm ${filter === f
                ? "bg-[var(--brand)] text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <motion.div
        ref={gridRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`${showFilters ? "mt-6" : ""
          } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
      >
        {visible.map((p) => (
          <motion.div key={p.id} variants={cardVariants} className="h-full w-full">
            <ProjectCard project={p} onOpen={onOpen} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsGrid;
