// PortfolioPage.tsx
import React, { useState } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/shared/Header";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { SkillsList } from "../components/SkillsList";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/shared/Footer";
import { PORTFOLIO_INFO } from "../config/portfolioData";
import { About } from "../components/About";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import { ScrollToTop } from "../components/shared/ScrollToTop";
import CLIResume from "../components/CLIResume";
import BrowserMockup from "../components/BrowserMockup";
import { Icon } from "@iconify/react";

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);

  return (
    <ThemeProvider>
      <ScrollProgressBar />

      {/* Main Page Container */}
      <div className="relative w-full z-10">

        <Header
          links={[
            { href: "#about", label: "About" },
            { href: "#projects", label: "Projects" },
            { href: "#/resume", label: "Resume" },
            { href: "#skills", label: "Skills" },
            { href: "#contact", label: "Contact" },
          ]}
          onTryCLI={() => setShowCLI(true)}
        />

        {/* CLI panel */}
        <CLIResume open={showCLI} onClose={() => setShowCLI(false)} />

        {/* ==================== FIRST PAGE (HERO SECTION) ==================== */}
        <div
          className="relative w-full h-screen z-10 flex items-center justify-center bg-black"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0 ">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-6">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white filter [filter:drop-shadow(0_0_15px_rgba(0,0,0,0.5))_drop-shadow(0_0_30px_rgba(0,0,0,0.4))] md:text-7xl lg:text-8xl">
              Breathe life into your <br />
              <span className="text-gradient" data-text="worlds.">
                worlds.
              </span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-white md:text-xl [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_12px_rgba(0,0,0,1),0_0_24px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)]">
              Generate breathtaking anime landscapes, dynamic weather, and majestic lighting. <br className="hidden md:block" />
              Build epic scenes built for true storytelling.
            </p>

            <a
              href="#about"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)] transition-all duration-300 hover:bg-brand-light hover:text-slate-900 cursor-pointer"
            >
              Explore Portfolio
              <Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* ==================== SECOND PAGE (MAIN CONTENT WRAPPER) ==================== */}
        {/* මේක මුලින්ම වමේ ඉඳන් දකුණට clip වෙලා (inset 100%) තියෙන්නේ. Scroll කරද්දී දිග ඇරිලා 1st page එක වහගන්නවා */}
        <div
          className="relative w-full z-20 bg-[var(--background)]"
        >
          {/* About Section */}
          <div id="about" className="relative w-full pt-32 pb-10">
            <About personal={PORTFOLIO_INFO.personal} />
          </div>

          {/* ── Live Demo Showcase Section (Full Viewport Width) ── */}
          <section id="live-demo" className="w-full py-16 px-6 md:px-12 lg:px-24 bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="max-w-[1800px] mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-[var(--brand)]">Live Project Demos</h2>
                <p className="text-sm text-white mt-1">
                  Interact with my live projects directly from here.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mockup 1: Portfolio */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Professional Portfolio</span>
                    <a
                      href="https://comfy-medovik-ee1f2a.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brand)] underline hover:opacity-80"
                    >
                      Open Fullscreen ↗
                    </a>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "18px",
                      padding: "2px",
                      background: "linear-gradient(135deg, #5F67E6 0%, #8B5CF6 50%, #5F67E6 100%)",
                      boxShadow: "0 0 40px rgba(95,103,230,0.2)",
                    }}
                  >
                    <BrowserMockup
                      url="https://comfy-medovik-ee1f2a.netlify.app/"
                      title="Portfolio Preview"
                      viewportHeight={550}
                    />
                  </div>
                </div>

                {/* Mockup 2: Smart Banking */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Smart Banking Web</span>
                    <a
                      href="https://beautiful-travesseiro-228b5f.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brand)] underline hover:opacity-80"
                    >
                      Open Fullscreen ↗
                    </a>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "18px",
                      padding: "2px",
                      background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #8B5CF6 100%)",
                      boxShadow: "0 0 40px rgba(139,92,246,0.2)",
                    }}
                  >
                    <BrowserMockup
                      url="https://beautiful-travesseiro-228b5f.netlify.app/"
                      title="Banking App Preview"
                      viewportHeight={550}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content (Projects, Skills, Contact) */}
          <main className="max-w-[1800px] w-full mx-auto px-6 md:px-12 py-10">

            <section id="projects" className="py-8">
              <h2 className="text-2xl font-semibold text-[var(--brand)]">
                Projects
              </h2>
              <p className="mb-6 text-sm text-white mt-1">
                Selected work — click a card for details.
              </p>
              <ProjectsGrid
                projects={PORTFOLIO_INFO.projects}
                onOpen={setSelected}
              />
            </section>

            <section id="skills" className="py-8">
              <h2 className="text-2xl font-semibold text-[var(--brand)]">
                Skills
              </h2>
              <p className="mb-6 text-sm text-white mt-1">
                Tools and technologies I use regularly.
              </p>
              <SkillsList skills={PORTFOLIO_INFO.skills} isBar={true} />
            </section>

            <section id="contact" className="py-8">
              <h2 className="text-2xl font-semibold text-[var(--brand)]">
                Contact
              </h2>
              <p className="text-sm text-white mt-1">
                Tell me about your project, or just say hi.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <ContactForm />
                </div>

                <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-4">
                  <div>
                    <div className="font-semibold">Let's collaborate</div>
                    <div className="text-sm text-white">
                      I'm available for freelance and contract work. My inbox is open.
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="font-semibold">Quick contact</div>
                    <div className="mt-2 text-sm text-white">
                      Email: <a href={`mailto:${PORTFOLIO_INFO.personal.contact?.email}`} className="hover:text-[var(--brand)] transition duration-200">{PORTFOLIO_INFO.personal.contact?.email}</a>
                    </div>
                    <div className="text-sm text-white capitalize">
                      Location: {PORTFOLIO_INFO.personal.contact?.location || "Remote"}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-sm font-medium">Resume</div>
                    <a
                      href={PORTFOLIO_INFO.meta?.pdf || "/resume.pdf"}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-center transition-all duration-300 hover:border-[var(--brand)] hover:text-[var(--brand)] hover:shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>

      </div>

      <ScrollToTop />

      <ProjectModal
        project={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ThemeProvider>
  );
};

export default PortfolioPage;