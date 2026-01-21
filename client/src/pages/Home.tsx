import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { 
  Shield, 
  Globe, 
  Cloud, 
  Network, 
  Smartphone, 
  Target,
  ArrowRight,
  ChevronDown,
  Lock,
  Eye,
  Zap,
  Plus,
  Minus,
  Quote,
  CheckCircle2,
  TrendingUp,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedSection, AnimatedText, GlassCard } from "@/components/AnimatedSection";

import cyberImage1 from "@assets/stock_images/cybersecurity_networ_a71763c1.jpg";
import cyberImage2 from "@assets/stock_images/cybersecurity_networ_dcb482f8.jpg";
import dataCenterImage from "@assets/stock_images/data_center_server_r_2a18e4cb.jpg";
import teamImage from "@assets/stock_images/professional_busines_69f0cc26.jpg";

// GSAP-powered floating blob component
function GlowingBlob() {
  const blobRef = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if (!blobRef.current || !blob2Ref.current) return;
    
    const ctx = gsap.context(() => {
      // Primary blob animation
      gsap.to(blobRef.current, {
        x: "random(-100, 100)",
        y: "random(-80, 80)",
        scale: "random(0.8, 1.2)",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      
      // Secondary blob animation
      gsap.to(blob2Ref.current, {
        x: "random(-80, 80)",
        y: "random(-100, 100)",
        scale: "random(0.9, 1.3)",
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <>
      <div
        ref={blobRef}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        data-testid="blob-primary"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        data-testid="blob-secondary"
      />
    </>
  );
}

// GSAP text reveal animation component
function TextReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useLayoutEffect(() => {
    if (!textRef.current) return;
    
    const chars = textRef.current.querySelectorAll('.char');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(chars,
        { 
          opacity: 0, 
          y: 50,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          delay: delay,
          ease: "back.out(1.7)",
        }
      );
    });
    
    return () => ctx.revert();
  }, [delay]);
  
  return (
    <span ref={textRef} className="inline-block" style={{ perspective: "1000px" }}>
      {children.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ 
            transformStyle: "preserve-3d",
            opacity: 0,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// Glassmorphism card with parallax hover
function GlassPanel({ 
  icon: Icon, 
  title, 
  value, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  title: string; 
  value: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useLayoutEffect(() => {
    if (!cardRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          delay: delay,
          ease: "power3.out",
        }
      );
    });
    
    return () => ctx.revert();
  }, [delay]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: -mousePosition.y,
        rotateY: mousePosition.x,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative p-4 md:p-6 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        transformStyle: "preserve-3d",
      }}
      data-testid={`glass-panel-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex items-center gap-3 md:gap-4">
        <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
        </div>
        <div>
          <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
          <p className="text-xs md:text-sm text-white/50">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0.1 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);
  
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);
  
  return <span ref={ref}>0{suffix}</span>;
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.1)_50%,transparent_100%)]"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ width: "50%" }}
      />
    </div>
  );
}

const services = [
  {
    icon: Globe,
    title: "Web App Pentesting",
    description: "Comprehensive security assessment of your web applications to identify vulnerabilities before attackers do.",
  },
  {
    icon: Shield,
    title: "API Security",
    description: "Deep analysis of API endpoints, authentication flows, and data exposure risks.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description: "AWS, Azure, and GCP security assessments to protect your cloud infrastructure.",
  },
  {
    icon: Network,
    title: "Network Pentesting",
    description: "Internal and external network penetration testing to secure your perimeter.",
  },
  {
    icon: Smartphone,
    title: "Mobile Pentesting",
    description: "iOS and Android application security testing for mobile-first enterprises.",
  },
  {
    icon: Target,
    title: "Red Teaming",
    description: "Adversarial simulation exercises that test your entire security posture.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Enterprises Protected" },
  { value: "10K+", label: "Vulnerabilities Found" },
  { value: "99.9%", label: "Client Retention" },
];

const trustKeywords = [
  "Data Protection",
  "Network Security",
  "Threat Detection", 
  "Encryption",
  "Compliance",
  "Risk Assessment",
  "Incident Response",
  "Security Audit",
];

const faqs = [
  {
    question: "What is Penetration Testing?",
    answer: "Penetration testing is a simulated cyber attack against your systems to identify exploitable vulnerabilities. Our expert team uses the same techniques as real attackers to find security gaps before malicious actors can exploit them."
  },
  {
    question: "How long does an assessment take?",
    answer: "Typical assessments range from 5-15 days depending on scope. We offer expedited timelines for urgent needs and provide preliminary findings within the first few days for critical issues."
  },
  {
    question: "What industries do you serve?",
    answer: "We work with Fortune 500 enterprises across finance, healthcare, technology, retail, and government sectors. Our methodologies are tailored to meet industry-specific compliance requirements like PCI-DSS, HIPAA, and SOC 2."
  },
  {
    question: "Do you provide remediation support?",
    answer: "Yes. Beyond identifying vulnerabilities, we provide detailed remediation guidance, developer workshops, and free retesting after fixes are implemented to ensure issues are properly resolved."
  },
];

const testimonials = [
  {
    quote: "Secventra found critical vulnerabilities that three other firms missed. Their thoroughness is absolutely unmatched in the industry.",
    author: "Sarah Chen",
    role: "CISO",
    company: "Fortune 500 Tech Company"
  },
  {
    quote: "The quality of their reports and the expertise of their team exceeded all our expectations. A true partner in security.",
    author: "Michael Rodriguez",
    role: "VP of Engineering", 
    company: "Leading Fintech Startup"
  },
  {
    quote: "They don't just find vulnerabilities—they help us understand and fix them. Outstanding professionalism throughout.",
    author: "Dr. Emily Watson",
    role: "Security Director",
    company: "Global Healthcare Provider"
  },
];

function MarqueeBand() {
  return (
    <div className="relative overflow-hidden py-6 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...trustKeywords, ...trustKeywords, ...trustKeywords].map((keyword, index) => (
          <span key={index} className="mx-8 text-white/40 font-medium tracking-wider uppercase text-sm flex items-center gap-3">
            <Shield className="w-4 h-4 text-blue-400/60" />
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left"
        data-testid={`faq-${question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="text-lg font-medium text-white/90 pr-4">
          {question}
        </span>
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5 text-blue-400" />
          ) : (
            <Plus className="w-5 h-5 text-blue-400" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-white/50 leading-relaxed pr-12">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const [openFAQ, setOpenFAQ] = useState<number>(0);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section - GSAP + Framer Motion */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={cyberImage1} 
            alt="Cybersecurity network" 
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            data-testid="image-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
          <CyberGrid />
          <FloatingParticles />
          <GlowingBlob />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(222,47%,4%)_80%)]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-6"
        >
          <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-16 items-center">
            {/* Left side - Main content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6 md:mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-400 font-medium text-sm">Trusted by Fortune 500 Enterprises</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 leading-[0.95]">
                <span className="block text-white">
                  <TextReveal delay={0.3}>Cyber Protection</TextReveal>
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400 bg-clip-text text-transparent">
                  <TextReveal delay={0.8}>You Can Trust</TextReveal>
                </span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed"
              >
                World-class penetration testing and offensive security for enterprises that demand excellence.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-blue-500 text-white font-semibold w-full sm:w-auto"
                    data-testid="button-hero-contact"
                  >
                    Start Your Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/5 backdrop-blur-sm text-white w-full sm:w-auto"
                    data-testid="button-hero-services"
                  >
                    Explore Services
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right side - Glassmorphism stat panels */}
            <div className="hidden lg:grid grid-cols-1 gap-4 w-[280px]">
              <GlassPanel icon={Shield} title="Security Score" value="99.9%" delay={1.8} />
              <GlassPanel icon={Users} title="Protected Users" value="10M+" delay={2.0} />
              <GlassPanel icon={TrendingUp} title="Threats Blocked" value="500K+" delay={2.2} />
            </div>
          </div>

          {/* Mobile stat panels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="lg:hidden grid grid-cols-3 gap-2 mt-10"
          >
            <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-lg font-bold text-white">99.9%</p>
              <p className="text-xs text-white/50">Security</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-lg font-bold text-white">10M+</p>
              <p className="text-xs text-white/50">Protected</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-lg font-bold text-white">500K+</p>
              <p className="text-xs text-white/50">Threats</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/40"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Trust Band */}
      <MarqueeBand />

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-amber-500/5" />
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={0}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <div className="text-white/50 text-sm uppercase tracking-wider">
                  Years Experience
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter value={500} suffix="+" />
                </div>
                <div className="text-white/50 text-sm uppercase tracking-wider">
                  Enterprises Protected
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter value={10000} suffix="+" />
                </div>
                <div className="text-white/50 text-sm uppercase tracking-wider">
                  Vulnerabilities Found
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.45}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent mb-3">
                  99.9<span className="text-3xl">%</span>
                </div>
                <div className="text-white/50 text-sm uppercase tracking-wider">
                  Client Retention
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced Threat<br />Detection & Protection
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              From application security to red team operations, we cover every attack surface.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <GlassCard className="p-8 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-amber-500/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.6}>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white"
                data-testid="button-view-all-services"
              >
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
                Why Secventra
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Driving Growth with<br />Our Expertise
              </h2>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">
                Our team of elite security researchers brings decades of combined experience in finding and exploiting vulnerabilities that others miss.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Lock, title: "Your Digital Shield", description: "Comprehensive protection for all digital assets" },
                  { icon: Eye, title: "Experts in Security", description: "Industry-leading specialists on your side" },
                  { icon: Zap, title: "Rapid Response", description: "24/7 monitoring and incident response" },
                ].map((item, index) => (
                  <AnimatedText key={item.title} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-white">{item.title}</h4>
                        <p className="text-white/50">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedText>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <GlassCard className="p-1 overflow-visible" hover={false}>
                <div className="aspect-[4/3] rounded-xl relative overflow-hidden" data-testid="image-datacenter">
                  <img 
                    src={dataCenterImage} 
                    alt="Secure data center" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 bg-blue-500/10" />
                  <motion.div
                    className="absolute bottom-6 left-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-8 h-8 text-blue-400" />
                      <p className="text-xl font-bold text-white">Enterprise Grade</p>
                    </div>
                    <p className="text-white/60">Secure infrastructure trusted by Fortune 500</p>
                  </motion.div>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Client Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Unmatched Service,<br />Unbreakable Protection
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <GlassCard className="p-8 h-full flex flex-col relative">
                  <Quote className="w-10 h-10 text-blue-400/20 mb-4" />
                  <p className="text-white/70 leading-relaxed flex-1 mb-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-amber-500/20">
                      <AvatarFallback className="bg-transparent text-lg font-bold text-white">
                        {testimonial.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-white/40 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden" data-testid="image-team">
                <img 
                  src={teamImage} 
                  alt="Secventra security team" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-blue-500/5" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {["S", "M", "A"].map((initial, i) => (
                        <Avatar key={i} className="w-10 h-10 border-2 border-background bg-gradient-to-br from-blue-500/40 to-amber-500/30">
                          <AvatarFallback className="bg-transparent text-white text-sm font-semibold">{initial}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <p className="text-white/70 text-sm">50+ Elite Security Researchers</p>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
                Our Team
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                World-Class Security<br />Professionals
              </h2>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">
                Our team includes former NSA analysts, Big Four consultants, and bug bounty legends who have found vulnerabilities in the world's largest companies.
              </p>
              <div className="grid grid-cols-2 gap-6" data-testid="team-stats-grid">
                {[
                  { value: "50+", label: "Security Experts", id: "experts" },
                  { value: "200+", label: "Certifications", id: "certs" },
                  { value: "15", label: "Countries", id: "countries" },
                  { value: "$10M+", label: "Bounties Earned", id: "bounties" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    data-testid={`stat-team-${stat.id}`}
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <FloatingParticles />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              How Do We Operate?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked<br />Questions
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <GlassCard className="p-8" hover={false}>
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                />
              ))}
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={cyberImage2} 
            alt="Cybersecurity background" 
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            data-testid="image-cta"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <CyberGrid />
        </div>
        <FloatingParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
              data-testid="icon-cta-shield"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/30 to-amber-500/20 flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-blue-400" aria-label="Security shield" />
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Secure<br />Your Digital Assets?
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Join the world's most security-conscious enterprises. Let our experts identify your vulnerabilities before attackers do.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-blue-500 text-white font-semibold"
                  data-testid="button-cta-contact"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white"
                  data-testid="button-cta-case-studies"
                >
                  View Case Studies
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
