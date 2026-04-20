import { motion } from "framer-motion";
import { AlertTriangle, Shield, Crosshair, ShieldAlert, FileSearch, Search, Flame, TrendingUp, PhoneCall, AlertOctagon } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function IncidentResponse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("EMERGENCY RESPONSE HOTLINE");

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-red-500/30 relative">
      <CyberBackgroundSuite opacity={0.4} showHUD={false} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-transparent z-10">

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-red-200">Active Incident Protocol</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[72px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Breach Contained. <br className="hidden md:block"/> Threat Neutralized.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/70 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            Minutes matter when your data is under fire. Our 24/7 Incident Response team provides immediate containment, eradication, and recovery to stop active breaches and minimize business impact.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal("EMERGENCY RESPONSE HOTLINE")}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-[17px] shadow-[0_0_40px_rgba(220,38,38,0.6)] animate-[pulse_2s_infinite] hover:animate-none transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <AlertOctagon className="w-5 h-5" /> EMERGENCY RESPONSE HOTLINE
          </motion.button>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-black border-y border-white/5 relative z-10 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-8">Your Cyber-Emergency Response Team (CERT).</h2>
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 md:p-12 text-left relative overflow-hidden">
               <ShieldAlert className="absolute -right-8 -bottom-8 w-64 h-64 text-primary/5 pointer-events-none" />
               <p className="text-[17px] md:text-[19px] text-white/70 leading-relaxed relative z-10">
                 When a breach occurs, the first 48 hours are critical. We don't just "analyze"—we mobilize. Our engineers deploy on-site or remotely to isolate compromised systems, hunt for the threat actor, and restore your operations while preserving evidence for later investigation.
               </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Containment Capabilities */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Rapid Containment Capabilities.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Ransomware Negotiation & Recovery", desc: "Specialized support for decrypting assets, managing communications, and ensuring a secure, malware-free recovery of your infrastructure." },
              { icon: Crosshair, title: "Active Threat Hunting", desc: "We don't wait for alerts. Our hunters proactively search your logs and memory to find 'Living-off-the-Land' attackers hiding in your network." },
              { icon: ShieldAlert, title: "Breach Containment", desc: "Immediate isolation of infected hosts and 'kill-switch' implementation to stop the lateral movement of hackers across your segments." }
            ].map((cap, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 h-full flex flex-col hover:border-red-500/30 hover:bg-white/10 transition-colors group">
                    <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-red-500/50 transition-colors">
                       <cap.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-[22px] font-bold mb-4">{cap.title}</h3>
                    <p className="text-[16px] text-white/60 leading-relaxed flex-grow">{cap.desc}</p>
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
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Our Battle-Tested 4-Phase Response.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[24px] left-[50px] right-[50px] h-px bg-white/10 z-0" />
            
            {[
              { icon: Shield, title: "Preparation & Triage", desc: "Rapid assessment of the breach scale and deployment of forensic toolkits." },
              { icon: Search, title: "Detection & Analysis", desc: "Identifying the entry point (Patient Zero) and the extent of the data exfiltration." },
              { icon: Flame, title: "Containment & Eradication", desc: "Neutralizing the threat actor's access and cleaning the environment of 'Backdoors.'" },
              { icon: TrendingUp, title: "Post-Incident Recovery", desc: "Hardening the environment against a 'Re-entry' attack and providing a full forensic debrief." }
            ].map((step, i) => (
              <AnimatedSection key={i} className="relative z-10" delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-black border-4 border-white/20 flex items-center justify-center text-white mb-6 z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all">
                    <step.icon className="w-5 h-5 text-white/80 group-hover:text-red-400" />
                  </div>
                  <h3 className="text-[18px] font-bold mb-3">{i + 1}. {step.title}</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed max-w-[250px]">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA & Trust Signal */}
      <section className="py-24 bg-[#050505] px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
             <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter mb-6 text-red-500">Is your business under attack right now?</h2>
             <p className="text-[18px] md:text-[22px] text-white/80 max-w-[800px] mx-auto leading-relaxed">
               Do not attempt to "clean" the systems yourself—you may destroy the evidence needed for recovery. <strong className="text-white">Call the experts.</strong>
             </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Consultation */}
            <AnimatedSection className="bg-red-500/10 border border-red-500/30 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center">
               <h3 className="text-[24px] font-bold tracking-tight mb-3">24/7 Rapid Response Line.</h3>
               <p className="text-[16px] text-white/70 mb-8 leading-relaxed">
                 Instant mobilization for critical breaches.
               </p>
               <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => openModal("Contact IR Lead Now")}
                 className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold transition-colors shadow-[0_0_40px_rgba(220,38,38,0.5)] animate-[pulse_2s_infinite] hover:animate-none flex items-center justify-center gap-2"
               >
                 <PhoneCall className="w-5 h-5" /> Contact IR Lead Now
               </motion.button>
            </AnimatedSection>

            {/* Authority Box */}
            <AnimatedSection className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center">
               <ShieldAlert className="w-12 h-12 text-primary mb-6" />
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Validated Against Global Standards.</h3>
               <p className="text-[16px] font-mono text-white/70 leading-relaxed mt-4">
                 NIST SP 800-61<br/>
                 ISO 27035<br/>
                 SANS 6-Step IR
               </p>
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
