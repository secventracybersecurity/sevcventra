import { motion } from "framer-motion";
import { Server, Database, Shield, FileCode2, Lock, EyeOff, Activity, Code, Download, CheckCircle } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function ApiSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Scope Your API Audit");

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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">API & Infrastructure Security</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[72px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Hardening Your <br className="hidden md:block"/> API Architecture.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/60 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            APIs are the most targeted entry points for modern data breaches. Secventra provides deep-dive REST, GraphQL, and SOAP VAPT to eliminate logic flaws and unauthorized data exposure.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal("Scope Your API Audit")}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[17px] shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            Scope Your API Audit
          </motion.button>
        </div>
      </section>

      {/* Authority Standards */}
      <section className="py-24 bg-black border-y border-white/5 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Audited Against Elite Global Standards.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "OWASP API Security Top 10", desc: "We validate your endpoints against the 10 most critical API risks, including BOLA, BFLA, and broken authorization." },
              { title: "PTES Framework", desc: "Our testing methodologies follow the definitive execution standard for high-end professional penetration testing workflow." },
              { title: "NIST SP 800-115", desc: "We align your API risk management with federal and enterprise best practices for secure connectivity." }
            ].map((std, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 h-full hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                       <Shield className="w-8 h-8 text-primary" />
                       <h3 className="text-[20px] font-bold">{std.title}</h3>
                    </div>
                    <p className="text-[16px] text-white/60 leading-relaxed">{std.desc}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Testing Vectors */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
           <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Comprehensive Deep-Dive API Audits.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileCode2, title: "Broken Object Level Authorization (BOLA)", desc: "Blocking the most common API flaw where one user can access another user's private data via ID manipulation." },
              { icon: Lock, title: "Broken Function Level Authorization (BFLA)", desc: "Validating that non-admin users cannot access administrative endpoints by simple URL guesswork." },
              { icon: Database, title: "Mass Assignment & Injection", desc: "Preventing attackers from pushing unauthorized data or commands into your database via the API endpoint." },
              { icon: EyeOff, title: "Shadow API Discovery", desc: "Finding and securing 'forgotten' or deprecated API versions that your team left online." }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="flex flex-col p-8 rounded-[24px] bg-black border border-white/5 shadow-lg hover:border-primary/50 transition-colors h-full">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-[20px] font-bold mb-4 leading-tight">{item.title}</h3>
                    <p className="text-[15px] text-white/60 flex-grow leading-relaxed">{item.desc}</p>
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
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Our 4-Step Technical Methodology.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[24px] left-[50px] right-[50px] h-px bg-white/10 z-0" />
            
            {[
              { icon: Activity, title: "Passive Mapping & Enumeration", desc: "Silently mapping all endpoints (GET, POST, etc.) and data models." },
              { icon: FileCode2, title: "Logic & Authorization Probe", desc: "Manually probing authorization logic for BOLA and BFLA." },
              { icon: Code, title: "Exploitation & Data Flow Validation", desc: "Safely proving impact of injection or mass assignment." },
              { icon: Shield, title: "Strategic Remediation & Re-test", desc: "Prioritized fix roadmap and architectural advice. We re-test for free." }
            ].map((step, i) => (
              <AnimatedSection key={i} className="relative z-10" delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary border-4 border-black flex items-center justify-center text-primary-foreground font-bold mb-6 z-10">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-bold mb-3">{i + 1}. {step.title}</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed max-w-[250px]">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final Lead Magnet & CTA */}
      <section className="py-24 bg-[#050505] px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
             <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter">Don't leave your application’s data paths exposed.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lead Magnet */}
            <AnimatedSection className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl">
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Free API Hardening Checklist.</h3>
               <p className="text-[16px] text-white/60 mb-8 leading-relaxed">
                 Download our 15-point developer's checklist based on the OWASP API Security Top 10.
               </p>
               <button 
                 onClick={() => openModal("Download API Checklist")}
                 className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center justify-center gap-2"
               >
                 <Download className="w-5 h-5" /> Send Me the Checklist
               </button>
            </AnimatedSection>

            {/* Consultation */}
            <AnimatedSection className="bg-primary/5 border border-primary/20 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center">
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Ready for a Technical Scoping Call?</h3>
               <p className="text-[16px] text-white/60 mb-8 leading-relaxed">
                 Schedule a consultation with one of our API security engineers. Confidentiality. NDA Available. Professional Service Guarantee.
               </p>
               <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => openModal("Talk to an Engineer")}
                 className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]"
               >
                 Talk to an Engineer
               </motion.button>
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
