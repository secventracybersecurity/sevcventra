import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { TiltCard } from "@/components/3DTiltCard";
import { AnimatedSection, BlurRevealText, AnimatedCounter } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

const values = [
  {
    title: "Precision",
    description: "Every assessment is meticulously executed with attention to detail that others miss.",
  },
  {
    title: "Integrity",
    description: "We operate with the highest ethical standards, protecting your data as if it were our own.",
  },
  {
    title: "Partnership",
    description: "We work alongside your team, not just for you, fostering knowledge transfer and growth.",
  },
  {
    title: "Innovation",
    description: "We continuously evolve our techniques to stay ahead of emerging threats.",
  },
];



export default function About() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="bg-[#050505] min-h-screen text-white relative selection:bg-primary/30">
      <CyberBackgroundSuite opacity={0.3} showHUD={false} />
      {/* Hero Section - 3D Atmosphere */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-black text-white text-center px-4 overflow-hidden pt-20">
        <div className="max-w-[980px] mx-auto z-20 relative pointer-events-none">
          <BlurRevealText 
            text="Securing Tomorrow." 
            className="text-[36px] sm:text-[56px] md:text-[80px] font-bold leading-[1.15] tracking-tight mb-6 text-white text-glow-white flex justify-center w-full" 
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[21px] md:text-[28px] font-normal leading-[1.19] text-gray-300 max-w-[700px] mx-auto"
          >
            We are a team of elite security researchers dedicated to protecting the world's most valuable digital assets.
          </motion.p>
        </div>

        {/* Hero 3D background atmosphere - Removed in favor of unified CyberBackgroundSuite to prevent WebGL crash */}
      </section>

      {/* Mission Area - Light Gray */}
      <section className="py-[120px] bg-[#f5f5f7] dark:bg-[#1d1d1f] px-4 relative z-10">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-[40px] md:text-[64px] font-semibold leading-[1.07] tracking-tight dark:text-white">
                To Make the Digital World Safer.
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-[18px] text-gray-500 dark:text-gray-400 leading-[1.47]">
            <AnimatedSection delay={0.1}>
              <p>
                In an era where cyber threats evolve daily, we believe that the best defense is understanding the attacker's perspective. Our mission is to identify and help remediate vulnerabilities before malicious actors can exploit them.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p>
                We combine deep technical expertise with a genuine commitment to our clients' success, delivering actionable insights that strengthen security postures across industries.
              </p>
            </AnimatedSection>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200 dark:border-white/10 text-center">
            {[
              { value: 150, suffix: "+", label: "Clients Secured" },
              { value: 30, suffix: "+", label: "Security Engineers" },
              { value: 12, suffix: "+", label: "Countries Served" },
              { value: 5000, suffix: "+", label: "Vulns Reported" },
            ].map((stat, i) => (
              <AnimatedSection delay={i * 0.1} key={i}>
                <div className="text-[48px] font-bold tracking-tighter text-black dark:text-white mb-2">
                   <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[14px] font-bold text-primary uppercase tracking-[0.2em]">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values - White/Black */}
      <section className="py-[120px] bg-white dark:bg-black px-4 text-center relative z-10">
        <div className="max-w-[980px] mx-auto">
          <AnimatedSection>
            <h2 className="text-[40px] md:text-[56px] font-semibold leading-[1.07] tracking-tight mb-20 dark:text-white">
              What Drives Us
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
            {values.map((v, i) => (
              <AnimatedSection delay={i * 0.1} key={i}>
                <div className="text-left border-l border-gray-200 dark:border-white/10 pl-8">
                  <h3 className="text-[24px] font-semibold mb-4 dark:text-white tracking-tight">{v.title}</h3>
                  <p className="text-[18px] text-gray-500 dark:text-gray-400 leading-[1.47]">
                    {v.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>



      {/* CTA - Pure Black */}
      <section className="py-[160px] bg-black text-white text-center px-4 relative">
        <div className="max-w-[600px] mx-auto z-10 relative">
          <AnimatedSection>
            <h2 className="text-[48px] md:text-[64px] font-bold leading-[1] tracking-tighter mb-8 text-white">
              Join Our <span className="text-gradient-white">Mission.</span>
            </h2>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[17px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Get in Touch
              </button>
              <Link href="/careers">
                <span className="flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors cursor-pointer">
                  View Careers <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <LeadModal
        isOpen={isLeadModalOpen}
        onOpenChange={setIsLeadModalOpen}
        title="Connect with Our Team"
      />
    </div>
  );
}
