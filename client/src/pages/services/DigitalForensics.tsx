import { motion } from "framer-motion";
import { Search, Database, Shield, Lock, FileSearch, HardDrive, Clock, FileText } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function DigitalForensics() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("REQUEST AN INVESTIGATION");

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
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Court-Admissible Forensics</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[72px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Uncovering the Digital Trail. <br className="hidden md:block"/> Establishing the Truth.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/60 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            When the stakes are highest, precision is non-negotiable. We provide Court-Admissible Digital Forensics to investigate data breaches, intellectual property theft, and employee misconduct with absolute integrity.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal("REQUEST AN INVESTIGATION")}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[17px] shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all uppercase tracking-wide"
          >
            REQUEST AN INVESTIGATION
          </motion.button>
        </div>
      </section>


      {/* Specialized Capabilities */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Specialized Investigative Capabilities.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FileSearch, title: "Mobile & Endpoint Forensics", desc: "Extracting encrypted chats, deleted messages, and location history from iOS, Android, and workstation devices." },
              { icon: Database, title: "Network & Cloud Forensics", desc: "Reconstructing the 'Who, What, and When' by analyzing firewall logs, VPN traffic, and cloud access metadata." },
              { icon: HardDrive, title: "Data Recovery & Anti-Forensics", desc: "Defeating 'Wiper' malware and recovering intentionally deleted data or hidden partitions used to conceal activity." }
            ].map((cap, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 h-full flex flex-col hover:bg-white/10 transition-colors">
                    <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6">
                       <cap.icon className="w-6 h-6 text-primary" />
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
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">The Forensic Workflow.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[24px] left-[50px] right-[50px] h-px bg-white/10 z-0" />
            
            {[
              { icon: Lock, title: "Identification & Preservation", desc: "We secure the hardware and create 'Bit-Stream' forensic images to ensure the original data is never touched." },
              { icon: Search, title: "Deep-Dive Analysis", desc: "Using industry-standard tools to uncover hidden artifacts, deleted files, and registry changes." },
              { icon: Clock, title: "Timeline Reconstruction", desc: "We build a second-by-second 'Master Timeline' of the incident to show exactly how the event unfolded." },
              { icon: FileText, title: "Reporting & Expert Testimony", desc: "A comprehensive technical report designed for C-Suite executives or legal counsel." }
            ].map((step, i) => (
              <AnimatedSection key={i} className="relative z-10" delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-black border border-white/30 flex items-center justify-center text-white mb-6 z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <step.icon className="w-5 h-5 text-white/80" />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
             <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter mb-6">Every second counts in a digital investigation.</h2>
             <p className="text-[18px] md:text-[22px] text-white/60 max-w-[800px] mx-auto leading-relaxed">
               Whether it is a sensitive internal matter or a large-scale breach, we provide the <strong className="text-white">Forensic Clarity</strong> required to take action.
             </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Consultation */}
            <AnimatedSection className="bg-primary/5 border border-primary/20 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center">
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Speak with a Lead Investigator.</h3>
               <p className="text-[16px] text-white/60 mb-8 leading-relaxed">
                 Confidentiality is our priority. Schedule a private briefing.
               </p>
               <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => openModal("Consult an Expert")}
                 className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]"
               >
                 Consult an Expert
               </motion.button>
            </AnimatedSection>

            {/* Authority Box */}
            <AnimatedSection className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center">
               <Shield className="w-12 h-12 text-primary mb-6" />
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Validated Against Global Standards.</h3>
               <p className="text-[16px] font-mono text-white/70 leading-relaxed">
                 ISO 27037 (Digital Evidence Handling)<br/>
                 ACPO Principles<br/>
                 NIST SP 800-86
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
