import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FooterCore3D } from "./FooterCore3D";
import { ThreeCanvas } from "./ThreeCanvas";
import { Shield, Mail, Twitter, Linkedin, Github } from "lucide-react";
import { LeadModal } from "./LeadModal";
import { NavLogo3D } from "./NavLogo3D";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection, StaggerChildren, StaggerItem } from "./AnimatedSection";

function InfiniteMarquee() {
  const text = "PROTECT • INVESTIGATE • ASSURE • DEFEND • MONITOR • RESPOND • ";
  return (
    <div className="overflow-hidden border-b border-white/5 py-4 relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-white/15 mx-4"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SocialIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 cursor-pointer transition-colors group relative"
      aria-label={label}
    >
      {children}
      {/* Glow ring on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(255,255,255,0.1)] pointer-events-none" />
    </motion.div>
  );
}

export function Footer() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <footer
      ref={footerRef}
      className={`relative bg-black text-gray-400 border-t border-white/5 overflow-hidden transition-all duration-700 ${
        isHomePage ? "py-0" : "py-16 sm:py-20"
      }`}
    >
      {/* Infinite Marquee — only on home */}
      {isHomePage && <InfiniteMarquee />}

      {/* 3D Core Background Element - Only on Home */}
      {isHomePage && (
        <div className="absolute right-[-20%] bottom-[-20%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] opacity-20 pointer-events-none">
          <ThreeCanvas camera={{ position: [0, 0, 8], fov: 45 }} controls={false}>
            <FooterCore3D />
          </ThreeCanvas>
        </div>
      )}

      <div className={`max-w-[1200px] mx-auto relative z-10 px-6 ${isHomePage ? 'pt-16 sm:pt-24' : ''}`}>
        {/* Massive Pre-footer CTA - Only on Home */}
        {isHomePage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24 sm:mb-32"
          >
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white tracking-tighter leading-[0.9] mb-8">
              Deploy.<br />
              Defend.<br />
              <span className="text-gradient-animated">Dominate.</span>
            </h2>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLeadModalOpen(true)}
              className="px-10 py-5 rounded-full bg-white text-black font-bold text-[17px] uppercase tracking-widest transition-all relative overflow-hidden group"
              data-cursor="cta"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Initialize Platform</span>
            </motion.button>
          </motion.div>
        )}

        <LeadModal isOpen={isLeadModalOpen} onOpenChange={setIsLeadModalOpen} />

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20 ${
            isHomePage ? "border-t border-white/10 pt-20" : ""
          }`}
        >
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-white/5 border border-white/10">
                <img
                  src="/logo.png"
                  alt="Secventra Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[15px] font-bold text-white tracking-widest uppercase text-glow-white">
                Secventra
              </span>
            </div>
            <p className="text-[13px] leading-[1.6] max-w-[250px] text-white/40 mb-8 font-mono">
              Next-generation continuous threat exposure management &
              autonomous XDR.
            </p>
            <div className="flex gap-3">
              <SocialIcon label="Twitter">
                <Twitter className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <Linkedin className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </SocialIcon>
              <SocialIcon label="GitHub">
                <Github className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </SocialIcon>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-[11px] font-bold text-white mb-6 uppercase tracking-[0.2em] opacity-40">
              Platform
            </h4>
            <ul className="space-y-4 text-[14px]">
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Managed Detection
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Continuous API Testing
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Zero Trust Architecture
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-[11px] font-bold text-white mb-6 uppercase tracking-[0.2em] opacity-40">
              Company
            </h4>
            <ul className="space-y-4 text-[14px]">
              <li>
                <Link href="/about">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Careers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Security Resources
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-[11px] font-bold text-white mb-6 uppercase tracking-[0.2em] opacity-40">
              Legal
            </h4>
            <ul className="space-y-4 text-[14px]">
              <li>
                <Link href="/privacy">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/compliance">
                  <span className="hover:text-white transition-colors cursor-pointer text-white/50 hover:translate-x-1 inline-block transform">
                    Compliance
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[11px] font-mono tracking-widest uppercase opacity-30 text-center md:text-left pb-8">
          <p>© {new Date().getFullYear()} Secventra Inc. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
            All Systems Operational
          </p>
        </div>
      </div>
    </footer>
  );
}
