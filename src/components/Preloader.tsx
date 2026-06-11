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
        // Trigger onComplete callback after the fade-out animation finishes
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 800);
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

    // Minimum display duration for visual polish (1.3 seconds)
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkCompletion();
    }, 1300);

    // Fallback release if resources are taking too long (3.5 seconds)
    const fallbackTimer = setTimeout(() => {
      resourcesLoaded = true;
      minTimeElapsed = true;
      checkCompletion();
    }, 3500);

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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#030712] z-[99999] flex flex-col items-center justify-center select-none"
        >
          {/* Ambient Glowing Backdrop Aura */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none translate-y-10" />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-xs">
            {/* Spinning Neon Gradient Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Rotating outer border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_35px_rgba(139,92,246,0.3)]"
              />
              {/* Inner dark circle to construct border */}
              <div className="absolute inset-[2.5px] rounded-full bg-[#030712] z-10" />

              {/* Pulsing Brand Logo inside */}
              <motion.div
                animate={{ scale: [0.93, 1.07, 0.93] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center z-20"
              >
                <img
                  src="./favicon.svg"
                  alt="Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
              </motion.div>
            </div>

            {/* Glowing Brand Status Labels */}
            <div className="text-center flex flex-col gap-1 mt-1">
              <span className="text-[10px] font-mono tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase font-bold animate-pulse">
                Initializing Portal
              </span>
              <span className="text-[11px] font-bold text-slate-400/80 font-sans tracking-wide uppercase">
                Loading Experience
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
