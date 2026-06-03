import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Specializations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current?.children;
    if (!cards || cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 40 });

    const scrollAnim = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      scrollAnim.scrollTrigger?.kill();
      scrollAnim.kill();
    };
  }, []);

  const items = [
    {
      title: "Full-Stack SaaS & Web Applications",
      description: "Developing robust client-server architectures with seamless state synchronization, high-fidelity interfaces, and rich user interactions.",
      icon: "lucide:layers",
      tech: ["React", "TypeScript", "Node.js", "Express", "Redux"],
    },
    {
      title: "Enterprise Logistics & Secure APIs",
      description: "Designing optimized relational and document database schemas, integrating authentication, logistics flows, and encrypted payment structures.",
      icon: "lucide:database",
      tech: ["MySQL", "PostgreSQL", "MongoDB", "JWT Auth", "REST APIs"],
    },
    {
      title: "AI Research & Automation Systems",
      description: "Implementing computer vision models, YOLOv8 classification pipelines, and sequence tracking to automate behavioral and spatial analysis.",
      icon: "lucide:cpu",
      tech: ["Python", "YOLOv8", "TensorFlow", "Computer Vision", "LSTM"],
    },
    {
      title: "UI/UX & Interactive Design",
      description: "Crafting wireframes, premium dark-theme layouts, fluid transitions, and responsive design systems that prioritize user engagement.",
      icon: "lucide:palette",
      tech: ["Figma", "Tailwind CSS", "Framer Motion", "GSAP Animations", "UI/UX Design"],
    },
  ];

  return (
    <section className="py-12 flex flex-col items-center select-none overflow-hidden">
      <div className="w-full max-w-[1400px] px-4 md:px-8">
        {/* Modern luxury section header */}
        <div className="text-center mb-12 flex flex-col items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-[10px] font-bold font-mono tracking-widest text-purple-400 uppercase">
            <Icon icon="lucide:sparkles" className="text-xs" />
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            What I Build
          </h2>
          <p className="max-w-xl text-sm text-slate-400 font-light mt-1">
            Bridging complex logical backends with visual and interactive frontends.
          </p>
        </div>

        {/* 4-Column Luxury Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/30 dark:bg-black/45 border border-white/5 shadow-2xl backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 rounded-3xl p-9 sm:p-10 flex flex-col items-start gap-6 min-h-[460px] hover:-translate-y-2 hover:shadow-[0_15px_35px_-15px_rgba(139,92,246,0.25)] group cursor-pointer"
            >
              {/* Luxury Icon Socket */}
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 shadow-md">
                <Icon
                  icon={item.icon}
                  className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors"
                />
              </div>

              {/* Text elements */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors duration-300 font-sans tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] sm:text-sm lg:text-[15px] text-slate-400 group-hover:text-slate-300 leading-relaxed font-light transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5 w-full">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-950/40 border border-white/5 text-purple-400/80 group-hover:text-purple-300 group-hover:border-purple-500/20 transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specializations;
