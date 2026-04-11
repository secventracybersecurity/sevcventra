import { motion, useInView, useScroll, useTransform, useSpring, animate, useMotionValue } from "framer-motion";
import { useRef, useEffect, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({ 
  children, 
  className = "", 
  offset = 50 
}: { 
  children: ReactNode; 
  className?: string; 
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * SplitReveal — Content slides in from both sides and merges
 */
export function SplitReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * MaskReveal — Content revealed behind a sliding mask
 */
export function MaskReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    up: { hidden: "inset(100% 0 0 0)", visible: "inset(0 0 0 0)" },
    down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0 0)" },
    left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0 0 0)" },
    right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0)" },
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: clipPaths[direction].hidden, opacity: 0.5 }}
        animate={
          isInView
            ? { clipPath: clipPaths[direction].visible, opacity: 1 }
            : {}
        }
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ScaleReveal — Scale up from smaller with spring physics
 */
export function ScaleReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
        scale: { type: "spring", damping: 20, stiffness: 100, delay },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerChildren — Container that staggers child animations
 */
export function StaggerChildren({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BlurRevealText({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -60,
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-flex", overflow: "hidden", marginRight: wordIndex !== words.length - 1 ? "0.3em" : "0px" }}>
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span 
              variants={child} 
              key={letterIndex}
              style={{ 
                display: "inline-block", 
                transformOrigin: "bottom center",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}


interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glowBorder?: boolean;
}

export function GlassCard({ children, className = "", hover = true, glowBorder = false }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl relative ${glowBorder ? 'glow-border' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedCounter — Counts from 0 to target value when in view
 */
export function AnimatedCounter({ 
  value, 
  duration = 2.5, 
  suffix = "" 
}: { 
  value: number; 
  duration?: number; 
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] });
    }
  }, [isInView, value, count, duration]);

  const display = useTransform(rounded, (latest) => `${latest}${suffix}`);

  return <motion.span ref={ref}>{display}</motion.span>;
}

