import { motion } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: "blur(10px)",
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  out: {
    opacity: 0,
    y: -30,
    scale: 1.02,
    filter: "blur(5px)",
  },
};

const pageTransition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
};

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <>
      {/* Cinematic wipe curtain */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1] }}
        style={{ transformOrigin: "top" }}
        className="fixed inset-0 z-[200] bg-[#030303] pointer-events-none"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1], delay: 0.05 }}
        style={{ transformOrigin: "bottom" }}
        className="fixed inset-0 z-[199] bg-[#080808] pointer-events-none"
      />

      {/* Page content */}
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`w-full h-full ${className}`}
      >
        {children}
      </motion.div>
    </>
  );
}
