import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Shield, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, GlassCard } from "@/components/AnimatedSection";

const caseStudies = [
  {
    id: 1,
    industry: "Financial Services",
    title: "Major Bank Security Transformation",
    challenge: "A Fortune 100 bank faced increasing regulatory pressure and sophisticated attack attempts on their digital banking platform.",
    solution: "Comprehensive penetration testing of web and mobile applications, API security assessment, and red team engagement.",
    results: [
      { label: "Critical Vulnerabilities Found", value: "47" },
      { label: "Remediation Time", value: "30 days" },
      { label: "Cost Savings", value: "$2.5M" },
      { label: "Compliance Score", value: "99%" },
    ],
    testimonial: "Secventra's thorough approach helped us achieve our strictest compliance requirements while dramatically improving our security posture.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    industry: "Healthcare",
    title: "Healthcare Provider Data Protection",
    challenge: "A leading healthcare network needed to protect sensitive patient data across 50+ facilities while maintaining HIPAA compliance.",
    solution: "Network penetration testing, medical device security assessment, and security architecture review.",
    results: [
      { label: "Vulnerabilities Identified", value: "128" },
      { label: "HIPAA Gaps Closed", value: "15" },
      { label: "Risk Reduction", value: "85%" },
      { label: "Devices Secured", value: "10K+" },
    ],
    testimonial: "Their expertise in healthcare security is unparalleled. They understood our unique challenges and delivered actionable results.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    industry: "Technology",
    title: "SaaS Platform Security Hardening",
    challenge: "A rapidly growing SaaS company needed to demonstrate security maturity to enterprise customers and achieve SOC 2 compliance.",
    solution: "Application security assessment, cloud infrastructure review, and ongoing security advisory partnership.",
    results: [
      { label: "Security Issues Fixed", value: "89" },
      { label: "SOC 2 Timeline", value: "3 months" },
      { label: "Enterprise Deals Won", value: "$5M+" },
      { label: "Customer Trust Score", value: "A+" },
    ],
    testimonial: "Secventra was instrumental in helping us win enterprise contracts. Their findings and remediation guidance were invaluable.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    industry: "Retail",
    title: "E-Commerce Platform Protection",
    challenge: "A major retailer experienced a series of attempted breaches and needed to secure their e-commerce platform before the holiday season.",
    solution: "Emergency web application testing, payment system security review, and fraud prevention assessment.",
    results: [
      { label: "Attack Vectors Closed", value: "34" },
      { label: "Fraud Prevented", value: "$1.2M" },
      { label: "Uptime During Holidays", value: "99.99%" },
      { label: "PCI DSS Compliance", value: "Level 1" },
    ],
    testimonial: "Their rapid response team secured our platform in record time. We had a breach-free holiday season thanks to Secventra.",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

export default function CaseStudies() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="bg-black min-h-screen">
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-orange-400 font-medium mb-6 tracking-widest uppercase text-sm"
          >
            Case Studies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Real Results,<br />
            <span className="bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Real Impact
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Discover how we've helped enterprises across industries strengthen their security posture.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.id} className="mb-32 last:mb-0">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} rounded-3xl blur-3xl opacity-20`} />
                
                <GlassCard className="p-8 md:p-12 relative" hover={false}>
                  <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-cyan-400 font-mono text-sm">0{index + 1}</span>
                        <span className="text-white/40 text-sm uppercase tracking-wider">{study.industry}</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">{study.title}</h2>
                      
                      <div className="space-y-6 mb-8">
                        <div>
                          <div className="flex items-center gap-2 text-orange-400 mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-medium uppercase tracking-wider">Challenge</span>
                          </div>
                          <p className="text-white/60 leading-relaxed">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium uppercase tracking-wider">Solution</span>
                          </div>
                          <p className="text-white/60 leading-relaxed">{study.solution}</p>
                        </div>
                      </div>

                      <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-white/70 italic mb-4">"{study.testimonial}"</p>
                        <p className="text-white/40 text-sm">— {study.industry} Client</p>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <div className="flex items-center gap-2 text-emerald-400 mb-4">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">Results</span>
                      </div>
                      
                      {study.results.map((result) => (
                        <div key={result.label} className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-2xl font-bold text-cyan-400 mb-1">{result.value}</div>
                          <div className="text-white/40 text-sm">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Success Story Awaits
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Join the enterprises that have transformed their security posture with Secventra.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-cyan-500 text-black font-semibold"
                data-testid="button-case-studies-cta"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
