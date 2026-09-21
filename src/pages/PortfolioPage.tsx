import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { PORTFOLIO_INFO } from "../config/portfolioData";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";

import { ScrollToTop } from "../components/shared/ScrollToTop";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "../components/shared/ScrollReveal";
import { useLenis } from "lenis/react";

// Video Assets
import video1 from "../assets/68bb07f935f18fd65a10184b_69169451c95e26dc6ec891a7_Home-1_mp4.mp4";
import video2 from "../assets/68bb07f935f18fd65a10184b_6916945d9b23ed799b8d3be6_Home-2_mp4.mp4";
import video3 from "../assets/68bb07f935f18fd65a10184b_691694639c3e527dc672da7b_Home-3_mp4.mp4";

// Lazy-loaded components below the fold
const About = lazy(() => import("../components/About"));
const StatsSection = lazy(() => import("../components/StatsSection"));
const Specializations = lazy(() => import("../components/Specializations"));
const ProjectsGrid = lazy(() => import("../components/ProjectsGrid"));
const LiveIframeShowcase = lazy(() => import("../components/LiveIframeShowcase"));
const FAQSection = lazy(() => import("../components/FAQSection"));
const TechCarousel = lazy(() => import("../components/TechCarousel"));

const CLIResume = lazy(() => import("../components/CLIResume"));

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);
  const thirdPageRef = useRef<HTMLDivElement>(null);
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
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    let isAnimating = false;
    let lastAnimationTime = 0;
    const cooldown = 1000;

    const handleScrollAttempt = (dir: "down" | "up", event?: Event) => {
      const now = Date.now();
      if (isAnimating || now - lastAnimationTime < cooldown) {
        if (event && event.cancelable) event.preventDefault();
        return;
      }

      const scrollY = window.scrollY;
      const header = document.querySelector("header");
      const headerH = header?.offsetHeight ?? 0;
      const secondPage = secondPageRef.current;
      if (!secondPage) return;

      const targetY = secondPage.getBoundingClientRect().top + scrollY - headerH;

      if (dir === "down" && scrollY < 10) {
        if (event && event.cancelable) event.preventDefault();
        isAnimating = true;
        lastAnimationTime = now;
        lenis.scrollTo(secondPage, {
          offset: -headerH,
          duration: 1.2,
          onComplete: () => {
            isAnimating = false;
          }
        });
      } else if (dir === "up" && scrollY > 10 && scrollY <= targetY + 15) {
        if (event && event.cancelable) event.preventDefault();
        isAnimating = true;
        lastAnimationTime = now;
        lenis.scrollTo(0, {
          duration: 1.2,
          onComplete: () => {
            isAnimating = false;
          }
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 5) return;
      if (e.deltaY > 0) {
        handleScrollAttempt("down", e);
      } else if (e.deltaY < 0) {
        handleScrollAttempt("up", e);
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;
      
      if (Math.abs(diffY) < 15) return;
      
      if (diffY > 0) {
        handleScrollAttempt("down", e);
      } else {
        handleScrollAttempt("up", e);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [lenis]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroPin = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "top+=30% top",
      pin: true,
      pinSpacing: false,
    });

    const heroContentAnimation = gsap.fromTo(
      heroContentRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      {
        opacity: 0,
        y: -100,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "top+=30% top",
          scrub: true,
        }
      }
    );

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
          end: "top bottom-=30%",
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

    const techCarouselPin = ScrollTrigger.create({
      trigger: secondPageRef.current,
      start: "top top",
      end: "top+=30% top",
      pin: true,
      pinSpacing: false,
    });

    const thirdMaskAnimation = gsap.fromTo(
      thirdPageRef.current,
      {
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: thirdPageRef.current,
          start: "top bottom",
          end: "top bottom-=30%",
          scrub: true,
          onLeave: () => {
            gsap.set(thirdPageRef.current, { clipPath: "none" });
          },
          onEnterBack: () => {
            gsap.set(thirdPageRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
          },
          onLeaveBack: () => {
            gsap.set(thirdPageRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
          }
        },
      }
    );

    return () => {
      heroPin.kill();
      heroContentAnimation.scrollTrigger?.kill();
      heroContentAnimation.kill();
      maskAnimation.scrollTrigger?.kill();
      maskAnimation.kill();
      techCarouselPin.kill();
      thirdMaskAnimation.scrollTrigger?.kill();
      thirdMaskAnimation.kill();
    };
  }, []);

  return (
    <ThemeProvider>


      {/* Main Page Container */}
      <div className="relative w-full overflow-x-hidden z-10">

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
          className="relative w-full h-screen z-10 flex items-center justify-center bg-transparent overflow-hidden"
        >
          {/* 2-Column Video Background */}
          <div className="absolute inset-0 z-0 flex w-full h-full">
            {/* Column 1 */}
            <div className="relative w-1/2 h-full overflow-hidden group">
              <video src={video1} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            {/* Column 2 */}
            <div className="relative w-1/2 h-full overflow-hidden group border-l border-white/10">
              <video src={video2} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            {/* Global Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <div ref={heroContentRef} className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 pb-16 md:pb-24 lg:pb-32 mt-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-32">
              {/* Left Column - Heading */}
              <div className="max-w-3xl text-left">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white filter [filter:drop-shadow(0_0_15px_rgba(0,0,0,0.5))_drop-shadow(0_0_30px_rgba(0,0,0,0.4))] md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] md:leading-[1.1]">
                  Turning  <br className="hidden sm:block" />
                  logic into <br />
                  <span className="text-white font-black block mt-2">
                    fluid digital 
                    <br />
                    <span className="text-purple-400">experiences</span>
                  </span>
                </h1>
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

        {/* ==================== SECOND PAGE (TECH CAROUSEL) ==================== */}
        <div
          ref={secondPageRef}
          className="relative w-full z-20 bg-[var(--background)] flex flex-col justify-center"
          style={{ clipPath: "inset(100% 0% 0% 0%)", minHeight: "30vh" }}
        >
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal>
              <TechCarousel />
            </ScrollReveal>
          </Suspense>
        </div>

        {/* ==================== THIRD PAGE (ABOUT & MAIN CONTENT) ==================== */}
        <div
          ref={thirdPageRef}
          className="relative w-full z-30 bg-transparent"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          {/* About Section */}
          <div id="about" className="relative w-full">
            <Suspense fallback={<SectionLoader />}>
              <ScrollReveal>
                <About personal={PORTFOLIO_INFO.personal} />
              </ScrollReveal>
            </Suspense>
          </div>

          {/* Live Sites / Iframe Showcase Section */}
          <div id="live-sites" className="relative w-full">
            <Suspense fallback={<SectionLoader />}>
              <LiveIframeShowcase />
            </Suspense>
          </div>

          {/* Milestone Stats Section */}
          <Suspense fallback={<SectionLoader />}>
            <ScrollReveal>
              <StatsSection />
            </ScrollReveal>
          </Suspense>

          <div id="specializations" className="w-full">
            <Suspense fallback={<SectionLoader />}>
              <ScrollReveal>
                <Specializations />
              </ScrollReveal>
            </Suspense>
          </div>

          <main className="max-w-[1800px] w-full mx-auto px-6 md:px-12 py-10">
            <section id="projects" className="py-8">
              <Suspense fallback={<SectionLoader />}>
                <ScrollReveal>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white max-w-2xl leading-tight tracking-tight">
                      Fullstack Development
                    </h2>
                    <div className="max-w-md">
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-2 md:mt-4">
                        Selected work — click a card for details.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                <ProjectsGrid
                  projects={PORTFOLIO_INFO.projects}
                  onOpen={setSelected}
                />
              </Suspense>
            </section>
          </main>

          {/* FAQ Accordion Section (Full Width) */}
          <div id="faq" className="w-full">
            <Suspense fallback={<SectionLoader />}>
              <ScrollReveal>
                <FAQSection />
              </ScrollReveal>
            </Suspense>
          </div>

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
