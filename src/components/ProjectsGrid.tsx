import React, { useMemo, useState, useEffect, useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current?.children;
    if (!cards || cards.length === 0) return;

    // Reset initial values before starting reveal animation
    gsap.set(cards, { opacity: 0, y: 30 });

    const scrollAnim = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%", // starts when top of container is at 85% viewport height
        toggleActions: "play none none none",
      },
    });

    return () => {
      scrollAnim.scrollTrigger?.kill();
      scrollAnim.kill();
    };
  }, [visible]);

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

      <div
        ref={gridRef}
        className={`${showFilters ? "mt-6" : ""
          } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
      >
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
};
