import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export function GlowCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "cta" | "text">("default");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseVelocity = useRef(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Size based on variant
  const sizes = { default: 400, hover: 500, cta: 600, text: 300 };
  const opacities = { default: 0.07, hover: 0.12, cta: 0.18, text: 0.05 };

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    let prevX = 0;
    let prevY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Calculate velocity for reactive effects
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      mouseVelocity.current = Math.sqrt(dx * dx + dy * dy);
      prevX = e.clientX;
      prevY = e.clientY;
    };

    // Context-aware cursor detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const el = target.closest('button, a, [data-cursor="cta"]');
      const textEl = target.closest('h1, h2, h3, p');

      if (el?.matches('button, [data-cursor="cta"]')) {
        setCursorVariant("cta");
      } else if (el?.matches('a')) {
        setCursorVariant("hover");
      } else if (textEl) {
        setCursorVariant("text");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const size = sizes[cursorVariant];
  const opacity = opacities[cursorVariant];

  return (
    <>
      {/* Primary glow */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
        }}
        animate={{
          width: size,
          height: size,
          opacity: opacity,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed pointer-events-none z-[2] rounded-full bg-gradient-radial from-white/80 to-transparent blur-[100px] mix-blend-screen"
      />
      {/* Inner dot for precision feel */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorVariant === "cta" ? 1.5 : cursorVariant === "hover" ? 1.2 : 1,
          opacity: cursorVariant === "default" ? 0 : 0.4,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed pointer-events-none z-[3] w-2 h-2 rounded-full bg-white blur-[2px]"
      />
    </>
  );
}
