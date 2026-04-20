import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const width = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
  const glowIntensity = useTransform(smoothProgress, (v) =>
    `0 0 ${10 + v * 20}px rgba(255,255,255,${0.3 + v * 0.3})`
  );

  return (
    <motion.div
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 z-[101] h-[1px]"
    >
      {/* Track */}
      <div className="w-full h-full bg-white/5" />

      {/* Progress bar */}
      <motion.div
        style={{
          width,
          boxShadow: glowIntensity,
        }}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/60 via-white to-white/60"
      />

      {/* Leading glow dot */}
      <motion.div
        style={{ left: width }}
        className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />
    </motion.div>
  );
}
