import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LeadModal } from "./LeadModal";
import { MagneticButton } from "./MagneticButton";
import { ThreeCanvas } from "./ThreeCanvas";
import { NavLogo3D } from "./NavLogo3D";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Resources" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  // Transform-based scroll tracking for nav background
  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]
  );
  const navBlur = useTransform(scrollY, [0, 100], [0, 24]);
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Find active link index for pill indicator
  const activeIndex = navLinks.findIndex((link) => location === link.href);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center mt-4 px-4 pointer-events-none"
      >
        <motion.nav
          style={{
            backgroundColor: navBg,
            backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
            borderColor: navBorder,
          }}
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 rounded-full border ${
            isScrolled
              ? "w-full max-w-[900px] shadow-[0_8px_32px_rgba(0,0,0,0.8)] py-2 px-4"
              : "w-full max-w-[1200px] bg-transparent border-transparent py-4 px-2"
          }`}
        >
          {/* Logo Section */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer group px-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-12 h-12 relative flex items-center justify-center">
                <ThreeCanvas
                  camera={{ position: [0, 0, 3], fov: 45 }}
                  controls={false}
                >
                  <NavLogo3D />
                </ThreeCanvas>
              </div>
              <span className="text-[16px] font-bold tracking-tight text-white group-hover:text-white/80 transition-colors uppercase">
                Secventra
              </span>
            </motion.div>
          </Link>

          {/* Desktop Links with Morphing Pill */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-1.5 rounded-full backdrop-blur-md relative">
            {/* Animated pill background */}
            {(activeIndex >= 0 || activeHoverIndex !== null) && (
              <motion.div
                layoutId="nav-pill"
                className="absolute bg-white/10 rounded-full"
                style={{
                  height: "calc(100% - 6px)",
                  top: "3px",
                }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 200,
                }}
              />
            )}

            {navLinks.map((link, i) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  onHoverStart={() => setActiveHoverIndex(i)}
                  onHoverEnd={() => setActiveHoverIndex(null)}
                  className={`relative z-10 text-[12px] font-semibold tracking-wide uppercase cursor-pointer transition-colors px-4 py-2 rounded-full ${
                    location === link.href
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton intensity={0.2} className="hidden sm:block">
              <motion.button
                onClick={() => setIsLeadModalOpen(true)}
                whileHover={{
                  boxShadow: "0 0 30px rgba(255,255,255,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="text-[12px] font-bold text-primary-foreground bg-primary px-6 py-3 rounded-full transition-all uppercase tracking-widest relative overflow-hidden group"
              >
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
                <span className="relative z-10">Talk to an Expert</span>
              </motion.button>
            </MagneticButton>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white/90 focus:outline-none p-2 bg-white/5 rounded-full border border-white/10"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>
      </motion.header>

      <LeadModal isOpen={isLeadModalOpen} onOpenChange={setIsLeadModalOpen} />

      {/* Full-Screen Mobile Menu Takeover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-[#020202]/98 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center p-10"
          >
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
              }}
            />

            <div className="flex flex-col items-center gap-8 w-full relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link href={link.href}>
                    <span
                      className={`text-[36px] sm:text-[48px] font-bold tracking-tighter cursor-pointer uppercase transition-all duration-300 ${
                        location === link.href
                          ? "text-white"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-8 border-t border-white/10 w-full max-w-[300px] text-center"
              >
                <button
                  onClick={() => setIsLeadModalOpen(true)}
                  className="text-[16px] sm:text-[18px] font-bold tracking-widest uppercase text-primary-foreground bg-primary px-8 py-3.5 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full"
                >
                  Talk to an Expert
                </button>
              </motion.div>
            </div>

            {/* Corner brand */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 text-[8px] font-mono tracking-[0.3em] text-white/20 uppercase"
            >
              SEC://NAVIGATE
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
