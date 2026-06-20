import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { PORTFOLIO_INFO } from "../config/portfolioData";
import { Preloader } from "../components/Preloader";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import { ScrollToTop } from "../components/shared/ScrollToTop";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "../components/shared/ScrollReveal";
import { useLenis } from "lenis/react";


// Lazy-loaded components below the fold
const About = lazy(() => import("../components/About"));
const StatsSection = lazy(() => import("../components/StatsSection"));
const Specializations = lazy(() => import("../components/Specializations"));
const ProjectsGrid = lazy(() => import("../components/ProjectsGrid"));
const FAQSection = lazy(() => import("../components/FAQSection"));
const SkillsList = lazy(() => import("../components/SkillsList"));
const ContactForm = lazy(() => import("../components/ContactForm"));
const CLIResume = lazy(() => import("../components/CLIResume"));
const BrowserMockup = lazy(() => import("../components/BrowserMockup"));
const ElectricBorder = lazy(() => import("../components/ElectricBorder"));

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    // Check if we navigated here from another page and need to scroll
    const targetSection = sessionStorage.getItem("scroll-to-section");
    if (targetSection) {
      sessionStorage.removeItem("scroll-to-section");
      
      // Wait for a short moment to ensure elements are mounted
      setTimeout(() => {
        const target = document.querySelector(targetSection);
        if (target) {
          const header = document.querySelector("header");
          const headerH = header?.offsetHeight ?? 0;
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, { offset: -headerH, duration: 1.2 });
          } else {
            const y = target.getBoundingClientRect().top + window.scrollY - headerH;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      }, 500);
    }
  }, [loading, lenis]);

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
        clipPath: "inset(100% 0% 0% 0%)",
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
            gsap.set(secondPageRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
          }
        },
      }
    );

    return () => {
      heroPin.kill();
      maskAnimation.scrollTrigger?.kill();
      maskAnimation.kill();
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
        />

        {/* CLI panel */}
        <Suspense fallback={null}>
          <CLIResume open={showCLI} onClose={() => setShowCLI(false)} />
        </Suspense>

        {/* ==================== FIRST PAGE (HERO SECTION) ==================== */}
        <div
          ref={heroRef}
          className="relative w-full h-screen z-10 flex items-center justify-center bg-black"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full aspect-[700/846] object-cover md:absolute md:inset-0 md:translate-y-0 md:w-full md:h-full md:aspect-auto md:object-cover"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-18 lg:gap-32">
              {/* Left Column - Heading */}
              <div className="max-w-3xl text-left">
                <h4 className="text-xl font-bold tracking-tight text-white filter [filter:drop-shadow(0_0_15px_rgba(0,0,0,0.5))_drop-shadow(0_0_30px_rgba(0,0,0,0.4))] md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] md:leading-[1.1]">
                  Turning  <br className="hidden sm:block" />
                  logic into <br />
                  <span className="text-gradient font-black block mt-2" data-text="fluid digital experiences.">
                    fluid digital experiences.
                  </span>
                </h4>
              </div>

              {/* Right Column - Description & Call to Action */}
              <div className="max-w-md w-full flex flex-col items-start text-left">
                <div className="w-12 h-[2px] bg-purple-500 mb-6 hidden lg:block" />
                <p className="mb-8 text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/90 [text-shadow:0_0_8px_rgba(0,0,0,0.8),0_0_16px_rgba(0,0,0,0.6)]">
                  As a Full-Stack Developer, I bridge the gap between robust backend architecture and breathtaking interactive frontends.
                  <span className="block mt-4 font-normal text-purple-400">
                    Built for performance. Scaled for impact.
                  </span>
                </p>

                <button
                  onClick={() => {
                    const target = document.querySelector("#about");
                    if (target) {
                      const header = document.querySelector("header");
                      const headerH = header?.offsetHeight ?? 0;
                      if (lenis) {
                        lenis.scrollTo(target as HTMLElement, { offset: -headerH, duration: 1.2 });
                      } else {
                        const y = target.getBoundingClientRect().top + window.scrollY - headerH;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }
                  }}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-slate-100 hover:scale-[1.02] cursor-pointer animate-btn-pulse"
                >
                  Scroll Now
                  <Icon icon="lucide:chevron-down" className="text-slate-950 animate-chevron-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== SECOND PAGE (MAIN CONTENT WRAPPER) ==================== */}
        <div
          ref={secondPageRef}
          className="relative w-full z-20 bg-[var(--background)]"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          {/* About Section */}
          <div id="about" className="relative w-full pt-32 pb-10">
            <Suspense fallback={<SectionLoader />}>
              <ScrollReveal>
                <About personal={PORTFOLIO_INFO.personal} />
              </ScrollReveal>
            </Suspense>
          </div>

          {/* Milestone Stats Section */}
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal>
              <StatsSection />
            </ScrollReveal>
          </Suspense>

          {/* ── Live Demo Showcase Section (Full Viewport Width) ── */}
          <section id="live-demo" className="w-full py-16 px-6 md:px-12 lg:px-24 bg-[var(--background)] border-y border-[var(--border)]">
            <Suspense fallback={<SectionLoader />}>
              <ScrollReveal>
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
              </ScrollReveal>
            </Suspense>
          </section>

          {/* Main Content (Projects, Skills, Contact) */}
          <main className="max-w-[1800px] w-full mx-auto px-6 md:px-12 py-10">

            <section id="projects" className="py-8">
              <Suspense fallback={<SectionLoader />}>
                <ScrollReveal>
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
                </ScrollReveal>
              </Suspense>
            </section>

            <div id="specializations">
              <Suspense fallback={<SectionLoader />}>
                <ScrollReveal>
                  <Specializations />
                </ScrollReveal>
              </Suspense>
            </div>

            {/* FAQ Accordion Section */}
            <div id="faq">
              <Suspense fallback={<SectionLoader />}>
                <ScrollReveal>
                  <FAQSection />
                </ScrollReveal>
              </Suspense>
            </div>

            <section id="skills" className="py-8">
              <Suspense fallback={<SectionLoader />}>
                <ScrollReveal>
                  <h2 className="text-2xl font-semibold text-[var(--brand)]">
                    Skills
                  </h2>
                  <p className="mb-6 text-sm text-white mt-1">
                    Tools and technologies I use regularly.
                  </p>
                  <SkillsList skills={PORTFOLIO_INFO.skills} isBar={true} />
                </ScrollReveal>
              </Suspense>
            </section>

            <section id="contact" className="py-8 flex flex-col items-center">
              <Suspense fallback={<SectionLoader />}>
                <ScrollReveal>
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
                </ScrollReveal>
              </Suspense>
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