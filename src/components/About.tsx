import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { Personal } from "../types/portfolio";

export const About: React.FC<{ personal: Personal }> = ({ personal }) => {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-end rounded-3xl bg-slate-950/45 border border-slate-800/70 text-slate-100 overflow-hidden pt-12 md:pt-16 lg:pt-20 px-6 md:px-12 lg:px-16 pb-0 shadow-[0_0_50px_rgba(168,85,247,0.03)] mx-auto">
      
      {/* ── AMBIENT BACKLIGHT GLOW (3D Avatar Aura) ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-500/20 to-pink-500/15 blur-[90px] pointer-events-none z-0" />

      {/* ── BACKGROUND GIANT TEXT (Glow-Backlit White Highlight) ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="text-[14vw] font-black tracking-tighter text-white/35 uppercase leading-none text-center w-full whitespace-nowrap drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] select-none pointer-events-none">
          DILANTHA
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 items-end w-full">
        
        {/* ── LEFT COLUMN: Professional Bio & Social Connections ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-1 flex flex-col gap-6 text-left pb-8 md:pb-12 lg:pb-16 order-1 lg:order-none self-end"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] uppercase font-mono tracking-widest w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
            Full-Stack Developer
          </div>

          <p className="text-base md:text-lg font-medium leading-relaxed tracking-tight text-slate-300">
            I am a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-bold">Full-Stack Software Engineer</span> specializing in designing and building highly scalable, secure Web Applications. I bridge the gap between elegant design aesthetics and high-performance server architectures.
          </p>
          
          {/* Social Icons & Modern View CV Button */}
          <div className="flex flex-col gap-4 mt-2 items-start w-full">
            <div className="flex gap-2.5">
              {personal.contact?.socials?.map((s) => {
                const iconMap: Record<string, string> = {
                  SiLinkedin: "simple-icons:linkedin",
                  SiGithub: "simple-icons:github",
                  LinkedIn: "simple-icons:linkedin",
                  GitHub: "simple-icons:github",
                };
                const iconName = iconMap[s.icon || ""] || iconMap[s.label || ""] || "lucide:globe";
                return (
                  <a
                    key={s.label}
                    href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-center text-slate-300 hover:bg-slate-900 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300 cursor-pointer shadow-inner hover:scale-105 active:scale-95"
                    title={s.label}
                  >
                    <Icon icon={iconName} className="text-lg" />
                  </a>
                );
              })}
            </div>
            
            <a
              href="#/resume"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold text-[11px] tracking-wider uppercase hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300 active:scale-95 cursor-pointer select-none"
            >
              <Icon icon="lucide:file-text" className="text-xs shrink-0" />
              View Standalone CV
            </a>
          </div>
        </motion.div>

        {/* ── CENTER COLUMN: Avatar with 10 Orbiting Technology Badges (Hug Avatar Position) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-2 relative flex items-end justify-center h-[380px] sm:h-[480px] md:h-[520px] lg:h-[580px] overflow-visible group select-none order-3 lg:order-none self-end"
        >
          {personal.avatar && (
            <div className="relative w-full h-full flex items-end justify-center">
              
              {/* ── FLOATING LOGO ORBITS (Pointer Events Enabled for tactile hovering) ── */}

              {/* Floating Badge 1: React (Hugging Top Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[12%] sm:left-[18%] lg:left-[8%] xl:left-[15%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(99,102,241,0.25)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:react" className="w-6 h-6 group-hover/float:rotate-[360deg] transition-transform duration-[2000ms] ease-in-out" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">React</span>
              </motion.div>

              {/* Floating Badge 2: Node.js (Hugging Top Right) */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[12%] right-[12%] sm:right-[18%] lg:right-[8%] xl:right-[15%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:nodejs-icon" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">Node.js</span>
              </motion.div>

              {/* Floating Badge 3: TypeScript (Hugging Upper Mid-Left) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[28%] left-[4%] sm:left-[10%] lg:left-[2%] xl:left-[8%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(59,130,246,0.25)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:typescript-icon" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">TypeScript</span>
              </motion.div>

              {/* Floating Badge 4: JavaScript (Hugging Upper Mid-Right) */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[30%] right-[4%] sm:right-[10%] lg:right-[2%] xl:right-[8%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(251,191,36,0.2)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:javascript" className="w-6 h-6 rounded-md" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">JavaScript</span>
              </motion.div>

              {/* Floating Badge 5: AWS (Hugging Middle Left) */}
              <motion.div
                animate={{ y: [0, -11, 0] }}
                transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[48%] left-[2%] sm:left-[8%] lg:left-[0%] xl:left-[5%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(251,191,36,0.2)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:aws" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">AWS</span>
              </motion.div>

              {/* Floating Badge 6: Tailwind CSS (Hugging Middle Right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[50%] right-[2%] sm:right-[8%] lg:right-[0%] xl:right-[5%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(14,165,233,0.2)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:tailwindcss-icon" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">Tailwind</span>
              </motion.div>

              {/* Floating Badge 7: Docker (Hugging Lower Mid-Left) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[68%] left-[8%] sm:left-[14%] lg:left-[4%] xl:left-[10%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(14,165,233,0.25)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:docker-icon" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">Docker</span>
              </motion.div>

              {/* Floating Badge 8: MongoDB (Hugging Lower Mid-Right) */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[70%] right-[8%] sm:right-[14%] lg:right-[4%] xl:right-[10%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:mongodb-icon" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">MongoDB</span>
              </motion.div>

              {/* Floating Badge 9: MySQL (Hugging Bottom Left) */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[86%] left-[15%] sm:left-[22%] lg:left-[10%] xl:left-[18%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(0,117,143,0.2)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:mysql-icon" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">MySQL</span>
              </motion.div>

              {/* Floating Badge 10: PHP (Hugging Bottom Right) */}
              <motion.div
                animate={{ y: [0, -11, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[88%] right-[15%] sm:right-[22%] lg:right-[10%] xl:right-[18%] z-20 flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-[0_0_15px_rgba(120,119,190,0.2)] backdrop-blur-md cursor-pointer hover:border-purple-500/50 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 pointer-events-auto group/float"
              >
                <Icon icon="logos:php" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">PHP</span>
              </motion.div>

              {/* Trail 3 */}
              <img
                className="absolute w-full h-full object-contain object-bottom opacity-10 -translate-x-[40px] scale-[1.35] lg:scale-[1.45] origin-bottom translate-y-[20px] md:translate-y-[35px] lg:translate-y-[50px] filter grayscale transition-transform duration-700 ease-out group-hover:-translate-x-[60px] group-hover:scale-[1.4] group-hover:lg:scale-[1.5]"
                src={personal.avatar}
                alt="profile-trail-2"
              />
              {/* Trail 2 */}
              <img
                className="absolute w-full h-full object-contain object-bottom opacity-30 -translate-x-[20px] scale-[1.4] lg:scale-[1.5] origin-bottom translate-y-[20px] md:translate-y-[35px] lg:translate-y-[50px] filter grayscale transition-transform duration-700 ease-out group-hover:-translate-x-[30px] group-hover:scale-[1.45] group-hover:lg:scale-[1.55]"
                src={personal.avatar}
                alt="profile-trail-1"
              />
              {/* Main Profile Image */}
              <img
                className="relative w-full h-full object-contain object-bottom z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)] scale-[1.45] lg:scale-[1.55] origin-bottom translate-y-[20px] md:translate-y-[35px] lg:translate-y-[50px] transition-transform duration-700 ease-out group-hover:scale-[1.5] group-hover:lg:scale-[1.6]"
                src={personal.avatar}
                alt="profile-main"
              />
            </div>
          )}
        </motion.div>

        {/* ── RIGHT COLUMN: Overview & Key Statistics (Breathing & Sleek) ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-1 flex flex-col justify-between h-full text-left gap-8 pb-8 md:pb-12 lg:pb-16 order-2 lg:order-none self-stretch"
        >
          {/* Quick Info Dashboard */}
          <div className="flex flex-col gap-6 mt-auto">
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                Engineering Base
              </h4>
              <div className="text-base font-extrabold text-slate-100">
                Colombo, Sri Lanka
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                Work Mode
              </h4>
              <div className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Remote / Freelance Available
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                Primary Stack Focus
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Building secure JWT-authenticated APIs, relational database queries (MySQL/Postgres), and high-performance React user experiences.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full justify-between">
            <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-[150px]">
              Crafted with absolute engineering precision.
            </p>
            {/* Down Arrow scroll trigger */}
            <a
              href="#projects"
              className="w-12 h-12 rounded-full border border-slate-800 bg-slate-950/60 flex items-center justify-center text-slate-300 hover:text-purple-400 hover:border-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer select-none pointer-events-auto"
              aria-label="Scroll to projects"
            >
              <Icon icon="lucide:arrow-down" className="text-lg animate-bounce" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;