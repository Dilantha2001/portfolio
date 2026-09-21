import React from "react";
import ScrollReveal from "./shared/ScrollReveal";

export default function LiveIframeShowcase() {
  const sites = [
    {
      title: "Smart Banking Web",
      url: "https://wondrous-zuccutto-2cd2ce.netlify.app/",
    },
    {
      title: "Portfolio Preview",
      url: "https://comfy-medovik-ee1f2a.netlify.app/",
    }
  ];

  return (
    <section className="w-full py-24 bg-transparent relative z-20">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Interactive <span className="text-purple-500">Live Previews</span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm md:text-base">
              Scroll inside the screens below to explore the actual live deployments of my projects.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {sites.map((site, index) => (
            <ScrollReveal key={index}>
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 bg-[#0d1117] flex flex-col group transition-all duration-500 hover:border-purple-500/30 hover:shadow-purple-500/20">
                
                {/* Browser Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5 relative">
                  <div className="flex gap-1.5 absolute left-4">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  
                  <div className="mx-auto w-1/2 max-w-[300px] h-6 rounded bg-white/5 flex items-center justify-center px-3">
                    <span className="text-[10px] md:text-xs text-white/40 truncate font-mono">
                      {site.url.replace("https://", "")}
                    </span>
                  </div>
                  
                  <a 
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Open ↗
                  </a>
                </div>

                {/* Iframe Container */}
                <div className="relative w-full h-[600px] md:h-[700px] bg-black">
                  <iframe 
                    src={site.url}
                    title={site.title}
                    className="w-full h-full border-none"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                  {/* Overlay to prevent accidental scrolling while scrolling the main page on mobile */}
                  <div className="absolute inset-0 bg-transparent pointer-events-none md:hidden"></div>
                </div>
                
                {/* Footer Label */}
                <div className="px-6 py-4 bg-[#0d1117] border-t border-white/5">
                  <h3 className="text-white font-medium text-lg">{site.title}</h3>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
