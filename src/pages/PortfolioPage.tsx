// PortfolioPage.tsx
import React, { useState, useEffect, useRef } from "react";
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

// GSAP Imports
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);

  // Refs for Page Wipe Animation
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const firstPageRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = pageContainerRef.current;
    const firstPage = firstPageRef.current;
    const secondPage = secondPageRef.current;

    if (!container || !firstPage || !secondPage) return;

    // Scroll Animation Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",       // Container එක screen එකේ උඩම වදිද්දී පටන් ගන්නවා
        end: "+=150%",         // Wipe effect එක සිද්ද වෙන්න scroll කරන්න ඕනෙ දුර
        scrub: 0.5,            // Reduced lag to prevent incomplete renders
        pin: true,             // Animation එක ඉවර වෙනකන් මුළු page එකම screen එකේ lock වෙනවා
        anticipatePin: 1,
      },
    });

    // Page Wipe Effect:
    // දෙවෙනි පිටුව (inset(0% 100% 0% 0%)) වමේ සිට දකුණට slide වෙලා ඇවිත් පළවෙනි පිටුව වහගන්නවා.
    tl.to(secondPage, {
      clipPath: "inset(0% -1% 0% 0%)", // Negative inset ensures it covers fully
      ease: "none",
      duration: 1,
    })
    // Add a buffer so the animation completes before the user finishes scrolling
    .to({}, { duration: 0.2 });

    return () => {
      // Clean up triggers on unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <ScrollProgressBar />

      {/* Main Page Container - GSAP ScrollTrigger එකෙන් පාලනය කරන්නේ මේකයි */}
      <div ref={pageContainerRef} className="relative w-full h-screen overflow-hidden z-10">

        <Header
          links={[
            { href: "#about", label: "About" },
            { href: "#projects", label: "Projects" },
            { href: "#skills", label: "Skills" },
            { href: "#contact", label: "Contact" },
          ]}
          onTryCLI={() => setShowCLI(true)}
        />

        {/* CLI panel */}
        <CLIResume open={showCLI} onClose={() => setShowCLI(false)} />

        {/* ==================== FIRST PAGE (HERO SECTION) ==================== */}
        <div
          ref={firstPageRef}
          className="absolute inset-0 w-full h-full z-10 flex items-center justify-center bg-black"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0 opacity-40">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Radically better <br className="hidden md:block" /> observability stack
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Ship higher-quality software faster. Be the hero{" "}
              <br className="hidden md:block" /> of your engineering teams.
            </p>
          </div>
        </div>

        {/* ==================== SECOND PAGE (MAIN CONTENT WRAPPER) ==================== */}
        {/* මේක මුලින්ම වමේ ඉඳන් දකුණට clip වෙලා (inset 100%) තියෙන්නේ. Scroll කරද්දී දිග ඇරිලා 1st page එක වහගන්නවා */}
        <div
          ref={secondPageRef}
          className="absolute inset-0 w-full h-full z-20 overflow-y-auto bg-[var(--background)]"
          style={{ clipPath: "inset(0% 100% 0% 0%)", willChange: "clip-path" }}
        >
          {/* About Section */}
          <div id="about" className="relative w-full max-w-6xl 2xl:max-w-9xl mx-auto px-6 pt-32 pb-10">
            <About personal={PORTFOLIO_INFO.personal} />
          </div>

          {/* Main Content (Projects, Skills, Contact) */}
          <main className="max-w-6xl 2xl:max-w-9xl mx-auto px-6 py-10">

            {/* ── Live Demo Showcase Section ── */}
            <section id="live-demo" className="py-10">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[var(--brand)]">Live Portfolio Demo</h2>
                <p className="text-sm text-white mt-1">
                  Scroll through the live site right here — click{" "}
                  <a
                    href="https://comfy-medovik-ee1f2a.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--brand)] underline hover:opacity-80 transition-opacity"
                  >
                    open in new tab ↗
                  </a>{" "}
                  for the full experience.
                </p>
              </div>

              {/* Glow container */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "18px",
                  padding: "2px",
                  background: "linear-gradient(135deg, #5F67E6 0%, #8B5CF6 50%, #5F67E6 100%)",
                  boxShadow: "0 0 60px rgba(95,103,230,0.35), 0 0 120px rgba(139,92,246,0.2)",
                }}
              >
                <BrowserMockup
                  url="https://comfy-medovik-ee1f2a.netlify.app/"
                  title="Dilantha Ranaweera — Portfolio"
                  viewportHeight={520}
                />
              </div>
            </section>

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
                      Email: satyasubudhi089@gmail.com
                    </div>
                    <div className="text-sm text-white">
                      Location: Remote
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-sm font-medium">Resume</div>
                    <a
                      href="/"
                      className="block mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
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