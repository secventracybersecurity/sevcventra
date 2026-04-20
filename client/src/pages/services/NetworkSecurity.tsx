import { motion } from "framer-motion";
import { Network, Server, Cloud, Shield, Target, Lock, AlertTriangle, Eye, CheckCircle, ChevronRight } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function NetworkSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Request a Network Audit");

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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Network VAPT</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[72px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Impenetrable <br className="hidden md:block"/> Perimeter Defense.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/60 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            Your network is the backbone of your business. We provide high-fidelity Internal & External Network VAPT to identify lateral movement risks, misconfigured firewalls, and unauthorized access points.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal("Request a Network Audit")}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[17px] shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            Request a Network Audit
          </motion.button>
        </div>
      </section>

      {/* Core Audit Services (3-Column Grid) */}
      <section className="py-24 bg-black border-y border-white/5 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">The Core Audit Services</h2>
            <p className="text-[18px] text-white/50 mt-4">Technical pillars built for deep visibility.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "External Pentesting", focus: "Public-facing assets.", desc: "We simulate an outside attacker trying to breach your firewalls, VPNs, and DNS to find a way into your private network." },
              { icon: Server, title: "Internal Infrastructure Audit", focus: "Lateral movement.", desc: "We assume a breach has occurred. We test how easily a hacker can move from a single workstation to your Domain Controller." },
              { icon: Cloud, title: "Cloud & Hybrid Security", focus: "Misconfigurations.", desc: "Specialized audits for AWS, Azure, and GCP to ensure your S3 buckets and IAM roles aren't leaking data." }
            ].map((srv, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 h-full flex flex-col hover:bg-white/10 transition-colors">
                    <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6">
                       <srv.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-[22px] font-bold mb-2">{srv.title}</h3>
                    <div className="text-[13px] font-mono text-accent mb-4 uppercase tracking-wider">Focus: {srv.focus}</div>
                    <p className="text-[16px] text-white/60 leading-relaxed flex-grow">{srv.desc}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Frameworks */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1000px] mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Standards & Frameworks</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "NIST SP 800-115", desc: "The technical guide to information security testing." },
              { title: "PTES", desc: "Proves we follow a high-end, professional workflow." },
              { title: "CIS Benchmarks", desc: "We audit your server configurations against the Center for Internet Security’s best practices." }
            ].map((std, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="border border-white/10 bg-black rounded-[20px] p-8 text-center h-full hover:border-primary/50 transition-colors">
                    <h3 className="text-[20px] font-bold text-primary mb-3">{std.title}</h3>
                    <p className="text-[15px] text-white/70">{std.desc}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What We Hunt For */}
      <section className="py-24 bg-black border-y border-white/5 px-6">
         <div className="max-w-[1000px] mx-auto">
           <AnimatedSection className="mb-12 text-center">
             <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">What We Hunt For</h2>
             <p className="text-[18px] text-white/50 mt-4">The Specialist's List</p>
           </AnimatedSection>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Target, title: "Zero-Day Exploitation", desc: "Testing against the latest, unpatched threats." },
                { icon: Network, title: "Segmentation Testing", desc: "Ensuring your guest Wi-Fi can't talk to your HR database." },
                { icon: Lock, title: "Privilege Escalation", desc: "Can a low-level user become a Super-Admin? We find out." },
                { icon: AlertTriangle, title: "Legacy System Scans", desc: "Finding the 'forgotten' server that hasn't been updated in 5 years." }
              ].map((hunt, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="flex items-center gap-4 p-6 bg-white/5 rounded-[16px] border border-white/5 hover:bg-white/10 transition-colors">
                     <hunt.icon className="w-8 h-8 text-primary flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-[17px] mb-1">{hunt.title}</h4>
                       <p className="text-[14px] text-white/60">{hunt.desc}</p>
                     </div>
                  </div>
                </AnimatedSection>
              ))}
           </div>
         </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">The Methodology</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
            
            {[
              { title: "Passive Discovery", desc: "Mapping your digital footprint without touching your servers." },
              { title: "Active Enumeration", desc: "Identifying every open port and service running on your network." },
              { title: "Vulnerability Exploitation", desc: "Safely proving the risk of a found flaw." },
              { title: "Strategic Remediation", desc: "A prioritized roadmap to harden your infrastructure." }
            ].map((step, i) => (
              <AnimatedSection key={i} className="relative z-10" delay={i * 0.1}>
                <div className="bg-black border border-white/10 rounded-[20px] p-6 h-full shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xl mb-6 mx-auto md:mx-0">
                    {i + 1}
                  </div>
                  <h3 className="text-[18px] font-bold mb-3 text-center md:text-left">{step.title}</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed text-center md:text-left">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Human Closer & Final CTA */}
      <section className="py-24 bg-black border-t border-white/5 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center mb-8">
               <Shield className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-8">
              We don't just find holes; we give you the architectural advice to build a better fortress.
            </h2>
            <p className="text-[20px] text-white/70 mb-10 font-medium">
              Every audit includes a <span className="text-white">1-on-1 Tech Debrief</span> with your IT team.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => openModal("Schedule a Network Strategy Call")}
                 className="w-full sm:w-auto px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-[18px] shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
               >
                 Schedule a Network Strategy Call
               </motion.button>
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
