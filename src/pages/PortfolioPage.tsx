// PortfolioPage.tsx
import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/shared/Header";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { Specializations } from "../components/Specializations";
import { SkillsList } from "../components/SkillsList";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/shared/Footer";
import { PORTFOLIO_INFO } from "../config/portfolioData";
import { About } from "../components/About";
import { StatsSection } from "../components/StatsSection";
import { FAQSection } from "../components/FAQSection";
import { Preloader } from "../components/Preloader";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import { ScrollToTop } from "../components/shared/ScrollToTop";
import CLIResume from "../components/CLIResume";
import BrowserMockup from "../components/BrowserMockup";
import { Icon } from "@iconify/react";
import ElectricBorder from "../components/ElectricBorder";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroPin = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom+=100% top",
      pin: true,
      pinSpacing: false,
    });

    const maskAnimation = gsap.fromTo(
      secondPageRef.current,
      {
        clipPath: "inset(0% 100% 0% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: secondPageRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onLeave: () => {
            gsap.set(secondPageRef.current, { clipPath: "none" });
          },
          onEnterBack: () => {
            gsap.set(secondPageRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
          },
          onLeaveBack: () => {
            gsap.set(secondPageRef.current, { clipPath: "inset(0% 100% 0% 0%)" });
          }
        },
      }
    );

    // Unified scroll-reveal animation for page sections (reveals around 50%-80% of viewport)
    const revealTargets = gsap.utils.toArray<HTMLElement>(".scroll-reveal");
    const revealAnims = revealTargets.map((sec) => {
      return gsap.fromTo(
        sec,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      heroPin.kill();
      maskAnimation.scrollTrigger?.kill();
      maskAnimation.kill();
      revealAnims.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, []);

  return (
    <ThemeProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
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
          ref={heroRef}
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
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white filter [filter:drop-shadow(0_0_15px_rgba(0,0,0,0.5))_drop-shadow(0_0_30px_rgba(0,0,0,0.4))] md:text-6xl lg:text-7xl">
              Turning complex logic into <br />
              <span className="text-gradient font-black" data-text="fluid digital experiences.">
                fluid digital experiences.
              </span>
            </h1>
            <p className="mb-10 max-w-3xl text-base sm:text-lg md:text-xl font-light leading-relaxed text-white [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_12px_rgba(0,0,0,1),0_0_24px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)]">
              As a Full-Stack Developer, I bridge the gap between robust backend architecture and breathtaking interactive frontends. <br className="hidden md:block" />
              Built for performance. Scaled for impact.
            </p>

            <a
              href="#about"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-[1.02] cursor-pointer"
            >
              Explore Portfolio
              <Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1 text-slate-950" />
            </a>
          </div>
        </div>

        {/* ==================== SECOND PAGE (MAIN CONTENT WRAPPER) ==================== */}
        {/* මේක මුලින්ම වමේ ඉඳන් දකුණට clip වෙලා (inset 100%) තියෙන්නේ. Scroll කරද්දී දිග ඇරිලා 1st page එක වහගන්නවා */}
        <div
          ref={secondPageRef}
          className="relative w-full z-20 bg-[var(--background)]"
          style={{ clipPath: "inset(0% 100% 0% 0%)" }}
        >
          {/* About Section */}
          <div id="about" className="relative w-full pt-32 pb-10 scroll-reveal">
            <About personal={PORTFOLIO_INFO.personal} />
          </div>

          {/* Milestone Stats Section */}
          <div className="scroll-reveal">
            <StatsSection />
          </div>

          {/* ── Live Demo Showcase Section (Full Viewport Width) ── */}
          <section id="live-demo" className="w-full py-16 px-6 md:px-12 lg:px-24 bg-[var(--background)] border-y border-[var(--border)] scroll-reveal">
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


            <section id="projects" className="py-8 scroll-reveal">
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

            <div id="specializations" className="scroll-reveal">
              <Specializations />
            </div>

            {/* FAQ Accordion Section */}
            <div id="faq" className="scroll-reveal">
              <FAQSection />
            </div>

            <section id="skills" className="py-8 scroll-reveal">
              <h2 className="text-2xl font-semibold text-[var(--brand)]">
                Skills
              </h2>
              <p className="mb-6 text-sm text-white mt-1">
                Tools and technologies I use regularly.
              </p>
              <SkillsList skills={PORTFOLIO_INFO.skills} isBar={true} />
            </section>

            <section id="contact" className="py-8 flex flex-col items-center scroll-reveal">
              <div className="w-full max-w-3xl">
                <h2 className="text-2xl font-semibold text-[var(--brand)] text-center">
                  Contact
                </h2>
                <p className="text-sm text-white mt-1 text-center">
                  Tell me about your project, or just say hi.
                </p>
                <div className="mt-8">
                  <ElectricBorder color="#7c3aed" borderRadius={24}>
                    <div className="p-8 sm:p-10 rounded-[24px] bg-slate-900/40 dark:bg-black/50 backdrop-blur-xl border border-white/5 shadow-2xl">
                      <ContactForm />
                    </div>
                  </ElectricBorder>
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