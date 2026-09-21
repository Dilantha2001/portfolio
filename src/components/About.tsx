import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Personal } from "../types/portfolio";

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC<{ personal: Personal }> = ({ personal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate the small badge at the top
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Animate the main text block
    tl.fromTo(textRef.current,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
      "-=0.6" // start before badge finishes
    );

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="w-full bg-transparent pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Typography */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8 md:gap-12">
          
          {/* Top Label */}
          <div 
            ref={badgeRef}
            className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-purple-300"
          >
            <span>Available For Work</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span>Full-Stack Engineer</span>
          </div>
          
          {/* Main Typography */}
          <h2 
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.2rem] font-medium text-slate-100 tracking-tight leading-[1.15]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Design and build highly scalable, secure Web Applications, focused on{" "}
            <span className="bg-purple-500 text-white px-3 py-1 rounded-[4px] font-semibold shadow-[0_0_30px_rgba(168,85,247,0.4)] box-decoration-clone leading-snug">
              performance and aesthetics,
            </span>{" "}
            ensuring your digital presence feels modern, functional, and elevated with precision engineering.
          </h2>
          
        </div>

        {/* Right Column: Avatar Image */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end relative">
           {/* Decorative Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full z-0 pointer-events-none" />
           
           <img 
              src={personal.avatar} 
              alt="Dilantha" 
              className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-full object-contain filter grayscale hover:grayscale-0 hover:scale-[1.02] transition-all duration-700 drop-shadow-2xl" 
              style={{ clipPath: "inset(0 0 15px 0)" }}
           />
        </div>

      </div>
    </div>
  );
};

export default About;
