import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface HorizontalShowcaseProps {
  children: ReactNode[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function HorizontalShowcase({ children, sectionTitle, sectionSubtitle }: HorizontalShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(children.length - 1) * 100}%`]
  );

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={containerRef}
      style={{ height: `${children.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        {sectionTitle && (
          <div className="px-6 lg:px-12 pt-20 pb-8 relative z-10">
            <div className="max-w-[1400px] mx-auto flex items-end justify-between">
              <div>
                {sectionSubtitle && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-[2px] bg-white/30" />
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/40">
                      {sectionSubtitle}
                    </span>
                  </div>
                )}
                <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight text-white leading-[1.1]">
                  {sectionTitle}
                </h2>
              </div>

              {/* Scroll indicator */}
              <div className="hidden md:flex items-center gap-4 text-white/30">
                <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* Progress track */}
            <div className="max-w-[1400px] mx-auto mt-6">
              <div className="w-full h-[1px] bg-white/10 relative">
                <motion.div
                  style={{ width: progressWidth }}
                  className="absolute inset-y-0 left-0 bg-white/60"
                />
              </div>
            </div>
          </div>
        )}

        {/* Horizontal scroll container */}
        <div className="flex-1 relative">
          <motion.div
            style={{ x }}
            className="flex h-full absolute top-0 left-0"
          >
            {children.map((child, i) => (
              <div
                key={i}
                className="w-screen h-full flex items-center justify-center px-6 lg:px-12 shrink-0"
              >
                <div className="max-w-[1200px] w-full mx-auto">
                  {child}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
