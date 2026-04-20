import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CyberBackgroundSuite } from "@/components/CyberTacticalHero";

export default function ServicePlaceholder({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-center px-6 relative overflow-hidden">
      <CyberBackgroundSuite opacity={0.3} showHUD={false} />
      
      <div className="max-w-2xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary/20 backdrop-blur-xl"
        >
          <Shield className="w-10 h-10 text-primary" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tighter"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/40 mb-12"
        >
          This service page is currently being updated with our latest technical frameworks and case studies. 
          Our engineers are available for immediate consultation.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
        >
          <Link href="/services">
            <Button size="lg" className="bg-white hover:bg-white/90 text-black font-bold h-14 px-10 rounded-xl relative overflow-hidden group">
              <span className="relative z-10">Return to Operations</span>
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
