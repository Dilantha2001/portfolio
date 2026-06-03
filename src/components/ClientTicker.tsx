import React from "react";
import { Icon } from "@iconify/react";

interface Client {
  name: string;
  icon: string;
  industry: string;
  accent: string;
}

const CLIENTS: Client[] = [
  {
    name: "University of Colombo",
    icon: "lucide:graduation-cap",
    industry: "Academic Research & Tech",
    accent: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "Motorover New Zealand",
    icon: "lucide:car",
    industry: "Automotive E-Commerce",
    accent: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "Wifi Lanka",
    icon: "lucide:wifi",
    industry: "ISP & Cloud Platforms",
    accent: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "Jeep Safari Sri Lanka",
    icon: "lucide:compass",
    industry: "Eco-Tourism Booking",
    accent: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Agni Tea Solutions",
    icon: "lucide:flame",
    industry: "Agricultural SaaS",
    accent: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "Bonsai Bar & Restaurant",
    icon: "lucide:glass-water",
    industry: "Hospitality & POS",
    accent: "from-purple-500/20 to-pink-500/20",
  },
];

export const ClientTicker: React.FC = () => {
  // Duplicate clients list to create an endless looping marquee
  const marqueeItems = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-10 flex flex-col items-center select-none overflow-hidden w-full relative">
      {/* Visual Fade Gradient Overlays for Marquee Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      <div className="w-full max-w-6xl px-4 text-center mb-8">
        <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
          Collaborations & Contributions
        </h4>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1.5 font-sans">
          Fueling Digital Success Stories
        </h3>
      </div>

      {/* Marquee Track Container */}
      <div className="w-full overflow-hidden flex py-4">
        <div className="flex gap-6 animate-marqueeRight whitespace-nowrap min-w-full">
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center gap-4.5 px-6 py-4 rounded-2xl bg-slate-900/30 dark:bg-black/35 border border-white/5 backdrop-blur-md shadow-lg hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-10px_rgba(139,92,246,0.15)] group shrink-0 cursor-pointer"
            >
              {/* Dynamic Brand Icon */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${client.accent} flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform duration-300`}>
                <Icon
                  icon={client.icon}
                  className="text-xl text-purple-400 group-hover:text-purple-300 transition-colors"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-200 group-hover:text-purple-400 transition-colors duration-300">
                  {client.name}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                  {client.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTicker;
