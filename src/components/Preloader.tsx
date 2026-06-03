import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Incremental progress counting for visual polish
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Count up faster at first, then slow down near 100% until resources load
        const increment = prev < 50 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, 99);
      });
    }, 100);

    // Listen to window load event
    const handleLoad = () => {
      setProgress(100);
    };

    if (document.readyState === "complete") {
      setProgress(100);
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Resilience Fallback Timeout (max 3.5 seconds)
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay before fading out for visual completion
      const fadeTimeout = setTimeout(() => {
        setShow(false);
      }, 400);

      // Trigger completion callback after fade out animation
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#030712] z-[99999] flex flex-col items-center justify-center select-none"
        >
          {/* Ambient Purple Backdrop Glow */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-7 w-full max-w-xs">
            {/* Pulsing Glowing Brand Icon */}
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-[0_0_50px_rgba(139,92,246,0.15)]"
            >
              <div className="w-full h-full rounded-[22px] bg-[#030712] flex items-center justify-center">
                <svg className="w-11 h-11" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="loader-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                    <filter id="loader-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Stylized letter D with gradient and neon glow */}
                  <path 
                    d="M35 28 C35 28 45 28 55 28 C68 28 75 36 75 50 C75 64 68 72 55 72 C45 72 35 72 35 72 Z M47 38 V62 H53 C60 62 63 58 63 50 C63 42 60 38 53 38 Z" 
                    fill="url(#loader-logo-grad)" 
                    filter="url(#loader-neon-glow)" 
                  />
                </svg>
              </div>
            </motion.div>

            {/* Loading text/status */}
            <div className="text-center flex flex-col gap-1.5">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                Initializing Portal
              </span>
              <span className="text-sm font-bold text-slate-200 font-sans">
                Loading Experience... {progress}%
              </span>
            </div>

            {/* Glowing Progress bar socket */}
            <div className="w-full h-1.5 bg-slate-900 border border-white/5 rounded-full overflow-hidden p-[0.5px]">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
