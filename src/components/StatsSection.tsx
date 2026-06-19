import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = containerRef.current?.querySelectorAll(".stat-number");
    if (!elements) return;

    const anims: gsap.core.Tween[] = [];

    elements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      const obj = { val: 0 };
      
      const anim = gsap.to(obj, {
        val: targetVal,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reset",
          onLeaveBack: () => {
            obj.val = 0;
            el.textContent = "0";
          }
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toString();
        },
      });
      anims.push(anim);
    });

    return () => {
      anims.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, []);

  return (
    <section className="py-12 flex flex-col items-center select-none overflow-hidden">
      <div className="w-full max-w-[1400px] px-4 md:px-8">
        
        {/* Grid Layout */}
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="relative bg-slate-900/20 dark:bg-black/35 border border-white/5 shadow-2xl backdrop-blur-xl hover:border-purple-500/20 transition-all duration-500 rounded-3xl p-8 flex flex-col items-start gap-4.5 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-15px_rgba(139,92,246,0.2)] group cursor-pointer overflow-hidden"
            >
              {/* Backlight Ambient Glow */}
              <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all duration-500 pointer-events-none" />

              {/* Icon Container */}
              <div className="w-11 h-11 rounded-xl bg-purple-500/5 flex items-center justify-center border border-purple-500/15 group-hover:scale-105 group-hover:bg-purple-500/15 transition-all duration-300">
                <Icon
                  icon={stat.icon}
                  className="text-xl text-purple-400 group-hover:text-purple-300 transition-colors"
                />
              </div>

              {/* Numeric Metric */}
              <div className="flex flex-col gap-1">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 group-hover:from-indigo-300 group-hover:to-pink-300 transition-all duration-300 font-sans">
                  <span className="stat-number" data-target={stat.value}>0</span>
                  {stat.suffix}
                </span>
                <span className="text-sm font-bold text-slate-100 group-hover:text-purple-400 transition-colors duration-300 font-sans leading-snug">
                  {stat.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed font-light transition-colors duration-300">
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
