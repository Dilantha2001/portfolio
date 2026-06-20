// Preloader.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let resourcesLoaded = false;
    let minTimeElapsed = false;

    const checkCompletion = () => {
      if (resourcesLoaded && minTimeElapsed) {
        setShow(false);
        // Trigger onComplete callback after the slide-up animation finishes
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 900);
        return () => clearTimeout(completeTimeout);
      }
    };

    const handleLoad = () => {
      resourcesLoaded = true;
      checkCompletion();
    };

    // Check if the page is already fully loaded
    if (document.readyState === "complete") {
      resourcesLoaded = true;
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Minimum display duration for visual polish (2.8 seconds)
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkCompletion();
    }, 2800);

    // Fallback release if resources are taking too long (4.5 seconds)
    const fallbackTimer = setTimeout(() => {
      resourcesLoaded = true;
      minTimeElapsed = true;
      checkCompletion();
    }, 4500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-[#020617] z-[99999] flex flex-col items-center justify-center select-none"
        >
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xs">
            {/* Stylized Animated Tech Logo (Isometric 3D Cube) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-28 h-28 flex items-center justify-center"
            >
              <svg className="w-20 h-20 relative z-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Isometric Cube Outer Perimeter */}
                <motion.path
                  d="M 50 22 L 75 36 L 75 64 L 50 78 L 25 64 L 25 36 Z"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                  filter="url(#neon-glow)"
                />

                {/* Isometric Cube Inner Y-Shape */}
                <motion.path
                  d="M 50 50 L 50 22 M 50 50 L 25 64 M 50 50 L 75 64"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
                  filter="url(#neon-glow)"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
