import { motion } from "framer-motion";
import { Smartphone, Shield, Code, Lock, Key, Wifi, Database, Download } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function MobileSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Scope Your Mobile Audit");

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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">iOS & Android VAPT</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[72px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Hardening the <br className="hidden md:block"/> Mobile Frontier.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/60 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            Your mobile app is a direct gateway to your users' most private data. We provide deep-dive iOS and Android Penetration Testing to identify and neutralize reverse engineering, data leakage, and unauthorized access.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 113, 227, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal("Scope Your Mobile Audit")}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-[17px] shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
          >
            Scope Your Mobile Audit
          </motion.button>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-black border-y border-white/5 relative z-10 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-8">Mobile Security is Different.</h2>
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 md:p-12 text-left relative overflow-hidden">
               <Smartphone className="absolute -right-8 -bottom-8 w-64 h-64 text-primary/5 pointer-events-none" />
               <p className="text-[17px] md:text-[19px] text-white/70 leading-relaxed relative z-10">
                 Unlike web applications, your mobile binary is 'public' by nature. Anyone can download it and begin hunting for flaws. Generic tools miss logic errors, obfuscation gaps, and platform-specific risks. Our engineers think like an adversary to protect your brand and your users.
               </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Authority Standards */}
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Audited Against Elite Global Standards.</h2>
            <p className="text-[18px] text-white/50 mt-4 max-w-[700px] mx-auto">We don't just 'test' your app; we measure its resilience against the definitive frameworks for mobile security.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "OWASP MASVS", desc: "The comprehensive Mobile Application Security Verification Standard. We validate your app against MASVS-L1 and MASVS-L2 requirements." },
              { title: "OWASP MSTG", desc: "Our testing methodologies are built upon the robust Mobile Security Testing Guide, ensuring every vector is covered." },
              { title: "Common Criteria / NIAP", desc: "We follow the guidelines for evaluation of mobile app security, crucial for government and high-security enterprise compliance." }
            ].map((std, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-black border border-white/10 rounded-[24px] p-8 h-full hover:bg-white/5 transition-colors">
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
      <section className="py-24 bg-black border-y border-white/5 px-6">
        <div className="max-w-[1200px] mx-auto">
           <AnimatedSection className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Comprehensive Deep-Dive Mobile Audits.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Binary Analysis & Reverse Engineering", desc: "We ensure your source code cannot be easily stolen, tampered with, or used to build clones." },
              { icon: Database, title: "Insecure Data Storage", desc: "Checking if sensitive tokens, passwords, or PII is leaking into the phone's local storage or logs." },
              { icon: Key, title: "Broken Cryptography", desc: "Validating that your app's encryption (like AES-256) is properly implemented and unbreakable." },
              { icon: Wifi, title: "Insecure Communication", desc: "Ensuring all data moving between the app and the server is fully shielded from 'Man-in-the-Middle' (MitM) attacks." }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="flex flex-col p-8 rounded-[24px] bg-white/5 border border-white/5 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 h-full group">
                    <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                      <item.icon className="w-8 h-8 text-primary" />
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
      <section className="py-24 bg-[#050505] px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">Our 4-Step Technical Methodology.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
            
            {[
              { title: "Reconnaissance & Static Analysis (SAST)", desc: "We pull apart the app’s binary (.ipa / .apk) to analyze the code structure and find vulnerabilities before it runs." },
              { title: "Dynamic Analysis (DAST)", desc: "We execute the app on real, rooted/jailbroken devices to intercept traffic and test inputs while it's live." },
              { title: "API & Backend Audit", desc: "We rigorously test the communication between your app and its controlling server API." },
              { title: "Actionable Reporting & Re-Test", desc: "A developer-ready report with the exact proof-of-concept and secure code snippets. We re-test for free." }
            ].map((step, i) => (
              <AnimatedSection key={i} className="relative z-10" delay={i * 0.1}>
                <div className="bg-black border border-white/10 rounded-[20px] p-6 h-full shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xl mb-6">
                    {i + 1}
                  </div>
                  <h3 className="text-[18px] font-bold mb-3">{step.title}</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Human Consultant Quote */}
      <section className="py-24 bg-black border-y border-white/5 px-6">
         <div className="max-w-[800px] mx-auto text-center">
            <AnimatedSection>
               <div className="text-[32px] md:text-[40px] font-bold leading-tight italic text-white/90 mb-8 font-serif">
                 "A developer's job is functionality. A hacker's job is exploitation. Our job is to bridge that gap with a forensic perspective."
               </div>
               <div className="text-[16px] text-primary font-bold uppercase tracking-widest">— Secventra Mobile Lead</div>
            </AnimatedSection>
         </div>
      </section>

      {/* Final Lead Magnet & CTA */}
      <section className="py-24 bg-[#050505] px-6 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-16">
             <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter">Don't leave your mobile security to chance.</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Lead Magnet */}
            <AnimatedSection className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 backdrop-blur-xl">
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Free Developer's Checklist.</h3>
               <p className="text-[16px] text-white/60 mb-8 leading-relaxed">
                 Download our 15-point checklist based on the OWASP MASVS top 10 mobile risks.
               </p>
               <button 
                 onClick={() => openModal("Download Mobile Checklist")}
                 className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center justify-center gap-2"
               >
                 <Download className="w-5 h-5" /> Send Me the Checklist
               </button>
            </AnimatedSection>

            {/* Consultation */}
            <AnimatedSection className="bg-primary/5 border border-primary/20 rounded-[32px] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center">
               <h3 className="text-[24px] font-bold tracking-tight mb-3">Ready for a Technical Deep-Dive?</h3>
               <p className="text-[16px] text-white/60 mb-8 leading-relaxed">
                 Schedule a scoping call with one of our mobile security engineers. No-obligation. Confidentiality guaranteed.
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
