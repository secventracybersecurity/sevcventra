import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Scale, FileText, Lock, FileEdit, Download, Briefcase } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection, ScaleReveal } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function ComplianceAudit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Request a Compliance Consultation");

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-primary/30 relative">
      <CyberBackgroundSuite opacity={0.3} showHUD={false} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-transparent z-10">
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Enterprise Auditing</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[80px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Compliance Without <br className="hidden md:block"/> Compromise.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/60 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            Navigate strict regulatory frameworks like ISO 27001, SOC 2, HIPAA, and GDPR with confidence. We align your complex infrastructure with global security standards, ensuring complete audit readiness.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal("Request a Compliance Consultation")}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-[17px] shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
          >
            Schedule Scoping Call
          </motion.button>
        </div>
      </section>

      {/* Overview Frameworks */}
      <section className="py-24 bg-black border-y border-white/5 relative z-10 px-6">
        <div className="max-w-[1200px] mx-auto">
           <AnimatedSection className="text-center mb-16">
              <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-4">Framework Coverage</h2>
              <p className="text-[18px] text-white/50 max-w-[600px] mx-auto">
                We perform deep gap assessments across all major regulatory and industry standards.
              </p>
           </AnimatedSection>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "ISO 27001", subtitle: "Information Security" },
                { title: "SOC 2 Type II", subtitle: "Trust Services" },
                { title: "HIPAA / HITRUST", subtitle: "Healthcare Privacy" },
                { title: "GDPR / CCPA", subtitle: "Data Privacy laws" },
                { title: "PCI-DSS", subtitle: "Payment Security" },
                { title: "NIST CSF", subtitle: "Cybersecurity Framework" },
                { title: "CMMC", subtitle: "Defense Supply Chain" },
                { title: "CIS Controls", subtitle: "Security Benchmarks" }
              ].map((fw, i) => (
                <ScaleReveal key={i} delay={i * 0.05}>
                  <div className="bg-white/5 border border-white/10 rounded-[16px] p-6 text-center hover:bg-white/10 hover:scale-[1.02] transition-all cursor-default">
                    <h3 className="text-[20px] font-bold tracking-tighter mb-1 text-white">{fw.title}</h3>
                    <p className="text-[14px] text-white/50 tracking-wide uppercase">{fw.subtitle}</p>
                  </div>
                </ScaleReveal>
              ))}
           </div>
        </div>
      </section>

      {/* Strategic Offerings */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-6">Auditing Solutions.</h2>
            <div className="w-20 h-1 bg-white/20 rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                image: "/assets/3d_shield_1776625035317.png", 
                title: "Pre-Audit Readiness", 
                desc: "Don't walk into a formal audit blind. We simulate the exact processes of certifying bodies to ensure you pass without major non-conformances." 
              },
              { 
                image: "/assets/3d_document_1776625050939.png", 
                title: "Gap Analysis & Mapping", 
                desc: "We analyze your current policies, technical controls, and operational workflows against specific regulatory frameworks to identify critical deficiencies." 
              },
              { 
                image: "/assets/3d_scale_1776625064019.png", 
                title: "vCISO & Compliance Advisory", 
                desc: "Ongoing executive-level guidance to mature your security program, maintain compliance post-audit, and manage third-party vendor risks." 
              }
            ].map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-black border border-white/10 rounded-[24px] p-8 h-full flex flex-col group hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-[#030303] border border-white/5 flex items-center justify-center overflow-hidden mb-8 shadow-2xl p-2 group-hover:border-primary/20 transition-colors">
                       <img src={feature.image} alt={feature.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 className="text-[24px] font-bold mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-[17px] text-white/50 leading-relaxed flex-grow">{feature.desc}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference Segment */}
      <section className="py-24 bg-black border-y border-white/5 relative z-10 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="w-24 h-24 rounded-2xl bg-[#030303] border border-white/5 flex items-center justify-center overflow-hidden mb-8 shadow-2xl p-2">
               <img src="/assets/3d_briefcase_1776625083020.png" alt="Auditor Briefcase" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-tight mb-6 leading-[1.1]">
              Technical Auditors.<br/>Not Just Checklists.
            </h2>
            <p className="text-[18px] text-white/60 leading-relaxed mb-6">
              Compliance isn't just about drafting policies; it's about proving technical implementation. Our auditors have deep practitioner backgrounds in offensive and defensive security.
            </p>
            <ul className="space-y-4">
              {[
                "We speak developer, not just PDF.",
                "Real evidence generation through pentesting.",
                "Pragmatic, cost-effective remediation strategies."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[16px] text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="relative">
             <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 bg-[#0a0a0a] relative p-8 flex flex-col justify-between">
                <div>
                   <div className="flex items-center gap-2 mb-8">
                     <span className="w-3 h-3 rounded-full bg-red-500" />
                     <span className="w-3 h-3 rounded-full bg-yellow-500" />
                     <span className="w-3 h-3 rounded-full bg-green-500" />
                   </div>
                   <div className="space-y-4 opacity-50 font-mono text-[13px] sm:text-[14px]">
                      <div className="w-full h-4 bg-white/10 rounded-full" />
                      <div className="w-3/4 h-4 bg-white/10 rounded-full" />
                      <div className="w-5/6 h-4 bg-white/10 rounded-full" />
                      <div className="w-1/2 h-4 bg-white/10 rounded-full" />
                      <br/>
                      <div className="w-full h-4 bg-white/10 rounded-full flex overflow-hidden">
                        <div className="w-[85%] h-full bg-green-500/50" />
                        <div className="w-[15%] h-full bg-red-500/50" />
                      </div>
                      <div className="mt-2 text-white opacity-100">85% Controls Validated</div>
                   </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                   <div className="text-white/60 text-sm">Audit Engine v2.4.1</div>
                   <Lock className="w-4 h-4 text-white/40" />
                </div>
             </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#050505] px-6 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter leading-tight mb-6">
              Certify your posture. Build trust.
            </h2>
            <p className="text-[18px] md:text-[22px] text-white/50 mb-10 max-w-[700px] mx-auto">
              Ready to unblock enterprise sales and prove your commitment to data security to your customers?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal("Start Compliance Journey")}
                className="px-8 py-4 rounded-full bg-white text-black font-bold text-[17px] shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full sm:w-auto"
              >
                Start Compliance Journey
              </motion.button>
              <button 
                onClick={() => openModal("Download Audit Prep Guide")}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-[17px] hover:bg-white/5 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Audit Prep Guide
              </button>
            </div>
          </AnimatedSection>
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
