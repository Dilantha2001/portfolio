import React, { useMemo, useState, useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const ProjectsGrid: React.FC<{
  projects?: Project[];
  onOpen?: (p: Project) => void;
  showFilters?: boolean;
}> = ({ projects = [], onOpen, showFilters = false }) => {
  const [filter, setFilter] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    // We only want the horizontal scroll effect on desktop where there's room
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 100); // 100px padding adjustment
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 10%",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      return () => {
        tween.kill();
      };
    });
  }, { scope: sectionRef, dependencies: [visible] });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden min-h-[70vh]">
      {showFilters && (
        <div className="flex gap-3 flex-wrap mb-8 px-6 lg:px-0">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 cursor-pointer font-semibold rounded-full text-sm transition-all duration-300 ${filter === f
                ? "bg-white text-black shadow-lg"
                : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* 
        On mobile/tablet: Standard vertical grid.
        On desktop (lg): Horizontal flex track that gets animated by GSAP.
      */}
      <div
        ref={trackRef}
        className={`
          grid grid-cols-1 md:grid-cols-2 gap-6
          lg:flex lg:flex-row lg:flex-nowrap lg:gap-8 lg:w-max
          ${showFilters ? "mt-6" : ""}
        `}
      >
        {visible.map((p, index) => (
          <div 
            key={p.id ?? index} 
            className="w-full lg:w-[450px] xl:w-[500px] h-full flex-shrink-0"
          >
            <ProjectCard project={p} index={index} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
