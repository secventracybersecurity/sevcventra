import { motion } from "framer-motion";
import { Link } from "wouter";
import { Terminal, ShieldAlert, ChevronRight, Home, Search, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  
  useEffect(() => {
    const chars = "01/";
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const newText = "404".split('').map(c => Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : c).join('');
        setGlitchText(newText);
        setTimeout(() => setGlitchText("404"), 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[600px] text-center"
      >
        {/* Hacker Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          <ShieldAlert className="w-12 h-12 text-white" />
        </motion.div>

        {/* Large 404 Text */}
        <h1 className="text-[120px] md:text-[180px] font-bold tracking-tighter leading-none mb-4 select-none relative inline-block">
          <span className="relative z-10">{glitchText}</span>
          <span className="absolute top-0 left-0 text-white/20 blur-[2px] translate-x-1 animate-pulse">404</span>
        </h1>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-[20px] md:text-[24px] font-bold text-white mb-4 uppercase tracking-[0.3em]">
            Access Denied
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 inline-block text-[14px] text-white/60">
            <span className="text-white font-bold mr-2">{'>'}</span>
            The requested protocol could not be resolved. Node not found.
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold text-[14px] uppercase tracking-wider transition-all"
            >
              <Home className="w-4 h-4" /> Return Home
            </motion.button>
          </Link>
          
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white font-bold text-[14px] uppercase tracking-wider transition-all"
            >
              <Search className="w-4 h-4" /> Browse Services
            </motion.button>
          </Link>
        </div>

        {/* Terminal Decorations */}
        <div className="mt-20 flex flex-col gap-2 text-[10px] text-white/20 font-mono">
          <p>ERROR_STATUS: 0x000404</p>
          <p>TRACE: {typeof window !== 'undefined' ? window.location.pathname : '/unknown-route'}</p>
          <p>IP_ORIGIN: LOGGED</p>
        </div>
      </motion.div>

      {/* Decorative Scan Line */}
      <motion.div 
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.2)] z-0 pointer-events-none"
      />
    </div>
  );
}
