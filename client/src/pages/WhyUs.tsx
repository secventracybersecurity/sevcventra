import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import {
  Shield,
  Users,
  Clock,
  Award,
  Target,
  FileCheck,
  Zap,
  Lock,
  ArrowRight,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, GlassCard } from "@/components/AnimatedSection";

const advantages = [
  {
    icon: Users,
    title: "Elite Researchers",
    description: "Our team includes former government security specialists, bug bounty hunters, and industry veterans with proven track records.",
    stat: "50+",
    statLabel: "Expert Researchers"
  },
  {
    icon: Target,
    title: "Zero False Positives",
    description: "Every vulnerability we report is manually verified and reproducible. No automated noise, just actionable findings.",
    stat: "100%",
    statLabel: "Verified Findings"
  },
  {
    icon: Clock,
    title: "Rapid Delivery",
    description: "We understand business timelines. Our streamlined methodology delivers comprehensive results in days, not weeks.",
    stat: "5-10",
    statLabel: "Day Turnaround"
  },
  {
    icon: FileCheck,
    title: "Actionable Reports",
    description: "Executive summaries for leadership, detailed technical guidance for developers. Reports that drive remediation.",
    stat: "48h",
    statLabel: "Debrief Sessions"
  },
  {
    icon: Lock,
    title: "Confidentiality First",
    description: "Rigorous data handling, NDA-protected engagements, and secure communication channels for all interactions.",
    stat: "SOC 2",
    statLabel: "Type II Certified"
  },
  {
    icon: Zap,
    title: "Continuous Support",
    description: "Free retesting after remediation, ongoing security advisory, and 24/7 critical issue response.",
    stat: "24/7",
    statLabel: "Support Available"
  },
];

const comparisonFeatures = [
  { feature: "Manual Testing Focus", secventra: true, others: false },
  { feature: "Zero False Positives Guarantee", secventra: true, others: false },
  { feature: "Former Government Researchers", secventra: true, others: false },
  { feature: "Free Remediation Retesting", secventra: true, others: false },
  { feature: "48-Hour Report Delivery", secventra: true, others: false },
  { feature: "Dedicated Account Manager", secventra: true, others: true },
  { feature: "24/7 Emergency Response", secventra: true, others: false },
  { feature: "Custom Methodology", secventra: true, others: false },
];

const testimonials = [
  {
    quote: "Secventra found critical vulnerabilities that three other firms missed. Their thoroughness is unmatched.",
    author: "CISO",
    company: "Fortune 500 Tech Company"
  },
  {
    quote: "The quality of their reports and the expertise of their team exceeded our expectations.",
    author: "VP of Engineering",
    company: "Leading Fintech Startup"
  },
  {
    quote: "They don't just find vulnerabilities—they help us understand and fix them. True partners in security.",
    author: "Security Director",
    company: "Global Healthcare Provider"
  },
];

export default function WhyUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="bg-background min-h-screen">
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
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
            className="text-purple-400 font-medium mb-6 tracking-widest uppercase text-sm"
          >
            Why Choose Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            The Secventra<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Advantage
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Discover why the world's most security-conscious enterprises choose Secventra.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <AnimatedSection key={advantage.title} delay={index * 0.1}>
                <GlassCard className="p-8 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <advantage.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">{advantage.stat}</div>
                      <div className="text-xs text-white/40">{advantage.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                  <p className="text-white/50 leading-relaxed">{advantage.description}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Comparison
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              How We Compare
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <GlassCard className="overflow-hidden" hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-6 text-white/60 font-medium">Feature</th>
                      <th className="p-6 text-center">
                        <div className="text-blue-400 font-bold text-lg">Secventra</div>
                      </th>
                      <th className="p-6 text-center">
                        <div className="text-white/40 font-medium">Others</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, index) => (
                      <tr key={row.feature} className="border-b border-white/5 last:border-0">
                        <td className="p-6 text-white/70">{row.feature}</td>
                        <td className="p-6 text-center">
                          {row.secventra ? (
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto">
                              <Check className="w-5 h-5 text-blue-400" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                              <X className="w-5 h-5 text-white/30" />
                            </div>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {row.others ? (
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                              <Check className="w-5 h-5 text-white/50" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                              <X className="w-5 h-5 text-white/30" />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              What Our Clients Say
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <GlassCard className="p-8 h-full flex flex-col">
                  <div className="text-4xl text-blue-400/30 mb-4">"</div>
                  <p className="text-white/70 leading-relaxed flex-1 mb-6">
                    {testimonial.quote}
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-white/40 text-sm">{testimonial.company}</div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the Difference
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Join the enterprises that trust Secventra to protect their most valuable assets.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-500 text-black font-semibold"
                data-testid="button-why-us-cta"
              >
                Start Your Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
