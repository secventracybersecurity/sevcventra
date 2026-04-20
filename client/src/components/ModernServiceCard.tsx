import { motion, useInView } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ReactNode, useRef } from "react";
import { Link } from "wouter";

interface ModernServiceCardProps {
  title: string;
  description: string;
  shortDesc: string;
  features: string[];
  visual: ReactNode;
  isReversed?: boolean;
  href?: string;
  onCtaClick?: () => void;
}

export function ModernServiceCard({ title, description, shortDesc, features, visual, isReversed, href, onCtaClick }: ModernServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const ButtonContent = () => (
    <motion.button 
      onClick={onCtaClick}
      whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(255,255,255,0.3)" }}
      whileTap={{ scale: 0.97 }}
      className="group flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black font-bold text-[17px] transition-all relative overflow-hidden"
      data-cursor="cta"
    >
      {/* Shimmer */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10">
        {href ? "Explore Implementation" : "Request Implementation"}
      </span>
      <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform relative z-10">
         <ArrowRight className="w-4 h-4" />
      </div>
    </motion.button>
  );

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-12 lg:gap-24 items-center w-full`}>
      {/* Visual Section */}
      <div className={`${isReversed ? 'md:order-2' : ''} relative group`}>
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 30 }}
           animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
           transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
           className="relative aspect-square rounded-[32px] bg-gradient-to-br from-[#111] to-[#050505] border border-white/[0.06] overflow-hidden shadow-2xl flex items-center justify-center p-8 group-hover:scale-[1.02] transition-transform duration-700"
        >
          {/* Background Ambient Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/10 rounded-tl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/10 rounded-br-lg" />
          
          <div className="relative z-10 w-full h-full">
            {visual}
          </div>

          {/* Scanning Overlay */}
          <motion.div 
            animate={{
              y: ["-100%", "200%"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-0 right-0 h-[20%] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent pointer-events-none z-20 group-hover:via-white/[0.12] transition-colors"
          />

          {/* Status tag */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            <span className="text-[8px] font-mono tracking-wider text-white/30 uppercase">
              ACTIVE
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className={`${isReversed ? 'md:order-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50">Enterprise Protocol</span>
          </div>
          
          <h3 className="text-[36px] md:text-[48px] font-bold tracking-tight mb-6 text-white leading-[1.1]">
            {title}
          </h3>
          
          <p className="text-[19px] md:text-[21px] text-white/40 leading-[1.5] mb-8 font-medium">
            {description}
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 text-[15px] font-medium text-white/60 group hover:text-white/80 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 group-hover:bg-emerald-400 transition-colors" />
                {feature}
              </motion.li>
            ))}
          </ul>

          {href ? (
             <Link href={href}>
                <ButtonContent />
             </Link>
          ) : (
             <ButtonContent />
          )}
        </motion.div>
      </div>
    </div>
  );
}
