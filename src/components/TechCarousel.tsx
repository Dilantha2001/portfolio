import React from "react";
import { Icon } from "@iconify/react";

const TECH_STACK = [
  { name: "React", icon: "logos:react", color: "" },
  { name: "Node.js", icon: "logos:nodejs-icon", color: "" },
  { name: "TypeScript", icon: "logos:typescript-icon", color: "" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", color: "" },
  { name: "Next.js", icon: "logos:nextjs-icon", color: "" },
  { name: "MongoDB", icon: "logos:mongodb-icon", color: "" },
  { name: "PostgreSQL", icon: "logos:postgresql", color: "" },
  { name: "Docker", icon: "logos:docker-icon", color: "" },
  { name: "AWS", icon: "logos:aws", color: "" },
  { name: "Express", icon: "simple-icons:express", color: "text-white" },
];

export const TechCarousel: React.FC = () => {
  // Duplicate the array to create a seamless infinite scroll effect
  const logos = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="w-full bg-transparent py-5 overflow-hidden border-t border-b border-white/5 relative z-20">
      <div className="w-full">
        {/* Logo Carousel container */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll">
            {logos.map((tech, index) => (
              <li
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center gap-1.5 group opacity-100 transition-all duration-300 hover:scale-110 drop-shadow-md"
              >
                <Icon
                  icon={tech.icon}
                  className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-300 ${tech.color}`}
                />
                <span className="text-[10px] md:text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors">
                  {tech.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechCarousel;
