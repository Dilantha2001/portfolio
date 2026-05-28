// src/components/shared/Footer.tsx
import React from "react";
import { Icon } from "@iconify/react";
import { PORTFOLIO_INFO } from "../../config/portfolioData";

export const Footer: React.FC = () => {
  return (
    <footer 
      className="relative w-full border-t border-slate-900/50 py-16 mt-20 select-none overflow-hidden"
      style={{
        backgroundImage: "url('/footer_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Semi-transparent luxury dark overlay shield (adjusted for full grid visibility) */}
      <div className="absolute inset-0 bg-[#020617]/40 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        
        {/* Left Side: Brand Image & Copyright Signature */}
        <div className="flex items-center gap-4 text-left">
          {PORTFOLIO_INFO.personal?.avatar && (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-purple-500/10 shrink-0 group hover:scale-105 transition-transform duration-300">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={PORTFOLIO_INFO.personal.avatar}
                alt={PORTFOLIO_INFO.personal.name}
              />
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <div className="text-xs font-black tracking-widest text-slate-200 uppercase font-mono">
              DILANTHA RANAWEERA
            </div>
            <div className="text-[10px] text-slate-500 font-medium tracking-tight">
              © {new Date().getFullYear()} • Software Engineer & Visual Developer. All rights reserved.
            </div>
          </div>
        </div>

        {/* Center: Minimalist Link Stack (Clean, Desktop only) */}
        <div className="hidden md:flex items-center gap-6 text-xs text-slate-500 font-medium font-sans">
          <a href="#about" className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">About</a>
          <a href="#projects" className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">Projects</a>
          <a href="#/resume" className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">CV/Resume</a>
          <a href="#skills" className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">Skills</a>
          <a href="#contact" className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">Contact</a>
        </div>

        {/* Right Side: Glass Social Sockets */}
        <div className="flex items-center gap-3">
          {PORTFOLIO_INFO.personal?.contact?.socials?.map((s) => {
            const iconMap: Record<string, string> = {
              SiLinkedin: "simple-icons:linkedin",
              SiGithub: "simple-icons:github",
              LinkedIn: "simple-icons:linkedin",
              GitHub: "simple-icons:github",
            };
            const iconName = iconMap[s.icon] || iconMap[s.label] || "lucide:globe";
            return (
              <a
                key={s.label}
                href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-slate-900 bg-slate-950/40 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                title={s.label}
              >
                <Icon icon={iconName} className="text-base" />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
