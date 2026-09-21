import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  desc: string;
  icon: string;
}

const STATS: StatItem[] = [
  {
    value: 2,
    suffix: "+",
    label: "Years of Experience",
    desc: "Architecting scalable web solutions and interactive interfaces since 2024.",
    icon: "lucide:history",
  },
  {
    value: 10,
    suffix: "+",
    label: "Projects Worldwide",
    desc: "Successfully deployed full-stack SaaS apps, database designs, and automation pipelines.",
    icon: "lucide:globe",
  },
  {
    value: 10,
    suffix: "+",
    label: "Clients Worldwide",
    desc: "Partnering with global startups, digital agencies, and independent businesses.",
    icon: "lucide:users",
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    desc: "Consistently delivering high-fidelity performance, security, and prompt support.",
    icon: "lucide:heart",
  },
];

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Staggered fade in
    gsap.from(".stat-card", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    // Number counting animation
    const elements = gsap.utils.toArray<HTMLElement>(".stat-number");
    
    elements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      
      gsap.fromTo(el, 
        { innerHTML: 0 }, 
        {
          innerHTML: targetVal,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section className="py-12 flex flex-col items-center select-none overflow-hidden bg-transparent">
      <div className="w-full max-w-[1200px] px-6">
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card relative bg-[#0d0d12] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col items-start gap-4 transition-colors duration-500 hover:bg-[#12121a] hover:border-purple-500/20 group"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-[10px] bg-purple-900/10 flex items-center justify-center border border-purple-500/20 mb-2">
                <Icon
                  icon={stat.icon}
                  className="text-[1.1rem] text-[#b07dfb] group-hover:text-purple-300 transition-colors"
                />
              </div>

              {/* Numeric Metric */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-baseline">
                  <span className="stat-number text-4xl sm:text-[2.75rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#906dfa] to-[#db74ff]" data-target={stat.value}>
                    0
                  </span>
                  <span className="text-4xl sm:text-[2.75rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#906dfa] to-[#db74ff]">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-[13px] font-bold text-white tracking-wide mt-1">
                  {stat.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-400/80 leading-relaxed font-light mt-1">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
