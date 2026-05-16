import { motion } from "framer-motion";
import type { Personal } from "../types/portfolio";

export const About: React.FC<{ personal: Personal }> = ({ personal }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2 flex flex-col justify-center text-left py-10"
      >
        <motion.h1 className="text-5xl md:text-[5.5rem] font-bold leading-[1.05] text-white tracking-tight">
          Building digital <br className="hidden md:block" />
          products, brands
          <div className="flex items-center gap-4 mt-3 text-[var(--brand)]">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--brand)] flex items-center justify-center text-white text-2xl md:text-4xl font-bold">
              %
            </div>
            <span>experience.</span>
          </div>
        </motion.h1>

        <p className="mt-8 text-lg md:text-xl max-w-lg text-gray-300 font-medium leading-relaxed">
          a <strong className="text-white">Product Designer</strong> and <strong className="text-white">Visual Developer</strong> in SF. <br />
          I specialize in UI/UX Design, Responsive Web Design, <br />
          and Visual Development.
        </p>


      </motion.div>

      <motion.aside
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="md:col-span-1 relative flex items-end justify-center h-[400px] md:h-[600px]"
      >
        {/* Floating Decorative Elements */}
        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[var(--brand)] opacity-60"></div>
        <div className="absolute bottom-20 left-4 w-3 h-3 rounded-full bg-blue-400 opacity-60"></div>
        <div className="absolute top-1/2 right-4 w-4 h-[2px] bg-indigo-500 rotate-45 opacity-60"></div>
        <div className="absolute top-1/4 left-10 w-4 h-[2px] bg-[var(--brand)] -rotate-45 opacity-60"></div>

        {personal.avatar && (
          <img
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
            src={personal.avatar}
            alt="profile"
            style={{
              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
            }}
          />
        )}
      </motion.aside>
    </>
  );
};
