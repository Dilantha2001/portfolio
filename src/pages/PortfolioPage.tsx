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
import Hyperspeed from "../components/ui/Hyperspeed";
const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);

  return (
    <ThemeProvider>
      <ScrollProgressBar />

      <div className="relative z-10">
        <Header
          links={[
            { href: "#about", label: "About" },
            { href: "#projects", label: "Projects" },
            { href: "#skills", label: "Skills" },
            { href: "#contact", label: "Contact" },
          ]}
          onTryCLI={() => setShowCLI(true)}
        />

        {/* CLI panel (docked / overlay) */}
        <CLIResume open={showCLI} onClose={() => setShowCLI(false)} />

        {/* Hero Section with Hyperspeed Background */}
        <section
          id="about"
          className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-16"
        >
          {/* Absolute Background */}
          <div className="absolute inset-0 z-0">
            <Hyperspeed
              effectOptions={{
                onSpeedUp: () => {},
                onSlowDown: () => {},
                distortion: "turbulentDistortion",
                length: 400,
                roadWidth: 10,
                islandWidth: 2,
                lanesPerRoad: 4,
                fov: 90,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 20,
                lightPairsPerRoadWay: 40,
                shoulderLinesWidthPercentage: 0.05,
                brokenLinesWidthPercentage: 0.1,
                brokenLinesLengthPercentage: 0.5,
                lightStickWidth: [0.12, 0.5],
                lightStickHeight: [1.3, 1.7],
                movingAwaySpeed: [60, 80],
                movingCloserSpeed: [-120, -160],
                carLightsLength: [400 * 0.03, 400 * 0.2],
                carLightsRadius: [0.05, 0.14],
                carWidthPercentage: [0.3, 0.5],
                carShiftX: [-0.8, 0.8],
                carFloorSeparation: [0, 5],
                colors: {
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0xffffff,
                  brokenLines: 0xffffff,
                  leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                  rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                  sticks: 0x03b3c3,
                },
              }}
            />
            {/* Gradient overlay to smoothly blend the canvas into the rest of the page */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)] pointer-events-none" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Radically better <br className="hidden md:block" /> observability
              stack
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Ship higher-quality software faster. Be the hero{" "}
              <br className="hidden md:block" /> of your engineering teams.
            </p>
          </div>
        </section>
        <div className="relative z-10 w-full max-w-6xl 2xl:max-w-9xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <About personal={PORTFOLIO_INFO.personal} />
        </div>

        {/* Main Content (Projects, Skills, Contact) */}
        <main className="max-w-6xl 2xl:max-w-9xl mx-auto px-6 py-10">
          <section id="projects" className="py-8">
            <h2 className="text-2xl font-semibold text-[var(--brand)]">
              Projects
            </h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
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
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tools and technologies I use regularly.
            </p>
            <SkillsList skills={PORTFOLIO_INFO.skills} isBar={true} />
          </section>

          <section id="contact" className="py-8">
            <h2 className="text-2xl font-semibold text-[var(--brand)]">
              Contact
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tell me about your project, or just say hi.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <ContactForm />
              </div>

              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-4">
                <div>
                  <div className="font-semibold">Let's collaborate</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    I'm available for freelance and contract work. My inbox is
                    open.
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-semibold">Quick contact</div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Email: satyasubudhi089@gmail.com
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Location: Remote
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="text-sm font-medium">Resume</div>
                  <a
                    href="/"
                    className="block mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <ScrollToTop />
        <Footer />

        <ProjectModal
          project={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </ThemeProvider>
  );
};

export default PortfolioPage;
