import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_MESSAGES = [
  "INITIALIZING SENTINEL CORE",
  "CALIBRATING THREAT VECTORS",
  "LOADING NEURAL MODULES",
  "ENCRYPTING DATA STREAMS",
  "SYNCHRONIZING NODES",
  "SYSTEM READY",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if already loaded this session
    if (sessionStorage.getItem("secventra-loaded")) {
      onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            sessionStorage.setItem("secventra-loaded", "true");
            onComplete();
          }, 800);
        }, 400);
      }
      setProgress(Math.min(Math.floor(current), 100));

      // Update status message based on progress
      const idx = Math.min(
        Math.floor((current / 100) * STATUS_MESSAGES.length),
        STATUS_MESSAGES.length - 1
      );
      setStatusIndex(idx);
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#020202] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Radial glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] rounded-full bg-white/10 blur-[200px]"
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Logo mark — geometric S */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-20 h-20 relative flex items-center justify-center">
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-white/20"
                  style={{
                    borderTopColor: "rgba(255,255,255,0.8)",
                  }}
                />
                {/* Inner pulsing dot */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[11px] font-bold tracking-[0.5em] uppercase text-white/60"
            >
              SECVENTRA
            </motion.div>

            {/* Progress section */}
            <div className="flex flex-col items-center gap-6 w-[280px]">
              {/* Progress bar */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Counter + Status */}
              <div className="flex items-center justify-between w-full">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase"
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.span>
                <span className="text-[11px] font-mono text-white/60 tabular-nums tracking-wider">
                  {String(progress).padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 text-[8px] font-mono text-white/20 tracking-widest uppercase">
            SEC://INIT
          </div>
          <div className="absolute bottom-8 right-8 text-[8px] font-mono text-white/20 tracking-widest uppercase">
            v2.1.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
