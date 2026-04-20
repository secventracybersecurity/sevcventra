import { motion } from "framer-motion";
import { CheckCircle, Download, Shield } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";
import { useState } from "react";
import { AnimatedSection, ScaleReveal } from "@/components/AnimatedSection";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function TrainingAwareness() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Request Training Program");

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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Human Risk Management</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[80px] font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Harden Your Human <br className="hidden md:block"/> Perimeter.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[22px] text-white/60 mb-10 max-w-[800px] mx-auto leading-relaxed"
          >
            Turn your employees from liabilities into your strongest defense. We run advanced Phishing Simulations, Social Engineering, and Security Awareness Training that actually stick.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal("Schedule Training Campaign")}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-[17px] shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
          >
            Schedule Training Campaign
          </motion.button>
        </div>
      </section>

      {/* Strategic Offerings */}
      <section className="py-24 bg-black border-y border-white/5 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-6">Threat Vectors Covered.</h2>
            <div className="w-20 h-1 bg-white/20 rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                image: "/assets/3d_phishing_hook_1776626242621.png", 
                title: "Phishing & SMiShing", 
                desc: "Realistic email and SMS lures tailored to your industry to catch employees off-guard in a safe environment." 
              },
              { 
                image: "/assets/3d_crown_1776626260182.png", 
                title: "Executive Whaling", 
                desc: "Highly customized, open-source intelligence (OSINT) gathered attacks aimed directly at C-suite and finance teams." 
              },
              { 
                image: "/assets/3d_brain_circuit_1776626277612.png", 
                title: "Interactive Training", 
                desc: "Psychology-driven modules that replace boring compliance videos with memorable, engaging defensive protocols." 
              },
              { 
                image: "/assets/3d_door_lock_1776626303268.png", 
                title: "Physical Intrusion", 
                desc: "On-site testing including tailgating, RFID badge cloning, and social engineering to bypass facility security." 
              }
            ].map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="bg-[#050505] border border-white/10 rounded-[24px] p-8 h-full flex flex-col group hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-black border border-white/5 flex items-center justify-center overflow-hidden mb-8 shadow-2xl p-2 group-hover:border-primary/20 transition-colors">
                       <img src={feature.image} alt={feature.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                    </div>
                    <h3 className="text-[24px] font-bold mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-[16px] text-white/50 leading-relaxed flex-grow">{feature.desc}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference Segment */}
      <section className="py-24 bg-[#050505] relative z-10 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="w-24 h-24 rounded-2xl bg-black border border-white/5 flex items-center justify-center overflow-hidden mb-8 shadow-2xl p-2">
               <Shield className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            </div>
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-tight mb-6 leading-[1.1]">
              Culture over Compliance.
            </h2>
            <p className="text-[18px] text-white/60 leading-relaxed mb-6">
              Most security awareness training exists just to check a box for compliance but fails to stop an actual breach. Our programs are built by red teamers and behavioral psychologists to foster a true culture of vigilance.
            </p>
            <ul className="space-y-4">
              {[
                "Targeted intelligence-gathering on key employees.",
                "Real-time teachable moments upon failure.",
                "Detailed metrics tracking organizational improvement."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[16px] text-white/80">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="relative">
             <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 bg-[#0a0a0a] relative p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div>
                   <h3 className="text-xl font-bold mb-6 tracking-tight text-white/90 border-b border-white/10 pb-4">Simulation Insights</h3>
                   <div className="space-y-6 opacity-70 font-mono text-[13px] sm:text-[14px]">
                      <div>
                        <div className="flex justify-between text-white/60 mb-2">
                          <span>Click Rate (Baseline)</span>
                          <span>34.2%</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[34%] h-full bg-red-500/80" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-white/60 mb-2">
                          <span>Click Rate (Post-Training)</span>
                          <span className="text-emerald-400 font-bold">4.1%</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[4%] h-full bg-emerald-500/80" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-white/60 mb-2 mt-8">
                          <span>Reporting Rate (Post-Training)</span>
                          <span className="text-emerald-400 font-bold">89.5%</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[89%] h-full bg-emerald-500/80" />
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black border-y border-white/5 px-6 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter leading-tight mb-6">
              Create a Human Firewall.
            </h2>
            <p className="text-[18px] md:text-[22px] text-white/50 mb-10 max-w-[700px] mx-auto">
              Empower your team to spot the threats your technology misses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal("Start Training Campaign")}
                className="px-8 py-4 rounded-full bg-white text-black font-bold text-[17px] shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full sm:w-auto"
              >
                Start Training Campaign
              </motion.button>
              <button 
                onClick={() => openModal("Download Syllabus")}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-[17px] hover:bg-white/5 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> View Syllabus
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
