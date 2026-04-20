import { motion } from "framer-motion";
import { GitBranch, Download, ArrowRight } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "wouter";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function DevSecOps() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("SECURE YOUR PIPELINE");

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-primary/30 relative">
      <CyberBackgroundSuite opacity={0.4} showHUD={false} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-transparent z-10">

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">DevSecOps Advisory</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[72px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Shifting Security Left. <br className="hidden md:block"/> Building Resilience In.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/60 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            Move security from a gatekeeper to an enabler. We provide DevSecOps Integration & Advisory to embed continuous automated security across your CI/CD pipeline, from commit to deployment.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal("SECURE YOUR PIPELINE")}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[17px] shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            SECURE YOUR PIPELINE
          </motion.button>
        </div>
      </section>

      {/* The Pain Point Trigger */}
      <section className="py-24 bg-black border-y border-white/5 relative z-10 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-8">Security at the Speed of DevOps.</h2>
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 md:p-12 text-left relative overflow-hidden">
               <GitBranch className="absolute -right-8 -bottom-8 w-64 h-64 text-primary/5 pointer-events-none" />
               <p className="text-[17px] md:text-[19px] text-white/70 leading-relaxed relative z-10">
                 Developers want speed; security teams want control. Both are right. Generic penetration testing happens <em className="text-white">after</em> deployment—when fixes are 100x more expensive. Our DevSecOps strategy resolves this friction by giving your developers <strong className="text-white">Automated Guardrails</strong> that stop vulnerabilities from ever reaching production.
               </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Vectors */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">End-to-End SDLC Hardening.</h2>
            <p className="text-[18px] text-white/50 mt-4">The DevSecOps Flywheel</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: "/assets/3d_code_bracket_1776625939714.png", title: "Automated SAST & DAST", desc: "Static (SAST) and Dynamic (DAST) testing are embedded in the CI/CD, providing developers Real-Time Remediation Advice inside their IDE." },
              { image: "/assets/3d_database_drive_1776625954071.png", title: "Software Supply Chain (SCA)", desc: "We audit your third-party dependencies and build a full Software Bill of Materials (SBOM) to prevent supply chain attacks (like Log4j)." },
              { image: "/assets/3d_server_rack_1776625973411.png", title: "Container & IAC Security", desc: "Automated scanning of Dockerfiles and Infrastructure as Code (IaC) (Terraform/Ansible) to find critical cloud misconfigurations before they are ever built." }
            ].map((vector, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 h-full flex flex-col hover:bg-white/10 transition-colors group">
                    <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 overflow-hidden relative shadow-inner group-hover:border-white/20 transition-colors">
                       <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       <img src={vector.image} alt={vector.title} className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-500 relative z-10" />
                    </div>
                    <h3 className="text-[22px] font-bold mb-4 group-hover:text-white transition-colors">{vector.title}</h3>
                    <p className="text-[16px] text-white/60 leading-relaxed flex-grow">{vector.desc}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-black border-y border-white/5 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Our 4-Step Technical Advisory.</h2>
            <p className="text-[18px] text-white/50 mt-4">The Integration Pipeline</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[24px] left-[50px] right-[50px] h-px bg-white/10 z-0" />
            
            {[
              { image: "/assets/3d_terminal_root_1776625998724.png", title: "Dev/Commit", desc: "We integrate Git hooks and IDE plugins to find secrets and obvious bugs during the first commit." },
              { image: "/assets/3d_settings_gear_1776626018251.png", title: "Build", desc: "Static analysis (SAST) and Supply Chain (SCA) scan every dependency and library during compilation." },
              { image: "/assets/3d_check_mark_1776626035075.png", title: "Test", desc: "Dynamic scanning (DAST) in a staging environment to simulate attacks before production launch." },
              { image: "/assets/3d_shield_1776625035317.png", title: "Deploy/Run", desc: "Continuous infrastructure and container monitoring for drifts and zero-day flaws." }
            ].map((step, i) => (
              <AnimatedSection key={i} className="relative z-10" delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm border-2 border-white/10 flex items-center justify-center mb-6 z-10 overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-white/20 transition-colors">
                    <img src={step.image} alt={step.title} className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[18px] font-bold mb-3">{step.title}</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed max-w-[250px]">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#050505] px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
             <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter mb-6">Don't wait for a deployment failure to find your weak spots.</h2>
             <p className="text-[18px] md:text-[22px] text-white/60 max-w-[800px] mx-auto leading-relaxed">
               Secure your most critical data paths. We provide the technical clarity needed to transform security into a <strong className="text-white">Competitive Enabler</strong>.
             </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lead Magnet */}
            <AnimatedSection className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center">
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Free Developer's Checklist.</h3>
               <p className="text-[16px] text-white/60 mb-8 leading-relaxed">
                 Download our 15-point developer's checklist based on the OWASP DevSecOps Top 10 risks.
               </p>
               <button 
                 onClick={() => openModal("Download DevSecOps Checklist")}
                 className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center justify-center gap-2"
               >
                 <Download className="w-5 h-5" /> Send Me the Checklist
               </button>
            </AnimatedSection>

            {/* Consultation */}
            <AnimatedSection className="bg-transparent border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center items-center text-center">
               <h3 className="text-[24px] font-bold tracking-tight mb-6">Proven Technical Results.</h3>
               <div className="w-full">
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => openModal("Consult an Expert")}
                   className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/5 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                 >
                   Speak to Our Engineers <ArrowRight className="w-5 h-5" />
                 </motion.button>
               </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={modalTitle}
      />
    </div>
  );
}
