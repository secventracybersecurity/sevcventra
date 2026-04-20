import { motion } from "framer-motion";
import { 
  Shield, 
  Terminal, 
  Lock, 
  Activity, 
  Search, 
  Target, 
  FileText,
  MousePointer2,
  Database,
  Cloud,
  Network,
  Smartphone
} from "lucide-react";
import { Link } from "wouter";
import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LeadModal } from "@/components/LeadModal";
import { AnimatedSection, BlurRevealText } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";
import { ModernServiceCard } from "@/components/ModernServiceCard";

type VisualVariant = "liquid" | "radar" | "shards" | "pulse";

const detailedServices: {
    title: string;
    id: string;
    shortDesc: string;
    description: string;
    features: string[];
    image: string;
    href?: string;
}[] = [
  {
    image: "/assets/web_security_3d.png",
    title: "Vulnerability Assessment & Penetration Testing",
    id: "vapt",
    shortDesc: "Real-world attack simulations.",
    description: "We simulate real-world attacks to find cracks in your Web, Mobile, and Cloud environments. We don't just find bugs; we show you how to fix them.",
    features: ["Web Application Pentesting", "Mobile App Security", "Cloud & Network VAPT", "API Endpoint Audits"],
    href: "/services/web-app-pentesting"
  },
  {
    image: "/assets/threat_3d.png",
    title: "Incident Response & Digital Forensics",
    id: "ir-df",
    shortDesc: "Stop the bleeding. Find the root cause.",
    description: "A breach is a crisis we provide the clarity. We handle Incident Response to stop the bleeding and Digital Forensics to preserve evidence and find 'Patient Zero'.",
    features: ["24/7 Emergency Containment", "Malware Reverse Engineering", "Court-Admissible Forensics", "Threat Eradication"],
    href: "/services/digital-forensics"
  },
  {
    image: "/assets/cloud_3d.png",
    title: "Audits & Compliance",
    id: "compliance",
    shortDesc: "Get audit-ready with elite standards.",
    description: "Get audit-ready. We align your infrastructure with ISO 27001, GDPR, HiPAA and NIST standards so you can close bigger deals with confidence.",
    features: ["ISO 27001 Readiness", "GDPR/HIPAA Compliance", "NIST Framework Alignment", "DevSecOps Integration"],
    href: "/services/compliance-audit"
  },
  {
    image: "/assets/network_3d.png",
    title: "Training & Security Awareness",
    id: "training",
    shortDesc: "Harden your human perimeter.",
    description: "Turn your employees into your strongest defense. We run Phishing Simulations and social engineering tests that actually stick.",
    features: ["Targeted Phishing Campaigns", "Executive Whaling Tests", "Physical Breach Simulations", "Interactive Security Training"],
    href: "/services/training-awareness"
  },
];

export default function Services() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Magnetic effect for the hero text
      gsap.to(".service-hero-text", {
        scrollTrigger: {
          trigger: ".service-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
      });

      // Background atmosphere shift
      gsap.to(".atmosphere-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        rotate: 15,
        opacity: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-primary/30 overflow-x-hidden relative" ref={containerRef}>
      
      {/* Universal Tactical Background Suite */}
      <CyberBackgroundSuite opacity={0.4} showHUD={false} />
      
      {/* Hero Section */}
      <section className="service-hero relative min-h-[90vh] flex flex-col items-center justify-center bg-transparent px-6 overflow-hidden pt-20 z-10">
        <div className="service-hero-text max-w-[1024px] mx-auto z-10 text-center pointer-events-none relative">
          <BlurRevealText 
            text="Elite Intelligence." 
            className="text-[36px] sm:text-[64px] md:text-[100px] font-bold leading-[0.95] tracking-tighter mb-6 text-white text-glow-white flex justify-center w-full" 
          />
          <BlurRevealText 
            text="Autonomous Proof." 
            className="text-[36px] sm:text-[64px] md:text-[100px] font-bold leading-[0.95] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-800 flex justify-center w-full" 
          />
          <p className="text-[18px] md:text-[24px] font-medium leading-[1.4] text-gray-400 max-w-[700px] mx-auto tracking-tight">
            We don't just run scans. Our red team engineers build sophisticated, real-world attack simulations to verify your true security posture.
          </p>
        </div>
      </section>

      {/* Modern Platform Features */}
      <section className="services-list py-[160px] bg-transparent px-6 z-10 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-40">
             <AnimatedSection>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[2px] bg-primary" />
                  <span className="text-[14px] font-bold tracking-[0.3em] uppercase text-primary">Operational Spectrum</span>
                </div>
                <h2 className="text-[48px] md:text-[72px] font-bold tracking-tighter dark:text-white leading-[1.05]">
                  Engineered to identify.<br/>
                  Deployed to defend.
                </h2>
             </AnimatedSection>
          </div>

          <div className="space-y-48 md:space-y-64">
            {detailedServices.map((service, index) => (
              <ModernServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                shortDesc={service.shortDesc}
                features={service.features}
                isReversed={index % 2 === 1}
                href={service.href}
                onCtaClick={() => setIsLeadModalOpen(true)}
                visual={
                  <div className="w-full h-full relative group/img">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.3)] group-hover/img:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal & High Impact */}
      <section className="py-[200px] bg-black text-center px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[800px] mx-auto relative z-10">
          <AnimatedSection>
            <Lock className="w-16 h-16 mx-auto text-primary mb-8" />
            <h2 className="text-[48px] md:text-[80px] font-bold leading-[0.95] tracking-tighter mb-8 text-white">
              Securing the<br /> Modern Frontier.
            </h2>
            <p className="text-[20px] md:text-[24px] text-gray-400 mb-12 max-w-[600px] mx-auto">
              Get an expert-led vulnerability assessment scope within 24 hours of initialization.
            </p>
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-[18px] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-all active:scale-95"
            >
              Initialize Assessment
            </button>
          </AnimatedSection>
        </div>
      </section>

      <LeadModal
        isOpen={isLeadModalOpen}
        onOpenChange={setIsLeadModalOpen}
        title="Initialize Security Assessment"
      />
    </div>
  );
}
