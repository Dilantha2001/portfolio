// components/shared/ScrollProgressBar.tsx
import React from "react";
import { motion, useScroll } from "framer-motion";

interface ScrollProgressBarProps {
  className?: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className = "bg-[var(--brand)]",
}) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 origin-left z-[9999] ${className}`}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgressBar;
