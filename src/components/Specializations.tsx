"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Specializations() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Initial state for cards
    gsap.set(".process-card", { 
      scale: 0.8,
      filter: "blur(10px)"
    });

    let mm = gsap.matchMedia();

    // DESKTOP ANIMATION
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      const pDesktop = document.querySelector("#path-desktop") as SVGPathElement;
      if (pDesktop) {
        const len = pDesktop.getTotalLength();
        gsap.set(pDesktop, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(pDesktop, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
        tl.to("#bubble-desktop", { motionPath: { path: "#path-desktop" }, ease: "none", duration: 1 }, 0);
      }

      const percentages = [0.089, 0.317, 0.544, 0.772, 1.0];
      percentages.forEach((pct, index) => {
        const startTime = Math.max(0, pct - 0.08); 
        tl.to(`.process-card-${index + 1}`, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.08, ease: "power2.out" }, startTime);
      });
    });

    // MOBILE ANIMATION
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      const pMobile = document.querySelector("#path-mobile") as SVGPathElement;
      if (pMobile) {
        const len = pMobile.getTotalLength();
        gsap.set(pMobile, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(pMobile, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
        tl.to("#bubble-mobile", { motionPath: { path: "#path-mobile" }, ease: "none", duration: 1 }, 0);
      }

      const percentages = [0.089, 0.317, 0.544, 0.772, 1.0];
      percentages.forEach((pct, index) => {
        const startTime = Math.max(0, pct - 0.08); 
        tl.to(`.process-card-${index + 1}`, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.08, ease: "power2.out" }, startTime);
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full flex flex-col items-center pt-8 pb-32 text-slate-900 overflow-hidden bg-[#f6f7f2]">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 w-full h-full text-center z-0 opacity-[0.03] pointer-events-none overflow-hidden select-none flex flex-col justify-evenly py-20">
        <h1 className="text-[13vw] font-black text-black uppercase leading-none tracking-tighter whitespace-nowrap">WHAT I BUILD</h1>
        <h1 className="text-[13vw] font-black text-black uppercase leading-none tracking-tighter whitespace-nowrap">CAPABILITIES</h1>
        <h1 className="text-[13vw] font-black text-black uppercase leading-none tracking-tighter whitespace-nowrap">DILANTHA</h1>
      </div>
      
      {/* Decorative blurry blobs */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute top-[60%] right-[-10%] w-[30rem] h-[30rem] bg-black opacity-5 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      <div className="relative w-full overflow-visible mt-0 z-10">
        
        {/* DESKTOP SVG (Hidden on Mobile) */}
        <svg id="svg-desktop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="w-full h-auto overflow-visible hidden md:block">
          <path id="path-desktop" className="theLine"
                d="M 0, 100 
                   L 250, 100
                   C 250, 250 750, 150 750, 300 
                   C 750, 450 250, 350 250, 500 
                   C 250, 650 750, 550 750, 700 
                   C 750, 850 250, 750 250, 900"
                fill="none" stroke="#a855f7" strokeWidth="4px" />
          <g id="bubble-desktop">
            <g transform="scale(0.07) translate(-210, -203)">
              <g opacity="0.8" filter="url(#filter0_f_120_6342)"><circle cx="136.065" cy="270.497" r="55.0736" transform="rotate(-95.0601 136.065 270.497)" fill="#6b21a8"/></g>
              <g filter="url(#filter1_f_120_6342)"><circle cx="260.244" cy="161.304" r="92.3815" transform="rotate(-95.0601 260.244 161.304)" fill="#111111"/></g>
              <g filter="url(#filter2_f_120_6342)"><circle cx="156.847" cy="184.57" r="92.3815" transform="rotate(-95.0601 156.847 184.57)" fill="#a855f7"/></g>
              <circle cx="215.1" cy="176.107" r="141.625" transform="rotate(-95.0601 215.1 176.107)" stroke="#a855f7" strokeWidth="2"/>
              <g filter="url(#filter5_f_120_6342)"><circle cx="215.1" cy="176.107" r="139.125" transform="rotate(-95.0601 215.1 176.107)" stroke="#7e22ce" strokeWidth="6"/></g>
              <g opacity="0.9" filter="url(#filter7_f_120_6342)"><ellipse cx="157.019" cy="229.818" rx="19.5172" ry="32.6618" transform="rotate(-50.0601 157.019 229.818)" fill="#ffffff"/></g>
              <g opacity="0.7" filter="url(#filter8_f_120_6342)"><ellipse cx="291.639" cy="96.437" rx="18.8603" ry="38.5996" transform="rotate(-50.0601 291.639 96.437)" fill="#d8b4fe"/></g>
              <defs>
                <filter id="filter0_f_120_6342" x="0.988525" y="135.42" width="270.154" height="270.154" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_120_6342"/></filter>
                <filter id="filter1_f_120_6342" x="99.8568" y="0.917114" width="320.774" height="320.774" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="34" result="effect1_foregroundBlur_120_6342"/></filter>
                <filter id="filter2_f_120_6342" x="2.46021" y="30.1824" width="308.774" height="308.774" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="31" result="effect1_foregroundBlur_120_6342"/></filter>
                <filter id="filter5_f_120_6342" x="56.9658" y="17.9728" width="316.268" height="316.268" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_120_6342"/></filter>
                <filter id="filter7_f_120_6342" x="105.011" y="180.056" width="104.016" height="99.5249" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_120_6342"/></filter>
                <filter id="filter8_f_120_6342" x="235.654" y="43.7413" width="111.969" height="105.391" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_120_6342"/></filter>
              </defs>
            </g>
          </g>
        </svg>

        {/* MOBILE SVG (Hidden on Desktop) - Extremely tall vertical zigzag to give cards generous spacing */}
        <svg id="svg-mobile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 6500" className="w-full h-auto overflow-visible md:hidden">
          <path id="path-mobile" className="theLine"
                d="M 500, 100 
                   L 500, 300
                   C 500, 1100 750, 700 750, 1500
                   C 750, 2300 250, 1900 250, 2700
                   C 250, 3500 750, 3100 750, 3900
                   C 750, 4700 250, 4300 250, 5100
                   C 250, 5900 500, 5500 500, 6300
                   L 500, 6400"
                fill="none" stroke="#a855f7" strokeWidth="4px" />
          <g id="bubble-mobile">
            <g transform="scale(0.07) translate(-210, -203)">
              <g opacity="0.8" filter="url(#filter0_m)"><circle cx="136.065" cy="270.497" r="55.0736" transform="rotate(-95.0601 136.065 270.497)" fill="#6b21a8"/></g>
              <g filter="url(#filter1_m)"><circle cx="260.244" cy="161.304" r="92.3815" transform="rotate(-95.0601 260.244 161.304)" fill="#111111"/></g>
              <g filter="url(#filter2_m)"><circle cx="156.847" cy="184.57" r="92.3815" transform="rotate(-95.0601 156.847 184.57)" fill="#a855f7"/></g>
              <circle cx="215.1" cy="176.107" r="141.625" transform="rotate(-95.0601 215.1 176.107)" stroke="#a855f7" strokeWidth="2"/>
              <g filter="url(#filter5_m)"><circle cx="215.1" cy="176.107" r="139.125" transform="rotate(-95.0601 215.1 176.107)" stroke="#7e22ce" strokeWidth="6"/></g>
              <g opacity="0.9" filter="url(#filter7_m)"><ellipse cx="157.019" cy="229.818" rx="19.5172" ry="32.6618" transform="rotate(-50.0601 157.019 229.818)" fill="#ffffff"/></g>
              <g opacity="0.7" filter="url(#filter8_m)"><ellipse cx="291.639" cy="96.437" rx="18.8603" ry="38.5996" transform="rotate(-50.0601 291.639 96.437)" fill="#d8b4fe"/></g>
              <defs>
                <filter id="filter0_m" x="0" y="135" width="270" height="270" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="40"/></filter>
                <filter id="filter1_m" x="99" y="0" width="320" height="320" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="34"/></filter>
                <filter id="filter2_m" x="2" y="30" width="308" height="308" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="31"/></filter>
                <filter id="filter5_m" x="56" y="17" width="316" height="316" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="8"/></filter>
                <filter id="filter7_m" x="105" y="180" width="104" height="99" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="12"/></filter>
                <filter id="filter8_m" x="235" y="43" width="111" height="105" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="12"/></filter>
              </defs>
            </g>
          </g>
        </svg>

        {/* --- Content Cards mapped to alternating layout --- */}
        {[
          { id: 1, year: "'01", title: "Full-Stack SaaS", desc: "Developing robust client-server architectures with seamless state synchronization and rich user interactions.", align: "left", top: "10%" },
          { id: 2, year: "'02", title: "Enterprise Logistics", desc: "Designing optimized database schemas, integrating authentication, logistics flows, and encrypted payment structures.", align: "right", top: "30%" },
          { id: 3, year: "'03", title: "Secure APIs", desc: "Building scalable, robust, and secure backend solutions. Turning complex logic into high-performance code.", align: "left", top: "50%" },
          { id: 4, year: "'04", title: "AI & Automation", desc: "Implementing computer vision models, YOLOv8 classification pipelines, and sequence tracking for automated analysis.", align: "right", top: "70%" },
          { id: 5, year: "'05", title: "UI/UX Design", desc: "Crafting wireframes, premium dark-theme layouts, fluid transitions, and responsive design systems.", align: "left", top: "90%" },
        ].map((card) => (
          <div 
            key={card.id}
            className={`process-card process-card-${card.id} opacity-0 absolute w-[calc(100%-2rem)] sm:w-[340px] md:w-[420px] p-6 md:p-10 rounded-3xl bg-[#09090b] border border-white/5 flex flex-col z-10 shadow-2xl shadow-purple-900/10 -translate-x-1/2 -translate-y-1/2 left-1/2 ${card.align === 'right' ? 'md:left-3/4' : 'md:left-1/4'}`}
            style={{ top: card.top }}
          >
            {/* Dark Box for Year/Number */}
            <div className="bg-purple-500/10 w-20 h-16 rounded-[14px] flex items-center justify-center mb-6">
              <h2 className="text-3xl font-bold text-purple-400 tracking-tighter">
                {card.year}
              </h2>
            </div>
            
            {/* Title & Desc */}
            <h3 className="text-[1.35rem] md:text-2xl font-medium text-white mb-3 tracking-tight">
              {card.title}
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-[1.6] mb-8">
              {card.desc}
            </p>
            
            {/* Footer Row */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                {/* Overlapping Avatars/Icons */}
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-[3px] border-[#09090b] flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-600 border-[3px] border-[#09090b] flex items-center justify-center text-white font-bold text-xs">
                    DEV
                  </div>
                </div>
                {/* Meta Text */}
                <div className="flex flex-col">
                  <span className="text-slate-300 text-sm font-medium">@dilantha</span>
                  <span className="text-slate-500 text-xs">Step {card.id}</span>
                </div>
              </div>

              {/* Read More Button */}
              <button className="px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-xl hover:bg-purple-600 transition-colors shadow-md">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
