import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 2000,
  className = "",
  cursorClassName = "",
}: TypewriterTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed + Math.random() * 40);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause
        setIsPaused(true);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline ${className}`}>
      <span className="font-mono">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className={`inline-block w-[2px] h-[1.1em] align-middle bg-white ml-1 ${cursorClassName}`}
      />
    </span>
  );
}

/**
 * SplitText — Animates each character individually on mount
 */
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = "", delay = 0, stagger = 0.03 }: SplitTextProps) {
  const chars = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap ${className}`}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
              rotateX: -90,
              filter: "blur(8px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
              },
            },
          }}
          style={{
            display: "inline-block",
            marginRight: char === " " ? "0.3em" : "0px",
            transformOrigin: "bottom center",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
