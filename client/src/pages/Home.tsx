import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link } from "wouter";
import { ChevronRight, Shield, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { LeadModal } from "@/components/LeadModal";
import { TiltCard } from "@/components/3DTiltCard";
import {
  AnimatedSection,
  MaskReveal,
  ScaleReveal,
  StaggerChildren,
  StaggerItem,
  AnimatedCounter,
} from "@/components/AnimatedSection";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { CyberGlobeContent } from "@/components/CyberGlobe";
import { ParticleField } from "@/components/ParticleField";
import { TypewriterText, SplitText } from "@/components/TypewriterText";

// Expertise Cards Data
const expertise = [
  {
    image: "/assets/expertise_pentesting.png",
    title: "Web & Mobile Pentesting",
    description:
      "We don't just run scanners. We manually hunt for logic flaws in your apps.",
    href: "/services/web-app-pentesting",
  },
  {
    image: "/assets/expertise_network.png",
    title: "Network & Cloud Audit",
    description:
      'From AWS/Azure to on-premise servers, we find the "backdoors" you missed.',
    href: "/services/network-security",
  },
  {
    image: "/assets/expertise_forensics.png",
    title: "Digital Forensics",
    description:
      "If the worst happens, we're on the ground. Evidence preservation and root-cause analysis.",
    href: "/services/digital-forensics",
  },
];

const standards = [
  {
    title: "OWASP Top 10",
    description:
      "We don't just run automated scans. We manually test your applications against the world's most critical security risks—from SQL injections to broken access control ensuring your code is leak-proof from day one.",
  },
  {
    title: "NIST Framework",
    description:
      "We help you move from reactive to proactive. By following the NIST standard, we provide a comprehensive Network Security Audit and Risk Assessment. This framework allows us to Identify, Protect, and Respond to threats, giving you a scalable Information Security roadmap.",
  },
  {
    title: "SANS",
    description:
      "Our team applies elite investigative techniques for Digital Forensics and Incident Response. We use SANS-level precision to track 'Patient Zero' and preserve evidence, ensuring your Endpoint Security and internal data remain defensible in any breach scenario.",
  },
  {
    title: "ISO 27001 & GDPR Compliance",
    description:
      "Security is a business enabler. We conduct thorough Compliance Audits to align your infrastructure with ISO 27001 and Global Data Privacy laws. We close the gaps in your Cloud Security so you can sign enterprise-level contracts with total confidence.",
  },
];

const stats = [
  {
    value: 150,
    suffix: "+",
    label: "CLIENTS SECURED",
  },
  {
    value: 30,
    suffix: "+",
    label: "SECURITY ENGINEERS",
  },
  {
    value: 12,
    suffix: "+",
    label: "COUNTRIES SERVED",
  },
  {
    value: 5000,
    suffix: "+",
    label: "VULNS REPORTED",
  },
];

// Animated counter component
function AnimatedStat({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix?: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center min-w-[70vw] snap-center sm:min-w-0 shrink-0 group"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          delay: index * 0.15 + 0.2,
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
        className="text-[40px] sm:text-[56px] font-bold text-white mb-3 tabular-nums tracking-tighter leading-none"
      >
        <AnimatedCounter value={value} suffix={suffix} />
      </motion.div>
      <div className="text-[11px] sm:text-[13px] font-bold tracking-[0.25em] text-white/70 uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const globeSectionRef = useRef<HTMLDivElement>(null);

  // Parallax transforms for hero
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.6], [1, 0.95]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger capabilities
      if (document.querySelector(".capabilities-container")) {
        gsap.from(".capability-card", {
          scrollTrigger: {
            trigger: ".capabilities-container",
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div className="bg-[#030303] text-white min-h-screen font-sans selection:bg-primary/30 overflow-x-hidden relative">
      {/* ===== HERO SECTION — THE SHOWSTOPPER ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-20 z-10"
      >
        {/* 3D Particle Field Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ThreeCanvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            controls={false}
          >
            <ParticleField />
          </ThreeCanvas>
        </div>

        {/* Radial glow pulse */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white rounded-full blur-[200px] pointer-events-none z-[1]"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="hero-content max-w-[1200px] w-full mx-auto z-10 relative flex flex-col gap-12 sm:gap-16"
        >
          <div className="max-w-[900px] mx-auto text-center px-4">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 mx-auto"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
                Securing the Digital Core
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-tight mb-4 text-white drop-shadow-2xl flex flex-wrap justify-center gap-x-4"
            >
              <span>Protect. Investigate.</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-gradient-animated">
                Assure.
              </span>
            </motion.h1>

            {/* Rotating subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-[17px] md:text-[20px] font-medium leading-[1.6] text-white/50 max-w-[700px] mx-auto mb-10 tracking-tight"
            >
              <TypewriterText
                phrases={[
                  "From zero-days to advanced persistent threats.",
                  "Definitive defensive and investigative clarity.",
                  "Our standards meet international security frameworks.",
                  "Real-world testing. No automated noise.",
                ]}
                typingSpeed={40}
                pauseDuration={3000}
              />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 60px rgba(255,255,255,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-bold text-[18px] transition-shadow relative overflow-hidden group"
                data-cursor="cta"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Talk to a Security Engineer</span>
              </motion.button>
              <Link href="/services">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 text-white font-bold text-[18px] hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer bg-black/40 backdrop-blur-xl text-center group"
                >
                  Explore Platform
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ===== SECURING THE DIGITAL CORE ===== */}
      <section className="py-12 sm:py-[100px] bg-[#030303] relative z-20 border-b border-white/5 text-center px-6">
        <div className="max-w-[800px] mx-auto">
          <MaskReveal direction="up">
            <h2 className="text-[28px] sm:text-[40px] font-semibold tracking-tight text-white mb-6 leading-tight">
              Securing the Digital Core
            </h2>
          </MaskReveal>
          <AnimatedSection delay={0.2}>
            <p className="text-[16px] sm:text-[19px] text-white/50 max-w-[650px] mx-auto leading-relaxed">
              Your infrastructure shouldn't be a guessing game. We provide
              specialized VAPT and Digital Forensics to help you identify gaps
              before they become breaches. Real-world testing. No fluff.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== EXPERTISE CAPABILITIES — Draggable Marquee ===== */}
      <section className="capabilities-container py-16 sm:py-[120px] bg-[#020202] text-center relative z-10 border-b border-white/5 overflow-hidden">
        <div className="max-w-full mx-auto px-6 mb-12">
          <ScaleReveal>
            <h2 className="text-[20px] font-bold text-white/40 tracking-[0.3em] uppercase">
              Our Expertise
            </h2>
          </ScaleReveal>
        </div>

        {/* Interactive Infinite Marquee */}
        <div className="relative flex overflow-hidden group/marquee cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ left: -2000, right: 0 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            whileHover={{ transition: { duration: 80 } }}
            className="flex gap-6 px-6"
          >
            {[...expertise, ...expertise, ...expertise, ...expertise].map(
              (cap, i) => (
                <div
                  key={i}
                  className="capability-card h-full w-[300px] sm:w-[400px] shrink-0 pointer-events-auto"
                >
                  <TiltCard className="h-full">
                    <div className="glass-panel rounded-[32px] p-10 text-left h-full flex flex-col transition-all hover:bg-white/[0.03] active:scale-[0.99] group overflow-hidden relative border border-white/5 hover:border-white/15 bg-gradient-to-br from-white/[0.02] to-transparent">
                      {/* Background Glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 relative z-10 overflow-hidden shadow-inner group-hover:border-white/20 transition-colors">
                        <img
                          src={cap.image}
                          alt={cap.title}
                          className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-125 transition-transform duration-700"
                        />
                      </div>

                      <h3 className="text-[22px] sm:text-[26px] font-bold mb-4 text-white tracking-tight leading-tight relative z-10 group-hover:text-white transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-[16px] text-white/40 leading-[1.6] mb-8 flex-grow relative z-10">
                        {cap.description}
                      </p>
                      <Link href={cap.href}>
                        <button className="text-white/60 text-[14px] font-bold flex items-center gap-2 w-fit group/btn relative z-10 uppercase tracking-[0.2em] hover:gap-3 hover:text-white transition-all">
                          Explore{" "}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </TiltCard>
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== LIVE THREAT GLOBE SECTION ===== */}
      <section
        ref={globeSectionRef}
        className="py-16 sm:py-[120px] bg-[#020202] relative z-10 border-b border-white/5 overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Globe visualization */}
            <ScaleReveal>
              <div className="aspect-square relative rounded-[32px] overflow-hidden border border-white/5 bg-black/50">
                <ThreeCanvas
                  camera={{ position: [0, 0, 8], fov: 45 }}
                  controls={false}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight
                    position={[10, 10, 10]}
                    intensity={1}
                    color="#ffffff"
                  />
                  <group scale={isMobile ? 1.8 : 2.2}>
                    <CyberGlobeContent globeRadius={2} />
                  </group>
                </ThreeCanvas>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent pointer-events-none" />

                {/* Status indicators */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase">
                    Live Threat Map
                  </span>
                </div>
              </div>
            </ScaleReveal>

            {/* Content */}
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-white/30" />
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/40">
                    Global Intelligence
                  </span>
                </div>
                <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight text-white leading-[1.1] mb-6">
                  Real-Time Threat
                  <br />
                  <span className="text-gradient-animated">Monitoring</span>
                </h2>
                <p className="text-[17px] text-white/50 leading-relaxed mb-8">
                  Our global sensor network tracks attack patterns across 300+
                  points of presence. Every arc on the globe represents real
                  threat intelligence being processed and neutralized.
                </p>
              </AnimatedSection>

              <StaggerChildren className="space-y-4" stagger={0.1} delay={0.3}>
                {[
                  "Advanced Persistent Threat tracking",
                  "Real-time attack pattern correlation",
                  "Geolocation-based threat intelligence",
                  "Automated containment protocols",
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-center gap-3 text-[15px] text-white/60 group hover:text-white/80 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 group-hover:bg-emerald-400 transition-colors" />
                      {item}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STANDARDS & CERTIFICATIONS ===== */}
      <section className="py-16 sm:py-[120px] bg-[#030303] px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <MaskReveal className="text-center mb-16" direction="up">
            <h2 className="text-[28px] sm:text-[40px] font-semibold tracking-tight text-white">
              Audited Against Elite Global Standards
            </h2>
          </MaskReveal>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            stagger={0.08}
          >
            {standards.map((std, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.15)" }}
                  className="bg-white/[0.02] border border-white/5 rounded-[24px] p-8 hover:bg-white/[0.04] transition-all duration-500 group h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                      <Shield className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[18px] font-bold text-white tracking-tight">
                      {std.title}
                    </h3>
                  </div>
                  <p className="text-[14px] text-white/40 leading-relaxed group-hover:text-white/55 transition-colors">
                    {std.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ===== STATS SECTION — Spring Physics Counters ===== */}
      <section className="py-10 sm:py-24 bg-[#020202] border-y border-white/5 relative z-10 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 hide-scrollbar">
            {stats.map((stat, i) => (
              <AnimatedStat key={i} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <LeadModal
        isOpen={isLeadModalOpen}
        onOpenChange={setIsLeadModalOpen}
        title="Get a Free Security Strategy"
        description="Schedule a technical scoping call with our security engineers."
      />
    </div>
  );
}
