import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = "", 
  intensity = 15 
}) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const glareX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      {/* Glare effect */}
      <motion.div
        style={{
          left: glareX,
          top: glareY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[150%] h-[150%] rounded-full bg-gradient-radial from-white/10 to-transparent blur-3xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="relative z-10 h-full" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};
