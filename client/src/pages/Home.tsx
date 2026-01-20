import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedText, GlassCard } from "@/components/AnimatedSection";

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
  { value: "500+", label: "Enterprises Protected" },
  { value: "10K+", label: "Vulnerabilities Found" },
  { value: "99.9%", label: "Client Retention" },
  { value: "0", label: "Breaches Post-Assessment" },
];

const trustLogos = [
  "Fortune 500 Tech",
  "Global Finance Corp",
  "Healthcare Leader",
  "Defense Systems",
  "Retail Giant",
  "Fintech Pioneer"
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div className="bg-black min-h-screen">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-cyan-400 font-medium mb-6 tracking-widest uppercase text-sm"
            >
              Elite Cybersecurity
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
            >
              <span className="block">Redefining</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Cybersecurity
              </span>
              <span className="block">Excellence.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              World-class penetration testing and offensive security for enterprises that demand the best.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-cyan-500 text-black font-semibold"
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
                  className="border-white/20 bg-white/5 backdrop-blur-sm text-white"
                  data-testid="button-hero-services"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/40"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-cyan-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Trusted by Industry Leaders
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Protecting the World's<br />Most Valuable Assets
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {trustLogos.map((logo, index) => (
              <AnimatedSection key={logo} delay={index * 0.1}>
                <div className="h-16 flex items-center justify-center">
                  <span className="text-white/30 font-medium text-sm text-center">
                    {logo}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-cyan-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Security<br />Assessment Suite
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              From application security to red team operations, we cover every attack surface.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <GlassCard className="p-8 h-full cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-cyan-400" />
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

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.15}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-cyan-400 font-medium mb-4 tracking-widest uppercase text-sm">
                Why Secventra
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Security Expertise<br />That Sets Us Apart
              </h2>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">
                Our team of elite security researchers brings decades of combined experience in finding and exploiting vulnerabilities that others miss.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Lock, title: "Zero False Positives", description: "Every finding is manually verified" },
                  { icon: Eye, title: "Attack-Minded Approach", description: "We think like real adversaries" },
                  { icon: Zap, title: "Rapid Turnaround", description: "Actionable results in days, not weeks" },
                ].map((item, index) => (
                  <AnimatedText key={item.title} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-white/50">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedText>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <GlassCard className="p-1 overflow-hidden" hover={false}>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]" />
                  <div className="relative text-center p-8">
                    <Shield className="w-24 h-24 text-cyan-400 mx-auto mb-6" />
                    <p className="text-2xl font-bold mb-2">Enterprise Grade</p>
                    <p className="text-white/50">Security Solutions</p>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Secure<br />Your Digital Assets?
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Join the world's most security-conscious enterprises. Let our experts identify your vulnerabilities before attackers do.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-cyan-500 text-black font-semibold animate-glow-pulse"
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
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
